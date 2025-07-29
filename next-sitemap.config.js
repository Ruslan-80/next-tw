/** @type {import('next-sitemap').IConfig} */
import fs from "fs";
import path from "path";

export default {
  siteUrl: "https://electroshit-pro.ru",
  generateRobotsTxt: true,
  sitemapSize: 50000, // Максимум для крупных сайтов, можно уменьшить до 7000
  generateIndexSitemap: true, // Создавать индексный sitemap для нескольких файлов
  changefreq: "weekly", // Подходит для большинства корпоративных сайтов
  priority: 0.7, // Базовый приоритет
  exclude: ["/admin", "/api", "/order", "/cart", "/drafts/*"], // Исключить приватные страницы
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: "Googlebot",
        disallow: ["/admin", "/api", "/order", "/cart"],
      },
      {
        userAgent: "Yandex",
        disallow: ["/admin", "/api", "/order", "/cart"],
      },
    ],
    additionalSitemaps: [
      // Если есть дополнительные sitemap, например, для изображений
    ],
  },
  // Кастомизация URL (опционально)
  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === "/") {
      priority = 1.0; // Главная страница
      changefreq = "daily";
    } else if (path.includes("/product/") || path.includes("/catalog/")) {
      priority = 0.8; // Категории и продукты
      changefreq = "weekly";
    } else {
      priority = 0.5; // Остальные страницы
      changefreq = "monthly";
    }

    return {
      loc: path, // Путь страницы
      changefreq,
      priority,
      lastmod: new Date().toISOString(), // Дата последней модификации
    };
  },
  additionalPaths: async (config) => {
    const result = [];

    try {
      // Чтение данных из categories.json
      const categoriesPath = path.join(
        process.cwd(),
        "public",
        "categories.json"
      );
      const categoriesData = fs.readFileSync(categoriesPath, "utf8");
      const categories = JSON.parse(categoriesData);

      result.push(
        ...categories.map((catalog) => ({
          loc: `/catalog/${catalog.slug}`,
          lastmod: catalog.updatedAt || new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.8,
        }))
      );
    } catch (error) {
      console.error("Error reading categories.json for sitemap:", error);
    }

    // try {
    //   // Чтение данных из products.json
    //   const productsPath = path.join(process.cwd(), "public", "products.json");
    //   const productsData = fs.readFileSync(productsPath, "utf8");
    //   const products = JSON.parse(productsData);

    //   result.push(
    //     ...products.map((product) => ({
    //       loc: `/product/${product.slug || ""}`,
    //       lastmod: product.updatedAt || new Date().toISOString(),
    //       changefreq: "weekly",
    //       priority: 0.8,
    //     }))
    //   );
    // } catch (error) {
    //   console.error("Error reading products.json for sitemap:", error);
    // }

    return result;
  },
};
