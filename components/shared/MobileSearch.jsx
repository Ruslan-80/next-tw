"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function MobileSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setQuery("");
      setResults([]);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed top-0 z-50 w-full bg-background backdrop-blur-md border-b border-slate-100 px-4 py-3">
      {/* Ваш код поиска здесь */}
      <div className="relative w-full">
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            name="query"
            type="text"
            placeholder="Поиск товаров..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-card border-none rounded-2xl px-5 py-2.5 pr-12 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          >
            <Search size={20} />
          </button>
        </form>

        {/* Выпадающий список результатов */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="fixed inset-x-0 top-[60px] bottom-0 bg-white z-50 overflow-y-auto absolute top-full bottom-auto inset-x-0 mt-3 w-full max-h-[60vh] rounded-3xl shadow-2xl border border-slate-100"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto custom-scrollbar">
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
                            <p className="text-sm font-medium text-slate-900 line-clamp-3 leading-tight tracking-tight whitespace-normal">
                              {product.name}
                            </p>
                            {/* <p className="text-sm font-light text-blue-600 mt-0.5">
                              {product.basePrice.toLocaleString("ru-RU")} ₽
                            </p> */}
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
    </div>
  );
}
