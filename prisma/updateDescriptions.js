import { PrismaClient } from "@prisma/client";
import fs from "fs/promises"; // Используем promises-версию fs для асинхронности
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  console.log("Начало обновления описаний товаров...");

  // Получаем путь к файлу data.json
  const filePath = path.join(__dirname, "dataProduct1.json");

  let productsToUpdate;
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    productsToUpdate = JSON.parse(fileContent);
  } catch (error) {
    console.error("Ошибка при чтении или парсинге файла data.json:", error);
    process.exit(1);
  }

  for (const productData of productsToUpdate) {
    const { article, description } = productData;

    try {
      const updatedProduct = await prisma.product.update({
        where: { article: article },
        data: { description: description },
      });
      console.log(
        `Успешно обновлен товар с артикулом ${updatedProduct.article}`
      );
    } catch (error) {
      if (error.code === "P2025") {
        console.warn(
          `Предупреждение: Товар с артикулом "${article}" не найден. Пропуск...`
        );
      } else {
        console.error(
          `Ошибка при обновлении товара с артикулом ${article}:`,
          error
        );
      }
    }
  }

  console.log("Обновление завершено.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
