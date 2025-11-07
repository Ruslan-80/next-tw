import fs from "fs/promises";
import path from "path";

async function generateBlogsJson() {
  try {
    // Папка, где лежат файлы статей (например blog1.jsx, blog2.jsx)
    const postsDir = path.join(
      process.cwd(),
      "app",
      "(main)",
      "blogs",
      "posts"
    );

    // Получаем список файлов
    const files = await fs.readdir(postsDir);

    // Оставляем только .jsx (или .mdx, если будут такие)
    const postFiles = files.filter((file) => file.endsWith(".jsx"));

    // Извлекаем slug (например blog1.jsx → blog1)
    const slugs = postFiles.map((file) => path.parse(file).name);

    // Формируем JSON структуру
    const result = {
      posts: slugs,
      sitemapPaths: slugs.map((slug) => `/blogs/${slug}`),
    };

    // Сохраняем в public/blogs.json
    const outputPath = path.join(process.cwd(), "public", "blogs.json");
    await fs.writeFile(outputPath, JSON.stringify(result, null, 2), "utf8");

    console.log(`✅ Generated blogs.json with ${slugs.length} posts`);
  } catch (error) {
    console.error("❌ Error generating blogs.json:", error);
    process.exit(1);
  }
}

generateBlogsJson();
