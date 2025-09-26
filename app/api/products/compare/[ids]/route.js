import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { ids } = params;

  try {
    // Преобразуем строку ID в массив чисел
    const idArray = ids.split("-").map((id) => parseInt(id));

    const products = await prisma.product.findMany({
      where: {
        id: { in: idArray },
      },
      include: {
        attributes: {
          include: {
            attribute: true,
          },
        },
        mediaFiles: true,
        variations: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    const transformedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      basePrice: product.basePrice,
      article: product.article || null,
      image: product.mediaFiles[0]?.url || null,
      description: product.description || null,
      stock: product.stock,
      variations: product.variations.map((variation) => ({
        id: variation.id,
        sku: variation.sku,
        price: variation.price,
        stock: variation.stock,
        variationValue: variation.variationValue,
        isDefault: variation.isDefault,
      })),
      tags: product.tags.map((tag) => ({
        name: tag.tag.name,
        slug: tag.tag.slug,
      })),
      attributes: product.attributes.map((attr) => ({
        attributeSlug: attr.attribute.slug,
        attributeName: attr.attribute.name,
        attributeValueName: attr.attributeValueName,
      })),
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error("Error fetching compare products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
