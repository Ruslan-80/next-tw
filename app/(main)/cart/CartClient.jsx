"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useOptimistic } from "react";
import { useState } from "react";
import { updateCartItemQuantity, deleteCartItem, clearCart } from "./actions";

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
    const validatePhone = value => {
        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(value)) {
            setPhoneError("Введите телефон в формате +7 (XXX) XXX-XX-XX");
            return false;
        }
        setPhoneError("");
        return true;
    };

    // Обработка отправки формы
    const handleSubmit = e => {
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
                        {items.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Итоговая сумма */}
                    <div className="flex justify-end mb-8">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <p className="text-lg font-semibold text-gray-900">
                                Итого: {totalPrice.toLocaleString("ru-RU")} ₽
                            </p>
                        </div>
                    </div>

                    {/* Форма заказа */}
                    <form
                        action="/api/order/create"
                        method="POST"
                        className="bg-white rounded-lg shadow-sm p-6 max-w-lg mx-auto"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="hidden"
                            name="cartToken"
                            value={cartData.token}
                        />
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Имя
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    required
                                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-400 focus:border-orange-400"
                                    placeholder="Введите ваше имя"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Телефон
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={phone}
                                    onChange={e => {
                                        setPhone(e.target.value);
                                        validatePhone(e.target.value);
                                    }}
                                    className={`block w-full border ${
                                        phoneError
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-md p-2 focus:ring-orange-400 focus:border-orange-400`}
                                    placeholder="+7 (XXX) XXX-XX-XX"
                                />
                                {phoneError && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {phoneError}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="comment"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Комментарий
                                </label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    rows={4}
                                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-400 focus:border-orange-400"
                                    placeholder="Дополнительные пожелания"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                                disabled={phoneError}
                            >
                                Отправить заявку
                            </button>
                        </div>
                    </form>
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
            const quantity = Number(formData.get("quantity"));
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
        <div className="grid md:grid-cols-6 gap-4 p-4 border-b last:border-b-0 items-center">
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
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-gray-400">Нет фото</span>
                    </div>
                )}
            </div>

            {/* Название */}
            <div className="col-span-2">
                <Link
                    href={`/product/${item.product.slug}`}
                    className="text-gray-900 font-medium hover:text-orange-400 transition-colors"
                >
                    {item.product.name}
                </Link>
            </div>

            {/* Цена */}
            <div className="col-span-1">
                <p className="text-gray-900">
                    {(
                        item.product.basePrice * optimisticQuantity
                    ).toLocaleString("ru-RU")}{" "}
                    ₽
                </p>
                <p className="text-sm text-gray-500">
                    {item.product.basePrice.toLocaleString("ru-RU")} ₽ / шт.
                </p>
            </div>

            {/* Количество */}
            <div className="col-span-1">
                <form
                    action={quantityAction}
                    className="flex items-center space-x-2"
                >
                    <button
                        type="submit"
                        name="quantity"
                        value={optimisticQuantity - 1}
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
                        name="quantity"
                        value={optimisticQuantity + 1}
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
                        <span className="ml-2 text-gray-500">
                            Обновление...
                        </span>
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
    );
}
