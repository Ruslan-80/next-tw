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
    <header className="container mx-auto px-4">
      <div className="w-full bg-white xl:border-b border-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center lg:justify-between h-full py-3">
            <nav className="hidden lg:flex space-x-4 text-black text-sm ">
              <Link
                href="/delivery"
                className="hover:text-red-500"
                alt="delivery"
              >
                Доставки и оплата
              </Link>
              <Link
                href="/guarantees"
                className="hover:text-red-500"
                alt="guarantee"
              >
                Гарантии и возврат
              </Link>
              <Link
                href="/contacts"
                className="hover:text-red-500"
                alt="contact"
              >
                Контакты
              </Link>
            </nav>
            <div className="flex items-center space-x-4 text-black text-sm">
              <Link
                href="mailto:snab@kplstroy.ru"
                className="flex items-center gap-2 hover:text-red-500"
                alt="email"
              >
                <Mail width={16} /> snab@kplstroy.ru
              </Link>
              <Link
                href="tel:+7 (499) 390-14-67"
                className="flex items-center gap-2 hover:text-red-500"
                alt="telephone"
              >
                <Headset width={16} /> +7 (499) 390-14-67
              </Link>
              <Link
                href="#"
                className="hidden sm:flex items-center gap-2 hover:text-red-500"
                alt="city"
              >
                <MapPin width={16} /> Москва
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-between h-full py-1">
            <div className="hidden md:flex max-w-60 ">
              <Link href="/" alt="logo">
                <Image src={Logo} alt="logo" />
              </Link>
            </div>
            <div className="flex w-full items-center justify-center relative">
              <form
                onSubmit={handleSubmit}
                className="flex justify-between w-full text-black ml-5 lg:w-[600px] relative"
              >
                <input
                  ref={inputRef}
                  name="query"
                  placeholder="Поиск товаров..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full mr-5 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
                <Search
                  className="absolute right-9 top-1/2 transform -translate-y-1/2 text-gray-400 "
                  size={20}
                  alt="search"
                  onClick={(e) => {
                    e.preventDefault(); // Имитируем событие формы
                    handleSubmit(e);
                  }}
                />
              </form>
              {isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-12 left-5 w-full bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto"
                >
                  {results.length > 0 ? (
                    <ul>
                      {results.map((product) => (
                        <li
                          key={product.id}
                          className="p-3 hover:bg-gray-100 transition-colors"
                        >
                          <Link
                            href={`/product/${product.slug}`}
                            className="flex items-center gap-3"
                            alt="query"
                            onClick={() => {
                              setQuery("");
                              setIsOpen(false);
                            }}
                          >
                            {product.image && (
                              <div className="relative w-12 h-12">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                            )}
                            <div>
                              <p className="text-gray-900 font-medium">
                                {product.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {product.basePrice.toLocaleString("ru-RU")} ₽
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="p-3 text-gray-500">Товары не найдены</p>
                  )}
                </div>
              )}
            </div>
            <div className="hidden lg:flex justify-end gap-5 ">
              <div className="rounded-full bg-gray-200 p-2 hover:bg-gray-400">
                <ChartNoAxesColumn
                  size={24}
                  alt="comparison"
                  strokeWidth={1}
                  color="black"
                />
              </div>
              <Link
                href="/admin"
                alt="admin"
                className="rounded-full bg-gray-200 p-2 hover:bg-gray-400"
              >
                <User size={24} strokeWidth={1} color="black" />
              </Link>
              <Link
                href="/cart"
                alt="cart"
                className="rounded-full bg-gray-200 p-2 hover:bg-gray-400"
              >
                <ShoppingCart size={24} strokeWidth={1} color="black" />
              </Link>
            </div>
          </div>
          <div className="mt-5 h-12">
            <nav>
              <ul className="hidden lg:flex items-center justify-between py-2 space-x-4 text-black text-sm 2xl:text-xl uppercase font-bold">
                <li>
                  <Link
                    href="/catalog/shchity-i-etazhnye-ustroystva"
                    className="hover:text-red-500"
                  >
                    Щиты и устройства этажные
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalog/nakladki-shitov-etazhnyh-she"
                    className="hover:text-red-500"
                  >
                    Накладки щитов этажных ЩЭ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalog/ustroystva-etazhnye"
                    className="hover:text-red-500"
                  >
                    Устройства модульные
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru"
                    className="hover:text-red-500"
                  >
                    Корпуса ВРУ
                  </Link>
                </li>
                <li className="animate-bounce">
                  <Link href="#" className="text-red-500">
                    Акции
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
