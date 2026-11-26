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
    <section className="hidden md:block sticky top-0 z-50 bg-gradient-metal animate-metal text-text backdrop-blur ">
      <nav
        className="container mx-auto px-6 py-2 flex flex-wrap items-center text-sm text-gray-600"
        aria-label="Breadcrumb"
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const position = index + 1;

          return (
            <div key={index} className="flex items-center">
              {!isLast ? (
                <>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-text transition-colors break-words"
                    title={item.name}
                  >
                    <span>{item.name}</span>
                  </Link>
                  <span className="mx-1 text-text">/</span>
                </>
              ) : (
                <>
                  <span
                    className="text-muted font-medium break-words"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </nav>
    </section>
  );
}
