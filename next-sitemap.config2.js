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
    const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf-8"));

    const productPaths = products.map((product) => ({
      loc: `${siteUrl}/product/${product.slug}`,
      lastmod: product.updatedAt,
      priority: 0.7,
      changefreq: "weekly",
    }));

    const categoryPaths = categories.map((category) => ({
      loc: `${siteUrl}/catalog/${category.slug}`,
      lastmod: category.updatedAt,
      priority: 0.8,
      changefreq: "weekly",
    }));

    return [...productPaths, ...categoryPaths];
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
    // Эта функция будет применяться ко всем статически сгенерированным путям
    return {
      loc: path,
      changefreq: "daily",
      priority: 0.7,
      lastmod: cfg.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default config;
