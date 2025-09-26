// app/api/cart/add/route.js
import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const token = req.cookies.get("cartToken")?.value || "default-cart-token";
  const { productId, quantity = 1 } = await req.json();

  if (!productId) {
    return NextResponse.json(
      { error: "productId is required" },
      { status: 400 }
    );
  }

  // Находим или создаём корзину
  let cart = await prisma.cart.findUnique({ where: { token } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { token, totalAmount: 0 } });
  }

  // Находим или создаём вариацию
  let variation = await prisma.productVariation.findFirst({
    where: { productId },
  });
  if (!variation) {
    const prod = await prisma.product.findUnique({ where: { id: productId } });
    if (!prod) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
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

  // Добавляем/обновляем cartItem
  const existingItem = await prisma.cartItem.findFirst({
    where: { productItemId: variation.id, cartId: cart.id },
  });

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

  // 🔹 Считаем количество и сумму
  const cartItems = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { productItem: { include: { product: true } } },
  });

  const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.productItem.price,
    0
  );

  return NextResponse.json({ success: true, count, total });
}
