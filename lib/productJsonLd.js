const getProductJsonLd = (
  product,
  slug,
  randomDescription,
  currentCategory,
  ratingValue,
  ratingCount
) => {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  // Дата актуальности цены (на год вперёд)
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
  const formattedDate = priceValidUntil.toISOString().split("T")[0]; // YYYY-MM-DD

  const seoDescriptionText = product.descriptionSeo?.trim()
    ? `${product.name} ${product.descriptionSeo.trim()}`
    : `Купить ${product.name} ${randomDescription}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/product/${slug}`, // важно для связи с Offer
    name: product.name,
    model: product.name,
    description: seoDescriptionText,
    category: currentCategory?.name || product.category?.name || undefined,

    image:
      product.mediaFiles?.length > 0
        ? product.mediaFiles.map((file) => `${BASE_URL}${file.url}`)
        : [`${BASE_URL}/default-og-image.jpg`],

    brand: {
      "@type": "Brand",
      name: "Electroshit-PRO",
    },

    sku: product.article || undefined,
    url: `${BASE_URL}/product/${slug}`,

    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/product/${slug}`,
      price: product.basePrice || "0.00",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      priceValidUntil: formattedDate,
      itemCondition: "https://schema.org/NewCondition",
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      ratingCount,
      reviewCount: ratingCount,
      worstRating: 1,
      bestRating: 5,
    },

    additionalProperty:
      product.attributes?.length > 0
        ? product.attributes.map((attr) => ({
            "@type": "PropertyValue",
            name: attr.attributeName,
            value: attr.attributeValueName,
          }))
        : undefined,
  };
};

export default getProductJsonLd;
