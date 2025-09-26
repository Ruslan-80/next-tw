import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCompareStore = create(
  persist(
    (set) => ({
      compareIds: [],
      addToCompare: (id) =>
        set((state) => ({
          compareIds: [...new Set([...state.compareIds, id])],
        })),
      removeFromCompare: (id) =>
        set((state) => ({
          compareIds: state.compareIds.filter((itemId) => itemId !== id),
        })),
      clearCompare: () => set({ compareIds: [] }),
    }),
    {
      name: "compare-storage", // Ключ для хранения в localStorage
    }
  )
);

export default useCompareStore;
