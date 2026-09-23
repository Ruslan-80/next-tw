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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-paneli-rp",
    label: "Распределительные",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-avtomaticheskij-vyklyuchatel",
    label: "На автоматах",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-1-11-00-100А",
    name: "ВРУ1-11-00 Вводно-распределительное устройство 100 А, IP55, 1 ввод, без счётчика, УХЛ4",
    objects:
      "Многоквартирные жилые дома (в качестве вторичных распределительных узлов отдельных секций).",
    price: "от 45 000 руб.",
  },
  {
    sku: "vru21L-(320+320)-201-400А",
    name: "ВРУ21L-(320+320)-201 Вводно-распределительное устройство 400 А, IP31, 2 ввода, без счётчика, УХЛ4",
    objects:
      "Промышленные предприятия (цеховые распределительные и транзитные щиты).",
    price: "от 105 000 руб.",
  },
  {
    sku: "vru-4-250-116-250А",
    name: "ВРУ-4-250-116 Вводно-распределительное устройство 250А IP31, 1 ввод, с АВР, без счётчика, УХЛ4",
    objects:
      "Административные и бытовые здания (при организации учёта в центральном ГРЩ).",
    price: "от 75 000 руб.",
  },
  {
    sku: "vru-8504-4avr-630А-2000x800x450",
    name: "ВРУ-8504-4АВР-630 Вводно-распределительное устройство 630А IP31, 2 ввода, с АВР, без счётчика, УХЛ4",
    objects:
      "Общественные здания (с учётом, вынесенным на границу балансовой принадлежности с сетями).",
    price: "от 85 000 руб.",
  },
  {
    sku: "vru-8505-4va-100А-2000x450x450",
    name: "ВРУ-8505-4ВА-100 Вводно-распределительное устройство 100А IP55, 1 ввод, без счётчика, УХЛ1",
    objects:
      "Локальные зоны крупных коммерческих объектов (где требуется только защита отходящих линий).",
    price: "от 50 000 руб.",
  },
];

const FAQ = [
  {
    q: "Можно ли позже установить счётчик в ВРУ, которое изначально поставлялось без него?",
    a: "Это зависит от модификации щита. Если была заказана узкая транзитная панель (например, модификации 304 или 308 шириной 600 мм), места для трансформаторов тока и испытательных коробок (КИК) в ней физически нет. Для интеграции учёта в будущем потребуется установка отдельной специализированной панели учёта.",
  },
  {
    q: "Допускается ли замена рубильников на автоматы в транзитных ВРУ?",
    a: "Да. По желанию заказчика возможна замена базовых рубильников и предохранителей на автоматические выключатели различных марок, что отражается в наименовании щита добавлением индекса (АВ). Такая схема значительно повышает удобство эксплуатации распределительного узла.",
  },
];

export function vruBezSchetchikaTop() {
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
                Щиты ВРУ без счётчиков
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Вводно-распределительные устройства без приборов учёта
                </strong>{" "}
                применяются в качестве транзитных или вторичных
                распределительных узлов. Решение актуально для многоквартирных
                домов и крупных производств, где коммерческий учёт
                централизованно организован в главном распределительном щите
                (ГРЩ) или на трансформаторной подстанции. Использование щита
                исключительно для распределения мощности позволяет
                оптимизировать габариты оборудования и снизить итоговую
                стоимость реализации проекта.
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
                alt="Щиты ВРУ без счётчиков"
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

export function vruBezSchetchikaBottom() {
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
        <h2 className={H2}>Популярные модели ВРУ без счётчика</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Для объектов, где проектом не предусмотрен местный коммерческий учёт,
          мы производим широкую линейку специализированных однопанельных и
          шкафных устройств.
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
          комплектующих, сечения ошиновки и дополнительных опций (АВР,
          рубильники и т.д.).
        </p>
      </section>

      {/* Схемотехника и Требования Россетей/Энергосбыта */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Схемотехника и Требования Россетей/Энергосбыта</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          При проектировании систем электроснабжения применение транзитных щитов
          (без узла учета) строго обусловлено архитектурой сетей. По
          классификации ГОСТ 32396-2021, вводно-распределительное устройство
          может поставляться как с приборами коммерческого учёта, так и в
          качестве чисто распределительного звена.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Если проектная однолинейная схема подразумевает использование щита
          исключительно для защиты отходящих линий от токов короткого замыкания
          (Icc) и распределения мощности, измерительные трансформаторы в него не
          устанавливаются.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>Типовое применение:</strong> Вторичные распределительные
            узлы жилого дома (щиты отдельного подъезда или секции), когда
            главное ВРУ здания с узлом учёта Энергосбыта уже установлено в
            центральной электрощитовой.
          </li>
          <li>
            <strong>Требования инспекции:</strong> Энергосбытовые компании и
            Россети требуют, чтобы коммерческий учёт находился на границе
            балансовой принадлежности. Если эта граница расположена на
            трансформаторной подстанции (ТП) или в головной вводной панели
            многопанельного щита, последующие распределительные панели выполняют
            только защитную и транзитную функции.
          </li>
          <li>
            <strong>Особенности поставки:</strong> Согласно стандартам,
            оборудование может изготавливаться по индивидуальным схемам
            заказчика. Если счётчик предусмотрен проектом, но ВРУ поставляется
            без него, внутри шкафа подготавливаются крепёжные элементы,
            проводники и монтируется бирка с указанием типа необходимого
            прибора.
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
        <h2 className={H2}>Запросить расчёт стоимости транзитного ВРУ</h2>
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
