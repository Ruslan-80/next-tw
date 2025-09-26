"use client";

import { useEffect, useState, useMemo } from "react";
import useCompareStore from "@/lib/store/compareStore";

const ComparePage = () => {
  const { compareIds, removeFromCompare, clearCompare } = useCompareStore();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!compareIds.length) {
          setProducts([]);
          return;
        }

        const response = await fetch(
          `/api/products/compare/${compareIds.join("-")}`
        );
        if (!response.ok) {
          throw new Error(`Ошибка загрузки товаров: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("API вернул некорректные данные");
        }
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [compareIds]);

  const characteristics = useMemo(() => {
    const allChars = new Set();
    products.forEach((product) => {
      if (Array.isArray(product.attributes)) {
        product.attributes.forEach((attr) => {
          if (attr?.attributeName) {
            allChars.add(attr.attributeName);
          }
        });
      }
    });
    return Array.from(allChars);
  }, [products]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Сравнение товаров</h1>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Сравнение товаров</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Сравнение товаров</h1>
      {products.length > 0 && characteristics.length > 0 ? (
        <>
          <button
            onClick={clearCompare}
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Очистить все
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Характеристика</th>
                  {products.map((product) => (
                    <th key={product.id} className="border p-2">
                      <div className="flex flex-col items-center">
                        <span>{product.name}</span>
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="mt-2 text-red-500 text-sm"
                        >
                          Удалить
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {characteristics.map((char) => (
                  <tr key={char}>
                    <td className="border p-2 font-medium">{char}</td>
                    {products.map((product) => {
                      const attr = product.attributes?.find(
                        (a) => a.attributeName === char
                      );
                      return (
                        <td
                          key={`${product.id}-${char}`}
                          className="border p-2 text-center"
                        >
                          {attr ? attr.attributeValueName : "N/A"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-center py-10">
          Нет товаров или характеристик для сравнения
        </p>
      )}
    </div>
  );
};

export default ComparePage;
