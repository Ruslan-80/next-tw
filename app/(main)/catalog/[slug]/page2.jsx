import { prisma } from "@/lib/prisma";
import { getProductsByCategory } from "./actions";
import Filters from "./Filters";
import ProductList from "@/components/shared/ProductList";
import Breadcrumbs from "@/components/Breadcrumbs";
import Subcategories from "@/components/Subcategories";
import Link from "next/link";

// Функция для генерации метаданных
export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams; // Асинхронно получаем searchParams

  // Загружаем данные о категории для формирования метаданных
  const category = await prisma.category.findUnique({
    where: { slug },
    select: {
      name: true,
      descriptionSeo: true, // Предполагается, что в модели Category есть поле description
    },
  });

  if (!category) {
    return {
      title: "Категория не найдена | ЭЛЕКТРОЩИТ-ПРО",
      description: "Запрашиваемая категория не существует.",
    };
  }

  // Формируем текущую страницу из resolvedSearchParams
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  const title =
    page > 1
      ? `${category.name} - Страница ${page} | ЭЛЕКТРОЩИТ-ПРО`
      : `${category.name} | ЭЛЕКТРОЩИТ-ПРО`;

  const description = category.descriptionSeo
    ? category.descriptionSeo
    : `Купить товары из категории ${category.name} по выгодным ценам. Широкий ассортимент и быстрая доставка.`;

  // Формируем canonical URL
  const canonicalUrl = `/${slug}`;
  // page > 1 ? `/catalog/${slug}?page=${page}` : `/catalog/${slug}`;

  return {
    metadataBase: new URL("https://your-site.com"), // Замените на ваш реальный домен
    title,
    description,
    alternates: {
      canonical: canonicalUrl, // Относительный путь, так как metadataBase задан
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: "/default-og-image.jpg", // Укажите путь к изображению для Open Graph
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/default-og-image.jpg"], // Укажите изображение для Twitter
    },
    robots: {
      index: true, // Разрешаем индексацию
      follow: true,
    },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  // Загружаем текущую категорию, её иерархию и подкатегории
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      parent: {
        include: {
          parent: true,
        },
      },
      children: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!category) {
    return <p className="text-center py-8">Категория не найдена</p>;
  }

  // Формируем цепочку категорий для хлебных крошек
  const breadcrumbs = [];
  let currentCategory = category;
  while (currentCategory) {
    breadcrumbs.unshift({
      name: currentCategory.name,
      slug: currentCategory.slug,
    });
    currentCategory = currentCategory.parent;
  }

  // Получаем товары с пагинацией
  const { products, totalProducts, totalPages, currentPage } =
    await getProductsByCategory(slug, resolvedSearchParams);

  // Проверка на несуществующую страницу
  if (currentPage > totalPages && totalPages > 0) {
    return <p className="text-center py-8">Страница не найдена</p>;
  }

  // Формируем URL для пагинации, сохраняя существующие searchParams
  const getPageUrl = (page) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(resolvedSearchParams)) {
      if (key !== "page" && value) {
        params.set(key, value);
      }
    }
    params.set("page", page);
    return `/catalog/${slug}?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-4">
      <Breadcrumbs items={breadcrumbs} />
      <div className="h-10">
        {totalPages > 1 && (
          <nav className="flex justify-center space-x-2">
            {currentPage > 1 && (
              <Link
                href={getPageUrl(currentPage - 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Предыдущая
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={getPageUrl(page)}
                className={`px-4 py-2 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link
                href={getPageUrl(currentPage + 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Следующая
              </Link>
            )}
          </nav>
        )}
      </div>

      <h1 className="flex items-center justify-center text-2xl font-bold mb-6 mt-6">
        {category.name}
      </h1>

      {category.children.length > 0 && (
        <Subcategories subcategories={category.children} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4">
        <div className="p-4">
          <Filters
            totalProducts={totalProducts}
            attributeIds={category.filters}
            searchParams={resolvedSearchParams}
            baseUrl={`/catalog/${slug}`}
            categorySlug={slug}
          />
        </div>
        <ProductList products={products} />
      </div>
      {totalPages > 1 && (
        <nav className="flex justify-center space-x-2">
          {currentPage > 1 && (
            <Link
              href={getPageUrl(currentPage - 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Предыдущая
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={getPageUrl(page)}
              className={`px-4 py-2 rounded ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={getPageUrl(currentPage + 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Следующая
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
