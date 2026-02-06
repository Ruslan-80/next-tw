// Функция для получения slug продуктов из вашего внутреннего API
export const dynamic = "force-dynamic";
export async function getProductSlugs() {
  try {
    const response = await fetch(`/api/admin/sitemap`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch sitemap data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // const siteUrl = "http://172.16.10.216:3000";
    const siteUrl = "https://electroshit-pro.ru";

    // Форматируем данные для sitemap.xml
    return data.map((product) => ({
      loc: `${siteUrl}/product/${product.slug}`,
      lastmod: product.updatedAt,
      priority: 0.7,
      changefreq: "weekly",
    }));
  } catch (error) {
    console.error("Error fetching product slugs for sitemap:", error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
}
