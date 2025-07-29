"use server";

import { prisma } from "@/lib/prisma";
import defaultImage from "@/public/images/product/713680920.webp";

export async function getProductsByCategory(slug, searchParams = {}) {
  // Ожидаем searchParams
  const resolvedSearchParams = await searchParams;
  const page = Math.max(1, parseInt(resolvedSearchParams.page, 10) || 1);
  const perPage = 12;
  // console.log(resolvedSearchParams);

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      children: {
        select: {
          id: true,
          slug: true,
          children: true,
        },
      },
    },
  });

  if (!category) {
    return { products: [], totalProducts: 0, totalPages: 0, currentPage: page };
  }

  const categoryIds = [category.id];
  const collectCategoryIds = (categories) => {
    categories.forEach((cat) => {
      categoryIds.push(cat.id);
      if (cat.children && cat.children.length > 0) {
        collectCategoryIds(cat.children);
      }
    });
  };
  collectCategoryIds(category.children || []);

  const whereClause = {
    categoryId: { in: categoryIds },
  };

  const filterEntries = Object.entries(resolvedSearchParams).filter(
    ([key, value]) => key !== "page" && value !== undefined && value !== ""
  );

  if (filterEntries.length > 0) {
    const attributeConditions = filterEntries.map(([attributeSlug, value]) => {
      const values =
        typeof value === "string"
          ? value.split("-").filter((v) => v.trim() !== "")
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
    });
    whereClause.AND = attributeConditions;
  }

  const totalProducts = await prisma.product.count({ where: whereClause });
  const totalPages = Math.ceil(totalProducts / perPage);

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
      tags: {
        include: {
          tag: true,
        },
      },
    },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const transformedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    basePrice: product.basePrice,
    article: product.article || null,
    image: product.mediaFiles[0]?.url || defaultImage.src,
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

  return {
    products: JSON.parse(JSON.stringify(transformedProducts)),
    totalProducts,
    totalPages,
    currentPage: page,
  };
}
