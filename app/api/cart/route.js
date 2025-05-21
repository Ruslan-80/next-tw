// app/api/cart/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
    // Читаем токен корзины из HTTP-куки
    const token = req.cookies.get("cartToken") || "default-cart-token";

    // Ищем корзину с вложенными записями: CartItem -> ProductVariation -> Product
    const cartData = await prisma.cart.findUnique({
        where: { token },
        include: {
            items: {
                include: {
                    productItem: {
                        include: { product: true },
                    },
                },
            },
        },
    });

    // Если корзины нет — возвращаем пустую структуру
    if (!cartData) {
        return NextResponse.json({ token, items: [] });
    }

    // Трансформируем CartItem[] в удобный для клиента формат
    const items = cartData.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        product: {
            id: item.productItem.product.id,
            name: item.productItem.product.name,
            article: item.productItem.sku,
            basePrice: item.productItem.price,
        },
    }));

    // Возвращаем токен и список товаров
    return NextResponse.json({ token: cartData.token, items });
}

export async function POST(req) {
    // Читаем токен из куки (должен быть установлен middleware)
    const token = req.cookies.get("cartToken") || "default-cart-token";
    const { productId, quantity = 1 } = await req.json();

    // Ищем или создаём корзину
    let cart = await prisma.cart.findUnique({ where: { token } });
    if (!cart) {
        cart = await prisma.cart.create({ data: { token, totalAmount: 0 } });
    }

    // Получаем или создаём дефолтную вариацию для товара
    let variation = await prisma.productVariation.findFirst({
        where: { productId },
    });
    if (!variation) {
        // Берём данные из Product
        const prod = await prisma.product.findUnique({
            where: { id: productId },
        });
        variation = await prisma.productVariation.create({
            data: {
                productId,
                sku: prod.article,
                variationValue: "Default",
                price: prod.basePrice,
                stock: prod.stock,
                isDefault: true,
            },
        });
    }

    // Проверяем, есть ли этот товар в корзине
    const existing = await prisma.cartItem.findFirst({
        where: { productItemId: variation.id, cartId: cart.id },
    });

    // Обновляем или создаём запись
    if (existing) {
        await prisma.cartItem.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + quantity },
        });
    } else {
        await prisma.cartItem.create({
            data: {
                quantity,
                cart: { connect: { id: cart.id } },
                productItem: { connect: { id: variation.id } },
            },
        });
    }

    return NextResponse.json({ success: true });
}
