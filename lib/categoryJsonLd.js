const getCategoryJsonLd = (
  category,
  products,
  baseSlug,
  page,
  canonicalUrl
) => {
  const BASE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://electroshit-pro.ru"
  ).replace(/\/$/, "");

  const absoluteUrl = (url) => {
    if (!url) return `${BASE_URL}/`;

    try {
      return new URL(url, `${BASE_URL}/`).toString();
    } catch {
      return `${BASE_URL}/`;
    }
  };

  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
  const formattedDate = priceValidUntil.toISOString().split("T")[0];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    description:
      category.descriptionSeo ||
      `Товары из категории ${category.name} по выгодным ценам.`,
    url: absoluteUrl(canonicalUrl),
    numberOfItems: products.length,

    itemListElement: products.map((product, index) => {
      const productUrl = absoluteUrl(`/product/${product.slug}`);

      const imageUrl = absoluteUrl(product.image || "/default-og-image.jpg");

      const item = {
        "@type": "Product",
        "@id": productUrl,
        name: product.name || "Без названия",

        brand: {
          "@type": "Brand",
          name: "ЭЛЕКТРОЩИТ-ПРО",
        },

        sku: product.article || product.slug,
        url: productUrl,
        image: [imageUrl],

        description:
          product.description ||
          `Купить ${product.name || "товар"} в категории ${category.name}`,
      };

      const price = Number(product.basePrice);

      if (Number.isFinite(price) && price >= 0) {
        item.offers = {
          "@type": "Offer",
          price,
          priceCurrency: "RUB",
          priceValidUntil: formattedDate,
          availability:
            Number(product.stock) > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          url: productUrl,
        };
      }

      // Рейтинг добавляем только при наличии реальных данных.
      const rating = Number(product.rating);
      const reviewsCount = Number(product.reviewsCount);

      if (
        Number.isFinite(rating) &&
        rating > 0 &&
        Number.isFinite(reviewsCount) &&
        reviewsCount > 0
      ) {
        item.aggregateRating = {
          "@type": "AggregateRating",
          ratingValue: rating,
          reviewCount: reviewsCount,
          bestRating: 5,
          worstRating: 1,
        };
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        item,
      };
    }),
  };
};

export default getCategoryJsonLd;
