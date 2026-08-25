// app/api/admin/import/preview/route.js
import ExcelJS from "exceljs";
import { PrismaClient } from "@prisma/client";
import { TABLE_CONFIGS } from "@/lib/schemaConfig";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const tableName = formData.get("tableName");

    const buffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    const headers = [];
    const rows = [];
    const errors = [];

    worksheet.getRow(1).eachCell((cell, colNumber) => {
      headers[colNumber] = cell.value?.toString().trim();
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const rowData = {};
      row.eachCell((cell, colNumber) => {
        const colName = headers[colNumber];
        if (colName) rowData[colName] = cell.value;
      });

      // Валидация типов и связей
      const rowErrors = [];

      // Проверка обязательного числового ID для существующих записей
      if (rowData.id && isNaN(Number(rowData.id))) {
        rowErrors.push('Поле "id" должно быть числом');
      }

      // Пример проверки связей (например, categoryId в Product)
      if (tableName === "product" && rowData.categoryId) {
        if (isNaN(Number(rowData.categoryId))) {
          rowErrors.push("categoryId должен быть числом");
        }
      }

      // Проверка валидности JSON
      const config = TABLE_CONFIGS[tableName];
      config?.jsonFields?.forEach((jsonCol) => {
        if (rowData[jsonCol] && typeof rowData[jsonCol] === "string") {
          try {
            JSON.parse(rowData[jsonCol]);
          } catch (e) {
            rowErrors.push(`Некорректный JSON в поле "${jsonCol}"`);
          }
        }
      });

      rows.push({
        rowNumber,
        data: rowData,
        errors: rowErrors,
        isValid: rowErrors.length === 0,
      });
    });

    return new Response(
      JSON.stringify({
        totalRows: rows.length,
        validRowsCount: rows.filter((r) => r.isValid).length,
        hasErrors: rows.some((r) => !r.isValid),
        rows,
      }),
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
