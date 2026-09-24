import Image from "next/image";
import Link from "next/link";
import Knopka from "../knopka";
import JsonLd from "@/components/JsonLdComponent";
import BlogCta from "@/components/BlogCta";

const H2 = "text-2xl md:text-3xl font-bold text-text mt-12 mb-6";
const P = "text-base md:text-lg text-text/80 leading-relaxed mb-4 text-justify";
const UL = "list-disc pl-6 space-y-3 text-base md:text-lg text-text/80 mb-8";
const LI_STRONG = "font-semibold text-text";
const REQUEST_LABEL = "Связаться с нами";

export const metadata = {
  title: "Схема подключения этажного щита ЩЭ 2026",
  date: "18 января 2026",
  description:
    "Расключение этажного щита серии ЩЭ. Руководство с пошаговой инструкцией, основные этапы монтажа, схема подключения и типичные ошибки при монтаже...",
  image: "/images/categories/SE24L.png",
  images: ["/images/categories/SE24L.png"],
  slug: "shit-etazhnyi-she",
  robots: {
    index: true,
    follow: true,
  },
};

export default function Blog() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://electroshit-pro.ru/blogs/shit-etazhnyi-she",
    },
    headline:
      "Щит этажный ЩЭ: расключение, монтаж и выбор — полное руководство 2026",
    description:
      "Щит этажный (ЩЭ) является критически важным элементом электроснабжения многоквартирных домов...",
    image: ["https://electroshit-pro.ru/images/categories/SE24L.png"],
    datePublished: "2026-01-18",
    dateModified: "2026-01-18",
    author: {
      "@type": "Person",
      name: "Алексей Шитов",
      url: "https://electroshit-pro.ru",
    },
    publisher: {
      "@type": "Organization",
      name: "ЭЛЕКТРОЩИТ-ПРО",
      logo: {
        "@type": "ImageObject",
        url: "https://electroshit-pro.ru/mainLogo.svg",
      },
    },
    articleSection: [
      "Что такое щит этажный ЩЭ",
      "Конструкция и устройство ЩЭ",
      "Виды этажных щитов по способу установки",
      "Технические характеристики ЩЭ",
      "Расключение этажного щита: пошаговая инструкция",
      "Схемы подключения этажных щитов",
      "Типичные ошибки при монтаже ЩЭ",
      "Техническое обслуживание и эксплуатация",
    ],
    wordCount: 1133,
  };

  const HowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Расключение этажного щита (ЩЭ) пошаговая инструкция",
    step: [
      {
        "@type": "HowToStep",
        name: "Этап 1: Разделение PEN проводника",
        text: "Критически важный этап — правильное разделение совмещенного PEN проводника на рабочий нуль N и защитное заземление PE. Главная заземляющая шина PE подключается к корпусу щита.",
      },
      {
        "@type": "HowToStep",
        name: "Этап 2: Установка модульного оборудования",
        text: "На DIN-рейки устанавливаются вводные автоматические выключатели, групповые автоматы и УЗО. Монтируются нулевые шины N (синяя) и защитные шины PE (желто-зеленая).",
      },
      {
        "@type": "HowToStep",
        name: "Этап 3: Выполнение внутренних соединений",
        text: "Фазные соединения между автоматами выполняются с помощью гребенок. Все PE проводники подключаются к шине заземления. Между УЗО и автоматами устанавливаются перемычки.",
      },
      {
        "@type": "HowToStep",
        name: "Этап 4: Подключение отходящих линий",
        text: "Кабели от каждой квартиры подключаются к соответствующим автоматам с обязательной маркировкой всех проводников. Многожильные провода обязательно опрессовываются наконечниками НШВИ для надежного контакта.",
      },
    ],
    supply: [
      {
        "@type": "HowToSupply",
        name: "Автоматические выключатели соответствующих номиналов",
      },
      {
        "@type": "HowToSupply",
        name: "УЗО и дифференциальные автоматы для защиты от утечек",
      },
      {
        "@type": "HowToSupply",
        name: "Соединительные гребенки (шинопроводы) для фазных соединений",
      },
      {
        "@type": "HowToSupply",
        name: "Провода ПуГВ для внутренних соединений сечением 6 мм²",
      },
      {
        "@type": "HowToSupply",
        name: "Наконечники НШВИ для опрессовки многожильных проводов",
      },
      {
        "@type": "HowToSupply",
        name: "Кабельные стяжки и маркировочные элементы",
      },
    ],
    tool: [
      { "@type": "HowToTool", name: "Крестовые и шлицевые отвертки" },
      {
        "@type": "HowToTool",
        name: "Кусачки, стрипперы для зачистки проводов",
      },
      {
        "@type": "HowToTool",
        name: "Пресс-клещи для опрессовки наконечников НШВИ",
      },
      {
        "@type": "HowToTool",
        name: "Мультиметр, указатель напряжения для проверок",
      },
      { "@type": "HowToTool", name: "Маркер для маркировки проводов и групп" },
    ],
  };

  return (
    <>
      <JsonLd data={blogJsonLd} script_name="blog-jsonld" />
      <JsonLd data={HowTo} script_name="howto-jsonld" />
      <div className="min-h-screen bg-background text-text">
        {/* Header/Navigation */}
        <section className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <ol className="hidden md:flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Главная
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-accent transition-colors"
                >
                  Статьи
                </Link>
              </li>
              <li>/</li>
              <li className="text-accent">{metadata.title}</li>
            </ol>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-metal animate-metal">
          <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <span>{metadata.date}</span>
                  <span>—</span>
                  <span>Алексей Шитов</span>
                </div>

                <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-text">
                  Щит этажный ЩЭ: расключение, монтаж и выбор - полное
                  руководство 2026 года
                </h1>

                <p className="text-lg lg:text-xl leading-relaxed text-text/80 text-justify">
                  <Link
                    href="/catalog/shity-etazhnye-she"
                    className="text-accent font-semibold hover:text-accent/80 transition-colors"
                  >
                    Щит этажный (ЩЭ)
                  </Link>{" "}
                  является критически важным элементом электроснабжения
                  многоквартирных домов, обеспечивающим безопасное распределение
                  электроэнергии между квартирами.
                </p>
                <p className="text-lg lg:text-xl leading-relaxed text-text/80 text-justify">
                  Правильное расключение, качественный монтаж и грамотный выбор
                  компонентов напрямую влияют на надежность и безопасность всей
                  электрической системы здания.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Knopka props="Получить консультацию" />
                  <Link
                    href={"/catalog/shity-etazhnye-she"}
                    className="inline-flex items-center rounded-md border-2 border-accent bg-transparent px-5 py-2.5 font-bold text-accent transition-colors hover:bg-accent/10"
                  >
                    Смотреть каталог
                  </Link>
                </div>
              </div>

              {/* Right Image/Video */}
              <div className="order-1 lg:order-2 relative h-96 lg:h-full lg:min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl rounded-2xl" />
                <video
                  src="/video/Box.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="relative w-full h-auto object-contain rounded-2xl hover:scale-105 transition-transform duration-500 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 py-10 lg:py-16">
          <div className="mx-auto max-w-4xl">
            <section>
              <h2 className={H2}>Что такое щит этажный ЩЭ</h2>
              <p className={P}>
                <Link
                  href="/catalog/shity-etazhnye-she"
                  className="text-accent font-semibold hover:text-accent/80"
                >
                  Щит этажный (ЩЭ)
                </Link>{" "}
                — металлический распределительный шкаф для приема, учета и
                распределения электроэнергии напряжением 380/220В между
                квартирами одного этажа. Устройство выполняет функции защиты от
                перегрузок и коротких замыканий, учета электропотребления и
                размещения слаботочных сетей.
              </p>

              <h3 className="text-xl font-bold text-text mb-4 mt-8">
                Основные функции этажного щита
              </h3>
              <ul className={UL}>
                <li>
                  Прием электроэнергии от питающего стояка без разрезания
                  магистрали
                </li>
                <li>
                  Распределение питания по квартирам этажа через индивидуальные
                  автоматы
                </li>
                <li>
                  Учет электропотребления однофазными счетчиками электроэнергии
                </li>
                <li>
                  Защита от аварийных ситуаций — КЗ, перегрузки, утечки тока на
                  землю
                </li>
                <li>
                  Размещение слаботочных сетей — интернет, домофон, ТВ, охранная
                  сигнализация
                </li>
              </ul>
            </section>

            <section className="pt-10 border-t border-border/40 mt-10">
              <h2 className={H2}>Конструкция и устройство ЩЭ</h2>
              <p className={P}>
                Современный этажный щит изготавливается из стали толщиной 1-1,2
                мм с антикоррозийным полимерно-порошковым покрытием серого цвета
                RAL 7035. Степень защиты корпуса IP31 обеспечивает защиту от
                твердых частиц размером более 2,5 мм и капель воды.
              </p>

              <h3 className="text-xl font-bold text-text mb-6 mt-8">
                Основные отсеки этажного щита
              </h3>
              <div className="grid gap-6">
                {[
                  {
                    title: "Вводно-учетный отсек",
                    items: [
                      "Размещение: электросчетчики и вводные автоматические выключатели",
                      "Оборудование: однофазные счетчики по количеству квартир",
                      "Особенности: прозрачные смотровые окна для снятия показаний без вскрытия щита",
                      "Защита: индивидуальные замки с уникальными ключами",
                    ],
                  },
                  {
                    title: "Распределительный отсек",
                    items: [
                      "Назначение: установка защитной и коммутационной аппаратуры",
                      "Оборудование: DIN-рейки для модульных автоматов, УЗО, дифавтоматов",
                      "Компоненты: нулевые шины N и защитные шины PE, соединительные перемычки",
                      "Безопасность: съемная фальш-панель для защиты от случайного прикосновения",
                    ],
                  },
                  {
                    title: "Слаботочный отсек",
                    items: [
                      "Назначение: размещение телефонного и интернет-оборудования",
                      "Конструкция: перфорированные планки для крепления кабелей и коробок",
                      "Применение: домофонные системы, видеонаблюдение, пожарная сигнализация",
                      "Разделение: изолирован от силового отсека специальными перегородками",
                    ],
                  },
                ].map((section, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent"
                  >
                    <h4 className="text-lg font-bold text-accent mb-4">
                      {section.title}
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-text/80 text-sm md:text-base">
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-10 border-t border-border/40 mt-10">
              <h2 className={H2}>Виды этажных щитов по способу установки</h2>
              <div className="grid gap-6">
                {[
                  {
                    title: "Встраиваемые щиты ЩЭ",
                    items: [
                      {
                        label: "Применение",
                        description: "для скрытой проводки в новостройках",
                      },
                      {
                        label: "Монтаж",
                        description:
                          "установка в специально подготовленные ниши в стенах",
                      },
                      {
                        label: "Преимущества",
                        description:
                          "эстетичный вид, экономия места в коридоре",
                      },
                      {
                        label: "Ограничения",
                        description: "запрещена установка в несущие стены",
                      },
                      {
                        label: "Размеры ниш",
                        description:
                          "стандартные 950 x 900 x 140 мм, возможны индивидуальные варианты",
                      },
                    ],
                  },
                  {
                    title: "Навесные (накладные) щиты ЩЭН",
                    items: [
                      {
                        label: "Применение",
                        description:
                          "для открытой проводки, при модернизации сетей",
                      },
                      {
                        label: "Монтаж",
                        description: "крепление к стене анкерными болтами",
                      },
                      {
                        label: "Преимущества",
                        description:
                          "простота установки, не требуется подготовка ниш",
                      },
                      {
                        label: "Недостатки",
                        description:
                          "выступают от стены, занимают больше места",
                      },
                    ],
                  },
                ].map((section, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent"
                  >
                    <h4 className="text-lg font-bold text-accent mb-4">
                      {section.title}
                    </h4>
                    <ul className="space-y-3 text-text/80 text-sm md:text-base">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-accent flex-shrink-0">✓</span>
                          <span>
                            <span className="font-semibold text-text">
                              {item.label}:
                            </span>{" "}
                            {item.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-10 border-t border-border/40 mt-10">
              <h2 className={H2}>Технические характеристики ЩЭ</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: "Основные параметры",
                    items: [
                      "Номинальное напряжение: 380/220В",
                      "Номинальный ток: до 100А на вводе, 50А на квартиру",
                      "Система заземления: TN-S, TN-C-S",
                      "Количество квартир: от 1 до 8 (стандартно 2-6)",
                    ],
                  },
                  {
                    title: "Требования ПУЭ",
                    items: [
                      "Расстояние от стояка: не более 3 м",
                      "Высота установки: от 0,4 до 2,0 м от пола",
                      "Управление: 0,7-1,9 м от пола",
                      "Измерительные приборы: 1,0-1,8 м от пола",
                    ],
                  },
                ].map((section, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent"
                  >
                    <h4 className="text-lg font-bold text-accent mb-4">
                      {section.title}
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-text/80 text-sm md:text-base">
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-10 border-t border-border/40 mt-10">
              <h2 className={H2}>
                Расключение этажного щита: пошаговая инструкция
              </h2>
              <p className={P}>
                Перед началом расключения необходимо полностью обесточить щит и
                убедиться в отсутствии напряжения. Составляется подробная схема
                подключения с указанием всех потребителей и их характеристик.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 dark:bg-amber-900/10 p-6">
                  <h4 className="text-lg font-bold text-amber-600 mb-4">
                    Необходимый инструмент
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-text/80 text-sm md:text-base">
                    <li>Крестовые и шлицевые отвертки</li>
                    <li>Кусачки, стрипперы для зачистки</li>
                    <li>Пресс-клещи (НШВИ)</li>
                    <li>Мультиметр, указатель напряжения</li>
                    <li>Маркер для маркировки</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-green-200 bg-green-50/50 dark:bg-green-900/10 p-6">
                  <h4 className="text-lg font-bold text-green-600 mb-4">
                    Материалы для монтажа
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-text/80 text-sm md:text-base">
                    <li>Автоматические выключатели, УЗО</li>
                    <li>Соединительные гребенки</li>
                    <li>Провода ПуГВ сечением 6 мм²</li>
                    <li>Наконечники НШВИ</li>
                    <li>Кабельные стяжки</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold text-text mb-6 mt-8">
                Основные этапы расключения
              </h3>
              <ol className="list-decimal pl-5 space-y-6 text-text/80 text-base md:text-lg">
                <li>
                  <span className="font-bold text-accent">
                    Этап 1: Разделение PEN проводника
                  </span>
                  <p className="mt-2 text-sm md:text-base text-justify">
                    Критически важный этап — правильное разделение совмещенного
                    PEN проводника на рабочий нуль N и защитное заземление PE.
                    Сечение нулевого проводника стояка должно быть не менее 16
                    мм² для алюминия или 10 мм² для меди. Устанавливаются
                    отдельные сжимы типа "орех" для N и PE проводников на
                    магистральном стояке. Главная заземляющая шина PE
                    подключается к корпусу щита отдельным проводником.
                  </p>
                </li>
                <li>
                  <span className="font-bold text-accent">
                    Этап 2: Установка модульного оборудования
                  </span>
                  <p className="mt-2 text-sm md:text-base text-justify">
                    На DIN-рейки устанавливаются вводные автоматические
                    выключатели для каждой квартиры, обычно двухполюсные на 50А.
                    Монтируются групповые автоматы и УЗО согласно разработанной
                    схеме распределения нагрузок. Нулевые шины N и защитные шины
                    PE устанавливаются с соответствующей цветовой маркировкой.
                  </p>
                </li>
                <li>
                  <span className="font-bold text-accent">
                    Этап 3: Выполнение внутренних соединений
                  </span>
                  <p className="mt-2 text-sm md:text-base text-justify">
                    Фазные соединения между автоматами выполняются с помощью
                    соединительных гребенок (шинопроводов). Это обеспечивает
                    надежный контакт и аккуратный внешний вид сборки. Все PE
                    проводники подключаются к общей шине заземления.
                  </p>
                </li>
                <li>
                  <span className="font-bold text-accent">
                    Этап 4: Подключение отходящих линий
                  </span>
                  <div className="mt-2 text-sm md:text-base text-justify">
                    Кабели от каждой квартиры подключаются к соответствующим
                    автоматам с обязательной маркировкой всех проводников:
                    <ul className="list-disc pl-5 mt-2 mb-2 space-y-1">
                      <li>Фазные: L1, L2, L3 (коричневый, черный, серый)</li>
                      <li>Нулевой рабочий: N (синий)</li>
                      <li>Защитный: PE (желто-зеленый)</li>
                    </ul>
                    Многожильные провода обязательно опрессовываются
                    наконечниками НШВИ.
                  </div>
                </li>
              </ol>
            </section>

            <section className="pt-10 border-t border-border/40 mt-10">
              <h2 className={H2}>Схемы подключения этажных щитов</h2>
              <div className="grid gap-6">
                <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent">
                  <h3 className="text-lg font-bold text-accent mb-4">
                    Однофазная схема подключения
                  </h3>
                  <p className="text-text/80 text-sm md:text-base mb-4">
                    В однофазной схеме от стояка приходит один фазный провод,
                    нулевой рабочий и защитный проводники. После вводного
                    двухполюсного автомата устанавливается счетчик
                    электроэнергии, затем УЗО на 30мА для защиты от утечек тока.
                  </p>
                  <div className="bg-accent/10 p-4 rounded-lg font-mono text-sm">
                    <span className="text-accent font-semibold">Цепь:</span>{" "}
                    Стояк → Вводный автомат → Счётчик → УЗО → Групповые автоматы
                    → Квартира
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent">
                  <h3 className="text-lg font-bold text-accent mb-4">
                    Трехфазная схема подключения
                  </h3>
                  <p className="text-text/80 text-sm md:text-base">
                    При трехфазном питании от стояка приходят три фазы, нулевой
                    рабочий и защитный проводники. Устанавливается трехполюсный
                    вводный автомат и трехфазный счетчик электроэнергии.
                    Нагрузки равномерно распределяются по трем фазам. Мощные
                    потребители типа электроплит могут подключаться трехфазно.
                  </p>
                </div>
              </div>
            </section>

            <section className="pt-10 border-t border-border/40 mt-10">
              <h2 className={H2}>Типичные ошибки при монтаже ЩЭ</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Ошибки выбора оборудования",
                    desc: "Использование некачественных автоматических выключателей дешевых брендов приводит к ненадежной защите. Неправильный расчет номиналов может привести к ложным срабатываниям.",
                  },
                  {
                    title: "Ошибки монтажа",
                    desc: "Подключение разносечных проводов в одну клемму категорически запрещено. Отсутствие опрессовки многожильных проводников наконечниками приводит к ухудшению контакта.",
                  },
                  {
                    title: "Ошибки в расключении",
                    desc: "Подключение нулей от разных УЗО в одну общую шину приводит к ложным срабатываниям защиты. Неправильное разделение PEN проводника может привести к появлению опасного потенциала на корпусах.",
                  },
                ].map((err, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-destructive bg-destructive/5 p-4 rounded-r-lg"
                  >
                    <h4 className="text-base font-bold text-destructive mb-2">
                      {err.title}
                    </h4>
                    <p className="text-sm md:text-base text-text/80">
                      {err.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-10 border-t border-border/40 mt-10">
              <h2 className={H2}>Заключение</h2>
              <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
                <p className={P}>
                  Этажный щит ЩЭ является критически важным элементом системы
                  электроснабжения, требующим профессионального подхода к
                  проектированию, монтажу и эксплуатации. Правильное расключение
                  с соблюдением всех технических требований обеспечивает
                  безопасную и надежную работу электроустановки.
                </p>
                <p className="text-base md:text-lg font-semibold text-accent leading-relaxed text-justify mt-4">
                  Экономия на качестве оборудования и квалификации монтажников
                  недопустима, так как может привести к серьезным аварийным
                  ситуациям. Инвестиции в качественный этажный щит и
                  профессиональный монтаж окупаются безопасностью эксплуатации и
                  долговечностью.
                </p>
              </div>
            </section>

            {/* CTA Block at the end of article */}
            <section className="my-16 space-y-4 rounded-2xl border border-accent bg-card p-6 md:p-10 shadow-lg text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-text">
                Нужна консультация?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Свяжитесь с нашими специалистами для получения профессиональной
                консультации по выбору и монтажу этажных щитов.
              </p>
              <div className="pt-4 flex justify-center">
                <BlogCta
                  title="Сомневаетесь в корректности вашей проектной документации?"
                  description="Загрузите вашу однолинейную схему (PDF/AutoCAD) в форму ниже. Наши инженеры-проектировщики бесплатно проведут аудит ТЗ..."
                  buttonText="Прикрепить схему для аудита"
                  modalTitle="Загрузить схему на аудит"
                />
              </div>
            </section>

            {/* References */}
            <div className="mt-16 pt-8 border-t border-border/40">
              <h3 className="text-xl font-bold text-text mb-6">
                Список литературы
              </h3>
              <ol className="list-decimal pl-5 space-y-3 text-sm md:text-base text-muted-foreground">
                <li>
                  Головщиков В. О., Алтухов И. В., Епифанов А. Д. Монтаж
                  электрооборудования и средств автоматизации: учеб.
                </li>
                <li>
                  Беляков Г. Электробезопасность. Учебное пособие для
                  академического бакалавриата.
                </li>
                <li>
                  Костин В. Н., Сериков В. А. АКТУАЛЬНЫЕ АСПЕКТЫ
                  ЭЛЕКТРОСНАБЖЕНИЯ
                </li>
                <li>Филонова М. И., Савченко А. Л. д. т. н., проф. – 2012.</li>
              </ol>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
