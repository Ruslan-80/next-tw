// scripts/generate-categories.js
export const dynamic = "force-dynamic";
import { prisma } from "../lib/prisma.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

/* ------------------------------------------------------------------ */
/*  Поиск seoMetadata.json (в проекте встречается в разных местах)    */
/* ------------------------------------------------------------------ */
async function loadSeoMetadata() {
  const candidates = [
    path.join(process.cwd(), "app", "data", "seoMetadata.json"),
    path.join(process.cwd(), "data", "seoMetadata.json"),
    path.join(process.cwd(), "src", "app", "data", "seoMetadata.json"),
    path.join(process.cwd(), "src", "data", "seoMetadata.json"),
  ];
  for (const p of candidates) {
    try {
      const raw = await fs.readFile(p, "utf8");
      return JSON.parse(raw);
    } catch (_) {
      /* пробуем следующий */
    }
  }
  throw new Error(
    "seoMetadata.json не найден. Проверенные пути:\n" + candidates.join("\n"),
  );
}

/* ------------------------------------------------------------------ */
/*  Из одной категории seoMetadata собираем все SEO-URL её фильтров   */
/*  (одиночные + combinations)                                        */
/* ------------------------------------------------------------------ */
function buildFilterUrlsForCategory(categoryKey, categoryMeta) {
  const urls = new Set();

  // 1. Одиночные фильтры
  for (const attrSlug in categoryMeta) {
    if (
      attrSlug === "default" ||
      attrSlug === "combinations" ||
      attrSlug === "order"
    ) {
      continue;
    }
    const attrData = categoryMeta[attrSlug];
    if (!attrData || typeof attrData !== "object") continue;

    for (const value in attrData) {
      const info = attrData[value];
      if (info && info.urlSuffix) {
        urls.add(`/catalog/${categoryKey}${info.urlSuffix}`);
      }
    }
  }

  // 2. Комбинации (например «-250a-1-vvod», «-630a-s-avr»)
  if (Array.isArray(categoryMeta.combinations)) {
    for (const combo of categoryMeta.combinations) {
      if (combo?.urlSuffix) {
        urls.add(`/catalog/${categoryKey}${combo.urlSuffix}`);
      }
    }
  }

  return Array.from(urls);
}

/* ------------------------------------------------------------------ */
/*  Основной скрипт                                                   */
/* ------------------------------------------------------------------ */
async function generateCategoriesJson() {
  const excludedCatalogNames = ["uerb", "uerk", "uern"];

  // Оставляем ручной список — как fallback (например, если seoMetadata
  // отстаёт от жизни). Все дубликаты отсекутся через Set ниже.
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
    /* 1. Категории из БД ------------------------------------------------ */
    const categories = await prisma.category.findMany({
      where: {
        slug: { notIn: excludedCatalogNames },
      },
      select: { id: true, slug: true, updatedAt: true },
    });

    const dbSlugs = new Set(categories.map((c) => c.slug));

    /* 2. seoMetadata ---------------------------------------------------- */
    const seoMetadata = await loadSeoMetadata();

    const seoFilterPaths = [];
    for (const categoryKey in seoMetadata) {
      // фильтры строим только для категорий, которые реально есть в БД,
      // иначе получим sitemap с 404-страницами
      if (!dbSlugs.has(categoryKey)) continue;

      const urls = buildFilterUrlsForCategory(
        categoryKey,
        seoMetadata[categoryKey],
      );
      seoFilterPaths.push(...urls);
    }

    /* 3. Категории (страницы /catalog/{slug}) --------------------------- */
    const categoryPaths = categories.map((c) => `/catalog/${c.slug}`);

    /* 4. Ручные фильтры ------------------------------------------------ */
    const manualFilterPaths = manualFilters.map((f) => `/catalog/${f}`);

    /* 5. Мерж + дедуп --------------------------------------------------- */
    const sitemapPaths = Array.from(
      new Set([...categoryPaths, ...manualFilterPaths, ...seoFilterPaths]),
    );

    const result = {
      categories,
      filters: manualFilters,
      seoFilterPaths, // удобно для отладки
      sitemapPaths,
    };

    const filePath = path.join(process.cwd(), "public", "categories.json");
    await fs.writeFile(filePath, JSON.stringify(result, null, 2), "utf8");

    console.log(
      `✅ categories: ${categories.length}, ` +
        `manual filters: ${manualFilterPaths.length}, ` +
        `seo filters: ${seoFilterPaths.length}`,
    );
    console.log(`✅ total sitemap paths: ${sitemapPaths.length}`);
  } catch (error) {
    console.error("❌ Error generating categories.json:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateCategoriesJson();
}
