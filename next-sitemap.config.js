import fs from "fs";
import path from "path";

const siteUrl = "http://172.16.10.216:3000";

const config = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "./public",
  exclude: ["/admin/*", "/test", "./landing/*", "./search/*", "/vng", "/api/*"],

  additionalPaths: async () => {
    const productsPath = path.resolve(process.cwd(), "public/products.json");
    const categoriesPath = path.resolve(
      process.cwd(),
      "public/categories.json"
    );

    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, "utf-8"));

    // Обрабатываем продукты
    const productPaths = products.map((product) => ({
      loc: `${siteUrl}/product/${product.slug}`,
      lastmod: product.updatedAt,
      priority: 0.7,
      changefreq: "weekly",
    }));

    // Обрабатываем плоскую структуру категорий и фильтров
    let sitemapPaths = [];

    if (
      categoriesData.sitemapPaths &&
      Array.isArray(categoriesData.sitemapPaths)
    ) {
      sitemapPaths = categoriesData.sitemapPaths.map((path) => {
        const isCategory = categoriesData.categories.some(
          (cat) => path === `/catalog/${cat.slug}`
        );

        return {
          loc: `${siteUrl}${path}`,
          lastmod: new Date().toISOString(),
          priority: isCategory ? 0.8 : 0.6, // Категории выше приоритетом
          changefreq: "weekly",
        };
      });
    }

    return [...productPaths, ...sitemapPaths];
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/test"],
      },
    ],
  },

  transform: async (cfg, path) => {
    return {
      loc: path,
      changefreq: "daily",
      priority: 0.7,
      lastmod: cfg.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default config;
