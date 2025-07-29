import { PrismaClient } from "@prisma/client";
import ExcelJS from "exceljs";
import slugify from "slugify";

const prisma = new PrismaClient();

async function importProductsFromExcel(buffer) {
  try {
    console.log("Starting import...");

    // Читаем буфер Excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    // Извлекаем данные из листов
    const sheets = {
      Products: workbook
        .getWorksheet("Products")
        ?.getSheetValues()
        .slice(2)
        .map((row) => ({
          id: row[1],
          article: row[2],
          name: row[3],
          slug: row[4],
          description: row[5],
          titleSeo: row[6],
          descriptionSeo: row[7],
          basePrice: Number(row[8]),
          manufacturingTime: row[9],
          stock: Number(row[10]),
          visibility: row[11] === "true" || row[11] === true,
          categoryId: Number(row[12]),
          categorySlug: row[13],
          categoryName: row[14],
        })),
      ProductVariations: workbook
        .getWorksheet("ProductVariations")
        ?.getSheetValues()
        .slice(2)
        .map((row) => ({
          id: row[1],
          productId: Number(row[2]),
          sku: row[3],
          variationValue: row[4],
          titleSeo: row[5],
          descriptionSeo: row[6],
          price: Number(row[7]),
          stock: Number(row[8]),
          isDefault: row[9] === "true" || row[9] === true,
        })),
      ProductAttributes: workbook
        .getWorksheet("ProductAttributes")
        ?.getSheetValues()
        .slice(2)
        .map((row) => ({
          id: row[1],
          productId: Number(row[2]),
          attributeId: Number(row[3]),
          attributeName: row[4],
          attributeValueId: Number(row[5]),
          attributeValueName: row[6],
        })),
      MediaFiles: workbook
        .getWorksheet("MediaFiles")
        ?.getSheetValues()
        .slice(2)
        .map((row) => ({
          id: row[1],
          productId: Number(row[2]),
          type: row[3],
          url: row[4],
        })),
      ProductTags: workbook
        .getWorksheet("ProductTags")
        ?.getSheetValues()
        .slice(2)
        .map((row) => ({
          id: row[1],
          productId: Number(row[2]),
          tagId: Number(row[3]),
          tagName: row[4],
          tagSlug: row[5],
        })),
    };

    // Проверка наличия всех листов
    for (const sheetName in sheets) {
      if (!sheets[sheetName]) {
        throw new Error(`Sheet "${sheetName}" not found in the Excel file`);
      }
    }

    // Создаём/проверяем категории
    const categoryMap = new Map();
    for (const product of sheets.Products) {
      if (!product.categoryId && product.categorySlug) {
        let category = await prisma.category.findUnique({
          where: { slug: product.categorySlug },
        });
        if (!category) {
          category = await prisma.category.create({
            data: {
              name: product.categoryName || product.categorySlug,
              fullName: product.categoryName || product.categorySlug,
              slug: product.categorySlug,
            },
          });
          console.log(
            `Created category: ${product.categorySlug} (ID: ${category.id})`
          );
        }
        categoryMap.set(product.categorySlug, category.id);
      }
    }

    // Создаём/проверяем атрибуты и их значения
    const attributeMap = new Map();
    const attributeValueMap = new Map();
    for (const attr of sheets.ProductAttributes) {
      if (!attr.attributeId && attr.attributeName) {
        let attribute = await prisma.attribute.findUnique({
          where: { name: attr.attributeName },
        });
        if (!attribute) {
          attribute = await prisma.attribute.create({
            data: {
              name: attr.attributeName,
              slug: slugify(attr.attributeName, { lower: true }),
            },
          });
          console.log(
            `Created attribute: ${attr.attributeName} (ID: ${attribute.id})`
          );
        }
        attributeMap.set(attr.attributeName, attribute.id);

        if (!attr.attributeValueId && attr.attributeValueName) {
          let attrValue = await prisma.attributeValue.findFirst({
            where: {
              attributeId: attribute.id,
              name: attr.attributeValueName,
            },
          });
          if (!attrValue) {
            attrValue = await prisma.attributeValue.create({
              data: {
                attributeId: attribute.id,
                name: attr.attributeValueName,
                slug: slugify(attr.attributeValueName, { lower: true }),
              },
            });
            console.log(
              `Created attribute value: ${attr.attributeValueName} (ID: ${attrValue.id})`
            );
          }
          attributeValueMap.set(
            `${attribute.id}-${attr.attributeValueName}`,
            attrValue.id
          );
        }
      }
    }

    // Создаём/проверяем теги
    const tagMap = new Map();
    for (const tag of sheets.ProductTags) {
      if (!tag.tagId && tag.tagName) {
        let tagRecord = await prisma.tag.findUnique({
          where: { name: tag.tagName },
        });
        if (!tagRecord) {
          tagRecord = await prisma.tag.create({
            data: {
              name: tag.tagName,
              slug: slugify(tag.tagName, { lower: true }),
            },
          });
          console.log(`Created tag: ${tag.tagName} (ID: ${tagRecord.id})`);
        }
        tagMap.set(tag.tagName, tagRecord.id);
      }
    }

    // Импорт товаров
    for (const product of sheets.Products) {
      const data = {
        article: product.article,
        name: product.name,
        slug: product.slug,
        description: product.description || null,
        titleSeo: product.titleSeo || null,
        descriptionSeo: product.descriptionSeo || null,
        basePrice: Number(product.basePrice),
        manufacturingTime: product.manufacturingTime,
        stock: Number(product.stock),
        visibility: Boolean(product.visibility),
        categoryId: product.categoryId
          ? Number(product.categoryId)
          : categoryMap.get(product.categorySlug),
      };

      if (product.id) {
        await prisma.product.update({
          where: { id: Number(product.id) },
          data,
        });
        console.log(`Updated product: ${product.name} (ID: ${product.id})`);
      } else {
        const newProduct = await prisma.product.create({
          data,
        });
        console.log(`Created product: ${product.name} (ID: ${newProduct.id})`);
      }
    }

    // Импорт вариантов товаров
    for (const variation of sheets.ProductVariations) {
      const data = {
        productId: Number(variation.productId),
        sku: variation.sku,
        variationValue: variation.variationValue,
        titleSeo: variation.titleSeo || null,
        descriptionSeo: variation.descriptionSeo || null,
        price: Number(variation.price),
        stock: Number(variation.stock),
        isDefault: Boolean(variation.isDefault),
      };

      if (variation.id) {
        await prisma.productVariation.update({
          where: { id: Number(variation.id) },
          data,
        });
        console.log(
          `Updated variation: ${variation.sku} (ID: ${variation.id})`
        );
      } else {
        await prisma.productVariation.create({
          data,
        });
        console.log(`Created variation: ${variation.sku}`);
      }
    }

    // Импорт атрибутов товаров
    for (const attr of sheets.ProductAttributes) {
      const data = {
        productId: Number(attr.productId),
        attributeId: attr.attributeId
          ? Number(attr.attributeId)
          : attributeMap.get(attr.attributeName),
        attributeValueId: attr.attributeValueId
          ? Number(attr.attributeValueId)
          : attributeValueMap.get(
              `${attr.attributeId || attributeMap.get(attr.attributeName)}-${
                attr.attributeValueName
              }`
            ),
        attributeName: attr.attributeName,
        attributeValueName: attr.attributeValueName,
      };

      if (attr.id) {
        await prisma.productAttribute.update({
          where: { id: Number(attr.id) },
          data,
        });
        console.log(
          `Updated attribute: ${attr.attributeName} - ${attr.attributeValueName} (ID: ${attr.id})`
        );
      } else {
        await prisma.productAttribute.create({
          data,
        });
        console.log(
          `Created attribute: ${attr.attributeName} - ${attr.attributeValueName}`
        );
      }
    }

    // Импорт медиафайлов
    for (const media of sheets.MediaFiles) {
      const data = {
        productId: Number(media.productId),
        type: media.type,
        url: media.url,
      };

      if (media.id) {
        await prisma.mediaFile.update({
          where: { id: Number(media.id) },
          data,
        });
        console.log(`Updated media: ${media.url} (ID: ${media.id})`);
      } else {
        await prisma.mediaFile.create({
          data,
        });
        console.log(`Created media: ${media.url}`);
      }
    }

    // Импорт тегов
    for (const tag of sheets.ProductTags) {
      const data = {
        productId: Number(tag.productId),
        tagId: tag.tagId ? Number(tag.tagId) : tagMap.get(tag.tagName),
      };

      if (tag.id) {
        await prisma.productTag.update({
          where: { id: Number(tag.id) },
          data,
        });
        console.log(`Updated tag: ${tag.tagName} (ID: ${tag.id})`);
      } else {
        await prisma.productTag.create({
          data,
        });
        console.log(`Created tag: ${tag.tagName}`);
      }
    }

    console.log("Import completed!");
    return { success: true, message: "Import completed successfully" };
  } catch (e) {
    console.error("Error during import:", e);
    return { success: false, message: e.message };
  } finally {
    await prisma.$disconnect();
  }
}

export { importProductsFromExcel };
