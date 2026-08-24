"use client";

import { useRouter } from "next/navigation";
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
  Filter,
  ChevronDown,
  Settings2,
  Box,
  RotateCcw,
  Bolt,
  PanelLeft,
  ShieldCheck,
  Factory,
  CircuitBoard,
  ClipboardList,
  Ruler,
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

export default function ClientFilters({
  attributes,
  searchParams,
  baseUrl,
  categorySlug,
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(() => {
    const init = {};
    for (const attr in attributes) {
      const param = searchParams[attr];
      init[attr] = Array.isArray(param)
        ? param
        : param
          ? param.split("--").filter((v) => v.trim() !== "")
          : [];
    }
    return init;
  });

  // Временные фильтры для мобилки (чтобы не закрывалось при каждом клике)
  const [tempFilters, setTempFilters] = useState(filters);

  // В компоненте каталога/фильтров
  const { isOpen, setIsOpen, setFiltersCount } = useFilterStore();

  // Когда пользователь применяет фильтры:
  const handleApply = (count) => {
    setFiltersCount(count); // Обновляем цифру в меню
    setIsOpen(false); // Закрываем Drawer
  };

  // Ждем, пока компонент смонтируется в браузере
  useEffect(() => {
    setMounted(true);
  }, []);

  // Синхронизация при открытии
  useEffect(() => {
    if (isOpen) setTempFilters(filters);
  }, [isOpen]);

  // Обновление URL (основная логика)
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
        params.set(key, filters[key].join("--"));
      }
    }

    const qs = params.toString();
    const newUrl = `${newBaseUrl}${qs ? `?${qs}` : ""}`;
    if (newUrl !== window.location.pathname + window.location.search) {
      router.push(newUrl, { scroll: false });
    }
  }, [filters, baseUrl, categorySlug, router]);

  const toggleCheckbox = (slug, val, isMobile = false) => {
    const setter = isMobile ? setTempFilters : setFilters;
    setter((prev) => {
      const current = new Set(prev[slug]);
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

  // Внутренний компонент сетки
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
    // Собираем все слаги (ключи) всех атрибутов, чтобы передать их в defaultValue аккордеона
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
        {/* Группированные фильтры (например, Размеры) */}
        {grouped.map((group) => (
          <div key={group.id} className="space-y-2">
            <div className="flex items-center text-[16px] font-bold uppercase tracking-tighter text-text px-1">
              {group.icon} {group.name}
            </div>
            <Accordion
              type="multiple"
              defaultValue={allSlugs}
              // Раскрывает все по умолчанию
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

        {/* Одиночные параметры (Все параметры) */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase text-text px-1">
            Все параметры
          </div>
          <Accordion
            type="multiple"
            defaultValue={allSlugs} // Раскрывает все по умолчанию
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

  // Если еще не смонтирован, возвращаем заглушку, чтобы избежать ошибок гидратации
  if (!mounted) {
    return (
      <div className="h-12 w-full animate-pulse bg-gray-100 rounded-xl md:hidden" />
    );
  }
  return (
    <div className="w-full">
      {/* DESKTOP: Показываем только на md и выше */}
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

      {/* MOBILE: Показываем только до md */}
      <div className="md:hidden px-2 fixed top-34 z-40 left-4">
        <Drawer.Root direction="left" open={isOpen} onOpenChange={setIsOpen}>
          {/* <Drawer.Trigger asChild>
            <Button className="w-full px-4 rounded-xl shadow-lg flex justify-between bg-primary text-white">
              <div className="flex items-center gap-2">
                <Filter size={18} />
                <span className="font-bold">Фильтры</span>
              </div>
              <ChevronDown size={18} className="opacity-50" />
            </Button>
          </Drawer.Trigger> */}

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed inset-y-0 left-0 w-[85%] max-w-[340px] bg-background z-50 flex flex-col border-r shadow-2xl outline-none transition-transform">
              <div className="flex flex-col h-full ">
                {/* Шапка Drawer */}
                <div className="p-4 border-b flex justify-between items-center ">
                  {/* ВАЖНО: Используем Drawer.Title для SEO и доступности */}
                  <Drawer.Title className="text-lg font-bold">
                    Настройка фильтров
                  </Drawer.Title>

                  {/* Если заголовок не нужен визуально, добавьте ему класс "sr-only" (screen-reader only):
                        <Drawer.Title className="sr-only">Фильтры товаров</Drawer.Title> 
                    */}

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Описание (необязательно, но рекомендуется для полной тишины в консоли) */}
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
