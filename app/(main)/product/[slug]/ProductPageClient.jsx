"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CharacteristicsTab from "./CharacteristicsTab";
import DocumentationTab from "../../../../components/DocumentationTab";
import DostavkaTab from "../../../../components/DostavkaTab";
import Markdown from "react-markdown";

import ReviewsTab from "../../../../components/ReviewsTab";
import DescriptionsTab from "../../../../components/DescriptionsTab";
import mainImage from "../../../../public/images/product/713680920.webp";
import { Skeleton } from "../../../../components/ui/skeleton";
import Advantages from "./Advantages2";
import { useCartStore } from "../../../../lib/store/testCartStore";
import { ArrowRight } from "lucide-react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import RatingDisplay from "@/components/RatingDisplay";
import WorksGallery from "@/components/imageDoPosle";
import VideoGallery from "@/components/VideoGallery";
import ProductFaq from "../../faq/voprosiky";
import RandomObjects from "@/components/object";
import Link from "next/link";

export default function ProductPageClient({
  product,
  ratingValue,
  ratingCount,
}) {
  const [activeTab, setActiveTab] = useState("characteristics");
  const [adding, setAdding] = useState(false);
  const [showAllAttrs, setShowAllAttrs] = useState(false);
  const [formData, setFormData] = useState({ contact: "" });
  const [formError, setFormError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState("");
  const { setCart } = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const { handleFormSubmit, error } = useFormSubmit();
  const characteristicsRef = useRef(null);

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!product) {
    return <div className="container mx-auto py-8 px-4">Загрузка...</div>;
  }
  const allowed = [
    "количество дверей",
    "количество квартир (счетчиков)",
    "способ монтажа",
    "толщина металла, мм",
    "напряжение",
    "ip",
  ];

  // console.log(product.attributes.map((attr) => attr.attributeName));

  // const averageRating = product.yandexRating || 4.5;
  // const totalReviews = product.yandexReviewCount || 15;

  const images =
    product.mediaFiles && Array.isArray(product.mediaFiles)
      ? product.mediaFiles.map((file) => file.url)
      : [mainImage.src];

  const handleAddToCart = async () => {
    if (!product) return alert("Вариант товара недоступен");

    setAdding(true);
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (!res.ok) throw new Error("Не удалось добавить в корзину");

      const data = await res.json();
      setCart({ count: data.count, total: data.total }); // ⬅ обновляем zustand
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };

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

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleImageZoom = (index) => {
    setSelectedImageIndex(index);
    setIsImageZoomed(true);
  };

  // Обработчик закрытия увеличенного изображения
  const handleCloseZoom = () => {
    setIsImageZoomed(false);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
    );
  };

  const getArticleNote = (article) => {
    const code = article?.toLowerCase() || "";

    if (code.startsWith("se")) {
      return "* Итоговая стоимость зависит от количества, толщины металла, типа конструкции.";
    }
    if (code.startsWith("vru")) {
      return "* Итоговая стоимость зависит от количества, брендов автоматики, материала шин и комплектации.";
    }

    return null;
  };

  // console.log(product);

  return (
    // <div className="antialiased bg-[#0a0f1a] bg-radial-[at_50%_50%] from-[#1e2a44] via-[#0a0f1a] to-[#05080f] text-text">
    // <div className="antialiased bg-[#f8fafc] bg-radial-[at_50%_50%] from-[#e2e8f0] via-[#f8fafc] to-[#ffffff] text-[#0f172a]">
    <section>
      {/* <ProductCard /> */}
      <div itemScope itemType="https://schema.org/Product">
        {/* <h1
          className="text-2xl lg:text-4xl font-extrabold mb-6 tracking-tight text-textForeground max-w-[1000px]"
          itemProp="name"
        >
          {product.name || "Продукт"}
        </h1> */}
        <div className="bg-gradient-metal animate-metal text-text backdrop-blur">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start container mx-auto py-4 lg:py-8 px-4">
            {/* ЛЕВАЯ КОЛОНКА: Галерея */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="flex flex-col gap-4 lg:sticky lg:top-24">
                {/* Главное изображение */}
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-inner">
                  {images[selectedImageIndex] ? (
                    <>
                      <link
                        itemProp="image"
                        href={`https://electroshit-pro.ru${images[selectedImageIndex] || mainImage}`}
                      />
                      <Image
                        src={images[selectedImageIndex] || mainImage}
                        alt={product.name || "Продукт"}
                        height={800}
                        width={800}
                        className="object-contain w-full h-full transition-transform duration-700 hover:scale-110 cursor-zoom-in"
                        onClick={() => handleImageZoom(selectedImageIndex)}
                        priority
                      />
                    </>
                  ) : (
                    <Skeleton className="w-full h-full rounded-3xl" />
                  )}

                  {/* Бейджи */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-green-600 text-white text-[10px] lg:text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">
                      Новинка
                    </span>
                    <span className="bg-red-600 text-white text-[10px] lg:text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">
                      Топ продаж
                    </span>
                  </div>

                  <div className="bg-card absolute top-4 right-4 text-text font-extrabold text-[12px] lg:text-[18px] lg:top-12 px-3 py-1.5 rounded-lg border border-accent">
                    Артикул: {product.article || "N/A"}
                  </div>
                </div>

                {/* Миниатюры */}
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        index === selectedImageIndex
                          ? "border-accent ring-2 ring-accent/20 scale-95"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={img}
                        alt={`Preview ${index}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-6 py-6 bg-card text-text rounded-2xl">
              <meta itemProp="sku" content={product.article || "N/A"} />
              <Link
                itemProp="url"
                content={`https://electroshit-pro.ru/product/${product.slug}`}
                href={`/product/${product.slug}`}
              />
              <div className="mb-8">
                {/* Price and Actions */}
                {/* <div className="flex flex-col lg:flex-row items-center gap-4 mb-6 mx-4">
                  <h1
                    className="w-full text-xl lg:text-2xl font-extrabold mb-6 tracking-tight text-text"
                    itemProp="name"
                  >
                    {product.name || "Продукт"}
                  </h1>
                  <span className="text-xl font-bold text-accent">от</span>
                  <div
                    className="text-3xl font-bold text-accent"
                    itemProp="offers"
                    itemScope
                    itemType="https://schema.org/Offer"
                  >
                    <meta itemProp="priceCurrency" content="RUB" />
                    <meta
                      itemProp="price"
                      content={
                        product.basePrice ? product.basePrice.toString() : "0"
                      }
                    />
                    <link
                      itemProp="availability"
                      href={
                        product.stock > 0
                          ? "https://schema.org/InStock"
                          : "https://schema.org/OutOfStock"
                      }
                    />
                    <link
                      itemProp="itemCondition"
                      href="https://schema.org/NewCondition"
                    />
                    {product.basePrice
                      ? `${product.basePrice.toLocaleString("ru-RU")} руб.`
                      : "Запросить стоимость"}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={adding}
                      className="btn-gold py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"
                    >
                      {adding ? "Добавляем..." : "В корзину"}
                    </button>
                    <button
                      onClick={() =>
                        handleButtonClick(`Купить в 1 клик: ${product.name}`)
                      }
                      className="bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold text-lg transition-colors"
                    >
                      Купить в 1 клик
                    </button>
                  </div>
                </div> */}
                <div className="flex flex-col gap-4 mb-6 mx-4">
                  {/* 1. Название в одну строчку наверху */}
                  <h1
                    className="w-full text-xl lg:text-2xl font-extrabold tracking-tight text-text"
                    itemProp="name"
                  >
                    {product.name || "Продукт"}
                  </h1>
                  <div className="text-text font-extrabold text-[18px] py-1.5">
                    Артикул: {product.article || "N/A"}
                  </div>

                  {/* 2. Блок стоимости с разметкой Schema.org */}
                  <div
                    itemProp="offers"
                    itemScope
                    itemType="https://schema.org/Offer"
                    className="flex items-baseline gap-2"
                  >
                    <meta itemProp="priceCurrency" content="RUB" />
                    <meta
                      itemProp="price"
                      content={
                        product.basePrice && product.basePrice > 0
                          ? product.basePrice.toString()
                          : "0"
                      }
                    />
                    <link
                      itemProp="availability"
                      href={
                        product.stock > 0
                          ? "https://schema.org/InStock"
                          : "https://schema.org/OutOfStock"
                      }
                    />
                    <link
                      itemProp="itemCondition"
                      href="https://schema.org/NewCondition"
                    />

                    {product.basePrice && product.basePrice > 0 ? (
                      <>
                        <span className="text-xl font-bold text-accent">
                          от
                        </span>
                        <div className="text-3xl font-bold text-accent">
                          {product.basePrice.toLocaleString("ru-RU")} руб.{" "}
                          <sup className="">*</sup>
                          {getArticleNote(product?.article) && (
                            <div className="mt-2 text-xs text-gray-500">
                              {getArticleNote(product?.article)}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          handleButtonClick(
                            `Запросить стоимость: ${product.name}`,
                          )
                        }
                        className="text-2xl font-bold text-accent hover:scale-105 text-left cursor-pointer transition-all"
                      >
                        Запросить стоимость
                      </button>
                    )}
                  </div>

                  {/* 3. Кнопки рядом в 1 строку на ПК (md/lg) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <button
                      onClick={handleAddToCart}
                      disabled={adding}
                      className="btn-gold py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/20 active:scale-95 transition-transform disabled:opacity-50"
                    >
                      {adding ? "Добавляем..." : "В корзину"}
                    </button>
                    <button
                      onClick={() =>
                        handleButtonClick(`Купить в 1 клик: ${product.name}`)
                      }
                      className="bg-primary hover:scale-105 text-white py-4 rounded-2xl font-bold text-lg transition-all"
                    >
                      Купить в 1 клик
                    </button>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div
                itemProp="aggregateRating"
                itemScope
                itemType="https://schema.org/AggregateRating"
                style={{ display: "none" }}
              >
                <span itemProp="ratingValue">{parseFloat(ratingValue)}</span>
                <span itemProp="reviewCount">{parseInt(ratingCount)}</span>
              </div>
              <RatingDisplay
                ratingValue={parseFloat(ratingValue)}
                ratingCount={parseInt(ratingCount)}
              />
              <div>
                <span
                  itemProp="brand"
                  itemScope
                  itemType="https://schema.org/Brand"
                >
                  <meta itemProp="name" content="Electroshit-PRO" />
                </span>
              </div>

              {/* Info Cards */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 ">
                <div className="card-glass p-4 rounded-xl shadow-sm flex items-center dark:bg-gray-500 dark:text-white">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 ">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-text">Обратный звонок</h3>
                    <button
                      onClick={() =>
                        handleButtonClick(`Перезвонить мне: ${product.name}`)
                      }
                      className="text-blue-600 hover:text-blue-800 font-medium mt-1"
                    >
                      Перезвонить мне
                    </button>
                  </div>
                </div>

                <div className="bg-surface-low border border-border p-4 rounded-xl shadow-sm flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Оплата</h3>
                    <p className="text-gray-600">Наличными/Безналичными</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center dark:bg-gray-500 dark:text-white">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Нашли дешевле?</h3>
                    <p className="text-gray-600">Снизим цену!</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center dark:bg-gray-500 dark:text-white">
                  <div className="bg-red-100 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Возврат и обмен</h3>
                    <p className="text-gray-600">В течение 14 дней</p>
                  </div>
                </div>
              </div> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mx-4">
                {/* Обратный звонок */}
                <div className="card-glass flex items-center">
                  <div className="bg-accent/10 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      Обратный звонок
                    </h3>
                    <button
                      onClick={() =>
                        handleButtonClick(`Перезвонить мне: ${product.name}`)
                      }
                      className=" text-accent hover:text-accentHover font-medium mt-1"
                    >
                      Перезвонить мне
                    </button>
                  </div>
                </div>

                {/* Оплата */}
                <div className="card-glass flex items-center">
                  <div className="bg-accent/10 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Оплата</h3>
                    <p className="text-sm text-muted-foreground">
                      Наличными/Безналичными
                    </p>
                  </div>
                </div>

                {/* Нашли дешевле? */}
                <div className="card-glass flex items-center">
                  <div className="bg-accent/10 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      Нашли дешевле?
                    </h3>
                    <p className="text-muted-foreground">Снизим цену!</p>
                  </div>
                </div>

                {/* Возврат и обмен */}
                <div className="card-glass flex items-center">
                  <div className="bg-accent/10 p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      Возврат и обмен
                    </h3>
                    <p className="text-muted-foreground">В течение 14 дней</p>
                  </div>
                </div>
              </div>
              {/* Additional Actions */}
              <div className="flex flex-col gap-3 mx-4">
                <button
                  onClick={() =>
                    handleButtonClick(
                      `Заказать бесплатный расчет: ${product.name}`,
                    )
                  }
                  // className="w-full py-3 px-6 bg-primary hover:bg-primaryLight text-white font-medium rounded-lg transition-colors duration-300"
                  className="bg-gradient-metal rounded-md font-bold py-3 px-6"
                >
                  Заказать бесплатный расчет
                </button>
                <button
                  onClick={() =>
                    handleButtonClick(
                      `Заказать бесплатный замер с выездом специалиста: ${product.name}`,
                    )
                  }
                  // className="w-full py-3 px-6 bg-accent hover:bg-accentHover text-white font-medium rounded-lg transition-colors duration-300"
                  className="btn-gold"
                >
                  Заказать бесплатный замер с выездом специалиста
                </button>
              </div>

              {/* Краткие характеристики */}
              <div className="space-y-4 mt-4 mx-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                  Ключевые параметры
                </h3>
                {/* Таблица характеристик (Glassmorphism) */}
                <div className="card-glass text-text">
                  <table className="w-full text-sm border-separate border-spacing-y-3">
                    <tbody>
                      {product.attributes
                        ?.filter((attr) =>
                          allowed.some((word) =>
                            attr.attributeName
                              .toLowerCase()
                              .includes(word.toLowerCase()),
                          ),
                        )
                        .slice(0, 6) // Увеличил до 6, так как в вашем примере было 6 строк
                        .map((attr) => (
                          <CharacteristicRow
                            key={attr.attributeName}
                            label={attr.attributeName}
                            value={attr.attributeValueName}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={() => setActiveTab("characteristics")}
                  className="text-accent font-semibold hover:underline decoration-2 underline-offset-4 mx-4 mb-4"
                >
                  Все характеристики ({product.attributes?.length})
                </button>
              </div>

              {/* Инфо-карточки (сетка 2х2) */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mx-4">
                {[
                  {
                    label: "Оплата",
                    val: "Любые способы",
                    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                    color: "text-green-600",
                    bg: "bg-green-100",
                  },
                  {
                    label: "Гарантия",
                    val: "От производителя",
                    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center p-4 rounded-2xl bg-surface-low border border-border"
                  >
                    <div
                      className={`${item.bg} ${item.color} p-3 rounded-xl mr-4`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={item.icon}
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-sm">{item.label}</div>
                      <div className="text-xs text-textMuted">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              {product.attributes
                .filter((attr) =>
                  allowed.some((word) =>
                    attr.attributeName.toLowerCase().includes(word),
                  ),
                )
                .map((attr) => (
                  <div
                    key={`${product.id}-${attr.attributeName}-${attr.attributeValueName}`}
                    className="flex justify-between my-4 px-2 mx-4"
                  >
                    <span className="font-medium dark:text-white">
                      {attr.attributeName}:
                    </span>
                    <span className=" dark:text-white">
                      {attr.attributeValueName}
                    </span>
                  </div>
                ))}
              {product.attributes.length > 3 && (
                <button
                  onClick={() => {
                    setActiveTab("characteristics");
                    characteristicsRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="text-xl text-blue-500 hover:text-gray-700 mx-4 mb-4"
                >
                  Все характеристики ({product.attributes.length})
                </button>
              )} */}

              {/* Share and Production Time */}
              <div className="border-t border-accent/40 pt-6 mx-4">
                <div className="flex flex-col md:flex-col justify-between gap-4 text-xl">
                  <div className="text-red-700">
                    <span className="font-semibold">
                      Заказ от {product.multiplicity} шт.
                    </span>
                  </div>
                  <div className="text-text">
                    {/* <span className="font-semibold">Срок изготовления:</span> 7
                    до 14 дней */}
                    <span className="font-semibold">
                      Срок изготовления:{" "}
                      {product.attributes?.find(
                        (a) => a.attributeName === "Срок изготовления",
                      )?.attributeValueName ?? "10-14 дней"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 lg:my-8 rounded-2xl shadow-xl p-2">
            {/* <div
              className="container mx-auto text-textForeground text-sm lg:text-xl text-justify lg:indent-30 px-2 lg:px-8"
              itemProp="description"
            >
              {product.description}
            </div> */}
            <div
              className="container mx-auto text-text px-2 pb-10 lg:px-8"
              itemProp="description"
            >
              {/* 1. СЕТКА USP: 1 колонка на мобильных, 2 колонки на ПК (md:) + Компактный вид */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-6">
                {Array.isArray(product.usp) &&
                  product.usp.map((item, i) => {
                    // 1. Выделяем эмодзи в начале строки
                    const emojiMatch =
                      typeof item === "string" &&
                      item.match(/^(\p{Extended_Pictographic}|\p{Emoji})/u);
                    const emoji = emojiMatch ? emojiMatch[0] : "✔";

                    // 2. Убираем эмодзи из остального текста
                    const cleanText = emojiMatch
                      ? item.slice(emoji.length).trim()
                      : item;

                    // 3. Делим текст по тире
                    const [title, ...descriptionParts] = cleanText.split(" – ");
                    const description = descriptionParts.join(" – ");

                    return (
                      <div
                        key={i}
                        className="flex items-center text-text p-2.5 rounded-xl bg-card border border-border"
                      >
                        {/* Уменьшенный блок с эмодзи (было w-12 h-12 -> стало w-8 h-8) */}
                        <div className="p-1.5 rounded-lg mr-3 bg-surface-medium text-base flex items-center justify-center w-8 h-8 shrink-0">
                          {emoji}
                        </div>

                        {/* Компактный текст */}
                        <div className="leading-tight">
                          <div className="font-bold">{title}</div>
                          {description && (
                            <div className="mt-0.5 text-textMuted">
                              {description}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* 2. ВЕРСТКА МАРКДАУНА (Стилизация элементов) */}
              <div className="markdown-content leading-relaxed space-y-3 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-4 [&_a]:text-primary [&_a]:underline">
                <Markdown>{product.description}</Markdown>
              </div>
            </div>

            <Advantages />
          </div>
        </div>

        {/* ТАБЫ (Нижний блок) */}
        <section className="bg-gradient-metal border-t border-border md:animate-metal">
          <div className="container mx-auto py-4 lg:py-8 px-4 pt-16">
            <div className="flex flex-col md:flex-row gap-3 md:gap-5 pb-4 no-scrollbar mb-8">
              {[
                "characteristics",
                "description",
                "documentation",
                "dostavka",
                "reviews",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? "btn-gold"
                      : // : "bg-surface-high text-textMuted hover:bg-surface-highest"
                        "bg-gradient-metal"
                  }`}
                >
                  {tab === "characteristics" && "Характеристики"}
                  {tab === "description" && "Описание"}
                  {tab === "documentation" && "Документация"}
                  {tab === "dostavka" && "Доставка"}
                  {tab === "reviews" && "Отзывы"}
                </button>
              ))}
            </div>

            <div className="min-h-[300px]">
              {/* Контент табов */}
              {activeTab === "characteristics" && (
                <CharacteristicsTab attributes={product.attributes || []} />
              )}
              {activeTab === "description" && (
                <div className="markdown-content text-text leading-relaxed space-y-3 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-4 [&_a]:text-primary [&_a]:underline">
                  <Markdown>{product.description}</Markdown>
                </div>
              )}
              {activeTab === "documentation" && (
                <div className="prose prose-lg max-w-none">
                  <DocumentationTab files={product.documentationFiles || []} />
                </div>
              )}
              {activeTab === "dostavka" && (
                <div className="prose prose-lg max-w-none">
                  <DostavkaTab article={product.article} />
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="prose prose-lg max-w-none">
                  <ReviewsTab reviews={product.reviews || []} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Дополнительные секции */}
        <div className="">
          <ProductFaq />
          <WorksGallery slug={product.slug} />
          <RandomObjects />
        </div>
        {/* Feedback Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialContent={modalContent}
          onSubmit={handleFormSubmit}
          submitError={error}
        />

        {/* Zoomed Image Modal */}
        {isImageZoomed && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-700 ease-in-out"
            onClick={handleCloseZoom}
          >
            <div className="bg-glass p-8 rounded-2xl max-w-2xl w-full shadow-2xl ">
              <h2 className="text-2xl font-bold mb-8 text-text">
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
                  className="inline-flex items-center justify-center border-0 btn-gold mr-2  px-8 py-3 cursor-pointer rounded-3xl hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
                >
                  {adding ? "Добавление..." : "Купить"}
                </button>

                <button
                  onClick={() =>
                    handleButtonClick(
                      `Заказ бесплатного расчета по товару ${product.name}`,
                    )
                  }
                  className="inline-flex items-center justify-center border-0 bg-blue-500  text-white px-8 py-3 cursor-pointer rounded-3xl hover:bg-blue-600 transition-all duration-300"
                >
                  Заказать бесплатный расчет
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
function CharacteristicRow({ label, value }) {
  return (
    <tr className="border-b border-card-border last:border-0">
      <td className="text-textMuted py-1">{label}</td>
      <td className="text-right font-bold py-1">{value}</td>
    </tr>
  );
}
