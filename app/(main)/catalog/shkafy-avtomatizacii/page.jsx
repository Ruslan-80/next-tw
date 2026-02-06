export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Breadcrumbs from "@/components/Breadcrumbs";
import { parseSlug } from "@/utils/slugParser";
import React from "react";
import getCategoryJsonLd from "@/lib/categoryJsonLd";

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const baseSlug = "shkafy-avtomatizacii";

  // Разбираем slug с помощью вспомогательной функции
  //   const { baseSlug, selectedAttribute, selectedValue, categoryMetadata } =
  //     parseSlug(slug, resolvedSearchParams);

  const category = await prisma.category.findUnique({
    where: { slug: baseSlug },
    select: {
      name: true,
      descriptionSeo: true,
    },
  });

  //   console.log(category);

  //   if (!category) {
  //     return {
  //       title: "Категория не найдена | ЭЛЕКТРОЩИТ-ПРО",
  //       description: "Запрашиваемая категория не существует.",
  //     };
  //   }

  //   // Определяем текущую страницу
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  //   // Заголовок и описание
  let title, description;

  title = category.name;
  description =
    category.descriptionSeo ||
    `Купить товары из категории ${category.name} по выгодным ценам.`;

  //   // Добавляем "Страница N" только для страниц > 1
  //   if (page > 1) {
  //     title = `${title} - Страница ${page}`;
  //   }

  //   // Правильный каноникал: без ?page=1, но с ?page=N для остальных
  const canonicalUrl =
    page > 1 ? `/catalog/${slug}?page=${page}` : `/catalog/${slug}`;

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

export default async function shkafyavtomatizacii({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const baseSlug = "shkafy-avtomatizacii";

  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  //   // Разбираем slug с помощью вспомогательной функции
  //   const {
  //     baseSlug,
  //     selectedAttribute,
  //     selectedValue,
  //     categoryMetadata,
  //     h1Text,
  //     fullDescription,
  //     advantageText,
  //   } = parseSlug(slug, resolvedSearchParams);

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

  //   // Передаем resolvedSearchParams в getProductsByCategory
  //   const { products, totalProducts, totalPages, currentPage } =
  //     await getProductsByCategory(baseSlug, resolvedSearchParams);

  //   // Fallback для h1
  //   const displaySuffix =
  //     selectedAttribute === "kolichestvo-kvartir-schetchikov"
  //       ? ` на ${selectedValue} квартиры`
  //       : selectedValue
  //       ? ` (${selectedValue})`
  //       : "";
  //   const finalH1 = h1Text || `${category.name}${displaySuffix}`;

  const breadcrumbs = [];
  let currentCategory = category;
  while (currentCategory) {
    breadcrumbs.unshift({
      name: currentCategory.name,
      slug: currentCategory.slug,
    });
    currentCategory = currentCategory.parent;
  }

  //   if (currentPage > totalPages && totalProducts > 0) {
  //     return <p className="text-center py-8">Страница не найдена</p>;
  //   }

  //   // Исправленная функция getPageUrl для сохранения всех параметров
  //     const getPageUrl = (page) => {
  //       const params = new URLSearchParams(resolvedSearchParams);
  //       params.set("page", page); // Устанавливаем параметр page
  //       // Убедимся, что все остальные параметры сохраняются
  //       for (const [key, value] of Object.entries(resolvedSearchParams)) {
  //         if (key !== "page" && value) {
  //           params.set(key, value);
  //         }
  //       }
  //       const base = selectedAttribute
  //         ? `/catalog/${baseSlug}${
  //             categoryMetadata[selectedAttribute][selectedValue]?.urlSuffix || ""
  //           }`
  //         : `/catalog/${baseSlug}`;
  //       return `${base}${params.toString() ? `?${params.toString()}` : ""}`;
  //     };

  const canonicalUrl =
    page > 1 ? `/catalog/${slug}?page=${page}` : `/catalog/${slug}`;

  //   const categoryJsonLd = getCategoryJsonLd(
  //     category,
  //     baseSlug,
  //     page,
  //     canonicalUrl
  //   );

  return (
    <>
      {/* <JsonLd data={categoryJsonLd} /> */}
      <div className="container mx-auto px-4">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="flex items-center justify-center text-base sm:text-2xl font-bold mb-6 mt-4">
          Шкафы автоматизации
        </h1>
        <p>{category.descriptionSeo}</p>
      </div>
    </>
  );
}
