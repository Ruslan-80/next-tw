"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Drawer } from "vaul";
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
import { useFilterStore } from "@/lib/store/mobileFilterButton";
import {
  X,
  RotateCcw,
  Bolt,
  PanelLeft,
  ShieldCheck,
  Factory,
  CircuitBoard,
  Box,
  ClipboardList,
} from "lucide-react";

const FILTER_GROUPS = [
  {
    id: "purpose-and-identification",
    name: "Назначение и идентификация",
    icon: (
      <ClipboardList className="icon-spin-y-infinite w-6 h-6 mr-4 text-primary" />
    ),
    attributes: [
      "naznachenie-paneli",
      "nomer-razrabotki",
      "strana",
      "proizvoditel",
    ],
  },
  {
    id: "electrical-characteristics",
    name: "Электротехнические характеристики",
    icon: <Bolt className="icon-spin-y-infinite w-6 h-6 mr-4 text-primary" />,
    attributes: [
      "kolichestvo-vvodov",
      "nominalnoe-napryazhenie",
      "nominalnyj-tok",
      "chastota-gc",
    ],
  },
  {
    id: "constructive-features",
    name: "Конструктивные особенности",
    icon: (
      <PanelLeft className="icon-spin-y-infinite w-6 h-6 mr-4 text-primary" />
    ),
    attributes: [
      "sposob-montazha",
      "material-izdeliya",
      "tolshina-metalla-mm",
      "otdelka-poverhnosti",
      "cvet",
    ],
  },
  {
    id: "protection-and-safety",
    name: "Защита и безопасность",
    icon: (
      <ShieldCheck className="icon-spin-y-infinite w-6 h-6 mr-4 text-primary" />
    ),
    attributes: [
      "stepen-zashity-ip",
      "klass-zashity",
      "zazemlenie",
      "nalichie-zamka",
    ],
  },
  {
    id: "operating-conditions",
    name: "Условия эксплуатации",
    icon: (
      <Factory className="icon-spin-y-infinite w-6 h-6 mr-4 text-primary" />
    ),
    attributes: ["klimaticheskoe-ispolnenie", "srok-sluzhby-let"],
  },
  {
    id: "equipment",
    name: "Устанавливаемое оборудование",
    icon: (
      <CircuitBoard className="icon-spin-y-infinite w-6 h-6 mr-4 text-primary" />
    ),
    attributes: [
      "vyklyuchatel-na-othodyashih-liniyah",
      "s-blokom-avr",
      "kontaktory",
      "schetchik",
      "transformator-toka",
    ],
  },
  {
    id: "commercial-parameters",
    name: "Логистические параметры",
    icon: <Box className="icon-spin-y-infinite w-6 h-6 mr-4 text-primary" />,
    attributes: [
      "ed-izmereniya",
      "kratnost",
      "srok-izgotovleniya",
      "garantijnyj-srok-mes",
      "vysota",
      "shirina",
      "glubina",
      "ves-kg",
    ],
  },
];

/**
 * Извлекает базовый slug категории и фильтры, зашитые в ЧПУ.
 */
function parseSeoSlug(currentSlug) {
  const baseSlug = Object.keys(seoMetadata).find(
    (key) => currentSlug === key || currentSlug.startsWith(`${key}-`),
  );

  if (!baseSlug) {
    return { baseCategorySlug: currentSlug, seoFilters: {} };
  }

  if (currentSlug === baseSlug) {
    return { baseCategorySlug: baseSlug, seoFilters: {} };
  }

  const seoConfig = seoMetadata[baseSlug];
  const suffix = currentSlug.slice(baseSlug.length);

  // 1. Проверяем комбинации
  if (seoConfig?.combinations && Array.isArray(seoConfig.combinations)) {
    const combo = seoConfig.combinations.find((c) => c.urlSuffix === suffix);
    if (combo) {
      const seoFilters = {};
      for (const [attr, val] of Object.entries(combo.attributes || {})) {
        seoFilters[attr] = [val];
      }
      return { baseCategorySlug: baseSlug, seoFilters };
    }
  }

  // 2. Проверяем одиночные ЧПУ
  if (seoConfig) {
    for (const [attrSlug, valuesMap] of Object.entries(seoConfig)) {
      if (["default", "combinations", "order"].includes(attrSlug)) continue;

      for (const [valKey, valObj] of Object.entries(valuesMap)) {
        if (valObj?.urlSuffix === suffix) {
          return {
            baseCategorySlug: baseSlug,
            seoFilters: { [attrSlug]: [valKey] },
          };
        }
      }
    }
  }

  return { baseCategorySlug: baseSlug, seoFilters: {} };
}

/**
 * Строит итоговый URL с учетом ЧПУ и оставшихся фильтров в Query Params.
 */
function buildFilterUrl(baseCategorySlug, selectedFilters, seoConfig) {
  let bestSeoBaseUrl = `/catalog/${baseCategorySlug}`;
  let usedFilterMap = {};

  // 1. Проверяем совпадение с комбинациями ЧПУ
  if (seoConfig?.combinations && Array.isArray(seoConfig.combinations)) {
    const matchedCombo = seoConfig.combinations.find((combo) => {
      if (!combo?.attributes) return false;
      return Object.entries(combo.attributes).every(([attrKey, val]) =>
        selectedFilters[attrKey]?.includes(val),
      );
    });

    if (matchedCombo) {
      bestSeoBaseUrl = `/catalog/${baseCategorySlug}${matchedCombo.urlSuffix}`;
      Object.entries(matchedCombo.attributes).forEach(([k, v]) => {
        usedFilterMap[k] = [v];
      });
    }
  }

  // 2. Если комбинация не подошла, проверяем одиночные ЧПУ
  if (Object.keys(usedFilterMap).length === 0 && seoConfig) {
    for (const [attrSlug, valuesMap] of Object.entries(seoConfig)) {
      if (["default", "combinations", "order"].includes(attrSlug)) continue;

      const selectedValues = selectedFilters[attrSlug] || [];
      const matchedValue = selectedValues.find(
        (val) => valuesMap[val]?.urlSuffix,
      );

      if (matchedValue) {
        bestSeoBaseUrl = `/catalog/${baseCategorySlug}${valuesMap[matchedValue].urlSuffix}`;
        usedFilterMap[attrSlug] = [matchedValue];
        break;
      }
    }
  }

  // 3. Собираем все неиспользованные параметры в Query String
  const queryParams = new URLSearchParams();

  Object.entries(selectedFilters).forEach(([attrSlug, values]) => {
    if (!Array.isArray(values) || values.length === 0) return;

    const usedValues = usedFilterMap[attrSlug] || [];
    const remainingValues = values.filter((v) => !usedValues.includes(v));

    if (remainingValues.length > 0) {
      queryParams.set(attrSlug, remainingValues.join("--"));
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `${bestSeoBaseUrl}?${queryString}` : bestSeoBaseUrl;
}

/**
 * Вспомогательная функция расчёта начальных/актуальных значений фильтров.
 */
function getInitialFilters(attributes, searchParams, seoFilters) {
  const init = {};
  for (const attr in attributes) {
    const param = searchParams[attr];
    const fromQuery = Array.isArray(param)
      ? param
      : typeof param === "string"
        ? param.split("--").filter((v) => v.trim() !== "")
        : [];

    const fromSeo = seoFilters[attr] || [];
    init[attr] = Array.from(new Set([...fromQuery, ...fromSeo]));
  }
  return init;
}

export default function ClientFilters({
  attributes,
  searchParams,
  categorySlug,
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const { baseCategorySlug, seoFilters } = useMemo(
    () => parseSeoSlug(categorySlug),
    [categorySlug],
  );

  const categoryMetadata = seoMetadata[baseCategorySlug] || {};

  // Инициализация состояния
  const [filters, setFilters] = useState(() =>
    getInitialFilters(attributes, searchParams, seoFilters),
  );
  const [tempFilters, setTempFilters] = useState(filters);
  const { isOpen, setIsOpen } = useFilterStore();
  const currentSearchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Синхронизация локального состояния filters при изменении пропсов от сервера
  useEffect(() => {
    const nextFilters = getInitialFilters(attributes, searchParams, seoFilters);
    setFilters(nextFilters);
  }, [searchParams, categorySlug, seoFilters, attributes]);

  useEffect(() => {
    if (isOpen) setTempFilters(filters);
  }, [isOpen]);

  // Маршрутизация при изменении фильтров
  useEffect(() => {
    if (!mounted) return;

    const newUrl = buildFilterUrl(baseCategorySlug, filters, categoryMetadata);

    // Получаем текущий путь из браузера
    const currentPath = window.location.pathname;
    const currentQuery = currentSearchParams.toString();
    const fullCurrentUrl = currentQuery
      ? `${currentPath}?${currentQuery}`
      : currentPath;

    // Сравниваем только если новый URL действительно отличается от текущего
    if (newUrl !== fullCurrentUrl) {
      router.push(newUrl, { scroll: false });
    }
  }, [
    filters,
    baseCategorySlug,
    categoryMetadata,
    router,
    mounted,
    currentSearchParams,
  ]);

  const toggleCheckbox = (slug, val, isMobile = false) => {
    const setter = isMobile ? setTempFilters : setFilters;
    setter((prev) => {
      const current = new Set(prev[slug] || []);
      current.has(val) ? current.delete(val) : current.add(val);
      return { ...prev, [slug]: Array.from(current) };
    });
  };

  const clearAll = () => {
    const reset = {};
    for (const attr in attributes) reset[attr] = [];
    setFilters(reset);
    setTempFilters(reset);
  };

  const { grouped, single } = useMemo(() => {
    const used = new Set();
    const g = FILTER_GROUPS.map((group) => ({
      ...group,
      items: group.attributes
        .filter((s) => attributes[s])
        .map((s) => {
          used.add(s);
          return { slug: s, ...attributes[s] };
        }),
    })).filter((g) => g.items.length > 0);

    const s = Object.entries(attributes)
      .filter(([slug]) => !used.has(slug))
      .map(([slug, data]) => ({ slug, ...data }));

    return { grouped: g, single: s };
  }, [attributes]);

  const FilterGrid = ({ attr, isMobile }) => (
    <div className="grid grid-cols-2 gap-2 pt-2">
      {attr.values.map((option) => {
        const isChecked = (isMobile ? tempFilters : filters)[
          attr.slug
        ]?.includes(option);
        return (
          <label
            key={option}
            className={cn(
              "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border",
              isChecked
                ? "bg-primary/5 border-primary/30"
                : "bg-transparent border-transparent hover:bg-secondary/50",
            )}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Checkbox
                checked={isChecked}
                onCheckedChange={() =>
                  toggleCheckbox(attr.slug, option, isMobile)
                }
              />
              <span className="text-sm text-text font-medium break-words">
                {option}
              </span>
            </div>
            <span className="text-[10px] opacity-40">
              {attr.counts[option] || 0}
            </span>
          </label>
        );
      })}
    </div>
  );

  const FilterContent = ({ isMobile = false }) => {
    const allSlugs = useMemo(() => {
      const slugs = [];
      grouped.forEach((group) =>
        group.items.forEach((attr) => slugs.push(attr.slug)),
      );
      single.forEach((attr) => slugs.push(attr.slug));
      return slugs;
    }, []);

    return (
      <div className="space-y-6">
        {grouped.map((group) => (
          <div key={group.id} className="space-y-2">
            <div className="flex items-center text-[16px] font-bold uppercase tracking-tighter text-text px-1">
              {group.icon} {group.name}
            </div>
            <Accordion
              type="multiple"
              defaultValue={allSlugs}
              className="space-y-1.5"
            >
              {group.items.map((attr) => (
                <AccordionItem
                  value={attr.slug}
                  key={attr.slug}
                  className="px-3"
                >
                  <AccordionTrigger className="text-sm text-text py-3 font-semibold hover:no-underline">
                    {attr.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <FilterGrid attr={attr} isMobile={isMobile} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        {single.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] font-bold uppercase text-text px-1">
              Все параметры
            </div>
            <Accordion
              type="multiple"
              defaultValue={allSlugs}
              className="space-y-1.5"
            >
              {single.map((attr) => (
                <AccordionItem
                  value={attr.slug}
                  key={attr.slug}
                  className="px-3"
                >
                  <AccordionTrigger className="text-sm text-text py-3 font-semibold hover:no-underline">
                    {attr.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <FilterGrid attr={attr} isMobile={isMobile} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    );
  };

  if (!mounted) {
    return (
      <div className="h-12 w-full animate-pulse bg-gray-100 rounded-xl md:hidden" />
    );
  }

  return (
    <div className="w-full">
      <aside className="hidden md:block rounded-3xl p-2 border top-24">
        <div className="flex justify-between items-center my-2 mx-4">
          <h3 className="font-black text-text text-xl">Фильтры</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-destructive text-text h-8"
          >
            <RotateCcw className="text-text w-3 h-3 mr-1" /> Сброс
          </Button>
        </div>
        <FilterContent />
      </aside>

      <div className="md:hidden px-2 fixed top-34 z-40 left-4">
        <Drawer.Root direction="left" open={isOpen} onOpenChange={setIsOpen}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed inset-y-0 left-0 w-[85%] max-w-[340px] bg-background z-50 flex flex-col border-r shadow-2xl outline-none transition-transform">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b flex justify-between items-center">
                  <Drawer.Title className="text-lg font-bold">
                    Настройка фильтров
                  </Drawer.Title>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <Drawer.Description className="sr-only">
                  Выберите параметры для фильтрации товаров в категории
                </Drawer.Description>

                <div className="flex-1 overflow-y-auto p-4">
                  <FilterContent isMobile={true} />
                </div>

                <div className="p-4 border-t">
                  <Button
                    className="w-full h-12 font-bold text-lg text-white bg-primary"
                    onClick={() => {
                      setFilters(tempFilters);
                      setIsOpen(false);
                    }}
                  >
                    Применить
                  </Button>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}
