"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Breadcrumbs({ items }) {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  if (!items || items.length === 0) return null;

  // Формируем список хлебных крошек
  const breadcrumbItems = useMemo(() => {
    return [
      { name: "Главная", slug: "", href: "/" },
      ...items.map((item) => ({
        name: item.name,
        slug: item.slug,
        href: `/catalog/${item.slug}${queryString ? `?${queryString}` : ""}`,
      })),
    ];
  }, [items, queryString]);

  // Формируем JSON-LD структуру
  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://electroshit-pro.ru"}${
          item.href
        }`,
      })),
    }),
    [breadcrumbItems],
  );

  // Вставляем/обновляем JSON-LD в <head> при каждом изменении items
  useEffect(() => {
    const scriptId = "breadcrumbs-jsonld";
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(breadcrumbJsonLd);
  }, [breadcrumbJsonLd]);

  return (
    <nav aria-label="Breadcrumb" className="p-4">
      <ol className="hidden md:flex flex-wrap items-center space-x-2 text-sm text-gray-600">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              {isLast ? (
                <span
                  className="font-medium text-gray-900 break-words"
                  title={item.name}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-orange-400 transition-colors break-words"
                  title={item.name}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
