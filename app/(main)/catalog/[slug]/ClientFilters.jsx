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

export default function ClientFilters({
  attributes,
  searchParams,
  baseUrl,
  categorySlug,
  totalProducts,
}) {
  const router = useRouter();

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

  return (
    <div className="bg-blue-300/20 rounded-2xl mt-13 mb-6 p-4">
      <h3 className="text-xl font-semibold mb-2">Фильтры</h3>
      <span className="text-xs">Найдено {totalProducts} товаров</span>
      <div className="w-full space-y-4 text-gray-800">
        <Accordion type="multiple" defaultValue={Object.keys(attributes)}>
          {sortedAttributes.map(([attributeSlug, { name, values, counts }]) => (
            <AccordionItem value={attributeSlug} key={attributeSlug}>
              <AccordionTrigger>{name}</AccordionTrigger>
              <AccordionContent className="grid grid-cols-2 lg:grid-cols-3 gap-3 ">
                {[...values]
                  .sort((a, b) => Number(a) - Number(b)) // Сортировка значений как чисел
                  .map((option) => {
                    const count = counts[option] || 0;
                    const isChecked = filters[attributeSlug].includes(option);

                    return (
                      <div
                        key={option}
                        className={cn(
                          "flex items-center p-2 rounded-md transition-colors",
                          isChecked ? "bg-blue-300/30" : "hover:bg-blue-200/50"
                        )}
                      >
                        <Checkbox
                          id={`${attributeSlug}-${option}`}
                          checked={isChecked}
                          onCheckedChange={() =>
                            toggleCheckbox(attributeSlug, option)
                          }
                          className="h-4 w-4 border-gray-300 data-[state=checked]:border-blue-500"
                        />
                        <label
                          htmlFor={`${attributeSlug}-${option}`}
                          className="ml-3 flex-1 flex justify-between items-center text-sm cursor-pointer"
                        >
                          <span
                            className={cn(
                              "text-gray-800",
                              isChecked && "font-medium text-blue-600"
                            )}
                          >
                            {option}
                          </span>
                          <span
                            className={cn(
                              "hidden text-sm px-2 py-0.5 rounded-full",
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
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button variant="outline" onClick={clearFilters}>
          Сбросить фильтры
        </Button>
      </div>
    </div>
  );
}
