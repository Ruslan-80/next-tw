// utils/slugParser.js
import seoMetadata from "@/app/data/seoMetadata.json";

export function parseSlug(slug, searchParams) {
  let baseSlug = slug;
  let selectedAttribute = null;
  let selectedValue = null;
  let categoryMetadata = null;
  let h1Text = null;
  let fullDescription = null;
  let advantageText = null; // Поиск категории и атрибутов в seoMetadata

  let pageType = "catalog";

  if (["uerb", "uerk", "uerm", "uern", "uerv"].includes(baseSlug)) {
    pageType = "landing";
  } else if (["shema-etazhnogo-shchita", "o-kompanii"].includes(baseSlug)) {
    pageType = "info";
  }

  for (const categoryKey in seoMetadata) {
    for (const attrSlug in seoMetadata[categoryKey]) {
      if (attrSlug === "default") continue;

      for (const value in seoMetadata[categoryKey][attrSlug]) {
        const { urlSuffix } = seoMetadata[categoryKey][attrSlug][value];

        if (urlSuffix && slug.endsWith(urlSuffix)) {
          selectedAttribute = attrSlug;
          selectedValue = value;
          baseSlug = slug.replace(urlSuffix, "");
          categoryMetadata = seoMetadata[categoryKey];
          searchParams[attrSlug] = value;
          h1Text = categoryMetadata[attrSlug][value].h1;
          fullDescription = categoryMetadata[attrSlug][value].fulldescription;
          advantageText = categoryMetadata[attrSlug][value].advantage;
          break;
        }
      }
      if (selectedAttribute) break;
    }
    if (selectedAttribute) break;
  } // Fallback, если суффикс не найден

  if (!categoryMetadata) {
    categoryMetadata = seoMetadata[slug] || {};
    h1Text = categoryMetadata.default?.h1;
    fullDescription = categoryMetadata.default?.fulldescription;
    advantageText = categoryMetadata.default?.advantage;
  }

  return {
    baseSlug,
    selectedAttribute,
    selectedValue,
    categoryMetadata,
    h1Text,
    fullDescription,
    advantageText,
    pageType,
  };
}
