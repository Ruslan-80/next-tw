import { create } from "zustand";

export const useFilterStore = create((set) => ({
  isOpen: false,
  selectedFiltersCount: 0,
  // Метод для открытия/закрытия
  setIsOpen: (open) => set({ isOpen: open }),
  // Метод для обновления счетчика (вызывайте его при изменении фильтров)
  setFiltersCount: (count) => set({ selectedFiltersCount: count }),
}));
