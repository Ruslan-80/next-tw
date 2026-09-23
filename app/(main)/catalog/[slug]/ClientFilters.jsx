"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Drawer } from "vaul";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import seoMetadata from "@/data/seoMetadata.json";
import { useFilterStore } from "@/lib/store/mobileFilterButton";
import {
  X,
  RotateCcw,
  Bolt,
  PanelLeft,
  ShieldCheck,
  Factory,
  CircuitBoard,
  ClipboardList,
  Box,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// ПОРЯДОК И ГРУППИРОВКА ФИЛЬТРОВ В UI
// Именно этот массив задаёт порядок блоков и атрибутов в панели.
// ─────────────────────────────────────────────────────────────
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
      "tolshchina-metalla-mm",
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

const IGNORED_KEYS = new Set([
  "page",
  "ysclid",
  "gclid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
]);

/**
 * Собирает SEO-URL из текущего набора фильтров.
 *  - Есть combination → её urlSuffix.
 *  - Нет  → склеиваем urlSuffix одиночных фильтров
 *           в порядке определения атрибутов в categoryMetadata
 *           (совпадает с порядком в seoMetadata.json).
 *  - Всё, что не удалось положить в path (мультивыбор), — в query.
 */
function buildFilterUrl(categorySlug, categoryMetadata, filters) {
  const combinations = Array.isArray(categoryMetadata.combinations)
    ? categoryMetadata.combinations
    : [];

  // Порядок атрибутов = порядок ключей в categoryMetadata (без служебных)
  const attributeOrder = Object.keys(categoryMetadata).filter(
    (k) => k !== "default" && k !== "combinations" && k !== "order",
  );

  const singleFilters = []; // { attrSlug, value, urlSuffix }
  const queryFilters = {}; // attrSlug -> values[]

  for (const attrSlug of attributeOrder) {
    const vals = filters[attrSlug];
    if (!vals || vals.length === 0) continue;

    const attrMeta = categoryMetadata[attrSlug];
    if (vals.length === 1 && attrMeta?.[vals[0]]?.urlSuffix) {
      singleFilters.push({
        attrSlug,
        value: vals[0],
        urlSuffix: attrMeta[vals[0]].urlSuffix,
      });
    } else {
      queryFilters[attrSlug] = vals;
    }
  }

  // Атрибуты, которых нет в categoryMetadata (на всякий случай)
  for (const attrSlug in filters) {
    if (attributeOrder.includes(attrSlug)) continue;
    const vals = filters[attrSlug];
    if (!vals || vals.length === 0) continue;
    queryFilters[attrSlug] = vals;
  }

  // 1) Комбинация?
  const appliedValues = Object.fromEntries(
    singleFilters.map((f) => [f.attrSlug, f.value]),
  );

  let matchedCombo = null;
  let bestLen = -1;
  for (const combo of combinations) {
    const cf = combo.filters || {};
    const cfKeys = Object.keys(cf);
    if (cfKeys.length === 0) continue;
    if (cfKeys.length !== singleFilters.length) continue;
    const fits = cfKeys.every(
      (k) => String(appliedValues[k]) === String(cf[k]),
    );
    if (fits && combo.urlSuffix.length > bestLen) {
      matchedCombo = combo;
      bestLen = combo.urlSuffix.length;
    }
  }

  // 2) Сборка суффикса
  let suffix = "";
  if (matchedCombo) {
    suffix = matchedCombo.urlSuffix;
  } else if (singleFilters.length > 0) {
    // singleFilters уже в порядке attributeOrder — ничего сортировать не надо
    suffix = singleFilters.map((f) => f.urlSuffix).join("");
  }

  const base = `/catalog/${categorySlug}${suffix}`;

  // 3) Query
  const params = new URLSearchParams();
  for (const key in queryFilters) {
    params.set(key, queryFilters[key].join("--"));
  }
  const qs = params.toString();
  return `${base}${qs ? `?${qs}` : ""}`;
}

export default function ClientFilters({
  attributes,
  searchParams,
  baseUrl,
  categorySlug,
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // ВАЖНО: ключи в filters создаём в порядке attributes,
  // как было в исходной версии — это сохраняет порядок в UI.
  const [filters, setFilters] = useState(() => {
    const init = {};
    for (const attr in attributes) {
      const param = searchParams[attr];
      init[attr] = Array.isArray(param)
        ? param
        : param
          ? String(param)
              .split("--")
              .filter((v) => v.trim() !== "")
          : [];
    }
    // Подтягиваем фильтры из searchParams, которых нет в attributes
    for (const key in searchParams) {
      if (IGNORED_KEYS.has(key)) continue;
      if (key in init) continue;
      const raw = searchParams[key];
      if (raw == null || raw === "") continue;
      init[key] = Array.isArray(raw)
        ? raw
        : String(raw).split("--").filter(Boolean);
    }
    return init;
  });

  const [tempFilters, setTempFilters] = useState(filters);

  const { isOpen, setIsOpen, setFiltersCount } = useFilterStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) setTempFilters(filters);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Строим URL из текущего набора фильтров
  useEffect(() => {
    if (!mounted) return;

    const categoryMetadata = seoMetadata[categorySlug] || {};
    const newUrl = buildFilterUrl(categorySlug, categoryMetadata, filters);

    const currentUrl = window.location.pathname + window.location.search;
    if (newUrl !== currentUrl) {
      router.push(newUrl, { scroll: false });
    }
  }, [filters, categorySlug, router, mounted]);

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

  const categoryMetadata = seoMetadata[categorySlug] || {};

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
    }, [grouped, single]);

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
              <AccordionItem value={attr.slug} key={attr.slug} className="px-3">
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
              <div className="flex flex-col h-full ">
                <div className="p-4 border-b flex justify-between items-center ">
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
                <div className="p-4 border-t ">
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
