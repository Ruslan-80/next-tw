"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Типы для продуктов (на основе вашей Prisma-схемы)
// type Product = {
//   id: string;
//   name: string;
//   description: string | null;
//   price: number;
//   mediaFiles: { url: string }[];
//   attributes: { attribute: { name: string; value: string } }[];
//   tags: { tag: { name: string } }[];
// };

export default function PopularProducts({ categorySlug }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log("categorySlug:", categorySlug);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       const response = await fetch("/api/products/popular");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch products");
  //       }
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (err) {
  //       setError("Error loading products");
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products/popular", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categorySlug }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Error loading products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (categorySlug) fetchProducts();
  }, [categorySlug]);

  if (isLoading)
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-background rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-background aspect-square animate-pulse" />
              <div className="p-5">
                <div className="h-6 bg-background rounded mb-3 animate-pulse" />
                <div className="h-4 bg-background rounded mb-4 animate-pulse" />
                <div className="flex justify-between">
                  <div className="h-6 w-16 bg-background rounded animate-pulse" />
                  <div className="h-10 w-24 bg-background rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10">
        <div className="text-red-500 text-lg">{error}</div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Повторить попытку
        </button>
      </div>
    );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
      <h2 className="text-3xl font-bold mb-8 text-text text-center">
        Популярные товары
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <Link href={`/product/${product.slug}`}>
              <div className="relative w-full aspect-square">
                {product.mediaFiles[0]?.url ? (
                  <Image
                    src={product.mediaFiles[0].url}
                    alt={product.name}
                    fill
                    className="object-cover rounded-xl"
                    sizes={"(max-width: 768px) 100vw, 192px"}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-text">Изображение отсутствует</span>
                  </div>
                )}
              </div>
            </Link>

            <div className="py-8 px-4">
              <Link href={`/product/${product.slug}`}>
                <h3 className="flex text-lg h-30 font-bold mb-2 text-text hover:text-accent transition-colors items-center">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center mt-5 mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-text text-lg ml-2">4.8</span>
              </div>

              {/* <p className="text-gray-600 mb-3 line-clamp-2">
                {product.description?.slice(0, 100)}...
              </p> */}

              <div className="flex flex-col items-center mt-10 gap-5">
                {/* <span className="text-2xl font-bold text-green-600">
                  {product.basePrice} руб.
                </span> */}
                <div className="text-3xl font-bold text-text mb-5">
                  {product.basePrice
                    ? `${product.basePrice.toLocaleString("ru-RU")} руб.`
                    : "Цена недоступна"}
                </div>
                <button className="btn-gold w-full">
                  <Link href={`/product/${product.slug}`}>Подробнее</Link>
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {product.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag.tag.name}
                    className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {tag.tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
