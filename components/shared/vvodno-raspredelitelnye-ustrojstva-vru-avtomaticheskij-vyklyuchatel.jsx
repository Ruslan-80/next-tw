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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-na-kontaktorakh",
    label: "На контакторах",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-paneli-rp",
    label: "Распределительные",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-1-vvod",
    label: "ВРУ 1 ввод",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-1-48-00a-200А",
    name: "ВРУ1-48-00А Вводно-распределительное устройство 200 А, IP31, 1 ввод, без счетчика, УХЛ4",
    objects:
      "Автоматические выключатели отходящих линий (суммарный In = 200 А), без блока управления освещением. Номиналы (например, ВА47-29, ВА88, АЕ2056) подбираются по однолинейной схеме.",
    price: "от 45 000 руб.",
  },
  {
    sku: "vru-1-45-40a-800А",
    name: "ВРУ1-45-40А Вводно-распределительное устройство 800 А, IP55, 1 ввод, без счетчика, УХЛ4",
    objects:
      "Силовое распределение автоматами (суммарный In = 800 А). Количество отходящих линий комплектуется индивидуально.",
    price: "от 45 000 руб.",
  },
  {
    sku: "vru-1-42-10a-250А",
    name: "ВРУ1-42-10А Вводно-распределительное устройство 250 А, IP31, 1 ввод, без счетчика, УХЛ4",
    objects:
      "Автоматические выключатели (In = 250 А) + аппаратура коммутации по схеме 10. Комплектация на базе КЭАЗ, IEK, CHINT или DEKraft.",
    price: "от 70 000 руб.",
  },
  {
    sku: "vru-1-16-00a-125А",
    name: "ВРУ1-16-00А Вводно-распределительное устройство 125 А, IP66, 1 ввод, со счетчиком, УХЛ4",
    objects:
      "Вводной коммутационный аппарат + Автоматы на отходящих линиях (In = 125 А). Сборка по проекту заказчика.",
    price: "от 50 000 руб.",
  },
  {
    sku: "vru-1-13-00a-100А",
    name: "ВРУ1-13-00А Вводно-распределительное устройство 100 А, IP66, 1 ввод, со счетчиком, УХЛ4",
    objects:
      "Вводной аппарат + Автоматические выключатели (суммарный In = 100 А). Выбор брендов согласно ТЗ.",
    price: "от 45 000 руб.",
  },
];

const FAQ = [
  {
    q: "В чем разница между панелями ВРУ1-47-00 и ВРУ1-47-00А?",
    a: "Модификация ВРУ1-47-00 комплектуется плавкими предохранителями (например, ПН2-100А), тогда как индекс «А» в панели ВРУ1-47-00А говорит о том, что для защиты отходящих линий применены автоматические выключатели (например, АЕ2056 на 100А).",
  },
  {
    q: "Как подключаются нулевые и защитные проводники в таких ВРУ?",
    a: "Независимо от типа коммутационных аппаратов, правильная схема подключения подразумевает использование соединительных элементов для зажимов изолированных нулевых рабочих проводников (N, синяя маркировка) и нулевых защитных проводников (PE, зелено-желтая маркировка), которые имеют электрический контакт с корпусом.",
  },
];

export function vruAvtomaticheskijVyklyuchatelTop() {
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
                ВРУ на автоматических выключателях
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Вводно-распределительные устройства (ВРУ) на автоматических
                  выключателях
                </strong>{" "}
                — это электрощиты, в которых для защиты отходящих линий вместо
                плавких предохранителей применены автоматы (обозначаются литерой
                «А» в маркировке, например, ВРУ1-47-00А). Данное техническое
                решение обеспечивает максимально быструю селективную защиту
                кабельных линий от токов короткого замыкания (Icc) и перегрузок.
                Использование автоматов позволяет дежурному персоналу оперативно
                восстановить питание потребителей без необходимости замены
                перегоревших элементов.
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
                alt="ВРУ на автоматических выключателях"
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

export function vruAvtomaticheskijVyklyuchatelBottom() {
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
          Популярные модели ВРУ с автоматическими выключателями
        </h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Для обеспечения максимальной надежности мы применяем автоматические
          выключатели проверенных брендов (КЭАЗ, IEK, CHINT и др.), которые
          монтируются на жесткую медную или алюминиевую ошиновку.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-card">
              <tr>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Артикул
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Описание и Характеристики комплектации
                </th>
                <th className="border-b border-border px-4 py-3 text-left font-semibold">
                  Оборудование защиты (Отходящие линии)
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

      {/* Teplovoj i elektromagnitnyj rascepiteli */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>
          Тепловой и электромагнитный расцепители (Значение литеры «А»)
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          В нормативной документации позиция Х5 в структуре наименования строго
          регламентирует тип защитных аппаратов на отходящих линиях. Отсутствие
          знака указывает на использование классических плавких предохранителей
          (например, ПН-2 или ППН), а литера «А» — на автоматические
          выключатели.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Почему при проектировании распределительных узлов инженеры
          предпочитают автоматы?
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>Тепловой расцепитель (биметаллическая пластина):</strong>{" "}
            Реагирует на длительные токи перегрузки, превышающие номинал (In)
            автомата. Предотвращает перегрев и оплавление изоляции питающего
            кабеля.
          </li>
          <li>
            <strong>Электромагнитный расцепитель (соленоид):</strong>{" "}
            Обеспечивает мгновенное отключение цепи при возникновении ударного
            тока короткого замыкания, защищая сборные шины и аппаратуру от
            электродинамического разрушения.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          В отличие от предохранителя, который после перегорания плавкой вставки
          требует физической замены дежурным персоналом, автомат позволяет
          восстановить питание линии простым взводом рукоятки. Это критически
          важно для ответственных потребителей, где длительные простои
          недопустимы.
        </p>
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
        <h2 className={H2}>Запросить расчёт стоимости ВРУ с автоматами</h2>
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
