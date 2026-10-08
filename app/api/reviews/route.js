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

    const parsedProductId = Number(productId);
    if (!Number.isInteger(parsedProductId)) {
      return NextResponse.json(
        { error: "productId должен быть числом" },
        { status: 400 },
      );
    }

    const reviews = await prisma.review.findMany({
      where: {
        productId: parsedProductId,
        isApproved: false,
      },
      orderBy: { createdAt: "desc" },
      // Отдаём только то, что нужно фронту
      select: {
        id: true,
        rating: true,
        text: true,
        userName: true,
        images: true,
        adminReply: true,
        adminImages: true,
        adminReplyAt: true,
        createdAt: true,
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

    const parsedProductId = Number(productId);
    const parsedRating = Number(rating);

    if (
      !Number.isInteger(parsedProductId) ||
      typeof authorName !== "string" ||
      !authorName.trim() ||
      !Number.isFinite(parsedRating) ||
      parsedRating < 1 ||
      parsedRating > 5 ||
      typeof comment !== "string" ||
      !comment.trim()
    ) {
      return NextResponse.json(
        { error: "Заполните все обязательные поля корректно" },
        { status: 400 },
      );
    }

    // Проверим, что товар существует
    const product = await prisma.product.findUnique({
      where: { id: parsedProductId },
      select: { id: true },
    });
    if (!product) {
      return NextResponse.json({ error: "Товар не найден" }, { status: 404 });
    }

    const newReview = await prisma.review.create({
      data: {
        productId: parsedProductId,
        userName: authorName.trim(),
        rating: parsedRating,
        text: comment.trim(),
        isApproved: false, // включи модерацию — тогда сообщение в форме честное
        // Если хочешь публиковать сразу — поставь true и убери текст
        // "появится после проверки" из ReviewsTab.
      },
      select: {
        id: true,
        rating: true,
        text: true,
        userName: true,
        adminReply: true,
        adminImages: true,
        adminReplyAt: true,
        createdAt: true,
      },
    });

    // Пересчитываем рейтинг товара только по одобренным отзывам
    const aggregate = await prisma.review.aggregate({
      where: {
        productId: parsedProductId,
        isApproved: true,
      },
      _avg: { rating: true },
      _count: { id: true },
    });

    await prisma.product.update({
      where: { id: parsedProductId },
      data: {
        rating: aggregate._avg.rating ?? 0,
        reviewsCount: aggregate._count.id ?? 0,
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
