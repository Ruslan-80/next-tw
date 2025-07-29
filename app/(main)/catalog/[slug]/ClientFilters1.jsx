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

    for (const key in filters) {
      if (filters[key].length > 0) {
        if (
          key === "kolichestvo-kvartir-schetchikov" &&
          filters[key].length === 1
        ) {
          newBaseUrl = `/catalog/${categorySlug}-na-${filters[key][0]}-kvartiry`;
        } else {
          params.set(key, filters[key].join("-"));
        }
      }
    }

    const qs = params.toString();
    const newUrl = `${newBaseUrl}${qs ? `?${qs}` : ""}`;

    // Проверяем, изменился ли URL, чтобы избежать лишних редиректов
    if (newUrl !== window.location.pathname + window.location.search) {
      router.push(newUrl, { scroll: false, force: true }); // Используем push вместо replace
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

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Фильтры</h3>
      <span>Найдено {totalProducts} товаров</span>
      <div className="w-full space-y-4">
        <Accordion type="multiple" defaultValue={Object.keys(attributes)}>
          {Object.entries(attributes).map(
            ([attributeSlug, { name, values, counts }]) => (
              <AccordionItem value={attributeSlug} key={attributeSlug}>
                <AccordionTrigger>{name}</AccordionTrigger>
                <AccordionContent className="space-y-2 pl-2 pr-4 py-1">
                  {values.map((option) => {
                    const count = counts[option] || 0;
                    const isChecked = filters[attributeSlug].includes(option);

                    return (
                      <div
                        key={option}
                        className={cn(
                          "flex items-center p-2 rounded-md transition-colors",
                          isChecked ? "bg-blue-50" : "hover:bg-gray-50"
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
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
        <Button variant="outline" onClick={clearFilters}>
          Сбросить фильтры
        </Button>
      </div>
    </div>
  );
}
