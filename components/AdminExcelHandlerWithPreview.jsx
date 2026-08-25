// components/AdminExcelHandlerWithPreview.jsx
"use client";
import { useState, useEffect } from "react";

export default function AdminExcelHandlerWithPreview() {
  const [schemas, setSchemas] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState({});
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Загружаем динамическую схему моделей при старте
  useEffect(() => {
    fetch("/api/admin/schema")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSchemas(data);
          selectModel(data[0]);
        }
      });
  }, []);

  const selectModel = (model) => {
    setSelectedModel(model);
    const initialCols = {};
    model.fields.forEach((f) => {
      initialCols[f.name] = true;
    });
    setSelectedColumns(initialCols);
    setPreviewData(null);
    setFile(null);
  };

  const toggleColumn = (colName) => {
    setSelectedColumns((prev) => ({ ...prev, [colName]: !prev[colName] }));
  };

  // 2. Обработчик Выгрузки (Экспорта)
  const handleExport = async () => {
    if (!selectedModel) return;
    setLoading(true);

    const activeCols = Object.keys(selectedColumns).filter(
      (col) => selectedColumns[col],
    );

    try {
      const res = await fetch("/api/admin/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableName: selectedModel.tableName,
          selectedColumns: activeCols,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedModel.tableName}_export.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const err = await res.json();
        alert(`Ошибка при экспорте: ${err.error}`);
      }
    } catch (error) {
      alert(`Ошибка сети при экспорте: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 3. Обработчик Предпросмотра перед Импортом
  const handlePreview = async () => {
    if (!file || !selectedModel) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tableName", selectedModel.tableName);

    try {
      const res = await fetch("/api/admin/import/preview", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setPreviewData(data);
    } catch (error) {
      alert(`Ошибка при проверке файла: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 4. Подтверждение Загрузки (Импорта)
  const handleConfirmImport = async () => {
    if (!file || !selectedModel) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tableName", selectedModel.tableName);

    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert(`Успешно обработано записей: ${data.count}`);
        setPreviewData(null);
        setFile(null);
      } else {
        alert(`Ошибка при сохранении: ${data.error}`);
      }
    } catch (error) {
      alert(`Ошибка сети при сохранении: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedModel)
    return <div className="p-6 text-gray-500">Загрузка структуры БД...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-200 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Универсальный обработчик таблицы
        </h2>
        <span className="text-xs bg-blue-100 text-blue-800 font-mono px-3 py-1 rounded-full">
          Модель: {selectedModel.modelName} (таблица: {selectedModel.tableName})
        </span>
      </div>

      {/* Селектор таблиц */}
      <div>
        <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
          Выберите таблицу:
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {schemas.map((s) => (
            <button
              key={s.tableName}
              onClick={() => selectModel(s)}
              className={`px-3.5 py-1.5 text-sm rounded-lg whitespace-nowrap transition ${
                selectedModel.tableName === s.tableName
                  ? "bg-blue-600 text-white font-medium shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s.modelName}
            </button>
          ))}
        </div>
      </div>

      {/* Чекбоксы колонок */}
      <div>
        <div className="text-xs font-semibold uppercase text-gray-500 mb-2">
          Выберите колонки:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 bg-gray-50 p-4 rounded-lg border">
          {selectedModel.fields.map((field) => (
            <label
              key={field.name}
              className="flex items-center space-x-2 text-sm cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={!!selectedColumns[field.name]}
                onChange={() => toggleColumn(field.name)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span
                className={
                  field.isReadOnly
                    ? "text-gray-400 font-mono"
                    : "text-gray-800 font-medium"
                }
              >
                {field.name}
              </span>
              {field.isReadOnly && (
                <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                  🔒 Read-only
                </span>
              )}
              {field.isRestricted && (
                <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                  ⚠️ Уникальное
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Панель с действиями */}
      <div className="border-t pt-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Кнопка Выгрузить */}
          <button
            onClick={handleExport}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>📥</span> Выгрузить таблицу (XLSX)
          </button>

          {/* Загрузка файла для импорта */}
          <div className="flex items-center gap-2 border p-1.5 rounded-lg bg-gray-50 w-full sm:w-auto flex-1 max-w-xl">
            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => {
                setFile(e.target.files[0] || null);
                setPreviewData(null);
              }}
              className="text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full"
            />
            {file && !previewData && (
              <button
                onClick={handlePreview}
                disabled={loading}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-sm font-medium transition whitespace-nowrap disabled:opacity-50"
              >
                {loading ? "Анализ..." : "Проверить"}
              </button>
            )}
          </div>
        </div>

        {/* Предпросмотр перед Импортом */}
        {previewData && (
          <div className="space-y-3 bg-slate-50 p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">
                Всего строк в файле:{" "}
                <span className="font-bold">{previewData.totalRows}</span> |
                Готовы к загрузке:{" "}
                <span className="text-green-600 font-bold">
                  {previewData.validRowsCount}
                </span>
              </div>
              <button
                onClick={handleConfirmImport}
                disabled={loading || previewData.hasErrors}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium transition shadow"
              >
                {loading ? "Сохранение..." : "Загрузить в БД"}
              </button>
            </div>

            {previewData.hasErrors && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                ⚠️ В файле обнаружены ошибки! Исправьте их в Excel перед
                загрузкой.
              </div>
            )}

            <div className="max-h-60 overflow-y-auto border rounded bg-white text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="p-2 border-b">Строка</th>
                    <th className="p-2 border-b">Статус</th>
                    <th className="p-2 border-b">Данные</th>
                    <th className="p-2 border-b">Ошибки</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.rows.map((row) => (
                    <tr
                      key={row.rowNumber}
                      className={row.isValid ? "hover:bg-gray-50" : "bg-red-50"}
                    >
                      <td className="p-2 border-b font-mono text-gray-500">
                        {row.rowNumber}
                      </td>
                      <td className="p-2 border-b">
                        {row.isValid ? (
                          <span className="text-green-600 font-bold">✓ OK</span>
                        ) : (
                          <span className="text-red-600 font-bold">
                            ✗ Ошибка
                          </span>
                        )}
                      </td>
                      <td className="p-2 border-b max-w-xs truncate font-mono">
                        {JSON.stringify(row.data)}
                      </td>
                      <td className="p-2 border-b text-red-600 font-medium">
                        {row.errors.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
