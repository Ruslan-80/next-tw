import { prisma } from "@/lib/prisma";
import ClientFilters from "./ClientFilters";
import smartSort from "@/utils/smartSort";

export default async function Filters({
  attributeIds,
  searchParams,
  baseUrl,
  categorySlug,
  totalProducts,
}) {
  // console.log("Filters.jsx - attributeIds:", attributeIds);

  if (!Array.isArray(attributeIds) || attributeIds.length === 0) return null;

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

  // 1. Извлекаем выбранные фильтры из searchParams
  const selectedFilters = {};
  Object.entries(searchParams).forEach(([key, value]) => {
    if (key !== "page" && value) {
      const parsed =
        typeof value === "string"
          ? value.split("--").filter((v) => v.trim() !== "")
          : Array.isArray(value)
            ? value
            : [value];
      if (parsed.length > 0) {
        selectedFilters[key] = parsed;
      }
    }
  });

  const attributesData = await prisma.attribute.findMany({
    where: { id: { in: attributeIds } },
    include: {
      products: {
        where: { product: { categoryId: { in: categoryIds } } },
        select: { attributeValueName: true },
      },
    },
  });

  // 2. Для каждого атрибута считаем кол-во товаров с учетом фильтров ПО ДРУГИМ атрибутам
  const validAttributes = {};

  for (const attr of attributesData) {
    // Формируем whereClause без учета текущего атрибута attr.slug
    const otherFilterConditions = Object.entries(selectedFilters)
      .filter(([key]) => key !== attr.slug)
      .map(([filterSlug, values]) => ({
        attributes: {
          some: {
            attribute: { slug: filterSlug },
            attributeValueName: { in: values },
          },
        },
      }));

    const whereClause = {
      categoryId: { in: categoryIds },
      ...(otherFilterConditions.length > 0 && { AND: otherFilterConditions }),
    };

    // Подсчитываем количество товаров для каждого значения ТЕКУЩЕГО атрибута
    const valueCounts = await prisma.productAttribute.groupBy({
      by: ["attributeValueName"],
      where: {
        attributeId: attr.id,
        product: whereClause,
      },
      _count: {
        productId: true,
      },
    });

    const countsMap = {};
    valueCounts.forEach((item) => {
      countsMap[item.attributeValueName] = item._count.productId;
    });

    const uniqueValues = [
      ...new Set(attr.products.map((pa) => pa.attributeValueName)),
    ];

    const valuesWithCounts = uniqueValues
      .map((val) => ({
        name: val,
        count: countsMap[val] || 0,
      }))
      .filter((v) => v.count > 0); // Оставляем только те варианты, где товаров > 0

    // ЛОГИКА СКРЫТИЯ: если доступных вариантов <= 1, не выводим атрибут в UI
    if (valuesWithCounts.length > 1) {
      const valuesNames = valuesWithCounts.map((v) => v.name);
      validAttributes[attr.slug] = {
        name: attr.name,
        values: valuesNames.sort(smartSort),
        counts: valuesWithCounts.reduce(
          (acc, item) => ({ ...acc, [item.name]: item.count }),
          {},
        ),
      };
    }
  }

  if (!Object.keys(validAttributes).length) return null;

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
