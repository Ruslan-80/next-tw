import { prisma } from "../lib/prisma.js";
import fs from "fs/promises";
import path from "path";

async function generateCategoriesJson() {
  const excludedCatalogNames = [
    "ustroystva-etazhnye",
    "uerm",
    "uerv",
    "uerb",
    "uerk",
    "uern",
  ];

  // Ручной список фильтров (только slug)
  const manualFilters = [
    "shity-etazhnye-she-na-1-kvartiry",
    "shity-etazhnye-she-na-2-kvartiry",
    "shity-etazhnye-she-na-3-kvartiry",
    "shity-etazhnye-she-na-4-kvartiry",
    "shity-etazhnye-she-na-5-kvartir",
    "shity-etazhnye-she-na-6-kvartir",
    "shity-etazhnye-she-na-7-kvartir",
    "shity-etazhnye-she-na-8-kvartir",
    "shity-etazhnye-she-na-9-kvartir",
    "shity-etazhnye-she-na-10-kvartir",
    "shity-etazhnye-she-na-12-kvartir",
    "shity-etazhnye-she-vstraivaemye",
    "shity-etazhnye-she-bez-okon",
    "shity-etazhnye-she-bez-slabotochnogo-otseka",
    "shity-etazhnye-she-so-slabotochnym-otsekom",
    "shity-etazhnye-she-nakladnye",
  ];
  try {
    const categories = await prisma.category.findMany({
      where: {
        slug: {
          notIn: excludedCatalogNames,
        },
      },
      select: {
        id: true,
        slug: true,
        updatedAt: true,
      },
    });

    // Плоская структура: категории и фильтры на одном уровне
    const result = {
      categories: categories,
      filters: manualFilters,
      sitemapPaths: [
        // Категории (прямо в /catalog/)
        ...categories.map((cat) => `/catalog/${cat.slug}`),

        // Фильтры (тоже прямо в /catalog/)
        ...manualFilters.map((filter) => `/catalog/${filter}`),
      ],
    };

    const filePath = path.join(process.cwd(), "public", "categories.json");
    await fs.writeFile(filePath, JSON.stringify(result, null, 2), "utf8");

    console.log("Successfully generated public/categories.json");
    console.log(
      `Generated ${categories.length} categories and ${manualFilters.length} filters`
    );
    console.log(`Total sitemap paths: ${result.sitemapPaths.length}`);
  } catch (error) {
    console.error("Error generating categories.json:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

generateCategoriesJson();

// "postbuild": "node scripts/generate-categories.js && node scripts/generate-products.js && next-sitemap --config next-sitemap.config.js"
