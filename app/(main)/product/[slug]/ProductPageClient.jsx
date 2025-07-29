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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ contact: "" });
  const [formError, setFormError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const router = useRouter();

  // Проверка на существование product и mediaFiles
  if (!product) {
    return <div className="container mx-auto py-8 px-4">Загрузка...</div>;
  }

  // Все изображения продукта, с fallback на mainImage
  const images =
    product.mediaFiles && Array.isArray(product.mediaFiles)
      ? product.mediaFiles.map((file) => file.url)
      : [mainImage.src];

  // Обработчик добавления в корзину
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

      router.push("/cart");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };

  // Обработчик отправки формы обратной связи
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!formData.contact) {
      setFormError("Пожалуйста, укажите телефон или email");
      return;
    }
    try {
      console.log("Отправка данных:", formData);
      setIsModalOpen(false);
      setFormData({ contact: "" });
      setFormError("");
      alert("Ваш запрос отправлен! Мы свяжемся с вами в ближайшее время.");
    } catch (err) {
      setFormError("Ошибка при отправке запроса");
    }
  };

  // Обработчик выбора изображения
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  // Обработчик увеличения изображения
  const handleImageZoom = (index) => {
    setSelectedImageIndex(index);
    setIsImageZoomed(true);
  };

  // Обработчик закрытия увеличенного изображения
  const handleCloseZoom = () => {
    setIsImageZoomed(false);
  };

  // Обработчик перелистывания изображений
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Список миниатюр
  const thumbnails = images;

  return (
    <main className="flex-grow container mx-auto py-8 px-4 bg-white">
      <div className="flex flex-col xl:flex-row">
        {/* Product Images */}
        <div className="md:w-1/2 p-4 relative">
          {product.discountPercentage && (
            <div className="absolute top-0 left-0 bg-orange-400 text-white px-2 py-1 z-10">
              -{product.discountPercentage}%
            </div>
          )}
          <div className="border p-4 relative rounded-md w-full aspect-square max-h-160 border-gray-300 hover:border-gray-500">
            <Image
              src={images[selectedImageIndex] || mainImage}
              alt={product.name || "Продукт"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              // width={500}
              // height={500}
              className="object-contain cursor-pointer p-6 transition-transform duration-300 hover:scale-105"
              onClick={() => handleImageZoom(selectedImageIndex)}
            />
          </div>
          {thumbnails.length > 0 && (
            <div className="flex mt-4 space-x-2">
              {thumbnails.map((url, idx) => (
                <button
                  key={idx}
                  className={`border p-1 w-16 h-16 rounded-md border-gray-300 hover:border-orange-400 transition-all duration-300 ${
                    selectedImageIndex === idx ? "border-orange-400" : ""
                  }`}
                  onClick={() => handleThumbnailClick(idx)}
                >
                  <Image
                    src={url}
                    alt={`${product.name || "Продукт"} thumbnail ${idx + 1}`}
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
        <div className="xl:w-1/2 p-4 text-sm">
          <div className=" p-4 text-sm">
            <p className=" text-gray-500 mb-4">
              Артикул: {product.article || "N/A"}
            </p>
            <h1 className="lg:text-2xl font-bold mb-2">
              {product.name || "Продукт"}
            </h1>
            <div>Количество</div>
            <div>{product.description || "Описание отсутствует"}</div>

            {/* Action Buttons */}
            <div className="flex mt-5 mb-6 text-xs lg:text-xl">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="inline-flex items-center justify-center border-0 bg-orange-400 mr-2  text-white px-8 py-3 cursor-pointer rounded-3xl hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
              >
                {adding ? "Добавление..." : "В корзину"}
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center border-0 bg-blue-500  text-white px-8 py-3 cursor-pointer rounded-3xl hover:bg-blue-600 transition-all duration-300"
              >
                Заказать бесплатный расчет
              </button>
            </div>
          </div>
          <div className="w-full bg-red-100  p-4 border-0 rounded-3xl">
            <div className="block p-2 bg-[#10c44c] border-0 rounded-2xl mb-10">
              <span className="text-3xl text-white font-bold leading-[30px]">
                {product.basePrice
                  ? `${product.basePrice} ₽`
                  : "Цена недоступна"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-5 mb-3 text-xs lg:text-2xl md:flex-nowrap">
          <button
            className={`w-full py-3 px-6 font-medium bg-gray-300 border rounded-2xl transition-all duration-300 ${
              activeTab === "characteristics"
                ? "bg-white"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("characteristics")}
          >
            Характеристики
          </button>
          <button
            className={`w-full py-3 px-6 font-medium bg-gray-300 border rounded-2xl transition-all duration-300 ${
              activeTab === "documentation"
                ? "bg-white"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("documentation")}
          >
            Документация
          </button>
          <button
            className={`w-full py-3 px-6 font-medium bg-gray-300 border rounded-2xl transition-all duration-300 ${
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
            <CharacteristicsTab attributes={product.attributes || []} />
          )}
          {activeTab === "documentation" && (
            <DocumentationTab files={product.documentationFiles || []} />
          )}
          {activeTab === "reviews" && (
            <ReviewsTab reviews={product.reviews || []} />
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-500 ease-in-out scale-100 hover:scale-105">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Заказать бесплатный расчет
            </h2>
            <p className="mb-6 text-gray-600">
              Укажите ваш телефон или email, и мы свяжемся с вами!
            </p>
            <form onSubmit={handleFeedbackSubmit}>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ contact: e.target.value })}
                placeholder="Телефон или email"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              {formError && (
                <p className="text-red-500 mb-4 text-sm">{formError}</p>
              )}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-all duration-300"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                >
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Zoomed Image Modal */}
      {isImageZoomed && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-700 ease-in-out"
          onClick={handleCloseZoom}
        >
          <div className="bg-white p-8 rounded-2xl max-w-2xl w-full shadow-2xl ">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              {product.name}
            </h2>
            <Image
              src={images[selectedImageIndex] || mainImage}
              alt={product.name || "Продукт"}
              width={800}
              height={800}
              className="w-full max-w-[80vw] max-h-[60vh] object-contain rounded-lg transform transition-all duration-500 ease-in-out scale-100 hover:scale-105"
            />
            <div className="flex mt-16 mb-4 justify-around text-xs lg:text-xl">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="inline-flex items-center justify-center border-0 bg-orange-400 mr-2  text-white px-8 py-3 cursor-pointer rounded-3xl hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
              >
                {adding ? "Добавление..." : "В корзину"}
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center border-0 bg-blue-500  text-white px-8 py-3 cursor-pointer rounded-3xl hover:bg-blue-600 transition-all duration-300"
              >
                Заказать бесплатный расчет
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
