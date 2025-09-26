import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Экспорт товаров в Excel
export async function GET() {
  try {
    // 1. Получаем все товары с атрибутами
    const products = await prisma.product.findMany({
      where: { visibility: true }, // Только видимые товары
      include: {
        attributes: {
          include: {
            attribute: true,
            attributeValue: true,
          },
        },
      },
    });

    // 2. Собираем уникальные атрибуты для заголовков столбцов
    const attributeNames = new Set();
    products.forEach((product) => {
      product.attributes.forEach((attr) => {
        attributeNames.add(attr.attributeName);
      });
    });
    const headers = ["Артикул", "Название", ...Array.from(attributeNames)];

    // 3. Создаём Excel-файл
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Товары");

    // Добавляем заголовки
    worksheet.columns = headers.map((header) => ({
      header,
      key: header,
      width: 20,
    }));

    // Форматируем заголовки (жирный шрифт)
    worksheet.getRow(1).font = { bold: true };

    // 4. Формируем данные
    products.forEach((product) => {
      const row = { Артикул: product.article, Название: product.name };
      product.attributes.forEach((attr) => {
        row[attr.attributeName] = attr.attributeValueName;
      });
      worksheet.addRow(row);
    });

    // 5. Генерируем буфер и отдаём файл
    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="products.xlsx"',
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Ошибка экспорта:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
