"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload,
  X,
  FileImage,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import useConfiguratorStore from "@/lib/store/useConfiguratorStore";

// ─── Конвертация изображения в PNG blob ─────────────────────────────────────
function imageToPng(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      }, "image/png");
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error("Не удалось загрузить изображение"));
    img.src = URL.createObjectURL(file);
  });
}

// ─── Конвертация PDF страниц в массив PNG blob ──────────────────────────────
async function pdfToPngs(file) {
  // Полифилл Map.prototype.getOrInsertComputed для pdfjs-dist v6.
  // Метод добавлен в JS только в Node 24+ / Chrome 137+; на Node 22 / старых
  // браузерах его нет → падает "getOrInsertComputed is not a function".
  // Вставляем безопасно: только если метод отсутствует.
  if (typeof Map.prototype.getOrInsertComputed !== "function") {
    Map.prototype.getOrInsertComputed = function polyfillGetOrInsertComputed(
      key,
      computeFn
    ) {
      if (this.has(key)) return this.get(key);
      const value = computeFn(key);
      this.set(key, value);
      return value;
    };
  }
  const pdfjsLib = await import("pdfjs-dist");

  // Используем встроенный worker через CDN для совместимости
  // pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const blobs = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const scale = 2; // Высокое разрешение для анализа
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");

    await page.render({ canvasContext: ctx, viewport }).promise;

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
        "image/png"
      );
    });

    blobs.push({ blob, pageNum: i });
  }

  return blobs;
}

// ─── Статусы ────────────────────────────────────────────────────────────────
const STATUS = {
  IDLE: "idle",
  CONVERTING: "converting",
  UPLOADING: "uploading",
  DONE: "done",
  ERROR: "error",
};

// ─── JSON-отображение ───────────────────────────────────────────────────────
function JsonViewer({ data }) {
  if (!data) return null;

  // Рекурсивный рендер JSON
  const renderValue = (value, depth = 0) => {
    if (value === null) return <span className="text-slate-500">null</span>;
    if (typeof value === "boolean")
      return <span className="text-purple-400">{String(value)}</span>;
    if (typeof value === "number")
      return <span className="text-cyan-400">{value}</span>;
    if (typeof value === "string")
      return <span className="text-green-400">&quot;{value}&quot;</span>;

    if (Array.isArray(value)) {
      if (value.length === 0) return <span className="text-slate-500">[]</span>;
      return (
        <div className="ml-4">
          {value.map((item, i) => (
            <div key={i} className="flex">
              <span className="text-slate-600 mr-2 select-none">{i}:</span>
              {renderValue(item, depth + 1)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object") {
      const keys = Object.keys(value);
      if (keys.length === 0)
        return <span className="text-slate-500">{"{}"}</span>;
      return (
        <div className="ml-4">
          {keys.map((key) => (
            <div key={key} className="flex flex-wrap">
              <span className="text-amber-400 mr-1">{key}:</span>
              {renderValue(value[key], depth + 1)}
            </div>
          ))}
        </div>
      );
    }

    return <span>{String(value)}</span>;
  };

  return (
    <div className="bg-black/50 rounded-lg p-4 font-mono text-xs max-h-96 overflow-auto">
      {renderValue(data)}
    </div>
  );
}

// ─── Основной компонент ─────────────────────────────────────────────────────
export default function SchemaUploader() {
  const [files, setFiles] = useState([]); // { file, preview, name }
  const [status, setStatus] = useState(STATUS.IDLE);
  const [progress, setProgress] = useState("");
  const [results, setResults] = useState([]); // { fileName, data?, error? }
  const [showResults, setShowResults] = useState(true);
  const inputRef = useRef(null);
  const setAiPreview = useConfiguratorStore((s) => s.setAiPreview);

  const ACCEPTED = ".jpg,.jpeg,.png,.pdf,.bmp,.tiff,.webp";

  const addFiles = useCallback((fileList) => {
    const newFiles = Array.from(fileList).map((f) => ({
      file: f,
      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : null,
      name: f.name,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setResults([]);
    setStatus(STATUS.IDLE);
  }, []);

  const removeFile = (idx) => {
    setFiles((prev) => {
      const copy = [...prev];
      if (copy[idx].preview) URL.revokeObjectURL(copy[idx].preview);
      copy.splice(idx, 1);
      return copy;
    });
  };

  // ─── Drag & Drop ──────────────────────────────────────────────────────────
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // ─── Обработка и отправка ─────────────────────────────────────────────────
  const handleAnalyze = async () => {
    if (files.length === 0) return;

    setResults([]);
    const allResults = [];

    for (let i = 0; i < files.length; i++) {
      const { file, name } = files[i];
      const isPdf =
        file.type === "application/pdf" || name.toLowerCase().endsWith(".pdf");

      try {
        let pngBlobs = []; // { blob, label }

        // ── Конвертация ──
        if (isPdf) {
          setStatus(STATUS.CONVERTING);
          setProgress(`Конвертация PDF: ${name} ...`);
          const pages = await pdfToPngs(file);
          pngBlobs = pages.map((p) => ({
            blob: p.blob,
            label: `${name} (стр. ${p.pageNum})`,
          }));
        } else {
          setStatus(STATUS.CONVERTING);
          setProgress(`Конвертация: ${name} ...`);
          const blob = await imageToPng(file);
          pngBlobs = [{ blob, label: name }];
        }

        // ── Отправка каждого PNG ──
        for (const { blob, label } of pngBlobs) {
          setStatus(STATUS.UPLOADING);
          setProgress(`Анализ: ${label} ...`);

          const form = new FormData();
          form.append(
            "file",
            blob,
            label.replace(/[^a-zA-Zа-яА-Я0-9._-]/g, "_") + ".png"
          );

          // const res = await fetch("/api/v1/analyze-schema", {
          const res = await fetch("/api/v1/analyze-schema", {
            method: "POST",
            body: form,
          });

          const json = await res.json();

          if (json.success) {
            allResults.push({ fileName: label, data: json.data });
            // Отправляем результат в панель предпросмотра конфигуратора.
            // При нескольких файлах/страницах — последний успешный результат
            // заменяет предыдущий (типичный кейс — одна схема).
            if (json.data?.components?.length) {
              setAiPreview(json.data);
            }
          } else {
            allResults.push({
              fileName: label,
              error: json.error || "Ошибка сервера",
            });
          }
        }
      } catch (err) {
        allResults.push({ fileName: name, error: err.message });
      }
    }

    setResults(allResults);
    setStatus(allResults.some((r) => r.error) ? STATUS.ERROR : STATUS.DONE);
    setProgress("");
  };

  const isProcessing =
    status === STATUS.CONVERTING || status === STATUS.UPLOADING;

  return (
    <div className="bg-cardBackground border border-slate-800 rounded-xl p-5 space-y-4">
      {/* Заголовок */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 rounded-full bg-amber-500 shrink-0" />
        <h2 className="text-base font-semibold text-amber-400">Анализ схемы</h2>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
          AI
        </span>
      </div>

      {/* Дроп-зона */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !isProcessing && inputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${
            isProcessing
              ? "border-slate-700 bg-slate-900 cursor-wait opacity-60"
              : "border-slate-700 hover:border-amber-500/50 hover:bg-slate-800/50"
          }
        `}
      >
        <Upload className="mx-auto mb-2 text-slate-500" size={28} />
        <p className="text-sm text-slate-400">
          Перетащите файлы сюда или{" "}
          <span className="text-amber-400 underline">выберите</span>
        </p>
        <p className="text-[10px] text-slate-600 mt-1">
          JPG, PNG, JPEG, PDF, BMP, TIFF, WEBP
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* Превью файлов */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-[11px] text-slate-500 uppercase tracking-wider">
            Файлы ({files.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {files.map((f, idx) => (
              <div
                key={idx}
                className="relative group bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex items-center gap-2 pr-2"
              >
                {f.preview ? (
                  <img
                    src={f.preview}
                    alt={f.name}
                    className="w-10 h-10 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-red-900/30">
                    <FileImage size={16} className="text-red-400" />
                  </div>
                )}
                <span className="text-xs text-slate-300 max-w-40 truncate">
                  {f.name}
                </span>
                {!isProcessing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(idx);
                    }}
                    className="text-slate-600 hover:text-red-400 p-0.5"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Кнопка + прогресс */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleAnalyze}
          disabled={files.length === 0 || isProcessing}
          className="bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Обработка…
            </>
          ) : (
            <>
              <Upload size={15} />
              Анализировать
            </>
          )}
        </button>

        {progress && (
          <span className="text-xs text-slate-400 animate-pulse">
            {progress}
          </span>
        )}

        {status === STATUS.DONE && !progress && (
          <span className="text-xs text-green-400 flex items-center gap-1">
            <CheckCircle2 size={13} /> Готово
          </span>
        )}
      </div>

      {/* Результаты */}
      {results.length > 0 && (
        <div className="space-y-3">
          <button
            onClick={() => setShowResults((v) => !v)}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            {showResults ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            Результаты анализа ({results.length})
          </button>

          {showResults &&
            results.map((r, i) => (
              <div
                key={i}
                className={`rounded-lg border p-3 ${
                  r.error
                    ? "border-red-800/60 bg-red-900/10"
                    : "border-green-800/40 bg-green-900/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {r.error ? (
                    <AlertCircle size={14} className="text-red-400" />
                  ) : (
                    <CheckCircle2 size={14} className="text-green-400" />
                  )}
                  <span className="text-xs font-medium text-slate-300">
                    {r.fileName}
                  </span>
                </div>
                {r.error ? (
                  <p className="text-xs text-red-400">{r.error}</p>
                ) : (
                  <JsonViewer data={r.data} />
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
