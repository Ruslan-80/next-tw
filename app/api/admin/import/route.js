// app/api/admin/import/route.js
import ExcelJS from "exceljs";
import { PrismaClient } from "@prisma/client";
import { TABLE_CONFIGS } from "@/lib/schemaConfig";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const tableName = formData.get("tableName");

    if (!file || !tableName) {
      return new Response(
        JSON.stringify({ error: "Файл или имя таблицы не переданы" }),
        { status: 400 },
      );
    }

    const config = TABLE_CONFIGS[tableName] || { readOnly: [], jsonFields: [] };
    const buffer = await file.arrayBuffer();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    const headers = [];
    const rowsToProcess = [];

    // Читаем заголовки (1-я строка)
    worksheet.getRow(1).eachCell((cell, colNumber) => {
      headers[colNumber] = cell.value?.toString().trim();
    });

    // Читаем строки с данными
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Пропускаем заголовок

      const rowData = {};
      row.eachCell((cell, colNumber) => {
        const colName = headers[colNumber];
        if (!colName) return;

        let val = cell.value;

        // Если Excel возвращает объект (например, формулу или ссылку)
        if (val && typeof val === "object" && val.result !== undefined) {
          val = val.result;
        }

        // Парсинг JSON полей обратно в объект/массив
        if (config.jsonFields?.includes(colName) && typeof val === "string") {
          try {
            val = JSON.parse(val);
          } catch (e) {
            val = null;
          }
        }

        rowData[colName] = val;
      });

      if (Object.keys(rowData).length > 0) {
        rowsToProcess.push(rowData);
      }
    });

    // Безопасное сохранение в БД через транзакцию
    const results = await prisma.$transaction(async (tx) => {
      const updated = [];

      for (const item of rowsToProcess) {
        const recordId = item.id ? Number(item.id) : null;

        // Создаем копию данных без системных и readOnly полей
        const updatePayload = { ...item };
        config.readOnly.forEach((field) => delete updatePayload[field]);

        if (recordId) {
          // Обновляем запись по ID
          const res = await tx[tableName].update({
            where: { id: recordId },
            data: updatePayload,
          });
          updated.push(res);
        } else {
          // Если ID нет — создаем новую запись
          const res = await tx[tableName].create({
            data: updatePayload,
          });
          updated.push(res);
        }
      }
      return updated;
    });

    return new Response(
      JSON.stringify({ success: true, count: results.length }),
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
