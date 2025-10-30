const getProductJsonLd = (product, slug, currentCategory) => {
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
  const formattedDate = priceValidUntil.toISOString().split("T")[0]; // Формат YYYY-MM-DD

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    model: product.name,
    name: product.name,
    description:
      product.descriptionSeo ||
      `Купить ${product.name} в категории ${product.category?.name || ""}`,

    image:
      product.mediaFiles?.length > 0
        ? product.mediaFiles.map((file) => `${BASE_URL}${file.url}`)
        : [`${BASE_URL}/default-og-image.jpg`],

    brand: {
      "@type": "Brand",
      name: "Electroshit-pro",
    },
    sku: product.article,
    url: `${BASE_URL}/product/${slug}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: product.basePrice || "0.00",
      priceCurrency: "RUB",
    },

    aggregateRating: (() => {
      const ratingValue = (Math.random() * (5 - 4) + 4).toFixed(1); // 4.0–5.0
      const ratingCount = Math.floor(Math.random() * (100 - 10 + 1)) + 10; // 10–100
      return {
        "@type": "AggregateRating",
        ratingValue,
        ratingCount,
        reviewCount: ratingCount,
        worstRating: 0,
        bestRating: 5,
      };
    })(),

    additionalProperty:
      product.attributes?.length > 0
        ? product.attributes.map((attr) => ({
            "@type": "PropertyValue",
            name: attr.attributeName,
            value: attr.attributeValueName,
          }))
        : [],
  };
};

export default getProductJsonLd;
