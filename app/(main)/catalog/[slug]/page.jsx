import { prisma } from "../../../../lib/prisma";
import { getProductsByCategory } from "./actions";
import Filters from "./Filters";
import ProductList from "../../../../components/shared/ProductList";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Subcategories from "../../../../components/Subcategories";
import Pagination from "../../../../components/shared/Pagination";
import { parseSlug } from "../../../../utils/slugParser";
import PopularProducts from "../../../../components/PopularProduct";
import JsonLd from "@/components/JsonLdComponent";
import getCategoryJsonLd from "@/lib/categoryJsonLd";
import categoryComponents from "@/components/categoryBlocksMap";

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

  const titleSeo = category.titleSeo || null;

  const imgUrl = category.imageUrl || null;

  if (!category) {
    return {
      title: "Категория не найдена | ЭЛЕКТРОЩИТ-ПРО",
      description: "Запрашиваемая категория не существует.",
    };
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
    page > 1 ? `/catalog/${slug}?page=${page}` : `/catalog/${slug}`;

  const categoryJsonLd = getCategoryJsonLd(
    category,
    products,
    baseSlug,
    page,
    canonicalUrl
  );

  return (
    <>
      <JsonLd data={categoryJsonLd} />

      <div className="container mx-auto px-4">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="flex items-center justify-center text-base sm:text-2xl font-bold mb-6 mt-4">
          {finalH1}
        </h1>

        {TopComponent ? (
          <TopComponent />
        ) : fullDescription ? (
          <div className="text-justify bg-blue-300/20 shadow-xl text-2xl rounded-4xl px-8 py-12 mx-auto border border-blue-200 mb-12">
            {fullDescription || category.fullDescription}
          </div>
        ) : null}
        {category.children.length > 0 && (
          <Subcategories subcategories={category.children} />
        )}
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
          <ProductList products={products} totalProducts={totalProducts} />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          getPageUrl={getPageUrl}
        />

        {BottomComponent && <BottomComponent />}

        <PopularProducts categorySlug={baseSlug} />
      </div>
    </>
  );
}

{
  /* <div>
          <div className="bg-blue-300/50 shadow-2xl rounded-4xl px-8 py-12 mx-auto border border-blue-200">
            <div className="flex items-center justify-center text-3xl font-bold mb-12 mt-4">
              Преимущества и особенности конструкции
            </div>
            <ul className="list-disc pl-6 text-2xl space-y-2 text-gray-900 max-w-[1200px] mx-auto">
              <li className="mb-4">
                <strong>Безопасность:</strong> Металлический корпус с классами
                защиты I или II минимизирует риск поражения током. Дверца с
                замком исключает доступ к токоведущим частям{" "}
                <a href="https://docs.cntd.ru/document/9018351">
                  <strong className="bg-amber-200">
                    (ГОСТ 32395-2020, п. 6.1.2, 6.2.16).
                  </strong>
                </a>
              </li>
              <li className="mb-4">
                <strong>Низкое излучение:</strong> Электрическое поле ≤ 0,5
                кВ/м, магнитное ≤ 4 А/м, что обеспечивает безопасное
                пространство (п. 6.1.3).
              </li>
              <li className="mb-4">
                <strong>Прочное крепление:</strong> Конструкция для ниши
                гарантирует долговечность и стабильность (п. 6.2.10).
              </li>
              <li className="mb-4">
                <strong>Эстетика:</strong> Обрамления защищают от повреждений,
                создавая аккуратный вид (п. 6.2.12).
              </li>
              <li className="mb-4">
                <strong>Соответствие ГОСТ:</strong> Размеры соответствуют{" "}
                <a href="https://docs.cntd.ru/document/1200165116">
                  <strong className="bg-amber-200">Приложению Г</strong>
                </a>
                , упрощая монтаж (п. 6.2.13).
              </li>
              <li className="mb-4">
                <strong>Лёгкое обслуживание:</strong> Замена аппаратов и
                счетчиков без демонтажа (п. 6.2.24).
              </li>
              <li className="mb-4">
                <strong>Удобный доступ:</strong> Дверца открывается на ≥ 95°,
                упрощая доступ к аппаратам (п. 6.2.15).
              </li>
              <li className="mb-4 pb-12">
                <strong>Защита:</strong> Замок и люк для вводных аппаратов
                усиливают безопасность (п. 6.2.17).
              </li>
            </ul>
          </div>
          <section className="max-w-7xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md my-16">
            <h3 className="text-center text-3xl font-extrabold mb-8 text-gray-800">
              {category.name}
            </h3>
            <p className="text-center text-lg leading-relaxed text-gray-700 mb-8 px-4">
              {fullDescription ? fullDescription : category.fullDescription}{" "}
              <a
                href="#order"
                className="text-indigo-600 font-semibold hover:underline transition-colors duration-200"
                aria-label="Закажите с доставкой"
              >
                Закажите с доставкой!
              </a>
            </p>
          </section>
        </div> */
}
