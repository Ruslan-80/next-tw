// store/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      count: 0,
      total: 0,
      setCart: (cart) => set(cart),
    }),
    {
      name: "cart-storage", // имя в localStorage
    }
  )
);
