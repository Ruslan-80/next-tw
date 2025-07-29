"use client";

import { useState, useEffect } from "react";

export function useCart() {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const savedCart = localStorage.getItem("cart");
                if (savedCart) {
                    setCart(JSON.parse(savedCart));
                } else {
                    // Генерируем уникальный токен для корзины
                    const token = `cart_${Date.now()}_${Math.random()
                        .toString(36)
                        .slice(2)}`;
                    setCart({ token, items: [] });
                }
            } catch (e) {
                console.error("Failed to access localStorage:", e);
            }
        }
    }, []);

    useEffect(() => {
        if (cart && typeof window !== "undefined") {
            try {
                localStorage.setItem("cart", JSON.stringify(cart));
            } catch (e) {
                console.error("Failed to save to localStorage:", e);
            }
        }
    }, [cart]);

    const addToCart = (productItemId, quantity = 1) => {
        setCart(prev => {
            if (!prev) return prev;
            const existingItem = prev.items.find(
                item => item.productItemId === productItemId
            );
            if (existingItem) {
                return {
                    ...prev,
                    items: prev.items.map(item =>
                        item.productItemId === productItemId
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    ),
                };
            }
            return {
                ...prev,
                items: [...prev.items, { productItemId, quantity }],
            };
        });
    };

    return { cart, addToCart };
}
