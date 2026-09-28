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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-napolnye",
    label: "Напольные шкафы",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-s-avr",
    label: "С АВР",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-8504-4r-250А-1800x800x450",
    name: "ВРУ-8504-4Р-250 Вводно-распределительное устройство 250А IP66, 1 ввод, со счетчиком, УХЛ1",
    objects: "Горно-обогатительные комбинаты (ГОК)",
    price: "от 50 000 руб.",
  },
  {
    sku: "vru-4-1600-122-1600А",
    name: "ВРУ-4-1600-122 Вводно-распределительное устройство 1600А IP66, 1 ввод, со счетчиком, УХЛ1",
    objects: "Морские и речные порты, причалы",
    price: "от 50 000 руб.",
  },
  {
    sku: "vru-3-15-1600А",
    name: "ВРУ-3-15 Вводно-распределительное устройство 1600 А, IP66, 1 ввод, УХЛ1",
    objects: "Пищевая промышленность (мойка под давлением)",
    price: "от 50 000 руб.",
  },
  {
    sku: "vru-1-23-10a-250А",
    name: "ВРУ1-23-10А Вводно-распределительное устройство 250 А, IP66, 1 ввод, со счетчиком, УХЛ1",
    objects: "Объекты I категории на открытом воздухе",
    price: "от 75 000 руб.",
  },
  {
    sku: "vru-1-13-40a-1600А",
    name: "ВРУ1-13-40А Вводно-распределительное устройство 1600 А, IP66, 2 ввода, со счетчиком, УХЛ4",
    objects: "Тяжелые металлургические производства",
    price: "от 60 000 руб.",
  },
];

const FAQ = [
  {
    q: "Чем ВРУ IP66 отличается от IP65?",
    a: "Обе степени обеспечивают полную пыленепроницаемость (индекс 6). Разница заключается в защите от воды: IP65 выдерживает обычные струи воды с любого направления, тогда как IP66 рассчитан на мощные водяные струи под высоким давлением (штормовые условия, направленная мойка промышленным оборудованием).",
  },
  {
    q: "Можно ли использовать ВРУ IP66 как обычное ВРУ жилого дома?",
    a: "Технически это возможно, но экономически абсолютно нецелесообразно. Для многоквартирных домов и коттеджей применяются щиты IP31 или IP54. Оболочка IP66 значительно удорожает конструкцию и применяется только там, где существует реальный риск затопления или воздействия агрессивных жидкостей.",
  },
];

export function vruIp66Top() {
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
                ВРУ со степенью защиты IP66
              </h2>
              <p className="text-text/80 leading-relaxed">
                <strong>
                  Вводно-распределительные устройства (ВРУ) со степенью защиты
                  IP66
                </strong>{" "}
                обеспечивают эталонную надежность и абсолютную изоляцию
                электрооборудования от мелкой пыли и мощных водяных струй под
                давлением. В отличие от типовых вводных панелей для зданий,
                сверхгерметичные шкафы IP66 применяются в экстремальных
                условиях: на морских палубах, в карьерах, шахтах и на
                предприятиях тяжелой промышленности. Они гарантируют
                бесперебойный приём энергии в сетях 400/230 В и селективную
                защиту от токов короткого замыкания (Icc) даже при направленной
                мойке корпуса струей воды.
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
                alt="Вводно-распределительные устройства ВРУ IP66"
                fill
                preload={true}
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

export function vruIp66Bottom() {
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
        <h2 className={H2}>Популярные модели ВРУ IP66</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Для обеспечения максимальной степени защиты IP66 корпуса имеют
          усиленный цельносварной каркас, многоконтурные полиуретановые
          уплотнители и специализированную ригельную систему запирания двери.
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

      {/* Специфика оболочки IP66 и кабельных вводов */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Специфика оболочки IP66 и кабельных вводов</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Проектирование сверхгерметичных щитов требует особого инженерного
          подхода. Если типовая однолинейная схема электроснабжения для закрытых
          помещений допускает использование корпусов IP31, то индекс IP66
          выбирается исключительно для агрессивных сред.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Согласно нормативам, электрооборудование со степенью защиты оболочки
          IP6X проходит строгие испытания на пыленепроницаемость по категории 1
          ГОСТ 14254. При этом вторая цифра «6» гарантирует защиту оборудования
          от сильных водяных струй (например, при регулярном мытье аппаратами
          высокого давления или при штормовой погоде).
        </p>

        <h3 className="pt-2 text-xl font-bold">
          Инженерный нюанс (Ввод кабеля и изоляция)
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Самым уязвимым местом герметичного щита является зона подключения.
          Отверстия в кабельных вводах и заглушках должны выполняться так, чтобы
          при прокладке кабелей не снижалась установленная степень защиты
          оболочки. В таких шкафах обязательно устанавливаются системы активного
          климат-контроля для предотвращения образования конденсата, который
          способен снизить электрическое сопротивление изоляции внутренних цепей
          ниже нормативных 10 МОм.
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
        <h2 className={H2}>Запросить расчёт стоимости ВРУ IP66</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Оставьте заявку или позвоните — мы подберём сверхгерметичное решение
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
