import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import CartClient from "./CartClient";

export default async function CartPage() {
    // Получаем куки асинхронно
    const cookieStore = await cookies();
    const token = cookieStore.get("cartToken")?.value || "default-cart-token";

    // Получаем корзину из БД вместе с вариациями и продуктами
    const cartData = await prisma.cart.findUnique({
        where: { token },
        include: {
            items: {
                include: {
                    productItem: {
                        include: {
                            product: {
                                include: {
                                    mediaFiles: true, // Загружаем изображения
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    // Если корзина пустая или не найдена
    if (!cartData || cartData.items.length === 0) {
        return <CartClient cartData={{ token }} items={[]} />;
    }

    // Преобразуем данные в удобный для рендера формат
    const items = cartData.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        product: {
            id: item.productItem.product.id,
            name: item.productItem.product.name,
            slug: item.productItem.product.slug,
            basePrice: item.productItem.price,
            mediaFiles: item.productItem.product.mediaFiles,
        },
    }));

    return <CartClient cartData={cartData} items={items} />;
}
