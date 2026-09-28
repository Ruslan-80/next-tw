export const revalidate = 3600;
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import ProductPageClient from "./ProductPageClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLdComponent";
// import getProductJsonLd from "@/lib/productJsonLd";
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

  const getProductJsonLd = ({
    product,
    slug,
    randomDescription = "",
    currentCategory = null,
    ratingValue = 5,
    ratingCount = 0,
  }) => {
    if (!product) return null;

    const rawBaseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://electroshit-pro.ru";
    const BASE_URL = rawBaseUrl.replace(/\/$/, "");

    // Имя товара
    const name = (
      product.name ||
      product.title ||
      "Товар ЭЛЕКТРОЩИТ-ПРО"
    ).trim();

    // Описание
    const cleanRandDesc =
      typeof randomDescription === "string" ? randomDescription.trim() : "";
    let description = "";

    if (product.descriptionSeo?.trim()) {
      description = `${name} ${product.descriptionSeo.trim()}`;
    } else if (product.description?.trim()) {
      description = product.description.replace(/<[^>]*>?/gm, "").trim();
    } else if (cleanRandDesc) {
      description = `Купить ${name} ${cleanRandDesc}`;
    } else {
      description = `Купить ${name} с гарантией и доставкой по Москве и области.`;
    }

    // Очистка от экранирования кавычек и переходов строк для корректного JSON
    description = description.replace(/"/g, '\"').replace(/\s+/g, " ").trim();

    const priceValidUntil = new Date();
    priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
    const formattedDate = priceValidUntil.toISOString().split("T")[0];

    const images =
      product.mediaFiles && product.mediaFiles.length > 0
        ? product.mediaFiles.map((file) =>
            file.url.startsWith("http")
              ? file.url
              : `${BASE_URL}${file.url.startsWith("/") ? "" : "/"}${file.url}`,
          )
        : [`${BASE_URL}/default-og-image.jpg`];

    const categoryName = currentCategory?.name || product.category?.name;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${BASE_URL}/product/${slug}`,
      name: name,
      description: description,
      category: categoryName || undefined,
      image: images,

      brand: {
        "@type": "Brand",
        name: "ЭЛЕКТРОЩИТ-ПРО",
      },

      sku: product.article || product.sku || undefined,
      url: `${BASE_URL}/product/${slug}`,

      offers: {
        "@type": "Offer",
        url: `${BASE_URL}/product/${slug}`,
        price: Number(product.basePrice || product.price || 0),
        priceCurrency: "RUB",
        availability:
          Number(product.stock) > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        priceValidUntil: formattedDate,
        itemCondition: "https://schema.org/NewCondition",
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: 0,
            currency: "RUB",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "RU",
            addressRegion: ["Moscow", "Moskovskaya Oblast"],
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 0,
              maxValue: 1,
              unitCode: "DAY",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 3,
              unitCode: "DAY",
            },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "RU",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 14,
          returnMethod: "https://schema.org/ReturnInStore",
          returnFees: "https://schema.org/FreeReturn",
          url: `${BASE_URL}/guarantees`,
        },
      },
    };

    if (ratingCount && Number(ratingCount) > 0) {
      jsonLd.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: Number(ratingValue) || 5,
        ratingCount: Number(ratingCount),
        reviewCount: Number(ratingCount),
        worstRating: 1,
        bestRating: 5,
      };
    }

    if (product.attributes && product.attributes.length > 0) {
      jsonLd.additionalProperty = product.attributes.map((attr) => ({
        "@type": "PropertyValue",
        name: attr.attributeName || attr.name,
        value: attr.attributeValueName || attr.value,
      }));
    }

    return jsonLd;
  };

  const productJsonLd = getProductJsonLd({
    product,
    slug,
    randomDescription,
    currentCategory: product.category,
    ratingValue,
    ratingCount,
  });

  // console.log(product);

  return (
    <>
      <JsonLd data={productJsonLd} script_name="product-jsonld" />
      <Breadcrumbs items={breadcrumbs} productName={product.name} />
      <ProductPageClient
        product={product}
        ratingValue={ratingValue}
        ratingCount={ratingCount}
      />
    </>
  );
}
