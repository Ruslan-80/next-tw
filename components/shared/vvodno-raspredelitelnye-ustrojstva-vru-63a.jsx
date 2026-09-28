"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

const CONSULTATION_LABEL = "Получить консультацию или заказать";
const PHONE_LABEL = "Позвонить";
const PHONE = "+74993901467";
const REQUEST_LABEL = "Оставить заявку";

const H2 = "text-2xl md:text-3xl font-bold";

const CABLE_TABLE = [
  { material: "Медь (Cu)", section: "10 – 16 мм²" },
  { material: "Алюминий (Al)", section: "16 – 25 мм²" },
];

const FAQ = [
  {
    q: "Подойдет ли шкаф вру 63А для небольшого производства?",
    a: "Да, он отлично справляется с активными нагрузками до 40 кВт. Это оптимальное и очень востребованное решение для малых цехов, пекарен, станций техобслуживания (СТО) и других объектов малого бизнеса, где используется промышленное оборудование.",
  },
  {
    q: "Какое сечение кабеля использовать, чтобы подключить вру 63А?",
    a: "Для подключения вру такого номинала к питающей магистрали потребуется медный кабель сечением от 10 до 16 мм² или алюминиевый кабель сечением 16–25 мм² (точный выбор зависит от длины трассы и способа ее прокладки).",
  },
  {
    q: "Можно ли собрать шкаф вру на 63А в пластиковом корпусе?",
    a: "Согласно нормам ПУЭ и ГОСТ, вводно-распределительные устройства для коммерческого и производственного секторов должны обеспечивать высокую степень пожарной безопасности. Поэтому стандартное 63а шкаф вру всегда собирается в прочном металлическом корпусе (со степенью защиты IP31 или IP54). Пластиковые боксы на вводе применять не рекомендуется.",
  },
];

export function vru63Top() {
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
                Вводно-распределительные устройства ВРУ на 63 А
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Металлический шкаф ВРУ на 63А вводно-распределительное
                  устройство для малого бизнеса
                </strong>{" "}
                — это золотой стандарт для стрит-ритейла, СТО, небольших пекарен
                и коттеджей. Стандартное{" "}
                <strong>
                  вводно-распределительное устройство на 63 ампера
                </strong>{" "}
                способно безопасно питать потребителей суммарной мощностью до 40
                кВт. Чаще всего выпускается в металлических корпусах со степенью
                защиты IP31 или IP54.
              </p>
              <p className="text-text/80 leading-relaxed">
                Такое решение оптимально для объектов, где требуется
                одновременно приём, распределение и учёт электроэнергии с
                защитой от перегрузок и коротких замыканий.
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
                alt="Вводно-распределительные устройства ВРУ на 63 А"
                fill
                preload={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                className="rounded-3xl object-contain transition-transform duration-500 hover:scale-105"
              />
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

export function vru63Bottom() {
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
        <h2 className={H2}>Таблица сечений вводного кабеля (для 63А)</h2>
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
        <h2 className={H2}>Заказать ВРУ 63А</h2>
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
