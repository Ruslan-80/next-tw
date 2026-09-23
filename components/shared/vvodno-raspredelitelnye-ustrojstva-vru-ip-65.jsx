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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-ip-66",
    label: "ВРУ IP66",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-ukhl1",
    label: "ВРУ УХЛ1",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-2-vvoda",
    label: "ВРУ 2 ввода",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-1-11-ip65",
    name: "ВРУ1-11-00 Вводно-распределительное устройство (In: 250 А, IP65, УХЛ1/У1)",
    objects: "Открытые строительные площадки, карьеры",
    price: "от 85 000 руб.",
  },
  {
    sku: "vru-3-41-ip65",
    name: "ВРУ-3-41 Вводно-распределительное устройство (In: 400 А, IP65, 1 ввод, У1)",
    objects: "Уличные трансформаторные подстанции (КТП)",
    price: "от 120 000 руб.",
  },
  {
    sku: "vru-8504-ip65",
    name: "ВРУ-8504-4Р-400 Шкафное ВРУ (Габариты: 1000х800х250 мм, IP65)",
    objects: "Мачтовые опоры, системы освещения трасс",
    price: "от 65 000 руб.",
  },
  {
    sku: "vru-1-24-ip65",
    name: "ВРУ1-24-40 Вводно-распределительное устройство (In: 630 А, IP65, со счётч.)",
    objects: "Агропромышленные комплексы, фермы",
    price: "от 150 000 руб.",
  },
  {
    sku: "vru-3-10-ip65",
    name: "ВРУ-3-10 Вводно-распределительное устройство (In: 250 А, IP65, 2 ввода)",
    objects: "Объекты II категории надёжности (открытые)",
    price: "от 110 000 руб.",
  },
];

const FAQ = [
  {
    q: "Чем ВРУ IP65 отличается от IP54?",
    a: "Главное отличие заключается в первой цифре индекса. Степень IP54 допускает частичное проникновение пыли внутрь корпуса (при условии, что это не нарушает работу аппаратуры). Степень IP65 гарантирует абсолютную пыленепроницаемость, что подтверждается испытаниями по категории 1 ГОСТ 14254.",
  },
  {
    q: "Как выполняется ввод кабелей в герметичный щит IP65?",
    a: "Для сохранения герметичности ввод кабелей осуществляется строго через сальниковые вводы соответствующего диаметра (обычно снизу). Важно, чтобы после закрепления кабеля не нарушалась исходная степень защиты оболочки от пыли и направленных струй воды.",
  },
];

export function vruIp65Top() {
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
                ВРУ со степенью защиты IP65
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Вводно-распределительные устройства (ВРУ) со степенью защиты
                  IP65
                </strong>{" "}
                гарантируют абсолютную пыленепроницаемость и надёжную защиту
                внутреннего оборудования от направленных струй воды. Такое
                решение необходимо для наружной установки электрощитов без
                дополнительных навесов (в условиях 100% влажности). Мы собираем
                герметичные ВРУ по ГОСТ 14254-96, обеспечивая безопасный прием
                электроэнергии и селективную защиту отходящих линий от коротких
                замыканий.
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
                alt="Вводно-распределительные устройства ВРУ IP65"
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

export function vruIp65Bottom() {
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
        <h2 className={H2}>Популярные модели ВРУ IP65</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Для обеспечения защиты IP65 шкафы комплектуются цельнолитым
          полиуретановым уплотнителем дверей. Отверстия в кабельных вводах
          выполняются строго под размер сальников.
        </p>
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
          комплектующих, сечения ошиновки и наличия антиконденсатного обогрева.
        </p>
      </section>

      {/* Специфика оболочки IP65 и стандарты ГОСТ */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Специфика оболочки IP65 и стандарты ГОСТ</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Выбор степени защиты IP65 — это серьёзное инженерное решение. Если
          типовой распределительный узел внутри здания не требует высокой
          герметичности (достаточно IP31), то монтаж главного щита на открытом
          воздухе делает применение IP65 технической необходимостью.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Согласно ГОСТ 14254 и ГОСТ 32396-2021, индекс IP65 расшифровывается
          следующим образом:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>Первая цифра «6» (Пыленепроницаемость):</strong> Оболочка
            обеспечивает полную защиту от проникновения пыли внутрь шкафа
            (испытания по категории 1).
          </li>
          <li>
            <strong>Вторая цифра «5» (Защита от водяных струй):</strong>{" "}
            Оболочка выдерживает направленные струи воды с любого направления
            без вреда для автоматики.
          </li>
        </ul>
        <div className="mt-4 rounded-lg bg-accent/10 p-4">
          <h3 className="font-bold text-accent">
            Инженерный нюанс: Обогрев автоматики
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            В полностью герметичных уличных щитах резко возрастает риск
            образования конденсата при перепадах температур. Для поддержания
            стабильного сопротивления изоляции и бесперебойной работы счетчиков,
            мы интегрируем в шкафы автоматические системы антиконденсатного
            обогрева (термостат + резистивный нагреватель).
          </p>
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
        id="calculate"
        className="space-y-4 rounded-2xl border border-accent bg-card p-6"
      >
        <h2 className={H2}>Запросить расчёт стоимости ВРУ IP65</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Оставьте заявку или позвоните — мы подберём уличное решение с
          обогревом учёта и нужной степенью защиты под ваш проект.
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
