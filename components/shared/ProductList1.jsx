"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/solid";

export default function ProductList({ products = [] }) {
    // Состояние для текущего вида (grid или list)
    const [view, setView] = useState(() => {
        // Загружаем сохранённый вид из localStorage
        if (typeof window !== "undefined") {
            return localStorage.getItem("productListView") || "grid";
        }
        return "grid";
    });

    // Сохраняем выбранный вид в localStorage
    useEffect(() => {
        localStorage.setItem("productListView", view);
    }, [view]);

    // Проверка, что products — массив
    if (!Array.isArray(products) || products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                    Нет товаров по вашему запросу
                </p>
            </div>
        );
    }

    return (
        <div className="mb-8">
            {/* Заголовок и переключатель вида */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                    Товары ({products.length})
                </h3>
                <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setView("grid")}
                        className={`p-2.5 border border-gray-200 rounded-lg transition-all duration-200 ${
                            view === "grid"
                                ? "bg-orange-400 text-white"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                        aria-label="Блочный вид"
                    >
                        <Squares2X2Icon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setView("list")}
                        className={`p-2.5 border border-gray-200 rounded-lg transition-all duration-200 ${
                            view === "list"
                                ? "bg-orange-400 text-white"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                        aria-label="Список"
                    >
                        <ListBulletIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Сетка или список */}
            {products.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                    <p className="text-gray-500">Товары не найдены</p>
                </div>
            ) : (
                <ul
                    className={
                        view === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                            : "space-y-4"
                    }
                >
                    {products.map(product => (
                        <li
                            key={product.id}
                            className={
                                view === "grid"
                                    ? "border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:border-orange-400 transition-all duration-300 bg-white overflow-hidden"
                                    : "border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:border-orange-400 transition-all duration-300 bg-white flex flex-col sm:flex-row"
                            }
                        >
                            <Link
                                href={`/product/${product.slug}`}
                                className="flex flex-col h-full"
                            >
                                {/* Изображение */}
                                {product.image && (
                                    <div
                                        className={
                                            view === "grid"
                                                ? "relative w-full aspect-square"
                                                : "relative w-full sm:w-48 aspect-square sm:aspect-auto sm:h-full"
                                        }
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            // className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                )}

                                {/* Информация о товаре */}
                                <div
                                    className={
                                        view === "grid"
                                            ? "p-4 flex-1 flex flex-col"
                                            : "p-4 flex-1 flex flex-col"
                                    }
                                >
                                    <div className="flex-1">
                                        <h4
                                            className={`${
                                                view === "grid"
                                                    ? "text-lg"
                                                    : "text-lg"
                                            } font-medium text-gray-900 mb-2 line-clamp-2`}
                                        >
                                            {product.name}
                                        </h4>

                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm text-gray-500">
                                                Арт: {product.article || "—"}
                                            </p>
                                            {view === "grid" && (
                                                <div className="text-lg font-semibold text-orange-500">
                                                    {product.basePrice.toLocaleString(
                                                        "ru-RU"
                                                    )}{" "}
                                                    ₽
                                                </div>
                                            )}
                                        </div>

                                        {(product.attributes || []).length >
                                            0 && (
                                            <div className="text-sm text-gray-600 space-y-1 mt-2">
                                                {(product.attributes || [])
                                                    .slice(0, 3)
                                                    .map(attr => (
                                                        <div
                                                            key={`${attr.attributeSlug}-${attr.attributeValueName}`}
                                                            className="flex justify-between"
                                                        >
                                                            <span className="text-gray-500">
                                                                {
                                                                    attr.attributeName
                                                                }
                                                                :
                                                            </span>
                                                            <span className="font-medium">
                                                                {
                                                                    attr.attributeValueName
                                                                }
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 flex justify-between items-center">
                                        {view === "list" && (
                                            <div className="text-xl font-semibold text-orange-500">
                                                {product.basePrice.toLocaleString(
                                                    "ru-RU"
                                                )}{" "}
                                                ₽
                                            </div>
                                        )}
                                        <button
                                            className={`${
                                                view === "grid" ? "w-full" : ""
                                            } bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors text-sm`}
                                        >
                                            {view === "grid"
                                                ? "В корзину"
                                                : "Подробнее"}
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
