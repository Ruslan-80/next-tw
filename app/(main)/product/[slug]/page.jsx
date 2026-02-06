export const dynamic = "force-dynamic";
import { cache } from "react";
import { prisma } from "../../../../lib/prisma";
import ProductPageClient from "./ProductPageClient";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import JsonLd from "@/components/JsonLdComponent";
import getProductJsonLd from "@/lib/productJsonLd";
import metaDescriptions from "@/app/data/metaDescriptions.json";

// Функция для получения данных о продукте
async function getProductData(slug) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      mediaFiles: {
        select: {
          url: true, // Берем URL изображения для Open Graph
        },
      },
      attributes: true,
      variations: true,
      mediaFiles: true,
      category: {
        include: {
          parent: {
            include: {
              parent: true, // Загружаем до двух уровней вложенности
            },
          },
        },
      },
    },
  });
}
// Функция для получения контекста страницы продукта

const getProductPageContext = cache(async (slug) => {
  const product = await getProductData(slug);

  if (!product) return null;

  const pool = metaDescriptions.metaDescriptions.product;
  // Теперь этот random сработает только 1 раз за запрос
  const randomDescription = pool[Math.floor(Math.random() * pool.length)];
  const randomDescriptionSeo = pool[Math.floor(Math.random() * pool.length)];

  const ratingValue = (Math.random() * (5 - 4) + 4).toFixed(1);
  const ratingCount = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

  return {
    product,
    randomDescription,
    randomDescriptionSeo,
    ratingValue,
    ratingCount,
  };
});

// Функция для генерации метаданных
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  // const { slug } = await params;

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  const ctx = await getProductPageContext(slug);

  if (!ctx) {
    return {
      title: "Товар не найден | ЭЛЕКТРОЩИТ-ПРО",
      description: "Запрашиваемый товар не существует.",
    };
  }

  const { product, randomDescription, randomDescriptionSeo } = ctx;

  const seoDescriptionText = product.descriptionSeo?.trim()
    ? `${product.name} ${product.descriptionSeo.trim()}`
    : `Купить ${product.name} ${randomDescription}`;

  // const title = `${product.name} ${randomDescription}`;
  const title = product.titleSeo || `${product.name} | ЭЛЕКТРОЩИТ-ПРО`;
  const description = seoDescriptionText;
  const canonicalUrl = `${BASE_URL}/product/${slug}`;
  const imageUrl =
    `${BASE_URL}${product.mediaFiles[0]?.url}` || "/default-og-image.jpg"; // Используем первое изображение или заглушку

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl, // Относительный путь, так как metadataBase задан
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website", // Используем валидный тип Open Graph
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true, // Разрешаем индексацию
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  // const { slug } = await params;

  const ctx = await getProductPageContext(slug);
  if (!ctx) return <p className="text-center py-8">Товар не найден</p>;

  const { product, randomDescription, ratingValue, ratingCount } = ctx;

  // Далее всё как было
  const breadcrumbs = [];
  let currentCategory = product.category;
  while (currentCategory) {
    breadcrumbs.unshift({
      name: currentCategory.name,
      slug: currentCategory.slug,
    });
    currentCategory = currentCategory.parent;
  }

  const productJsonLd = getProductJsonLd(
    product,
    slug,
    randomDescription,
    product.category,
    ratingValue,
    ratingCount
  );

  return (
    <>
      <JsonLd data={productJsonLd} script_name="product-jsonld" />
      <div className="container mx-auto px-4 dark:bg-gray-900 dark:text-white">
        <Breadcrumbs items={breadcrumbs} />

        <ProductPageClient
          product={product}
          ratingValue={ratingValue}
          ratingCount={ratingCount}
        />
      </div>
    </>
  );
}
