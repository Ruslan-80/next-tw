"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import Link from "next/link";

const CONSULTATION_LABEL = "Получить консультацию или заказать";
const PHONE_LABEL = "Позвонить";
const PHONE = "+74993901467";
const REQUEST_LABEL = "Оставить заявку";

const H2 = "text-2xl md:text-3xl font-bold";
const QUICK_LINKS = [
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-40a",
    label: "ВРУ 40А",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-63a",
    label: "ВРУ 63А",
  },
  {
    href: "vvodno-raspredelitelnye-ustrojstva-vru-navesnye",
    label: "Навесные щиты",
  },
];
const FAQ = [
  {
    q: "Какую максимальную мощность выдержит вводной автомат на 32 А?",
    a: "При стандартном трёхфазном подключении (380В) такой автомат в щитке способен безопасно пропустить суммарную нагрузку до 20–22 кВт. Этого запаса мощности вполне достаточно для питания небольшого магазина, офиса, гаража или частного дома.",
  },
  {
    q: "Какой кабель нужен для подключения щита на 32 ампера?",
    a: "Для безопасной работы вру 32 рекомендуется использовать жёсткий медный кабель сечением 4–6 мм² или алюминиевый на 6–10 мм². Это обеспечит надёжный контакт в клеммах и исключит перегрев линии.",
  },
  {
    q: "Можно ли установить счётчик внутрь щита на 32 А?",
    a: "Да, габариты стандартного устройства позволяют без проблем разместить внутри счётчик прямого включения (не требующий трансформаторов тока), что делает щит полноценным устройством для приёма и коммерческого учёта электроэнергии.",
  },
];

const CABLE_TABLE = [
  { material: "Медь (Cu)", section: "4 – 6 мм²" },
  { material: "Алюминий (Al)", section: "6 – 10 мм²" },
];

export function vru32ATop() {
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
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Левая колонка — текст */}
          <div className="animate-fade-in-up space-y-8 px-2">
            <div className="space-y-4">
              <h2 className="text-text pb-4 text-2xl font-bold leading-tight lg:text-5xl">
                Вводно-распределительные устройства ВРУ на 32 А
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>Компактное вру 32А</strong> — это навесной или
                встраиваемый щиток, предназначенный для защиты локальных сетей.
                Оборудование данного класса идеально подходит для малых
                магазинов, островков в ТЦ, гаражей или частных домов с
                выделенной мощностью до 15–20 кВт. Вводной{" "}
                <strong>автомат на 32 А</strong> надёжно защищает линию от
                перегрузки, а сам щит легко монтируется на стену.
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
                alt="Вводно-распределительные устройства ВРУ на 32 А"
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
        initialContent={modalContent}
        onSubmit={handleFormSubmit}
        submitError={error}
      />
    </div>
  );
}

export function vru32ABottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-metal animate-metal px-4 py-8 font-sans text-text">
      <div className="container mx-auto space-y-12">
        {/* Спецификация */}
        <section className="space-y-4">
          <h2 className={H2}>Спецификация комплектующих</h2>
          <p className="leading-relaxed text-muted-foreground">
            Используется модульная автоматика на DIN-рейку. Вводной аппарат —
            стандартный модульный автоматический выключатель (например, ВА47-29
            или ВА47-60) на номинал 32 А. Такая компоновка обеспечивает
            компактность и простоту обслуживания.
          </p>
        </section>

        {/* Таблица сечений */}
        <section className="space-y-4">
          <h2 className={H2}>Таблица сечений вводного кабеля (для 32А)</h2>
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
                </tr>
              </thead>
              <tbody>
                {CABLE_TABLE.map(({ material, section }) => (
                  <tr
                    key={material}
                    className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/10"
                  >
                    <td className="px-4 py-3 font-semibold">{material}</td>
                    <td className="px-4 py-3">{section}</td>
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
          <h2 className={H2}>Заказать компактное ВРУ 32А</h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Оставьте заявку или позвоните нам — подберём оптимальную
            комплектацию под вашу задачу и рассчитаем стоимость.
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
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialContent={modalContent}
        onSubmit={handleFormSubmit}
        submitError={error}
      />
    </div>
  );
}
