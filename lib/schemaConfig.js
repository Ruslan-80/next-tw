// lib/schemaConfig.js

export const TABLE_CONFIGS = {
  product: {
    name: "Товары",
    readOnly: ["id", "createdAt", "updatedAt"], // 🔒 Нельзя изменять
    restricted: ["categoryId", "categorySlug", "article", "slug"], // ⚠️ Осторожно (уникальные / связи)
    jsonFields: ["usp"], // 🧩 Поля JSON
    defaults: [
      "name",
      "basePrice",
      "stock",
      "visibility",
      "description",
      "titleSeo",
    ],
  },
  category: {
    name: "Категории",
    readOnly: ["id", "createdAt", "updatedAt"],
    restricted: ["parentId", "slug"],
    jsonFields: ["filters"],
    defaults: ["name", "fullName", "description", "visibility", "titleSeo"],
  },
  productvariation: {
    name: "Вариации товаров",
    readOnly: ["id", "createdAt", "updatedAt"],
    restricted: ["productId", "sku"],
    jsonFields: [],
    defaults: ["variationValue", "price", "stock", "isDefault"],
  },
  user: {
    name: "Пользователи",
    readOnly: ["id", "createdAt", "updatedAt", "password"],
    restricted: ["email", "cartId"],
    jsonFields: [],
    defaults: ["fullName", "role", "verified"],
  },
};
