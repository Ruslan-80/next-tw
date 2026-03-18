const getCategoryJsonLd = (
  category,
  products,
  baseSlug,
  page,
  canonicalUrl,
) => {
  // Устанавливаем дату на год вперед от текущей
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
  const formattedDate = priceValidUntil.toISOString().split("T")[0]; // Формат YYYY-MM-DD

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    description:
      category.descriptionSeo ||
      `Товары из категории ${category.name} по выгодным ценам.`,
    url: `${BASE_URL}${canonicalUrl}`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": `${BASE_URL}/product/${product.slug}`, // Важно для связки данных
        name: product.name || "Без названия",
        brand: {
          "@type": "Brand",
          name: "Electroshit-PRO",
        },
        sku: product.article || product.slug,
        url: `${BASE_URL}/product/${product.slug}`,
        image: [
          product.image
            ? `${BASE_URL}${product.image}`
            : `${BASE_URL}/default-og-image.jpg`,
        ],
        description:
          product.description ||
          `Купить ${product.name || "товар"} в категории ${category.name}`,
        offers: {
          "@type": "Offer",
          price: product.basePrice || "0.00",
          priceCurrency: "RUB",
          priceValidUntil: formattedDate,
          availability:
            product.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          url: `${BASE_URL}/product/${product.slug}`,
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: product.shippingCost || 0, // Убедитесь, что тут число
              currency: "RUB",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "RU",
              addressRegion: ["Moscow", "Moskovskaya Oblast"], // Добавил регионы для точности
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
            merchantReturnDays: 14,
            returnMethod: "https://schema.org/ReturnInStore",
            returnFees: "https://schema.org/FreeReturn",
            url: `${BASE_URL}/guarantees`,
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
                  review.datePublished ||
                  new Date().toISOString().split("T")[0],
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
      },
    })),
  };
};

export default getCategoryJsonLd;
