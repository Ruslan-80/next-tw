"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useFilterStore } from "@/lib/store/mobileFilterButton";
import {
  Home,
  SlidersHorizontal,
  Command,
  ArrowLeft,
  FileText,
  PhoneCall,
  BookOpen,
} from "lucide-react";
import { ModeToggle } from "../ModeToggle";

// Список ссылок для выпадающего меню первой кнопки
const homeDropdownItems = [
  { name: "Главная", slug: "/", icon: Home },
  { name: "Статьи", slug: "/blogs", icon: FileText },
  { name: "Конфигуратор ВРУ", slug: "/conf", icon: BookOpen },
  { name: "Контакты", slug: "/contacts", icon: PhoneCall },
];

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(true);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Достаем данные из Zustand
  const { setIsOpen, selectedFiltersCount } = useFilterStore();
  const isCatalogPage = pathname.includes("/catalog");

  const toggleMenu = () => {
    setIsMinimized(!isMinimized);
    setIsHomeDropdownOpen(false); // Закрываем выпадающее меню при сворачивании
  };

  // Закрытие dropdown при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsHomeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-6 pt-2 pointer-events-none">
      <motion.nav
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-neutral-800 pointer-events-auto
          ${
            isMinimized
              ? "w-16 h-16 rounded-full bg-[#6C5CE7] ml-0 justify-center overflow-hidden"
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
              {/* ЛЕВЫЕ ПУНКТЫ: Главная (с Dropdown) и Переключатель темы */}
              <div className="flex flex-1 justify-around items-center">
                {/* КНОПКА ГЛАВНАЯ С DROPDOWN */}
                <div className="relative" ref={dropdownRef}>
                  {/* Выпадающее меню (Всплывает наверх) */}
                  <AnimatePresence>
                    {isHomeDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: -15, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-0 mb-2 w-48 bg-[#1A1A1D] border border-neutral-800 rounded-2xl p-2 shadow-2xl z-50 flex flex-col gap-1"
                      >
                        {homeDropdownItems.map((menuItem) => {
                          const Icon = menuItem.icon;
                          const isActive = pathname === menuItem.slug;
                          return (
                            <Link
                              key={menuItem.name}
                              href={menuItem.slug}
                              onClick={() => setIsHomeDropdownOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                isActive
                                  ? "bg-[#6C5CE7]/10 text-[#6C5CE7]"
                                  : "text-neutral-300 hover:bg-neutral-800/60 active:bg-neutral-800"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              <span>{menuItem.name}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Кнопка триггер */}
                  <button
                    onClick={() => setIsHomeDropdownOpen((prev) => !prev)}
                    className="flex flex-col items-center justify-center p-1"
                  >
                    <Home
                      className={`h-7 w-7 transition-colors ${
                        pathname === "/" || isHomeDropdownOpen
                          ? "text-[#6C5CE7]"
                          : "text-neutral-500"
                      }`}
                    />
                  </button>
                </div>

                {/* ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ */}
                <ModeToggle />
              </div>

              {/* ПУСТОЕ МЕСТО ПОД ЦЕНТРАЛЬНУЮ КНОПКУ */}
              <div className="w-16 flex-shrink-0" />

              {/* ПРАВЫЕ ПУНКТЫ: Фильтры и Назад */}
              <div className="flex flex-1 justify-around items-center">
                {/* КНОПКА ФИЛЬТРОВ */}
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex flex-col items-center relative"
                >
                  <SlidersHorizontal
                    className={`h-7 w-7 ${
                      isCatalogPage
                        ? "text-blue-400"
                        : "text-neutral-500 opacity-50"
                    }`}
                  />
                  {selectedFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-[#1A1A1D]">
                      {selectedFiltersCount}
                    </span>
                  )}
                </button>

                {/* КНОПКА НАЗАД */}
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
