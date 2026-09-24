// next-sitemap.config.js
import fs from "fs";
import path from "path";
import nextConfig from "./next.config.mjs";

const siteUrl = "https://electroshit-pro.ru";

// Вытащим все source-URL из redirects()
const redirectSources = ((await nextConfig.redirects?.()) ?? []).map(
  (r) => r.source,
);

const readJson = (relPath, fallback) => {
  const abs = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(abs)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(abs, "utf-8"));
  } catch {
    return fallback;
  }
};

const config = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "./public",
  exclude: [
    "/*?*",
    "/admin*",
    "/test*",
    "/landing*",
    "/search*",
    "/vng*",
    "/api*",
    "/blogs*",
    ...redirectSources, // ← автоматически
  ],

  additionalPaths: async () => {
    /* ---------- Загрузка JSON ---------- */
    const products = readJson("public/products.json", []);
    const categoriesData = readJson("public/categories.json", {
      categories: [],
      sitemapPaths: [],
    });
    const blogsData = readJson("public/blogs.json", { sitemapPaths: [] });

    const nowIso = new Date().toISOString();

    /* ---------- Продукты ---------- */
    const productPaths = products.map((product) => ({
      loc: `${siteUrl}/product/${product.slug}`,
      lastmod: product.updatedAt || nowIso,
      priority: 0.7,
      changefreq: "weekly",
    }));

    /* ---------- Категории (из БД, у них есть updatedAt) ---------- */
    const categoryPaths = (categoriesData.categories || []).map((cat) => ({
      loc: `${siteUrl}/catalog/${cat.slug}`,
      lastmod: cat.updatedAt || nowIso,
      priority: 0.8,
      changefreq: "weekly",
    }));

    // Set локаций категорий — чтобы отфильтровать их из sitemapPaths
    const categoryLocs = new Set(categoryPaths.map((c) => c.loc));

    /* ---------- Фильтры (ручные + SEO-фильтры + combinations) ----------
     *   Берём всё из sitemapPaths, кроме уже добавленных категорий.
     *   Для lastmod используем "стабильную" дату — начало текущего месяца,
     *   чтобы sitemap не показывал «всё обновилось сегодня».
     */
    const stableFilterLastmod = (() => {
      const d = new Date();
      return new Date(
        Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1),
      ).toISOString();
    })();

    const filterPaths = (categoriesData.sitemapPaths || [])
      .filter((p) => !categoryLocs.has(`${siteUrl}${p}`))
      .map((p) => ({
        loc: `${siteUrl}${p}`,
        lastmod: stableFilterLastmod,
        priority: 0.6,
        changefreq: "monthly",
      }));

    /* ---------- Блоги ---------- */
    const blogPaths = (blogsData.sitemapPaths || []).map((p) => ({
      loc: `${siteUrl}${p}`,
      lastmod: nowIso,
      priority: 0.5,
      changefreq: "monthly",
    }));

    /* ---------- Мерж + дедуп на всякий случай ---------- */
    const all = [
      ...productPaths,
      ...categoryPaths,
      ...filterPaths,
      ...blogPaths,
    ];
    const seen = new Set();
    return all.filter((entry) => {
      if (seen.has(entry.loc)) return false;
      seen.add(entry.loc);
      return true;
    });
  },

  /* ---------- Robots.txt ---------- */
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/*",
          "/test",
          "/landing/*",
          "/search/*",
          "/vng",
          "/api/*",
        ],
      },
    ],
  },

  /* ---------- Трансформация для авто-обнаруженных страниц ----------
   *   Не трогаем lastmod, если он уже есть — оставляем его undefined,
   *   чтобы next-sitemap сам поставил дату сборки, а не стёр поле.
   */
  transform: async (cfg, path) => ({
    loc: path,
    changefreq: "daily",
    priority: 0.7,
    lastmod: new Date().toISOString(),
  }),
};

export default config;
