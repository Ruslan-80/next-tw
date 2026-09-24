"use client";

import {
  Cable,
  Server,
  Shield,
  Home,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import FaqVru from "@/components/faqVru";
import PopularNaborVru from "@/components/PopularNaborVru";

const QUICK_LINKS = [
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-2-vvoda",
    label: "ВРУ 2 ввода",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-bez-schetchika",
    label: "Без счетчика",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-navesnye",
    label: "Навесные щиты",
  },
];

export function Vru1VvodTop() {
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
                Щиты ВРУ на 1 ввод
              </h1>
              <p className="text-muted-foreground text-text leading-relaxed">
                <strong>
                  Вводно-распределительные устройства (ВРУ) на один ввод
                </strong>{" "}
                (однофидерные щиты) предназначены для приема и распределения
                электроэнергии на объектах III категории надежности
                электроснабжения по ПУЭ. Оборудование обеспечивает базовую
                защиту сети от перегрузок и коротких замыканий, допуская
                нормативный перерыв в подаче напряжения на время устранения
                аварии (не более 24 часов).
              </p>
              <p className="text-muted-foreground text-text leading-relaxed">
                Это классическое техническое решение для электроснабжения
                малоэтажных многоквартирных домов, небольших офисов и отдельно
                стоящих торговых павильонов.
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
                alt="Щиты ВРУ на 1 ввод"
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

export function Vru1VvodBottom() {
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
        {/* SECTION: ПОПУЛЯРНЫЕ МОДЕЛИ ВРУ НА 1 ВВОД */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Популярные модели ВРУ на 1 ввод
          </h2>
          <p className="text-muted-foreground mb-6">
            Для объектов с одним питающим кабелем мы предлагаем широкую линейку
            однопанельных шкафов. Модификации подбираются в зависимости от
            необходимости коммерческого учёта и наличия отходящих фидерных
            линий.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-card">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Артикул
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Описание и Характеристики комплектации
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Наименование типового объекта
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Цена
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-8505-4r-630А-1600x450x450
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-8505-4Р-630 Вводно-распределительное устройство 630А
                    IP31, 1 ввод, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">
                    Малоэтажная жилая застройка (до 5 этажей)
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    от 50 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-8504-4r-250А-1800x600x450
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-8504-4Р-250 Вводно-распределительное устройство 250А
                    IP31, 1 ввод, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">
                    Небольшие офисные и административные здания
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    от 50 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-4-63-223-63А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-4-63-223 Вводно-распределительное устройство 63А IP31, 1
                    ввод, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">
                    Отдельно стоящие коммерческие павильоны
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    от 50 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-3-23-63А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-3-23 Вводно-распределительное устройство 63 А, IP31, 1
                    ввод, УХЛ4
                  </td>
                  <td className="py-3 px-4">
                    Складские комплексы (без холодильных установок)
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    от 50 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru21L-200-200-250А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ21L-200-200 Вводно-распределительное устройство 250 А,
                    IP31, 1 ввод, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">
                    Строительные площадки (механизация строительства)
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    от 75 000 руб.
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

        {/* SECTION: КАТЕГОРИИ НАДЕЖНОСТИ И СХЕМНЫЕ РЕШЕНИЯ (ПУЭ) */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Категории надежности и схемные решения (ПУЭ)
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Проектируя главный распределительный щит жилого дома или
            коммерческого объекта на один ввод, инженер опирается на требования
            к бесперебойности питания. Главное ограничение однофидерного шкафа —
            отсутствие резервного источника (отсутствие второго ввода от
            независимой трансформаторной подстанции).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Если проектная документация подразумевает подключение только одного
            питающего кабеля, применяются однопанельные модификации (схемы ввода
            1, 2, 4, 5 или 7). Архитектура таких шкафов строго регламентирует их
            габариты:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              <strong>Узкие шкафы (Ш = 600 мм):</strong> Применяются
              исключительно для размещения вводного аппарата и блока
              коммерческого учёта (например, модификации 300, 305, 312)[cite:
              6]. Отходящие линии в них не предусмотрены.
            </li>
            <li>
              <strong>Широкие шкафы (Ш = 800 мм):</strong> Комбинированные
              устройства, которые помимо ввода и учёта позволяют разместить блок
              распределения с фидерными аппаратами на DIN-рейке (вместимость —
              до 7 рядов по 10 модулей).
            </li>
          </ul>
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
                  Можно ли использовать ВРУ на 1 ввод для объектов II категории
                  надежности?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Нет, согласно ПУЭ-7, для объектов II и I категории надежности
                  требуется питание минимум от двух независимых взаимно
                  резервирующих источников. Однофидерные шкафы подходят только
                  для III категории, где допускается перерыв электроснабжения на
                  время устранения аварии (до 24 часов). Для II категории
                  необходимо использовать щиты на 2 ввода (с ручным
                  переключением или АВР).
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-lg">
                  Какая схема ВРУ на 1 ввод позволяет установить счетчик и
                  отходящие автоматы в одном корпусе?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Для совмещения узла коммерческого учета и отходящих автоматов
                  в одном корпусе используются широкие модификации (Ш = 800 мм),
                  например, исполнения 303 и 306. Они позволяют разместить
                  вводной аппарат, приборы учета и фидерные автоматические
                  выключатели на DIN-рейках.
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
              Запросить расчёт стоимости ВРУ на 1 ввод
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
