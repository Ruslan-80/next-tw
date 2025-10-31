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
  const breadcrumbJsonLd = useMemo(() => {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      "https://example.com";

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${siteUrl}${item.href}`,
      })),
    };
  }, [breadcrumbItems]);

  // Вставляем/обновляем JSON-LD в <head>
  useEffect(() => {
    const scriptId = "breadcrumbs-jsonld";
    let script = document.getElementById(scriptId);

    const json = JSON.stringify(breadcrumbJsonLd);

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      script.text = json;
      document.head.appendChild(script);
    } else {
      // Обновляем только при изменении контента
      if (script.textContent !== json) {
        script.textContent = json;
      }
    }

    // Можно почистить при размонтировании, если нужно
    return () => {
      // document.head.removeChild(script);
    };
  }, [breadcrumbJsonLd]);

  return (
    <nav
      id="breadcrumbs-anchor"
      className="flex flex-wrap items-center text-sm text-gray-600 p-4"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
      aria-label="Breadcrumb"
      data-qa="breadcrumbs"
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        const position = index + 1;

        return (
          <div
            key={index}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {!isLast ? (
              <>
                <Link
                  href={item.href}
                  className="hover:text-orange-400 transition-colors break-words"
                  itemProp="item"
                  title={item.name}
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
                <meta itemProp="position" content={position} />
                <span className="mx-1 text-gray-400">/</span>
              </>
            ) : (
              <>
                <span
                  className="text-gray-900 font-medium break-words"
                  itemProp="name"
                  title={item.name}
                >
                  {item.name}
                </span>
                <meta itemProp="position" content={position} />
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}
