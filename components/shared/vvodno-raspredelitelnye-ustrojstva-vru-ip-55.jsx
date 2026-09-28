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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-ip-65",
    label: "ВРУ IP65",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-ukhl1",
    label: "ВРУ УХЛ1",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-navesnye",
    label: "Навесные щиты",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-1-21-00-ip55",
    name: "ВРУ1-21-00 Вводно-распределительное устройство (In: 100 А, IP55, 1 ввод, со счётчиком, УХЛ4)",
    objects: "Подвальные помещения МКД, автопаркинги",
    price: "45 000 руб.",
  },
  {
    sku: "vru-3-44-100А",
    name: "ВРУ-3-44 Вводно-распределительное устройство (In: 100 А, IP55, 1 ввод, УХЛ1)",
    objects: "Открытые строительные площадки, уличные навесы",
    price: "45 000 руб.",
  },
  {
    sku: "vru-1-17-00-200А",
    name: "ВРУ1-17-00 Вводно-распределительное устройство (In: 200 А, IP55, 1 ввод, со счётчиком, УХЛ4)",
    objects: "Влажные производственные цеха, склады",
    price: "50 000 руб.",
  },
  {
    sku: "vru-8504-4r-400А",
    name: "ВРУ-8504-4Р-400 Вводно-распределительное устройство (In: 400А, IP55, 1 ввод, со счётчиком, УХЛ1)",
    objects: "Агропромышленные комплексы, логистические хабы",
    price: "50 000 руб.",
  },
  {
    sku: "vru-002-ip55",
    name: "Шкафное ВРУ (Габариты: 1000х600х250 мм, IP55)",
    objects: "Малые коммерческие объекты с агрессивной средой",
    price: "По запросу",
  },
];

const FAQ = [
  {
    q: "В чем принципиальное конструктивное отличие ВРУ IP55 от IP31?",
    a: "Шкафы IP31 предназначены только для сухих помещений и имеют открытое дно (IP00) для свободного ввода кабелей снизу. Корпуса IP55 полностью герметичны со всех сторон (включая дно). Ввод кабелей в них осуществляется строго через специальные уплотнительные сальники, размер которых проектировщик подбирает под внешний диаметр кабеля.",
  },
  {
    q: "Допускается ли установка ВРУ IP55 на улице под открытым небом без навеса?",
    a: "Согласно ГОСТ 14254, вторая цифра «5» обеспечивает защиту от струй воды, что формально допускает наружную установку. Однако для открытых площадок с риском обледенения и прямого воздействия солнечной радиации мы настоятельно рекомендуем использовать дополнительный защитный козырек (навес) или применять антивандальные оболочки степени защиты IP65.",
  },
];

export function vruIp55Top() {
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
        {/* Osnovnoy setchatyy blok: Tekst + Izobrazhenie */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Levaya kolonka — tekst */}
          <div className="animate-fade-in-up space-y-8 px-2">
            <div className="space-y-4">
              <h2 className="text-text pb-4 text-2xl font-bold leading-tight lg:text-5xl">
                ВРУ со степенью защиты IP55
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Вводно-распределительные устройства (ВРУ), изготовленные со
                  степенью защиты IP55
                </strong>
                , предназначены для эксплуатации в тяжёлых условиях: во влажных
                и неотапливаемых помещениях, подземных паркингах, автомойках,
                промышленных цехах с высоким уровнем запылённости, а также для
                наружной установки под навесом. Эти степени защиты соответствуют
                требованиям ГОСТ 14254-96 (МЭК 60529), который регламентирует
                классы защиты оболочек электротехнического оборудования от
                внешних воздействий. Герметичный металлический корпус надёжно
                защищает внутреннюю коммутационную аппаратуру и сборные шины от
                попадания токопроводящей пыли и водяных струй с любого
                направления. Оборудование гарантирует безопасный приём и
                распределение электроэнергии в сетях 400/230 В, селективно
                защищая отходящие линии от токов короткого замыкания (Icc) и
                критических перегрузок.
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
                alt="Вводно-распределительные устройства ВРУ IP55"
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

export function vruIp55Bottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto space-y-12 py-8 text-text">
      {/* Tovarnaya setka / tabli
tsa modeley */}
      <section className="space-y-4">
        <h2 className={H2}>Популярные модели ВРУ IP55</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Для обеспечения заявленной степени защиты IP55 все шкафы комплектуются
          полиуретановым контурным уплотнителем дверей и специализированными
          герметичными кабельными вводами (сальниками).
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
          комплектующих, сечения ошиновки и дополнительных опций (АВР, учёт и
          т.д.).
        </p>
      </section>

      {/* Rasshifrovka IP55 i bor'ba s kondensatom */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Расшифровка IP55 и борьба с конденсатом</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Оболочка ВРУ со степенью защиты IP55 — это инженерное решение, к
          которому предъявляются строгие требования по ГОСТ 14254 и ГОСТ
          32396-2021.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>Первая цифра «5»:</strong> Означает частичную
            пыленепроницаемость. Пыль может проникать внутрь корпуса, но в
            количествах, не нарушающих нормальную работу контактных зажимов,
            реле и автоматических выключателей.
          </li>
          <li>
            <strong>Вторая цифра «5»:</strong> Гарантирует защиту от струй воды.
            Оболочка выдерживает направленные водяные струи с любого направления
            без вредных последствий для оборудования.
          </li>
        </ul>
        <div className="mt-4 rounded-lg bg-accent/10 p-4">
          <h3 className="font-bold text-accent">
            Инженерный нюанс (Риск конденсации)
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Полностью герметичные корпуса (в отличие от IP31 с открытым дном
            IP00) склонны к накоплению внутреннего конденсата при резких
            перепадах температур окружающей среды. Влага оседает на медных шинах
            и изоляторах, что может привести к пробою изоляции. Для щитов IP55,
            устанавливаемых в неотапливаемых зонах или на улице (климатическое
            исполнение УХЛ1 или У1), мы в обязательном порядке рассчитываем и
            устанавливаем систему антиконденсатного обогрева (резистивные
            нагреватели с термостатом), чтобы поддерживать температуру точки
            росы внутри шкафа в безопасных пределах.
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
        <h2 className={H2}>Запросить расчёт стоимости ВРУ IP55</h2>
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
