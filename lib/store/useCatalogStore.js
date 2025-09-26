import { create } from "zustand";

export const useCatalogStore = create((set) => ({
  currentPage: 1,
  setPage: (page) => set({ currentPage: page }),
}));
