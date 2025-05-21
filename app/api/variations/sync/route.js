// app/api/variations/sync/route.js
import { prisma } from "@/lib/prisma";

export async function POST() {
    try {
        // Получаем все товары
        const products = await prisma.product.findMany();

        for (const product of products) {
            // Проверяем, есть ли уже вариации для этого товара
            const existingCount = await prisma.productVariation.count({
                where: { productId: product.id },
            });

            if (existingCount === 0) {
                // Создаём дефолтную вариацию на основе данных товара
                await prisma.productVariation.create({
                    data: {
                        productId: product.id,
                        sku: product.article,
                        variationValue: "Default",
                        titleSeo: product.titleSeo ?? product.name,
                        descriptionSeo:
                            product.descriptionSeo ?? product.description ?? "",
                        price: product.basePrice,
                        stock: product.stock,
                        isDefault: true,
                    },
                });
            } else {
                // Если вариации есть, но нет дефолтной — помечаем первую как дефолтную
                const defaultExists = await prisma.productVariation.findFirst({
                    where: { productId: product.id, isDefault: true },
                });
                if (!defaultExists) {
                    const firstVar = await prisma.productVariation.findFirst({
                        where: { productId: product.id },
                        orderBy: { id: "asc" },
                    });
                    if (firstVar) {
                        await prisma.productVariation.update({
                            where: { id: firstVar.id },
                            data: { isDefault: true },
                        });
                    }
                }
            }
        }

        return Response.json({ success: true, processed: products.length });
    } catch (error) {
        console.error("Sync Variations Error:", error);
        return Response.json({ error: "Sync failed" }, { status: 500 });
    }
}
