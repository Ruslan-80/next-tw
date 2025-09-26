import { prisma } from "@/lib/prisma";

export async function GET() {
  const excludedAttributeNames = [
    "Производитель",
    "Глубина установочная (встраиваемая), мм",
    "Количество модулей",
    "Ед. измерения",
    "Вес, кг",
    "Объем, м³",
    "Кратность",
    "Срок изготовления",
    "Встраивается в стену",
  ];

  const products = await prisma.product.findMany({
    where: { categoryId: 19 },
    select: {
      id: true,
      article: true,
      name: true,
      // description: true,
      attributes: {
        where: {
          attributeName: {
            notIn: excludedAttributeNames,
          },
        },
        select: {
          attributeName: true,
          attributeValueName: true,
          attribute: {
            select: {
              unitName: true,
            },
          },
        },
      },
    },
  });

  // Трансформация данных для соответствия требуемому формату
  const transformedProducts = products.map((product) => ({
    ...product,
    attributes: product.attributes.map((attr) => ({
      attributeName: attr.attributeName,
      attributeValueName: attr.attributeValueName,
      unitName: attr.attribute.unitName,
    })),
  }));

  return Response.json(transformedProducts);
}
