import { prisma } from "@/lib/prisma";
import { getProductsByCategory } from "./actions";
import Filters from "./Filters";
import ProductList from "@/components/shared/ProductList";
import Breadcrumbs from "@/components/Breadcrumbs";
import Subcategories from "@/components/Subcategories";
import Link from "next/link";
import seoMetadata from "@/app/data/seoMetadata.json"; // Импортируем JSON-файл

// Функция для генерации метаданных
export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  // Разбираем slug для извлечения значения kolichestvo-kvartir-schetchikov
  let baseSlug = slug;
  let apartmentCount = null;
  const apartmentMatch = slug.match(/-na-(\d+)-kvartiry$/);
  if (apartmentMatch) {
    apartmentCount = apartmentMatch[1];
    baseSlug = slug.replace(/-na-\d+-kvartiry$/, "");
    resolvedSearchParams["kolichestvo-kvartir-schetchikov"] = apartmentCount;
  }

  const category = await prisma.category.findUnique({
    where: { slug: baseSlug },
    select: {
      name: true,
      titleSeo: true,
      descriptionSeo: true,
    },
  });

  if (!category) {
    return {
      title: "Категория не найдена | ЭЛЕКТРОЩИТ-ПРО",
      description: "Запрашиваемая категория не существует.",
    };
  }

  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  // Получаем SEO-данные из JSON
  let title, description;
  if (
    apartmentCount &&
    seoMetadata[baseSlug]?.["kolichestvo-kvartir-schetchikov"]?.[apartmentCount]
  ) {
    title =
      seoMetadata[baseSlug]["kolichestvo-kvartir-schetchikov"][apartmentCount]
        .title;
    description =
      seoMetadata[baseSlug]["kolichestvo-kvartir-schetchikov"][apartmentCount]
        .description;
  } else {
    // Fallback к дефолтным значениям из JSON или базы
    title =
      seoMetadata[baseSlug]?.default?.title ||
      category.name + " | ЭЛЕКТРОЩИТ-ПРО";
    description =
      seoMetadata[baseSlug]?.default?.description ||
      category.descriptionSeo ||
      `Купить товары из категории ${category.name} по выгодным ценам.`;
  }

  // console.log(title);

  if (page > 1) {
    title = `${title} - Страница ${page}`;
  }

  const canonicalUrl = apartmentCount
    ? `/catalog/${slug}`
    : `/catalog/${baseSlug}${page > 1 ? `?page=${page}` : ""}`;

  return {
    metadataBase: new URL("https://your-site.com"),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: "/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/default-og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  // Разбираем slug для извлечения значения kolichestvo-kvartir-schetchikov
  let baseSlug = slug;
  let apartmentCount = null;
  const apartmentMatch = slug.match(/-na-(\d+)-kvartiry$/);
  if (apartmentMatch) {
    apartmentCount = apartmentMatch[1];
    baseSlug = slug.replace(/-na-\d+-kvartiry$/, "");
    resolvedSearchParams["kolichestvo-kvartir-schetchikov"] = apartmentCount;
  }

  const category = await prisma.category.findUnique({
    where: { slug: baseSlug },
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

  const breadcrumbs = [];
  let currentCategory = category;
  while (currentCategory) {
    breadcrumbs.unshift({
      name: currentCategory.name,
      slug: currentCategory.slug,
    });
    currentCategory = currentCategory.parent;
  }

  const { products, totalProducts, totalPages, currentPage } =
    await getProductsByCategory(baseSlug, resolvedSearchParams);

  if (currentPage > totalPages && totalPages > 0) {
    return <p className="text-center py-8">Страница не найдена</p>;
  }

  const getPageUrl = (page) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(resolvedSearchParams)) {
      if (
        key !== "page" &&
        key !== "kolichestvo-kvartir-schetchikov" &&
        value
      ) {
        params.set(key, value);
      }
    }
    params.set("page", page);
    const base = apartmentCount ? `/catalog/${slug}` : `/catalog/${baseSlug}`;
    return `${base}?${params.toString()}`;
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
        {apartmentCount
          ? `${category.name} на ${apartmentCount} квартиры`
          : category.name}
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
            baseUrl={`/catalog/${baseSlug}`}
            categorySlug={baseSlug}
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
