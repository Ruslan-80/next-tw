export const revalidate = 3600;
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import ProductPageClient from "./ProductPageClient";
import Breadcrumbs from "@/components/Breadcrumbs";
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
      reviews: {
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
      },
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
  const randomDescription = pool[Math.floor(Math.random() * pool.length)];
  const randomDescriptionSeo = pool[Math.floor(Math.random() * pool.length)];

  // Запрашиваем реальный рейтинг и количество отзывов из БД
  const reviewStats = await prisma.review.aggregate({
    where: {
      productId: product.id,
      isApproved: true, // Считаем только одобренные отзывы
    },
    _avg: {
      rating: true,
    },
    _count: {
      _all: true,
    },
  });

  // Если у товара нет отзывов, рейтинг равен 0, иначе округляем до 1 знака после запятой
  const rawAvg = reviewStats._avg.rating;
  const ratingValue = rawAvg ? rawAvg.toFixed(1) : "0";
  const ratingCount = reviewStats._count._all;

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

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  const ctx = await getProductPageContext(slug);

  if (!ctx) {
    return {
      title: "Товар не найден | ЭЛЕКТРОЩИТ-ПРО",
      description: "Запрашиваемый товар не существует.",
    };
  }

  const { product, randomDescription } = ctx;

  const seoDescriptionText = product.descriptionSeo?.trim()
    ? `${product.name} ${product.descriptionSeo.trim()}`
    : `Купить ${product.name} ${randomDescription}`;

  const title = product.titleSeo || `${product.name} | ЭЛЕКТРОЩИТ-ПРО`;
  const description = seoDescriptionText;
  const canonicalUrl = `${BASE_URL}/product/${slug}`;
  const imageUrl =
    `${BASE_URL}${product.mediaFiles[0]?.url}` || "/default-og-image.jpg";

  return {
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
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const ctx = await getProductPageContext(slug);
  if (!ctx) return <p className="text-center py-8">Товар не найден</p>;

  const { product, randomDescription, ratingValue, ratingCount } = ctx;

  const breadcrumbs = [];
  let currentCategory = product.category;
  while (currentCategory) {
    breadcrumbs.unshift({
      name: currentCategory.name,
      slug: currentCategory.slug,
    });
    currentCategory = currentCategory.parent;
  }

  const productJsonLd = getProductJsonLd({
    product,
    slug,
    randomDescription,
    currentCategory: product.category,
    ratingValue,
    ratingCount,
  });

  return (
    <>
      <JsonLd data={productJsonLd} script_name="product-jsonld" />
      <Breadcrumbs items={breadcrumbs} productName={product.name} />
      <ProductPageClient
        product={product}
        ratingValue={Number(ratingValue)}
        ratingCount={Number(ratingCount)}
      />
    </>
  );
}
