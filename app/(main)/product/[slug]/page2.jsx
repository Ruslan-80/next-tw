import { prisma } from "@/lib/prisma";
import ProductPageClient from "./ProductPageClient";
import Breadcrumbs from "@/components/Breadcrumbs";

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

// Функция для генерации метаданных
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Получаем данные о продукте
  const product = await getProductData(slug);

  if (!product) {
    return {
      metadataBase: new URL("https://electroshit-pro.ru"), // Замените на ваш реальный домен
      title: "Товар не найден | ЭЛЕКТРОЩИТ-ПРО",
      description: "Запрашиваемый товар не существует.",
    };
  }

  const title = `${product.name} | ЭЛЕКТРОЩИТ-ПРО`;
  const description =
    product.descriptionSeo ||
    `Купить ${product.name} в категории ${product.category.name} по выгодной цене. Быстрая доставка и высокое качество.`;
  const canonicalUrl = `/product/${slug}`;
  const imageUrl = product.mediaFiles[0]?.url || "/default-og-image.jpg"; // Используем первое изображение или заглушку

  return {
    metadataBase: new URL("https://electroshit-pro.ru"), // Замените на ваш реальный домен
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

  // Получаем данные о продукте
  const product = await getProductData(slug);

  if (!product) {
    return <p className="text-center py-8">Товар не найден</p>;
  }

  // Формируем цепочку хлебных крошек
  const breadcrumbs = [];
  let currentCategory = product.category;
  while (currentCategory) {
    breadcrumbs.unshift({
      name: currentCategory.name,
      slug: currentCategory.slug,
    });
    currentCategory = currentCategory.parent;
  }
  breadcrumbs.push({
    name: product.name,
    slug: product.slug,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description:
              product.description ||
              `Купить ${product.name} в категории ${product.category.name}`,
            image:
              product.mediaFiles[0]?.url ||
              "https://electroshit-pro.ru/default-og-image.jpg",
            url: `https://electroshit-pro.ru/product/${slug}`,
            // Дополнительные поля, такие как price или sku, можно добавить, если они есть в модели
          }),
        }}
      />
      <div className="container mx-auto px-4">
        <Breadcrumbs items={breadcrumbs} />
        <ProductPageClient product={product} />
      </div>
    </>
  );
}
