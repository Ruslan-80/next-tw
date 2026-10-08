import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/reviews?productId=123
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "productId обязателен" },
        { status: 400 },
      );
    }

    const reviews = await prisma.review.findMany({
      where: {
        productId: Number(productId),
        isApproved: true, // Загружаем только одобренные отзывы
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error);
    return NextResponse.json(
      { error: "Не удалось получить отзывы" },
      { status: 500 },
    );
  }
}

// POST /api/reviews
export async function POST(request) {
  try {
    const body = await request.json();
    const { productId, authorName, rating, comment } = body;

    if (!productId || !authorName || !rating || !comment) {
      return NextResponse.json(
        { error: "Заполните все обязательные поля" },
        { status: 400 },
      );
    }

    const parsedProductId = Number(productId);
    const parsedRating = Number(rating);

    // 1. Создаем новый отзыв в БД
    const newReview = await prisma.review.create({
      data: {
        productId: parsedProductId,
        userName: authorName,
        rating: parsedRating,
        text: comment,
        isApproved: true, // По умолчанию true (или false, если нужна предварительная модерация)
      },
    });

    // 2. Агрегируем и обновляем денормализованный рейтинг в Product
    const aggregate = await prisma.review.aggregate({
      where: {
        productId: parsedProductId,
        isApproved: true,
      },
      _avg: {
        rating: true,
      },
      _count: {
        id: true,
      },
    });

    await prisma.product.update({
      where: { id: parsedProductId },
      data: {
        rating: aggregate._avg.rating || 0.0,
        reviewsCount: aggregate._count.id || 0,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании отзыва:", error);
    return NextResponse.json(
      { error: "Ошибка при сохранении отзыва" },
      { status: 500 },
    );
  }
}
