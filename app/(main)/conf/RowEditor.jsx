"use client";

import { useState, useEffect } from "react";
import { Search, Trash2, ShieldCheck, Plus, Minus, X } from "lucide-react";

// ─── Константы ─────────────────────────────────────────────────────────────────
export const DEVICE_TYPES = [
  { value: "breaker", label: "Автомат", color: "#3b82f6" },
  { value: "power_breaker", label: "Силовой автомат", color: "#3b82f6" },
  { value: "switch", label: "Рубильник", color: "#8b5cf6" },
  { value: "diff", label: "Дифавтомат", color: "#ec4899" },
  { value: "rcd", label: "УЗО", color: "#f43f5e" },
  { value: "surge", label: "УЗИП", color: "#f97316" },
  { value: "contactor", label: "Контактор", color: "#eab308" },
  { value: "relay", label: "Реле", color: "#84cc16" },
  { value: "meter", label: "Счётчик", color: "#06b6d4" },
  { value: "transformer", label: "Трансформатор тока", color: "#14b8a6" },
  { value: "busbar", label: "Шина / DIN-рейка", color: "#94a3b8" },
  { value: "other", label: "Прочее", color: "#64748b" },
];

const DEVICE_COLOR = Object.fromEntries(
  DEVICE_TYPES.map((d) => [d.value, d.color])
);

// Бренды для каждого типа устройства
const BRANDS_BY_TYPE = {
  breaker: [
    { value: "IEK (ИЭК)", label: "IEK (ИЭК)" },
    { value: "EKF", label: "EKF" },
    { value: "DEKraft", label: "DEKraft" },
    { value: "CHINT", label: "CHINT" },
    { value: "КЭАЗ (Курский электроаппаратный завод)", label: "КЭАЗ" },
    { value: "ABB", label: "ABB" },
    { value: "Schneider Electric", label: "Schneider Electric" },
  ],
  power_breaker: [
    { value: "IEK (ИЭК)", label: "IEK (ИЭК)" },
    { value: "EKF", label: "EKF" },
    { value: "DEKraft", label: "DEKraft" },
    { value: "CHINT", label: "CHINT" },
    { value: "КЭАЗ (Курский электроаппаратный завод)", label: "КЭАЗ" },
    { value: "ABB", label: "ABB" },
    { value: "Schneider Electric", label: "Schneider Electric" },
  ],
  switch: [
    { value: "IEK (ИЭК)", label: "IEK (ИЭК)" },
    { value: "EKF", label: "EKF" },
    { value: "КЭАЗ (Курский электроаппаратный завод)", label: "КЭАЗ" },
    { value: "ABB", label: "ABB" },
  ],
  diff: [
    { value: "IEK (ИЭК)", label: "IEK (ИЭК)" },
    { value: "EKF", label: "EKF" },
    { value: "DEKraft", label: "DEKraft" },
    { value: "CHINT", label: "CHINT" },
    { value: "Schneider Electric", label: "Schneider Electric" },
    { value: "ABB", label: "ABB" },
  ],
  rcd: [
    { value: "IEK (ИЭК)", label: "IEK (ИЭК)" },
    { value: "EKF", label: "EKF" },
    { value: "DEKraft", label: "DEKraft" },
    { value: "CHINT", label: "CHINT" },
    { value: "Schneider Electric", label: "Schneider Electric" },
    { value: "ABB", label: "ABB" },
  ],
  surge: [
    { value: "IEK (ИЭК)", label: "IEK (ИЭК)" },
    { value: "EKF", label: "EKF" },
    { value: "DEHN", label: "DEHN" },
    { value: "Schneider Electric", label: "Schneider Electric" },
    { value: "OBO Bettermann", label: "OBO Bettermann" },
  ],
  contactor: [
    { value: "IEK (ИЭК)", label: "IEK (ИЭК)" },
    { value: "EKF", label: "EKF" },
    { value: "DEKraft", label: "DEKraft" },
    { value: "ABB", label: "ABB" },
    { value: "Schneider Electric", label: "Schneider Electric" },
    { value: "CHINT", label: "CHINT" },
  ],
  relay: [
    { value: "IEK (ИЭК)", label: "IEK (ИЭК)" },
    { value: "EKF", label: "EKF" },
    { value: "Finder", label: "Finder" },
    { value: "Omron", label: "Omron" },
    { value: "ABB", label: "ABB" },
  ],
  meter: [
    { value: "Инкотекс СК", label: "Инкотекс" },
    { value: "Нева", label: "Нева" },
    { value: "Энергомера", label: "Энергомера" },
    { value: "Меркурий", label: "Меркурий" },
    { value: "Матрица", label: "Матрица" },
  ],
  transformer: [
    { value: "IEK (ИЭК)", label: "IEK (ИЭК)" },
    { value: "EKF", label: "EKF" },
    { value: "КЭАЗ (Курский электроаппаратный завод)", label: "КЭАЗ" },
    { value: "ABB", label: "ABB" },
    { value: "Schneider Electric", label: "Schneider Electric" },
  ],
  busbar: [
    { value: "IEK (ИЭК)", label: "IEK (ИЭК)" },
    { value: "EKF", label: "EKF" },
    { value: "DKC", label: "DKC" },
    { value: "ABB", label: "ABB" },
  ],
  other: [
    { value: "IEK (ИЭК)", label: "IEK (ИЭК)" },
    { value: "EKF", label: "EKF" },
    { value: "DEKraft", label: "DEKraft" },
    { value: "CHINT", label: "CHINT" },
    { value: "КЭАЗ (Курский электроаппаратный завод)", label: "КЭАЗ" },
  ],
};

export const PARAMS_BY_TYPE = {
  breaker: ["brand", "rating", "poles", "curve", "breaking_capacity"],
  power_breaker: ["brand", "rating", "poles", "curve", "breaking_capacity"],
  switch: ["brand", "rating", "poles"],
  diff: [
    "brand",
    "rating",
    "poles",
    "breaking_capacity",
    "diff_current",
    "diff_type",
  ],
  rcd: ["brand", "rating", "poles", "diff_current", "diff_type"],
  surge: ["brand", "poles"],
  contactor: ["brand", "rating", "poles"],
  relay: ["brand"],
  meter: [
    "brand",
    "rating",
    "phases",
    "meter_type",
    "tariff_type",
    "accuracy_class",
  ],
  transformer: ["brand", "rating", "poles"],
  busbar: ["brand"],
  other: ["brand"],
};

const FIELD_LABELS = {
  brand: "Бренд",
  rating: "Ток, А",
  poles: "Полюса",
  phases: "Полюса",
  curve: "Х-ка",
  breaking_capacity: "Откл., кА",
  diff_current: "Iут",
  diff_type: "Тип УЗО",
  meter_type: "Тип счетчика",
  tariff_type: "Тариф",
  accuracy_class: "Класс точности",
};

const FIELD_OPTIONS = {
  // brand — динамически заполняется из BRANDS_BY_TYPE
  rating: [
    { value: "", label: "—" },
    ...[
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "8",
      "10",
      "16",
      "20",
      "25",
      "32",
      "40",
      "50",
      "63",
      "80",
      "100",
      "125",
      "160",
      "200",
      "250",
      "400",
      "630",
    ].map((v) => ({ value: v, label: `${v} A` })),
  ],
  poles: [
    { value: "", label: "—" },
    { value: "1", label: "1П" },
    { value: "2", label: "2П" },
    { value: "3", label: "3П" },
    { value: "4", label: "4П" },
  ],
  phases: [
    { value: "", label: "—" },
    { value: "1", label: "1П" },
    { value: "2", label: "2П" },
    { value: "3", label: "3П" },
    { value: "4", label: "4П" },
  ],
  curve: [
    { value: "", label: "—" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ],
  breaking_capacity: [
    { value: "", label: "—" },
    { value: "4.5", label: "4.5" },
    { value: "6", label: "6" },
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "35", label: "35" },
  ],
  diff_current: [
    { value: "", label: "—" },
    { value: "0.010", label: "10 мА" },
    { value: "0.030", label: "30 мА" },
    { value: "0.100", label: "100 мА" },
    { value: "0.300", label: "300 мА" },
  ],
  diff_type: [
    { value: "", label: "—" },
    { value: "AC", label: "AC" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
  ],
  meter_type: [
    { value: "", label: "—" },
    { value: "Электронный", label: "Электронный" },
    { value: "Электромеханический", label: "Электромеханический" },
  ],
  tariff_type: [
    { value: "", label: "—" },
    { value: "Однотарифный", label: "Однотарифный" },
    { value: "Многотарифный", label: "Многотарифный" },
  ],
  accuracy_class: [
    { value: "", label: "—" },
    { value: "1,0", label: "1,0" },
    { value: "2,0", label: "2,0" },
    { value: "1,0/2,0", label: "1,0/2,0" },
  ],
};

export const PARAM_TO_API = {
  brand: "brand",
  poles: "poles",
  phases: "phases",
  curve: "curve",
  breaking_capacity: "breaking_capacity",
  rating: "nominal_current",
  diff_current: "diff_current",
  diff_type: "diff_type",
};

// ─── Компонент добавления произвольного параметра ──────────────────────────────
function CustomParamRow({ param, onRemove }) {
  return (
    <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700 rounded px-2 py-1 text-xs">
      <span className="text-slate-400 font-medium">{param.key}:</span>
      <span className="text-white">{param.value}</span>
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 text-slate-600 hover:text-red-400 transition-colors"
      >
        <X size={11} />
      </button>
    </div>
  );
}

// ─── Основной компонент ────────────────────────────────────────────────────────
export default function RowEditor({
  item,
  onParamsChange,
  onChange,
  onRemove,
  rowNumber,
}) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Кастомные параметры
  const [customParams, setCustomParams] = useState(item.customParams || []);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customKey, setCustomKey] = useState("");
  const [customValue, setCustomValue] = useState("");

  const deviceType = item.deviceType || "breaker";
  const visibleParams = PARAMS_BY_TYPE[deviceType] || PARAMS_BY_TYPE.breaker;
  const accentColor = DEVICE_COLOR[deviceType] || "#64748b";

  // Бренды текущего типа устройства
  const brandOptions = [
    { value: "", label: "—" },
    ...(BRANDS_BY_TYPE[deviceType] || []),
  ];

  const [localLabel, setLocalLabel] = useState(item.label || "");
  const [localQty, setLocalQty] = useState(item.qty || 1);

  useEffect(() => {
    setLocalLabel(item.label || "");
    setLocalQty(item.qty || 1);
  }, [item.id, item.label, item.qty]);

  // Сброс бренда при смене типа устройства
  const handleDeviceTypeChange = (newType) => {
    onChange("deviceType", newType);
    onChange("product", null);
    // Сбрасываем бренд, если он не входит в список нового типа
    const newBrands = BRANDS_BY_TYPE[newType] || [];
    const currentBrand = item.params?.brand;
    if (currentBrand && !newBrands.find((b) => b.value === currentBrand)) {
      onParamsChange("brand", "");
    }
    setResults([]);
    setNotFound(false);
  };

  const addCustomParam = (e) => {
    e.preventDefault();
    if (!customKey.trim() || !customValue.trim()) return;
    const updated = [
      ...customParams,
      { key: customKey.trim(), value: customValue.trim() },
    ];
    setCustomParams(updated);
    onChange("customParams", updated);
    setCustomKey("");
    setCustomValue("");
    setShowCustomInput(false);
  };

  const removeCustomParam = (index) => {
    const updated = customParams.filter((_, i) => i !== index);
    setCustomParams(updated);
    onChange("customParams", updated);
  };

  const selectProduct = (e, prod) => {
    e.preventDefault();
    onChange("product", prod);
    setResults([]);
    setNotFound(false);
  };

  const clearProduct = (e) => {
    e.preventDefault();
    onChange("product", null);
  };

  const changeQty = (e, val) => {
    e.preventDefault();
    const newQty = Math.max(1, val);
    setLocalQty(newQty);
    onChange("qty", newQty);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    try {
      const params = { device_type: deviceType };
      visibleParams.forEach((key) => {
        const val = item.params?.[key];
        if (val) params[PARAM_TO_API[key] || key] = val;
      });
      // Добавляем кастомные параметры в поиск
      customParams.forEach(({ key, value }) => {
        if (key && value) params[key] = value;
      });
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`/api/v1/products${query ? `?${query}` : ""}`);
      const json = await res.json();
      if (json.success) {
        setResults(json.data);
        if (json.data.length === 0) setNotFound(true);
      }
    } catch (e) {
      console.error("Ошибка поиска:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    if (confirmDelete) {
      onRemove?.();
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div
      className="bg-cardBackground text-foreground border border-slate-800 rounded-xl overflow-hidden transition-all"
      style={{ borderLeftColor: accentColor, borderLeftWidth: 3 }}
    >
      <div className="p-3 space-y-2">
        {/* СТРОКА 1: основные параметры */}
        <div className="flex items-end gap-2 flex-wrap text-xs">
          {rowNumber != null && (
            <span
              className="text-[10px] font-bold w-5 h-5 rounded flex items-center justify-center shrink-0 mb-0.5"
              style={{
                backgroundColor: accentColor + "33",
                color: accentColor,
              }}
            >
              {rowNumber}
            </span>
          )}

          {/* Название */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] uppercase tracking-wide">Название</span>
            <input
              type="text"
              placeholder="Линия..."
              label="Название линии"
              value={localLabel}
              onChange={(e) => setLocalLabel(e.target.value)}
              onBlur={() => onChange("label", localLabel)}
              className="bg-cardBackground border border-slate-700 text-foreground p-1.5 rounded text-xs w-36"
            />
          </div>

          {/* Тип устройства */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] text-foreground uppercase tracking-wide">
              Тип
            </span>
            <select
              className="bg-cardBackground border border-slate-600 text-foreground p-1.5 rounded outline-none"
              value={deviceType}
              onChange={(e) => handleDeviceTypeChange(e.target.value)}
            >
              {DEVICE_TYPES.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Параметры типа устройства */}
          {visibleParams.map((key) => (
            <div key={key} className="flex flex-col gap-0.5">
              <span className="text-[9px] text-foreground uppercase tracking-wide">
                {FIELD_LABELS[key]}
              </span>
              <select
                className="bg-cardBackground border border-slate-700 text-foreground p-1.5 rounded outline-none"
                value={item.params?.[key] || ""}
                onChange={(e) => onParamsChange(key, e.target.value)}
              >
                {/* Для brand — используем список конкретного типа */}
                {key === "brand"
                  ? brandOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))
                  : (FIELD_OPTIONS[key] || []).map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
              </select>
            </div>
          ))}

          {/* Кнопки поиска и удаления */}
          <div className="flex items-end gap-2 ml-auto mb-0.5">
            <button
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors py-1.5 px-3 rounded flex items-center gap-1.5 whitespace-nowrap text-white"
            >
              <Search size={13} />
              {loading ? "Поиск…" : "ПОДОБРАТЬ"}
            </button>

            {onRemove &&
              (confirmDelete ? (
                <div className="flex items-center gap-1 text-[10px]">
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="bg-red-600 px-2 py-1 rounded text-white"
                  >
                    Да
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setConfirmDelete(false);
                    }}
                    className="bg-slate-700 px-2 py-1 rounded text-white"
                  >
                    Нет
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-slate-500 hover:text-red-400 p-1"
                >
                  <Trash2 size={16} />
                </button>
              ))}
          </div>
        </div>

        {/* СТРОКА 2: кастомные параметры */}
        <div className="flex items-center gap-2 flex-wrap">
          {customParams.map((param, i) => (
            <CustomParamRow
              key={i}
              param={param}
              onRemove={() => removeCustomParam(i)}
            />
          ))}

          {showCustomInput ? (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Параметр"
                label="Название параметра"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                className="bg-cardBackground border border-slate-700 text-foreground p-1 rounded text-xs w-24"
                autoFocus
              />
              <input
                type="text"
                placeholder="Значение"
                label="Значение параметра"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomParam(e)}
                className="bg-cardBackground border border-slate-700 text-foreground p-1 rounded text-xs w-24"
              />
              <button
                type="button"
                onClick={addCustomParam}
                className="text-[10px] bg-cardBackground hover:bg-slate-600 text-foreground px-2 py-1 rounded transition-colors"
              >
                ОК
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCustomInput(false);
                  setCustomKey("");
                  setCustomValue("");
                }}
                className="text-foreground hover:text-red-400"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowCustomInput(true);
              }}
              className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300 transition-colors py-0.5 px-1.5 rounded border border-dashed border-slate-700 hover:border-slate-500"
            >
              <Plus size={10} />
              параметр
            </button>
          )}
        </div>

        {/* РЕЗУЛЬТАТЫ ПОИСКА */}
        {(results.length > 0 || notFound) && (
          <div className="mt-2">
            {notFound && (
              <div className="text-xs text-foreground italic px-1">
                Ничего не найдено
              </div>
            )}
            {results.length > 0 && (
              <div className="bg-cardBackground/10 rounded p-2 max-h-44 overflow-y-auto space-y-0.5">
                {results.map((prod) => (
                  <div
                    key={prod.sync_uid}
                    onClick={(e) => selectProduct(e, prod)}
                    className="p-2 hover:bg-cardBackground/10 cursor-pointer rounded transition-colors"
                  >
                    <div className="text-xs text-foreground">{prod.header}</div>
                    <div className="text-[10px] text-foreground">
                      {prod.articul} — {prod.price} ₽
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ВЫБРАННЫЙ ТОВАР */}
        {item.product && (
          <div
            className="flex justify-between items-center p-2 rounded border"
            style={{
              backgroundColor: accentColor + "15",
              borderColor: accentColor + "40",
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <ShieldCheck
                size={15}
                style={{ color: accentColor }}
                className="shrink-0"
              />
              <span className="text-xs truncate">{item.product.header}</span>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center rounded overflow-hidden border border-slate-700">
                <button
                  type="button"
                  onClick={(e) => changeQty(e, localQty - 1)}
                  className="px-2 py-1 bg-cardBackground hover:bg-cardBackground/10 text-foreground"
                >
                  <Minus size={11} />
                </button>
                <span className="px-3 py-1 bg-cardBackground text-xs font-medium min-w-8 text-center">
                  {localQty}
                </span>
                <button
                  type="button"
                  onClick={(e) => changeQty(e, localQty + 1)}
                  className="px-2 py-1 bg-cardBackground hover:bg-cardBackground/10 text-foreground"
                >
                  <Plus size={11} />
                </button>
              </div>

              <span
                className="text-xs font-semibold w-24 text-right"
                style={{ color: accentColor }}
              >
                {Math.round(localQty * item.product.price).toLocaleString(
                  "ru-RU"
                )}{" "}
                ₽
              </span>

              <button
                type="button"
                onClick={clearProduct}
                className="text-slate-600 hover:text-red-400 p-1"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
