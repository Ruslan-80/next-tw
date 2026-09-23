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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-avtomaticheskij-vyklyuchatel",
    label: "На автоматах",
  },
  { href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-s-avr", label: "С АВР" },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-2-vvoda",
    label: "ВРУ 2 ввода",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-1-19-99-160А",
    name: "ВРУ-1-19-99 Вводно-распределительное устройство 160А IP31, 2 ввода, с авр, со счетчиком, УХЛ4",
    objects: "Панели ППУ жилых зданий",
    price: "от 90 000 руб.",
  },
  {
    sku: "vru-1-22-10k-250А",
    name: "ВРУ1-22-10К Вводно-распределительное устройство 250 А, IP65, 2 ввода, со счетчиком, с АВР, УХЛ4",
    objects: "Торговые центры, больницы, учебные заведения",
    price: "от 110 000 руб.",
  },
  {
    sku: "vru-1-18-00k-200А",
    name: "ВРУ1-18-00К Вводно-распределительное устройство 200 А, IP65, 2 ввода, со счетчиком, с АВР, УХЛ4",
    objects: "Производственные цеха и технологические линии",
    price: "от 85 000 руб.",
  },
  {
    sku: "vru-1-22-30k-630А",
    name: "ВРУ1-22-30К Вводно-распределительное устройство 630 А, IP65, 2 ввода, со счетчиком, с АВР, УХЛ4",
    objects: "Офисные и бизнес-центры",
    price: "от 160 000 руб.",
  },
  {
    sku: "vru-1-15-20k-400А",
    name: "ВРУ1-15-20К Вводно-распределительное устройство 400 А, IP65, 2 ввода, со счетчиком, с АВР, УХЛ4",
    objects: "Хозяйственные, коммунальные и инфраструктурные объекты",
    price: "от 130 000 руб.",
  },
];

const FAQ = [
  {
    q: "Можно ли установить ВРУ на контакторах как обычное ВРУ жилого дома?",
    a: "Для стандартного жилого фонда применение сложных щитов на контакторах экономически нецелесообразно. Они устанавливаются в МКД только в качестве панелей противопожарных устройств (ППУ) для питания насосов пожаротушения, систем дымоудаления и эвакуационного освещения, где требуется I категория надежности.",
  },
  {
    q: "Как управлять контакторами, если вышла из строя плата логики АВР?",
    a: "Продуманная схема ВРУ всегда имеет резервный сценарий. Конструкция предусматривает перевод контроллера в неавтоматический режим, после чего переключение вводов осуществляется вручную с помощью специального рычага.",
  },
];

export function vruNaKontaktorakhTop() {
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
                Вводно-распределительные устройства ВРУ на контакторах
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Вводно-распределительные устройства на контакторах
                </strong>{" "}
                (магнитных пускателях) применяются для дистанционного управления
                мощными силовыми установками и реализации схем автоматического
                включения резерва (АВР). При нарушении питания на одном из
                вводов, контакторы под управлением логического реле мгновенно и
                в автоматическом режиме переключают нагрузку на исправную
                магистраль. Такое вводно-распределительное устройство (ВРУ)
                является техническим стандартом для объектов I категории
                надёжности электроснабжения, где простои оборудования
                недопустимы.
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
                alt="Вводно-распределительные устройства ВРУ на контакторах"
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

export function vruNaKontaktorakhBottom() {
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
        <h2 className={H2}>Типовые конфигурации ВРУ на контакторах</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          В сборке применяются надёжные контакторы с высокой механической и
          коммутационной износостойкостью. Ниже представлены типовые модификации
          двухфидерных щитов серии ВРУ21L, оснащённые блоками АВР.
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
          комплектующих, сечения ошиновки и дополнительных опций (логика АВР,
          учёт и т.д.).
        </p>
      </section>

      {/* Distancionnoe upravlenie i logika raboty AVR */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Дистанционное управление и логика работы АВР</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Для электроснабжения ЦОДов, больниц или систем пожаротушения, где
          требуется дистанционное и автоматизированное управление нагрузкой, в
          основу вводного узла всегда закладываются контакторы.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Классическая однолинейная схема ВРУ на контакторах включает в себя
          вводные автоматические выключатели (QF1, QF2) для защиты от коротких
          замыканий и блок АВР, управляющий магнитными пускателями.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>Автоматический режим:</strong> При восстановлении питания на
            основном вводе, секция распределения автоматически переподключается
            к своему штатному источнику без вмешательства дежурного персонала.
          </li>
          <li>
            <strong>Механическая и электрическая блокировка:</strong> Чтобы
            исключить встречное напряжение (одновременное замыкание двух
            вводов), силовые контакторы оснащаются жёсткой механической взаимной
            блокировкой.
          </li>
          <li>
            <strong>Неавтоматический (ручной) режим:</strong> Помимо работы
            автоматики, в наших щитах предусмотрен ручной режим. Переключение
            можно производить посредством кнопок на лицевой панели контроллера,
            либо с помощью специального рычага на самих контакторах (при полном
            обесточивании модуля управления).
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
        <h2 className={H2}>Запросить расчёт стоимости ВРУ на контакторах</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Оставьте заявку или позвоните — мы подберём конфигурацию под ваш
          проект и требования по надёжности.
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
