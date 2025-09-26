// app/api/cart/add/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    // 1) Получаем токен корзины из куки
    const token = req.cookies.get("cartToken")?.value || "default-cart-token";

    // 2) Читаем тело запроса
    const { productId, quantity = 1 } = await req.json();
    if (!productId) {
        return NextResponse.json(
            { error: "productId is required" },
            { status: 400 }
        );
    }

    // 3) Находим или создаём корзину
    let cart = await prisma.cart.findUnique({ where: { token } });
    if (!cart) {
        cart = await prisma.cart.create({ data: { token, totalAmount: 0 } });
    }

    // 4) Находим или создаём дефолтную вариацию товара
    let variation = await prisma.productVariation.findFirst({
        where: { productId },
    });
    if (!variation) {
        // Берём основные данные товара
        const prod = await prisma.product.findUnique({
            where: { id: productId },
        });
        if (!prod) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }
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

    // 5) Проверяем наличие CartItem
    const existingItem = await prisma.cartItem.findFirst({
        where: { productItemId: variation.id, cartId: cart.id },
    });

    // 6) Обновляем или создаём новый CartItem
    if (existingItem) {
        await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
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

    // 7) Возвращаем успех
    return NextResponse.json({ success: true });
}
