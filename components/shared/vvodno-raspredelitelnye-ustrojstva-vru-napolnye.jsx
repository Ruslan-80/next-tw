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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-navesnye",
    label: "Навесные щиты",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-630a",
    label: "ВРУ 630А",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-800a",
    label: "ВРУ 800А",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-3-42-1600А",
    name: "ВРУ-3-42 Вводно-распределительное устройство 1600 А, IP31, 1 ввод, УХЛ4",
    objects: "Крепление к полу. Опционально: цоколь 150 мм.",
    price: "от 50 000 руб.",
  },
  {
    sku: "vru-4-800-120-800А",
    name: "ВРУ-4-800-120 Вводно-распределительное устройство 800А IP31, 1 ввод, со счетчиком, УХЛ4",
    objects: "Крепление к полу. Кабельный приямок или цоколь.",
    price: "от 50 000 руб.",
  },
  {
    sku: "vru21L-(500+500)-201-630А",
    name: "ВРУ21L-(500+500)-201 Вводно-распределительное устройство 630 А, IP31, 2 ввода, со счетчиком, УХЛ4",
    objects: "В: 2000 мм, Ш: 800 мм, Г: 600 мм. Напольная установка.",
    price: "от 135 000 руб.",
  },
  {
    sku: "vru-8504-4r-400А-1600x450x450",
    name: "ВРУ-8504-4Р-400 Вводно-распределительное устройство 400А IP31, 1 ввод, со счетчиком, УХЛ4",
    objects: "Усиленный каркас, нижний ввод шинопроводом или кабелем.",
    price: "от 50 000 руб.",
  },
  {
    sku: "vru-1-28-40k-1000А",
    name: "Вводно-распределительное устройство 1000 А, IP65, 2 ввода, со счетчиком, с АВР, УХЛ4",
    objects: "Многопанельная сборка, цоколь 200 мм для ввода силовых трасс.",
    price: "от 85 000 руб.",
  },
];

const FAQ = [
  {
    q: "Допускается ли вывод отходящих кабелей через крышу напольного ВРУ?",
    a: "По умолчанию в многопанельных ВРУ ввод и вывод предусмотрен снизу. Однако, по специальному согласованию между потребителем и изготовителем, вывод отходящих проводников может быть организован не только вниз, но и вверх (через крышу). Для ВРУ шкафного исполнения (не панельного) вводы и выводы конструктивно предусмотрены как в нижней, так и в верхней частях шкафа изначально.",
  },
  {
    q: "Какая степень защиты (IP) должна быть у днища напольного ВРУ?",
    a: "Согласно ГОСТ, одно- и многопанельные ВРУ, устанавливаемые на полу в закрытых электрощитовых помещениях, поставляются со степенью защиты IP00 со стороны нижнего основания (открытое дно), примыкающего к полу, что необходимо для беспрепятственного ввода кабелей. При этом фасад и боковые стенки имеют защиту IP31.",
  },
];

export function vruNapolnyeTop() {
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
              <h2 className="text-text pb-4 text-2xl font-bold leading-tight lg:text-5xl">
                Напольные шкафы ВРУ
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Напольные вводно-распределительные устройства (ВРУ)
                </strong>{" "}
                представляют собой мощные свободностоящие металлические шкафы,
                рассчитанные на коммутацию высоких токов от 250 А до 1600 А. Они
                служат главными энергетическими хабами для энергоемких объектов
                (многоквартирных домов, ТРЦ, промышленных предприятий). Наличие
                жесткого каркаса и технологического цоколя значительно упрощает
                нижний ввод тяжелых силовых кабелей большого сечения (до 240
                мм²), обеспечивая надежную базу для разводки трасс без нарушения
                радиусов изгиба.
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
                alt="Напольные шкафы ВРУ"
                fill
                preload={true}
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

export function vruNapolnyeBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto space-y-12 py-8 text-text">
      {/* Tovarnaya setka / tablica modelej */}
      <section className="space-y-4">
        <h2 className={H2}>Типовые конфигурации напольных ВРУ</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Конструкция наших свободностоящих панелей обеспечивает высокую
          жёсткость, исключающую деформации при электродинамических ударах токов
          короткого замыкания (Icc).
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
                  Габариты и Особенности монтажа
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

      {/* Gabarity, tsobol i ergonomika elektroschitovoj */}
      <section className="space-y-6 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Габариты, цоколь и эргономика электрощитовой</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Проектная схема электроснабжения может быть идеальной на бумаге, но на
          объекте монтажники часто сталкиваются с проблемой подключения жестких
          кабелей большого сечения в условиях ограниченного пространства.
        </p>

        <div className="space-y-3">
          <h3 className="text-lg font-bold">
            Требования к монтажу напольных шкафов (ГОСТ 32396-2021):
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            <li>
              <strong>Крепление:</strong> Установку одно- и многопанельных ВРУ
              следует предусматривать строго на полу (с жестким анкерным
              креплением). Это исключает опрокидывание тяжелого щита.
            </li>
            <li>
              <strong>Направление ввода:</strong> В классических многопанельных
              сборках ввод и вывод питающей сети должен быть предусмотрен снизу.
            </li>
            <li>
              <strong>Эргономика и радиусы изгиба:</strong> Нулевую защитную
              шину (PE) следует располагать ниже нулевой рабочей шины (N) на
              высоте от основания ВРУ, достаточной для обеспечения нормированных
              радиусов изгиба кабелей. Для понимания масштабов: наибольшее
              количество и сечение жил, присоединенных к зажимам ВРУ на 630А,
              составляет 4х150 мм² на каждую фазу.
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold">Зачем нужен цоколь?</h3>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Если электрощитовая не оборудована глубоким кабельным приямком или
            фальшполом, завести пучок толстых кабелей снизу крайне сложно[cite:
            33]. Для удобства разделки и качественного подключения кабелей
            сечением от 150 до 240 мм² рекомендуется доукомплектовывать панели
            металлическими цоколями (подставками) высотой 150 мм или 200 мм. Это
            технологическое пространство под шкафом позволяет монтажникам плавно
            изогнуть кабель без риска повреждения изоляции и отрыва контактных
            площадок вводных рубильников.
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
        <h2 className={H2}>Запросить расчёт стоимости напольного ВРУ</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Оставьте заявку или позвоните — мы подберём конфигурацию под ваш
          проект и требования по монтажу.
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
