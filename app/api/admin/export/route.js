// app/api/admin/export/route.js (или pages/api/admin/export.js)
import ExcelJS from "exceljs";
import { PrismaClient } from "@prisma/client";
import { TABLE_CONFIGS } from "@/lib/schemaConfig";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { tableName, selectedColumns } = await req.json();

    const config = TABLE_CONFIGS[tableName] || {
      readOnly: ["id"],
      restricted: [],
      jsonFields: [],
    };

    // Получаем данные из БД
    const records = await prisma[tableName].findMany();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(tableName);

    // 1. Формируем колонки
    worksheet.columns = selectedColumns.map((col) => ({
      header: col,
      key: col,
      width: 20,
    }));

    // 2. Стилизуем заголовок
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F2937" },
    };

    // 3. Заполняем данные и настраиваем защиту ячеек
    records.forEach((record) => {
      const rowData = {};
      selectedColumns.forEach((col) => {
        let value = record[col];
        // Если поле JSON — сериализуем в строку
        if (config.jsonFields?.includes(col) && value !== null) {
          value = JSON.stringify(value);
        }
        rowData[col] = value;
      });

      const row = worksheet.addRow(rowData);

      // Настройка защиты на уровне отдельных ячеек
      selectedColumns.forEach((col) => {
        const cell = row.getCell(col);
        const isReadOnly = config.readOnly.includes(col);

        if (isReadOnly) {
          cell.protection = { locked: true };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "E5E7EB" },
          }; // Серый фон
        } else {
          cell.protection = { locked: false }; // Разрешено для редактирования
        }
      });
    });

    // 4. Включаем защиту листа (блокирует только locked ячейки)
    await worksheet.protect("admin_secret_pass", {
      selectLockedCells: true,
      selectUnlockedCells: true,
      formatCells: false,
      insertRows: true,
      deleteRows: false,
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${tableName}_export.xlsx"`,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
