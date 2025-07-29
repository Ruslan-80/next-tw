import { PrismaClient } from "@prisma/client";

import slugify from "slugify";

// Убедитесь, что в package.json указано: "type": "module"

const prisma = new PrismaClient();

// Последовательность очистки таблиц с учётом зависимостей
const tables = [
    "CartItem",
    "Cart",
    "Order",
    "ProductAttribute",
    "ProductVariation",
    "MediaFile",
    "ProductTag",
    "CategoryTag",
    "Product",
    "AttributeValue",
    "Attribute",
    "Category",
    "VerificationCode",
    "User",
    "TopSlider",
];

async function resetDatabase() {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;

    for (const table of tables) {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`${table}\`;`);
    }

    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
}

async function main() {
    await resetDatabase();

    // Создаём категории
    const categoryNames = [
        "Главные распределительные щиты ГРЩ",
        "Шкафы управления с частотным преобразователями ШУП",
        "Вводно-распределительные устройства ВРУ",
        "Шкафы автоматизации",
        "Щиты силовые",
        "Шкафы автоматического резерва АВР",
        "Пункты распределительные ПР",
        "Панели управления",
        "Устройства компенсации реактивной мощности УКРМ",
    ];

    const categories = [];
    for (const name of categoryNames) {
        const slug = slugify(name, { lower: true, strict: true });
        const category = await prisma.category.create({
            data: {
                name,
                fullName: name,
                slug,
                description: `${name} - краткое описание`,
                fullDescription: `${name} - полное подробное описание`,
                imageUrl: `/images/categories/${slug}.jpg`,
                titleSeo: `${name} - SEO заголовок`,
                descriptionSeo: `${name} - SEO описание`,
            },
        });
        categories.push(category);
    }

    // Данные товаров
    const productsData = [
        {
            name: "ВРУ1-11-10 УХЛ4",
            categoryName: "Вводно-распределительные устройства ВРУ",
            article: "VRU1-11-10",
            basePrice: 24500,
            manufacturingTime: "5 дней",
            stock: 8,
            attributes: [
                {
                    name: "Номинальное напряжение",
                    value: "380",
                    unitName: "Вольт",
                },
                { name: "Номинальный ток", value: "100", unitName: "Ампер" },
                { name: "Степень защиты", value: "IP54", unitName: "IP" },
            ],
        },
        {
            name: "ВРУ1-12-20 УХЛ4",
            categoryName: "Вводно-распределительные устройства ВРУ",
            article: "VRU1-12-20",
            basePrice: 26500,
            manufacturingTime: "7-10 дней",
            stock: 3,
            attributes: [
                {
                    name: "Номинальное напряжение",
                    value: "380",
                    unitName: "Вольт",
                },
                { name: "Номинальный ток", value: "250", unitName: "Ампер" },
                { name: "Степень защиты", value: "IP31", unitName: "IP" },
            ],
        },
        // Добавьте остальные товары аналогично
    ];

    for (const item of productsData) {
        const category = categories.find(c => c.name === item.categoryName);
        if (!category)
            throw new Error(`Category not found: ${item.categoryName}`);

        const product = await prisma.product.create({
            data: {
                name: item.name,
                slug: slugify(item.article, { lower: true, strict: true }),
                article: item.article,
                categoryId: category.id,
                categorySlug: category.slug,
                basePrice: item.basePrice,
                manufacturingTime: item.manufacturingTime,
                stock: item.stock,
                visibility: true,
            },
        });

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

            const valueSlug = slugify(attr.value, {
                lower: true,
                strict: true,
            });
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

            await prisma.productAttribute.create({
                data: {
                    productId: product.id,
                    attributeId: attribute.id,
                    attributeValueId: value.id,
                    attributeName: attr.name,
                    attributeValueName: attr.value,
                },
            });
        }
    }

    // Слайдер
    await prisma.topSlider.createMany({
        data: [
            { imageUrl: "/images/catalog/ser_1.png", order: 1, slug: "slide1" },
            { imageUrl: "/images/catalog/ser_2.png", order: 2, slug: "slide2" },
            { imageUrl: "/images/catalog/ser_3.png", order: 3, slug: "slide3" },
        ],
    });
}

main()
    .catch(e => {
        console.error("Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
