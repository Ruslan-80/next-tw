"use client";

import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { useForm } from "react-hook-form";
import { Skeleton } from "../../components/ui/skeleton";
import { useCartStore } from "../../lib/store/testCartStore";

import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

export default function CardItem({ product, view }) {
  const [adding, setAdding] = useState(false);
  const [showAllAttrs, setShowAllAttrs] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const { toggleFavorite, favorites } = useFavorites();
  const { setCart } = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setIsFavorite(favorites.some((item) => item.id === product.id));
  }, [favorites, product.id]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

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
      console.log("Added to cart:", data);

      setCart({ count: data.count, total: data.total }); // ⬅ обновляем zustand
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
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
            ? "border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 bg-white overflow-hidden transform hover:-translate-y-1  dark:bg-gray-800 dark:text-white"
            : "border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 bg-white flex flex-col md:flex-row  dark:bg-gray-800 dark:text-white"
        }
        itemScope
        itemType="https://schema.org/Product"
      >
        <Link
          href={`/product/${product.slug}`}
          className="block flex-1"
          itemProp="url"
        >
          <div
            className={
              view === "grid"
                ? "flex flex-col h-full  dark:bg-gray-800 dark:text-white"
                : "flex flex-col items-center md:flex-row h-full  dark:bg-gray-800 dark:text-white"
            }
          >
            {product.image && (
              <div
                className={
                  view === "grid"
                    ? "relative w-full aspect-square max-h-48 p-2  dark:bg-gray-800 dark:text-white"
                    : "relative w-full max-h-80 md:w-48 md:h-48 aspect-square p-2  dark:bg-gray-800 dark:text-white"
                }
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    itemProp="image"
                    className="object-contain rounded-lg transition-transform duration-300 hover:scale-105 p-4  dark:bg-gray-800 dark:text-white"
                    sizes={
                      (view || "grid") === "grid"
                        ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        : "(max-width: 768px) 100vw, 192px"
                    }
                  />
                ) : (
                  <Skeleton className="w-full h-full rounded-lg" />
                )}
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
                      ? "h-[140px] text-xl font-semibold text-gray-900 mb-2 group relative  dark:bg-gray-800 dark:text-white"
                      : "text-2xl font-semibold text-gray-900 mb-2 group relative  dark:bg-gray-800 dark:text-white"
                  }
                >
                  <span itemProp="name">{product.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500/30 transition-all duration-300 group-hover:w-full  dark:bg-gray-800 dark:text-white" />
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  Артикул:{" "}
                  <span itemProp="sku">{product.article || "N/A"}</span> <br />
                  ID: <span itemProp="productID">{product.id || "N/A"}</span>
                </p>

                {product.description && (
                  <p
                    className={
                      view === "grid"
                        ? "text-sm text-gray-600 mb-3 line-clamp-2  dark:bg-gray-800 dark:text-white"
                        : "text-sm text-gray-600 mb-3  dark:bg-gray-800 dark:text-white"
                    }
                    itemProp="description"
                  >
                    {product.description}
                  </p>
                )}
                {/* Бренд */}
                <div
                  itemProp="brand"
                  itemScope
                  itemType="https://schema.org/Brand"
                >
                  <meta itemProp="name" content="Electroshit-PRO" />
                </div>
                {/* AggregateRating */}
                <div
                  itemProp="aggregateRating"
                  itemScope
                  itemType="https://schema.org/AggregateRating"
                >
                  <meta itemProp="ratingValue" content="4.5" />
                  <meta itemProp="reviewCount" content="25" />
                </div>
                {/* Цена и оффер */}
                <div
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                  className="mb-3"
                >
                  <p className="text-lg font-bold text-gray-900 mb-3 dark:bg-gray-800 dark:text-white">
                    {product.basePrice == 0
                      ? "По запросу"
                      : `${product.basePrice.toLocaleString("ru-RU")} ₽`}
                  </p>
                  {/* Микроразметка оффера */}
                  <meta
                    itemProp="price"
                    content={
                      product.basePrice ? product.basePrice.toFixed(2) : "0.00"
                    }
                  />
                  <meta itemProp="priceCurrency" content="RUB" />
                  <link
                    itemProp="availability"
                    href={
                      product.stock > 0
                        ? "http://schema.org/InStock"
                        : "http://schema.org/PreOrder"
                    }
                  />
                </div>
                {/* Статус наличия */}
                <p
                  className={`text-sm mb-3 ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0
                    ? "В наличии"
                    : "Срок изготовления 7-14 дней"}
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
                            itemProp="additionalProperty"
                            itemScope
                            itemType="https://schema.org/PropertyValue"
                            className="flex"
                          >
                            <meta
                              itemProp="name"
                              content={attr.attributeName}
                            />
                            <meta
                              itemProp="value"
                              content={attr.attributeValueName}
                            />
                            <span className="font-medium dark:bg-gray-800 dark:text-white">
                              {attr.attributeName}:
                            </span>
                            <span className="ml-1 dark:bg-gray-800 dark:text-white">
                              {attr.attributeValueName}
                            </span>
                          </div>
                        ))}
                      </div>
                      {product.attributes.length > 3 && !showAllAttrs && (
                        <div className="absolute bottom-0 left-0 right-0 h-6 " />
                      )}
                      {/* {product.attributes.length > 3 && (
                        <button
                          onClick={() => setShowAllAttrs(!showAllAttrs)}
                          className="text-xs text-gray-500 hover:text-gray-700 mt-1"
                        >
                          {showAllAttrs
                            ? "Скрыть"
                            : `Показать все (${product.attributes.length})`}
                        </button>
                      )} */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div
          className={
            view === "grid"
              ? "p-4"
              : "p-4 flex-shrink-0 flex flex-col justify-center "
          }
        >
          {/* <Button
            onClick={() => toggleFavorite(product)}
            className={isFavorite ? "bg-gray-200" : ""}
          >
            {isFavorite ? "Удалить из избранного" : "В избранное"}
          </Button> */}
          <Button
            onClick={() => handleButtonClick("Расчитать индивидуальный размер")}
            className="w-full bg-blue-500 mb-2 px-4 hover:bg-blue-600 text-white font-medium rounded-lg py-2 transition-all duration-300  dark:bg-gray-500 dark:text-white"
          >
            Расчитать индивидуальный размер
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={adding || product.basePrice === 0}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-all duration-300 mb-2 ${
              adding
                ? "bg-orange-400 opacity-50"
                : product.basePrice > 0
                ? "bg-orange-400/80 hover:bg-orange-400"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {adding ? "Добавление..." : "В корзину"}
          </Button>
        </div>
      </li>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialContent={modalContent}
        onSubmit={handleFormSubmit}
        submitError={error}
      />
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
