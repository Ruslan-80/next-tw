"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CharacteristicsTab from "./CharacteristicsTab";
import DocumentationTab from "../../../../components/DocumentationTab";
import DostavkaTab from "../../../../components/DostavkaTab";

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
import ProductCard from "./test";

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

                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] lg:text-xs px-3 py-1.5 rounded-lg border border-white/20">
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
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ПРАВАЯ КОЛОНКА: Инфо и Покупка */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-8">
              <h1
                className="text-2xl lg:text-4xl font-extrabold mb-6 tracking-tight text-textForeground max-w-[1000px]"
                itemProp="name"
              >
                {product.name || "Продукт"}
              </h1>
              {/* Блок цены и кнопок */}
              <div
                className="card-glass text-text"
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <meta itemProp="priceCurrency" content="RUB" />
                <meta
                  itemProp="price"
                  content={product.basePrice?.toString() || "0"}
                />
                <link
                  itemProp="availability"
                  href={
                    product.stock > 0
                      ? "https://schema.org/InStock"
                      : "https://schema.org/OutOfStock"
                  }
                />

                <div className="flex flex-col gap-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl lg:text-5xl font-black text-accent">
                      {product.basePrice
                        ? product.basePrice.toLocaleString("ru-RU")
                        : "0"}
                    </span>
                    <span className="text-xl font-bold text-textMuted">₽</span>
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
                      В 1 клик
                    </button>
                  </div>
                </div>
              </div>

              {/* Краткие характеристики */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                  Ключевые параметры
                </h3>
                {/* Таблица характеристик (Glassmorphism) */}
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
                  className="text-accent font-semibold hover:underline decoration-2 underline-offset-4"
                >
                  Все характеристики ({product.attributes?.length})
                </button>
              </div>

              {/* Инфо-карточки (сетка 2х2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    label: "Оплата",
                    val: "Любые способы",
                    icon: "M12 8c-1.6...",
                    color: "text-green-600",
                    bg: "bg-green-50",
                  },
                  {
                    label: "Гарантия",
                    val: "От производителя",
                    icon: "M9 12l2 2 4-4m5...",
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

              {/* Срок и кратность */}
              <div className="p-5 rounded-2xl bg-red-50 card-glass">
                <div className="flex flex-col gap-2">
                  <p className="text-white-700 font-bold">
                    Минимальный заказ:{" "}
                    {product.attributes?.find(
                      (a) => a.attributeName === "Кратность",
                    )?.attributeValueName ?? 10}{" "}
                    шт.
                  </p>
                  <p className="text-sm">
                    Срок производства:{" "}
                    <span className="font-bold">
                      {product.attributes?.find(
                        (a) => a.attributeName === "Срок изготовления",
                      )?.attributeValueName ?? "10-14 дней"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ТАБЫ (Нижний блок) */}
        <section className="bg-gradient-metal animate-metal border-t border-border animation-duration: 5s; animation-direction: reverse">
          <div className="container mx-auto py-4 lg:py-8 px-4  pt-16">
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
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
                      ? "bg-accent text-white shadow-lg shadow-accent/20"
                      : "bg-surface-high text-textMuted hover:bg-surface-highest"
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

            <div className="min-h-[300px] rounded-3xl py-6 lg:py-10 shadow-sm ">
              {/* Контент табов */}
              {activeTab === "characteristics" && (
                <CharacteristicsTab attributes={product.attributes || []} />
              )}
              {activeTab === "description" && (
                <div className="prose prose-lg max-w-none">
                  {product.description}
                </div>
              )}
              {/* ... остальные табы ... */}
            </div>
          </div>
        </section>

        {/* Дополнительные секции */}
        <div className="">
          <Advantages />
          <ProductFaq />
          <WorksGallery />
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
