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

  // console.log("generateMetadata: Input slug:", slug);

  // Разбираем slug
  let baseSlug = slug;
  let selectedAttribute = null;
  let selectedValue = null;

  // Проверяем все категории в seoMetadata
  let categoryMetadata = null;
  for (const categoryKey in seoMetadata) {
    for (const attrSlug in seoMetadata[categoryKey]) {
      if (attrSlug === "default") continue;
      for (const value in seoMetadata[categoryKey][attrSlug]) {
        const { urlSuffix } = seoMetadata[categoryKey][attrSlug][value];
        if (urlSuffix && slug.endsWith(urlSuffix)) {
          selectedAttribute = attrSlug;
          selectedValue = value;
          baseSlug = slug.replace(urlSuffix, "");
          categoryMetadata = seoMetadata[categoryKey];
          resolvedSearchParams[attrSlug] = value;
          break;
        }
      }
      if (selectedAttribute) break;
    }
    if (selectedAttribute) break;
  }

  // Если суффикс не найден, используем исходный slug как baseSlug
  if (!categoryMetadata) {
    categoryMetadata = seoMetadata[slug] || {};
  }

  // console.log(
  //   "generateMetadata: Parsed baseSlug:",
  //   baseSlug,
  //   "Selected Attribute:",
  //   selectedAttribute,
  //   "Selected Value:",
  //   selectedValue
  // );

  const category = await prisma.category.findUnique({
    where: { slug: baseSlug },
    select: {
      name: true,
      descriptionSeo: true,
    },
  });

  // console.log("generateMetadata: Category found:", category);

  if (!category) {
    console.error("Category not found for baseSlug:", baseSlug);
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
    selectedAttribute &&
    selectedValue &&
    categoryMetadata[selectedAttribute]?.[selectedValue]
  ) {
    title = categoryMetadata[selectedAttribute][selectedValue].title;
    description =
      categoryMetadata[selectedAttribute][selectedValue].description;
  } else {
    title =
      categoryMetadata.default?.title || `${category.name} | ЭЛЕКТРОЩИТ-ПРО`;
    description =
      categoryMetadata.default?.description ||
      category.descriptionSeo ||
      `Купить товары из категории ${category.name} по выгодным ценам.`;
  }

  if (page > 1) {
    title = `${title} - Страница ${page}`;
  }

  const canonicalUrl = `/catalog/${slug}${page > 1 ? `?page=${page}` : ""}`;

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

  // console.log("CategoryPage: Input slug:", slug);

  // Разбираем slug
  let baseSlug = slug;
  let selectedAttribute = null;
  let selectedValue = null;
  let h1Text = null;

  // Проверяем все категории в seoMetadata
  let categoryMetadata = null;
  for (const categoryKey in seoMetadata) {
    for (const attrSlug in seoMetadata[categoryKey]) {
      if (attrSlug === "default") continue;
      for (const value in seoMetadata[categoryKey][attrSlug]) {
        const { urlSuffix } = seoMetadata[categoryKey][attrSlug][value];
        if (urlSuffix && slug.endsWith(urlSuffix)) {
          selectedAttribute = attrSlug;
          selectedValue = value;
          baseSlug = slug.replace(urlSuffix, "");
          categoryMetadata = seoMetadata[categoryKey];
          resolvedSearchParams[attrSlug] = value;
          h1Text = categoryMetadata[attrSlug][value].h1;
          break;
        }
      }
      if (selectedAttribute) break;
    }
    if (selectedAttribute) break;
  }

  // Если суффикс не найден, используем исходный slug как baseSlug
  if (!categoryMetadata) {
    categoryMetadata = seoMetadata[slug] || {};
    h1Text = categoryMetadata.default?.h1;
  }

  // console.log(
  //   "CategoryPage: Parsed baseSlug:",
  //   baseSlug,
  //   "Selected Attribute:",
  //   selectedAttribute,
  //   "Selected Value:",
  //   selectedValue,
  //   "h1Text:",
  //   h1Text
  // );

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

  // console.log("CategoryPage: Category found:", category);

  if (!category) {
    console.error("Category not found for baseSlug:", baseSlug);
    return <p className="text-center py-8">Категория не найдена</p>;
  }

  // Fallback для h1, если не указано в seoMetadata.json
  const displaySuffix =
    selectedAttribute === "kolichestvo-kvartir-schetchikov"
      ? ` на ${selectedValue} квартиры`
      : selectedValue
      ? ` (${selectedValue})`
      : "";
  const finalH1 = h1Text || `${category.name}${displaySuffix}`;

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

  if (currentPage > totalPages && totalProducts > 0) {
    return <p className="text-center py-8">Страница не найдена</p>;
  }

  const getPageUrl = (page) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(resolvedSearchParams)) {
      if (key !== "page" && key !== selectedAttribute && value) {
        params.set(key, value);
      }
    }
    params.set("page", page);
    const base = selectedAttribute
      ? `/catalog/${baseSlug}${categoryMetadata[selectedAttribute][selectedValue].urlSuffix}`
      : `/catalog/${baseSlug}`;
    return `${base}?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-4">
      <Breadcrumbs items={breadcrumbs} />
      <div className="h-10">
        {totalPages > 1 && (
          <nav className="hidden lg:flex justify-center space-x-2">
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
                    ? "bg-blue-600 text-white"
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

      <h1 className="flex items-center justify-center text-base sm:text-2xl font-bold mb-6 mt-4">
        {finalH1}
      </h1>

      {category.children.length > 0 && (
        <Subcategories subcategories={category.children} />
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4">
          <div className="hidden md:block p-4">
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
      ) : (
        <ProductList products={products} />
      )}

      {totalPages > 1 && (
        <nav className="hidden lg:flex justify-center space-x-2">
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
                  ? "bg-blue-600 text-white"
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
