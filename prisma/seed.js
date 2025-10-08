import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  const productsData = [
    {
      name: "УЭРМ-4 на четыре квартиры",
      categoryName: "УЭРM",
      article: "uerm-4",
      basePrice: 9000,
      manufacturingTime: "10-15 дней",
      description:
        "Устройство этажное распределительное модульное УЭРМ-4 — современное электротехническое решение для многоквартирных домов, предназначенное для приема, распределения и учета электроэнергии на 4 квартиры. Конструкция позволяет легко адаптировать устройство под различные условия установки благодаря наличию надсечек под отверстия на боковинах модулей. УЭРМ-4 состоит из следующих основных элементов. Короб электротехнический стояковый (КЭТ) — для размещения силовых кабелей и оборудования. Короб связи и сигнализации (КСС) — для слаботочных систем. 4 ящика учетно-распределительных (ЯУР) — индивидуальные модули для каждой квартиры. Компенсаторы высоты — для регулировки под потолки разной высоты.",
      descriptionSeo:
        "УЭРМ 4 щиты: многоящичные устройства для учета и распределения электроэнергии 220В. Предназначены для жилых зданий. Производство под ключ и готовые решения в Москве.",
      titleSeo: "УЭРМ на 4 квартиры - купить от завода-изготовителя.",
      mediaFiles: [
        { type: "IMAGE", url: "/images/product/uerm/uerm_4_kartiry.png" },
        { type: "IMAGE", url: "/images/product/uerm/uerm_4_schema.jpg" },
      ],

      stock: 0,
      attributes: [
        { name: "Производитель", value: "Капитал Строй", unitName: "" },
        { name: "Страна", value: "Россия", unitName: "" },

        { name: "Материал изделия", value: "Сталь листовая", unitName: "" },
        { name: "Цвет", value: "Серый RAL7035", unitName: "" },
        {
          name: "Отделка поверхности",
          value: "С порошковым покрытием",
          unitName: "",
        },
        {
          name: "Количество квартир (счетчиков)",
          value: "4",
          unitName: "",
        },
        { name: "Способ монтажа", value: "накладной", unitName: "" },
        {
          name: "Возможно настенное крепление",
          value: "Да",
          unitName: "",
        },
        {
          name: "Подходит для сборок (наборный)",
          value: "Да",
          unitName: "",
        },
        { name: "Степень защиты (IP", value: "IP31", unitName: "IP" },
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
        { name: "Высота", value: "2700", unitName: "мм" },
        { name: "Ширина", value: "1300", unitName: "мм" },
        { name: "Глубина", value: "150", unitName: "мм" },
      ],
    },
    {
      name: "УЭРМ-41 на четыре квартиры",
      categoryName: "УЭРM",
      article: "uerm-41",
      basePrice: 15000,
      manufacturingTime: "10-15 дней",
      description:
        "Устройство этажное распределительное модульное УЭРМ-41 — специализированное электротехническое решение для многоквартирных домов с однофазным распределением электроэнергии на 4 квартиры. Это устройство разработано для эффективного учета и распределения электроэнергии мощностью до 11 кВт на квартиру, что делает его идеальным выбором для типовых жилых домов с однофазным подключением.УЭРМ-41 обеспечивает надежное электроснабжение с номинальным рабочим напряжением 380/220 В при частоте 50 Гц. Устройство рассчитано на номинальный ток до 63 А и имеет степень защиты IP31.Ключевой особенностью является однофазный ввод в каждую квартиру, ограничивающий потребляемую мощность до 11 кВт на квартиру. Корпус изготовлен из стали толщиной 0,8 мм с порошковым эпокси-полиэфирным покрытием RAL 7035 светло-серого цвета. Климатическое исполнение УХЛ3/УХЛ4 обеспечивает эксплуатацию в различных климатических условиях.",
      descriptionSeo:
        "Купить УЭРМ-41 – модульный распределительный щит для учета электроэнергии на 4 квартиры с однофазным вводом. Сборка под проект и готовые решения.",
      titleSeo: "УЭРМ-41 на четыре квартиры с однофазным вводом купить.",
      mediaFiles: [
        { type: "IMAGE", url: "/images/product/uerm/uerm_41.png" },
        { type: "IMAGE", url: "/images/product/uerm/uerm_4_schema.jpg" },
      ],
      stock: 0,
      attributes: [
        { name: "Производитель", value: "Капитал Строй", unitName: "" },
        { name: "Страна", value: "Россия", unitName: "" },

        { name: "Материал изделия", value: "Сталь листовая", unitName: "" },
        { name: "Цвет", value: "Серый RAL7035", unitName: "" },
        {
          name: "Отделка поверхности",
          value: "С порошковым покрытием",
          unitName: "",
        },
        {
          name: "Количество квартир (счетчиков)",
          value: "4",
          unitName: "",
        },
        { name: "Способ монтажа", value: "накладной", unitName: "" },
        {
          name: "Возможно настенное крепление",
          value: "Да",
          unitName: "",
        },
        {
          name: "Подходит для сборок (наборный)",
          value: "Да",
          unitName: "",
        },
        { name: "Степень защиты (IP", value: "IP31", unitName: "IP" },
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
        { name: "Высота", value: "2700", unitName: "мм" },
        { name: "Ширина", value: "1300", unitName: "мм" },
        { name: "Глубина", value: "150", unitName: "мм" },
      ],
    },
    {
      name: "УЭРМ-5 на пять квартир",
      categoryName: "УЭРM",
      article: "uerm-5",
      basePrice: 10000,
      manufacturingTime: "10-15 дней",
      description:
        "Устройство этажное распределительное модульное УЭРМ-5 — специализированное электротехническое решение для многоквартирных домов, предназначенное для приема, распределения и учета электроэнергии на 5 квартир. УЭРМ-5 состоит из следующих основных элементов: Короб электротехнический КЭТ-5У Короб связи и сигнализации КСС 5 ящиков учетно-распределительных ЯУР Компенсаторы высоты — регулировка до 200 мм Доступны различные конфигурации квартирных ящиков Корпус изготовлен из холоднокатанной стали толщиной 0,8 мм с порошковым эпокси-полиэфирным покрытием RAL 7035 светло-серого цвета с текстурой шагрень. Климатическое исполнение УХЛ4 обеспечивает эксплуатацию в условиях умеренного и холодного климата. Устройство рассчитано на прокладку медного или алюминиевого кабеля сечением до 95 мм².",
      descriptionSeo:
        "УЭРМ 5 устройство этажное распределительное модульное–– щиты для квартирных сетей. Производство, доставка, низкая цена.",
      titleSeo: "УЭРМ на 5 квартир купить с доставкой по Москве и М.О.",
      mediaFiles: [
        { type: "IMAGE", url: "/images/product/uerm/uerm_5_kartir.png" },
        { type: "IMAGE", url: "/images/product/uerm/uerm_5_schema.png" },
      ],
      stock: 0,
      attributes: [
        { name: "Производитель", value: "Капитал Строй", unitName: "" },
        { name: "Страна", value: "Россия", unitName: "" },

        { name: "Материал изделия", value: "Сталь листовая", unitName: "" },
        { name: "Цвет", value: "Серый RAL7035", unitName: "" },
        {
          name: "Отделка поверхности",
          value: "С порошковым покрытием",
          unitName: "",
        },
        {
          name: "Количество квартир (счетчиков)",
          value: "5",
          unitName: "",
        },
        { name: "Способ монтажа", value: "накладной", unitName: "" },
        {
          name: "Возможно настенное крепление",
          value: "Да",
          unitName: "",
        },
        {
          name: "Подходит для сборок (наборный)",
          value: "Да",
          unitName: "",
        },
        { name: "Степень защиты (IP", value: "IP31", unitName: "IP" },
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
        { name: "Высота", value: "2700", unitName: "мм" },
        { name: "Ширина", value: "1200", unitName: "мм" },
        { name: "Глубина", value: "150", unitName: "мм" },
      ],
    },
    {
      name: "УЭРМ-6 на шесть квартир",
      categoryName: "УЭРM",
      article: "uerm-6",
      basePrice: 10000,
      manufacturingTime: "10-15 дней",
      description:
        "Устройство этажное распределительное модульное УЭРМ-6 инновационное электротехническое решение для многоквартирных домов, предназначенное для приема, распределения и учета электроэнергии на 6 квартир. Устройство представляет собой модернизированную версию этажных электрощитов, способную обслуживать увеличенное количество потребителей. УЭРМ-6 обеспечивает надежное электроснабжение с номинальным рабочим напряжением 230/400 В при частоте 50 Гц. Устройство рассчитано на номинальный ток до 63-100 А и имеет степень защиты IP31. Корпус изготовлен из холоднокатанной стали толщиной 0,8 мм с полиэфирным порошковым покрытием RAL 7035 светло-серого цвета с текстурой шагрень. Климатическое исполнение УХЛ4 позволяет эксплуатировать устройство в условиях умеренного и холодного климата. Кабельная система рассчитана на прокладку медного или алюминиевого кабеля сечением до 95 мм². УЭРМ-6 состоит из следующих основных элементов: Короб электротехнический КЭТ-6У специализированный Короб связи и сигнализации КСС Компенсаторы высоты регулировка до 320 мм 6 ящиков учетно-распределительных ЯУР Доступны различные конфигурации квартирных ящиков.",
      descriptionSeo:
        "УЭРМ 6 – этажные распределительные модульные устройства для приема и учета электроэнергии. Производство, коробов КЭТ из металла, доставка  по РФ.",
      titleSeo: "УЭРМ на 6 квартир – купить под ключ",
      mediaFiles: [
        { type: "IMAGE", url: "/images/product/uerm/uerm_6_kvartir.png" },
        { type: "IMAGE", url: "/images/product/uerm/uerm-_6_schema.jpg" },
      ],
      stock: 0,
      attributes: [
        { name: "Производитель", value: "Капитал Строй", unitName: "" },
        { name: "Страна", value: "Россия", unitName: "" },

        { name: "Материал изделия", value: "Сталь листовая", unitName: "" },
        { name: "Цвет", value: "Серый RAL7035", unitName: "" },
        {
          name: "Отделка поверхности",
          value: "С порошковым покрытием",
          unitName: "",
        },
        {
          name: "Количество квартир (счетчиков)",
          value: "6",
          unitName: "",
        },
        { name: "Способ монтажа", value: "накладной", unitName: "" },
        {
          name: "Возможно настенное крепление",
          value: "Да",
          unitName: "",
        },
        {
          name: "Подходит для сборок (наборный)",
          value: "Да",
          unitName: "",
        },
        { name: "Степень защиты (IP", value: "IP31", unitName: "IP" },
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
        { name: "Высота", value: "2700", unitName: "мм" },
        { name: "Ширина", value: "1200", unitName: "мм" },
        { name: "Глубина", value: "150", unitName: "мм" },
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
          description: item.description || "",
          descriptionSeo: item.descriptionSeo || "",
          titleSeo: item.titleSeo || "",
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
          description: item.description || "",
          descriptionSeo: item.descriptionSeo || "",
          titleSeo: item.titleSeo || "",
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
