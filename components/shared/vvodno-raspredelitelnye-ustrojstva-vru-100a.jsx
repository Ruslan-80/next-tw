"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

const CONSULTATION_LABEL = "Получить консультацию или заказать";
const PHONE_LABEL = "Позвонить";
const PHONE = "+74993901467";
const REQUEST_LABEL = "Оставить заявку";

const H2 = "text-2xl md:text-3xl font-bold";

const QUICK_LINKS = [
  { href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-63a", label: "ВРУ 63А" },
  { href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-125a", label: "ВРУ 125А" },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-avtomaticheskij-vyklyuchatel",
    label: "На автоматах",
  },
];

const CABLE_TABLE = [
  {
    material: "Медь (Cu)",
    section: "25 – 35 мм²",
    clampType: "Болтовой / клемма",
  },
  {
    material: "Алюминий (Al)",
    section: "35 – 50 мм²",
    clampType: "Болтовой / клемма",
  },
];

const FAQ = [
  {
    q: "Какую мощность выдерживает ВРУ 100А?",
    a: "При трехфазной сети (380В) устройство на 100 ампер способно пропустить около 65 кВт активной мощности.",
  },
  {
    q: "Нужны ли трансформаторы тока для организации коммерческого учета в вру 100А?",
    a: "Для таких вру могут применяться как счетчики прямого включения (рассчитанные на ток до 100 А), так и схема с трансформаторами тока (например, 100/5). Использование прямой схемы позволяет сэкономить место в корпусе, и снизить итоговую стоимость сборки.",
  },
  {
    q: "Какая степень защиты корпуса требуется для установки 100 амперного щита вру на улице?",
    a: "Если вру монтируется на фасаде здания или открытой площадке, его корпус должен иметь степень пыле- и влагозащиты не ниже IP54 (а лучше IP65) и сальниковые уплотнители для ввода кабелей.",
  },
];

export function vru100Top() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-metal animate-metal">
      <section className="container mx-auto py-6 text-xl lg:text-2xl">
        {/* Основной сетчатый блок: Текст + Изображение */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Левая колонка — текст */}
          <div className="animate-fade-in-up space-y-8 px-2">
            <div className="space-y-4">
              <h2 className="text-text pb-4 text-2xl font-bold leading-tight lg:text-5xl">
                Вводно-распределительное устройство ВРУ 100А
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>Щит вру на 100 ампер</strong> — это базовый узел для
                приема, учета и защиты электрических сетей 380/220В. Стандартное{" "}
                <strong>вводно распределительное устройство</strong> оптимально
                подходит для питания малых коммерческих павильонов, ресторанов,
                небольших офисных зданий и многоквартирных домов малой этажности
                с суммарной нагрузкой до 50-65 кВт. Конструктивно{" "}
                <strong>ВРУ 100А</strong> позволяет организовать как
                однолинейный, так и двухлинейный ввод.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => handleButtonClick(CONSULTATION_LABEL)}
                className="btn-gold py-8 text-xl text-black"
              >
                {CONSULTATION_LABEL}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Правая колонка — изображение */}
          <div className="relative mx-auto w-full max-w-[350px] animate-slide-in-right md:max-w-[450px] lg:max-w-[500px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl" />
            <div className="relative aspect-square overflow-hidden rounded-3xl p-4 shadow-2xl md:p-6 lg:p-8">
              <Image
                src="/images/categories/vru-all.webp"
                alt="Вводно-распределительные устройства ВРУ на 100 А"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                className="rounded-3xl object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Блок быстрых ссылок во всю ширину под двухколоночным блоком */}
        <div className="mt-8 border-t border-border/40 pt-6 px-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-base font-semibold text-text/70 whitespace-nowrap lg:text-lg">
              Смотрите также:
            </span>
            <div className="flex flex-wrap gap-2.5 text-base">
              {QUICK_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-1.5 font-medium text-text transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent}
        onSubmit={handleFormSubmit}
        error={error}
      />
    </div>
  );
}

export function vru100Bottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto space-y-12 py-8 text-text">
      {/* Таблица сечений кабеля */}
      <section className="space-y-4">
        <h2 className={H2}>Таблица рекомендуемых сечений кабеля (для 100А)</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-card">
              <tr>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Материал жил кабеля
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Рекомендуемое сечение вводного кабеля
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Тип зажима в ВРУ
                </th>
              </tr>
            </thead>
            <tbody>
              {CABLE_TABLE.map(({ material, section, clampType }) => (
                <tr
                  key={material}
                  className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/10"
                >
                  <td className="px-4 py-3 font-semibold">{material}</td>
                  <td className="px-4 py-3">{section}</td>
                  <td className="px-4 py-3">{clampType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className={H2}>Часто задаваемые вопросы</h2>
        <div className="space-y-4">
          {FAQ.map(({ q, a }) => (
            <div
              key={q}
              className="space-y-2 rounded-xl border border-accent bg-card p-4"
            >
              <h3 className="text-lg font-bold">{q}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        id="order"
        className="space-y-4 rounded-2xl border border-accent bg-card p-6"
      >
        <h2 className={H2}>Заказать ВРУ 100А</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Оставьте заявку или позвоните нам — подберём оптимальную комплектацию,
          рассчитаем стоимость и сроки сборки.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Button
            asChild
            size="lg"
            className="bg-accent font-bold text-background hover:bg-accent/90"
          >
            <a href={`tel:${PHONE}`}>{PHONE_LABEL}</a>
          </Button>
          <Button
            onClick={() => handleButtonClick(REQUEST_LABEL)}
            size="lg"
            variant="outline"
            className="border-2 border-accent font-bold text-accent hover:bg-accent hover:text-background"
          >
            {REQUEST_LABEL}
          </Button>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent}
        onSubmit={handleFormSubmit}
        error={error}
      />
    </div>
  );
}
