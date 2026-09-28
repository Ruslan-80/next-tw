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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-1000a",
    label: "ВРУ 1000А",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-s-avr",
    label: "С АВР",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-na-kontaktorakh",
    label: "На контакторах",
  },
];

const CABLE_TABLE = [
  {
    method: "Кабельная линия",
    solution: "4–5 кабелей 240 мм² (Al) на фазу",
    note: "Требует просторного кабельного канала",
  },
  {
    method: "Магистральный шинопровод",
    solution: "Медный шинопровод на 1600 А",
    note: "Наиболее надёжный и компактный вариант",
  },
];

const FAQ = [
  {
    q: "Требуется ли принудительное охлаждение для ВРУ на 1600 А?",
    a: "Да, при работе на номинальных токах шинный мост и контакты аппаратов выделяют большое количество тепла. Чтобы избежать перегрева, панели комплектуются вентиляционными решётками, а при высокой плотности компоновки — принудительной вытяжной вентиляцией с автоматическими термостатами.",
  },
  {
    q: "Какую суммарную нагрузку может питать оборудование на 1600 А?",
    a: "Оборудование класса 1600 А рассчитано на суммарную мощность до 1000 кВт (1 МВт). Это флагманский номинал для главных распределительных щитов (ГРЩ) крупных промышленных предприятий и ЦОД.",
  },
  {
    q: "Каким образом организуется учёт электроэнергии в ВРУ на 1600 А?",
    a: "Учёт электроэнергии в таком устройстве организуется исключительно через трансформаторы тока (например, 1500/5 или 1600/5) с классом точности не ниже 0.5S, устанавливаемые на вводные медные шины.",
  },
];

export function vru1600Top() {
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
                Вводно-распределительное устройство ВРУ на 1600 А
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>Вводно-распределительное устройство на 1600 А</strong> —
                это флагманский номинал среди классических ВРУ. Такое
                оборудование необходимо для энергоёмких производств полного
                цикла, сталелитейных цехов и крупных центров обработки данных
                (ЦОД). Щит обеспечивает надёжную защиту магистральных линий и
                распределение электроэнергии на объекты с максимальной нагрузкой
                до 1 МВт.
              </p>
              <p className="text-text/80 leading-relaxed">
                Основа конструкции — воздушные автоматические выключатели на
                1600 А (например, ВА-45-33) или мощные рубильники РЕ19-43.
                Ошиновка выполняется пакетами медных шин, способными выдержать
                ударные токи короткого замыкания свыше 50 кА.
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
                alt="Вводно-распределительные устройства ВРУ на 1600 А"
                fill
                preload={true}
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

export function vru1600Bottom() {
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
        <h2 className={H2}>
          Таблица рекомендуемых сечений кабеля (для 1600 А)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-card">
              <tr>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Способ подключения
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Рекомендуемое решение
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Примечание
                </th>
              </tr>
            </thead>
            <tbody>
              {CABLE_TABLE.map(({ method, solution, note }) => (
                <tr
                  key={method}
                  className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/10"
                >
                  <td className="px-4 py-3 font-semibold">{method}</td>
                  <td className="px-4 py-3">{solution}</td>
                  <td className="px-4 py-3">{note}</td>
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
        <h2 className={H2}>Заказать ВРУ на 1600 А</h2>
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
