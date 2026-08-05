import { PrismaClient } from "@prisma/client";
import ExcelJS from "exceljs";

const prisma = new PrismaClient();

async function importPriceFromExcel(buffer) {
  try {
    console.log("Starting import...");

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    // Берем первый лист книги
    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      throw new Error("No worksheets found in the Excel file");
    }

    // Считываем заголовки из первой строки
    const headers = {};
    const headerRow = worksheet.getRow(1);

    headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (cell.value) {
        // Приводим к строке и удаляем лишние пробелы
        headers[colNumber] = String(cell.value).trim();
      }
    });

    // Проверяем наличие ключевого поля article в заголовках
    const hasArticleHeader = Object.values(headers).includes("article");
    if (!hasArticleHeader) {
      throw new Error("Header row must contain 'article' column");
    }

    let updatedCount = 0;
    let skippedCount = 0;

    // Итерируемся со 2-й строки (пропуская заголовки)
    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const row = worksheet.getRow(rowNumber);

      // Пропускаем полностью пустые строки
      if (!row.hasValues) continue;

      const rowData = {};

      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        const header = headers[colNumber];
        if (!header) return;

        let value = cell.value;

        // Обработка сложных типов ExcelJS (формулы, гиперссылки, даты)
        if (value !== null && typeof value === "object") {
          if (value.result !== undefined) {
            value = value.result; // Результат формулы
          } else if (value.text !== undefined) {
            value = value.text; // Текст гиперссылки
          }
        }

        rowData[header] = value;
      });

      // Извлекаем article и приводим к строке
      const article = rowData.article ? String(rowData.article).trim() : null;

      if (!article) {
        skippedCount++;
        continue;
      }

      // Формируем объект для обновления (исключаем article из data)
      const { article: _, ...dataToUpdate } = rowData;

      try {
        await prisma.product.update({
          where: { article },
          data: dataToUpdate,
        });
        console.log(`Updated product with article: ${article}`);
        updatedCount++;
      } catch (err) {
        console.warn(`Failed to update article ${article}:`, err.message);
        skippedCount++;
      }
    }

    console.log(
      `Import completed! Updated: ${updatedCount}, Skipped: ${skippedCount}`,
    );
    return {
      success: true,
      message: `Updated: ${updatedCount}, Skipped: ${skippedCount}`,
    };
  } catch (e) {
    console.error("Error during import:", e);
    return { success: false, message: e.message };
  } finally {
    await prisma.$disconnect();
  }
}

export { importPriceFromExcel };
