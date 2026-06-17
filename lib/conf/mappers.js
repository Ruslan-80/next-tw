import { makeItem } from "@/lib/store/useConfiguratorStore";

// ─── Маппинг типов AI-распознавания в типы конфигуратора ────────────────────
// AI schema (analyze-schema route) возвращает enum:
//   breaker | meter | disconnector | current_transformer
// Конфигуратор (RowEditor.jsx DEVICE_TYPES) использует более широкий набор.
//
// ВАЖНО: previous handleLoadTestProject покрывал только 3 из 4 — current_transformer
// ошибочно оседал в "lines" как breaker. Здесь это исправлено.
export const AI_TYPE_MAP = {
  breaker: { section: "lines", type: "line", deviceType: "breaker" },
  disconnector: { section: "inputs", type: "input", deviceType: "switch" },
  meter: { section: "meters", type: "meter", deviceType: "meter" },
  current_transformer: { section: "meters", type: "meter", deviceType: "transformer" },
};

// ─── Парсинг номинала тока из строки вида "250 А" / "50А" / "5-7,5А" ────────
// Перенесено из оригинального handleLoadTestProject (configurator.jsx:479-484).
// Берём первое число из строки (для диапазонов типа "5-7,5" это вилка).
export function parseRating(ratingA, fallback = "16") {
  if (!ratingA) return fallback;
  const match = ratingA.match(/^\s*(\d+(?:[.,]\d+)?)/);
  if (!match) return fallback;
  return match[1].replace(",", ".");
}

// ─── Конвертация массива компонентов AI в структуру щита ────────────────────
// aiData — это { components: [...] } из ответа /api/analyze-schema
// Возвращает { name, inputs, meters, lines } в формате shield-стейта.
export function aiComponentsToShield(aiData, name = "ВРУ (из схемы)") {
  const components = aiData?.components || [];

  const bucket = { inputs: [], meters: [], lines: [] };

  components.forEach((comp, idx) => {
    const mapping = AI_TYPE_MAP[comp.type] || AI_TYPE_MAP.breaker;
    const { section, type, deviceType } = mapping;

    const ratingValue = parseRating(comp.rating_a, "16");

    const item = makeItem(type, deviceType, {
      brand:
        section === "meters"
          ? comp.type === "current_transformer"
            ? "IEK (ИЭК)"
            : "Инкотекс СК"
          : "IEK (ИЭК)",
      rating: ratingValue,
      poles: comp.poles ? String(comp.poles) : "3",
      ...(deviceType === "breaker"
        ? { curve: "C", breaking_capacity: "4.5" }
        : {}),
      current_transformers: comp.current_transformers || null,
    });

    // Сохраняем исходную информацию для отображения
    item.label = comp.purpose || "";
    item.schemaId = comp.id;
    item.aiModel = comp.model || null;

    bucket[section].push(item);
  });

  // Хотя бы по одному элементу в каждой секции (как в дефолтном shield)
  SECTION_FALLBACK.forEach(({ key, type, deviceType, params }) => {
    if (bucket[key].length === 0) bucket[key].push(makeItem(type, deviceType, params));
  });

  return { name, ...bucket };
}

// Дефолтные параметры для пустых секций (как defaultShield)
const SECTION_FALLBACK = [
  {
    key: "inputs",
    type: "input",
    deviceType: "switch",
    params: { brand: "IEK (ИЭК)", rating: "250", poles: "3" },
  },
  {
    key: "meters",
    type: "meter",
    deviceType: "meter",
    params: { brand: "Инкотекс СК", phases: "3" },
  },
  {
    key: "lines",
    type: "line",
    deviceType: "breaker",
    params: { brand: "", rating: "16", poles: "1", curve: "C", breaking_capacity: "4.5" },
  },
];

export { SECTION_FALLBACK };
