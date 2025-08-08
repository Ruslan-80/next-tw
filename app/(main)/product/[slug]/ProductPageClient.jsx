"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CharacteristicsTab from "./CharacteristicsTab";
import DocumentationTab from "@/components/DocumentationTab";
import ReviewsTab from "@/components/ReviewsTab";
import DescriptionsTab from "@/components/DescriptionsTab";
import mainImage from "@/public/images/product/713680920.webp";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import Advantages from "./Advantages";
import ProcessPage from "./Process";
import AdvantageCompany from "./AdvantageCompany";

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!product) {
    return <div className="container mx-auto py-8 px-4">Загрузка...</div>;
  }

  const images =
    product.mediaFiles && Array.isArray(product.mediaFiles)
      ? product.mediaFiles.map((file) => file.url)
      : [mainImage.src];

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
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Список миниатюр - не нужен отдельный thumbnails, используем images напрямую

  return (
    <main className="container mx-auto py-8">
      <h1 className="lg:text-2xl font-bold mb-4">
        {product.name || "Продукт"}
      </h1>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Modern Product Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Image Gallery */}
          <div className="lg:w-1/2 p-6">
            <div className="flex flex-col-reverse lg:flex-col-reverse gap-4">
              {/* Thumbnails */}
              <div className="flex  gap-2 overflow-x-auto py-2 lg:py-0">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`relative w-16 h-16 lg:w-20 lg:h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === selectedImageIndex
                        ? "border-blue-500 shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 aspect-square  rounded-xl overflow-hidden">
                <Image
                  src={images[selectedImageIndex] || mainImage}
                  alt={product.name || "Продукт"}
                  fill
                  className="object-contain p-4 transition-all duration-500 hover:scale-105 cursor-zoom-in"
                  onClick={() => handleImageZoom(selectedImageIndex)}
                />

                {/* Product Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    НОВИНКА
                  </div>
                  <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    ТОП ПРОДАЖ
                  </div>
                  <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    АКЦИЯ
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-gray-800 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Артикул: {product.article || "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-6 bg-gray-50">
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Price and Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="text-3xl font-bold text-blue-600">
                  {product.basePrice
                    ? `${product.basePrice.toLocaleString("ru-RU")} руб.`
                    : "Цена недоступна"}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Купить в 1 клик
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={adding}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
                  >
                    {adding ? "Добавление..." : "В корзину"}
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center bg-yellow-50 p-4 rounded-xl mb-6">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-700 font-medium">
                  4.8 (125 отзывов)
                </span>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
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
                    <h3 className="font-bold text-gray-900">Обратный звонок</h3>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-blue-600 hover:text-blue-800 font-medium mt-1"
                    >
                      Перезвонить мне
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
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

                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
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

                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
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
              </div>

              {/* Additional Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 px-6 bg-blue-50 text-blue-700 font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors duration-300"
                >
                  Заказать бесплатный расчет
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 px-6 bg-blue-50 text-blue-700 font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors duration-300"
                >
                  Заказать бесплатный замер с выездом специалиста
                </button>
              </div>
            </div>

            {/* Share and Production Time */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-gray-700">
                  <span className="font-semibold">Срок изготовления:</span>{" "}
                  производство от 7 до 14 дней
                </div>

                <div className="flex items-center gap-3">
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
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Company Advantages */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6">
          <Advantages />
          <h2 className="text-2xl font-bold mb-6 text-center">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3">Опыт более 15 лет</h3>
              <p className="text-gray-600">
                Работаем на рынке электротехники с 2008 года
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3">
                Собственное производство
              </h3>
              <p className="text-gray-600">
                Изготавливаем продукцию на современных линиях
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3">Гарантия 3 года</h3>
              <p className="text-gray-600">
                Даем расширенную гарантию на всю продукцию
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3">6000+ клиентов</h3>
              <p className="text-gray-600">
                Обслужили более 6000 довольных клиентов
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3">Экологичные материалы</h3>
              <p className="text-gray-600">
                Используем только безопасные материалы
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-3">Поддержка 24/7</h3>
              <p className="text-gray-600">
                Круглосуточная техническая поддержка
              </p>
            </div>
          </div>
        </div>
        {/* Process Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Процесс работы с нами
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-bold mb-2">Заявка</h3>
              <p className="text-gray-600">
                Оставьте заявку на сайте или по телефону
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-bold mb-2">Консультация</h3>
              <p className="text-gray-600">
                Наш специалист уточнит детали заказа
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-bold mb-2">Производство</h3>
              <p className="text-gray-600">
                Изготовление продукции по вашему заказу
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="font-bold mb-2">Доставка</h3>
              <p className="text-gray-600">
                Быстрая доставка в любой регион РФ
              </p>
            </div>
          </div>
        </div>

        {/* Advantages Section */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              <h3 className="text-lg font-bold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">
                Все товары проходят многоступенчатый контроль качества
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Доставка по РФ</h3>
              <p className="text-gray-600">
                Быстрая доставка в любой регион России от 2 дней
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Безопасная оплата</h3>
              <p className="text-gray-600">
                Оплата после получения товара или предоплата
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Новый блок - Детализация услуги (процесс) */}
      <ProcessPage />
      {/* Новый блок - Преимущества компании (инфографика) */}
      <AdvantageCompany />
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
