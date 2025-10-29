const getProductJsonLd = (product, slug, currentCategory) => {
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
  const formattedDate = priceValidUntil.toISOString().split("T")[0]; // Формат YYYY-MM-DD

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image:
      `${BASE_URL}${product.mediaFiles?.[0]?.url}` ||
      `${BASE_URL}/default-og-image.jpg`,
    description:
      product.descriptionSeo ||
      `Купить ${product.name} в категории ${product.category.name}`,
    sku: product.article,
    brand: {
      "@type": "Brand",
      name: "Electroshit-pro",
    },
    url: `${BASE_URL}/product/${slug}`,

    offers: {
      "@type": "Offer",
      price: product.basePrice || "0.00",
      priceCurrency: "RUB",
      priceValidUntil: formattedDate,
      availability: product.availability || "https://schema.org/InStock",
      url: `${BASE_URL}/product/${slug}`,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: product.shippingCost || "0.00",
          currency: "RUB",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "RU",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "http://schema.org/Monday",
              "http://schema.org/Tuesday",
              "http://schema.org/Wednesday",
              "http://schema.org/Thursday",
              "http://schema.org/Friday",
            ],
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "RU",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        returnWindow: {
          "@type": "QuantitativeValue",
          value: 14,
          unitCode: "DAY",
        },
      },
    },
    aggregateRating: product.aggregateRating || {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: product.reviewCount || 1,
    },
    review:
      product.reviews?.length > 0
        ? product.reviews.map((review, idx) => ({
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating || 4,
            },
            author: {
              "@type": "Person",
              name: review.author || "Аноним",
            },
            reviewBody: review.body || `Отзыв о ${product.name}`,
            datePublished:
              review.datePublished || new Date().toISOString().split("T")[0],
          }))
        : [
            {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: 4,
              },
              author: {
                "@type": "Person",
                name: "Аноним",
              },
              reviewBody: `Общий отзыв о ${product.name}`,
              datePublished: new Date().toISOString().split("T")[0],
            },
          ],
  };
};

export default getProductJsonLd;
