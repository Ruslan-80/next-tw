"use client";

import { useState, useEffect } from "react";
import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/solid";
import CardItem from "./CardItem";

export default function ProductList({ products = [] }) {
  const [view, setView] = useState("grid");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedView = localStorage.getItem("productListView") || "grid";
        setView(savedView);
      } catch (e) {
        console.error("Failed to access localStorage:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("productListView", view);
      } catch (e) {
        console.error("Failed to save to localStorage:", e);
      }
    }
  }, [view]);

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="flex justify-center items-center py-12 text-lg">
        <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-gray-200"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-400 mb-50"></div>
        <p className="ml-4 text-gray-500">Загрузка товаров...</p>
        <div className="flex flex-col items-center mt-20 ml-4">
          <p className="text-gray-500 text-lg">Нет товаров по вашему запросу</p>
          <p className="text-gray-500 text-sm mt-2">
            Попробуйте изменить фильтры или поиск.
          </p>
        </div> */}
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="hidden md:flex justify-end items-center mb-6">
        <h3 className="hidden text-2xl md:text-3xl font-semibold text-gray-900">
          Товары
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setView("grid")}
            className={`p-2.5 border border-gray-200 rounded-lg transition-all duration-200 ${
              view === "grid"
                ? "bg-orange-400 text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
            aria-label="Блочный вид"
          >
            <Squares2X2Icon className="w-6 h-6" />
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

      <ul
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-4"
        }
      >
        {products.map((product) => (
          <CardItem key={product.id} product={product} view={view} />
        ))}
      </ul>
    </div>
  );
}
