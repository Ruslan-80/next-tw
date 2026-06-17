import { PARAMS_BY_TYPE, PARAM_TO_API } from "@/app/(main)/conf/RowEditor";

// ─── Построение query-параметров для /api/v1/products по item ────────────────
// Возвращает URLSearchParams, готовые к конкатенации в строку запроса.
export function buildProductQuery(item, extraParams = []) {
  const deviceType = item.deviceType || "breaker";
  const visibleParams = PARAMS_BY_TYPE[deviceType] || PARAMS_BY_TYPE.breaker;

  const params = { device_type: deviceType };
  visibleParams.forEach((key) => {
    const val = item.params?.[key];
    if (val) params[PARAM_TO_API[key] || key] = val;
  });
  extraParams.forEach(({ key, value }) => {
    if (key && value) params[key] = value;
  });

  return new URLSearchParams(params);
}

// ─── Поиск товаров для одного элемента ───────────────────────────────────────
// Возвращает массив товаров или [] при ошибке/пустом результате.
// Добавлена проверка res.ok (раньше отсутствовала — падало при 500/4xx).
export async function fetchProducts(item, extraParams = []) {
  try {
    const query = buildProductQuery(item, extraParams).toString();
    const res = await fetch(`/api/v1/products${query ? `?${query}` : ""}`);

    if (!res.ok) {
      console.error(
        `Products API вернул ${res.status} для device=${item.deviceType}`,
      );
      return [];
    }

    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  } catch (err) {
    console.error("Ошибка поиска товаров:", err);
    return [];
  }
}

// ─── Подбор дефолтного товара (первый подходящий) ───────────────────────────
// Сортируем по наличию (в наличии — выше) и цене (дешевле — выше),
// чтобы не брать слепо data[0] (Этап 4: улучшение качества подбора).
export async function fetchDefaultProduct(item) {
  const products = await fetchProducts(item);
  if (products.length === 0) return null;

  return products
    .slice()
    .sort((a, b) => {
      // Товары без цены или с нулевым остатком — в конец
      const aPrice = Number(a.price) > 0 ? 0 : 1;
      const bPrice = Number(b.price) > 0 ? 0 : 1;
      if (aPrice !== bPrice) return aPrice - bPrice;

      const aStock = Number(a.stock_total) > 0 ? 0 : 1;
      const bStock = Number(b.stock_total) > 0 ? 0 : 1;
      if (aStock !== bStock) return aStock - bStock;

      return Number(a.price) - Number(b.price);
    })[0];
}
