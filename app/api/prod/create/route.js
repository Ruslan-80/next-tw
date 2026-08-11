import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

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

    const successfulProducts = [];
    const failedProducts = [];
    let loadedMediaFiles = 0;

    for (const item of productsData) {
      try {
        // 1. Проверка наличия categoryName
        if (!item.categoryName) {
          throw new Error(
            `Отсутствует название категории для продукта: ${item.name}`,
          );
        }

        // 2. Обработка категории
        const categorySlug = slugify(item.categoryName, {
          lower: true,
          strict: true,
        });

        const category = await prisma.category.upsert({
          where: { slug: categorySlug },
          update: {
            name: item.categoryName,
            fullName: item.categoryName,
          },
          create: {
            name: item.categoryName,
            slug: categorySlug,
            fullName: item.categoryName,
          },
        });

        // 3. Обработка продукта
        const productSlug = slugify(item.article, {
          lower: true,
          strict: true,
        });

        const MAX_DESC_LEN = 255; // уточните ваше ограничение
        if (item.descriptionSeo?.length > MAX_DESC_LEN) {
          item.descriptionSeo = item.descriptionSeo.slice(0, MAX_DESC_LEN);
        }

        const product = await prisma.product.upsert({
          where: { article: item.article },
          update: {
            name: item.name,
            slug: productSlug,
            categoryId: category.id,
            categorySlug: category.slug,
            basePrice: item.basePrice || 0,
            description: item.description || "",
            descriptionSeo: item.descriptionSeo || "",
            titleSeo: item.titleSeo || "",
            manufacturingTime: item.manufacturingTime,
            stock: item.stock || 0,
            visibility: true,
          },
          create: {
            name: item.name,
            slug: productSlug,
            article: item.article,
            categoryId: category.id,
            categorySlug: category.slug,
            basePrice: item.basePrice || 0,
            description: item.description || "",
            descriptionSeo: item.descriptionSeo || "",
            titleSeo: item.titleSeo || "",
            manufacturingTime: item.manufacturingTime,
            stock: item.stock || 0,
            visibility: true,
          },
        });

        // 4. Обработка атрибутов
        if (item.attributes && item.attributes.length > 0) {
          for (const attr of item.attributes) {
            const attrSlug = slugify(attr.name, { lower: true, strict: true });

            const attribute = await prisma.attribute.upsert({
              where: { slug: attrSlug },
              update: {},
              create: {
                name: attr.name,
                slug: attrSlug,
                unitName: attr.unitName || null,
              },
            });

            const valueSlug = slugify(String(attr.value), {
              lower: true,
              strict: true,
            });

            const value = await prisma.attributeValue.upsert({
              where: {
                attributeId_name: {
                  attributeId: attribute.id,
                  name: String(attr.value),
                },
              },
              update: {},
              create: {
                attributeId: attribute.id,
                name: String(attr.value),
                slug: valueSlug,
              },
            });

            await prisma.productAttribute.upsert({
              where: {
                productId_attributeId_attributeValueId: {
                  productId: product.id,
                  attributeId: attribute.id,
                  attributeValueId: value.id,
                },
              },
              update: {
                attributeName: attr.name,
                attributeValueName: String(attr.value),
              },
              create: {
                productId: product.id,
                attributeId: attribute.id,
                attributeValueId: value.id,
                attributeName: attr.name,
                attributeValueName: String(attr.value),
              },
            });
          }
        }
        if (item.attributes && item.attributes.length > 0) {
          for (const attr of item.attributes) {
            try {
              const attrSlug = slugify(attr.name, {
                lower: true,
                strict: true,
              });

              // 1. Убеждаемся, что сам Атрибут существует
              const attribute = await prisma.attribute.upsert({
                where: { slug: attrSlug },
                update: {},
                create: {
                  name: attr.name,
                  slug: attrSlug,
                  unitName: attr.unitName || null,
                },
              });

              // 2. Убеждаемся, что Значение существует
              const valueSlug = slugify(String(attr.value), {
                lower: true,
                strict: true,
              });
              const value = await prisma.attributeValue.upsert({
                where: {
                  attributeId_name: {
                    attributeId: attribute.id,
                    name: String(attr.value),
                  },
                },
                update: {},
                create: {
                  attributeId: attribute.id,
                  name: String(attr.value),
                  slug: valueSlug,
                },
              });

              // 3. ПРОВЕРКА КОНСИСТЕНТНОСТИ (Ваша основная логика)
              // Ищем, есть ли у этого товара ВООБЩЕ какой-либо ProductAttribute для этого типа (attributeId)
              const existingRelation = await prisma.productAttribute.findFirst({
                where: {
                  productId: product.id,
                  attributeId: attribute.id,
                },
              });

              if (existingRelation) {
                // Если нашли, но ID значения другой — значит это "дубль" или опечатка, обновляем
                if (existingRelation.attributeValueId !== value.id) {
                  await prisma.productAttribute.update({
                    where: { id: existingRelation.id },
                    data: {
                      attributeValueId: value.id,
                      attributeValueName: String(attr.value),
                      attributeName: attr.name,
                    },
                  });
                  console.log(
                    `[LOG] Исправлено: Товар "${item.article}", Атрибут "${attr.name}": "${existingRelation.attributeValueName}" -> "${attr.value}"`,
                  );
                } else {
                  // Если ID совпадает, ничего не делаем (консистентно)
                  console.log(
                    `[LOG] Без изменений: Товар "${item.article}", Атрибут "${attr.name}" уже актуален.`,
                  );
                }
              } else {
                // Если связи вообще нет — создаем новую
                await prisma.productAttribute.create({
                  data: {
                    productId: product.id,
                    attributeId: attribute.id,
                    attributeValueId: value.id,
                    attributeName: attr.name,
                    attributeValueName: String(attr.value),
                  },
                });
                console.log(
                  `[LOG] Добавлено: Товар "${item.article}", новый атрибут "${attr.name}" = "${attr.value}"`,
                );
              }
            } catch (attrError) {
              console.error(
                `[ERROR] Ошибка атрибута "${attr.name}" для товара "${item.article}":`,
                attrError.message,
              );
              // Здесь можно добавить ошибку в общий массив failedProducts, если нужно
            }
          }
        }

        // 5. Обработка медиафайлов
        if (item.mediaFiles && item.mediaFiles.length > 0) {
          for (const media of item.mediaFiles) {
            const existingMediaFile = await prisma.mediaFile.findFirst({
              where: {
                productId: product.id,
                type: media.type,
                url: media.url,
              },
            });

            if (!existingMediaFile) {
              await prisma.mediaFile.create({
                data: {
                  productId: product.id,
                  type: media.type,
                  url: media.url,
                },
              });
              loadedMediaFiles++;
            }
          }
        }

        successfulProducts.push(item.article);
      } catch (error) {
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
        successCount: successfulProducts.length,
        failedCount: failedProducts.length,
        mediaLoaded: loadedMediaFiles,
      },
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
