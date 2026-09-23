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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-400a-s-avr",
    label: "ВРУ 400А с АВР",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-250a-s-avr",
    label: "ВРУ 250А с АВР",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-630a-2-vvoda",
    label: "ВРУ 630А 2 ввода",
  },
];

const FAQ = [
  {
    q: "Можно ли собрать ВРУ 630А с АВР в габаритах компактных модификаций 304 или 305?",
    a: "Нет. Стандартная модификация 304 (ввод по схеме 2, без приборов учёта и фидерных аппаратов) и модификация 305 (с приборами учёта) имеют ширину всего 600 мм. В такие габариты физически невозможно безопасно интегрировать мощные контакторы на 630А и массивную ошиновку. Для токов 630А с АВР проектируются индивидуальные многопанельные решения или крупногабаритные шкафы.",
  },
  {
    q: "Как управлять АВР 630А при отказе логического контроллера?",
    a: "Надёжная схема вру всегда предусматривает резервный алгоритм. Силовые автоматы с мотор-приводами комплектуются ручками для ручного взвода, что позволяет дежурному персоналу выполнить переключение механически.",
  },
];

export function vru630aSavrTop() {
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
        {/* Osnovnoj setchatyj blok: Tekst + Izobrazhenie */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Levaya kolonka — tekst */}
          <div className="animate-fade-in-up space-y-8 px-2">
            <div className="space-y-4">
              <h1 className="text-text pb-4 text-2xl font-bold leading-tight lg:text-5xl">
                Вводно-распределительные устройства ВРУ 630А с АВР
              </h1>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Вводно-распределительные устройства ВРУ 630А с интеграцией АВР
                </strong>{" "}
                являются высшим стандартом надёжности для электроснабжения
                объектов максимального энергопотребления. При токах в 630 Ампер
                блок автоматического резервирования под управлением
                интеллектуального реле мгновенно парирует любые сбои в
                магистралях, защищая от обесточивания системы жизнеобеспечения,
                крупные дата-центры и стратегические узлы. Подобное мощное
                вводное устройство многоквартирного дома или промышленного
                кластера гарантирует 100% отказоустойчивость сети при сбоях на
                внешних магистралях.
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

          {/* Pravaya kolonka — izobrazhenie */}
          <div className="relative mx-auto w-full max-w-[350px] animate-slide-in-right md:max-w-[450px] lg:max-w-[500px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl" />
            <div className="relative aspect-square overflow-hidden rounded-3xl p-4 shadow-2xl md:p-6 lg:p-8">
              <Image
                src="/images/categories/vru-all.webp"
                alt="Вводно-распределительные устройства ВРУ 630А с АВР"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                className="rounded-3xl object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Blok bystrykh ssylok vo vsyu shirinu pod dvukhkolonochnym blokom */}
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

export function vru630aSavrBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto space-y-12 py-8 text-text">
      {/* Skhemotekhnika i logika raboty AVR */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Схемотехника и логика работы АВР (на 630А)</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Проектная <strong>однолинейная схема вру</strong> с автоматическим
          резервированием на токи 630А требует бескомпромиссного качества
          токоведущих частей и аппаратуры.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>Исполнительные механизмы:</strong> В качестве коммутационных
            аппаратов применяются силовые автоматы в литом корпусе с
            мотор-приводами или крупногабаритные промышленные контакторы.
          </li>
          <li>
            <strong>Сборные шины:</strong> Конструкция в обязательном порядке
            включает жёсткие медные сборные шины для подключения фазных,
            нейтральных и защитных проводников.
          </li>
          <li>
            <strong>Маркировка проводников:</strong> Для визуальной
            идентификации при сборке и обслуживании нейтральный проводник (N)
            имеет синюю маркировку, а защитный проводник (PE) — зелёно-жёлтую
            маркировку.
          </li>
          <li>
            <strong>Климатика:</strong> В зависимости от условий эксплуатации
            электрощитовой, оборудование поставляется в необходимом
            климатическом исполнении. Классический стандарт для отапливаемых
            помещений — УХЛ4 (климатическое исполнение и категория размещения по
            ГОСТ 15150).
          </li>
        </ul>
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
        id="calculate"
        className="space-y-4 rounded-2xl border border-accent bg-card p-6"
      >
        <h2 className={H2}>Заказать расчёт стоимости ВРУ 630А с АВР</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Отправьте нам вашу однолинейную схему или техническое задание —
          инженеры подберут контакторы, реле контроля фаз и защитные аппараты,
          рассчитают компоновку и подготовят коммерческое предложение с
          фиксированной ценой и сроками сборки.
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
        <p className="text-xs italic text-muted-foreground">
          Итоговая стоимость ВРУ зависит от выбранной схемы, бренда
          комплектующих и дополнительных опций (АВР, узлы учёта и т. д.).
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
