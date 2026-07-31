"use client";

import { useState } from "react";
import { Copy, Check, Download, FolderOpen } from "lucide-react";
import useConfiguratorStore from "@/lib/store/useConfiguratorStore";
import { toSpec, secTotal, grandTotal, buildSpecText } from "@/lib/conf/spec";
import { aiComponentsToShield } from "@/lib/conf/mappers";
import { SECTIONS } from "./ConfigSection";

// ─── Одна строка спецификации ────────────────────────────────────────────────
function SpecRow({ s, idx }) {
  return (
    <div className="flex justify-between text-sm py-1.5 border-b border-slate-800/60 gap-2">
      <div className="flex gap-2 min-w-0">
        <span className="text-slate-600 flex-shrink-0 w-5 text-right">
          {idx}
        </span>
        <div className="min-w-0">
          <div className="text-amber-300 truncate">{s.label || s.name}</div>
          {s.label && s.label !== s.name && (
            <div className="text-[10px] text-slate-500 truncate">{s.name}</div>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center text-right flex-shrink-0 text-xs">
        <span className="text-slate-500 w-16">({s.stock} шт.)</span>
        <span className="text-slate-300 w-6 font-medium">{s.qty}</span>
        <span className="text-slate-300 w-20">
          {Math.round(s.price).toLocaleString("ru-RU")} ₽
        </span>
        <span className="text-amber-400 font-bold w-24">
          {Math.round(s.total).toLocaleString("ru-RU")} ₽
        </span>
      </div>
    </div>
  );
}

// ─── Секция спецификации ─────────────────────────────────────────────────────
function SpecSection({ sectionKey, items, startIdx }) {
  const cfg = SECTIONS[sectionKey];
  if (!items.length) return null;
  return (
    <div className="mb-5">
      <div
        className="text-[11px] font-semibold uppercase tracking-wider mb-2 pl-2 border-l-2"
        style={{ color: cfg.color, borderColor: cfg.color }}
      >
        {cfg.label}
      </div>
      {items.map((s, i) => (
        <SpecRow key={i} s={s} idx={startIdx + i} />
      ))}
      <div className="text-right text-xs text-slate-400 mt-1">
        Итог раздела:&nbsp;
        <span className="font-semibold" style={{ color: cfg.color }}>
          {Math.round(secTotal(items)).toLocaleString("ru-RU")} ₽
        </span>
      </div>
    </div>
  );
}

// ─── Демо-загрузка тестового проекта ─────────────────────────────────────────
// Кнопка «Загрузить проект (Тест)» теперь использует общий маппер.
const TEST_AI_DATA = {
  components: [],
  //   {
  //     id: "QS-1",
  //     type: "disconnector",
  //     model: "ВА88-35",
  //     rating_a: "250A",
  //     poles: 3,
  //     current_transformers: "250/5A",
  //     purpose: "Вводной рубильник, кабель АВВШвнг(A)-LS 4×150мм²",
  //   },
  //   {
  //     id: "QS-2",
  //     type: "disconnector",
  //     model: "ВА88-33",
  //     rating_a: "160A",
  //     poles: 3,
  //     current_transformers: "160/5A",
  //     purpose: "Вводной рубильник, кабель АВВШвнг(A)-LS 4×70мм²",
  //   },
  //   {
  //     id: "ТТ-1",
  //     type: "current_transformer",
  //     model: null,
  //     rating_a: null,
  //     poles: null,
  //     current_transformers: "250/5A",
  //     purpose: "Трансформатор тока к QS-1 / Wh-1",
  //   },
  //   {
  //     id: "ТТ-2",
  //     type: "current_transformer",
  //     model: null,
  //     rating_a: null,
  //     poles: null,
  //     current_transformers: "160/5A",
  //     purpose: "Трансформатор тока к QS-2 / Wh-2",
  //   },
  //   {
  //     id: "Wh-1",
  //     type: "meter",
  //     model: "Меркурий-234 ART-03 P",
  //     rating_a: "5-7,5A",
  //     poles: 3,
  //     current_transformers: "250/5A",
  //     purpose: "Счётчик электроэнергии на ввод QS-1",
  //   },
  //   {
  //     id: "Wh-2",
  //     type: "meter",
  //     model: "Меркурий-234 ART-03 P",
  //     rating_a: "5-7,5A",
  //     poles: 3,
  //     current_transformers: "160/5A",
  //     purpose: "Счётчик электроэнергии на ввод QS-2",
  //   },
  //   {
  //     id: "QF-1",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "50A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Торговая зона, склад, комендант",
  //   },
  //   {
  //     id: "QF-2",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "50A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Торговая зона, склад, комендант",
  //   },
  //   {
  //     id: "QF-3",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "10A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Торговая зона, склад, комендант",
  //   },
  //   {
  //     id: "QF-4",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "20A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Резерв",
  //   },
  //   {
  //     id: "QF-5",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "20A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Резерв",
  //   },
  //   {
  //     id: "QF-6",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "20A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Резерв",
  //   },
  //   {
  //     id: "QF-7",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "10A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Резерв",
  //   },
  //   {
  //     id: "QF-8",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "10A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Резерв",
  //   },
  //   {
  //     id: "QF-9",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "10A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Резерв",
  //   },
  //   {
  //     id: "QF-10",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "10A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Резерв",
  //   },
  //   {
  //     id: "QF-11",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "10A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Резерв",
  //   },
  //   {
  //     id: "QF-12",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "10A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Резерв",
  //   },
  //   {
  //     id: "QF-13",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "16A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Торговая зона, склад, комендант",
  //   },
  //   {
  //     id: "QF-14",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "16A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Торговая зона, склад, комендант",
  //   },
  //   {
  //     id: "QF-15",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "16A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Торговая зона, склад, комендант",
  //   },
  //   {
  //     id: "QF-16",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "16A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Торговая зона, склад, комендант",
  //   },
  //   {
  //     id: "QF-17",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "25A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Эл. щиток",
  //   },
  //   {
  //     id: "QF-18",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "10A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Эл. щиток",
  //   },
  //   {
  //     id: "QF-19",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "10A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Эл. щиток",
  //   },
  //   {
  //     id: "QF-20",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "10A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Резерв",
  //   },
  //   {
  //     id: "QF-21",
  //     type: "breaker",
  //     model: "ВА47-29",
  //     rating_a: "10A",
  //     poles: 3,
  //     current_transformers: null,
  //     purpose: "Резерв",
  //   },
  // ],
};
// {
//   components: [
//     { id: "ВА 88-40", type: "breaker", model: "ВА 88-40", poles: 3, purpose: "Вводной автомат", rating_a: "500А" },
//     { id: "QS-1", type: "disconnector", model: "ВА 88-35", poles: 3, rating_a: "250 А" },
//     { id: "ТШП-0,66", type: "current_transformer", model: "ТШП-0,66", current_transformers: "250/5А 5ВА" },
//     { id: "Меркурий-234", type: "meter", model: "Меркурий-234 ART-03 P", rating_a: "5-7,5А" },
//     { id: "QF-1", type: "breaker", model: "ВА47-29", poles: 1, purpose: "Электрический котел", rating_a: "50А" },
//     { id: "QF-3", type: "breaker", model: "ВА47-29", poles: 1, purpose: "Насосы отопления", rating_a: "10А" },
//     { id: "QF-17", type: "breaker", model: "ВА47-29", poles: 1, purpose: "Аварийное освещение", rating_a: "16А" },
//     { id: "QF-18", type: "breaker", model: "ВА47-29", poles: 1, purpose: "ЩНО", rating_a: "25А" },
//   ],
// };

// ─── Основной блок спецификации ──────────────────────────────────────────────
export default function Specification() {
  const [copied, setCopied] = useState(false);
  const shield = useConfiguratorStore((s) => s.shield);
  const loadProject = useConfiguratorStore((s) => s.loadProject);

  const specInputs = toSpec(shield.inputs);
  const specMeters = toSpec(shield.meters);
  const specLines = toSpec(shield.lines);
  const allSpec = [...specInputs, ...specMeters, ...specLines];
  const total = grandTotal([specInputs, specMeters, specLines]);

  const si = specInputs.length;
  const sm = specMeters.length;

  const handleLoadTestProject = () => {
    const newShield = aiComponentsToShield(TEST_AI_DATA, "ВРУ-1 (Тест)");
    loadProject(newShield);
  };

  const copyToClipboard = () => {
    const { text } = buildSpecText(shield.name, {
      inputs: specInputs,
      meters: specMeters,
      lines: specLines,
    });
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    const { font } = await import("@/public/fonts/Roboto-Regular-normal.js");
    const { fontBold } = await import("@/public/fonts/Roboto-Bold-bold.js");

    const doc = new jsPDF({ unit: "mm", format: "a4" });

    doc.addFileToVFS("Roboto-Regular-normal.ttf", font);
    doc.addFont("Roboto-Regular-normal.ttf", "Roboto", "normal");
    doc.addFileToVFS("Roboto-Bold-bold.ttf", fontBold);
    doc.addFont("Roboto-Bold-bold.ttf", "Roboto", "bold");
    doc.setFont("Roboto", "normal");

    const margin = 14;
    const pageW = 210;
    let y = margin;

    doc.setFontSize(15);
    doc.setFont("Roboto", "bold");
    doc.text(`Спецификация: ${shield.name}`, margin, y);
    y += 6;

    doc.setFontSize(8);
    doc.setFont("Roboto", "normal");
    doc.setTextColor(140);
    doc.text(new Date().toLocaleDateString("ru-RU"), margin, y);
    doc.setTextColor(0);
    y += 5;

    const SECTION_COLORS = {
      ВВОД: [59, 130, 246],
      "УЧЕТ ЭЛЕКТРОЭНЕРГИИ": [168, 85, 247],
      "ОТХОДЯЩИЕ ЛИНИИ": [34, 197, 94],
    };

    const renderSection = (title, items, startIdx) => {
      if (!items.length) return startIdx;
      const color = SECTION_COLORS[title] || [100, 100, 100];
      let idx = startIdx;

      const body = items.map((s) => {
        const name =
          s.label && s.label !== s.name ? `${s.label}\n${s.name}` : s.name;
        return [
          String(idx++),
          name,
          s.articul || "",
          String(s.qty),
          Math.round(s.price).toLocaleString("ru-RU"),
          Math.round(s.total).toLocaleString("ru-RU"),
        ];
      });

      autoTable(doc, {
        startY: y,
        margin: { left: margin, right: margin },
        head: [
          [
            {
              content: title,
              colSpan: 6,
              styles: {
                fillColor: color,
                textColor: 255,
                fontStyle: "bold",
                fontSize: 8,
                font: "Roboto",
              },
            },
          ],
          [
            { content: "#", styles: { halign: "center" } },
            "Наименование",
            "Артикул",
            { content: "Кол.", styles: { halign: "center" } },
            { content: "Цена, руб", styles: { halign: "right" } },
            { content: "Сумма, руб", styles: { halign: "right" } },
          ],
        ],
        body,
        foot: [
          [
            {
              content: `Итого по разделу: ${Math.round(secTotal(items)).toLocaleString("ru-RU")} руб.`,
              colSpan: 6,
              styles: {
                halign: "right",
                fontStyle: "bold",
                fontSize: 8,
                font: "Roboto",
              },
            },
          ],
        ],
        styles: {
          font: "Roboto",
          fontSize: 7.5,
          cellPadding: { top: 2, bottom: 2, left: 2, right: 2 },
          lineColor: [220, 220, 220],
          lineWidth: 0.2,
          textColor: [20, 20, 20],
          overflow: "linebreak",
        },
        headStyles: {
          font: "Roboto",
          fontStyle: "bold",
          fillColor: [240, 242, 245],
          textColor: [60, 60, 60],
          fontSize: 7.5,
        },
        footStyles: {
          fillColor: [248, 250, 252],
          textColor: [60, 60, 60],
        },
        columnStyles: {
          0: { cellWidth: 8, halign: "center" },
          1: { cellWidth: 72 },
          2: { cellWidth: 32, textColor: [120, 120, 120], fontSize: 6.5 },
          3: { cellWidth: 12, halign: "center" },
          4: { cellWidth: 25, halign: "right" },
          5: { cellWidth: 27, halign: "right", fontStyle: "bold" },
        },
        didParseCell: (data) => {
          if (data.column.index === 5 && data.section === "body") {
            data.cell.styles.textColor = color;
          }
        },
        showFoot: "lastPage",
      });

      y = doc.lastAutoTable.finalY + 6;
      return idx;
    };

    let idx = 1;
    idx = renderSection("ВВОД", specInputs, idx);
    idx = renderSection("УЧЕТ ЭЛЕКТРОЭНЕРГИИ", specMeters, idx);
    idx = renderSection("ОТХОДЯЩИЕ ЛИНИИ", specLines, idx);

    doc.setDrawColor(180);
    doc.line(margin, y, pageW - margin, y);
    y += 6;

    doc.setFontSize(11);
    doc.setFont("Roboto", "bold");
    doc.text(
      `ВСЕГО: ${Math.round(total).toLocaleString("ru-RU")} руб.`,
      pageW - margin,
      y,
      { align: "right" },
    );

    doc.save(
      `${shield.name}_spec_${new Date().toLocaleDateString("ru-RU")}.pdf`,
    );
  };

  return (
    <div className="bg-cardBackground border border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <button
          onClick={handleLoadTestProject}
          className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 transition-colors px-3 py-1.5 rounded text-xs text-white font-medium"
        >
          <FolderOpen size={13} /> Загрузить проект (Тест)
        </button>
        <h2 className="text-amber-400 font-bold text-base">Спецификация</h2>
        {allSpec.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 transition-colors px-3 py-1.5 rounded text-xs text-slate-300"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-green-400" /> Скопировано
                </>
              ) : (
                <>
                  <Copy size={13} /> Скопировать
                </>
              )}
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-1.5 bg-red-800 hover:bg-red-700 transition-colors px-3 py-1.5 rounded text-xs text-white"
            >
              <Download size={13} /> Скачать PDF
            </button>
          </div>
        )}
      </div>

      {allSpec.length === 0 ? (
        <p className="text-slate-500 text-sm">Нет выбранных товаров</p>
      ) : (
        <>
          <SpecSection sectionKey="inputs" items={specInputs} startIdx={1} />
          <SpecSection
            sectionKey="meters"
            items={specMeters}
            startIdx={si + 1}
          />
          <SpecSection
            sectionKey="lines"
            items={specLines}
            startIdx={si + sm + 1}
          />
          <div className="border-t border-slate-700 pt-3 flex justify-between items-center">
            <span className="text-text text-sm">
              Всего позиций: {allSpec.length}
            </span>
            <div className="text-amber-400 font-bold text-lg">
              {Math.round(total).toLocaleString("ru-RU")} ₽
            </div>
          </div>
        </>
      )}
    </div>
  );
}
