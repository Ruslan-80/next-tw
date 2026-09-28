"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import FaqVru3 from "@/components/faqVru-3";
import PopularNaborVru from "@/components/PopularNaborVru";

const QUICK_LINKS = [
  {
    href: "/catalog/vru-1",
    label: "Серия ВРУ 1",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-2-vvoda",
    label: "ВРУ на 2 ввода",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-so-schetchikami",
    label: "ВРУ со счетчиками",
  },
];

export function vru3Top() {
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4 px-2">
              <h2 className="text-2xl lg:text-5xl font-bold text-balance leading-tight">
                Вводно-распределительные устройства ВРУ-3 в Москве
              </h2>
              <p className="text-muted-foreground text-balance leading-relaxed">
                <strong>Вводно-распределительное устройство ВРУ-3</strong> — это
                специализированное электрощитовое оборудование, низковольтное
                комплектное устройство (НКУ), предназначенное для приёма,
                распределения и учёта электрической энергии в сетях с
                глухозаземлённой нейтралью напряжением 380/220 В переменного
                тока. В Москве панели серии ВРУ-3 широко применяются как
                надёжная защита отходящих линий при перегрузках и коротких
                замыканиях. Металлический корпус с порошковой окраской
                обеспечивает безопасность эксплуатации, предлагая вариативные
                схемы сборки (вводные, распределительные) с различным
                номинальным током и степенью защиты (IP31, IP54, IP65,
                климатическое исполнение УХЛ4, УХЛ1).
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
              <Button
                onClick={() =>
                  handleButtonClick("Получить коммерческое предложение")
                }
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-8"
              >
                Получить коммерческое предложение
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            {/* Светящееся размытие позади */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>

            {/* Адаптивный контейнер */}
            <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/vvodno-raspredelitelnye-ustrojstva-vru.webp"
                alt="Вводно-распределительные устройства ВРУ-1"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                preload={true}
              />
            </div>
          </div>
        </div>
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
      <PopularNaborVru />
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

export function vru3Bottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Состояния для калькулятора
  const [power, setPower] = useState(100);
  const [voltage, setVoltage] = useState(0.38);
  const [cosPhi, setCosPhi] = useState(0.95);
  const [current, setCurrent] = useState(160.0);

  const calculateCurrent = (p, u, cos) => {
    const numericP = parseFloat(p);
    const numericU = parseFloat(u);
    const numericCos = parseFloat(cos);
    if (
      !isNaN(numericP) &&
      !isNaN(numericU) &&
      !isNaN(numericCos) &&
      numericU > 0 &&
      numericCos > 0
    ) {
      const sqrt3 = 1.732;
      return numericP / (sqrt3 * numericU * numericCos);
    }
    return NaN;
  };

  const handlePowerChange = (val) => {
    setPower(val);
    const calculated = calculateCurrent(val, voltage, cosPhi);
    if (!isNaN(calculated)) setCurrent(calculated);
  };

  const handleVoltageChange = (val) => {
    setVoltage(val);
    const calculated = calculateCurrent(power, val, cosPhi);
    if (!isNaN(calculated)) setCurrent(calculated);
  };

  const handleCosPhiChange = (val) => {
    setCosPhi(val);
    const calculated = calculateCurrent(power, voltage, val);
    if (!isNaN(calculated)) setCurrent(calculated);
  };

  return (
    <div className="py-8 font-sans text-text">
      {/* SECTION: CATALOG */}
      {/* 2. Таблица модификаций */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6 border-l-8 border-accent pl-4">
          Популярные модификации панелей ВРУ-3
        </h2>
        <p className="mb-4 text-base lg:text-lg">
          Воспользуйтесь фильтрами каталога для подбора оборудования по
          номинальному току, количеству вводов и климатическому исполнению.
        </p>
        <div className="overflow-x-auto rounded-xl border border-text shadow-lg">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="text-left">
              <tr>
                {[
                  "Артикул (Панель ВРУ-3)",
                  "Назначение панели",
                  "Номинальный ток",
                  "Напряжение",
                  "Степень защиты",
                  "Кол-во вводов",
                  "Цена",
                ].map((h) => (
                  <th key={h} className="p-4 border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-3-20</td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?naznachenie-paneli=Вводно-распределительные"
                    className="underline"
                  >
                    Вводно-распределительная
                  </Link>
                </td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=32"
                    className="underline"
                  >
                    32 А
                  </Link>{" "}
                  (до{" "}
                  <Link
                    href="/catalog/vru-1-15-kvt-380v-trehfaznyj"
                    className="underline"
                  >
                    15 кВт
                  </Link>
                  )
                </td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?nominalnoe-napryazhenie=380%2F220"
                    className="underline"
                  >
                    380В
                  </Link>{" "}
                  (3 фазы)
                </td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP31"
                    className="underline"
                  >
                    IP31
                  </Link>{" "}
                  (
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?klimaticheskoe-ispolnenie=УХЛ4"
                    className="underline"
                  >
                    УХЛ4
                  </Link>
                  )
                </td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=1"
                    className="underline"
                  >
                    1 ввод
                  </Link>
                </td>
                <td className="p-4 font-bold text-red-700">50 000 руб.</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-3-42</td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?naznachenie-paneli=Распределительные"
                    className="underline"
                  >
                    Распределительная
                  </Link>
                </td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=40"
                    className="underline"
                  >
                    40 А
                  </Link>
                </td>
                <td className="p-4">380В (3 фазы)</td>
                <td className="p-4">IP31 (УХЛ4)</td>
                <td className="p-4">1 ввод</td>
                <td className="p-4 font-bold text-red-700">50 000 руб.</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-3-44</td>
                <td className="p-4">Распределительная</td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=100"
                    className="underline"
                  >
                    100 А
                  </Link>
                </td>
                <td className="p-4">380В (3 фазы)</td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP55"
                    className="underline"
                  >
                    IP55
                  </Link>{" "}
                  (
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?klimaticheskoe-ispolnenie=УХЛ1"
                    className="underline"
                  >
                    УХЛ1
                  </Link>
                  )
                </td>
                <td className="p-4">1 ввод</td>
                <td className="p-4 font-bold text-red-700">45 000 руб.</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-3-10</td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?naznachenie-paneli=вводные"
                    className="underline"
                  >
                    Вводная
                  </Link>{" "}
                  (
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?naznachenie-paneli=с+АВР"
                    className="underline"
                  >
                    с АВР
                  </Link>{" "}
                  и{" "}
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?s-blokom-avr=да"
                    className="underline"
                  >
                    учетом
                  </Link>
                  )
                </td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=250"
                    className="underline"
                  >
                    250 А
                  </Link>
                </td>
                <td className="p-4">380В (3 фазы)</td>
                <td className="p-4">IP31 (УХЛ4)</td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=2"
                    className="underline"
                  >
                    2 ввода
                  </Link>
                </td>
                <td className="p-4 font-bold text-red-700">85 000 руб.</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-3-13</td>
                <td className="p-4">Вводная</td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=400"
                    className="underline"
                  >
                    400 А
                  </Link>
                </td>
                <td className="p-4">380В (3 фазы)</td>
                <td className="p-4">IP31 (УХЛ4)</td>
                <td className="p-4">2 ввода</td>
                <td className="p-4 font-bold text-red-700">105 000 руб.</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-3-41</td>
                <td className="p-4">Распределительная</td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=1000"
                    className="underline"
                  >
                    1000 А
                  </Link>
                </td>
                <td className="p-4">380В (3 фазы)</td>
                <td className="p-4">
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP65"
                    className="underline"
                  >
                    IP65
                  </Link>{" "}
                  (УХЛ1)
                </td>
                <td className="p-4">1 ввод</td>
                <td className="p-4 font-bold text-red-700">50 000 руб.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="italic text-slate-600 mt-2 text-base lg:text-lg">
          — Итоговая стоимость зависит от количества, брендов автоматики,
          материала шин и комплектации. Возможно изготовление в пятипроводном
          исполнении (L1, L2, L3, N, PE) с учётом требуемых габаритов и веса.
        </p>
      </section>

      {/* 3. Блок "Не нашли комплектацию" */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl p-8 rounded-xl mb-12">
        <h2 className="text-2xl text-orange-800 font-bold mb-4">
          Не нашли нужную комплектацию ВРУ-3?
        </h2>
        <p className="mb-6">
          Если среди типовых сборок нет подходящего варианта, просто отправьте
          нам вашу <strong>однолинейную схему (ОЛС)</strong> или техническое
          задание — мы соберём ВРУ-3 точно по вашему проекту с полным
          соблюдением ПУЭ и ГОСТ.
          <br />
          <br />
          Если проекта пока нет, скачайте и заполните наш опросный лист, чтобы
          инженеры смогли оперативно рассчитать оптимальную конфигурацию под ваш
          объект.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Button
            asChild
            variant="outline"
            className="border-orange-600 text-orange-700"
          >
            <a
              href="/docs/oprosnyj-list-vru.docx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Скачать опросный лист
            </a>
          </Button>
          <Button
            onClick={() => handleButtonClick("Отправить схему")}
            className="bg-orange-600 hover:bg-orange-700 text-foreground"
          >
            Отправить схему на расчёт
          </Button>
        </div>
      </section>

      {/* 4. Руководство для инженеров (включая калькулятор) */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6">
          Как выбрать щит ВРУ-3: Руководство для инженеров и снабженцев
        </h2>
        <p className="mb-6 text-base lg:text-xl">
          При выборе устройства для промышленных, общественных или жилых
          объектов (включая ВРУ-3 категории электроснабжения), ключевыми
          критериями являются расчётная мощность, тип применяемых автоматических
          выключателей и герметичность корпуса.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">
              1. Определение функционального назначения (Номер схемы)
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Вводные панели (схемы 10–19):</strong> Устанавливаются
                на вводе питающей линии. Содержат переключатели, рубильники,
                предохранители, контакторы и трансформаторы тока для приборов
                коммерческого учёта электрической энергии (счётчики Меркурий,
                Энергомера).
              </li>
              <li>
                <strong>Распределительные панели (схемы 40–50):</strong>{" "}
                Распределяют энергию по конечным потребителям. Оснащаются блоком
                автоматических выключателей на отходящих линиях.
              </li>
              <li>
                <strong>Вводно-распределительные панели (схемы 20–29):</strong>{" "}
                Универсальный распределительный шкаф, объединяющий блок приёма,
                учёта и распределения в единой конструкции.
              </li>
            </ul>

            <h3 className="text-xl font-bold mb-2">
              2. Расчёт мощности и номинального тока
            </h3>
            <p className="mb-6 text-base lg:text-xl">
              Номинал вводных аппаратов переменного тока подбирается на основе
              суммарной расчётной мощности. Например, для небольших коммерческих
              павильонов или объектов 3 категории электроснабжения с выделенной
              мощностью <strong>15 кВт</strong> в трёхфазной сети оптимальным
              выбором являются сборки на <strong>25 А – 32 А</strong>. Для
              крупных производств применяются решения от 400 А до 1600 А.
            </p>
          </div>

          <div>
            <div className="p-6 rounded-lg border mb-6">
              <h3 className="text-lg font-bold mb-2">
                Универсальный калькулятор тока
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Основан на формуле: <strong>I = P / (√3 · U · cos(φ))</strong>
              </p>
              <div className="space-y-3 text-base">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Мощность, P (кВт):
                  </label>
                  <input
                    type="number"
                    value={power}
                    onChange={(e) => handlePowerChange(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Напряжение, U (кВ):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={voltage}
                    onChange={(e) => handleVoltageChange(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="0.38"
                  />
                  <small className="text-gray-500 block mt-1">
                    * 0.38 кВ = 380 В
                  </small>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Коэфф. мощности, cos(φ):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={cosPhi}
                    onChange={(e) => handleCosPhiChange(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="0.95"
                  />
                </div>
                <div className="p-4 font-bold text-blue-800 border-l-4 border-blue-600 rounded">
                  Искомый ток (I):{" "}
                  {isNaN(current) ? "Ошибка ввода" : `${current.toFixed(1)} А`}
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2">
              3. Условия эксплуатации: Степень защиты (IP)
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>IP31 (УХЛ4):</strong> Стандартный корпус для сухих,
                отапливаемых электрощитовых. Порошковая окраска защищает от
                коррозии.
              </li>
              <li>
                <strong>IP54 / IP65 (УХЛ1):</strong> Корпуса с полиуретановым
                уплотнителем для дополнительной защиты от влаги и пыли.
                Применяются в сырых помещениях, на пыльных производствах или на
                улице.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Блок "Аудит сметы" */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl p-8 rounded-xl mb-12 border border-blue-200">
        <h2 className="text-2xl text-blue-900 font-bold mb-4">
          Уже есть спецификация или расчёт от другого поставщика?
        </h2>
        <p className="mb-4">
          Наши инженеры бесплатно проведут <strong>технический аудит</strong>{" "}
          вашей сметы:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            Проверим однолинейную схему на соответствие ПУЭ и ГОСТ, исключим
            возможные <strong>ошибки в расчёте</strong> номиналов и сечений.
          </li>
          <li>
            Предложим <strong>оптимизированное бюджетное решение</strong> на
            надёжных альтернативных комплектующих (КЭАЗ, IEK, EKF, DEKraft) —
            часто это снижает итоговую стоимость сборки на 15–30% без потери
            характеристик.
          </li>
          <li>
            Если вы уже получили конкурентное предложение, мы поможем сравнить
            его с нашим и выбрать действительно выгодный вариант.
          </li>
        </ul>
        <Button
          onClick={() => handleButtonClick("Загрузить спецификацию")}
          className="bg-red-600 hover:bg-red-700 text-white font-bold"
        >
          Загрузить спецификацию на аудит
        </Button>
      </section>

      {/* 5. Коммерческие преимущества и Сервис */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          Коммерческие преимущества и сервис
        </h2>
        <p className="mb-6 text-base lg:text-xl">
          Мы строим работу так, чтобы заказ ВРУ-3 был прозрачным, предсказуемым
          и экономически выгодным для вашего проекта. Предлагаем низковольтные
          комплектные устройства (НКУ) с гибкой конфигурацией.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-2">
              Оптимизация сметы и выбор комплектующих
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                <strong>Свободный выбор брендов:</strong> Комплектуем ВРУ-3
                аппаратурой согласованных марок — КЭАЗ, IEK, CHINT, DEKraft,
                TDM, а также премиальными компонентами по запросу.
              </li>
              <li>
                <strong>Гибкая конфигурация:</strong> Предусматриваем резерв
                модульных мест, дополнительные секции, удобный ввод кабеля
                (сверху или снизу), интеграцию приборов учёта, реле контроля,
                контакторов, интерфейсов BMS/SCADA, диспетчеризации и
                сигнализации.
              </li>
              <li>
                <strong>Прозрачная спецификация:</strong> В коммерческом
                предложении фиксируем состав изделия, номиналы, количество
                аппаратов и стоимость каждой позиции.
              </li>
              <li>
                <strong>Специальные условия:</strong> Для застройщиков,
                подрядчиков, проектных организаций и повторных заказов действуют
                индивидуальные цены.
              </li>
            </ul>
          </div>

          <div className="border p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-2">
              Сервисное сопровождение и контроль качества
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                <strong>Проверка ТЗ инженером:</strong> Помогаем перевести
                техническое задание или однолинейную схему в корректную
                спецификацию ВРУ.
              </li>
              <li>
                <strong>Заводская сборка и ОТК:</strong> Изготавливаем в
                производственных условиях, проверяем монтаж, маркировку, затяжку
                соединений, комплектность и работоспособность схемы перед
                отгрузкой.
              </li>
              <li>
                <strong>Предмонтажная подготовка:</strong> Маркируем аппараты,
                клеммы, кабельные подключения и отходящие линии для быстрого и
                понятного монтажа.
              </li>
              <li>
                <strong>Поставка под ключ:</strong> Организуем доставку,
                шефмонтаж, подключение и пусконаладочные работы.
              </li>
            </ul>
          </div>

          <div className="border p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-2">
              Документация и гарантийные обязательства
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                <strong>Паспорт на ВРУ:</strong> Основные технические данные,
                сведения о комплектации, схемы и требования к эксплуатации.
              </li>
              <li>
                <strong>Однолинейная схема и спецификация:</strong>{" "}
                Соответствуют фактической комплектации поставляемого устройства.
              </li>
              <li>
                <strong>Протоколы заводской проверки и сертификаты:</strong>{" "}
                Подтверждают прохождение внутреннего контроля и качество
                применяемых материалов.
              </li>
              <li>
                <strong>Маркировка по проекту:</strong> Обозначения аппаратов и
                цепей приводим в соответствие с однолинейной схемой и кабельным
                журналом.
              </li>
              <li>
                <strong>Гарантия производителя:</strong> Гарантийные
                обязательства и условия сервисного сопровождения фиксируются в
                договоре.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Производство и покупка ВРУ-3 в Москве */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          Производство и покупка ВРУ-3 в Москве
        </h2>
        <p className="mb-6 text-base lg:text-xl">
          Заказать индивидуальную сборку и купить вводно-распределительные
          устройства ВРУ-3 напрямую от завода-изготовителя по оптимальной цене
          можно с доставкой на объект или удобным самовывозом. Мы обеспечиваем
          оперативный запуск производства и строгий контроль качества по ГОСТ.
        </p>

        {/* 7. Контакты и Оплата */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-xl border">
            <h3 className="font-bold text-xl mb-4">📍 Контакты и логистика</h3>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                <strong>Адрес производства и самовывоз:</strong> г. Москва, ул.
                Чермянская, д. 1, стр. 1, офис 214.
              </li>
              <li>
                <strong>Бесплатная доставка по Москве:</strong> При сумме заказа
                от 70 000 рублей.
              </li>
              <li>
                <strong>Доставка в регионы:</strong> Отправка любой ТК (доставка
                до терминала — бесплатно).
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border">
            <h3 className="font-bold text-xl mb-4">💳 Оплата и гарантии</h3>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                <strong>Рассрочка (B2B):</strong> Для постоянных клиентов
                доступна частичная предоплата для оперативного запуска сборки
                шкафа. Остаток вносится по готовности оборудования.
              </li>
              <li>
                <strong>Гарантия:</strong> На все щиты ВРУ-3 предоставляется
                официальная гарантия до <strong>3 лет</strong>.
              </li>
              <li>
                <strong>Сервисный центр:</strong> Удалённые технические
                консультации и возможность выезда инженера на объект.
              </li>
            </ul>
          </div>
        </div>

        {/* Пошаговый блок заказа */}
        <div className="p-8 rounded-xl border shadow-sm">
          <h3 className="text-2xl font-bold mb-6 border-b pb-3">
            Как заказать сборку ВРУ-3: 4 шага к готовому оборудованию
          </h3>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0">
            <li className="p-5 rounded-lg border-l-4 border-blue-600">
              <div className="text-3xl font-extrabold text-blue-600 mb-2">
                01
              </div>
              <strong className="block text-lg mb-2 text-accent">
                Отправка заявки и ТЗ
              </strong>
              <p className="text-sm">
                Вы присылаете нам однолинейную схему (ОЛС) или заполненный
                опросный лист. Нет проекта? Наши инженеры помогут составить
                спецификацию.
              </p>
            </li>
            <li className="p-5 rounded-lg border-l-4 border-blue-600">
              <div className="text-3xl font-extrabold text-blue-600 mb-2">
                02
              </div>
              <strong className="block text-lg mb-2 text-accent">
                Расчёт сметы и согласование
              </strong>
              <p className="text-sm">
                Подбираем комплектующие (КЭАЗ, IEK, CHINT и др.), оптимизируем
                бюджет и высылаем коммерческое предложение с фиксированными
                ценами и сроками.
              </p>
            </li>
            <li className="p-5 rounded-lg border-l-4 border-blue-600">
              <div className="text-3xl font-extrabold text-blue-600 mb-2">
                03
              </div>
              <strong className="block text-lg mb-2 text-accent">
                Производство и контроль (ОТК)
              </strong>
              <p className="text-sm">
                После согласования щит отправляется на сборку. Готовое изделие
                маркируется и проходит строгую проверку отделом технического
                контроля.
              </p>
            </li>
            <li className="p-5 rounded-lg border-l-4 border-blue-600">
              <div className="text-3xl font-extrabold text-blue-600 mb-2">
                04
              </div>
              <strong className="block text-lg mb-2 text-accent">
                Доставка и документы
              </strong>
              <p className="text-sm">
                Доставляем оборудование на объект (бесплатно по Москве от 70
                тыс. руб.). В комплекте — паспорт, сертификаты и однолинейная
                схема.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <FaqVru3 />
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
