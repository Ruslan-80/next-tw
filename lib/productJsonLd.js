const getProductJsonLd = (
  product,
  slug,
  randomDescription,
  currentCategory,
  ratingValue,
  ratingCount,
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
    "@id": `${BASE_URL}/product/${slug}`,
    name: product.name,
    description: seoDescriptionText || product.description || "",
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
      price: product.basePrice || 0.0,
      priceCurrency: "RUB",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      priceValidUntil: formattedDate,
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0, // Бесплатная доставка
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
            maxValue: 3, // Для Москвы обычно быстрее
            unitCode: "DAY",
          },
        },
      },

      // ИСПРАВЛЕНИЕ: Добавляем политику возврата
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "RU",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnInStore",
        returnFees: "https://schema.org/FreeReturn",
        url: `${BASE_URL}/guarantees`, // Ссылка на вашу страницу условий
      },
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
