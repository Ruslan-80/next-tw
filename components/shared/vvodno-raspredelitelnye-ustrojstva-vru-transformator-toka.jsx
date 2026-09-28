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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-so-schetchikami",
    label: "Со счетчиками",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-250a",
    label: "ВРУ 250А",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-400a",
    label: "ВРУ 400А",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-3-20-32А",
    name: "ВРУ-3-20 Вводно-распределительное устройство 32 А, IP31, 1 ввод, УХЛ4",
    target: "Многоэтажные и малоэтажные застройки",
    price: "от 50 000 руб.",
  },
  {
    sku: "vru-3-23-63А",
    name: "ВРУ-3-23 Вводно-распределительное устройство 63 А, IP31, 1 ввод, УХЛ4",
    target: "Торговые комплексы, медицинские и образовательные учреждения",
    price: "от 50 000 руб.",
  },
  {
    sku: "vru-1-12-00k-100А",
    name: "ВРУ1-12-00К Вводно-распределительное устройство 100 А, IP65, 2 ввода, со счетчиком, с АВР, УХЛ4",
    target: "Для объектов частного сектора",
    price: "от 80 000 руб.",
  },
  {
    sku: "vru-1-15-00k-125А",
    name: "ВРУ1-15-00К Вводно-распределительное устройство 125 А, IP65, 2 ввода, со счетчиком, с АВР, УХЛ4",
    target: "Производственные цеха и технологические линии",
    price: "от 85 000 руб.",
  },
  {
    sku: "vru-1-18-00k-200А",
    name: "ВРУ1-18-00К Вводно-распределительное устройство 200 А, IP65, 2 ввода, со счетчиком, с АВР, УХЛ4",
    target: "Офисные и бизнес-центры",
    price: "от 85 000 руб.",
  },
];

const FAQ = [
  {
    q: "В каких случаях трансформаторы тока в ВРУ обязательны?",
    a: "Трансформаторы тока устанавливаются в обязательном порядке, если расчётный номинальный ток (In) на вводе превышает 100 Ампер. При токах до 100А применяются счётчики прямого включения.",
  },
  {
    q: "Каким проводом подключаются вторичные обмотки ТТ к счётчику?",
    a: "Согласно п. 6.3.1 нормативной документации, для монтажа внутренних слаботочных и измерительных цепей ВРУ следует применять только медные изолированные провода. Их сечение подбирается в зависимости от длины трассы (обычно не менее 2,5 мм²).",
  },
];

export function vruTransformatorTokaTop() {
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
                Вводно-распределительные устройства ВРУ с трансформаторами тока
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Вводно-распределительные устройства (ВРУ) с трансформаторами
                  тока
                </strong>{" "}
                применяются для организации коммерческого учета электроэнергии
                на объектах с расчетным током потребления свыше 100 Ампер (где
                прямое подключение счетчика не допускается). Измерительные
                трансформаторы преобразуют высокие первичные токи до безопасных
                значений (стандартно 5А), обеспечивая точную работу приборов
                учета. Такое техническое решение обязательно для главных
                распределительных щитов энергоемких производств, крупных
                торговых центров и многоквартирных домов.
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
                alt="Вводно-распределительные устройства ВРУ с трансформаторами тока"
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

export function vruTransformatorTokaBottom() {
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
        <h2 className={H2}>Типовые конфигурации ВРУ с трансформаторами тока</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Комплектация измерительных цепей осуществляется индивидуально под
          заявленную мощность объекта. Мы устанавливаем сертифицированные
          трансформаторы тока (класс точности 0.5S) ведущих брендов на надёжную
          сборную ошиновку.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-card">
              <tr>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Артикул
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Наименование и Номинал ВРУ
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
              {MODELS_TABLE.map(({ sku, name, target, price }) => (
                <tr
                  key={sku}
                  className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/10"
                >
                  <td className="px-4 py-3 font-semibold text-accent">{sku}</td>
                  <td className="px-4 py-3">{name}</td>
                  <td className="px-4 py-3">{target}</td>
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

      {/* Dobavochnaya cennost */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Коэффициенты трансформации и стандарты монтажа</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Внедрение трансформаторов тока требует строжайшего соблюдения ПУЭ-7 и
          ГОСТ. Главный параметр ТТ — коэффициент трансформации. Например,
          маркировка «400/5» означает, что при протекании по первичной силовой
          шине тока в 400 Ампер, на вторичной измерительной обмотке
          трансформатора будет сгенерирован безопасный ток в 5 Ампер, который и
          считывается электросчётчиком. Программирование самого счётчика на этот
          коэффициент позволяет отображать реальные киловатт-часы потребления.
        </p>

        <h3 className="text-xl font-bold pt-2">
          Инженерный фокус на безопасность и материалы
        </h3>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>Сборные шины:</strong> Сами трансформаторы тока (надеваемые
            на шину или встраиваемые в разрыв) монтируются на медные или
            алюминиевые шины (предпочтительно плакированные медью).
          </li>
          <li>
            <strong>Вторичные цепи (подключение к счётчику):</strong> Для
            внутренних цепей ВРУ, передающих сигнал от ТТ к счётчику и
            испытательной переходной коробке (КИК), мы применяем исключительно
            медные изолированные провода, что гарантирует отсутствие потерь
            напряжения в измерительном контуре.
          </li>
          <li>
            <strong>Защита оборудования:</strong> Вся схема надёжно защищена от
            перегрузок и токов короткого замыкания (Icc), при этом нулевые
            защитные шины PE в наших щитах выполняются из меди (или стали с
            металлическим покрытием эквивалентной проводимости).
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
        className="space-y-4 rounded-2xl border border-accent bg-card p-6 text-center"
      >
        <h2 className={H2}>
          Запросить расчёт стоимости ВРУ с трансформаторами тока
        </h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Оставьте заявку или позвоните — мы подберём конфигурацию под ваши
          требования и обеспечим точный учёт электроэнергии.
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
