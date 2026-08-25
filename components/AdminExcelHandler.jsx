// components/AdminExcelHandler.jsx
"use client";
import { useState } from "react";
import { TABLE_CONFIGS } from "@/lib/schemaConfig";

// Все доступные модели из вашей схемы Prisma
const TABLES = [
  { id: "product", name: "Товары (Product)" },
  { id: "category", name: "Категории (Category)" },
  { id: "productvariation", name: "Вариации (ProductVariation)" },
  { id: "user", name: "Пользователи (User)" },
  { id: "orders", name: "Заказы (Order)" },
  { id: "attribute", name: "Атрибуты (Attribute)" },
];

// Колонки для примера (можно получать через API `Object.keys(prisma[model].fields)`)
const TABLE_COLUMNS = {
  product: [
    "id",
    "article",
    "name",
    "slug",
    "basePrice",
    "stock",
    "visibility",
    "description",
    "usp",
    "createdAt",
  ],
  category: [
    "id",
    "parentId",
    "name",
    "slug",
    "description",
    "visibility",
    "createdAt",
  ],
};

export default function AdminExcelHandler() {
  const [selectedTable, setSelectedTable] = useState("product");
  const [columns, setColumns] = useState(
    TABLE_COLUMNS.product.reduce((acc, col) => ({ ...acc, [col]: true }), {}),
  );
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const config = TABLE_CONFIGS[selectedTable] || {
    readOnly: [],
    restricted: [],
  };

  const handleTableChange = (tableName) => {
    setSelectedTable(tableName);
    const availableCols = TABLE_COLUMNS[tableName] || [
      "id",
      "name",
      "createdAt",
    ];
    setColumns(
      availableCols.reduce((acc, col) => ({ ...acc, [col]: true }), {}),
    );
  };

  const toggleColumn = (col) => {
    setColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  const handleExport = async () => {
    setLoading(true);
    const activeCols = Object.keys(columns).filter((col) => columns[col]);

    const res = await fetch("/api/admin/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tableName: selectedTable,
        selectedColumns: activeCols,
      }),
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedTable}.xlsx`;
      a.click();
    }
    setLoading(false);
  };

  const handleImport = async () => {
    if (!file) return alert("Выберите файл");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tableName", selectedTable);

    const res = await fetch("/api/admin/import", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert(`Успешно обработано записей: ${data.count}`);
    } else {
      alert(`Ошибка: ${data.error}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-200 max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        Универсальный XLSX Импорт / Экспорт
      </h2>

      {/* Выбор таблицы */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Выберите таблицу БД:
        </label>
        <select
          value={selectedTable}
          onChange={(e) => handleTableChange(e.target.value)}
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {TABLES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Чекбоксы колонок */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Выберите колонки для выгрузки:
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-lg border">
          {Object.keys(columns).map((col) => {
            const isReadOnly = config.readOnly?.includes(col);
            const isRestricted = config.restricted?.includes(col);

            return (
              <label
                key={col}
                className="flex items-center space-x-2 text-sm cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={columns[col]}
                  onChange={() => toggleColumn(col)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span
                  className={
                    isReadOnly ? "text-gray-400 font-mono" : "text-gray-800"
                  }
                >
                  {col}
                </span>
                {isReadOnly && (
                  <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                    🔒 Read-only
                  </span>
                )}
                {isRestricted && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                    ⚠️ Уникальное
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Действия */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
        <button
          onClick={handleExport}
          disabled={loading}
          className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition disabled:opacity-50"
        >
          Выгрузить в XLSX
        </button>

        <div className="flex items-center gap-2 border p-1.5 rounded-lg bg-gray-50 flex-1">
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleImport}
            disabled={loading || !file}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition disabled:opacity-50"
          >
            Загрузить
          </button>
        </div>
      </div>
    </div>
  );
}
