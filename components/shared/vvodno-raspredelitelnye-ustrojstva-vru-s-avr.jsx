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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-2-vvoda",
    label: "ВРУ 2 ввода",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-na-kontaktorakh",
    label: "На контакторах",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-vvodnye-paneli-vp",
    label: "Вводные панели",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-1-17-70",
    name: "ВРУ-1-17-70 (100 А, IP31, 2 ввода, со счётчиком, с АВР, УХЛ4)",
    price: "80 000 руб.",
  },
  {
    sku: "vru-1-12-00k-100А",
    name: "ВРУ1-12-00К (100 А, IP65, 2 ввода, коммерческий учёт электроэнергии, АВР)",
    price: "80 000 руб.",
  },
  {
    sku: "vru-1-18-80",
    name: "ВРУ-1-18-80 (250 А, IP31, 2 ввода, панель вводная со счётчиком, АВР)",
    price: "110 000 руб.",
  },
  {
    sku: "vru21L-320-301-400А",
    name: "ВРУ21L-320-301 (400 А, IP31, 2 ввода, устройство автоматического переключения)",
    price: "130 000 руб.",
  },
  {
    sku: "vru-8504-4avr-630А",
    name: "ВРУ-8504-4АВР-630 (630А, IP31, 2 ввода, секция распределения, УХЛ4)",
    price: "85 000 руб.",
  },
  {
    sku: "vru-4-1600-232-1600А",
    name: "ВРУ-4-1600-232 (1600 А, IP31, 1 ввод, с АВР, со счётчиком, УХЛ4)",
    price: "75 000 руб.",
  },
];

const FAQ = [
  {
    q: "Можно ли заказать шкаф автоматического ввода резерва по индивидуальной схеме?",
    a: "Да, наши инженеры бесплатно проанализируют ваше техническое задание или однолинейную схему. Мы можем реализовать сложное секционирование, внедрить блоки автоматического ввода резерва для работы с генератором (ДГУ) и адаптировать габариты под ваше помещение.",
  },
  {
    q: "Какие аппараты защиты устанавливаются внутри щита?",
    a: "Выбор зависит от вашего бюджета и требований к надёжности. Мы собираем ВРУ на базе проверенных брендов: от доступных IEK, TDM и EKF до решений высокого класса от CHINT, КЭАЗ, ABB и Schneider Electric. Все автоматические выключатели и УЗО имеют оригинальные сертификаты.",
  },
  {
    q: "Предусмотрен ли коммерческий учёт электроэнергии?",
    a: "Да, по запросу заказчика в панель ВРУ интегрируются счётчики прямого или трансформаторного включения для организации рабочего и резервного коммерческого учёта электрической энергии на вводах.",
  },
  {
    q: "Защищает ли ВРУ с АВР оборудование от перепадов напряжения?",
    a: "Базовая функция АВР — переключение на резервную линию при исчезновении напряжения или обрыве фаз. Для защиты от импульсных перенапряжений (например, от ударов молний) в схему дополнительно устанавливаются ограничители перенапряжений (УЗИП).",
  },
  {
    q: "Как осуществляется доставка крупногабаритных напольных ВРУ?",
    a: "Мы надёжно упаковываем электрощитовое оборудование для исключения повреждений при транспортировке. Доставка оригинальных товаров осуществляется ведущими транспортными компаниями по всей территории РФ. Крупные сборные панели могут поставляться отдельными секциями для удобства монтажа на объекте.",
  },
];

export function vruAvrTop() {
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
                Щиты ВРУ с автоматическим вводом резерва (АВР)
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>ВРУ с АВР</strong> (вводно-распределительное устройство
                с автоматическим вводом резерва) — это промышленное
                электрощитовое оборудование, предназначенное для приёма,
                распределения электрической энергии и защиты отходящих линий при
                перегрузках и коротких замыканиях в сетях трёхфазного
                переменного тока. Главная функция такого щита — обеспечение
                бесперебойного питания путём автоматического переключения
                потребителей на резервный источник при пропадании напряжения на
                основном вводе. В нашем интернет-магазине вы можете купить
                сертифицированные панели для объектов любой категории
                надёжности.
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
                alt="Щиты ВРУ с автоматическим вводом резерва (АВР)"
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

export function vruAvrBottom() {
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
        <h2 className={H2}>
          📦 Популярные модели вводно-распределительных устройств
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-card">
              <tr>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Артикул
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Наименование и спецификация
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Цена (руб.)
                </th>
              </tr>
            </thead>
            <tbody>
              {MODELS_TABLE.map(({ sku, name, price }) => (
                <tr
                  key={sku}
                  className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/10"
                >
                  <td className="px-4 py-3 font-semibold text-accent">{sku}</td>
                  <td className="px-4 py-3">{name}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-bold text-red-600 dark:text-red-400">
                    {price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs italic text-muted-foreground">
          *Указаны ориентировочные базовые цены. Точная стоимость зависит от
          выбранных автоматических выключателей и дополнительных функций
          контроля.
        </p>
      </section>

      {/* Rukovodstvo po vyboru */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>
          📖 Руководство по выбору: автоматика и коммутационные аппараты[cite:
          35]
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Перерыв в электроснабжении может повлечь за собой опасность для жизни
          людей или значительный ущерб предприятию (массовый брак продукции,
          расстройство сложного технологического процесса). Чтобы этого
          избежать, критически важно правильно выбрать базу для щита
          автоматического включения резерва.
        </p>
        <p className="text-sm font-semibold text-muted-foreground md:text-base">
          Скорость восстановления питания зависит от типа переключающего
          устройства:
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>Контакторы с механической блокировкой:</strong> Время
            срабатывания 0.1–0.5 сек. Оптимальный выбор для жилых зданий, школ,
            детских садов и типовых коммерческих объектов[cite: 35].
          </li>
          <li>
            <strong>Автоматические выключатели с мотор-приводом:</strong> Время
            срабатывания 1.0–3.0 сек. Способны выдерживать высокие токи
            короткого замыкания. Предназначены для распределения питания
            силового оборудования на промышленных предприятиях[cite: 35].
          </li>
          <li>
            <strong>Статические (тиристорные) переключатели:</strong> Время
            срабатывания менее 0.02 сек. Применяются там, где недопустим
            малейший сбой электропитания: серверные (ЦОДы), медицинские
            учреждения (реанимации, МРТ) и лаборатории.
          </li>
        </ol>
      </section>

      {/* Proizvodstvo i prodazha */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>🏭 Купить ВРУ с АВР от завода-изготовителя</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Мы осуществляем производство и продажу вводно-распределительных
          устройств по цене производителя. Каждая сборка щитов проходит строгий
          контроль качества (ОТК) и полностью соответствует требованиям ГОСТ и
          ПУЭ.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>Надёжная конструкция:</strong> Используем прочные
            металлические корпуса напольного и навесного исполнения,
            качественные медные шины и надёжные реле контроля напряжения[cite:
            35].
          </li>
          <li>
            <strong>Полный комплект документов:</strong> С каждым шкафом
            управления поставляется сопроводительная документация: паспорт
            изделия, принципиальная однолинейная схема, сертификаты на
            комплектующие. Это гарантирует беспроблемную сдачу объекта
            контролирующим органам.
          </li>
          <li>
            <strong>Сроки и логистика:</strong> Изготовление типовых решений
            занимает от 7 до 10 дней. Доступен удобный самовывоз со склада (г.
            Москва, ул. Чермянская, д.1). При заказе от 70 000 рублей действует
            бесплатная доставка по Москве. Также организуем быструю доставку по
            всей России до терминала транспортной компании.
          </li>
          <li>
            <strong>Условия оплаты:</strong> Для постоянных клиентов и
            юридических лиц возможна рассрочка платежа (запуск производства по
            минимальному авансу). Работаем по безналичному расчёту с выделением
            НДС.
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className={H2}>💬 Часто задаваемые вопросы (FAQ)</h2>
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
        className="space-y-4 rounded-2xl border border-accent bg-card p-6 text-center"
      >
        <h2 className={H2}>Нужна помощь с подбором?</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Оставьте заявку или позвоните — мы поможем выбрать оптимальное решение
          под ваш объект.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
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
