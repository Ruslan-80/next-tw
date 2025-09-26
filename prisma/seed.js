import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  const productsData = [
    {
      name: "Кожух щэ для этажного щита универсальный (995x945x160)",
      categoryName: "Кожух щэ для этажного щита",
      article: "kozhukh-1",
      basePrice: 6000,
      manufacturingTime: "10-15 дней",
      stock: 0,
      attributes: [
        { name: "Производитель", value: "Капитал Строй", unitName: "" },
        { name: "Страна", value: "Россия", unitName: "" },
        {
          name: "Глубина установочная (встраиваемая), мм",
          value: "160",
          unitName: "мм",
        },
        { name: "Материал изделия", value: "Сталь листовая", unitName: "" },
        { name: "Цвет", value: "Серый RAL7035", unitName: "" },
        {
          name: "Отделка поверхности",
          value: "С порошковым покрытием",
          unitName: "",
        },
        { name: "Количество дверей", value: "3", unitName: "" },

        {
          name: "Количество квартир (счетчиков)",
          value: "0",
          unitName: "",
        },
        { name: "Способ монтажа", value: "Накладной", unitName: "" },
        {
          name: "Возможно настенное крепление",
          value: "Да",
          unitName: "",
        },
        { name: "Встраивается в стену", value: "Нет", unitName: "" },

        { name: "Климатическое исполнение", value: "УХЛ3", unitName: "" },
        { name: "Толщина металла, мм", value: "0,8", unitName: "мм" },

        {
          name: "Соответствие ГОСТ/МЭК/ТУ",
          value: "ТУ 3434-002-52681400-2019",
          unitName: "",
        },
        { name: "Ед. измерения", value: "шт.", unitName: "" },
        { name: "Вес, кг", value: "", unitName: "кг" },
        { name: "Объем, м³", value: "", unitName: "м³" },
        { name: "Кратность", value: "1", unitName: "" },
        { name: "Срок службы, лет", value: "25", unitName: "лет" },
        { name: "Срок изготовления", value: "10-15 дней", unitName: "" },
        {
          name: "Гарантийный срок хранения",
          value: "3 года",
          unitName: "",
        },
        { name: "Гарантийный срок, мес", value: "36", unitName: "мес" },
        { name: "Слаботочный отсек", value: "Да", unitName: "" },
        { name: "Высота", value: "995", unitName: "мм" },
        { name: "Шиоина", value: "945", unitName: "мм" },
        { name: "Глубина", value: "160", unitName: "мм" },
      ],
    },
    {
      name: "Кожух щэ для этажного щита без слаботочного отсека (995x645x160)",
      categoryName: "Кожух щэ для этажного щита",
      article: "kozhukh-2",
      basePrice: 5700,
      manufacturingTime: "10-15 дней",
      stock: 0,
      attributes: [
        { name: "Производитель", value: "Капитал Строй", unitName: "" },
        { name: "Страна", value: "Россия", unitName: "" },
        {
          name: "Глубина установочная (встраиваемая), мм",
          value: "160",
          unitName: "мм",
        },
        { name: "Материал изделия", value: "Сталь листовая", unitName: "" },
        { name: "Цвет", value: "Серый RAL7035", unitName: "" },
        {
          name: "Отделка поверхности",
          value: "С порошковым покрытием",
          unitName: "",
        },
        { name: "Количество дверей", value: "2", unitName: "" },

        {
          name: "Количество квартир (счетчиков)",
          value: "0",
          unitName: "",
        },
        { name: "Способ монтажа", value: "Накладной", unitName: "" },
        {
          name: "Возможно настенное крепление",
          value: "Да",
          unitName: "",
        },
        { name: "Встраивается в стену", value: "Нет", unitName: "" },

        { name: "Климатическое исполнение", value: "УХЛ3", unitName: "" },
        { name: "Толщина металла, мм", value: "0,8", unitName: "мм" },

        {
          name: "Соответствие ГОСТ/МЭК/ТУ",
          value: "ТУ 3434-002-52681400-2019",
          unitName: "",
        },
        { name: "Ед. измерения", value: "шт.", unitName: "" },
        { name: "Вес, кг", value: "", unitName: "кг" },
        { name: "Объем, м³", value: "", unitName: "м³" },
        { name: "Кратность", value: "1", unitName: "" },
        { name: "Срок службы, лет", value: "25", unitName: "лет" },
        { name: "Срок изготовления", value: "10-15 дней", unitName: "" },
        {
          name: "Гарантийный срок хранения",
          value: "3 года",
          unitName: "",
        },
        { name: "Гарантийный срок, мес", value: "36", unitName: "мес" },
        { name: "Слаботочный отсек", value: "Нет", unitName: "" },
        { name: "Высота", value: "995", unitName: "мм" },
        { name: "Шиоина", value: "645", unitName: "мм" },
        { name: "Глубина", value: "160", unitName: "мм" },
      ],
    },
    {
      name: "Кожух щэ для этажного щита универсальный RAL7024 (995x945x160)",
      categoryName: "Кожух щэ для этажного щита",
      article: "kozhukh-3",
      basePrice: 0,
      manufacturingTime: "10-15 дней",
      stock: 0,
      attributes: [
        { name: "Производитель", value: "Капитал Строй", unitName: "" },
        { name: "Страна", value: "Россия", unitName: "" },
        {
          name: "Глубина установочная (встраиваемая), мм",
          value: "160",
          unitName: "мм",
        },
        { name: "Материал изделия", value: "Сталь листовая", unitName: "" },
        { name: "Цвет", value: "Графит RAL7024", unitName: "" },
        {
          name: "Отделка поверхности",
          value: "С порошковым покрытием",
          unitName: "",
        },
        { name: "Количество дверей", value: "3", unitName: "" },

        {
          name: "Количество квартир (счетчиков)",
          value: "0",
          unitName: "",
        },
        { name: "Способ монтажа", value: "Накладной", unitName: "" },
        {
          name: "Возможно настенное крепление",
          value: "Да",
          unitName: "",
        },
        { name: "Встраивается в стену", value: "Нет", unitName: "" },

        { name: "Климатическое исполнение", value: "УХЛ3", unitName: "" },
        { name: "Толщина металла, мм", value: "0,8", unitName: "мм" },

        {
          name: "Соответствие ГОСТ/МЭК/ТУ",
          value: "ТУ 3434-002-52681400-2019",
          unitName: "",
        },
        { name: "Ед. измерения", value: "шт.", unitName: "" },
        { name: "Вес, кг", value: "", unitName: "кг" },
        { name: "Объем, м³", value: "", unitName: "м³" },
        { name: "Кратность", value: "1", unitName: "" },
        { name: "Срок службы, лет", value: "25", unitName: "лет" },
        { name: "Срок изготовления", value: "10-15 дней", unitName: "" },
        {
          name: "Гарантийный срок хранения",
          value: "3 года",
          unitName: "",
        },
        { name: "Гарантийный срок, мес", value: "36", unitName: "мес" },
        { name: "Слаботочный отсек", value: "Да", unitName: "" },
        { name: "Высота", value: "995", unitName: "мм" },
        { name: "Шиоина", value: "945", unitName: "мм" },
        { name: "Глубина", value: "160", unitName: "мм" },
      ],
    },
  ];
  const loadedProducts = [];
  const failedProducts = [];
  let loadedMediaFiles = 0;

  for (const item of productsData) {
    try {
      // Проверка наличия categoryName
      if (!item.categoryName) {
        throw new Error(
          `Отсутствует название категории для продукта: ${item.name}`
        );
      }

      // Поиск или создание категории
      const categorySlug = slugify(item.categoryName, {
        lower: true,
        strict: true,
      });
      console.log("Попытка upsert категории:", {
        categoryName: item.categoryName,
        generatedSlug: categorySlug,
      });

      const existingCategory = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });
      console.log("Существующая категория в БД:", existingCategory);

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
      console.log("Upsert категории выполнен:", category);

      // Проверка существования продукта по article и выполнение upsert
      const productSlug = slugify(item.article, { lower: true, strict: true });
      const existingProduct = await prisma.product.findUnique({
        where: { article: item.article },
      });
      console.log("Существующий продукт в БД:", existingProduct);

      const product = await prisma.product.upsert({
        where: { article: item.article },
        update: {
          name: item.name,
          slug: productSlug,
          categoryId: category.id,
          categorySlug: category.slug,
          basePrice: item.basePrice,
          manufacturingTime: item.manufacturingTime,
          stock: item.stock,
          visibility: true,
        },
        create: {
          name: item.name,
          slug: productSlug,
          article: item.article,
          categoryId: category.id,
          categorySlug: category.slug,
          basePrice: item.basePrice,
          manufacturingTime: item.manufacturingTime,
          stock: item.stock,
          visibility: true,
        },
      });
      console.log("Upsert продукта выполнен:", product);

      // Обработка атрибутов
      for (const attr of item.attributes || []) {
        try {
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

          const valueSlug = slugify(attr.value, { lower: true, strict: true });
          const value = await prisma.attributeValue.upsert({
            where: {
              attributeId_name: {
                attributeId: attribute.id,
                name: attr.value,
              },
            },
            update: {},
            create: {
              attributeId: attribute.id,
              name: attr.value,
              slug: valueSlug,
            },
          });

          // Проверка существования ProductAttribute
          const existingProductAttribute =
            await prisma.productAttribute.findUnique({
              where: {
                productId_attributeId_attributeValueId: {
                  productId: product.id,
                  attributeId: attribute.id,
                  attributeValueId: value.id,
                },
              },
            });

          if (!existingProductAttribute) {
            await prisma.productAttribute.create({
              data: {
                productId: product.id,
                attributeId: attribute.id,
                attributeValueId: value.id,
                attributeName: attr.name,
                attributeValueName: attr.value,
              },
            });
            console.log(
              `Атрибут добавлен для продукта ${item.name}: ${attr.name}=${attr.value}`
            );
          } else {
            console.log(
              `Атрибут уже существует для продукта ${item.name}: ${attr.name}=${attr.value}`
            );
          }
        } catch (attrError) {
          console.error(
            `Ошибка при обработке атрибута для продукта ${item.name}:`,
            attrError
          );
          throw new Error(`Ошибка атрибута: ${attrError.message}`);
        }
      }

      // Обработка медиафайлов
      if (item.mediaFiles && item.mediaFiles.length > 0) {
        for (const media of item.mediaFiles) {
          try {
            if (!media.type || !media.url) {
              throw new Error(
                `Некорректные данные медиафайла: type=${media.type}, url=${media.url}`
              );
            }

            // Проверка существования медиафайла
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
              console.log(
                `Медиафайл добавлен для продукта ${item.name}: ${media.url}`
              );
            } else {
              console.log(
                `Медиафайл уже существует для продукта ${item.name}: ${media.url}`
              );
            }
          } catch (mediaError) {
            console.error(
              `Ошибка при добавлении медиафайла для продукта ${item.name}:`,
              mediaError
            );
            failedProducts.push({
              name: item.name,
              article: item.article,
              reason: `Ошибка медиафайла: ${mediaError.message}`,
            });
          }
        }
      }

      successfulProducts.push(item.name);
    } catch (error) {
      console.error(
        `Ошибка при обработке продукта ${item.name} (${item.article}):`,
        error
      );
      failedProducts.push({
        name: item.name,
        article: item.article,
        reason: error.message,
      });
    }
  }

  // Вывод статистики
  console.log("\n=== Статистика загрузки ===");
  console.log(`Успешно загружено продуктов: ${successfulProducts.length}`);
  console.log(`Успешно загружено медиафайлов: ${loadedMediaFiles}`);
  console.log(`Не загружено продуктов: ${failedProducts.length}`);
  if (failedProducts.length > 0) {
    console.log("\nНе загруженные продукты:");
    failedProducts.forEach((failed, index) => {
      console.log(
        `${index + 1}. Продукт: ${failed.name} (Артикул: ${failed.article})`
      );
      console.log(`   Причина: ${failed.reason}`);
    });
  }
}

main()
  .catch((e) => {
    console.error("Ошибка выполнения скрипта:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
