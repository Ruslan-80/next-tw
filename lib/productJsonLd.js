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
  const name = (product.name || product.title || "Товар ЭЛЕКТРОЩИТ-ПРО").trim();

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

export default getProductJsonLd;
