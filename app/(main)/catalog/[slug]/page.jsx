export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "./actions";
import Filters from "./Filters";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductList from "@/components/shared/ProductList";
import Subcategories from "@/components/Subcategories";
import Pagination from "@/components/shared/Pagination";
import { parseSlug } from "@/utils/slugParser";
import PopularProducts from "@/components/PopularProduct";
import JsonLd from "@/components/JsonLdComponent";
import getCategoryJsonLd from "@/lib/categoryJsonLd";
import categoryComponents from "@/components/categoryBlocksMap";
import PopularNabor from "@/components/PopularNabor";
import RandomObjects from "@/components/object";

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  // Разбираем slug с помощью вспомогательной функции
  const { baseSlug, selectedAttribute, selectedValue, categoryMetadata } =
    parseSlug(slug, resolvedSearchParams);

  const category = await prisma.category.findUnique({
    where: { slug: baseSlug },
    select: {
      name: true,
      titleSeo: true,
      descriptionSeo: true,
      imageUrl: true,
    },
  });

  // console.log("Category in metadata:", category);

  let titleSeo = "";

  if (category) {
    // Если категория найдена, используем ее свойства
    titleSeo = category.titleSeo || "";
    // ... и другие свойства
  }
  //  else {
  //   // Если категория не найдена, можно установить значения по умолчанию
  //   // или пробросить ошибку, если наличие категории обязательно.
  //   console.error(`Category with slug '${baseSlug}' not found.`);
  // }

  // const imgUrl = category.imageUrl || "/default-og-image.jpg";

  if (!category) {
    // console.error(`Category with slug '${baseSlug}' not found.`);
    return {
      title: "Категория не найдена | ЭЛЕКТРОЩИТ-ПРО",
      description: "Запрошенная категория не существует.",
      openGraph: {
        title: "Категория не найдена | ЭЛЕКТРОЩИТ-ПРО",
        description: "Запрошенная категория не существует.",
        images: ["/default-og-image.jpg"],
      },
    };
    // 👇 Или если нужно реально отдать 404:
    // notFound();
  }

  // Определяем текущую страницу
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  // Заголовок и описание
  let title, description;
  if (
    selectedAttribute &&
    selectedValue &&
    categoryMetadata[selectedAttribute]?.[selectedValue]
  ) {
    title =
      categoryMetadata[selectedAttribute][selectedValue].title || titleSeo;
    description =
      categoryMetadata[selectedAttribute][selectedValue].description;
  } else {
    title =
      titleSeo ||
      categoryMetadata.default?.title ||
      `${category.name} | ЭЛЕКТРОЩИТ-ПРО`;
    description =
      categoryMetadata.default?.description ||
      category.descriptionSeo ||
      `Купить товары из категории ${category.name} по выгодным ценам.`;
  }

  // Добавляем "Страница N" только для страниц > 1
  if (page > 1) {
    title = `${title} - Страница ${page}`;
  }

  // Правильный каноникал: без ?page=1, но с ?page=N для остальных
  const canonicalUrl =
    page >= 1 ? `/catalog/${slug}` : `/catalog/${slug}?page=${page}`;

  const imgCategoryUrl = category.imageUrl
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${category.imageUrl}`
    : null;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
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
          url: imgCategoryUrl || "/default-og-image.jpg",
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
      images: [imgCategoryUrl || "/default-og-image.jpg"],
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

  // Получаем компоненты для конкретного slug
  const extraComponents = categoryComponents[slug] || {};
  const TopComponent = extraComponents.top;
  const BottomComponent = extraComponents.bottom;

  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  // Разбираем slug с помощью вспомогательной функции
  const {
    baseSlug,
    selectedAttribute,
    selectedValue,
    categoryMetadata,
    h1Text,
    fullDescription,
    advantageText,
  } = parseSlug(slug, resolvedSearchParams);

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
          imageUrl: true,
        },
      },
    },
  });

  if (!category) {
    return <p className="text-center py-8">Категория не найдена</p>;
  }

  // Передаем resolvedSearchParams в getProductsByCategory
  const { products, totalProducts, totalPages, currentPage } =
    await getProductsByCategory(baseSlug, resolvedSearchParams);

  // Fallback для h1
  const displaySuffix =
    selectedAttribute === "kolichestvo-kvartir-schetchikov"
      ? ` на ${selectedValue} квартиры`
      : selectedValue
        ? ` (${selectedValue})`
        : "";
  const finalH1 = h1Text || `${category.fullName}${displaySuffix}`;

  const breadcrumbs = [];
  let currentCategory = category;
  while (currentCategory) {
    breadcrumbs.unshift({
      name: currentCategory.name,
      slug: currentCategory.slug,
    });
    currentCategory = currentCategory.parent;
  }

  if (currentPage > totalPages && totalProducts > 0) {
    return <p className="text-center py-8">Страница не найдена</p>;
  }

  // Исправленная функция getPageUrl для сохранения всех параметров
  const getPageUrl = (page) => {
    const params = new URLSearchParams(resolvedSearchParams);
    params.set("page", page); // Устанавливаем параметр page
    // Убедимся, что все остальные параметры сохраняются
    for (const [key, value] of Object.entries(resolvedSearchParams)) {
      if (key !== "page" && value) {
        params.set(key, value);
      }
    }
    const base = selectedAttribute
      ? `/catalog/${baseSlug}${
          categoryMetadata[selectedAttribute][selectedValue]?.urlSuffix || ""
        }`
      : `/catalog/${baseSlug}`;
    return `${base}${params.toString() ? `?${params.toString()}` : ""}`;
  };

  const canonicalUrl =
    page > 1
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/catalog/${slug}?page=${page}`
      : `${process.env.NEXT_PUBLIC_SITE_URL}/catalog/${slug}`;

  const categoryJsonLd = getCategoryJsonLd(
    category,
    products,
    baseSlug,
    page,
    canonicalUrl,
  );

  return (
    <>
      <JsonLd data={categoryJsonLd} script_name="category-jsonld" />

      <Breadcrumbs items={breadcrumbs} />
      <div className="bg-gradient-metal animate-metal">
        <h1 className="flex items-center justify-center text-2xl md:text-3xl font-light tracking-tighter leading-tight text-text py-16">
          {finalH1}
          {page > 1 && <span className="ml-2">— страница {page}</span>}
        </h1>
        {page === 1 && (
          <>
            {TopComponent ? (
              <TopComponent />
            ) : fullDescription ? (
              <div className="container mx-auto text-justify bg-blue-300/20 shadow-xl text-2xl rounded-4xl px-8 py-12 border border-blue-200 mb-12">
                {fullDescription || category.fullDescription}
              </div>
            ) : null}
          </>
        )}
        {category.children.length > 0 && (
          <Subcategories subcategories={category.children} />
        )}
        <div className="bg-gradient-metal animate-metal py-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 container mx-auto">
            <div className="p-0 md:p-4 lg:top-6 self-start ">
              <Filters
                totalProducts={totalProducts}
                attributeIds={category.filters}
                searchParams={resolvedSearchParams}
                baseUrl={`/catalog/${baseSlug}`}
                categorySlug={baseSlug}
              />
            </div>
            <ProductList products={products} totalProducts={totalProducts} />
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          getPageUrl={getPageUrl}
        />

        {page === 1 && BottomComponent && <BottomComponent />}
        <PopularNabor excludeSlug={slug} />

        {page === 1 && <RandomObjects />}

        <PopularProducts categorySlug={baseSlug} />
      </div>
    </>
  );
}
