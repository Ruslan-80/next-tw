import { PrismaClient } from "@prisma/client";
import ExcelJS from "exceljs";

const prisma = new PrismaClient();

async function exportProductsToExcel() {
  try {
    console.log("Starting export...");

    // Получаем данные о товарах
    const products = await prisma.product.findMany({
      include: {
        category: { select: { id: true, slug: true, name: true } },
        variations: true,
        attributes: { include: { attribute: true, attributeValue: true } },
        mediaFiles: true,
        tags: { include: { tag: true } },
      },
    });

    // Создаём новый workbook
    const workbook = new ExcelJS.Workbook();
    workbook.created = new Date();
    workbook.modified = new Date();

    // Лист Products
    const productsSheet = workbook.addWorksheet("Products");
    productsSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Article", key: "article", width: 15 },
      { header: "Name", key: "name", width: 30 },
      { header: "Slug", key: "slug", width: 20 },
      { header: "Description", key: "description", width: 50 },
      { header: "Title SEO", key: "titleSeo", width: 30 },
      { header: "Description SEO", key: "descriptionSeo", width: 50 },
      { header: "Base Price", key: "basePrice", width: 12 },
      { header: "Manufacturing Time", key: "manufacturingTime", width: 20 },
      { header: "Stock", key: "stock", width: 10 },
      { header: "Visibility", key: "visibility", width: 10 },
      { header: "Category ID", key: "categoryId", width: 12 },
      { header: "Category Slug", key: "categorySlug", width: 20 },
      { header: "Category Name", key: "categoryName", width: 20 },
      { header: "Created At", key: "createdAt", width: 20 },
      { header: "Updated At", key: "updatedAt", width: 20 },
    ];
    products.forEach((product) => {
      productsSheet.addRow({
        id: product.id,
        article: product.article,
        name: product.name,
        slug: product.slug,
        description: product.description || "",
        titleSeo: product.titleSeo || "",
        descriptionSeo: product.descriptionSeo || "",
        basePrice: product.basePrice,
        manufacturingTime: product.manufacturingTime,
        stock: product.stock,
        visibility: product.visibility,
        categoryId: product.categoryId,
        categorySlug: product.category.slug,
        categoryName: product.category.name,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      });
    });

    // Лист ProductVariations
    const variationsSheet = workbook.addWorksheet("ProductVariations");
    variationsSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Product ID", key: "productId", width: 12 },
      { header: "SKU", key: "sku", width: 15 },
      { header: "Variation Value", key: "variationValue", width: 20 },
      { header: "Title SEO", key: "titleSeo", width: 30 },
      { header: "Description SEO", key: "descriptionSeo", width: 50 },
      { header: "Price", key: "price", width: 12 },
      { header: "Stock", key: "stock", width: 10 },
      { header: "Is Default", key: "isDefault", width: 10 },
      { header: "Created At", key: "createdAt", width: 20 },
      { header: "Updated At", key: "updatedAt", width: 20 },
    ];
    products.forEach((product) => {
      product.variations.forEach((variation) => {
        variationsSheet.addRow({
          id: variation.id,
          productId: product.id,
          sku: variation.sku,
          variationValue: variation.variationValue,
          titleSeo: variation.titleSeo || "",
          descriptionSeo: variation.descriptionSeo || "",
          price: variation.price,
          stock: variation.stock,
          isDefault: variation.isDefault,
          createdAt: variation.createdAt.toISOString(),
          updatedAt: variation.updatedAt.toISOString(),
        });
      });
    });

    // Лист ProductAttributes
    const attributesSheet = workbook.addWorksheet("ProductAttributes");
    attributesSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Product ID", key: "productId", width: 12 },
      { header: "Attribute ID", key: "attributeId", width: 12 },
      { header: "Attribute Name", key: "attributeName", width: 20 },
      { header: "Attribute Value ID", key: "attributeValueId", width: 15 },
      { header: "Attribute Value Name", key: "attributeValueName", width: 20 },
      { header: "Created At", key: "createdAt", width: 20 },
      { header: "Updated At", key: "updatedAt", width: 20 },
    ];
    products.forEach((product) => {
      product.attributes.forEach((attr) => {
        attributesSheet.addRow({
          id: attr.id,
          productId: product.id,
          attributeId: attr.attributeId,
          attributeName: attr.attributeName,
          attributeValueId: attr.attributeValueId,
          attributeValueName: attr.attributeValueName,
          createdAt: attr.createdAt.toISOString(),
          updatedAt: attr.updatedAt.toISOString(),
        });
      });
    });

    // Лист MediaFiles
    const mediaFilesSheet = workbook.addWorksheet("MediaFiles");
    mediaFilesSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Product ID", key: "productId", width: 12 },
      { header: "Type", key: "type", width: 10 },
      { header: "URL", key: "url", width: 50 },
      { header: "Created At", key: "createdAt", width: 20 },
      { header: "Updated At", key: "updatedAt", width: 20 },
    ];
    products.forEach((product) => {
      product.mediaFiles.forEach((media) => {
        mediaFilesSheet.addRow({
          id: media.id,
          productId: product.id,
          type: media.type,
          url: media.url,
          createdAt: media.createdAt.toISOString(),
          updatedAt: media.updatedAt.toISOString(),
        });
      });
    });

    // Лист ProductTags
    const tagsSheet = workbook.addWorksheet("ProductTags");
    tagsSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Product ID", key: "productId", width: 12 },
      { header: "Tag ID", key: "tagId", width: 12 },
      { header: "Tag Name", key: "tagName", width: 20 },
      { header: "Tag Slug", key: "tagSlug", width: 20 },
    ];
    products.forEach((product) => {
      product.tags.forEach((tag) => {
        tagsSheet.addRow({
          id: tag.id,
          productId: product.id,
          tagId: tag.tagId,
          tagName: tag.tag.name,
          tagSlug: tag.tag.slug,
        });
      });
    });

    // Возвращаем буфер для API
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  } catch (e) {
    console.error("Error during export:", e);
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}

export { exportProductsToExcel };
