// app/api/admin/reviews/import/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";

// Синглтон Prisma для dev/prod
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Парсинг даты из Excel
function parseDate(dateValue) {
  if (!dateValue) return new Date();

  if (typeof dateValue === "number") {
    // Excel серийное число (дни с 1900)
    return new Date(Math.round((dateValue - 25569) * 86400 * 1000));
  }

  if (typeof dateValue === "string") {
    const parts = dateValue.trim().split(".");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return new Date(dateValue);
  }

  return new Date(dateValue);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
    }

    // Читаем XLSX из памяти (не пишем на диск — важно для Vercel/prod)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet);

    console.log(`📊 Найдено строк для обработки: ${rows.length}`);

    const affectedProductIds = new Set();
    let createdCount = 0;
    let duplicatesCount = 0;
    const skipped = [];
    const duplicates = [];

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];

      const article = String(row["Артикул"] || "").trim();
      const userName = String(row["Имя"] || "").trim();
      const text = String(row["Отзыв"] || "").trim();
      const rawRating = row["Рейтинг"];
      const rawDate = row["Дата"];

      if (!article || !text) {
        skipped.push({
          row: index + 2,
          reason: "отсутствует артикул или текст отзыва",
        });
        continue;
      }

      const product = await prisma.product.findUnique({
        where: { article },
      });

      if (!product) {
        skipped.push({
          row: index + 2,
          reason: `товар с артикулом "${article}" не найден`,
        });
        continue;
      }

      const parsedRating =
        typeof rawRating === "string"
          ? parseFloat(rawRating.replace(",", "."))
          : Number(rawRating || 5);

      const rating = Math.min(5, Math.max(1, Math.round(parsedRating)));
      const createdAt = parseDate(rawDate);
      const finalUserName = userName || "Покупатель";

      // 🔎 Проверка на дубликат: тот же товар + то же имя + та же дата
      const existing = await prisma.review.findFirst({
        where: {
          productId: product.id,
          userName: finalUserName,
          createdAt,
        },
        select: { id: true },
      });

      if (existing) {
        duplicatesCount++;
        duplicates.push({
          row: index + 2,
          article,
          userName: finalUserName,
          date: createdAt.toISOString(),
        });
        continue;
      }

      await prisma.review.create({
        data: {
          productId: product.id,
          userName: finalUserName,
          text,
          rating,
          isApproved: true,
          createdAt,
        },
      });

      affectedProductIds.add(product.id);
      createdCount++;
    }

    // Пересчёт рейтинга и количества отзывов
    for (const productId of affectedProductIds) {
      const aggregate = await prisma.review.aggregate({
        where: { productId, isApproved: true },
        _avg: { rating: true },
        _count: { _all: true },
      });

      const avgRating = aggregate._avg.rating ?? 0;
      const reviewsCount = aggregate._count._all;
      const rating = Math.round(avgRating * 100) / 100;

      await prisma.product.update({
        where: { id: productId },
        data: { rating, reviewsCount },
      });
    }

    return NextResponse.json({
      message: `Импортировано: ${createdCount}. Пропущено дубликатов: ${duplicatesCount}. Ошибок/пропусков: ${skipped.length}.`,
      stats: {
        total: rows.length,
        createdCount,
        duplicatesCount,
        skippedCount: skipped.length,
        affectedProducts: affectedProductIds.size,
      },
      duplicates: duplicates.slice(0, 50),
      skipped: skipped.slice(0, 50),
    });
  } catch (error) {
    console.error("❌ Ошибка импорта отзывов:", error);
    return NextResponse.json(
      { error: error.message || "Ошибка при импорте отзывов" },
      { status: 500 },
    );
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
