// next-sitemap.config.js
import fs from "fs";
import path from "path";
import nextConfig from "./next.config.mjs";

const siteUrl = "https://electroshit-pro.ru";

/* ------------------------------------------------------------------ */
/*  Вытаскиваем source-URL из next.config.mjs                         */
/* ------------------------------------------------------------------ */

// redirects() → эти URL попадут в exclude (в sitemap им не место)
const redirectSources = ((await nextConfig.redirects?.()) ?? [])
  .map((r) => r.source)
  .filter(Boolean);

// rewrites() → эти URL попадут в additionalPaths как публичные страницы
// (например: /catalog/uerk, /promotions и т.д.)
const rewriteSources = ((await nextConfig.rewrites?.()) ?? [])
  .map((r) => r.source)
  .filter((s) => s && !s.includes(":")); // без динамических сегментов

/* ------------------------------------------------------------------ */
/*  Утилита безопасного чтения JSON                                   */
/* ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ */
  /*  Исключения                                                        */
  /* ------------------------------------------------------------------ */
  exclude: [
    "/*?*",
    "/admin*",
    "/test*",
    "/landing*",
    "/search*",
    "/vng*",
    "/api*",
    "/blogs*",

    // source-URL из redirects() в next.config.mjs
    ...redirectSources,
  ],

  /* ------------------------------------------------------------------ */
  /*  Дополнительные пути                                               */
  /* ------------------------------------------------------------------ */
  additionalPaths: async () => {
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
     *   Для lastmod используем стабильную дату — начало текущего месяца,
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

    /* ---------- Rewrite-URL из next.config.mjs ----------
     *   Публичные адреса вроде /catalog/uerk, /promotions и т.д.
     *   Они отдают 200 — индексируем.
     */
    const rewritePaths = rewriteSources.map((s) => ({
      loc: `${siteUrl}${s}`,
      lastmod: nowIso,
      priority: 0.8,
      changefreq: "weekly",
    }));

    /* ---------- Блоги ---------- */
    const blogPaths = (blogsData.sitemapPaths || []).map((p) => ({
      loc: `${siteUrl}${p}`,
      lastmod: nowIso,
      priority: 0.5,
      changefreq: "monthly",
    }));

    /* ---------- Мерж + дедуп ---------- */
    const all = [
      ...productPaths,
      ...categoryPaths,
      ...filterPaths,
      ...rewritePaths,
      ...blogPaths,
    ];

    const seen = new Set();
    return all.filter((entry) => {
      if (seen.has(entry.loc)) return false;
      seen.add(entry.loc);
      return true;
    });
  },

  /* ------------------------------------------------------------------ */
  /*  Robots.txt                                                        */
  /* ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------ */
  /*  Трансформация для авто-обнаруженных страниц                       */
  /*  Не перезатираем priority / changefreq / lastmod, если они уже     */
  /*  пришли из additionalPaths. Иначе все записи получат одинаковые    */
  /*  значения 0.7 / daily / today.                                     */
  /* ------------------------------------------------------------------ */
  transform: async (cfg, path, page) => ({
    loc: path,
    changefreq: page?.changefreq || "daily",
    priority: page?.priority ?? 0.7,
    lastmod: page?.lastmod || new Date().toISOString(),
  }),
};

export default config;
