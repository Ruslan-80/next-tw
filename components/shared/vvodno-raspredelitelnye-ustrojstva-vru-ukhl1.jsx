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
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-ip-55",
    label: "ВРУ IP55",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-navesnye",
    label: "Навесные щиты",
  },
];

const MODELS_TABLE = [
  {
    sku: "vru-1-16-20a-400А",
    name: "ВРУ1-16-20А Вводно-распределительное устройство 400 А, IP66, 2 ввода, со счетчиком, УХЛ1",
    objects:
      "Открытые распределительные узлы промышленных предприятий, строительные площадки.",
    price: "105 000 руб.",
  },
  {
    sku: "vru-3-44-100А",
    name: "ВРУ-3-44 Вводно-распределительное устройство 100 А, IP55, 1 ввод, УХЛ1",
    objects:
      "Уличная установка на фасадах зданий, малые коммерческие павильоны, киоски.",
    price: "45 000 руб.",
  },
  {
    sku: "vru-8505-4va-100А-2000x450x450",
    name: "ВРУ-8505-4ВА-100 Вводно-распределительное устройство 100А IP55, 1 ввод, со счетчиком, УХЛ1",
    objects:
      "Объекты инфраструктуры, опоры освещения, открытые паркинги, логистические хабы.",
    price: "50 000 руб.",
  },
  {
    sku: "vru-8504-4r-400А-1800x450x450",
    name: "ВРУ-8504-4Р-400 Вводно-распределительное устройство 400А IP55, 1 ввод, со счетчиком, УХЛ1",
    objects:
      "Энергоёмкие уличные потребители, трансформаторные подстанции (КТП).",
    price: "50 000 руб.",
  },
  {
    sku: "vru-4-1600-422-1600А",
    name: "ВРУ-4-1600-422 Вводно-распределительное устройство 1600А IP65, 1 ввод, со счетчиком, УХЛ1",
    objects:
      "Вводы в индивидуальные жилые дома, загородные коттеджи (монтаж на трубостойке).",
    price: "50 000 руб.",
  },
];

const FAQ = [
  {
    q: "Можно ли монтировать ВРУ УХЛ1 под открытым небом без дополнительного навеса?",
    a: "Да. Индекс размещения «1» прямо указывает на возможность установки на открытом воздухе без навесов. Защиту коммутационной аппаратуры от воды и пыли обеспечивает оболочка шкафа со степенью защиты IP54 или IP65. Главное требование — грамотный подвод питающих кабелей через герметичные сальники (выполняется снизу).",
  },
  {
    q: "Требуется ли обогрев счетчика в уличном щите?",
    a: "Обязательно. Согласно ПУЭ-7, для корректной работы жидкокристаллических дисплеев электронных приборов коммерческого учёта при отрицательных температурах необходим местный подогрев. В наши уличные щиты УХЛ1 устанавливаются резистивные нагреватели с автоматическим термостатом, обеспечивающие рабочую температуру в отсеке учёта.",
  },
  {
    q: "Как обеспечивается селективность защиты в ваших уличных ВРУ?",
    a: "Мы подбираем номиналы (In) и время-токовые характеристики аппаратов отходящих линий в строгом соответствии с параметрами вводного автомата. Это гарантирует, что при коротком замыкании или перегрузке отключится только аварийная отходящая линия, а остальная часть объекта продолжит работу.",
  },
];

export function vruUkhl1Top() {
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
              <h1 className="text-text pb-4 text-2xl font-bold leading-tight lg:text-5xl">
                Вводно-распределительные устройства ВРУ (климатическое
                исполнение УХЛ1)
              </h1>
              <p className="text-text/80 leading-relaxed">
                Вводно-распределительные устройства климатического исполнения{" "}
                <strong>ВРУ УХЛ1</strong> разработаны для жёстких условий
                эксплуатации на открытом воздухе. Оборудование обеспечивает
                надёжный приём, учёт и распределение электроэнергии в сетях
                400/230 В с системами заземления TN-C, TN-S и TN-C-S, а также
                селективную защиту силовых линий от перегрузок и токов короткого
                замыкания (Icc). Каждый уличный{" "}
                <strong>щит ВРУ исполнения УХЛ1</strong> выполняется в
                герметичном антивандальном корпусе со степенью защиты оболочки
                не ниже IP54, что гарантирует бесперебойную работу
                коммутационных аппаратов при прямом воздействии дождя, снега и
                солнечной радиации.
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
                alt="Вводно-распределительные устройства ВРУ (климатическое исполнение УХЛ1)"
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

export function vruUkhl1Bottom() {
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
        <h2 className={H2}>Популярные модели ВРУ УХЛ1</h2>
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

      {/* Inzhenernyj kommentarij */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Инженерный комментарий</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Правильно спроектированный <strong>уличный шкаф ВРУ (УХЛ1)</strong> —
          это гарантия электробезопасности объекта. В уличных решениях мы
          применяем порошковую окраску, полиуретановый уплотнитель и жёсткую
          сборную ошиновку из меди или сертифицированного алюминия.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Для защиты коммерческого учёта при температурах до -50 °С обязательно
          монтируется система антиконденсатного обогрева. Итоговая{" "}
          <strong>цена на ВРУ УХЛ1</strong> всегда зависит от предоставленной
          однолинейной схемы и выбранной элементной базы (от базовых IEK и
          DEKraft до технологичных КЭАЗ и CHINT). Каждое изделие проходит
          строгий контроль ОТК с выдачей паспорта.
        </p>
      </section>

      {/* Rasshifrovka UHL1 */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className={H2}>Расшифровка маркировки УХЛ1</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Согласно ГОСТ 15150, маркировка УХЛ1 указывает на самые строгие
          эксплуатационные допуски:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>
            <strong>УХЛ</strong> — для макроклиматических районов с умеренным и
            холодным климатом (нижнее предельное значение температуры воздуха
            достигает минус 50 °С).
          </li>
          <li>
            <strong>1</strong> — категория размещения: допускается установка на
            открытом воздухе при прямом воздействии любых атмосферных факторов
            (атмосферные осадки, песок, пыль, ультрафиолет).
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
        <h2 className={H2}>Запросить расчёт стоимости ВРУ УХЛ1</h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Оставьте заявку или позвоните — мы подберём уличное решение с
          обогревом учёта и нужной степенью защиты под ваш проект.
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
