"use client";

import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export default function CardItem({ product, view }) {
  const [adding, setAdding] = useState(false);
  const [showAllAttrs, setShowAllAttrs] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleAddToCart = async () => {
    if (!product) {
      alert("Вариант товара недоступен");
      return;
    }
    setAdding(true);
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
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
      setAdding(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
      setAdding(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          productId: product.id,
          productName: product.name,
        }),
      });

      if (!res.ok) {
        throw new Error("Не удалось отправить запрос");
      }
      alert("Запрос успешно отправлен!");
      setIsModalOpen(false);
      reset();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <>
      <li
        className={
          view === "grid"
            ? "border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 bg-white overflow-hidden transform hover:-translate-y-1.5"
            : "border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 bg-white flex flex-col md:flex-row"
        }
      >
        <div className="flex flex-col md:flex-row w-full">
          {/* Кликабельная область товара */}
          <Link
            href={`/product/${product.slug}`}
            className={`block flex-1 group ${
              view === "grid" ? "" : "md:w-3/4"
            }`}
          >
            <div
              className={
                view === "grid"
                  ? "flex flex-col h-full"
                  : "flex flex-col md:flex-row h-full"
              }
            >
              {product.image && (
                <div
                  className={
                    view === "grid"
                      ? "relative w-full aspect-square max-h-48 p-3 bg-gray-50 rounded-t-xl"
                      : "relative w-full max-h-80 md:w-48 md:h-48 aspect-square p-3 bg-gray-50 rounded-l-xl"
                  }
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-110 p-2"
                    sizes={
                      view === "grid"
                        ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        : "(max-width: 768px) 100vw, 192px"
                    }
                  />
                </div>
              )}
            </div>
          </Link>
          <div
            className={
              view === "grid"
                ? "p-4 flex-1 flex flex-col"
                : "p-4 flex-1 flex flex-col md:flex-row md:items-center"
            }
          >
            <div className="flex-1">
              <h4
                className={
                  view === "grid"
                    ? "text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 h-[3.5rem]"
                    : "text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200"
                }
              >
                {product.name}
              </h4>

              <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Артикул: {product.article || "N/A"}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded">
                  ID: {product.id || "N/A"}
                </span>
              </div>

              {product.description && (
                <p
                  className={
                    view === "grid"
                      ? "text-sm text-gray-600 mb-4 line-clamp-2"
                      : "text-sm text-gray-600 mb-4"
                  }
                >
                  {product.description}
                </p>
              )}

              <div className="flex items-center justify-between mb-4">
                <p className="text-xl font-bold text-gray-900">
                  {product.basePrice == 0
                    ? "По запросу"
                    : `${product.basePrice.toLocaleString("ru-RU")} ₽`}
                </p>
                <div className="flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-2 ${
                      product.stock > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <span
                    className={`text-sm ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock > 0 ? "В наличии" : "Нет в наличии"}
                  </span>
                </div>
              </div>

              {product.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag.slug}
                      className="text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 rounded-full shadow-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              {product.attributes?.length > 0 && (
                <div className="relative mb-3">
                  <div
                    className={`grid grid-cols-2 gap-2 text-sm ${
                      view === "list" ? "md:grid-cols-3" : ""
                    } ${showAllAttrs ? "" : "max-h-24 overflow-hidden"}`}
                  >
                    {product.attributes.map((attr) => (
                      <div
                        key={`${product.id}-${attr.attributeName}-${attr.attributeValueName}`}
                        className="bg-gray-50 p-2 rounded-lg"
                      >
                        <div className="font-medium text-gray-700 truncate">
                          {attr.attributeName}
                        </div>
                        <div className="text-gray-900 truncate">
                          {attr.attributeValueName}
                        </div>
                      </div>
                    ))}
                  </div>
                  {product.attributes.length > 4 && (
                    <button
                      onClick={() => setShowAllAttrs(!showAllAttrs)}
                      className="text-xs text-blue-600 hover:text-blue-800 mt-2 font-medium flex items-center"
                    >
                      {showAllAttrs ? (
                        <>
                          <span>Скрыть</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>
                            Показать все ({product.attributes.length})
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Блок кнопок */}
          <div
            className={
              view === "grid"
                ? "p-4 border-t border-gray-100"
                : "p-4 flex-shrink-0 flex flex-col justify-center border-l border-gray-100"
            }
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 mb-3 px-4 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg py-3 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Заказать бесплатный расчет
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={adding || product.stock === 0}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                adding
                  ? "bg-gray-400"
                  : product.stock > 0
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {adding ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Добавление...
                </div>
              ) : (
                "В корзину"
              )}
            </Button>
          </div>
        </div>
      </li>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="sm:max-w-[425px] bg-white text-2xl p-8 text-gray-600"
          data-testid="dialog-content"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-6 text-gray-600">
              Заказать бесплатный расчет
            </DialogTitle>
            <DialogDescription className="text-xl mb-6 text-gray-600">
              Заполните форму, чтобы заказать расчет для
              <span className="font-bold"> {product.name}.</span>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                placeholder="Ваше имя"
                {...register("name", { required: "Имя обязательно" })}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                placeholder="+7 (XXX) XXX-XX-XX"
                {...register("phone", {
                  required: "Телефон обязателен",
                  pattern: {
                    value: /^\+?\d{10,15}$/,
                    message: "Неверный формат телефона",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="example@email.com"
                type="email"
                {...register("email", {
                  required: "Email обязателен",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Неверный формат email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Комментарий</Label>
              <Textarea
                id="comment"
                placeholder="Ваши пожелания или вопросы"
                {...register("comment")}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Отмена
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Отправить"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

CardItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    article: PropTypes.string,
    basePrice: PropTypes.number.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    stock: PropTypes.number.isRequired,
    variations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        sku: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        variationValue: PropTypes.string.isRequired,
        isDefault: PropTypes.bool.isRequired,
      })
    ).isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      })
    ),
    attributes: PropTypes.arrayOf(
      PropTypes.shape({
        attributeName: PropTypes.string.isRequired,
        attributeValueName: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  view: PropTypes.oneOf(["grid", "list"]).isRequired,
};
