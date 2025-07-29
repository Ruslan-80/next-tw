import { prisma } from "@/lib/prisma";
import { getProductsByCategory } from "./actions";
import Filters from "./Filters";
import ProductList from "@/components/shared/ProductList";
import Breadcrumbs from "@/components/Breadcrumbs";
import Subcategories from "@/components/Subcategories";
import Pagination from "@/components/shared/Pagination";
import { parseSlug } from "@/utils/slugParser";

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

  // Разбираем slug с помощью вспомогательной функции
  const {
    baseSlug,
    selectedAttribute,
    selectedValue,
    categoryMetadata,
    h1Text,
    fullDescription,
    advantageText,
    pageType,
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
        },
      },
    },
  });

  if (!category) {
    return <p className="text-center py-8">Категория не найдена</p>;
  }

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

      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        getPageUrl={getPageUrl}
      /> */}
      <h1 className="flex items-center justify-center text-base sm:text-2xl font-bold mb-6 mt-4">
        {finalH1}
      </h1>
      {fullDescription && (
        <div className="bg-blue-300/20 shadow-xl text-2xl rounded-4xl px-8 py-12 mx-auto border border-blue-200 mb-12">
          {fullDescription}
        </div>
      )}
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

        <ProductList products={products} />
      </div>
      {/* {products.length > 0 ? (
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
      )} */}
      <div>
        <div className="bg-blue-300/50 shadow-2xl rounded-4xl px-8 py-12 mx-auto border border-blue-200">
          <div className="flex items-center justify-center text-3xl font-bold mb-12 mt-4">
            Преимущества и особенности конструкции
          </div>
          <ul className="list-disc pl-6 text-2xl space-y-2 text-gray-900 max-w-[1200px] mx-auto">
            <li className="mb-4">
              <strong>Безопасность:</strong> Металлический корпус с классами
              защиты I или II минимизирует риск поражения током. Дверца с замком
              исключает доступ к токоведущим частям{" "}
              <a href="https://docs.cntd.ru/document/9018351\">
                <strong className="bg-amber-200">
                  (ГОСТ 32395-2020, п. 6.1.2, 6.2.16).
                </strong>
              </a>
            </li>
            <li className="mb-4">
              <strong>Низкое излучение:</strong> Электрическое поле ≤ 0,5 кВ/м,
              магнитное ≤ 4 А/м, что обеспечивает безопасное пространство (п.
              6.1.3).
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
              <a href="https://docs.cntd.ru/document/1200165116\">
                <strong className="bg-amber-200">Приложению Г</strong>
              </a>
              , упрощая монтаж (п. 6.2.13).
            </li>
            <li className="mb-4">
              <strong>Лёгкое обслуживание:</strong> Замена аппаратов и счетчиков
              без демонтажа (п. 6.2.24).
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
        <p className="mx-auto mt-10 text-gray-900 text-3xl px-4">
          Щит этажный серии <strong>ЩЭ-6</strong> — надёжный выбор для этажей с
          шестью квартирами, обеспечивающий учет электроэнергии и
          функциональность.{" "}
          <a href="#order\">
            <strong>Закажите с доставкой!</strong>
          </a>
        </p>
      </div>
      {advantageText && (
        // <div className="mb-6 text-gray-700">{advantageText}</div>
        <div dangerouslySetInnerHTML={{ __html: advantageText }} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        getPageUrl={getPageUrl}
      />
    </div>
  );
}
