"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import FaqVru from "@/components/faqVru";
import PopularNaborVru from "@/components/PopularNaborVru";

const QUICK_LINKS = [
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-vvodnye-paneli-vp",
    label: "Вводные панели",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-paneli-rp",
    label: "Распределительные панели",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-so-schetchikami",
    label: "Со счетчиком",
  },
];

export function VruPaneliPvrTop() {
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
        <div className="grid lg:grid-cols-2 gap-2 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4 px-2">
              <h2 className="text-2xl lg:text-5xl font-bold text-text leading-tight">
                Вводно-распределительные панели ВРУ (ПВР)
              </h2>
              <p className="text-muted-foreground text-text leading-relaxed">
                <strong>
                  Вводно-распределительные панели ВРУ (ПВР) серий 21–29
                </strong>{" "}
                — это комбинированные электротехнические устройства напряжением
                380/220 В, которые совмещают в едином конструктиве приём
                электроэнергии, коммерческий учёт и защиту отходящих групповых
                линий от перегрузок и коротких замыканий.
              </p>
              <p className="text-muted-foreground text-text leading-relaxed">
                Вводная панель распределительных щитов данного типа оптимальна
                для электроснабжения малых коммерческих объектов, индивидуальных
                жилых домов и загородных коттеджей.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
              <Button
                onClick={() => handleButtonClick("Получить бесплатный расчёт")}
                size="lg"
                className="btn-gold text-xl py-8 text-black"
              >
                Получить бесплатный расчёт
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
            <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/vru-all.webp"
                alt="Вводно-распределительные панели ВРУ (ПВР)"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                preload={true}
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

      {/* <PopularNaborVru /> */}

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

export function VruPaneliPvrBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-metal animate-metal py-8 px-4 font-sans text-text">
      <div className="container mx-auto rounded-3xl shadow-xl space-y-12">
        {/* SECTION: ПОПУЛЯРНЫЕ МОДЕЛИ ВВОДНО-РАСПРЕДЕЛИТЕЛЬНЫХ ПАНЕЛЕЙ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Популярные модели вводно-распределительных панелей
          </h2>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-card">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Артикул
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Наименование оборудования (Спецификация)
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Типовые объекты эксплуатации
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Цена
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-1-21-00-100А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-21-00 Вводно-распределительное устройство (In: 100 А,
                    IP55, 1 ввод, со счётчиком, УХЛ4)
                  </td>
                  <td className="py-3 px-4">
                    Малые коммерческие павильоны, коттеджи
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    45 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-1-24-40-800А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-24-40 Вводно-распределительное устройство (In: 800 А,
                    IP31, 1 ввод, со счётчиком, УХЛ4)
                  </td>
                  <td className="py-3 px-4">
                    Производственные цеха, торговые центры
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    50 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-3-26-250А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-3-26 Вводно-распределительное устройство (In: 250 А,
                    IP31, 1 ввод, УХЛ4)
                  </td>
                  <td className="py-3 px-4">Многоквартирные жилые дома</td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    75 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-1-24-20-400А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-24-20 Вводно-распределительное устройство (In: 400 А,
                    IP55, 1 ввод, со счётчиком, УХЛ4)
                  </td>
                  <td className="py-3 px-4">
                    Складские комплексы, логистические центры
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    95 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-3-27-400А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-3-27 Вводно-распределительное устройство (In: 400 А,
                    IP31, 1 ввод, УХЛ4)
                  </td>
                  <td className="py-3 px-4">
                    Административные здания, бизнес-центры
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    75 000 руб.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs italic text-muted-foreground">
            * Итоговая стоимость ВРУ зависит от выбранной схемы, бренда
            комплектующих, сечения ошиновки и дополнительных опций (АВР, учёт и
            т.д.).
          </p>
        </section>

        {/* SECTION: СПЕЦИФИКА КОМБИНИРОВАННЫХ СХЕМ (ПВР) */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Специфика комбинированных схем (ПВР)
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Панели 21–29 серий комплектуются аппаратами управления на вводе
            (индекс Х3 от 1 до 4, обозначающий переключатели или выключатели на
            токи от 250 А до 630 А) и специализированными блоками
            дополнительного оборудования (индекс Х4: блоки автоматического или
            неавтоматического управления освещением на 8, 14 или 30 групп).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Такая архитектура позволяет в одном конструктиве закрыть потребности
            объекта в коммутации ввода и управлении наружным/внутренним
            освещением.
          </p>
        </section>

        {/* SECTION: FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-4">
            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-lg">
                  Чем вводно-распределительная панель отличается от других?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Данная панель является универсальным решением (2 в 1). В
                  отличие от классических многопанельных сборок, она совмещает в
                  одном корпусе вводной рубильник (или автомат), трансформаторы
                  тока со счётчиком и блоки автоматических выключателей для
                  отходящих групповых линий.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-lg">
                  Какое назначение имеют панели с кодировкой 21-29?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Кодировка 21–29 строго определяет класс оборудования как
                  вводно-распределительные панели, совмещающие приём питания и
                  распределение по линиям.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION: CTA */}
        <section
          className="mb-12 rounded-2xl p-6 md:p-8 border border-accent bg-card"
          id="calculate"
        >
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Запросить расчёт стоимости панели
            </h2>
            <p className="text-muted-foreground">
              Оставьте заявку или позвоните — мы подберём оптимальную
              конфигурацию под ваш объект.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
              >
                <a href="tel:+74993901467">Позвонить</a>
              </Button>
              <Button
                onClick={() => handleButtonClick("Оставить заявку")}
                variant="outline"
                size="lg"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold"
              >
                Оставить заявку
              </Button>
            </div>
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
