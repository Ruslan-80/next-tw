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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-napolnye",
    label: "Напольные шкафы",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-100a",
    label: "ВРУ 100А",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-1-vvod",
    label: "ВРУ 1 ввод",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-3-14-100А",
    name: "ВРУ-3-14 Вводно-распределительное устройство 100 А, IP31, 1 ввод, УХЛ4",
    objects: "1600×450×450 IP31 (внутреннее)",
    price: "от 45 000 руб.",
  },
  {
    sku: "vru-1-12-00k-32А",
    name: "ВРУ1-12-00К Вводно-распределительное устройство 32 А, IP65, 2 ввода, со счетчиком, с АВР, УХЛ4",
    objects: "1600×450×450 IP65 (влагозащита)",
    price: "от 85 000 руб.",
  },
  {
    sku: "vru-1-13-10a-250А",
    name: "ВРУ1-13-10А Вводно-распределительное устройство 250 А, IP66, 1 ввод, со счетчиком, УХЛ4",
    objects: "1200×800×450 IP66 (влагозащита)",
    price: "от 75 000 руб.",
  },
  {
    sku: "vru-1-13-00a-32А",
    name: "ВРУ1-13-00А Вводно-распределительное устройство 32 А, IP66, 1 ввод, со счетчиком, УХЛ4",
    objects: "1200×800×450 IP66 (влагозащита)",
    price: "от 50 000 руб.",
  },
  {
    sku: "vru-1-16-05k-63А",
    name: "ВРУ1-16-05К Вводно-распределительное устройство 63 А, IP65, 2 ввода, со счетчиком, с АВР, УХЛ4",
    objects: "1600×450×450 IP65 (влагозащита)",
    price: "от 85 000 руб.",
  },
];

const FAQ = [
  {
    q: "Почему навесные ВРУ не делают на большие токи (например, 630 А)?",
    a: "Существует два критических ограничения. Первое — теплоотдача: малый объём навесного шкафа не способен эффективно рассеивать тепло от мощных силовых шин и автоматов, что приведёт к перегреву. Второе — геометрия кабеля: жёсткие силовые кабели большого сечения (от 150 мм² и выше), требуемые для токов 630 А, физически невозможно изогнуть и безопасно завести в компактный навесной корпус.",
  },
  {
    q: "Требуется ли специальная стена для монтажа навесного ВРУ?",
    a: "Да. Щит вместе с установленной медной ошиновкой и аппаратурой имеет значительный вес. Монтаж допускается только на капитальные несущие стены (кирпич, бетон) с использованием надёжных анкерных болтов. Монтаж на лёгкие перегородки (например, из обычного гипсокартона) строго запрещён техникой безопасности.",
  },
];

export function vruNavesnyeTop() {
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
                Навесные щиты ВРУ (Настенного монтажа)
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Навесные вводно-распределительные устройства (ВРУ)
                </strong>{" "}
                — это компактные электрощиты настенного монтажа, предназначенные
                для приёма, коммерческого учёта и распределения электроэнергии в
                условиях дефицита свободного пространства. Они отличаются малой
                глубиной (от 200 мм) и рассчитаны на рабочие токи до 160–250 А.
                Это оптимальное техническое решение для электроснабжения частных
                коттеджей, небольших административных офисов и отдельно стоящих
                коммерческих павильонов, позволяющее сэкономить ценную площадь
                без потери функциональности.
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
                alt="Навесные щиты ВРУ (Настенного монтажа)"
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

export function vruNavesnyeBottom() {
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
        <h2 className={H2}>Типовые конфигурации навесных ВРУ</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Компактные корпуса оснащаются специальными монтажными профилями и
          DIN-рейками, обеспечивая плотную, но безопасную компоновку аппаратуры
          с соблюдением тепловых зазоров.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-card">
              <tr>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Артикул (Модификация)
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Наименование и Номинал ВРУ
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Габариты (В х Ш х Г) и Исполнение
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

      {/* Gabarity, ergonomika elektroschitovoj i PUE */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Габариты, эргономика электрощитовой и ПУЭ</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          При проектировании эргономики электрощитовой инженер опирается на
          требования ПУЭ-7. Если проектная мощность объекта невелика, и схема не
          требует установки габаритных автоматических выключателей в литом
          корпусе (на токи свыше 250 А), выбор навесного конструктива является
          наиболее рациональным.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>Удобство обслуживания:</strong> Типовая схема настенного
            монтажа позволяет разместить всю коммутационную аппаратуру и приборы
            учёта на уровне глаз. Согласно нормам, высота от пола до коробки
            зажимов счётчика должна находиться в пределах 0,8–1,7 м. Навесной
            щит легко повесить именно на этой регламентированной высоте.
          </li>
          <li>
            <strong>Специфика применения:</strong> В отличие от массивных
            напольных шкафов (выполняющих роль ГРЩ), навесные модели часто
            используются как локальные или вторичные узлы распределения[cite:
            31]. Их монтируют в технических нишах, на лестничных клетках или в
            тамбурах.
          </li>
          <li>
            <strong>Ввод кабелей:</strong> Эргономика навесных щитов продумана
            для работы со скрытой и открытой проводкой. Корпуса комплектуются
            съёмными лючками-заглушками сверху и снизу, что позволяет удобно
            заводить питающие линии как с кабельного лотка под потолком, так и
            из стеновых штроб.
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
        <h2 className={H2}>Запросить расчёт стоимости навесного ВРУ</h2>
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
