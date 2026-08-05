// app/api/variations/sync/route.js

import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const products = await prisma.product.findMany();

    for (const product of products) {
      const existingCount = await prisma.productVariation.count({
        where: { productId: product.id },
      });

      if (existingCount === 0) {
        // Создаём дефолтную вариацию
        await prisma.productVariation.create({
          data: {
            productId: product.id,
            sku: product.article,
            variationValue: "Default",
            titleSeo: product.titleSeo ?? product.name,
            descriptionSeo: product.descriptionSeo ?? product.description ?? "",
            price: product.basePrice,
            stock: product.stock,
            isDefault: true,
          },
        });
      } else {
        // Ищем существующую дефолтную вариацию или берём первую попавшуюся
        let targetVariation = await prisma.productVariation.findFirst({
          where: { productId: product.id, isDefault: true },
        });

        if (!targetVariation) {
          targetVariation = await prisma.productVariation.findFirst({
            where: { productId: product.id },
            orderBy: { id: "asc" },
          });
        }

        // Обновляем цену и флаг isDefault для найденной вариации
        if (targetVariation) {
          await prisma.productVariation.update({
            where: { id: targetVariation.id },
            data: {
              price: product.basePrice,
              isDefault: true,
            },
          });
        }
      }
    }

    return Response.json({ success: true, processed: products.length });
  } catch (error) {
    console.error("Sync Variations Error:", error);
    return Response.json({ error: "Sync failed" }, { status: 500 });
  }
}
