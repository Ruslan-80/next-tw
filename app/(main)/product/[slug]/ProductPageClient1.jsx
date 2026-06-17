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
    <div
      itemScope
      itemType="https://schema.org/Product"
      className="container mx-auto py-8 bg-background text-text"
    >
      <h1
        className="lg:text-3xl 
        font-bold mb-4 max-w-[900px]"
        itemProp="name"
      >
        {product.name || "Продукт"}
      </h1>
      {/* <div className="bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-gray-900 dark:text-white"> */}
      <div className="rounded-2xl shadow-xl bg-background text-text">
        {/* Modern Product Layout */}
        <div>
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery */}
            <div className="lg:w-1/2 p-6 lg:sticky lg:top-6 self-start">
              <div className="flex flex-col-reverse lg:flex-col-reverse gap-4 ">
                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto py-2 lg:py-0">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`relative w-16 h-16 lg:w-20 lg:h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === selectedImageIndex
                          ? "border-gray-200 shadow-md"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        height={75}
                        width={75}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Main Image */}
                <div className="relative flex-1 aspect-square rounded-xl overflow-hidden">
                  {images[selectedImageIndex] ? (
                    <>
                      <link
                        itemProp="image"
                        href={`https://electroshit-pro.ru${images[selectedImageIndex] || mainImage}`}
                      />

                      <Image
                        src={images[selectedImageIndex] || mainImage}
                        alt={product.name || "Продукт"}
                        height={700}
                        width={700}
                        className="object-contain w-full h-full transition-all duration-500 hover:scale-105 cursor-zoom-in"
                        onClick={() => handleImageZoom(selectedImageIndex)}
                        priority
                      />
                    </>
                  ) : (
                    <Skeleton className="w-full h-full rounded-lg" />
                  )}

                  {/* Product Badges */}
                  <div className="absolute top-2 left-0 lg:top-4 lg:left-4 flex flex-col gap-2">
                    <div className="bg-green-500 text-white text-[8px] lg:text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      НОВИНКА
                    </div>
                    <div className="bg-red-500 text-white text-[8px] lg:text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      ТОП ПРОДАЖ
                    </div>
                    <div className="bg-orange-500 text-white text-[8px] lg:text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      АКЦИЯ
                    </div>
                  </div>

                  <div className="absolute top-2 right-0 lg:top-4 lg:right-4 bg-gray-800 text-white text-[8px] lg:text-xs font-medium px-3 py-1 rounded-full">
                    Артикул: {product.article || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 py-6 bg-gray-50 dark:bg-gray-900 dark:text-white">
              <meta itemProp="sku" content={product.article || "N/A"} />
              <Link
                itemProp="url"
                content={`https://electroshit-pro.ru/product/${product.slug}`}
                href={`/product/${product.slug}`}
              />

              {/* <meta itemProp="brand" content="Электрощит PRO" /> */}
              {/* <div className="hidden" itemProp="description">
                {product.description}
              </div> */}
              <div className="mb-8">
                {/* Price and Actions */}

                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-4 mb-6">
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
                      : "Цена недоступна"}
                  </div>

                  <div className="flex flex-col lg:flex-row gap-3">
                    <button
                      onClick={() =>
                        handleButtonClick(
                          `Купить в 1 клик` + " " + product.name,
                        )
                      }
                      className="bg-primary w-full text-textForeground px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Купить в 1 клик
                    </button>
                    <button
                      onClick={handleAddToCart}
                      disabled={adding}
                      className="btn-gold w-full px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg "
                    >
                      {adding ? "Добавление..." : "В корзину"}
                    </button>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 ">
                  <div className="bg-background text-text p-4 rounded-xl shadow-sm flex items-center">
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
                      <h3 className="font-bold text-textForeground ">
                        Обратный звонок
                      </h3>
                      <button
                        onClick={() =>
                          handleButtonClick(
                            `Заказ обратного звонка по товару ${product.name}`,
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 font-medium mt-1"
                      >
                        Перезвонить мне
                      </button>
                    </div>
                  </div>

                  <div className="bg-background text-text p-4 rounded-xl shadow-sm flex items-center">
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
                      <h3 className="font-bold text-textForeground">Оплата</h3>
                      <p className="text-textMuted">Наличными/Безналичными</p>
                    </div>
                  </div>

                  <div className="bg-background text-text p-4 rounded-xl shadow-sm flex items-center">
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
                      <h3 className="font-bold text-textForeground">
                        Нашли дешевле?
                      </h3>
                      <p className="text-textMuted">Снизим цену!</p>
                    </div>
                  </div>

                  <div className="bg-background text-text p-4 rounded-xl shadow-sm flex items-center">
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
                      <h3 className="font-bold text-textForeground">
                        Возврат и обмен
                      </h3>
                      <p className="text-textMuted">В течение 14 дней</p>
                    </div>
                  </div>
                </div>

                {/* Additional Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() =>
                      handleButtonClick(
                        `Заказать бесплатный расчет` + " " + product.name,
                      )
                    }
                    className="w-full py-3 px-6 btn-primary text-textForeground font-medium rounded-lg border border-blue-200 transition-colors duration-300"
                  >
                    Заказать бесплатный расчет
                  </button>
                  <button
                    onClick={() =>
                      handleButtonClick(
                        `Заказать бесплатный замер с выездом специалиста` +
                          " " +
                          product.name,
                      )
                    }
                    className="w-full py-3 px-6 btn-primary text-textForeground font-medium rounded-lg border border-blue-200  transition-colors duration-300 "
                  >
                    Заказать бесплатный замер с выездом специалиста
                  </button>
                </div>
              </div>
              {/* Часть характеристик */}
              {/* <div
                className={
                  "grid grid-cols-1 gap-2 text-xl text-gray-700 md:pr-4"
                }
              >
                {product.attributes?.length > 0 && (
                  <div className="relative space-y-1 mb-3">
                    <div
                      className={`space-y-1 overflow-hidden ${
                        showAllAttrs ? "" : "max-h-[180px]"
                      }`}
                    >
                      {product.attributes.map((attr) => (
                        <div
                          key={`${product.id}-${attr.attributeName}-${attr.attributeValueName}`}
                          className="flex justify-between "
                        >
                          <span className="font-medium dark:bg-gray-800 dark:text-white">
                            {attr.attributeName}:
                          </span>
                          <span className="ml-1 dark:bg-gray-800 dark:text-white">
                            {attr.attributeValueName}
                          </span>
                        </div>
                      ))}
                    </div>
                    {product.attributes.length > 3 && (
                      <div className="absolute" />
                    )}
                    {product.attributes.length > 3 && (
                      <button
                        onClick={() => {
                          setActiveTab("characteristics");
                          characteristicsRef.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                        className="text-xl text-blue-500 hover:text-gray-700"
                      >
                        Все характеристики ({product.attributes.length})
                      </button>
                    )}
                  </div>
                )}
              </div> */}
              {product.attributes
                .filter((attr) =>
                  allowed.some((word) =>
                    attr.attributeName.toLowerCase().includes(word),
                  ),
                )
                .map((attr) => (
                  <div
                    key={`${product.id}-${attr.attributeName}-${attr.attributeValueName}`}
                    className="flex justify-between mb-2"
                  >
                    <span className="font-medium bg-background text-text">
                      {attr.attributeName}:
                    </span>
                    <span className="bg-background text-text">
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
                  className="text-xl text-blue-500 hover:text-gray-700"
                >
                  Все характеристики ({product.attributes.length})
                </button>
              )}

              {/* Share and Production Time */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col md:flex-col justify-between gap-4 text-xl">
                  <div className="text-red-700">
                    <span className="font-semibold">
                      Заказ от{" "}
                      {product.attributes?.find(
                        (attr) => attr.attributeName === "Кратность",
                      )?.attributeValueName ?? 10}{" "}
                      шт.
                    </span>
                  </div>
                  <div className="text-textForeground">
                    {/* <span className="font-semibold">Срок изготовления:</span> 7
                    до 14 дней */}
                    <span className="font-semibold">
                      Срок изготовления:{" "}
                      {product.attributes?.find(
                        (attr) => attr.attributeName === "Срок изготовления",
                      )?.attributeValueName ?? "10-14 дней"}
                    </span>
                  </div>

                  {/* <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-semibold">
                      Поделиться:
                    </span>
                    <div className="flex gap-2">
                      <a
                        href="#"
                        className="text-gray-500 hover:text-green-500 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.361.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.211 12.043c-.389 3.322-2.049 5.625-4.547 5.625-1.01 0-1.865-.508-2.183-1.297.215.035.436.054.659.054 1.281 0 2.298-.519 2.963-1.362-.721.021-1.364-.31-1.588-.903.101.019.194.028.295.028.142 0 .279-.019.409-.056-.679-.151-1.151-.804-1.151-1.522v-.021c.198.116.428.185.67.193-.339-.26-.562-.7-.562-1.2 0-.442.174-.839.458-1.135.823.95 2.052 1.573 3.435 1.638-.112-.5.055-.982.439-1.291.61-.482 1.554-.366 2.038.233.316-.073.615-.203.885-.383-.103.371-.318.679-.601.875.272-.037.533-.117.775-.236-.18.325-.408.615-.672.855z" />
                        </svg>
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 lg:my-8 rounded-2xl shadow-xl p-2">
            <div
              className="bg-background text-text text-sm lg:text-xl text-justify lg:indent-30 px-2 lg:px-8"
              itemProp="description"
            >
              {product.description}
            </div>

            <Advantages />
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-8 bg-gradient-to-r from-surface-highest to-indigo-900 rounded-2xl shadow-xl p-6  ">
          <div className="flex flex-col md:grid md:grid-cols-7 md:items-center md:gap-x-4">
            {/* Этап 1 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <span className="text-xl lg:text-2xl font-bold text-blue-600">
                  1
                </span>
              </div>
              <h3 className="font-bold text-accent mb-2">Заявка</h3>
              <p className="text-text">
                Оставьте заявку на сайте или по телефону
              </p>
            </div>

            {/* Стрелка 1 */}
            <div className="hidden md:flex items-center justify-center text-gray-400">
              <ArrowRight size={48} />
            </div>

            {/* Этап 2 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-bold text-gray-600 mb-2">Консультация</h3>
              <p className="text-gray-600">
                Наш специалист уточнит детали заказа
              </p>
            </div>

            {/* Стрелка 2 */}
            <div className="hidden md:flex items-center justify-center text-gray-400">
              <ArrowRight size={48} />
            </div>

            {/* Этап 3 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-bold text-gray-600 mb-2">Производство</h3>
              <p className="text-gray-600">
                Изготовление продукции по вашему заказу
              </p>
            </div>

            {/* Стрелка 3 */}
            <div className="hidden md:flex items-center justify-center text-gray-400">
              <ArrowRight size={48} />
            </div>

            {/* Этап 4 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="font-bold text-gray-600 text-lg mb-2">Доставка</h3>
              <p className="text-gray-600">
                Быстрая доставка в любой регион РФ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="my-8">
        <div
          className="flex flex-wrap gap-5 mb-3 text-xs lg:text-2xl md:flex-nowrap"
          ref={characteristicsRef}
        >
          <button
            className={`w-full py-3 px-6 font-medium bg-gray-300 border rounded-2xl transition-all duration-300 ${
              activeTab === "characteristics"
                ? "bg-white"
                : "text-gray-500 hover:text-slate-900"
            }`}
            onClick={() => setActiveTab("characteristics")}
          >
            Характеристики
          </button>
          <button
            className={`w-full py-3 px-6 font-medium bg-gray-300 border rounded-2xl transition-all duration-300 ${
              activeTab === "description"
                ? "bg-white"
                : "text-gray-500 hover:text-slate-900"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Описание
          </button>
          <button
            className={`w-full py-3 px-6 font-medium bg-gray-300 border rounded-2xl transition-all duration-300 ${
              activeTab === "documentation"
                ? "bg-white"
                : "text-gray-500 hover:text-slate-900"
            }`}
            onClick={() => setActiveTab("documentation")}
          >
            Документация
          </button>
          <button
            className={`w-full py-3 px-6 font-medium bg-gray-300 border rounded-2xl transition-all duration-300 ${
              activeTab === "dostavka"
                ? "bg-white"
                : "text-gray-500 hover:text-slate-900"
            }`}
            onClick={() => setActiveTab("dostavka")}
          >
            Доставка
          </button>
          <button
            className={`w-full py-3 px-6 font-medium bg-gray-300 border rounded-2xl transition-all duration-300 ${
              activeTab === "reviews"
                ? "bg-white"
                : "text-gray-500 hover:text-slate-900"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Отзывы
          </button>
        </div>
        <div>
          {/* Характеристики (используем класс hidden для скрытия) */}
          <div
            className={`tab-content ${
              activeTab !== "characteristics" ? "seo-hidden" : ""
            }`}
          >
            <CharacteristicsTab attributes={product.attributes || []} />
          </div>

          {/* Описание */}
          <div
            className={`tab-content ${
              activeTab !== "description" ? "seo-hidden" : ""
            }`}
            // itemProp="description"
          >
            <DescriptionsTab
              description={product.description || []}
              slug={product.slug || []}
            />
          </div>

          {/* Документация */}
          <div
            className={`tab-content ${
              activeTab !== "documentation" ? "seo-hidden" : ""
            }`}
          >
            <DocumentationTab files={product.documentationFiles || []} />
          </div>

          {/* Доставка */}
          <div
            className={`tab-content ${
              activeTab !== "dostavka" ? "seo-hidden" : ""
            }`}
          >
            <DostavkaTab article={product.article} />
          </div>

          {/* Отзывы */}
          <div
            className={`tab-content ${
              activeTab !== "reviews" ? "seo-hidden" : ""
            }`}
          >
            <ReviewsTab reviews={product.reviews || []} />
          </div>
        </div>
      </div>
      <ProductFaq />
      <WorksGallery />
      <VideoGallery />
      <RandomObjects />
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
  );
}
