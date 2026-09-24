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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-avtomaticheskij-vyklyuchatel",
    label: "На автоматах",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-bez-schetchika",
    label: "Без счетчика",
  },
];

export function VruPaneliRpTop() {
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
              <h1 className="text-2xl lg:text-5xl font-bold text-text leading-tight">
                Распределительные панели ВРУ (РП)
              </h1>
              <p className="text-muted-foreground text-text leading-relaxed">
                <strong>Распределительные панели ВРУ</strong> (обозначаются
                сериями 41–50) применяются в составе многопанельных щитовых
                сборок для разделения электропитания по групповым цепям
                многоквартирных домов и крупных административных зданий.
              </p>
              <p className="text-muted-foreground text-text leading-relaxed">
                В панелях устанавливаются автоматические выключатели (индекс «А»
                в маркировке) или предохранители, обеспечивающие строгую
                селективность защиты отходящих линий. Внутри каждой панели
                предусмотрена нулевая рабочая шина N (изолированная) и защитная
                шина PE, имеющая надёжное электрическое соединение с metallic
                каркасом.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
              <Button
                onClick={() => handleButtonClick("Заказать бесплатный расчёт")}
                size="lg"
                className="btn-gold text-xl py-8 text-black"
              >
                Заказать бесплатный расчёт
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
            <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/vru-all.webp"
                alt="Распределительные панели ВРУ (РП)"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                priority
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

export function VruPaneliRpBottom() {
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
        {/* SECTION: ПОПУЛЯРНЫЕ МОДЕЛИ РАСПРЕДЕЛИТЕЛЬНЫХ ПАНЕЛЕЙ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Популярные модели распределительных панелей
          </h2>
          <p className="text-muted-foreground mb-6">
            Панели обеспечивают селективную защиту каждой линии. Ошиновка
            позволяет интегрировать как автоматические выключатели, так и
            надёжные плавкие вставки.
          </p>

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
                    vru-1-48-00a-200А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-48-00А Вводно-распределительное устройство (In: 200 А,
                    IP31, 1 ввод, без счётч., УХЛ4)
                  </td>
                  <td className="py-3 px-4">
                    Этажные стояки МКД, офисные блоки
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    45 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-1-41-10-250А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-41-10 Вводно-распределительное устройство (In: 250 А,
                    IP55, 1 ввод, без счётч., УХЛ4)
                  </td>
                  <td className="py-3 px-4">
                    Подвальные и технические помещения
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    70 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-1-44-40-800А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-44-40 Вводно-распределительное устройство (In: 800 А,
                    IP31, 1 ввод, без счётч., УХЛ4)
                  </td>
                  <td className="py-3 px-4">
                    Крупные распределительные узлы ТЦ
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    45 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-3-47-400А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-3-47 Вводно-распределительное устройство (In: 400 А,
                    IP31, 1 ввод, УХЛ4)
                  </td>
                  <td className="py-3 px-4">Административные комплексы</td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    95 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-3-50-800А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-3-50 Вводно-распределительное устройство (In: 800 А,
                    IP31, 1 ввод, УХЛ4)
                  </td>
                  <td className="py-3 px-4">Промышленные цеха</td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    50 000 руб.
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

        {/* SECTION: РЕШЕНИЯ ДЛЯ СИСТЕМ ПОЖАРОТУШЕНИЯ (ППУ) */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Решения для систем пожаротушения (ППУ)
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Для объектов с высокими требованиями к пожарной безопасности мы
            собираем специализированные распределительные панели — панели
            противопожарных устройств (ППУ).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Такая панель обязательно присоединяется к вводной панели с АВР и
            предназначена исключительно для питания оборудования средств
            пожаротушения, цепей сигнализации и эвакуационного освещения[cite:
            5].
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
                  Можно ли запитать распределительную панель от двух независимых
                  вводов?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Да, если распределительная панель подключается к двум секциям
                  шин (от двух вводов), номинальные токи коммутационной
                  аппаратуры рассчитываются в виде суммы нагрузок, что
                  обязательно отражается в технической спецификации и
                  однолинейной схеме проекта.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-lg">
                  Могут ли распределительные панели комплектоваться блоками
                  управления освещением?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Да. Индекс «Х4» в структуре обозначения прямо указывает на
                  наличие такого оборудования: например, цифра «1» означает блок
                  автоматического управления освещением на 30 групп, а «2» —
                  неавтоматического управления.
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
              Запросить расчёт стоимости распределительной панели
            </h2>
            <p className="text-muted-foreground">
              Оставьте заявку или позвоните — мы подберём оптимальную
              конфигурацию под ваш проект.
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
