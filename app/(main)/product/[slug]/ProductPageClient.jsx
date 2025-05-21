"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CharacteristicsTab from "./CharacteristicsTab";
import DocumentationTab from "@/components/DocumentationTab";
import ReviewsTab from "@/components/ReviewsTab";
import mainImage from "@/public/images/product/713680920.webp";

export default function ProductPageClient({ product }) {
    const [activeTab, setActiveTab] = useState("characteristics");
    const [adding, setAdding] = useState(false);
    const router = useRouter();

    // Добавление в корзину с обработкой возможных ошибок и пустого тела ответа
    const handleAddToCart = async () => {
        setAdding(true);
        try {
            const res = await fetch("/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product.id, quantity: 1 }),
            });

            if (!res.ok) {
                let errorMsg = "Не удалось добавить в корзину";
                // Клонируем ответ для многоразового чтения
                const resClone = res.clone();
                try {
                    const errJson = await resClone.json();
                    if (errJson.error) errorMsg = errJson.error;
                } catch {
                    try {
                        const errText = await res.text();
                        if (errText) errorMsg = errText;
                    } catch {
                        // тело не прочитать
                    }
                }
                throw new Error(errorMsg);
            }

            // Переход в корзину после успешного добавления
            router.push("/cart");
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setAdding(false);
        }
    };

    // Список миниатюр для отображения
    const thumbnails = product.mediaFiles.slice(1).map(file => file.url);

    return (
        <main className="flex-grow container mx-auto py-8 px-4 bg-white">
            <div className="flex flex-col md:flex-row">
                {/* Product Images */}
                <div className="md:w-1/2 p-4 relative">
                    {product.discountPercentage && (
                        <div className="absolute top-0 left-0 bg-orange-400 text-white px-2 py-1 z-10">
                            -{product.discountPercentage}%
                        </div>
                    )}
                    <div className="border p-4 rounded-md border-gray-300 hover:border-orange-400">
                        <Image
                            src={mainImage}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="w-full h-auto"
                        />
                    </div>
                    {thumbnails.length > 0 && (
                        <div className="flex mt-4 space-x-2">
                            {thumbnails.map((url, idx) => (
                                <button
                                    key={idx}
                                    className="border p-1 w-16 h-16 rounded-md border-gray-300 hover:border-orange-400"
                                >
                                    <Image
                                        src={url}
                                        alt={`${product.name} thumbnail ${
                                            idx + 1
                                        }`}
                                        width={60}
                                        height={60}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="md:w-1/2 p-4">
                    <h1 className="text-2xl font-bold mb-2 truncate">
                        {product.name}
                    </h1>
                    <p className="text-sm text-gray-500 mb-4">
                        Артикул: {product.article}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex mb-6">
                        <button
                            onClick={handleAddToCart}
                            disabled={adding}
                            className="bg-orange-400 flex-1 mr-2 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {adding ? "Добавление..." : "В корзину"}
                        </button>
                        <button className="btn-outline p-2 border rounded-md">
                            {/* Иконка «В избранное» или другое действие */}
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="mt-8">
                        <div className="flex gap-5 mb-3 text-2xl">
                            <button
                                className={`w-full py-3 px-6 font-medium bg-gray-300 border rounded-2xl ${
                                    activeTab === "characteristics"
                                        ? "bg-white"
                                        : "text-gray-500 hover:text-black"
                                }`}
                                onClick={() => setActiveTab("characteristics")}
                            >
                                Характеристики
                            </button>
                            <button
                                className={`w-full py-3 px-6 font-medium bg-gray-300 border rounded-2xl ${
                                    activeTab === "documentation"
                                        ? "bg-white"
                                        : "text-gray-500 hover:text-black"
                                }`}
                                onClick={() => setActiveTab("documentation")}
                            >
                                Документация
                            </button>
                            <button
                                className={`w-full py-3 px-6 font-medium bg-gray-300 border rounded-2xl ${
                                    activeTab === "reviews"
                                        ? "bg-white"
                                        : "text-gray-500 hover:text-black"
                                }`}
                                onClick={() => setActiveTab("reviews")}
                            >
                                Отзывы
                            </button>
                        </div>
                        <div>
                            {activeTab === "characteristics" && (
                                <CharacteristicsTab
                                    attributes={product.attributes}
                                />
                            )}
                            {activeTab === "documentation" && (
                                <DocumentationTab
                                    files={product.documentationFiles}
                                />
                            )}
                            {activeTab === "reviews" && (
                                <ReviewsTab reviews={product.reviews} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
