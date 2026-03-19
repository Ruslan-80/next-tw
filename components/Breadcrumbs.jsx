"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

// Добавляем productName в пропсы
export default function Breadcrumbs({ items, productName }) {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  // Если нет ни категорий, ни имени продукта — скрываем
  if ((!items || items.length === 0) && !productName) return null;

  const breadcrumbItems = useMemo(() => {
    // 1. Базовая "Главная"
    const baseItems = [{ name: "Главная", slug: "", href: "/" }];

    // 2. Добавляем категории из items
    const categoryItems = (items || []).map((item) => ({
      name: item.name,
      slug: item.slug,
      href: `/catalog/${item.slug}${queryString ? `?${queryString}` : ""}`,
    }));

    const result = [...baseItems, ...categoryItems];

    // 3. Если передан productName, пушим его в самый конец без href
    if (productName) {
      result.push({
        name: productName,
        slug: "",
        href: "", // Ссылка не нужна, так как мы уже на странице товара
      });
    }

    return result;
  }, [items, queryString, productName]);

  // Формируем JSON-LD структуру (теперь она подхватит и продукт)
  const breadcrumbJsonLd = useMemo(() => {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      "https://electroshit-pro.ru";

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => {
        const itemData = {
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
        };

        // Для последнего элемента (продукта) Google допускает отсутствие item ID,
        // но лучше оставить текущий URL страницы, если href пустой
        if (item.href) {
          itemData.item = `${siteUrl}${item.href}`;
        }

        return itemData;
      }),
    };
  }, [breadcrumbItems]);

  // Эффект для JSON-LD (без изменений)
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
    } else if (script.textContent !== json) {
      script.textContent = json;
    }
  }, [breadcrumbJsonLd]);

  return (
    <section className="hidden md:block sticky top-0 z-50 border-b border-gray-200 bg-gray-100/95 backdrop-blur supports-[backdrop-filter]:bg-gray-100/60">
      <nav
        className="container mx-auto px-6 py-2 flex flex-wrap items-center text-sm text-gray-600"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        aria-label="Breadcrumb"
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
    </section>
  );
}
