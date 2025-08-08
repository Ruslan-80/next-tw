"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import seoMetadata from "@/app/data/seoMetadata.json";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";

export default function ClientFilters({
  attributes,
  searchParams,
  baseUrl,
  categorySlug,
  totalProducts,
}) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState(() => {
    const init = {};
    for (const attr in attributes) {
      const param = searchParams[attr];
      if (Array.isArray(param)) {
        init[attr] = param;
      } else if (param) {
        init[attr] = param.split("-").filter((v) => v.trim() !== "");
      } else {
        init[attr] = [];
      }
    }
    return init;
  });

  useEffect(() => {
    const params = new URLSearchParams();
    let newBaseUrl = baseUrl;

    const categoryMetadata = seoMetadata[categorySlug] || {};
    let selectedAttribute = null;
    let selectedValue = null;

    for (const attrSlug in categoryMetadata) {
      if (attrSlug === "default" || attrSlug === "order") continue;
      const values = categoryMetadata[attrSlug];
      if (
        filters[attrSlug]?.length === 1 &&
        values[filters[attrSlug][0]]?.urlSuffix
      ) {
        selectedAttribute = attrSlug;
        selectedValue = filters[attrSlug][0];
        break;
      }
    }

    if (selectedAttribute && selectedValue) {
      newBaseUrl = `/catalog/${categorySlug}${categoryMetadata[selectedAttribute][selectedValue].urlSuffix}`;
    }

    for (const key in filters) {
      if (
        filters[key].length > 0 &&
        !(key === selectedAttribute && filters[key].includes(selectedValue))
      ) {
        params.set(key, filters[key].join("-"));
      }
    }

    const qs = params.toString();
    const newUrl = `${newBaseUrl}${qs ? `?${qs}` : ""}`;

    if (newUrl !== window.location.pathname + window.location.search) {
      router.push(newUrl, { scroll: false, force: true });
    }
  }, [filters, baseUrl, categorySlug, router]);

  const toggleCheckbox = (attributeSlug, value) => {
    setFilters((prev) => {
      const current = new Set(prev[attributeSlug]);
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }
      return { ...prev, [attributeSlug]: Array.from(current) };
    });
  };

  const clearFilters = () => {
    const reset = {};
    for (const attr in attributes) {
      reset[attr] = [];
    }
    setFilters(reset);
  };

  // Получаем порядок атрибутов из seoMetadata
  const categoryMetadata = seoMetadata[categorySlug] || {};
  const attributeOrder = categoryMetadata.order || [];

  // Сортируем атрибуты
  const sortedAttributes = [...Object.entries(attributes)].sort((a, b) => {
    const [keyA] = a;
    const [keyB] = b;
    const indexA = attributeOrder.indexOf(keyA);
    const indexB = attributeOrder.indexOf(keyB);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) {
      return -1;
    }
    if (indexB !== -1) {
      return 1;
    }
    return 0;
  });

  // Иконки для категорий (можно заменить на реальные)
  const getIconForCategory = (slug) => {
    const icons = {
      napryazhenie: "⚡",
      proizvoditel: "🌍", // Иконка страны-производителя
      "kolichestvo-kvartir-schetchikov": "🏠",
      "tip-korpusa": "📦",
      "material-korpusa": "🛡️",
      "klass-zashchity": "🔒",
      "stepen-zashchity": "🛡️",
    };
    return icons[slug] || "🔍";
  };

  // Количество выбранных фильтров
  const selectedFiltersCount = Object.values(filters).reduce(
    (total, current) => total + current.length,
    0
  );

  return (
    <div className="mb-6">
      {/* Кнопка для мобильного меню */}
      <div className="md:hidden flex items-center justify-between mb-4 p-3 bg-white rounded-xl shadow-md">
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2 w-full justify-between"
          variant="outline"
        >
          <div className="flex items-center">
            <Filter size={18} className="mr-2" />
            Фильтры
            {selectedFiltersCount > 0 && (
              <span className="ml-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {selectedFiltersCount}
              </span>
            )}
          </div>
          {isMobileMenuOpen ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </Button>
      </div>

      {/* Основной контейнер фильтров */}
      <div
        className={cn(
          "bg-white rounded-2xl shadow-lg p-4 transition-all duration-300",
          "md:block",
          isMobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Фильтры</h3>
          <span className="text-sm text-gray-500">{totalProducts} товаров</span>
        </div>

        {/* Чипсы выбранных фильтров */}
        {selectedFiltersCount > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {Object.entries(filters).map(([attrSlug, values]) =>
              values.map((value) => (
                <div
                  key={`${attrSlug}-${value}`}
                  className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center"
                >
                  <span>
                    {attributes[attrSlug]?.name}: {value}
                  </span>
                  <button
                    onClick={() => toggleCheckbox(attrSlug, value)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
            <button
              onClick={clearFilters}
              className="text-blue-600 text-sm hover:text-blue-800 ml-auto"
            >
              Очистить все
            </button>
          </div>
        )}

        <div className="space-y-4">
          <Accordion type="multiple" defaultValue={Object.keys(attributes)}>
            {sortedAttributes.map(
              ([attributeSlug, { name, values, counts }]) => (
                <AccordionItem
                  value={attributeSlug}
                  key={attributeSlug}
                  className="border-b border-gray-200 last:border-0"
                >
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <div className="flex items-center">
                      <span className="mr-2">
                        {getIconForCategory(attributeSlug)}
                      </span>
                      <span className="font-medium text-gray-800">{name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {[...values]
                        .sort((a, b) => Number(a) - Number(b))
                        .map((option) => {
                          const count = counts[option] || 0;
                          const isChecked =
                            filters[attributeSlug].includes(option);

                          return (
                            <div
                              key={option}
                              className={cn(
                                "flex items-center p-2 rounded-lg transition-all",
                                isChecked
                                  ? "bg-blue-50 border border-blue-200"
                                  : "bg-gray-50 hover:bg-gray-100"
                              )}
                            >
                              <Checkbox
                                id={`${attributeSlug}-${option}`}
                                checked={isChecked}
                                onCheckedChange={() =>
                                  toggleCheckbox(attributeSlug, option)
                                }
                                className="h-5 w-5 border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                              />
                              <label
                                htmlFor={`${attributeSlug}-${option}`}
                                className="ml-3 flex-1 flex justify-between items-center text-sm cursor-pointer"
                              >
                                <span
                                  className={cn(
                                    "text-gray-700",
                                    isChecked && "font-medium text-blue-600"
                                  )}
                                >
                                  {option}
                                </span>
                                <span
                                  className={cn(
                                    "text-xs px-2 py-0.5 rounded-full",
                                    isChecked
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-600"
                                  )}
                                >
                                  {count}
                                </span>
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>

          <Button
            onClick={clearFilters}
            variant="outline"
            className="w-full mt-4 border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Сбросить фильтры
          </Button>
        </div>
      </div>
    </div>
  );
}
