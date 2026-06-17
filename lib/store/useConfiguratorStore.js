import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Создание нового элемента щита ───────────────────────────────────────────
export function makeItem(type, deviceType, params = {}) {
  return {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
    type,
    deviceType,
    label: "",
    params,
    product: null,
    qty: 1,
  };
}

// ─── Дефолтное состояние щита (перенесено из configurator.jsx) ───────────────
function defaultShield() {
  return {
    name: "ВРУ-1",
    inputs: [
      makeItem("input", "switch", {
        brand: "IEK (ИЭК)",
        rating: "250",
        poles: "3",
      }),
    ],
    meters: [
      makeItem("meter", "meter", { brand: "Инкотекс СК", phases: "3" }),
    ],
    lines: [
      makeItem("line", "breaker", {
        brand: "",
        rating: "16",
        poles: "1",
        curve: "C",
        breaking_capacity: "4.5",
      }),
    ],
  };
}

export const SECTION_KEYS = ["inputs", "meters", "lines"];

const useConfiguratorStore = create(
  persist(
    (set, get) => ({
      shield: defaultShield(),
      demandFactor: 0.7, // редактируемый коэффициент спроса (раньше хардкод 0.7)
      aiPreview: null, // результат распознавания схемы для панели предпросмотра

      // ─── Полная замена щита ───────────────────────────────────────────────
      setShield: (shield) => set({ shield }),
      resetShield: () => set({ shield: defaultShield() }),

      // ─── Обновление поля элемента ─────────────────────────────────────────
      update: (section, id, field, value) =>
        set((state) => ({
          shield: {
            ...state.shield,
            [section]: state.shield[section].map((i) =>
              i.id === id ? { ...i, [field]: value } : i,
            ),
          },
        })),

      // ─── Обновление параметра элемента ────────────────────────────────────
      updateParams: (section, id, field, value) =>
        set((state) => ({
          shield: {
            ...state.shield,
            [section]: state.shield[section].map((i) =>
              i.id === id
                ? { ...i, params: { ...i.params, [field]: value } }
                : i,
            ),
          },
        })),

      // ─── Добавление элемента в секцию ─────────────────────────────────────
      add: (section, type, deviceType) =>
        set((state) => ({
          shield: {
            ...state.shield,
            [section]: [
              ...state.shield[section],
              makeItem(type, deviceType),
            ],
          },
        })),

      // ─── Удаление элемента ────────────────────────────────────────────────
      remove: (section, id) =>
        set((state) => ({
          shield: {
            ...state.shield,
            [section]: state.shield[section].filter((i) => i.id !== id),
          },
        })),

      // ─── Перемещение элемента внутри секции (DnD) ─────────────────────────
      moveItem: (section, activeId, overId) =>
        set((state) => {
          const arr = state.shield[section];
          const oldIdx = arr.findIndex((i) => i.id === activeId);
          const newIdx = arr.findIndex((i) => i.id === overId);
          if (oldIdx === -1 || newIdx === -1 || oldIdx === newIdx) return state;
          const newArr = arr.slice();
          const [moved] = newArr.splice(oldIdx, 1);
          newArr.splice(newIdx, 0, moved);
          return { shield: { ...state.shield, [section]: newArr } };
        }),

      // ─── Коэффициент спроса ───────────────────────────────────────────────
      setDemandFactor: (value) => set({ demandFactor: value }),

      // ─── Сохранение названия ──────────────────────────────────────────────
      setName: (name) =>
        set((state) => ({ shield: { ...state.shield, name } })),

      // ─── Загрузка готового проекта (заменяет содержимое щита) ─────────────
      loadProject: (shield) => set({ shield, aiPreview: null }),

      // ─── AI-распознавание: предпросмотр ───────────────────────────────────
      setAiPreview: (data) => set({ aiPreview: data }),
      clearAiPreview: () => set({ aiPreview: null }),

      // ─── Подобранные товары: обновить конкретный элемент ──────────────────
      // Используется «Подобрать всё»: подменяет product у элементов секции
      setSectionProducts: (section, productsByItemId) =>
        set((state) => ({
          shield: {
            ...state.shield,
            [section]: state.shield[section].map((item) =>
              productsByItemId[item.id] !== undefined
                ? { ...item, product: productsByItemId[item.id] }
                : item,
            ),
          },
        })),
    }),
    {
      name: "configurator-storage",
    },
  ),
);

export default useConfiguratorStore;
