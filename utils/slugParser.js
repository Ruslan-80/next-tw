// utils/slugParser.js
import seoMetadata from "../app/data/seoMetadata.json";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function collectSuffixEntries() {
  const entries = [];
  for (const categoryKey in seoMetadata) {
    const cat = seoMetadata[categoryKey];
    for (const attrSlug in cat) {
      if (attrSlug === "default" || attrSlug === "combinations") continue;
      const attrData = cat[attrSlug];
      if (!isPlainObject(attrData)) continue;
      for (const value in attrData) {
        const info = attrData[value];
        if (info && info.urlSuffix) {
          entries.push({
            urlSuffix: info.urlSuffix,
            categoryKey,
            attrSlug,
            value,
            info,
          });
        }
      }
    }
  }
  entries.sort((a, b) => b.urlSuffix.length - a.urlSuffix.length);
  return entries;
}

const SUFFIX_ENTRIES = collectSuffixEntries();

const KNOWN_ATTR_NAMES = (() => {
  const set = new Set();
  for (const categoryKey in seoMetadata) {
    const cat = seoMetadata[categoryKey];
    for (const attrSlug in cat) {
      if (attrSlug === "default" || attrSlug === "combinations") continue;
      if (isPlainObject(cat[attrSlug])) set.add(attrSlug);
    }
  }
  return set;
})();

export function parseSlug(slug, searchParams = {}) {
  let baseSlug = slug;
  let categoryMetadata = null;
  let h1Text = null;
  let titleText = null;
  let fullDescription = null;
  let advantageText = null;
  let pageType = "catalog";

  const filtersFromPath = {};

  // 1) комбинация целиком в slug
  let matchedCombination = null;
  let matchedCombinationCategoryKey = null;

  for (const categoryKey in seoMetadata) {
    const cat = seoMetadata[categoryKey];
    if (!Array.isArray(cat.combinations)) continue;
    for (const combo of cat.combinations) {
      if (!combo.urlSuffix || !slug.endsWith(combo.urlSuffix)) continue;
      if (
        !matchedCombination ||
        combo.urlSuffix.length > matchedCombination.urlSuffix.length
      ) {
        matchedCombination = combo;
        matchedCombinationCategoryKey = categoryKey;
      }
    }
  }

  if (matchedCombination) {
    baseSlug = slug.slice(0, -matchedCombination.urlSuffix.length);
    categoryMetadata = seoMetadata[matchedCombinationCategoryKey];
    Object.assign(filtersFromPath, matchedCombination.filters || {});
    h1Text = matchedCombination.h1 ?? null;
    titleText = matchedCombination.title ?? null;
    fullDescription = matchedCombination.fulldescription ?? null;
    advantageText = matchedCombination.advantage ?? null;
  } else {
    // 2) цепочка одиночных суффиксов
    let currentSlug = slug;
    const matched = [];
    let progress = true;

    while (progress) {
      progress = false;
      for (const s of SUFFIX_ENTRIES) {
        if (!currentSlug.endsWith(s.urlSuffix)) continue;
        if (matched.some((m) => m.attrSlug === s.attrSlug)) continue;
        if (matched.length > 0 && matched[0].categoryKey !== s.categoryKey)
          continue;

        matched.push(s);
        currentSlug = currentSlug.slice(0, -s.urlSuffix.length);
        progress = true;
        break;
      }
    }

    if (matched.length > 0) {
      baseSlug = currentSlug;
      categoryMetadata = seoMetadata[matched[0].categoryKey];
      for (const m of matched) filtersFromPath[m.attrSlug] = m.value;
      h1Text = matched[0].info.h1 ?? null;
      titleText = matched[0].info.title ?? null;
      fullDescription = matched[0].info.fulldescription ?? null;
      advantageText = matched[0].info.advantage ?? null;
    }
  }

  if (!categoryMetadata && seoMetadata[baseSlug]) {
    categoryMetadata = seoMetadata[baseSlug];
  }

  // 3) мержим query-фильтры
  const appliedFilters = { ...filtersFromPath };
  for (const key in searchParams) {
    const raw = searchParams[key];
    if (raw == null) continue;
    if (!KNOWN_ATTR_NAMES.has(key)) continue;
    if (key in appliedFilters) continue;
    appliedFilters[key] = Array.isArray(raw) ? raw[0] : raw;
  }

  // 4) если суммарно ≥ 2 фильтра — ищем combination по объединённому набору
  const appliedKeys = Object.keys(appliedFilters);
  if (appliedKeys.length > 1) {
    let comboCandidate = null;
    let comboCandidateCategoryKey = null;

    for (const categoryKey in seoMetadata) {
      const cat = seoMetadata[categoryKey];
      if (!Array.isArray(cat.combinations)) continue;
      for (const combo of cat.combinations) {
        const cf = combo.filters || {};
        const cfKeys = Object.keys(cf);
        if (cfKeys.length !== appliedKeys.length) continue;
        const fits = cfKeys.every(
          (k) => String(appliedFilters[k]) === String(cf[k]),
        );
        if (fits) {
          comboCandidate = combo;
          comboCandidateCategoryKey = categoryKey;
          break;
        }
      }
      if (comboCandidate) break;
    }

    if (comboCandidate) {
      categoryMetadata = seoMetadata[comboCandidateCategoryKey];
      h1Text = comboCandidate.h1 ?? h1Text;
      titleText = comboCandidate.title ?? titleText;
      fullDescription = comboCandidate.fulldescription ?? fullDescription;
      advantageText = comboCandidate.advantage ?? advantageText;
    }
  }

  if (!categoryMetadata) categoryMetadata = seoMetadata[baseSlug] || {};

  if (!h1Text && categoryMetadata.default) {
    h1Text = categoryMetadata.default.h1 ?? null;
    titleText = titleText ?? categoryMetadata.default.title ?? null;
    fullDescription =
      fullDescription ?? categoryMetadata.default.fulldescription ?? null;
    advantageText = advantageText ?? categoryMetadata.default.advantage ?? null;
  }

  // 5) selectedAttribute/Value — для обратной совместимости
  const filterKeys = Object.keys(appliedFilters);
  const selectedAttribute = filterKeys[0] || null;
  const selectedValue = selectedAttribute
    ? appliedFilters[selectedAttribute]
    : null;

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
    appliedFilters, // ← НОВОЕ
  };
}
