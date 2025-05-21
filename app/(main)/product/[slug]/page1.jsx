"use client";
import Image from "next/image";
import { useState } from "react";
import CharacteristicsTab from "@/components/CharacteristicsTab";
import DocumentationTab from "@/components/DocumentationTab";
import ReviewsTab from "@/components/ReviewsTab";
import Img from "@/public/images/product/713680920.webp";

export default function Product() {
    const [activeTab, setActiveTab] = useState("characteristics");
    return (
        <main className="flex-grow container mx-auto py-8 px-4 bg-white">
            <div className="flex flex-col md:flex-row">
                {/* Product Images */}
                <div className="md:w-1/2 p-4 relative">
                    <div className="absolute top-0 left-0 bg-orange-400 text-white px-2 py-1 z-10">
                        -5%
                    </div>
                    <div className="border p-4 rounded-md border-gray-300 hover:border-orange-400">
                        <Image
                            src={Img}
                            alt="Щит этажный 4 кв. (1000х950х150) EKF Basic"
                            width={500}
                            height={500}
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="flex mt-4 space-x-2">
                        <button className="border p-1 w-16 h-16 rounded-md border-gray-300 hover:border-orange-400">
                            <Image
                                src={Img}
                                alt="Щит этажный thumbnail"
                                width={60}
                                height={60}
                                className="w-full h-full object-cover"
                            />
                        </button>
                        <button className="border p-1 w-16 h-16 rounded-md border-gray-300 hover:border-orange-400">
                            <Image
                                src={Img}
                                alt="Щит этажный thumbnail"
                                width={60}
                                height={60}
                                className="w-full h-full object-cover"
                            />
                        </button>
                        <button className="border p-1 w-16 h-16 rounded-md border-gray-300 hover:border-orange-400">
                            <Image
                                src={Img}
                                alt="Щит этажный thumbnail"
                                width={60}
                                height={60}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    </div>
                </div>

                {/* Product Details */}
                <div className="md:w-1/2 p-4">
                    <h1 className="text-2xl font-bold mb-2">
                        Щит этажный 4 кв. (1000х950х150) EKF Basic
                    </h1>
                    <p className="text-sm text-gray-500 mb-4">
                        Артикул: mb28-v-4
                    </p>

                    <div className="flex items-center mb-4">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                                <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-300"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                            ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                            Нет отзывов
                        </span>
                    </div>

                    <div className="mb-6">
                        <p className="text-sm mb-1">
                            Москва, Интернет-магазин:{" "}
                            <span className="text-red-500">нет в наличии</span>
                        </p>
                        <p className="text-sm mb-1">
                            Ногинск:{" "}
                            <span className="in-stock text-green-600">
                                в наличии 282 шт
                            </span>
                        </p>
                        <p className="text-sm mb-1">
                            Новосибирск:{" "}
                            <span className="in-stock text-green-600">
                                в наличии 124 шт
                            </span>
                        </p>
                        <p className="text-sm">
                            Екатеринбург:{" "}
                            <span className="in-stock text-green-600">
                                в наличии 251 шт
                            </span>
                        </p>
                    </div>

                    <div className="flex items-end mb-4">
                        <div>
                            <div className="product-price text-3xl font-bold">
                                14 243 ₽/шт
                            </div>
                            <div className="product-old-price text-gray-100">
                                14 993 ₽
                            </div>
                        </div>
                        <div className="ml-6 text-sm">
                            <div className="text-gray-500">12 744 ₽</div>
                            <div className="flex items-center">
                                <span className="text-xs">
                                    При участии в Бонусной программе
                                </span>
                                <button className="ml-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-gray-400"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line
                                            x1="12"
                                            y1="16"
                                            x2="12"
                                            y2="12"
                                        ></line>
                                        <line
                                            x1="12"
                                            y1="8"
                                            x2="12.01"
                                            y2="8"
                                        ></line>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center text-xs">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-400 mr-1"
                                >
                                    <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="2"
                                        ry="2"
                                    ></rect>
                                    <path d="M9 3v18"></path>
                                </svg>
                                +150 бонусов при покупке
                            </div>
                        </div>
                    </div>

                    <div className="flex mb-6">
                        <button className="bg-orange-400 flex-1 mr-2 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity">
                            В корзину
                        </button>
                        <button className="btn-outline">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-500"
                            >
                                <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
                <div className="flex gap-5 mb-3 text-2xl">
                    <button
                        className={`w-full py-3 px-6 font-medium bg-gray-300 border-1 border-gray-300 rounded-2xl ${
                            activeTab === "characteristics"
                                ? "tab-active bg-white"
                                : "text-gray-500 hover:text-black"
                        }`}
                        onClick={() => setActiveTab("characteristics")}
                    >
                        Характеристики
                    </button>
                    <button
                        className={`w-full py-3 px-6 font-medium bg-gray-300 border-1 border-gray-300 rounded-2xl ${
                            activeTab === "documentation"
                                ? "tab-active bg-white"
                                : "text-gray-500 hover:text-black"
                        }`}
                        onClick={() => setActiveTab("documentation")}
                    >
                        Документация
                    </button>
                    <button
                        className={`w-full py-3 px-6 font-medium bg-gray-300 border-1 border-gray-300 rounded-2xl ${
                            activeTab === "reviews"
                                ? "tab-active bg-white"
                                : "text-gray-500 hover:text-black"
                        }`}
                        onClick={() => setActiveTab("reviews")}
                    >
                        Отзывы
                    </button>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === "characteristics" && <CharacteristicsTab />}
                    {activeTab === "documentation" && <DocumentationTab />}
                    {activeTab === "reviews" && <ReviewsTab />}
                </div>
            </div>
        </main>
    );
}
