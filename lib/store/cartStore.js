import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      token: "default-cart-token",
      items: [],
      totalItems: 0,
      totalAmount: 0,

      // Загрузка корзины и токена через API
      fetchCart: async () => {
        const response = await fetch("/api/cart", { credentials: "include" });
        const data = await response.json();
        const totalItems = data.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalAmount = data.items.reduce(
          (sum, item) => sum + item.quantity * item.product.basePrice,
          0
        );
        console.log("Токен из API:", data.token); // Логируем токен для проверки
        set({
          token: data.token, // Сохраняем токен из API
          items: data.items,
          totalItems,
          totalAmount,
        });
      },
    }),
    {
      name: "cart-storage", // Храним в localStorage
    }
  )
);

export default useCartStore;
