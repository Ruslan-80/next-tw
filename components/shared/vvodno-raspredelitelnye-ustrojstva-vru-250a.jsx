"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

const CONSULTATION_LABEL = "Получить консультацию или заказать";
const PHONE_LABEL = "Позвонить";
const PHONE = "+74993901467";
const REQUEST_LABEL = "Оставить заявку";

const H2 = "text-2xl md:text-3xl font-bold";

const QUICK_LINKS = [
  { href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-125a", label: "ВРУ 125А" },
  { href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-400a", label: "ВРУ 400А" },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-transformator-toka",
    label: "Трансформаторы тока",
  },
];

const TECH_PARAMS = [
  { name: "Номинальный ток вводных аппаратов", value: "250 А" },
  { name: "Номинальное напряжение", value: "380/220 В (или 400/230 В)" },
  { name: "Частота переменного тока", value: "50–60 Гц" },
  { name: "Ударный ток короткого замыкания", value: "до 10–20 кА" },
  {
    name: "Сечение жил подключаемых кабелей (вводные зажимы)",
    value: "2х95 мм² (медь/алюминий)",
  },
  { name: "Системы заземления", value: "TN-C, TN-S, TN-C-S" },
];

const FEATURES = [
  {
    title: "Базовое распределение электроэнергии",
    desc: "Применяется на простых объектах. Оборудование комплектуется стандартными рубильниками, переключателями и предохранителями или автоматическими выключателями.",
  },
  {
    title: "Организация коммерческого учета",
    desc: "Для контроля потребления энергии всем зданием или отдельными абонентами в панель интегрируются трансформаторы тока и счетчики.",
  },
  {
    title: "Бесперебойное питание (АВР)",
    desc: "Если объект запитан по двум независимым линиям, применяются вводные панели с автоматическим включением резерва (АВР) на базе магнитных пускателей или контакторов.",
  },
  {
    title: "Управление освещением",
    desc: "Щит может дополняться блоками автоматического (АБУО) или неавтоматического (НБУО) управления общедомовым освещением.",
  },
];

const FAQ = [
  {
    q: "Какой кабель использовать для подключения ВРУ 250 А?",
    a: "Согласно стандартам для ВРУ, наибольшее количество и сечение медных или алюминиевых жил проводов и кабелей, присоединенных к вводным зажимам на 250 А, составляет 2х95 мм². Если используется медный жесткий кабель (одно- или многожильный), его сечение должно лежать в пределах от 70 мм² до 150 мм².",
  },
  {
    q: "В чем разница эксплуатации ВРУ 250А IP31 и IP54/IP55?",
    a: "Разница заключается в степени защиты оболочки от внешних воздействий. Исполнение IP31 стандартно применяется для установки внутри сухих электрощитовых помещений (при этом со стороны пола защита может отсутствовать — IP00). Корпуса с более высокой защитой, такие как IP55, изолируют токоведущие элементы от пыли и направленных струй воды, что допускает их эксплуатацию в сложных климатических условиях.",
  },
  {
    q: "Нужна ли панель противопожарных устройств (ППУ) в комплекте?",
    a: "Панель ППУ обязательна, если на объекте необходимо обеспечить бесперебойное питание средств пожаротушения, систем пожарной сигнализации и эвакуационного освещения. Такая панель конструктивно присоединяется к вводной панели с АВР, оснащается боковыми стенками для локализации аппаратуры, а ее фасад окрашивается в красный цвет.",
  },
];

export function vru250Top() {
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
                Вводно-распределительные устройства ВРУ на 250 А
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Вводно-распределительные устройства номиналом 250 А
                </strong>{" "}
                предназначены для приема, учета и распределения электроэнергии в
                трехфазных сетях с глухозаземленной нейтралью. Оборудование
                комплектуется изолированной нулевой шиной (N) и защитной шиной
                заземления (PE), соединенной с корпусом. Панели широко
                применяются для организации ввода и распределения питания в
                жилых домах, общественных зданиях и на промышленных объектах.
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
                alt="Вводно-распределительные устройства ВРУ на 250 А"
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

export function vru250Bottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto space-y-12 py-8 text-text">
      {/* Таблица технических параметров */}
      <section className="space-y-4">
        <h2 className={H2}>Базовые технические параметры</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-card">
              <tr>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Параметр
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Значение
                </th>
              </tr>
            </thead>
            <tbody>
              {TECH_PARAMS.map(({ name, value }) => (
                <tr
                  key={name}
                  className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/10"
                >
                  <td className="px-4 py-3 font-semibold">{name}</td>
                  <td className="px-4 py-3">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Особенности выбора комплектации */}
      <section className="space-y-4">
        <h2 className={H2}>Особенности выбора комплектации</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Для грамотного подбора устройства на 250 А важно отталкиваться от
          конечных задач объекта. Разделение функционала ВРУ позволяет гибко
          конфигурировать щитовое оборудование:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {FEATURES.map(({ title, desc }) => (
            <div
              key={title}
              className="space-y-2 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
            >
              <h3 className="text-lg font-bold text-accent">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
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
        id="order"
        className="space-y-4 rounded-2xl border border-accent bg-card p-6"
      >
        <h2 className={H2}>Не нашли нужную комплектацию ВРУ 250 А?</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Если среди типовых решений нет подходящего варианта, отправьте нам
          вашу однолинейную схему или техническое задание — мы соберём щит точно
          по проекту.
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
