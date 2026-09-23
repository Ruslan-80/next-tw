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
  { material: "Медь (Cu)", section: "6 – 10 мм²" },
  { material: "Алюминий (Al)", section: "10 – 16 мм²" },
];

const FAQ = [
  {
    q: "В чем главное отличие ВРУ 40А от ВРУ 32А?",
    a: "Основная разница заключается в пропускной способности. Щит вру 40 позволяет подключить оборудование суммарной мощностью до 25–26 кВт (в сетях 380В), что дает необходимый запас прочности для развивающихся коммерческих павильонов или энергоемких частных домов.",
  },
  {
    q: "Требуются ли трансформаторы тока для организации учета во вру 40?",
    a: "Нет, для номинала 40 ампер трансформаторы тока не используются. Учет электроэнергии во вру 40 организуется с помощью обычных трехфазных счетчиков прямого включения, которые рассчитаны на максимальные токи до 60А или 100А.",
  },
];

export function vru40ATop() {
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
                Вводно-распределительные устройства ВРУ на 40 А
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>Навесное вру 40 ампер</strong> — это устройство
                первичного распределения для объектов малого бизнеса
                (парикмахерские, кафе) и частного сектора. Рассчитано на
                пропускную способность около 25 кВт. Как и в случае с 32А, здесь
                применяется модульная аппаратура, что делает щит недорогим в
                сборке и простым в обслуживании. Вводной{" "}
                <strong>автоматический выключатель на 40А</strong> надёжно
                защищает сеть от перегрузок, а компактный корпус позволяет
                разместить щит даже в ограниченном пространстве.
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
                alt="Вводно-распределительные устройства ВРУ на 40 А"
                fill
                priority
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
        initialContent={modalContent}
        onSubmit={handleFormSubmit}
        submitError={error}
      />
    </div>
  );
}

export function vru40ABottom() {
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
        {/* Таблица сечений */}
        <section className="space-y-4">
          <h2 className={H2}>Таблица сечений вводного кабеля (для 40А)</h2>
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
          <h2 className={H2}>Заказать ВРУ 40А</h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Оставьте заявку или позвоните нам — подберём оптимальную
            комплектацию, рассчитаем стоимость и сроки сборки.
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
