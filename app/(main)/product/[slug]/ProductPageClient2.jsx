"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CharacteristicsTab from "./CharacteristicsTab";
import DocumentationTab from "@/components/DocumentationTab";
import ReviewsTab from "@/components/ReviewsTab";
import DescriptionsTab from "@/components/DescriptionsTab";
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
  const [currentUrl, setCurrentUrl] = useState("");

  // Получаем текущий URL только после монтирования компонента в браузере
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []); // Пустой массив зависимостей означает, что эффект запустится один раз после первого рендера

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
    <main className="container mx-auto py-8">
      <h1 className="lg:text-2xl font-bold mb-2">
        {product.name || "Продукт"}
      </h1>
      <div className="flex flex-col xl:flex-row items-start xl:items-stretch bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Product Image Gallery */}
        <div className="xl:w-1/2 p-4 relative">
          {" "}
          {/* Добавил relative для позиционирования меток */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]  rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src={images[selectedImageIndex] || mainImage}
              alt={product.name || "Продукт"}
              layout="fill" // Используем layout="fill" для адаптивного изображения
              objectFit="contain" // Чтобы изображение вписывалось в контейнер
              className=" p-4 rounded-lg transform transition-all duration-500 ease-in-out scale-100 hover:scale-105"
              onClick={() => handleImageZoom(selectedImageIndex)}
            />

            {/* Метка НОВИНКА */}
            <div className="absolute top-4 left-4 bg-green-300 text-black text-xs lg:text-sm font-bold px-3 py-1 rounded-full shadow-md z-10">
              НОВИНКА
            </div>

            {/* Метка ТОП ПРОДАЖ */}
            <div className="absolute top-4 left-30 bg-red-300 text-black text-xs lg:text-sm font-bold px-3 py-1 rounded-full shadow-md z-10">
              ТОП ПРОДАЖ
            </div>

            {/* Метка АКЦИЯ */}
            <div className="absolute top-4 left-62 bg-orange-300 text-black text-xs lg:text-sm font-bold px-3 py-1 rounded-full shadow-md z-10">
              АКЦИЯ
            </div>
            <div className="absolute top-4 right-5 bg-gray-300 text-black text-xs lg:text-sm font-bold px-3 py-1 rounded-full shadow-md z-10">
              Артикул: {product.article || "N/A"}
            </div>
          </div>
          {/* Thumbnail images */}
          <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
            {images.map((img, index) => (
              <div
                key={index}
                className={`w-16 h-16 lg:w-20 lg:h-20 relative cursor-pointer rounded-md overflow-hidden border-2 ${
                  index === selectedImageIndex
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="xl:w-1/2 p-4 text-sm">
          <div className=" p-4 text-sm">
            <div className="flex text-center mt-4 mb-8">
              {" "}
              {/* Уменьшил mb для share/time */}
              <span className="text-3xl text-black font-bold pr-15">
                {product.basePrice
                  ? `${product.basePrice.toLocaleString("ru-RU")} руб.`
                  : "Цена недоступна"}
              </span>
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="inline-flex items-center justify-center text-xl border-0 bg-orange-400 text-white px-8 py-2 cursor-pointer rounded-3xl hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
              >
                {adding ? "Добавление..." : "Купить"}
              </button>
            </div>
            {/* Новый блок - Рейтинг товара */}
            <div className="flex items-center  px-4 bg-yellow-50 rounded-lg shadow-md">
              <h3 className="text-sm mr-4">Рейтинг товара</h3>
              <div className=" text-yellow-200 text-sm">
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span className="text-gray-300">⭐</span> {/* 4.5 звезды */}
                <span className="text-gray-700 text-sm mr-4">(4.5 из 5)</span>
              </div>
              <p className="text-gray-600">На основе 125 отзывов</p>{" "}
              {/* Пример */}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col mt-5 mb-6 text-black text-xs lg:text-xl">
              {/* <button
                onClick={handleAddToCart}
                disabled={adding}
                className="inline-flex items-center justify-center border-0 bg-orange-400 mr-2  text-white px-8 py-3 cursor-pointer rounded-3xl hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
              >
                {adding ? "Добавление..." : "Купить"}
              </button> */}
              <button
                onClick={() => setIsModalOpen(true)}
                className=" border-0  px-8 py-3 cursor-pointer rounded-3xl hover:bg-blue-300 transition-all duration-300 mb-4"
              >
                Заказать бесплатный расчет
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="border-0   px-8 py-3 cursor-pointer rounded-3xl hover:bg-blue-300 transition-all duration-300"
              >
                Заказать бесплатный замер с выездом специалиста
              </button>
            </div>
          </div>
          <div className="w-full p-4 border-0 rounded-3xl">
            {/* Срок изготовления */}
            <div className="mb-4 text-gray-700">
              <span className="font-semibold">Срок изготовления:</span>{" "}
              производство от 7 до 14 дней
            </div>

            {/* Кнопки "Поделиться" */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-gray-700 font-semibold">Поделиться:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  product.name + " " + currentUrl
                )}`} // ИСПОЛЬЗУЕМ currentUrl
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-500 transition-colors duration-200"
                aria-label="Поделиться в WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="WhatsApp"
                  role="img"
                  viewBox="0 0 512 512"
                  className="w-3 h-3 lg:w-6 lg:h-6"
                >
                  <rect width="512" height="512" rx="15%" fill="#25d366" />
                  <path
                    fill="#25d366"
                    stroke="#ffffff"
                    strokeWidth="26"
                    d="M123 393l14-65a138 138 0 1150 47z"
                  />
                  <path
                    fill="#ffffff"
                    d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
                  />
                </svg>
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(
                  currentUrl
                )}&text=${encodeURIComponent(product.name)}`} // ИСПОЛЬЗУЕМ currentUrl
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors duration-200"
                aria-label="Поделиться в Telegram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Telegram"
                  role="img"
                  viewBox="0 0 512 512"
                  className="w-3 h-3 lg:w-6 lg:h-6"
                >
                  <rect width="512" height="512" rx="15%" fill="#37aee2" />
                  <path
                    fill="#c8daea"
                    d="M199 404c-11 0-10-4-13-14l-32-105 245-144"
                  />
                  <path fill="#a9c9dd" d="M199 404c7 0 11-4 16-8l45-43-56-34" />
                  <path
                    fill="#f6fbfe"
                    d="M204 319l135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4"
                  />
                </svg>
              </a>
              <a
                href={`https://vk.com/share.php?url=${encodeURIComponent(
                  currentUrl
                )}&title=${encodeURIComponent(product.name)}&noparse=true`} // ИСПОЛЬЗУЕМ currentUrl
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                aria-label="Поделиться ВКонтакте"
              >
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 202 202"
                  id="VK_Logo"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  className="w-3 h-3 lg:w-6 lg:h-6"
                >
                  <style>{`.st0{clip-path:url(#SVGID_2_);fill:#5181b8}.st1{fill-rule:evenodd;clip-rule:evenodd;fill:#fff}`}</style>
                  <g id="Base">
                    <defs>
                      <path
                        id="SVGID_1_"
                        d="M71.6 5h58.9C184.3 5 197 17.8 197 71.6v58.9c0 53.8-12.8 66.5-66.6 66.5H71.5C17.7 197 5 184.2 5 130.4V71.5C5 17.8 17.8 5 71.6 5z"
                      />
                    </defs>
                    <use
                      xlinkHref="#SVGID_1_"
                      overflow="visible"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#5181b8"
                    />
                    <clipPath id="SVGID_2_">
                      <use xlinkHref="#SVGID_1_" overflow="visible" />
                    </clipPath>
                    <path className="st0" d="M0 0h202v202H0z" />
                  </g>
                  <path
                    id="Logo"
                    className="st1"
                    d="M162.2 71.1c.9-3 0-5.1-4.2-5.1h-14c-3.6 0-5.2 1.9-6.1 4 0 0-7.1 17.4-17.2 28.6-3.3 3.3-4.7 4.3-6.5 4.3-.9 0-2.2-1-2.2-4V71.1c0-3.6-1-5.1-4-5.1H86c-2.2 0-3.6 1.7-3.6 3.2 0 3.4 5 4.2 5.6 13.6v20.6c0 4.5-.8 5.3-2.6 5.3-4.7 0-16.3-17.4-23.1-37.4-1.4-3.7-2.7-5.3-6.3-5.3H42c-4 0-4.8 1.9-4.8 4 0 3.7 4.7 22.1 22.1 46.4C70.9 133 87.2 142 102 142c8.9 0 10-2 10-5.4V124c0-4 .8-4.8 3.7-4.8 2.1 0 5.6 1 13.9 9 9.5 9.5 11.1 13.8 16.4 13.8h14c4 0 6-2 4.8-5.9-1.3-3.9-5.8-9.6-11.8-16.4-3.3-3.9-8.2-8-9.6-10.1-2.1-2.7-1.5-3.9 0-6.2 0-.1 17.1-24.1 18.8-32.3z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Закрытие div flex flex-col xl:flex-row */}
      {/* Новый блок - Детализация услуги (процесс) */}
      <div className="mt-8 mb-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl lg:text-2xl font-bold mb-6 text-center">
          Как мы работаем
        </h2>
        <div className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 md:space-x-4">
          {/* Шаг 1: Замер */}
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm w-full md:w-1/4">
            <span className="text-4xl mb-2">📏</span> {/* Иконка замера */}
            <p className="font-semibold text-base lg:text-lg">Замер</p>
            <p className="text-sm text-gray-600">
              Бесплатный выезд специалиста на объект
            </p>
          </div>
          <span className="text-3xl text-gray-500 hidden md:block">→</span>{" "}
          {/* Стрелка для десктопа */}
          <span className="text-3xl text-gray-500 rotate-90 md:hidden">
            →
          </span>{" "}
          {/* Стрелка для мобильных */}
          {/* Шаг 2: Проектирование */}
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm w-full md:w-1/4">
            <span className="text-4xl mb-2">📐</span>{" "}
            {/* Иконка проектирования */}
            <p className="font-semibold text-base lg:text-lg">Проектирование</p>
            <p className="text-sm text-gray-600">
              Разработка проекта по вашим требованиям
            </p>
          </div>
          <span className="text-3xl text-gray-500 hidden md:block">→</span>
          <span className="text-3xl text-gray-500 rotate-90 md:hidden">→</span>
          {/* Шаг 3: Доставка */}
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm w-full md:w-1/4">
            <span className="text-4xl mb-2">🚚</span> {/* Иконка доставки */}
            <p className="font-semibold text-base lg:text-lg">Доставка</p>
            <p className="text-sm text-gray-600">
              Оперативная доставка до вашего объекта
            </p>
          </div>
          <span className="text-3xl text-gray-500 hidden md:block">→</span>
          <span className="text-3xl text-gray-500 rotate-90 md:hidden">→</span>
          {/* Шаг 4: Монтаж */}
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm w-full md:w-1/4">
            <span className="text-4xl mb-2">🔧</span> {/* Иконка монтажа */}
            <p className="font-semibold text-base lg:text-lg">Монтаж</p>
            <p className="text-sm text-gray-600">
              Профессиональная установка оборудования
            </p>
          </div>
        </div>
      </div>
      {/* Новый блок - Преимущества компании (инфографика) */}
      <div className="mt-8 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-xl lg:text-2xl font-bold mb-6 text-center">
          Наши преимущества
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Преимущество 1: Бесплатная доставка */}
          <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg">
            <span className="text-4xl flex-shrink-0">📦</span> {/* Иконка */}
            <div>
              <p className="font-semibold text-lg">Бесплатная доставка</p>
              <p className="text-sm opacity-90">
                Доставим ваш заказ бесплатно.
              </p>
            </div>
          </div>

          {/* Преимущество 2: Выезд специалиста */}
          <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg">
            <span className="text-4xl flex-shrink-0">👨‍🔬</span> {/* Иконка */}
            <div>
              <p className="font-semibold text-lg">Выезд специалиста</p>
              <p className="text-sm opacity-90">
                Наш эксперт приедет для замеров и консультаций.
              </p>
            </div>
          </div>

          {/* Преимущество 3: Обмен брака */}
          <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg">
            <span className="text-4xl flex-shrink-0">♻️</span> {/* Иконка */}
            <div>
              <p className="font-semibold text-lg">Обмен брака</p>
              <p className="text-sm opacity-90">
                Гарантированный обмен в случае производственного брака.
              </p>
            </div>
          </div>

          {/* Преимущество 4: Выбор цвета по RAL */}
          <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg">
            <span className="text-4xl flex-shrink-0">🎨</span> {/* Иконка */}
            <div>
              <p className="font-semibold text-lg">Выбор цвета по RAL</p>
              <p className="text-sm opacity-90">
                Возможность выбора любого цвета по каталогу RAL.
              </p>
            </div>
          </div>

          {/* Преимущество 5: Гарантия качества */}
          <div className="flex items-center space-x-4 bg-white bg-opacity-20 p-4 rounded-lg">
            <span className="text-4xl flex-shrink-0">✅</span> {/* Иконка */}
            <div>
              <p className="font-semibold text-lg">Гарантия качества</p>
              <p className="text-sm opacity-90">
                Вся продукция сертифицирована и имеет гарантию.
              </p>
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
              activeTab === "description"
                ? "bg-white"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Описание
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
          {activeTab === "description" && (
            <DescriptionsTab description={product.description || []} />
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
                {adding ? "Добавление..." : "Купить"}
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
