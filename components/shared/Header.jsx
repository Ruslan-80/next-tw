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
import Logo from "@/public/mainLogo.svg";
import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debounce для поиска
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

  return (
    <header className=" top-0 z-50 bg-white shadow-md">
      {/* Верхняя панель контактов */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <nav className="flex space-x-4 text-sm mb-2 md:mb-0">
            <Link
              href="/delivery"
              className="hover:text-red-300 transition-colors"
            >
              Доставки и оплата
            </Link>
            <Link
              href="/guarantees"
              className="hover:text-red-300 transition-colors"
            >
              Гарантии и возврат
            </Link>
            <Link
              href="/contacts"
              className="hover:text-red-300 transition-colors"
            >
              Контакты
            </Link>
          </nav>

          <div className="flex items-center space-x-4 text-sm">
            <Link
              href="mailto:snab@kplstroy.ru"
              className="flex items-center gap-1 hover:text-red-300 transition-colors"
            >
              <Mail size={14} /> snab@kplstroy.ru
            </Link>
            <Link
              href="tel:+74993901467"
              className="flex items-center gap-1 hover:text-red-300 transition-colors"
            >
              <Headset size={14} /> +7 (499) 390-14-67
            </Link>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin size={14} /> Москва
            </span>
          </div>
        </div>
      </div>

      {/* Основная навигация */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Логотип */}
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <Image src={Logo} alt="Kapital Stroy" width={180} height={40} />
            </Link>
          </div>

          {/* Поиск */}
          <div className="w-full md:w-1/2 relative mb-4 md:mb-0">
            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                name="query"
                placeholder="Поиск товаров..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Выпадающие результаты поиска */}
            {isOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
              >
                {results.length > 0 ? (
                  <ul>
                    {results.map((product) => (
                      <li
                        key={product.id}
                        className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <Link
                          href={`/product/${product.slug}`}
                          className="flex items-center gap-3"
                          onClick={() => {
                            setQuery("");
                            setIsOpen(false);
                          }}
                        >
                          {product.image ? (
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                              <Image
                                src="/images/product/no_image.png"
                                alt="No image"
                                width={24}
                                height={24}
                              />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-gray-900 font-medium truncate">
                              {product.name}
                            </p>
                            <p className="text-red-600 font-semibold">
                              {product.basePrice.toLocaleString("ru-RU")} ₽
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : query.length >= 2 ? (
                  <p className="p-4 text-gray-500 text-center">
                    Товары не найдены
                  </p>
                ) : null}
              </div>
            )}
          </div>

          {/* Иконки действий */}
          <div className="flex space-x-4">
            <Link
              href="/compare"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <ChartNoAxesColumn size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            <Link
              href="/account"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <User size={24} />
            </Link>

            <Link
              href="/cart"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>

        {/* Категории */}
        <nav className="mt-4 hidden lg:block">
          <ul className="flex justify-center space-x-6 text-gray-800 font-medium">
            <li>
              <Link
                href="/catalog/shchity-i-etazhnye-ustroystva"
                className="hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600"
              >
                Щиты и устройства этажные
              </Link>
            </li>
            <li>
              <Link
                href="/catalog/nakladki-shitov-etazhnyh-she"
                className="hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600"
              >
                Накладки щитов этажных ЩЭ
              </Link>
            </li>
            <li>
              <Link
                href="/catalog/ustroystva-etazhnye"
                className="hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600"
              >
                Устройства модульные
              </Link>
            </li>
            <li>
              <Link
                href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru"
                className="hover:text-red-600 transition-colors py-2 border-b-2 border-transparent hover:border-red-600"
              >
                Корпуса ВРУ
              </Link>
            </li>
            <li>
              <Link
                href="/promotions"
                className="text-red-600 font-bold py-2 border-b-2 border-red-600"
              >
                Акции
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
