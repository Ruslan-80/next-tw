"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useOptimistic } from "react";
import { useState } from "react";
import { updateCartItemQuantity, deleteCartItem, clearCart } from "./actions";
import { IMaskInput } from "react-imask";

export default function CartClient({ cartData, items }) {
  // Состояние для валидации телефона
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Вычисляем итоговую сумму
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.basePrice * item.quantity,
    0,
    0
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
  const handleSubmit = (e) => {
    if (!validatePhone(phone)) {
      e.preventDefault();
    }
  };

  // Действие очистки корзины
  const [clearState, clearAction] = useActionState(
    async () => {
      try {
        const result = await clearCart(cartData.token);
        return result;
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    { success: true }
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Корзина</h1>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-lg text-gray-500 mb-4">Корзина пуста</p>
          <Link
            href="/catalog"
            className="inline-block bg-orange-400 text-white py-2 px-6 rounded-md hover:bg-orange-500 transition-colors"
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
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="hidden md:grid md:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-t-lg font-medium text-gray-700">
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
            <div className="bg-white rounded-lg shadow-sm p-6 flex-1 max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Итого</h2>
                <p className="text-2xl font-bold text-orange-500">
                  {totalPrice.toLocaleString("ru-RU")} ₽
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Цены указаны с учетом НДС и стоимости доставки
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="text-gray-600 text-sm">
                  После оформления заказа с вами свяжется менеджер для
                  подтверждения
                </p>
              </div>
            </div>

            {/* Форма */}
            <form
              action="/api/order/create"
              method="POST"
              className="bg-white rounded-lg shadow-sm p-6 flex-1 max-w-lg"
              onSubmit={handleSubmit}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Контактные данные
              </h2>
              <input type="hidden" name="cartToken" value={cartData.token} />
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                <button
                  type="submit"
                  className="w-full bg-orange-400 text-white py-3 px-4 rounded-lg hover:bg-orange-500 transition-colors focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={phoneError}
                >
                  Оформить заказ
                </button>
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
    item.quantity
  );

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
        return result;
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    { success: true }
  );

  const [deleteState, deleteAction, deletePending] = useActionState(
    async () => {
      try {
        const result = await deleteCartItem(item.id);
        return result;
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    { success: true }
  );

  return (
    <div className="flex flex-col md:grid md:grid-cols-6 gap-4 p-4 border-b last:border-b-0">
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
              <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-400 text-xs">Нет фото</span>
              </div>
            )}
          </div>
          <div>
            <Link
              href={`/product/${item.product.slug}`}
              className="font-medium hover:text-orange-400 transition-colors line-clamp-2"
            >
              {item.product.name}
            </Link>
          </div>
        </div>

        {/* Цена */}
        <div className="text-right">
          <p className="text-gray-900 font-medium">
            {(item.product.basePrice * optimisticQuantity).toLocaleString(
              "ru-RU"
            )}{" "}
            ₽
          </p>
          <p className="text-sm text-gray-500">
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
        <div className="col-span-2">
          <Link
            href={`/product/${item.product.slug}`}
            className="text-gray-900 font-medium hover:text-orange-400 transition-colors line-clamp-2"
          >
            {item.product.name}
          </Link>
        </div>

        {/* Цена */}
        <div className="col-span-1">
          <p className="text-gray-900">
            {(item.product.basePrice * optimisticQuantity).toLocaleString(
              "ru-RU"
            )}{" "}
            ₽
          </p>
          <p className="text-sm text-gray-500">
            {item.product.basePrice.toLocaleString("ru-RU")} ₽ / шт.
          </p>
        </div>

        {/* Количество */}
        <div className="col-span-1">
          <form action={quantityAction} className="flex items-center space-x-2">
            <button
              type="submit"
              name="action"
              value="decrease"
              disabled={optimisticQuantity <= 1 || quantityPending}
              className="p-1 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="p-1 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
            {quantityPending && (
              <span className="ml-2 text-gray-500">Обновление...</span>
            )}
          </form>
          {quantityState.success === false && (
            <p className="text-red-500 text-sm mt-1">
              Ошибка: {quantityState.error}
            </p>
          )}
        </div>

        {/* Удаление */}
        <div className="col-span-1">
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
