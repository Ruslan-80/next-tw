"use client";
import React from "react";
// 1. Импортируем Link и usePathname из Next.js
import Link from "next/link";
import { usePathname } from "next/navigation";
// Импортируем иконки (lucide-react)
import {
  Home,
  Search,
  LayoutGrid,
  BarChart3,
  Clock3,
  User,
  Command,
} from "lucide-react";

// Навигационные пункты с путями (slug)
const navItems = [
  { name: "Главная", icon: Home, slug: "/" },
  { name: "Поиск", icon: Search, slug: "/search" },
  { name: "Действие", icon: Command, slug: "/action", centerAction: true }, // Центральная кнопка
  { name: "История", icon: Clock3, slug: "/history" },
  { name: "Профиль", icon: User, slug: "/profile" },
];

export default function BottomNavigation() {
  // 2. Получаем текущий путь страницы (например, "/" или "/search")
  const pathname = usePathname();

  return (
    // ГЛАВНЫЙ КОНТЕЙНЕР: Фиксирован внизу, скроем на десктопе (md:hidden)
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-6 pt-2 bg-transparent pointer-events-none">
      {/* ПАНЕЛЬ НАВИГАЦИИ: Темная, скругленная, с тенью */}
      <nav className="w-full max-w-lg mx-auto bg-[#1A1A1D] shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-full px-2 py-3 pointer-events-auto border border-neutral-800">
        {/* ИСПОЛЬЗУЕМ GRID: 5 колонок для 5 элементов */}
        <div className="grid grid-cols-5 items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            // 3. ПРОВЕРКА НА АКТИВНОСТЬ: Сравниваем путь пункта с текущим pathname
            // Для Главной ("/") используем строгое равенство.
            // Для остальных проверяем, начинается ли путь с указанного слага (чтобы подсвечивать подкатегории).
            const isActive =
              item.slug === "/"
                ? pathname === "/"
                : pathname.startsWith(item.slug);

            // Рендер для ЦЕНТРАЛЬНОЙ КНОПКИ ДЕЙСТВИЯ (используем <Link>)
            if (item.centerAction) {
              return (
                <div
                  key={item.name}
                  className="flex justify-center -translate-y-1"
                >
                  <Link
                    href={item.slug}
                    className={`p-4 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#6C5CE7] shadow-lg shadow-[#6C5CE7]/30 scale-105" // Фиолетовый фон
                        : "bg-neutral-800 hover:bg-neutral-700"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </Link>
                </div>
              );
            }

            // Рендер для ОБЫЧНЫХ ЭЛЕМЕНТОВ НАВИГАЦИИ (используем <Link>)
            return (
              <Link
                key={item.name}
                href={item.slug}
                className="flex flex-col items-center justify-center p-2 group"
              >
                <Icon
                  className={`h-6 w-6 mb-1.5 transition-colors ${
                    isActive
                      ? "text-[#6C5CE7]" // Активная иконка (фиолетовая)
                      : "text-neutral-500 group-hover:text-neutral-300" // Обычная иконка
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive
                      ? "text-[#6C5CE7]" // Активный текст
                      : "text-neutral-600 group-hover:text-neutral-400"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
