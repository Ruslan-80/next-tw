import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

async function generateCategoriesJson() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        slug: true,
        updatedAt: true,
      },
    });

    const filePath = path.join(process.cwd(), "public", "categories.json");
    await fs.writeFile(filePath, JSON.stringify(categories, null, 2), "utf8");

    console.log("Successfully generated public/categories.json");
  } catch (error) {
    console.error("Error generating categories.json:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

generateCategoriesJson();
