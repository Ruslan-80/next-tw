"use server";

import { prisma } from "@/lib/prisma";

export async function searchProducts(query) {
    console.log("Searching products with query:", query);
    if (!query || query.length < 2) {
        console.log("Query too short, returning empty array");
        return [];
    }

    try {
        console.log("Executing Prisma query with:", {
            where: { name: { contains: query } },
        });
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { article: { contains: query } },
                ],
            },
            select: {
                id: true,
                name: true,
                slug: true,
                basePrice: true,
                article: true,
                mediaFiles: {
                    select: { url: true },
                    take: 1,
                },
                attributes: {
                    select: {
                        attributeName: true,
                        attributeValueName: true,
                        attribute: {
                            select: {
                                slug: true,
                            },
                        },
                    },
                },
            },
            take: 10,
        });

        return Array.isArray(products)
            ? products.map(product => ({
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  basePrice: product.basePrice,
                  article: product.article || null,
                  image: product.mediaFiles[0]?.url || null,
                  attributes: product.attributes.map(attr => ({
                      attributeName: attr.attributeName,
                      attributeSlug: attr.attribute.slug,
                      attributeValueName: attr.attributeValueName,
                  })),
              }))
            : [];
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
}
