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
            ? "border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 bg-white overflow-hidden transform hover:-translate-y-1"
            : "border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 bg-white flex flex-col md:flex-row"
        }
      >
        <Link href={`/product/${product.slug}`} className="block flex-1">
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
                    ? "relative w-full aspect-square max-h-48 p-2"
                    : "relative w-full max-h-80 md:w-48 md:h-48 aspect-square p-2"
                }
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain rounded-lg transition-transform duration-300 hover:scale-105 p-4"
                  sizes={
                    view === "grid"
                      ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      : "(max-width: 768px) 100vw, 192px"
                  }
                />
              </div>
            )}
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
                      ? "h-[140px] text-xl font-semibold text-gray-900 mb-2 group relative"
                      : "text-2xl font-semibold text-gray-900 mb-2 group relative"
                  }
                >
                  {product.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500/30 transition-all duration-300 group-hover:w-full" />
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  Артикул: {product.article || "N/A"}
                </p>
                {product.description && (
                  <p
                    className={
                      view === "grid"
                        ? "text-sm text-gray-600 mb-3 line-clamp-2"
                        : "text-sm text-gray-600 mb-3"
                    }
                  >
                    {product.description}
                  </p>
                )}
                <p className="text-lg font-bold text-gray-900 mb-3">
                  {product.basePrice == 0
                    ? "По запросу"
                    : `${product.basePrice.toLocaleString("ru-RU")} ₽`}
                </p>
                <p
                  className={`text-sm mb-3 ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0 ? "В наличии" : "Нет в наличии"}
                </p>
                {product.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.slug}
                        className="text-xs font-medium text-white bg-orange-400 px-2 py-1 rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
                <div
                  className={
                    view === "grid"
                      ? "flex flex-wrap gap-2 text-sm text-gray-700"
                      : "grid grid-cols-2 gap-2 text-sm text-gray-700 md:pr-4"
                  }
                >
                  {product.attributes?.length > 0 && (
                    <div className="relative space-y-1 mb-3">
                      <div
                        className={`space-y-1 overflow-hidden ${
                          showAllAttrs ? "" : "max-h-[72px]"
                        }`}
                      >
                        {product.attributes.map((attr) => (
                          <div
                            key={`${product.id}-${attr.attributeName}-${attr.attributeValueName}`}
                            className="flex"
                          >
                            <span className="font-medium">
                              {attr.attributeName}:
                            </span>
                            <span className="ml-1">
                              {attr.attributeValueName}
                            </span>
                          </div>
                        ))}
                      </div>
                      {product.attributes.length > 3 && !showAllAttrs && (
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent" />
                      )}
                      {product.attributes.length > 3 && (
                        <button
                          onClick={() => setShowAllAttrs(!showAllAttrs)}
                          className="text-xs text-gray-500 hover:text-gray-700 mt-1"
                        >
                          {showAllAttrs
                            ? "Скрыть"
                            : `Показать все (${product.attributes.length})`}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div
          className={
            view === "grid" ? "p-4" : "p-4 flex-shrink-0 flex flex-col "
          }
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-500 mb-2 px-4 hover:bg-blue-600 text-white font-medium rounded-lg py-2 transition-all duration-300"
          >
            Заказать бесплатный расчет
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-all duration-300 mb-2 ${
              adding
                ? "bg-orange-400 opacity-50"
                : product.stock > 0
                ? "bg-orange-400 hover:bg-blue-300/30"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {adding ? "Добавление..." : "В корзину"}
          </Button>
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
            <DialogDescription className="text-xl  mb-6 text-gray-600">
              Заполните форму, чтобы заказать расчет для
              <span className="font-bold">{product.name}.</span>
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
