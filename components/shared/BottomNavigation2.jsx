"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useFilterStore } from "@/lib/store/mobileFilterButton"; // Путь к вашему стору
import {
  Home,
  Search,
  User,
  Command,
  SlidersHorizontal,
  ShoppingCart,
  ArrowLeft,
  Moon,
  Sun,
} from "lucide-react";
import { ModeToggle } from "../ModeToggle";

const navItems = [
  { name: "Главная", icon: Home, slug: "/" },
  // { name: "Поиск", icon: Sun, slug: "/" },
  // "Фильтры" теперь обрабатываются отдельно ниже
  { name: "Назад", icon: ArrowLeft, slug: "/" },
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(true);

  // Достаем данные из Zustand
  const { setIsOpen, selectedFiltersCount } = useFilterStore();
  const isCatalogPage = pathname.includes("/catalog"); // Или ваша проверка страницы товаров
  const toggleMenu = () => setIsMinimized(!isMinimized);

  // Функция для возврата назад
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-6 pt-2 pointer-events-none">
      <motion.nav
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-neutral-800 pointer-events-auto overflow-hidden
          ${
            isMinimized
              ? "w-16 h-16 rounded-full bg-[#6C5CE7] ml-0 justify-center"
              : "w-full max-w-lg mx-auto rounded-full bg-[#1A1A1D] px-2 py-3 justify-between"
          }
        `}
      >
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex w-full items-center justify-around"
            >
              {/* ЛЕВЫЕ ПУНКТЫ: Главная и Поиск */}
              <div className="flex flex-1 justify-around">
                {navItems.slice(0, 1).map((item) => (
                  <Link
                    key={item.name}
                    href={item.slug}
                    className="flex flex-col items-center"
                  >
                    <item.icon
                      className={`h-7 w-7 ${pathname === item.slug ? "text-[#6C5CE7]" : "text-neutral-500"}`}
                    />
                  </Link>
                ))}
                <ModeToggle />
              </div>

              {/* ПУСТОЕ МЕСТО ПОД ЦЕНТРАЛЬНУЮ КНОПКУ */}
              <div className="w-16 flex-shrink-0" />

              {/* ПРАВЫЕ ПУНКТЫ: Фильтры (вместо истории) и Профиль */}
              <div className="flex flex-1 justify-around">
                {/* КНОПКА ФИЛЬТРОВ */}
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex flex-col items-center relative"
                >
                  <SlidersHorizontal
                    className={`h-7 w-7 ${isCatalogPage ? "text-blue-400" : "text-neutral-500 opacity-50"}`}
                  />
                  {selectedFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-[#1A1A1D]">
                      {selectedFiltersCount}
                    </span>
                  )}
                </button>

                {/* КНОПКА НАЗАД (Вместо профиля) */}

                <button
                  onClick={handleBack}
                  className="flex flex-col items-center group active:scale-90 transition-transform"
                >
                  <ArrowLeft className="h-7 w-7 text-neutral-500 group-hover:text-white transition-colors" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ЦЕНТРАЛЬНАЯ КНОПКА */}
        <motion.button
          layout
          onClick={toggleMenu}
          className={`absolute flex items-center justify-center transition-colors
            ${
              isMinimized
                ? "inset-0 w-full h-full bg-transparent"
                : "left-1/2 -translate-x-1/2 w-14 h-14 bg-[#6C5CE7] rounded-full shadow-lg shadow-[#6C5CE7]/30"
            }
          `}
        >
          <Command className="h-6 w-6 text-white shrink-0" />
        </motion.button>
      </motion.nav>
    </div>
  );
}
