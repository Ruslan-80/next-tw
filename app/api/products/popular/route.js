import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const { categorySlug } = await request.json();

    // Получаем категорию с дочерними (вложенность сразу разворачивается)
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
      include: {
        children: {
          include: {
            children: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Рекурсивно собираем все ID категорий
    const collectIds = (cats, ids = []) => {
      for (const cat of cats) {
        ids.push(cat.id);
        if (cat.children?.length) collectIds(cat.children, ids);
      }
      return ids;
    };

    const categoryIds = [category.id, ...collectIds(category.children || [])];

    // Получаем товары одной выборкой
    const products = await prisma.product.findMany({
      where: { categoryId: { in: categoryIds } },
      include: {
        attributes: { include: { attribute: true } },
        mediaFiles: true,
        tags: { include: { tag: true } },
      },
    });

    // Быстрая выборка случайных товаров (если товаров много)
    const randomProducts = products
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(products.length, 8));

    return NextResponse.json(randomProducts);
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
