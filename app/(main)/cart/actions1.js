"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Обновляет количество товара в корзине
 */
export async function updateCartItemQuantity(cartItemId, quantity) {
  //   console.log("Updating item:", cartItemId, "with quantity:", quantity);
  try {
    const parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      throw new Error("Количество должно быть числом больше 0");
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: parsedQuantity },
    });

    // Перерендерим страницу корзины
    revalidatePath("/cart");

    return { success: true, data: updatedItem };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Удаляет товар из корзины
 */
export async function deleteCartItem(cartItemId) {
  try {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    // Перерендерим страницу корзины
    revalidatePath("/cart");

    return { success: true };
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Очищает корзину (удаляет все элементы)
 */
export async function clearCart(cartToken) {
  try {
    await prisma.cartItem.deleteMany({
      where: {
        cart: {
          token: cartToken,
        },
      },
    });

    // Перерендерим страницу корзины
    revalidatePath("/cart");

    return { success: true };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { success: false, error: error.message };
  }
}
