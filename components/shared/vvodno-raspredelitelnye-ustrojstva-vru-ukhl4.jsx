"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

const CONSULTATION_LABEL = "Заказать бесплатный расчёт";
const PHONE_LABEL = "Позвонить";
const PHONE = "+74993901467";
const REQUEST_LABEL = "Оставить заявку";

const H2 = "text-2xl md:text-3xl font-bold";

const QUICK_LINKS = [
  {
    href: "/catalog/catalog/vvodno-raspredelitelnye-ustrojstva-vru-ip-31",
    label: "ВРУ IP31",
  },
  {
    href: "/catalog/catalog/vvodno-raspredelitelnye-ustrojstva-vru-napolnye",
    label: "Напольные шкафы",
  },
  {
    href: "/catalog/catalog/vvodno-raspredelitelnye-ustrojstva-vru-1-vvod",
    label: "ВРУ 1 ввод",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-1-18-89",
    name: "ВРУ-1-18-89 Вводно-распределительное устройство (In: 250 А, IP31, 2 ввода, со счётчиком, с АВР, УХЛ4)",
    objects:
      "Многоквартирные жилые дома (с числом этажей более пяти) и крупные общественные здания.",
    price: "110 000 руб.",
  },
  {
    sku: "vru-3-41-32А",
    name: "ВРУ-3-41 Вводно-распределительное устройство (In: 32 А, IP31, 1 ввод, УХЛ4)",
    objects:
      "Электроустановки жилых и общественных зданий с числом этажей не более пяти.",
    price: "50 000 руб.",
  },
  {
    sku: "vru21L-320-200-400А",
    name: "ВРУ21L-320-200 Вводно-распределительное устройство (In: 400 А, IP31, 1 ввод, со счётчиком, УХЛ4)",
    objects:
      "Административные и бытовые здания, промышленные предприятия, крупные торговые центры.",
    price: "95 000 руб.",
  },
  {
    sku: "vru-8505-4va-630А",
    name: "ВРУ-8505-4ВА-630 Вводно-распределительное устройство (In: 630А, IP31, 1 ввод, со счётчиком, УХЛ4)",
    objects:
      "Энергоёмкие промышленные предприятия, мощные распределительные узлы коммерческой недвижимости.",
    price: "50 000 руб.",
  },
  {
    sku: "vru-8504-4va-100А",
    name: "ВРУ-8504-4ВА-100 Вводно-распределительное устройство (In: 100А, IP31, 1 ввод, со счётчиком, УХЛ4)",
    objects:
      "Индивидуальные жилые дома, коттеджи и электроустановки малых зданий.",
    price: "50 000 руб.",
  },
];

const FAQ = [
  {
    q: "В каких системах заземления могут работать ваши ВРУ УХЛ4?",
    a: "Современные распределительные устройства серий ВРУ-1, ВРУ-3 и модульные ВРУ-21L спроектированы для интеграции в четырёх- и пятипроводные питающие сети напряжением 400/230 В с глухозаземлённой нейтралью. Они полностью поддерживают работу в современных системах заземления TN-S, TN-C и комбинированной TN-C-S, имея изолированную нулевую рабочую шину (N) и электрически соединённую с металлическим каркасом защитную шину (PE).",
  },
  {
    q: "Можно ли монтировать щиты УХЛ4 в сырых подвалах или на фасаде здания?",
    a: "Категорически нет. Индекс УХЛ4 ограничивает применение оборудования сухими отапливаемыми помещениями. Кроме того, стандартные вводные и распределительные панели данных серий имеют степень защиты IP31 со стороны фасада и боковых стенок, а со стороны дна — IP00 (для удобного нижнего ввода толстых силовых кабелей). Такая оболочка не защитит коммутационные аппараты от прямого попадания воды или обильного конденсата. Для улицы применяются герметичные решения исполнения У1 (IP54/IP65).",
  },
  {
    q: "От чего зависит выбор между однопанельным и многопанельным ВРУ?",
    a: "Выбор архитектуры узла регламентируется расчётной мощностью объекта и его категорией надёжности. Многопанельные ВРУ (состоящие из отдельных вводных (ПВ), распределительных (ПР) и панелей с АВР) применяются в многоквартирных домах свыше 5 этажей и крупных общественных зданиях. Однопанельные и шкафные решения, объединяющие блоки ввода, учёта и распределения в едином конструктиве, отлично подходят для малых коммерческих зданий, коттеджей и МКД до 5 этажей.",
  },
];

export function vruUkhl4Top() {
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
                Вводно-распределительные устройства ВРУ (климатическое
                исполнение УХЛ4)
              </h2>
              <p className="text-text/80 leading-relaxed">
                Климатическое исполнение <strong>ВРУ УХЛ4</strong> предназначено
                для эксплуатации в сухих, отапливаемых электрощитовых
                помещениях, а также подвалах без риска образования конденсата.
                Оборудование обеспечивает надёжный ввод, учёт и распределение
                электроэнергии в сетях 400/230 В переменного тока с
                глухозаземлённой нейтралью, защищая групповые и
                распределительные цепи жилых и общественных зданий от перегрузок
                и токов короткого замыкания (Icc). Каждый{" "}
                <strong>щит ВРУ исполнения УХЛ4</strong> отвечает строгим
                требованиям ПУЭ-7 и собирается с использованием надёжной сборной
                ошиновки.
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
                alt="Вводно-распределительные устройства ВРУ (климатическое исполнение УХЛ4)"
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

export function vruUkhl4Bottom() {
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
        <h2 className={H2}>Популярные модели ВРУ УХЛ4</h2>
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

      {/* Инженерный комментарий */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Инженерный комментарий</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Грамотно спроектированный <strong>УХЛ4 шкаф ВРУ</strong> гарантирует
          бесперебойную работу объекта и полную селективность срабатывания
          защитных аппаратов при авариях. Пришлите нам ваше техническое задание
          (ТЗ) или однолинейную схему, и наши проектировщики подберут
          оптимальную комплектацию.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Итоговая <strong>цена ВРУ УХЛ4</strong> напрямую зависит от выбранной
          элементной базы (от надёжных решений КЭАЗ и IEK до премиальных
          европейских и азиатских брендов, таких как CHINT), а также от сечения
          применяемой медной или алюминиевой ошиновки. Каждое изделие проходит
          строгий выходной контроль ОТК.
        </p>
      </section>

      {/* Расшифровка маркировки УХЛ4 */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Расшифровка маркировки УХЛ4</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Для точного понимания эксплуатационных ограничений приводим
          нормативную расшифровку аббревиатуры согласно ГОСТ 15150:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>У</strong> — оборудование предназначено для
            макроклиматического района с умеренным климатом.
          </li>
          <li>
            <strong>ХЛ</strong> — допускается эксплуатация в районах с холодным
            климатом.
          </li>
          <li>
            <strong>4</strong> — категория размещения: строго для эксплуатации в
            помещениях (объёмах) с искусственно регулируемыми климатическими
            условиями. Это закрытые, отапливаемые и вентилируемые электрощитовые
            без прямого воздействия солнечной радиации, ветра, атмосферных
            осадков и песка.
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
        <h2 className={H2}>Запросить расчёт стоимости ВРУ УХЛ4</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Оставьте заявку или позвоните — мы поможем подобрать конфигурацию под
          ваш объект и требования проекта.
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
