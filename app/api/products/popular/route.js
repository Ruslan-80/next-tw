import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        description: { not: null },
        // Добавляем условие для популярных товаров, например, по количеству заказов
        // orderItems: {
        //   some: {},
        // },
      },
      // take: 8, // Ограничим до 8 популярных товаров
      // orderBy: {
      //   orderItems: {
      //     _count: "desc", // Сортировка по количеству заказов
      //   },
      // },
      include: {
        attributes: {
          include: {
            attribute: true,
          },
        },
        mediaFiles: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
