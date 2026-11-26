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

  const items = Array.isArray(products) ? products : [];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    description:
      category.descriptionSeo ||
      `Товары из категории ${category.name} по выгодным ценам.`,
    url: absoluteUrl(canonicalUrl),
    numberOfItems: items.length,

    itemListElement: items.map((product, index) => {
      const productUrl = absoluteUrl(`/product/${product.slug}`);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Thing",
          name: product.name || "Без названия",
          url: productUrl,
        },
      };
    }),
  };
};

export default getCategoryJsonLd;
