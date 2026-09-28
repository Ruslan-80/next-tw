"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

const CONSULTATION_LABEL = "Получить расчёт стоимости ВРУ";
const PHONE_LABEL = "Позвонить";
const PHONE = "+74993901467";
const REQUEST_LABEL = "Загрузить схему на расчёт";

const H2 = "text-2xl md:text-3xl font-bold";

const QUICK_LINKS = [
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-400a-2-vvoda",
    label: "ВРУ 400А 2 ввода",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-630a-2-vvoda",
    label: "ВРУ 630А 2 ввода",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-250a-s-avr",
    label: "ВРУ 250А с АВР",
  },
];

const FAQ = [
  {
    q: "В чем принципиальное отличие ВРУ 250А на 2 ввода от щита с АВР?",
    a: "Щит на 2 ввода предполагает ручное переключение между основным и резервным источником питания с помощью перекидного рубильника. ВРУ с АВР (автоматическим вводом резерва) выполняет это переключение автоматически за доли секунды с помощью микропроцессорного контроллера и силовых контакторов при любом нарушении параметров сети.",
  },
  {
    q: "Допускается ли параллельная (одновременная) работа двух вводов в таком щите?",
    a: "Нет. В классической двухфидерной схеме с ручным реверсом нагрузка всегда получает питание только от одного активного ввода. Для параллельной работы магистралей необходимо проектировать двухсекционное ВРУ с секционным выключателем.",
  },
];

export function vru250a2VvodaTop() {
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
                Вводно-распределительные устройства ВРУ 250А (2 ввода)[cite: 29]
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Двухфидерные вводно-распределительные устройства ВРУ 250А
                </strong>{" "}
                применяются для приёма электроэнергии от двух независимых
                источников питания с возможностью ручного переключения (реверса)
                между ними[cite: 29]. Сборка на 2 ввода с пропускной
                способностью 250 Ампер обеспечивает базовое резервирование сети,
                что делает такие щиты оптимальным выбором для административных
                зданий, школ и коммерческих объектов II категории надёжности
                электроснабжения[cite: 29]. Подобное вводное устройство
                многоквартирного дома средней этажности или крупное вру жилого
                дома (премиального коттеджного посёлка) страхует объект от
                длительных отключений света, требуя лишь ручного вмешательства
                дежурного электрика[cite: 29].
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
                alt="Вводно-распределительные устройства ВРУ 250А (2 ввода)"
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
              Смотрите также:[cite: 30]
            </span>
            <div className="flex flex-wrap gap-2.5 text-base">
              {QUICK_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-1.5 font-medium text-text transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
                >
                  {label}[cite: 30]
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

export function vru250a2VvodaBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto space-y-12 py-8 text-text">
      {/* Схемотехника и механическая блокировка */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Схемотехника и механическая блокировка[cite: 29]</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Главная инженерная задача при проектировании и сборке двухфидерных
          щитов — гарантированно исключить встречное напряжение[cite: 29].
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            Утверждённая <strong>однолинейная схема вру</strong> на 2 ввода
            реализуется на базе реверсивного (перекидного) рубильника или сборки
            из двух выключателей нагрузки[cite: 29].
          </li>
          <li>
            Данная компоновка обеспечивает{" "}
            <strong>жёсткую механическую блокировку</strong>: одновременное
            замыкание обоих вводов (физическое соединение двух разных
            трансформаторных подстанций) абсолютно исключено[cite: 29].
          </li>
          <li>
            Под рабочий номинал <strong>In = 250А</strong> мы применяем надёжную
            коммутационную аппаратуру с мощными дугогасительными камерами[cite:
            29].
          </li>
          <li>
            В зависимости от технических условий, щиты могут выпускаться как в
            однопанельном конструктиве (ПВР), так и состоять из отдельных
            вводных (ПВ) и распределительных (ПР) панелей, жёстко соединённых
            между собой[cite: 29].
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className={H2}>Часто задаваемые вопросы[cite: 29]</h2>
        <div className="space-y-4">
          {FAQ.map(({ q, a }) => (
            <div
              key={q}
              className="space-y-2 rounded-xl border border-accent bg-card p-4"
            >
              <h3 className="text-lg font-bold">{q}[cite: 29]</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {a}[cite: 29]
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        id="calculate"
        className="space-y-4 rounded-2xl border border-accent bg-card p-6 text-center"
      >
        <h2 className={H2}>
          Заказать расчёт стоимости ВРУ 250А на 2 ввода[cite: 29]
        </h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Отправьте нам вашу однолинейную схему или техническое задание —
          инженеры подберут аппараты, рассчитают сечение ошиновки и подготовят
          коммерческое предложение с фиксированной ценой и сроками сборки[cite:
          29].
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
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
        <p className="text-xs italic text-muted-foreground pt-2">
          Итоговая стоимость ВРУ зависит от выбранной схемы, бренда
          комплектующих и дополнительных опций (АВР, узлы учёта и т. д.)[cite:
          29].
        </p>
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
