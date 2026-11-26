"use client";

import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { Skeleton } from "../../components/ui/skeleton";
import { useCartStore } from "../../lib/store/testCartStore";
import Markdown from "react-markdown";
import RatingDisplay from "@/components/RatingDisplay";

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
            ? "border border-border text-text rounded-xl shadow-md hover:shadow-xl transition-all duration-300  overflow-hidden transform hover:-translate-y-1"
            : "border border-border text-text rounded-xl shadow-md hover:shadow-xl hover:border-accent/30 transition-all duration-300  flex flex-col md:flex-row"
        }
      >
        <Link href={`/product/${product.slug}`} className="block flex-1">
          <div
            className={
              view === "grid"
                ? "flex flex-col h-full text-text"
                : "flex flex-col items-center md:flex-row h-full text-text"
            }
          >
            {product.image && (
              <div
                className={
                  view === "grid"
                    ? "relative w-full aspect-square max-h-48 p-2 text-text"
                    : "relative w-full max-h-80 md:w-48 md:h-48 aspect-square p-2 text-text"
                }
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    preload={true}
                    className="object-contain rounded-lg transition-transform duration-300 hover:scale-105 p-4 text-text"
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
                      ? "max-h-[140px] min-h-[140px] text-xl font-semibold text-text mb-2 group relative text-text"
                      : "text-2xl font-semibold text-text mb-2 group relative text-text"
                  }
                >
                  <span>{product.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent/30 transition-all duration-300 group-hover:w-full text-text" />
                </h4>
                <RatingDisplay
                  ratingValue={product.rating}
                  ratingCount={product.reviewsCount}
                />
                <p className="text-sm text-text mb-2">
                  Артикул: <span>{product.article || "N/A"}</span> <br />
                  ID: <span>{product.id || "N/A"}</span>
                </p>

                {/* {product.description && (
                  <p
                    className={
                      view === "grid"
                        ? "text-sm text-text mb-3 line-clamp-2 text-text"
                        : "text-sm text-text mb-3 line-clamp-4 text-text"
                    }
                  >
                    {product.description}
                  </p>
                )} */}
                {product.description && (
                  <div
                    className={`markdown-content text-sm text-text mb-3 leading-relaxed space-y-3 ${
                      view === "grid" ? "line-clamp-2" : "line-clamp-4"
                    } [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-4 [&_a]:text-primary [&_a]:underline`}
                  >
                    <Markdown>{product.description}</Markdown>
                  </div>
                )}
                {/* Цена */}
                <div className="mb-3">
                  <p className="text-lg font-bold text-text mb-3 text-text">
                    {product.basePrice == 0
                      ? "По запросу"
                      : `${product.basePrice.toLocaleString("ru-RU")} ₽`}
                  </p>
                </div>
                {/* Статус наличия */}
                <p
                  className={`text-sm mb-3 ${
                    product.stock > 0 ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {product.stock > 0
                    ? "В наличии"
                    : "Срок изготовления 7 - 14 дней"}
                </p>

                {product.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.slug}
                        className="text-xs font-medium text-text px-2 py-1 rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
                <div
                  className={
                    view === "grid"
                      ? "flex flex-wrap gap-2 text-sm text-text"
                      : "grid grid-cols-2 gap-2 text-sm text-text md:pr-4"
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
                            <span className="font-medium text-text">
                              {attr.attributeName}:
                            </span>
                            <span className="ml-1 text-text">
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
              ? "p-4 text-black"
              : "p-4 flex-shrink-0 flex flex-col justify-center text-black"
          }
        >
          {/* <Button
            onClick={() => toggleFavorite(product)}
            className={isFavorite ? "bg-gray-200" : ""}
          >
            {isFavorite ? "Удалить из избранного" : "В избранное"}
          </Button> */}
          <Button
            onClick={() =>
              handleButtonClick(
                `Запросить индивидуальный расчет: ${product.name}`
              )
            }
            className="w-full bg-primary mb-2 px-4 text-accent font-medium rounded-lg py-2 transition-all duration-300"
          >
            Запросить индивидуальный расчет
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={adding || product.basePrice === 0}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 mb-2 ${
              adding
                ? "bg-orange-400 opacity-50"
                : product.basePrice > 0
                ? "btn-gold w-full mb-2"
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
