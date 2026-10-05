import { PrismaClient } from "@prisma/client";
import XLSX from "xlsx";
import path from "path";

const prisma = new PrismaClient();

// Путь к XLSX файлу в корне проекта
const FILE_PATH = path.join(process.cwd(), "vru_reviews_long.xlsx");

// Вспомогательная функция для парсинга даты из Excel
function parseDate(dateValue) {
  if (!dateValue) return new Date();

  if (typeof dateValue === "number") {
    // Excel хранит даты как число дней с 1900 года
    return new Date(Math.round((dateValue - 25569) * 86400 * 1000));
  }

  if (typeof dateValue === "string") {
    // Формат "DD.MM.YYYY" (например, "03.05.2026")
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

async function main() {
  console.log("🚀 Начинаем импорт отзывов...");

  // 1. Читаем Excel файл
  const workbook = XLSX.readFile(FILE_PATH);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Преобразуем лист Excel в массив объектов
  const rows = XLSX.utils.sheet_to_json(worksheet);

  console.log(`📊 Найдено строк для обработки: ${rows.length}`);

  // Набор уникальных ID товаров для пересчета рейтинга
  const affectedProductIds = new Set();

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];

    const article = String(row["Артикул"] || "").trim();
    const userName = String(row["Имя"] || "").trim();
    const text = String(row["Отзыв"] || "").trim();
    const rawRating = row["Рейтинг"];
    const rawDate = row["Дата"];

    if (!article || !text) {
      console.warn(
        `⚠️ Пропущена строка #${index + 2}: отсутствует артикул или текст отзыва`,
      );
      continue;
    }

    // 2. Ищем товар по артикулу
    const product = await prisma.product.findUnique({
      where: { article },
    });

    if (!product) {
      console.warn(`⚠️ Товар с артикулом "${article}" не найден в базе данных`);
      continue;
    }

    // Парсим рейтинг (учитываем запятые, например "4,5")
    const parsedRating =
      typeof rawRating === "string"
        ? parseFloat(rawRating.replace(",", "."))
        : Number(rawRating || 5);

    // Округляем до целого числа (1–5)
    const rating = Math.min(5, Math.max(1, Math.round(parsedRating)));
    const createdAt = parseDate(rawDate);

    // 3. Создаем отзыв
    await prisma.review.create({
      data: {
        productId: product.id,
        userName: userName || "Покупатель",
        text,
        rating,
        isApproved: true,
        createdAt,
      },
    });

    affectedProductIds.add(product.id);
    console.log(`✅ Добавлен отзыв от "${userName}" для товара "${article}"`);
  }

  // 4. Пересчитываем rating и reviewsCount для затронутых товаров
  console.log("\n🔄 Пересчитываем итоговый рейтинг товаров...");

  for (const productId of affectedProductIds) {
    const aggregate = await prisma.review.aggregate({
      where: { productId, isApproved: true },
      _avg: { rating: true },
      _count: { _all: true },
    });

    const avgRating = aggregate._avg.rating ?? 0;
    const reviewsCount = aggregate._count._all;

    // Округляем средний рейтинг до 2 знаков после запятой
    const rating = Math.round(avgRating * 100) / 100;

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating,
        reviewsCount,
      },
    });
  }

  console.log("🎉 Импорт успешно завершен!");
}

main()
  .catch((e) => {
    console.error("❌ Ошибка при импорте:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
