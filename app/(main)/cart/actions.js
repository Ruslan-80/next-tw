"use server";

import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

async function getCartTotals(cartId) {
  const cartItems = await prisma.cartItem.findMany({
    where: { cartId },
    include: { productItem: true },
  });

  const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.productItem.price,
    0
  );

  return { count, total };
}

/**
 * Обновляет количество товара в корзине
 */
export async function updateCartItemQuantity(cartItemId, quantity) {
  try {
    const parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      throw new Error("Количество должно быть числом больше 0");
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: parsedQuantity },
      include: { cart: true },
    });

    const totals = await getCartTotals(updatedItem.cartId);

    revalidatePath("/cart");

    return { success: true, data: updatedItem, ...totals };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteCartItem(cartItemId) {
  try {
    const deletedItem = await prisma.cartItem.delete({
      where: { id: cartItemId },
      include: { cart: true },
    });

    const totals = await getCartTotals(deletedItem.cartId);

    revalidatePath("/cart");

    return { success: true, ...totals };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function clearCart(cartToken) {
  try {
    const cart = await prisma.cart.findUnique({ where: { token: cartToken } });
    if (!cart) return { success: true, count: 0, total: 0 };

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    revalidatePath("/cart");

    return { success: true, count: 0, total: 0 };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
