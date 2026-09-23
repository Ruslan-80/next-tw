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
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-500a",
    label: "ВРУ 500А",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-800a",
    label: "ВРУ 800А",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-s-avr",
    label: "С АВР",
  },
];

const CABLE_TABLE = [
  {
    material: "Медь (Cu)",
    section: "2×150 мм² или 2×185 мм²",
    count: "2 шт",
  },
  {
    material: "Алюминий (Al)",
    section: "2×240 мм²",
    count: "2 шт",
  },
];

const FAQ = [
  {
    q: "Где обычно устанавливаются распределительные устройства ВРУ на 630 А?",
    a: "Такие щиты размещают в специально оборудованных электрощитовых промышленных предприятий, трансформаторных подстанций (ТП) и крупных торговых центров. Вводная панель на 630 А принимает электроэнергию от ТП и распределяет её по вторичным щитам.",
  },
  {
    q: "Можно ли купить вводно-распределительное устройство на 630 А в Москве с гарантией?",
    a: "Да, вы можете заказать щит ВРУ 630А напрямую с нашего завода-изготовителя. Мы собираем устройства по типовым и индивидуальным однолинейным схемам, предоставляем техническую документацию и паспорт ГОСТ.",
  },
  {
    q: "Чем отличается панель ВРУ на 630 А от щитов меньшего номинала?",
    a: "Ключевое отличие — усиленные медные или алюминиевые шины увеличенного сечения и силовые выключатели-разъединители (ВР32-41 или ВА88-40), рассчитанные на токи короткого замыкания до 35–50 кА.",
  },
];

export function vru630Top() {
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
                Вводно-распределительное устройство ВРУ на 630 А
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>Вводно-распределительное устройство на 630 А</strong> —
                это магистральное щитовое оборудование для тяжёлых условий
                эксплуатации. Такие <strong>щиты ВРУ 630А</strong> применяются
                на крупных производственных линиях, в трансформаторных
                подстанциях (ТП) и логистических центрах. Оборудование защищает
                питающие линии от перегрузок и токов короткого замыкания.
              </p>
              <p className="text-text/80 leading-relaxed">
                В <strong>щите на 630 А</strong> устанавливаются разъединители
                РЕ19-41 или автоматические выключатели ВА88-40. Для безопасного
                обслуживания <strong>распределительное устройство</strong>{" "}
                оснащается прозрачными защитными экранами токоведущих частей.
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
                alt="Вводно-распределительные устройства ВРУ на 630 А"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                className="rounded-3xl object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Блок быстрых ссылок во всю ширину под двухколоночным блоком */}
        <div className="mt-8 border-t border-border/40 px-2 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="whitespace-nowrap text-base font-semibold text-text/70 lg:text-lg">
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

export function vru630Bottom() {
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
        <h2 className={H2}>Таблица рекомендуемых сечений кабеля</h2>
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
                  Количество кабелей на фазу
                </th>
              </tr>
            </thead>
            <tbody>
              {CABLE_TABLE.map(({ material, section, count }) => (
                <tr
                  key={material}
                  className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/10"
                >
                  <td className="px-4 py-3 font-semibold">{material}</td>
                  <td className="px-4 py-3">{section}</td>
                  <td className="px-4 py-3">{count}</td>
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
        <h2 className={H2}>Заказать ВРУ на 630 А</h2>
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
