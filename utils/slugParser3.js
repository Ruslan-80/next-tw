// utils/slugParser.js
import seoMetadata from "../app/data/seoMetadata.json";

export function parseSlug(slug, searchParams = {}) {
  // 1. Ищем базовую категорию (ключ из seoMetadata, с которого начинается текущий slug)
  const baseSlug =
    Object.keys(seoMetadata).find(
      (key) => slug === key || slug.startsWith(`${key}-`),
    ) || slug;

  // console.log(slug);
  const categoryMetadata = seoMetadata[baseSlug] || {};
  const suffix = slug.startsWith(baseSlug) ? slug.slice(baseSlug.length) : "";

  console.log(suffix);

  let selectedAttribute = null;
  let selectedValue = null;
  let seoFilters = {};
  let h1Text = null;
  let titleText = null;
  let fullDescription = null;
  let advantageText = null;

  // 2. Сначала проверяем комбинации в seoMetadata
  if (
    suffix &&
    categoryMetadata?.combinations &&
    Array.isArray(categoryMetadata.combinations)
  ) {
    const matchedCombo = categoryMetadata.combinations.find(
      (c) => c.urlSuffix === suffix,
    );
    if (matchedCombo) {
      for (const [attr, val] of Object.entries(matchedCombo.attributes || {})) {
        seoFilters[attr] = [val];
      }
      h1Text = matchedCombo.h1;
      titleText = matchedCombo.title;
      fullDescription = matchedCombo.fulldescription;
      advantageText = matchedCombo.advantage;
    }
  }

  // 3. Если комбинация не найдена, проверяем одиночные ЧПУ
  if (Object.keys(seoFilters).length === 0 && suffix && categoryMetadata) {
    for (const [attrSlug, valuesMap] of Object.entries(categoryMetadata)) {
      if (["default", "combinations", "order"].includes(attrSlug)) continue;

      for (const [valKey, valObj] of Object.entries(valuesMap)) {
        if (valObj?.urlSuffix === suffix) {
          selectedAttribute = attrSlug;
          selectedValue = valKey;
          seoFilters[attrSlug] = [valKey];

          h1Text = valObj.h1;
          titleText = valObj.title;
          fullDescription = valObj.fulldescription;
          advantageText = valObj.advantage;
          break;
        }
      }
      if (selectedAttribute) break;
    }
  }

  // Fallback к default значениям SEO
  if (!h1Text) h1Text = categoryMetadata.default?.h1;
  if (!titleText) titleText = categoryMetadata.default?.title;
  if (!fullDescription)
    fullDescription = categoryMetadata.default?.fulldescription;
  if (!advantageText) advantageText = categoryMetadata.default?.advantage;

  // 4. Объединяем ЧПУ-фильтры и Query-фильтры без мутации исходного searchParams
  const mergedSearchParams = { ...searchParams };

  for (const [attr, values] of Object.entries(seoFilters)) {
    const fromQuery = mergedSearchParams[attr];
    const queryValues = Array.isArray(fromQuery)
      ? fromQuery
      : typeof fromQuery === "string"
        ? fromQuery.split("--").filter((v) => v.trim() !== "")
        : [];

    // Пересекаем / объединяем уникальные значения
    const combined = Array.from(new Set([...values, ...queryValues]));
    mergedSearchParams[attr] = combined.join("--");
  }

  let pageType = "catalog";
  if (["uerb", "uerk", "uerm", "uern", "uerv"].includes(baseSlug)) {
    pageType = "landing";
  } else if (["shema-etazhnogo-shchita", "o-kompanii"].includes(baseSlug)) {
    pageType = "info";
  }

  return {
    baseSlug,
    selectedAttribute,
    selectedValue,
    categoryMetadata,
    h1Text,
    titleText,
    fullDescription,
    advantageText,
    pageType,
    mergedSearchParams, // <-- Используйте эти склеенные параметры для getProductsByCategory!
  };
}
