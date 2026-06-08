"use client";

import Link from "next/link";
import {
  Mail,
  Headset,
  MapPin,
  ChartNoAxesColumn,
  User,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../public/mainLogo.svg";
import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import CatalogButton from "./CatalogButton1";
import { useCartStore } from "../../lib/store/testCartStore";

export default function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const { count, total } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 2) {
        try {
          const response = await fetch("/api/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          });
          const data = await response.json();
          setResults(data);
          setIsOpen(true);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
          setIsOpen(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Закрытие выпадающего списка при клике вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   fetchCart(); // Загружаем корзину
  // }, [fetchCart]);

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
      setResults([]);
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "Доставки и оплата", href: "/delivery" },
    { name: "Гарантии и возврат", href: "/guarantees" },
    { name: "Статьи", href: "/blogs" },
    { name: "Объекты", href: "/objects" },
    { name: "Контакты", href: "/contacts" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
        {/* Верхняя панель — тонкая и легкая */}
        <div className="bg-slate-50 py-2 border-b border-slate-100">
          <div className="container mx-auto px-6 flex justify-center lg:justify-between h-full items-center text-xs text-slate-500 font-light uppercase tracking-wider">
            <nav className="hidden lg:flex gap-6 text-sm text-slate-700">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] font-medium uppercase tracking-[0.12em] text-slate-500 hover:text-slate-900 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <Link
                href="mailto:info@electroshit-pro.ru"
                className="text-xs md:text-sm flex items-center gap-2 text-sm hover:text-blue-600 lowercase transition-colors"
                alt="email"
              >
                <Mail size={12} /> info@electroshit-pro.ru
              </Link>
              <Link
                href="tel:+74993901467"
                className="text-xs md:text-sm flex items-center gap-2 hover:text-blue-600 transition-colors font-medium text-slate-700"
                alt="telephone"
              >
                <Headset size={12} /> +7 (499) 390-14-67
              </Link>
            </div>
          </div>
        </div>

        {/* Основная панель — больше воздуха */}
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-center lg:justify-between h-full gap-8">
            {/* Левая часть: Каталог + Лого */}
            <div className="flex items-center gap-6">
              <CatalogButton />
              <Link href="/" className="flex-shrink-1" alt="logo">
                <div className="relative w-[140px] h-[40px] flex-shrink-0">
                  <Image
                    src={Logo}
                    alt="Electroshit-pro"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Поиск — строгий стиль */}
            <div className="flex-1 max-w-xl relative ml-5">
              <form onSubmit={handleSubmit} className="relative group">
                <input
                  ref={inputRef}
                  name="query"
                  type="text"
                  placeholder="Поиск по артикулу или названию..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full px-6 py-3 pr-12 
                 text-sm font-light text-slate-900 placeholder:text-slate-400
                 focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:bg-white 
                 focus:border-slate-400 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 
                 hover:text-slate-900 transition-colors p-1"
                >
                  <Search size={18} strokeWidth={1.5} />
                </button>
              </form>

              {/* Выпадающий список результатов */}
              {isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 w-full mt-3 bg-white border border-slate-100 
                 rounded-3xl shadow-2xl shadow-slate-900/10 z-50 overflow-hidden 
                 animate-in fade-in slide-in-from-top-2 duration-300"
                >
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {results.length > 0 ? (
                      <ul className="divide-y divide-slate-50">
                        {results.map((product) => (
                          <li key={product.id}>
                            <Link
                              href={`/product/${product.slug}`}
                              onClick={() => {
                                setQuery("");
                                setIsOpen(false);
                              }}
                              className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors group"
                            >
                              {product.image ? (
                                <div className="relative w-12 h-12 flex-shrink-0 bg-white border border-slate-100 rounded-xl overflow-hidden">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-1 group-hover:scale-110 transition-transform duration-500"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                                  <Search size={20} />
                                </div>
                              )}

                              <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate tracking-tight">
                                  {product.name}
                                </p>
                                <p className="text-xs font-light text-blue-600 mt-0.5">
                                  {product.basePrice.toLocaleString("ru-RU")} ₽
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-sm font-light text-slate-400 italic">
                          {query.length < 2
                            ? "Введите минимум 2 символа..."
                            : "Товары не найдены"}
                        </p>
                      </div>
                    )}
                  </div>

                  {results.length > 0 && (
                    <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                      <button
                        onClick={handleSubmit}
                        className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        Смотреть все результаты
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Корзина — премиальный минимализм */}
            <Link
              href="/cart"
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <div className="relative p-2 bg-slate-50 rounded-full">
                <ShoppingCart size={20} className="text-slate-900" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              </div>
              <div className="hidden lg:block text-sm">
                <p className="text-slate-400 text-[10px] uppercase tracking-widest">
                  Корзина
                </p>
                <p className="font-semibold text-slate-900">
                  {total.toLocaleString("ru-RU")} ₽
                </p>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
