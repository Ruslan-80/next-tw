import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const productsData = await request.json();

    if (!Array.isArray(productsData)) {
      return NextResponse.json(
        { error: "Ожидался массив данных" },
        { status: 400 },
      );
    }

    const updatedProducts = [];
    const skippedProducts = [];
    const failedProducts = [];

    for (const item of productsData) {
      try {
        // 1. Проверка наличия артикула
        if (!item.article) {
          console.log(
            `[LOG] Пропущен элемент без артикула: "${item.name || "Без имени"}"`,
          );
          failedProducts.push({
            name: item.name || "Неизвестно",
            article: null,
            reason: "Отсутствует артикул в исходных данных",
          });
          continue;
        }

        // 2. Проверяем, существует ли продукт в базе
        const existingProduct = await prisma.product.findUnique({
          where: { article: item.article },
        });

        if (!existingProduct) {
          const reason = `Товар с артикулом "${item.article}" не найден в базе данных.`;
          console.log(`[LOG] ${reason}`);
          skippedProducts.push({
            name: item.name,
            article: item.article,
            reason: reason,
          });
          continue;
        }

        const MAX_DESC_LEN = 255; // уточните ваше ограничение
        if (item.descriptionSeo?.length > MAX_DESC_LEN) {
          item.descriptionSeo = item.descriptionSeo.slice(0, MAX_DESC_LEN);
        }

        // 3. Обновление существующего товара (без атрибутов и категорий)
        const updatedProduct = await prisma.product.update({
          where: { article: item.article },
          data: {
            name: item.name ?? existingProduct.name,
            titleSeo: item.titleSeo || "",
            descriptionSeo: item.descriptionSeo || "",
            seoBlock: item.seoBlock || "",
            description: item.description || "",
            // Массив usp сохраняется напрямую, если в вашей Prisma schema это поле Json или String[]
            usp: item.usp || [],
          },
        });

        console.log(
          `[LOG] Успешно обновлен товар с артикулом: ${item.article}`,
        );
        updatedProducts.push(updatedProduct.article);
      } catch (error) {
        console.error(
          `[ERROR] Ошибка при обработке товара "${item.article}":`,
          error.message,
        );
        failedProducts.push({
          name: item.name,
          article: item.article,
          reason: error.message,
        });
      }
    }

    return NextResponse.json({
      message: "Обработка завершена",
      stats: {
        totalReceived: productsData.length,
        updatedCount: updatedProducts.length,
        skippedCount: skippedProducts.length,
        failedCount: failedProducts.length,
      },
      skippedItems: skippedProducts.length > 0 ? skippedProducts : null,
      failedItems: failedProducts.length > 0 ? failedProducts : null,
    });
  } catch (error) {
    console.error("Критическая ошибка API:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
