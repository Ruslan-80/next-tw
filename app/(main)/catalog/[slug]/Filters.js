import { prisma } from "@/lib/prisma";
import ClientFilters from "./ClientFilters";

export default async function Filters({
  attributeIds,
  searchParams,
  baseUrl,
  categorySlug,
  totalProducts,
}) {
  // console.log("Filters.jsx - attributeIds:", attributeIds);

  if (!Array.isArray(attributeIds) || attributeIds.length === 0) {
    console.log("Filters.jsx - No valid attributeIds provided");
    return null;
  }

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
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
    console.log("Filters.jsx - Category not found:", categorySlug);
    return null;
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
  //   console.log('Filters.jsx - categoryIds:', categoryIds);

  const attributesData = await prisma.attribute.findMany({
    where: {
      id: { in: attributeIds },
    },
    include: {
      products: {
        where: {
          product: {
            categoryId: { in: categoryIds },
          },
        },
        select: {
          attributeValueName: true,
          productId: true,
        },
      },
    },
  });
  // console.log("Filters.jsx - attributesData:", attributesData);

  const valueCounts = await prisma.productAttribute.groupBy({
    by: ["attributeId", "attributeValueName"],
    where: {
      attributeId: { in: attributeIds },
      product: { categoryId: { in: categoryIds } },
    },
    _count: {
      productId: true,
    },
  });
  //   console.log('Filters.jsx - valueCounts:', valueCounts);

  const valueCountsMap = new Map();
  valueCounts.forEach((item) => {
    valueCountsMap.set(
      `${item.attributeId}-${item.attributeValueName}`,
      item._count.productId
    );
  });
  // console.log("valueCounts:", valueCountsMap);

  const attributes = attributesData.map((attr) => {
    const uniqueValues = [
      ...new Set(attr.products.map((pa) => pa.attributeValueName)),
    ].sort();
    const valuesWithCounts = uniqueValues
      .map((value) => ({
        name: value,
        count: valueCountsMap.get(`${attr.id}-${value}`) || 0,
      }))
      .filter((v) => v.count > 0);

    return {
      name: attr.name,
      slug: attr.slug,
      values: valuesWithCounts,
    };
  });
  // console.log("attributes:", attributes);

  const validAttributes = attributes
    .filter((attr) => attr.values.length > 0)
    .reduce((acc, attr) => {
      acc[attr.slug] = {
        name: attr.name,
        values: attr.values.map((v) => v.name),
        counts: attr.values.reduce((c, v) => ({ ...c, [v.name]: v.count }), {}),
      };
      return acc;
    }, {});

  if (!Object.keys(validAttributes).length) {
    console.log("Filters.jsx - No valid attributes found");
    return null;
  }
  // console.log("validAttributes:", validAttributes);
  return (
    <ClientFilters
      totalProducts={totalProducts}
      attributes={validAttributes}
      searchParams={searchParams}
      baseUrl={baseUrl}
      categorySlug={categorySlug}
    />
  );
}
