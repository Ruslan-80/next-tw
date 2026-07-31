import { prisma } from "@/lib/prisma";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Некорректный формат запроса" },
      { status: 400 },
    );
  }

  const { cartToken, fullName, phone, comment } = body;

  if (!cartToken || !fullName || !phone) {
    return Response.json(
      { error: "Заполните обязательные поля: имя и телефон" },
      { status: 400 },
    );
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { token: cartToken },
      include: {
        items: {
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return Response.json({ error: "Корзина пуста" }, { status: 400 });
    }

    // Считаем итоговую сумму
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.productItem.price * item.quantity,
      0,
    );

    // Формируем данные о товарах для сохранения в заказе
    const orderItems = cart.items.map((item) => ({
      productId: item.productItem.productId,
      name: item.productItem.product.name,
      price: item.productItem.price,
      quantity: item.quantity,
      sku: item.productItem.sku,
    }));

    const order = await prisma.order.create({
      data: {
        token: `order-${Date.now()}`,
        totalAmount,
        fullName,
        phone,
        email: "",
        address: "",
        comment: comment || "",
        items: orderItems,
        customerInfo: { fullName, phone, comment: comment || "" },
        status: "PENDING",
      },
    });

    // Очищаем корзину после оформления заказа
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return Response.json(order);
  } catch (error) {
    console.error("Ошибка создания заказа:", error);
    return Response.json(
      { error: "Ошибка при создании заказа" },
      { status: 500 },
    );
  }
}
