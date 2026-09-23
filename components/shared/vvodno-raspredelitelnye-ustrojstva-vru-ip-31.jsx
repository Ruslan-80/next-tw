"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

const CONSULTATION_LABEL = "Получить бесплатный расчёт";
const PHONE_LABEL = "Позвонить";
const PHONE = "+74993901467";
const REQUEST_LABEL = "Оставить заявку";

const H2 = "text-2xl md:text-3xl font-bold";

const QUICK_LINKS = [
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-ukhl4",
    label: "ВРУ УХЛ4",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-napolnye",
    label: "Напольные шкафы",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-bez-schetchika",
    label: "ВРУ без счетчика",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-3-41-32А",
    name: "ВРУ-3-41 Вводно-распределительное устройство (In: 32 А, IP31, 1 ввод, УХЛ4)",
    objects:
      "Электроустановки общественных зданий малой мощности, офисные блоки, коттеджи.",
    price: "50 000 руб.",
  },
  {
    sku: "vru-1-11-00-32А",
    name: "ВРУ1-11-00 Вводно-распределительное устройство (In: 32 А, IP31, 1 ввод, со счётчиком, УХЛ4)",
    objects: "Вводные узлы нежилых коммерческих помещений, торговые павильоны.",
    price: "50 000 руб.",
  },
  {
    sku: "vru-3-26-250А",
    name: "ВРУ-3-26 Вводно-распределительное устройство (In: 250 А, IP31, 1 ввод, УХЛ4)",
    objects:
      "Многоквартирные жилые дома (МКД) типовой этажности, административные объекты.",
    price: "75 000 руб.",
  },
  {
    sku: "vru-3-47-400А",
    name: "ВРУ-3-47 Вводно-распределительное устройство (In: 400 А, IP31, 1 ввод, УХЛ4)",
    objects:
      "Крупные распределительные узлы коммерческих центров, гостиничные комплексы.",
    price: "95 000 руб.",
  },
  {
    sku: "vru-1-24-40-800А",
    name: "ВРУ1-24-40 Вводно-распределительное устройство (In: 800 А, IP31, 1 ввод, со счётчиком, УХЛ4)",
    objects:
      "Главные щитовые промышленных предприятий, логистических центров и ТРЦ.",
    price: "50 000 руб.",
  },
];

const FAQ = [
  {
    q: "Допускается ли устанавливать щиты ВРУ IP31 на открытом воздухе или под навесом?",
    a: "Нет, категорически запрещено. Конструкция со степенью защиты IP31 и открытым дном IP00 предназначена исключительно для сухих электрощитовых помещений (климатическое исполнение УХЛ4). Для уличной установки или влажных неотапливаемых пространств требуются герметичные шкафы исполнения IP54, IP55 или IP65 с климатикой УХЛ1/У1.",
  },
  {
    q: "Как обеспечивается ввод толстых кабелей в шкаф ВРУ IP31?",
    a: "Так как со стороны нижнего основания степень защиты составляет IP00, кабели свободно заводятся снизу непосредственно в кабельный приямок электрощитовой. Для дополнительного удобства монтажа и качественной разделки проводников сечением 150–240 мм² рекомендуется доукомплектовать щит опорным цоколем высотой 150 или 200 мм.",
  },
];

export function vruIp31Top() {
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
                ВРУ со степенью защиты IP31
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Вводно-распределительные устройства со степенью защиты IP31
                </strong>{" "}
                предназначены для стационарной установки в сухих, закрытых и
                отапливаемых электрощитовых помещениях, а также в технических
                подвалах жилых многоквартирных домов и общественных зданий.
                Металлическая оболочка надёжно защищает внутреннее оборудование
                от проникновения твёрдых частиц диаметром от 2,5 мм и
                вертикально падающих капель конденсата. Данные щиты рассчитаны
                на эксплуатацию в сетях 230/400 В переменного тока частотой 50
                Гц с глухозаземлённой нейтралью и обеспечивают безопасный ввод,
                коммерческий учёт и распределение электроэнергии.
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
                alt="Вводно-распределительные устройства ВРУ IP31"
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

export function vruIp31Bottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto space-y-12 py-8 text-text">
      {/* Товарная сетка / таблица моделей */}
      <section className="space-y-4">
        <h2 className={H2}>Популярные модели ВРУ IP31</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-card">
              <tr>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Артикул
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Наименование оборудования (Спецификация)
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Типовые объекты эксплуатации
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Цена
                </th>
              </tr>
            </thead>
            <tbody>
              {MODELS_TABLE.map(({ sku, name, objects, price }) => (
                <tr
                  key={sku}
                  className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/10"
                >
                  <td className="px-4 py-3 font-semibold text-accent">{sku}</td>
                  <td className="px-4 py-3">{name}</td>
                  <td className="px-4 py-3">{objects}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-bold text-red-600 dark:text-red-400">
                    {price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs italic text-muted-foreground">
          * Итоговая стоимость ВРУ зависит от выбранной схемы, бренда
          комплектующих, сечения ошиновки и дополнительных опций (АВР, учёт и
          т.д.).
        </p>
      </section>

      {/* Конструктивные стандарты оболочки IP31 */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Конструктивные стандарты оболочки IP31</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Согласно нормам ГОСТ 32396-2021 (пункт 6.6) и ГОСТ 14254-96,
          исполнение оболочки IP31 для напольных вводно-распределительных
          устройств имеет чёткое зонирование:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>Фасад, боковые стенки, задняя стенка и крыша:</strong>{" "}
            Обеспечивают защиту уровня IP31 при закрытых дверях, исключая
            случайный доступ персонала к токоведущим частям инструментом или
            пальцами.
          </li>
          <li>
            <strong>Основание (со стороны пола):</strong> Выполняется со
            степенью защиты IP00 (открытое дно), что обеспечивает
            технологический ввод питающих кабелей и проводов большого сечения
            (до 240 мм²) снизу.
          </li>
          <li>
            <strong>Отсек коммерческого учёта:</strong> Имеет степень защиты не
            ниже IP31 при закрытой внутренней дверце отсека или наружной двери
            панели.
          </li>
          <li>
            <strong>Внутренняя защита при открытых дверях:</strong> Оперативная
            панель обеспечивает класс защиты не ниже IP2X (или IP2XB), защищая
            оператора от случайного касания находящихся под напряжением
            элементов при открытой двери шкафа.
          </li>
          <li>
            <strong>Электродинамическая стойкость:</strong> Сборная ошиновка
            панелей внутри шкафа IP31 выдерживает ударный ток короткого
            замыкания не менее 10 кА без деформаций.
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
        <h2 className={H2}>Запросить расчёт стоимости ВРУ IP31</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Оставьте заявку или позвоните — мы подберём оптимальную конфигурацию
          под ваш проект.
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
