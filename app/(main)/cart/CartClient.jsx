"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useOptimistic } from "react";
import { useState } from "react";
import { updateCartItemQuantity, deleteCartItem, clearCart } from "./actions";
import { IMaskInput } from "react-imask";
import { useCartStore } from "../../../lib/store/testCartStore";
import { useRouter } from "next/navigation";

export default function CartClient({ cartData, items, item }) {
  // Состояние для валидации телефона
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [agreed, setAgreed] = useState(false); // Состояние согласия на обработку ПД
  const [orderStatus, setOrderStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [orderError, setOrderError] = useState("");
  const { setCart } = useCartStore();
  const router = useRouter();

  // Вычисляем итоговую сумму
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.basePrice * item.quantity,
    0,
    0,
  );

  // Валидация телефона
  const validatePhone = (value) => {
    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError("Введите телефон в формате +7 (XXX) XXX-XX-XX");
      return false;
    }
    setPhoneError("");
    return true;
  };

  // Обработка отправки формы
  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      return;
    }

    if (!agreed) {
      setOrderError("Необходимо согласие на обработку персональных данных.");
      return;
    }

    const formData = new FormData(e.target);
    const data = {
      cartToken: formData.get("cartToken"),
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      comment: formData.get("comment"),
    };

    setOrderStatus("loading");
    setOrderError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Ошибка при оформлении заказа");
      }

      setOrderStatus("success");
      setCart({ count: 0, total: 0 });
      // Перенаправляем на страницу успеха или обновляем страницу
      router.refresh();
    } catch (error) {
      setOrderStatus("error");
      setOrderError(error.message);
    }
  };

  // Действие очистки корзины
  const [clearState, clearAction] = useActionState(
    async () => {
      try {
        const result = await clearCart(cartData.token);
        if (result.success) {
          setCart({ count: result.count, total: result.total });
        }
        return result;
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    { success: true },
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-textForeground mb-8">Корзина</h1>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-background rounded-lg shadow-sm">
          <p className="text-lg text-gray-500 mb-4">Корзина пуста</p>
          <Link
            href="/catalog"
            className="inline-block bg-orange-400 text-background py-2 px-6 rounded-md hover:bg-orange-500 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <>
          {/* Кнопка очистки корзины */}
          <div className="flex justify-end mb-4">
            <form action={clearAction}>
              <button
                type="submit"
                className="text-red-500 hover:text-red-600 transition-colors flex items-center space-x-2"
                disabled={clearState.pending}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16"
                  />
                </svg>
                <span>Очистить корзину</span>
              </button>
              {clearState.success === false && (
                <p className="text-red-500 text-sm mt-1">
                  Ошибка: {clearState.error}
                </p>
              )}
            </form>
          </div>

          {/* Таблица товаров */}
          <div className="bg-background rounded-lg shadow-sm mb-8">
            <div className="hidden md:grid md:grid-cols-6 gap-4 p-4 bg-card/80 rounded-t-lg font-medium text-textForeground">
              <div className="col-span-1">Изображение</div>
              <div className="col-span-2">Товар</div>
              <div className="col-span-1">Цена</div>
              <div className="col-span-1">Количество</div>
              <div className="col-span-1">Действия</div>
            </div>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Форма заказа */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Итоговая сумма с акцентом */}
            <div className="bg-background rounded-lg shadow-sm p-6 flex-1 max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-textForeground">Итого</h2>
                <p className="text-2xl font-bold text-accent">
                  {totalPrice.toLocaleString("ru-RU")} ₽
                </p>
              </div>
              <p className="text-sm text-textForeground mb-6">
                Цены указаны с учетом НДС и стоимости доставки по г. Москве или
                до Транспортной компании
              </p>
              <div className="bg-background p-4 rounded-md mb-6">
                <p className="text-textForeground text-sm">
                  После оформления заказа с вами свяжется менеджер для
                  подтверждения
                </p>
              </div>
            </div>

            {/* Форма */}
            <form
              onSubmit={handleOrderSubmit}
              className="bg-background rounded-lg shadow-sm p-6 flex-1 max-w-lg"
            >
              <h2 className="text-xl font-bold text-textForeground mb-6">
                Контактные данные
              </h2>
              <input type="hidden" name="cartToken" value={cartData.token} />
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-textForeground mb-2"
                  >
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-400 focus:border-orange-400"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-textForeground mb-2"
                  >
                    Телефон
                  </label>
                  <IMaskInput
                    mask="+7 (000) 000-00-00"
                    value={phone}
                    onAccept={(value) => {
                      setPhone(value);
                      validatePhone(value);
                    }}
                    className={`block w-full border ${
                      phoneError ? "border-red-500" : "border-gray-300"
                    } rounded-lg p-3 focus:ring-orange-400 focus:border-orange-400`}
                    placeholder="+7 (XXX) XXX-XX-XX"
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-textForeground mb-2"
                  >
                    Комментарий к заказу
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-400 focus:border-orange-400"
                    placeholder="Особенности доставки, пожелания и т.д."
                  />
                </div>

                {/* Блок согласия 152-ФЗ */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="cartPrivacy"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400 cursor-pointer"
                  />
                  <label
                    htmlFor="cartPrivacy"
                    className="text-xs text-textForeground cursor-pointer leading-tight"
                  >
                    Даю согласие на{" "}
                    <a
                      href="/privacy" // Укажите актуальную ссылку на политику
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-orange-500 hover:text-orange-600"
                    >
                      обработку персональных данных
                    </a>{" "}
                    в соответствии с ФЗ №152.
                  </label>
                </div>

                <button
                  type="submit"
                  className={`w-full btn-gold ${
                    !agreed || phoneError || orderStatus === "loading"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={!agreed || phoneError || orderStatus === "loading"}
                >
                  {orderStatus === "loading"
                    ? "Оформляем..."
                    : "Оформить заказ"}
                </button>
                {orderStatus === "success" && (
                  <p className="text-green-600 text-sm mt-2">
                    ✅ Заказ успешно оформлен! Менеджер свяжется с вами.
                  </p>
                )}
                {orderStatus === "error" && (
                  <p className="text-red-500 text-sm mt-2">❌ {orderError}</p>
                )}
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

// Компонент для отдельного товара в корзине
function CartItem({ item }) {
  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
    item.quantity,
  );
  const { setCart } = useCartStore();

  const [quantityState, quantityAction, quantityPending] = useActionState(
    async (_, formData) => {
      const action = formData.get("action");
      let quantity = Number(formData.get("quantity"));
      if (action === "increase") {
        quantity += 1;
      } else if (action === "decrease") {
        quantity -= 1;
      }
      setOptimisticQuantity(quantity);
      try {
        const result = await updateCartItemQuantity(item.id, quantity);
        if (result.success) {
          setCart({ count: result.count, total: result.total }); // 🔥 обновляем zustand
        }
        return result;
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    { success: true },
  );

  const [deleteState, deleteAction, deletePending] = useActionState(
    async () => {
      try {
        const result = await deleteCartItem(item.id);
        if (result.success) {
          setCart({ count: result.count, total: result.total }); // 🔥 обновляем zustand
        }
        return result;
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    { success: true },
  );

  return (
    <div className="flex flex-col md:grid md:grid-cols-6 gap-4 p-4 border-b border-accent/50 last:border-b-0">
      {/* Верхняя часть (мобильная) */}
      <div className="flex items-center justify-between md:hidden">
        {/* Изображение и название */}
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 flex-shrink-0">
            {item.product.mediaFiles?.[0]?.url ? (
              <div className="relative w-full h-full">
                <Image
                  src={item.product.mediaFiles[0].url}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-background rounded-md flex items-center justify-center">
                <span className="text-text text-xs">Нет фото</span>
              </div>
            )}
          </div>
          <div>
            <Link
              href={`/product/${item.product.slug}`}
              className="font-medium text-text hover:text-orange-400 transition-colors line-clamp-2"
            >
              {item.product.name}
            </Link>
          </div>
        </div>

        {/* Цена */}
        <div className="text-right">
          <p className="text-textForeground font-medium">
            {(item.product.basePrice * optimisticQuantity).toLocaleString(
              "ru-RU",
            )}{" "}
            ₽
          </p>
          <p className="text-sm text-textForeground">
            {item.product.basePrice.toLocaleString("ru-RU")} ₽ / шт.
          </p>
        </div>
      </div>

      {/* Нижняя часть (мобильная) */}
      <div className="flex items-center justify-between md:hidden mt-2">
        {/* Количество */}
        <form action={quantityAction} className="flex items-center space-x-2">
          <button
            type="submit"
            name="action"
            value="decrease"
            disabled={optimisticQuantity <= 1 || quantityPending}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <input
            type="number"
            name="quantity"
            value={optimisticQuantity}
            min="1"
            readOnly
            className="w-12 text-center border rounded-md p-1"
          />
          <button
            type="submit"
            name="action"
            value="increase"
            disabled={quantityPending}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </form>

        {/* Удаление */}
        <form action={deleteAction}>
          <button
            type="submit"
            className="text-red-500 hover:text-red-600 transition-colors p-2"
            disabled={deletePending}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Десктопная версия */}
      <div className="hidden md:contents">
        {/* Изображение */}
        <div className="col-span-1">
          {item.product.mediaFiles?.[0]?.url ? (
            <div className="relative w-16 h-16">
              <Image
                src={item.product.mediaFiles[0].url}
                alt={item.product.name}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="flex justify-center w-16 h-16 bg-gray-100 rounded-md items-center ">
              <span className="text-gray-400 text-center">Нет фото</span>
            </div>
          )}
        </div>

        {/* Название */}
        <div className="col-span-2 flex items-center">
          <Link
            href={`/product/${item.product.slug}`}
            className="text-text font-medium hover:text-accent transition-colors line-clamp-2"
          >
            {item.product.name}
          </Link>
        </div>

        {/* Цена */}
        <div className="col-span-1 flex flex-col justify-center items-start">
          <p className="text-textForeground">
            {(item.product.basePrice * optimisticQuantity).toLocaleString(
              "ru-RU",
            )}{" "}
            ₽
          </p>
          <p className="text-sm text-gray-500">
            {item.product.basePrice.toLocaleString("ru-RU")} ₽ / шт.
          </p>
        </div>

        {/* Количество */}
        <div className="col-span-1 flex items-center">
          <form action={quantityAction} className="flex items-center space-x-2">
            <button
              type="submit"
              name="action"
              value="decrease"
              disabled={optimisticQuantity <= 1 || quantityPending}
              className="p-1 bg-background rounded-md hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <input
              type="number"
              name="quantity"
              value={optimisticQuantity}
              min="1"
              readOnly
              className="w-12 flex justify-center text-center border rounded-md p-1"
            />
            <button
              type="submit"
              name="action"
              value="increase"
              disabled={quantityPending}
              className="p-1 bg-background rounded-md hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            {/* {quantityPending && (
              <span className="ml-2 text-gray-500">Обновление...</span>
            )} */}
          </form>
          {quantityState.success === false && (
            <p className="text-red-500 text-sm mt-1">
              Ошибка: {quantityState.error}
            </p>
          )}
        </div>

        {/* Удаление */}
        <div className="col-span-1 flex items-center">
          <form action={deleteAction}>
            <button
              type="submit"
              className="text-red-500 hover:text-red-600 transition-colors"
              disabled={deletePending}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16"
                />
              </svg>
            </button>
            {deletePending && (
              <span className="ml-2 text-gray-500">Удаление...</span>
            )}
          </form>
          {deleteState.success === false && (
            <p className="text-red-500 text-sm mt-1">
              Ошибка: {deleteState.error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
