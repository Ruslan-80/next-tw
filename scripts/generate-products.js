import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

async function generateProductsJson() {
  try {
    // Получение данных из Prisma
    const products = await prisma.product.findMany({
      where: { visibility: true },
      select: {
        id: true,
        slug: true,
        updatedAt: true,
      },
    });

    // Путь к файлу products.json в папке public
    const filePath = path.join(process.cwd(), "public", "products.json");

    // Запись данных в файл
    await fs.writeFile(filePath, JSON.stringify(products, null, 2), "utf8");

    console.log("Successfully generated public/products.json");
  } catch (error) {
    console.error("Error generating products.json:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

generateProductsJson();
