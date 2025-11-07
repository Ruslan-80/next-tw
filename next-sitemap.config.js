import fs from "fs";
import path from "path";

const siteUrl = "https://electroshit-pro.ru";

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
  ],

  additionalPaths: async () => {
    const productsPath = path.resolve(process.cwd(), "public/products.json");
    const categoriesPath = path.resolve(
      process.cwd(),
      "public/categories.json"
    );
    const blogsPath = path.resolve(process.cwd(), "public/blogs.json");

    // ---------- Загрузка JSON ----------
    const products = fs.existsSync(productsPath)
      ? JSON.parse(fs.readFileSync(productsPath, "utf-8"))
      : [];

    const categoriesData = fs.existsSync(categoriesPath)
      ? JSON.parse(fs.readFileSync(categoriesPath, "utf-8"))
      : { categories: [], filters: [], sitemapPaths: [] };

    const blogsData = fs.existsSync(blogsPath)
      ? JSON.parse(fs.readFileSync(blogsPath, "utf-8"))
      : { sitemapPaths: [] };

    // ---------- Продукты ----------
    const productPaths = products.map((product) => ({
      loc: `${siteUrl}/product/${product.slug}`,
      lastmod: product.updatedAt || new Date().toISOString(),
      priority: 0.7,
      changefreq: "weekly",
    }));

    // ---------- Категории ----------
    const categoryPaths = (categoriesData.categories || []).map((cat) => ({
      loc: `${siteUrl}/catalog/${cat.slug}`,
      lastmod: cat.updatedAt || new Date().toISOString(),
      priority: 0.8,
      changefreq: "weekly",
    }));

    // ---------- Фильтры (вариации категорий) ----------
    const filterPaths = (categoriesData.filters || []).map((slug) => ({
      loc: `${siteUrl}/catalog/${slug}`,
      lastmod: new Date().toISOString(),
      priority: 0.6,
      changefreq: "monthly",
    }));

    // ---------- Блоги ----------
    const blogPaths = (blogsData.sitemapPaths || []).map((pathUrl) => ({
      loc: `${siteUrl}${pathUrl}`,
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: "monthly",
    }));

    // ---------- Итог ----------
    return [...productPaths, ...categoryPaths, ...filterPaths, ...blogPaths];
  },

  // ---------- Robots.txt ----------
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

  // ---------- Общая трансформация ----------
  transform: async (cfg, path) => ({
    loc: path,
    changefreq: "daily",
    priority: 0.7,
    lastmod: cfg.autoLastmod ? new Date().toISOString() : undefined,
  }),
};

export default config;
