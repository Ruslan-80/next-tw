// /app/api/order/create/route.js
import prisma from "@/lib/prisma";

export async function POST(request) {
    const body = await request.json();
    const { cartToken, fullName, phone, comment } = body;

    const cart = await prisma.cart.findUnique({
        where: { token: cartToken },
        include: { items: true },
    });

    if (!cart || cart.items.length === 0) {
        return Response.json({ error: "Корзина пуста" }, { status: 400 });
    }

    const order = await prisma.order.create({
        data: {
            token: `order-${Date.now()}`,
            fullName,
            phone,
            comment,
            cartId: cart.id,
            status: "PENDING",
        },
    });

    return Response.json(order);
}
