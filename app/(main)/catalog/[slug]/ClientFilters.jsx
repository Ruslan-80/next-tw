"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Drawer } from "vaul"; // Библиотека для мобильного выезда
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../../components/ui/accordion";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";
import seoMetadata from "../../../../app/data/seoMetadata.json";
import { X, Filter, ChevronDown, RotateCcw } from "lucide-react";

export default function ClientFilters({
  attributes,
  searchParams,
  baseUrl,
  categorySlug,
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // Для мобильного Drawer

  // Основное состояние фильтров (связано с URL)
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

  // Временное состояние для мобильной версии (буфер)
  const [tempFilters, setTempFilters] = useState(filters);

  // Синхронизируем буфер при открытии модалки
  useEffect(() => {
    if (isOpen) setTempFilters(filters);
  }, [isOpen, filters]);

  // Эффект обновления URL
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
      router.push(newUrl, { scroll: false });
    }
  }, [filters, baseUrl, categorySlug, router]);

  const toggleCheckbox = (attributeSlug, value, isMobile = false) => {
    const setter = isMobile ? setTempFilters : setFilters;
    setter((prev) => {
      const current = new Set(prev[attributeSlug]);
      current.has(value) ? current.delete(value) : current.add(value);
      return { ...prev, [attributeSlug]: Array.from(current) };
    });
  };

  const clearFilters = () => {
    const reset = {};
    for (const attr in attributes) reset[attr] = [];
    setFilters(reset);
    setTempFilters(reset);
  };

  const categoryMetadata = seoMetadata[categorySlug] || {};
  const attributeOrder = categoryMetadata.order || [];
  const allSlugs = Object.keys(attributes);

  const sortedAttributes = useMemo(() => {
    return [...Object.entries(attributes)].sort((a, b) => {
      const indexA = attributeOrder.indexOf(a[0]);
      const indexB = attributeOrder.indexOf(b[0]);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
  }, [attributes, attributeOrder]);

  const getIconForCategory = (slug) => {
    const icons = {
      napryazhenie: "⚡",
      proizvoditel: "🌍",
      "kolichestvo-kvartir-schetchikov": "🏠",
      "tip-korpusa": "📦",
      "material-korpusa": "🛡️",
      "klass-zashchity": "🔒",
      "stepen-zashchity": "🛡️",
    };
    return icons[slug] || "🔍";
  };

  const selectedFiltersCount = Object.values(filters).flat().length;

  // Внутренний контент фильтров (общий для десктопа и мобилки)
  const FilterBody = ({ isMobile = false }) => (
    <div className="space-y-4">
      <Accordion type="multiple" defaultValue={allSlugs} className="w-full">
        {sortedAttributes.map(([attributeSlug, { name, values, counts }]) => (
          <AccordionItem
            value={attributeSlug}
            key={attributeSlug}
            className="border-b border-gray-200 last:border-0"
          >
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="flex items-center">
                <span className="mr-2">
                  {getIconForCategory(attributeSlug)}
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {name}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="grid grid-cols-2 gap-2">
                {[...values]
                  .sort((a, b) =>
                    isNaN(a) ? a.localeCompare(b) : Number(a) - Number(b),
                  )
                  .map((option) => {
                    const count = counts[option] || 0;
                    const currentFilters = isMobile ? tempFilters : filters;
                    const isChecked =
                      currentFilters[attributeSlug]?.includes(option);

                    return (
                      <div
                        key={option}
                        onClick={() =>
                          toggleCheckbox(attributeSlug, option, isMobile)
                        }
                        className={cn(
                          "flex items-center p-2 rounded-lg transition-all cursor-pointer",
                          isChecked
                            ? "bg-blue-50 border border-blue-200 dark:bg-gray-700"
                            : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800",
                        )}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => {}} // Обработка идет через родительский div
                          className="h-5 w-5 border-gray-300 data-[state=checked]:bg-blue-500"
                        />
                        <div className="ml-3 flex-1 flex justify-between items-center text-sm">
                          <span
                            className={cn(
                              "text-gray-700 dark:text-gray-200",
                              isChecked &&
                                "font-medium text-blue-600 dark:text-blue-400",
                            )}
                          >
                            {option}
                          </span>
                          <span
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              isChecked
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-200 text-gray-600",
                            )}
                          >
                            {count}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );

  return (
    <div className="mb-4">
      {/* Кнопка открытия мобильного Drawer */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <Drawer.Root direction="left" open={isOpen} onOpenChange={setIsOpen}>
          <Drawer.Trigger asChild>
            <Button
              className="flex items-center gap-2 w-full justify-between h-14 bg-white text-gray-800 border shadow-md rounded-xl"
              variant="outline"
            >
              <span className="flex items-center font-bold">
                <Filter size={18} className="mr-2 text-blue-500" />
                Фильтры
                {selectedFiltersCount > 0 && (
                  <span className="ml-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {selectedFiltersCount}
                  </span>
                )}
              </span>
              <ChevronDown size={18} className="text-gray-400" />
            </Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed inset-y-0 left-0 w-[85%] max-w-[340px] bg-white dark:bg-gray-900 z-50 flex flex-col border-r outline-none">
              <div className="p-4 border-b flex justify-between items-center">
                <Drawer.Title className="text-xl font-bold">
                  Фильтры
                </Drawer.Title>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterBody isMobile={true} />
              </div>
              <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
                <Button
                  className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold"
                  onClick={() => {
                    setFilters(tempFilters);
                    setIsOpen(false);
                  }}
                >
                  Применить изменения
                </Button>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>

      {/* ДЕСКТОПНАЯ ВЕРСИЯ (Ваш изначальный визуал) */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Фильтры
          </h3>
          {selectedFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-500 hover:bg-red-50"
            >
              <RotateCcw className="w-3 h-3 mr-1" /> Сброс
            </Button>
          )}
        </div>

        {/* Чипсы выбранных фильтров */}
        {selectedFiltersCount > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {Object.entries(filters).map(([attrSlug, values]) =>
              values.map((value) => (
                <div
                  key={`${attrSlug}-${value}`}
                  className="bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1 text-xs flex items-center"
                >
                  <span>
                    {attributes[attrSlug]?.name}: {value}
                  </span>
                  <button
                    onClick={() => toggleCheckbox(attrSlug, value)}
                    className="ml-2 text-blue-400 hover:text-blue-600"
                  >
                    <X size={12} />
                  </button>
                </div>
              )),
            )}
          </div>
        )}

        <FilterBody isMobile={false} />

        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full mt-6 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-gray-600 dark:text-gray-300"
        >
          Сбросить все
        </Button>
      </div>
    </div>
  );
}
