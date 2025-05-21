"use server";

import { prisma } from "@/lib/prisma";

/**
 * Получает товары по slug категории и фильтрам
 */
export async function getProductsByCategory(slug, searchParams = {}) {
    const whereClause = {
        category: { slug },
    };

    // Если есть фильтры по атрибутам
    const filterEntries = Object.entries(searchParams).filter(
        ([, value]) => value !== undefined && value !== ""
    );

    if (filterEntries.length > 0) {
        // Создаём массив условий для каждого фильтра
        const attributeConditions = filterEntries.map(
            ([attributeSlug, value]) => {
                // Если значение — строка со слешами, разбиваем её на массив
                const values =
                    typeof value === "string"
                        ? value.split("-").filter(v => v.trim() !== "")
                        : Array.isArray(value)
                        ? value
                        : [value];
                return {
                    attributes: {
                        some: {
                            attribute: {
                                slug: attributeSlug,
                            },
                            attributeValueName: { in: values },
                        },
                    },
                };
            }
        );

        // Используем AND для объединения условий
        whereClause.AND = attributeConditions;
    }

    const products = await prisma.product.findMany({
        where: whereClause,
        include: {
            attributes: {
                include: {
                    attribute: true,
                },
            },
            mediaFiles: true,
            variations: true,
        },
    });

    // Преобразуем данные, чтобы использовать attributeSlug
    const transformedProducts = products.map(product => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        basePrice: product.basePrice,
        article: product.article || null,
        image: product.mediaFiles[0]?.url || null,
        attributes: product.attributes.map(attr => ({
            attributeSlug: attr.attribute.slug,
            attributeName: attr.attribute.name,
            attributeValueName: attr.attributeValueName,
        })),
    }));

    return JSON.parse(JSON.stringify(transformedProducts));
}
