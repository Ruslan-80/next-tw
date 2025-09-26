"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Breadcrumbs({ items }) {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="p-4">
      <ol className="hidden md:flex flex-wrap items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link href="/" className="hover:text-orange-400 transition-colors">
            Главная
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.slug} className="flex items-center space-x-2 ">
              <span className="text-gray-400">/</span>
              {isLast ? (
                <span
                  className="font-medium text-gray-900 break-words"
                  title={item.name} // Tooltip с полным названием
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={`/catalog/${item.slug}${
                    queryString ? `?${queryString}` : ""
                  }`}
                  className="hover:text-orange-400 transition-colors break-words"
                  title={item.name} // Tooltip при обрезке
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
