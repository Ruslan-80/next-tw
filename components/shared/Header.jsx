"use client";

import Link from "next/link";
import {
  Mail,
  Headset,
  MapPin,
  ChartNoAxesColumn,
  User,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/public/mainLogo.svg";
import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import CatalogButton from "./CatalogButton1";
import { useCartStore } from "../../lib/store/testCartStore";
import { ModeToggle } from "../ModeToggle";

export default function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpentelephone, setIsOpentelephone] = useState(false);
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
    { name: "Конфигуратор", href: "/conf" },
    { name: "Контакты", href: "/contacts" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        {/* Верхняя панель — тонкая и легкая */}
        <div className="bg-card py-2 border-b border-border">
          <div className="container mx-auto px-6 flex justify-center lg:justify-between h-full items-center text-xs text-slate-500 font-light uppercase tracking-wider">
            <nav className="hidden lg:flex gap-6 text-sm text-text">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] font-medium uppercase tracking-[0.12em] text-text hover:text-accent transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <ModeToggle />
              {/* Email */}
              <Link
                alt="email"
                href="mailto:info@electroshit-pro.ru"
                className="text-xs md:text-sm flex items-center gap-2 hover:text-accent transition-colors font-medium text-text lowercase"
              >
                <Mail size={12} /> info@electroshit-pro.ru
              </Link>

              {/* Блок с телефонами */}
              <div className="relative flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <Link
                    alt="telephone"
                    href="tel:+74993901467"
                    className="text-xs md:text-sm flex items-center gap-2 hover:text-accent transition-colors font-medium text-text"
                  >
                    <Headset size={12} /> +7 (499) 390-14-67
                  </Link>

                  {/* Кнопка раскрытия */}
                  <button
                    onClick={() => setIsOpentelephone(!isOpentelephone)}
                    className={`p-1 bg-card hover:bg-card/40 rounded-full transition-transform ${isOpentelephone ? "rotate-180" : ""}`}
                  >
                    <ChevronDown size={14} className="text-text" />
                  </button>
                </div>

                {/* Выпадающий список */}
                {isOpentelephone && (
                  <div className="absolute top-full right-0 mt-2 bg-card shadow-lg border border-card rounded-md py-2 z-50 min-w-[180px]">
                    <Link
                      alt="telephone"
                      href="tel:+79299759489" // Замените на нужный номер
                      className="block px-4 py-2 text-xs md:text-sm text-text hover:text-accent transition-colors font-medium"
                    >
                      +7 (929) 975-94-89
                    </Link>
                    {/* Можно добавить еще номера здесь */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Основная панель — больше воздуха */}
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-center lg:justify-between h-full gap-8">
            {/* Левая часть: Каталог + Лого */}
            <div className="flex items-center gap-6">
              <CatalogButton />
              {/* <Link href="/" className="flex-shrink-1" alt="logo">
                <Image
                  src={Logo}
                  alt="Electroshit-pro"
                  style={{ width: "140px", height: "60px" }}
                />
              </Link> */}
              <Link href="/" className="flex-shrink-1">
                {" "}
                <span className="font-bold text-xl text-text">
                  ЭЛЕКТРОЩИТ-ПРО
                </span>{" "}
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
                  className="w-full bg-card border border-accent rounded-full px-6 py-3 pr-12 
                 text-sm font-light text-accent placeholder:text-slate-400
                 focus:outline-none focus:ring-2 focus:ring-accent/5 focus:bg-card 
                 focus:border-accent transition-all duration-300"
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
                  className="absolute top-full left-0 w-full mt-3 bg-card border border-accent 
                 rounded-3xl shadow-2xl shadow-slate-900/10 z-50 overflow-hidden 
                 animate-in fade-in slide-in-from-top-2 duration-300"
                >
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {results.length > 0 ? (
                      <ul className="divide-y divide-accent">
                        {results.map((product) => (
                          <li key={product.id}>
                            <Link
                              href={`/product/${product.slug}`}
                              onClick={() => {
                                setQuery("");
                                setIsOpen(false);
                              }}
                              className="flex items-center gap-4 p-4 hover:text-card transition-colors group"
                            >
                              {product.image ? (
                                <div className="relative w-12 h-12 flex-shrink-0 bg-background border border-accent rounded-xl overflow-hidden">
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
                                <p className="text-sm font-medium text-accent truncate tracking-tight">
                                  {product.name}
                                </p>
                                <p className="text-xs font-light text-accent mt-0.5">
                                  {product.basePrice.toLocaleString("ru-RU")} ₽
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-sm font-light text-accent italic">
                          {query.length < 2
                            ? "Введите минимум 2 символа..."
                            : "Товары не найдены"}
                        </p>
                      </div>
                    )}
                  </div>

                  {results.length > 0 && (
                    <div className="p-3 bg-card border-t border-accent text-center">
                      <button
                        onClick={handleSubmit}
                        className="text-[10px] uppercase tracking-widest font-semibold text-accent hover:text-accent transition-colors"
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
              <div className="relative p-2 bg-card rounded-full">
                <ShoppingCart size={20} className="text-accent" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              </div>
              <div className="hidden lg:block text-sm">
                <p className="text-accent text-[10px] uppercase tracking-widest">
                  Корзина
                </p>
                <p className="font-semibold text-accent">
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
