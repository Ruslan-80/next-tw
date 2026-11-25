import Image from "next/image";
import Link from "next/link";
import Knopka from "../knopka";
import JsonLd from "@/components/JsonLdComponent";

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
        name: "Провода ПуГВ для внутренних соединений сечением 6 мм²",
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
      {
        "@type": "HowToTool",
        name: "Маркер для маркировки проводов и групп",
      },
    ],
  };
  return (
    <>
      <JsonLd data={blogJsonLd} script_name="blog-jsonld" />
      <JsonLd data={HowTo} script_name="howto-jsonld" />
      <div className="min-h-screen bg-background text-foreground">
        {/* Header/Navigation */}
        <section className="sticky top-0 z-50 border-b border-text bg-background backdrop-blur supports-[backdrop-filter]:bg-background">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <ol className="hidden md:flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Главная
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-blue-600 transition-colors"
                >
                  Статьи
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-blue-600">{metadata.title}</li>
            </ol>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="">
          <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="order-2 lg:order-1 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="text-gray-600 text-sm lg:text-xl">
                    {metadata.date} — Алексей Шитов
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-light tracking-tighter leading-tight mb-8">
                  Щит этажный ЩЭ: расключение, монтаж и выбор - полное
                  руководство 2026 года
                </h1>
                {/* <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-8 text-balance">
                  Щит этажный ЩЭ: расключение, монтаж и выбор - полное
                  руководство 2026 года
                </h1> */}

                <p className="text-xl lg:text-2xl leading-relaxed mb-8 text-justify">
                  <Link
                    href="/catalog/shity-etazhnye-she"
                    className="text-accent font-semibold hover:text-accenthover transition-colors"
                  >
                    Щит этажный (ЩЭ)
                  </Link>{" "}
                  является критически важным элементом электроснабжения
                  многоквартирных домов, обеспечивающим безопасное распределение
                  электроэнергии между квартирами.
                </p>
                <p className="text-xl lg:text-2xl leading-relaxed mb-16 text-justify">
                  Правильное расключение, качественный монтаж и грамотный выбор
                  компонентов напрямую влияют на надежность и безопасность всей
                  электрической системы здания.
                </p>

                <div className="flex gap-4">
                  {/* <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-xl">
                    Получить консультацию
                  </button> */}
                  <Knopka props="Получить консультацию" />
                  <Link
                    href={"/catalog/shity-etazhnye-she"}
                    // className="px-4 lg:px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors text-xl"
                    className="card-machined"
                  >
                    Смотреть каталог
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="order-1 lg:order-2 relative h-96 lg:h-full lg:min-h-100">
                <div className="absolute inset-0 bg-linear-to-br from-blue-200/30 via-transparent to-gray-100 rounded-2xl" />
                <video
                  src="/video/Box.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto object-contain rounded-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-6 lg:py-12">
          <div>
            <div className="max-w-5xl mx-auto space-y-16 px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              {/* Section 1 */}
              <section>
                <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-accent">
                  Что такое щит этажный ЩЭ
                </h2>
                <p className="text-2xl leading-relaxed mb-8 text-justify">
                  <Link
                    href="/catalog/shity-etazhnye-she"
                    className="text-accent font-semibold hover:text-accenthover"
                  >
                    Щит этажный (ЩЭ)
                  </Link>{" "}
                  — металлический распределительный шкаф для приема, учета и
                  распределения электроэнергии напряжением 380/220В между
                  квартирами одного этажа. Устройство выполняет функции защиты
                  от перегрузок и коротких замыканий, учета электропотребления и
                  размещения слаботочных сетей.
                </p>

                <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-accent">
                  Основные функции этажного щита
                </h3>
                <ul className="space-y-4 pl-4">
                  {[
                    "Прием электроэнергии от питающего стояка без разрезания магистрали",
                    "Распределение питания по квартирам этажа через индивидуальные автоматы",
                    "Учет электропотребления однофазными счетчиками электроэнергии",
                    "Защита от аварийных ситуаций — КЗ, перегрузки, утечки тока на землю",
                    "Размещение слаботочных сетей — интернет, домофон, ТВ, охранная сигнализация",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-2xl leading-relaxed">
                      <span className="text-accent font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 2 */}
              <section className="pt-8 border-t border-accent">
                <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                  Конструкция и устройство ЩЭ
                </h2>

                <p className="text-2xl leading-relaxed mb-8 text-justify">
                  Современный этажный щит изготавливается из стали толщиной
                  1-1,2 мм с антикоррозийным полимерно-порошковым покрытием
                  серого цвета RAL 7035. Степень защиты корпуса IP31
                  обеспечивает защиту от твердых частиц размером более 2,5 мм и
                  капель воды.
                </p>

                <h3 className="text-3xl font-semibold mb-8 text-accent">
                  Основные отсеки этажного щита
                </h3>
                <p className="text-2xl leading-relaxed max-w-prose mb-4">
                  Современный этажный щит состоит из трех основных отсеков:
                </p>

                <div className="space-y-8">
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
                      className="bg-card border border-accent rounded-lg p-8 hover:border-accenthover transition-colors"
                    >
                      <h4 className="text-2xl font-semibold mb-6 text-accent">
                        {section.title}
                      </h4>
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-xl flex gap-3">
                            <span className="text-accent shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
              {/* Виды этажных щитов по способу установки */}
              <section className="pt-8 border-t border-accent">
                <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-accent">
                  Виды этажных щитов по способу установки
                </h2>

                <div className="space-y-8">
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
                      className="bg-card border border-accent/40 rounded-lg p-8 hover:border-accent transition-colors"
                    >
                      <h3 className="text-2xl font-semibold mb-6 text-accent">
                        {section.title}
                      </h3>
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <li className="text-sm lg:text-xl flex gap-3" key={i}>
                            <span className="text-accent shrink-0">✓</span>
                            <span className="font-medium">
                              {item.label}:
                            </span>{" "}
                            {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
              {/* Технические характеристики ЩЭ */}
              <section className="mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                  Технические характеристики ЩЭ
                </h2>
                <div className="space-y-8">
                  {[
                    {
                      title: "Основные параметры",
                      items: [
                        "Номинальное напряжение: 380/220В переменного тока частотой 50 Гц",
                        "Номинальный ток: до 100А на вводе, 50А на квартиру",
                        "Система заземления: TN-S, TN-C-S с глухозаземленной нейтралью",
                        "Количество квартир: от 1 до 8 квартир (стандартно 2-6)",
                        "Гарантийный срок: не менее 2 лет",
                      ],
                    },
                    {
                      title: "Условия эксплуатации",
                      items: [
                        "Температура: от +1°C до +35°C",
                        "Влажность: до 80% при температуре +25°C",
                        "Высота над уровнем моря: до 1000 м",
                        "Исключается: токопроводящая пыль, агрессивные пары и газы",
                      ],
                    },
                    {
                      title: "Требования ПУЭ к установке",
                      items: [
                        "Расстояние от стояка: не более 3 м по длине проводки",
                        "Высота установки: от 0,4 до 2,0 м от пола",
                        "Высота органов управления: 0,7-1,9 м от пола",
                        "Высота измерительных приборов: 1,0-1,8 м от пола",
                      ],
                    },
                  ].map((section, idx) => (
                    <div
                      key={idx}
                      className="bg-card border border-accent/40 rounded-lg p-4 lg:p-8 hover:border-accent transition-colors"
                    >
                      <h3 className="text-2xl font-semibold mb-6 text-accent">
                        {section.title}
                      </h3>
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-xl flex gap-3">
                            <span className="text-accent shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
              {/* Расключение этажного щита: пошаговая инструкция */}
              <section className="mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                  Расключение этажного щита: пошаговая инструкция
                </h2>

                <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-accent">
                  Подготовительные работы
                </h3>
                <p className="mb-8 text-xl lg:text-2xl leading-relaxed text-justify">
                  Перед началом расключения необходимо полностью обесточить щит
                  и убедиться в отсутствии напряжения. Составляется подробная
                  схема подключения с указанием всех потребителей и их
                  характеристик.
                </p>

                <div className="grid grid-cols-1 gap-6 mb-6  ">
                  <div className="p-8 border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="text-2xl font-medium text-accent mb-8">
                      Необходимый инструмент
                    </h4>
                    <ul className="text-xl lg:text-2xl list-disc list-inside space-y-1 pl-4 mb-8">
                      <li>Крестовые и шлицевые отвертки различных размеров</li>
                      <li>Кусачки, стрипперы для зачистки проводов</li>
                      <li>Пресс-клещи для опрессовки наконечников НШВИ</li>
                      <li>Мультиметр, указатель напряжения для проверок</li>
                      <li>Маркер для маркировки проводов и групп </li>
                    </ul>
                  </div>

                  <div className="p-8 border border-green-300 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <h4 className="text-2xl font-medium text-accent mb-8">
                      Материалы для монтажа
                    </h4>
                    <ul className="text-xl lg:text-2xl list-disc list-inside space-y-1 pl-4 mb-8">
                      <li>
                        Автоматические выключатели соответствующих номиналов
                      </li>
                      <li>
                        УЗО и дифференциальные автоматы для защиты от утечек{" "}
                      </li>
                      <li>
                        Соединительные гребенки (шинопроводы) для фазных
                        соединений
                      </li>
                      <li>
                        Провода ПуГВ для внутренних соединений сечением 6 мм²{" "}
                      </li>
                      <li>
                        Наконечники НШВИ для опрессовки многожильных проводов{" "}
                      </li>
                      <li>Кабельные стяжки и маркировочные элементы </li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-semibold text-accent mb-8 mt-8">
                  Основные этапы расключения
                </h3>
                <ol className="text-2xl leading-relaxed list-inside space-y-4 lg:pl-4 mt-8 mb-8">
                  <li>
                    <span className="font-medium text-accent mt-8 mb-8">
                      Этап 1: Разделение PEN проводника
                    </span>
                    <p className="text-xl lg:text-2xl mb-8 mt-4 text-justify">
                      Критически важный этап — правильное разделение
                      совмещенного PEN проводника на рабочий нуль N и защитное
                      заземление PE. Сечение нулевого проводника стояка должно
                      быть не менее 16 мм² для алюминия или 10 мм² для меди.
                      Устанавливаются отдельные сжимы типа "орех" для N и PE
                      проводников на магистральном стояке. Главная заземляющая
                      шина PE подключается к корпусу щита отдельным проводником
                      соответствующего сечения.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium text-accent">
                      Этап 2: Установка модульного оборудования
                    </span>
                    <p className="text-xl lg:text-2xl mb-8 mt-4 text-justify">
                      На DIN-рейки устанавливаются вводные автоматические
                      выключатели для каждой квартиры, обычно двухполюсные на
                      50А. Монтируются групповые автоматы и УЗО согласно
                      разработанной схеме распределения нагрузок. Нулевые шины N
                      и защитные шины PE устанавливаются с соответствующей
                      цветовой маркировкой — синей для нуля и желто-зеленой для
                      заземления.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium text-accent">
                      Этап 3: Выполнение внутренних соединений
                    </span>
                    <p className="text-xl lg:text-2xl mb-8 mt-4 text-justify">
                      Фазные соединения между автоматами выполняются с помощью
                      соединительных гребенок (шинопроводов). Это обеспечивает
                      надежный контакт и аккуратный внешний вид сборки. Все PE
                      проводники подключаются к общей шине заземления. Сечение
                      защитного проводника должно соответствовать фазному до 16
                      мм². Между УЗО и групповыми автоматами устанавливаются
                      соединительные перемычки.
                    </p>
                  </li>
                  <li>
                    <span className="font-medium text-accent">
                      Этап 4: Подключение отходящих линий
                    </span>
                    <div className="text-xl lg:text-2xl mb-8 mt-4 text-justify">
                      Кабели от каждой квартиры подключаются к соответствующим
                      автоматам с обязательной маркировкой всех проводников:
                      <ul className="list-disc list-inside space-y-1 pl-6 mt-4 mb-8">
                        <li>Фазные: L1, L2, L3 (коричневый, черный, серый)</li>
                        <li>Нулевой рабочий: N (синий)</li>
                        <li>Защитный: PE (желто-зеленый)</li>
                      </ul>
                      Многожильные провода обязательно опрессовываются
                      наконечниками НШВИ. Это предотвращает распушивание жил и
                      обеспечивает надежный контакт.
                    </div>
                  </li>
                </ol>
              </section>
              {/* Схемы подключения этажных щитов */}
              <section className="mb-10">
                <h2 className="lg:text-4xl text-3xl font-bold mb-8 text-accent">
                  Схемы подключения этажных щитов
                </h2>

                <div className="space-y-8">
                  <div className="bg-card border border-accent/40 rounded-lg p-4 lg:p-8 hover:border-accent transition-colors">
                    <h3 className="text-2xl font-semibold mb-6 text-accent">
                      Однофазная схема подключения
                    </h3>
                    <p className="text-xl lg:text-2xl leading-relaxed mb-8">
                      В однофазной схеме от стояка приходит один фазный провод,
                      нулевой рабочий и защитный проводники. После вводного
                      двухполюсного автомата устанавливается счетчик
                      электроэнергии, затем УЗО на 30мА для защиты от утечек
                      тока.
                    </p>
                    <p className="font-mono p-4 rounded-lg text-xl">
                      <span className="text-accent">Схема подключения: </span>{" "}
                      <br />
                      <span>
                        Стояк → Вводный автомат → Счётчик → УЗО → Групповые
                        автоматы → Квартира
                      </span>
                    </p>
                  </div>

                  <div className="bg-card border border-accent/40 rounded-lg p-4 lg:p-8 hover:border-accent transition-colors">
                    <h3 className="text-2xl font-semibold mb-6 text-accent">
                      Трехфазная схема подключения
                    </h3>
                    <p className="text-xl lg:text-2xl leading-relaxed mb-8">
                      При трехфазном питании от стояка приходят три фазы,
                      нулевой рабочий и защитный проводники. Устанавливается
                      трехполюсный вводный автомат и трехфазный счетчик
                      электроэнергии.
                    </p>
                    <p className="text-xl lg:text-2xl leading-relaxed mb-8">
                      Нагрузки равномерно распределяются по трем фазам — каждая
                      квартира получает одну фазу напряжением 220В. Мощные
                      потребители типа электроплит могут подключаться трехфазно.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="pt-8 border-t border-accent">
                <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                  Типичные ошибки при монтаже ЩЭ
                </h2>

                <div className="space-y-6">
                  <div className="border-l-4 border-error/40 hover:border-error hover:bg-card transition-colors p-6 rounded-r-lg">
                    <h3 className="text-2xl font-semibold mb-3 text-error">
                      Ошибки выбора оборудования
                    </h3>
                    <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300 mb-6 text-xl leading-relaxed">
                      <li>
                        Использование некачественных автоматических выключателей
                        дешевых брендов приводит к ненадежной защите и
                        возможному залипанию контактов.
                      </li>
                      <li>
                        Неправильный расчет номиналов может привести к ложным
                        срабатываниям или отказу в работе при аварийных режимах.
                      </li>
                    </ul>
                    {/* <p className="text-xl text-gray-700 leading-relaxed">
                      Использование некачественных автоматических выключателей
                      дешевых брендов приводит к ненадежной защите и возможному
                      залипанию контактов. Неправильный расчет номиналов может
                      привести к ложным срабатываниям или отказу в работе при
                      аварийных режимах.
                    </p> */}
                  </div>
                  <div className="border-l-4 border-error/40 hover:border-error hover:bg-card transition-colors p-6 rounded-r-lg">
                    <h3 className="text-2xl font-semibold mb-3 text-error">
                      Ошибки монтажа
                    </h3>
                    <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300 mb-6 text-xl leading-relaxed">
                      <li>
                        <span className="font-medium">
                          Подключение разносечных проводов в одну клемму
                        </span>{" "}
                        категорически запрещено. Попадание изоляции в зажимы
                        контактов нарушает надежность соединения.{" "}
                      </li>
                      <li>
                        <span className="font-medium">
                          Отсутствие опрессовки многожильных проводников
                        </span>{" "}
                        наконечниками приводит к распушиванию жил и ухудшению
                        контакта.{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-error/40 hover:border-error hover:bg-card transition-colors p-6 rounded-r-lg">
                    <h3 className="text-2xl font-semibold mb-3 text-error">
                      Ошибки в расключении
                    </h3>
                    <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300 mb-6 text-xl leading-relaxed">
                      <li>
                        <span className="font-medium">
                          Подключение нулей от разных УЗО в одну общую шину
                        </span>{" "}
                        приводит к ложным срабатываниям защиты. Путаница в
                        цветовой маркировке проводов создает опасность при
                        обслуживании.{" "}
                      </li>
                      <li>
                        <span className="font-medium">
                          Неправильное разделение PEN проводника
                        </span>{" "}
                        может привести к появлению опасного потенциала на
                        корпусах оборудования.{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section className="pt-8 border-t border-accent">
                <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-accent">
                  Техническое обслуживание
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="border border-success/40 hover:border-success hover:bg-card transition-colors rounded-lg p-8">
                    <h3 className="text-2xl font-semibold mb-6 text-success">
                      Периодичность осмотров
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Ежемесячно: осмотр, проверка нагрева корпусов автоматов",
                        `Ежеквартально: работы УЗО кнопкой "ТЕСТ"`,
                        "Ежегодно: измерение сопротивления изоляции, проверка заземления",
                        "По необходимости: подтяжка контактных соединений после 3-4 недель эксплуатации",
                      ].map((item, i) => (
                        <li key={i} className="text-xl">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-ring/40 hover:border-ring hover:bg-card transition-colors rounded-lg p-8">
                    <h3 className="text-2xl font-semibold mb-6 text-ring">
                      Признаки неисправности
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Нагрев корпусов автоматических выключателей",
                        "Запах гари или оплавленной изоляции",
                        "Искрение в контактных соединениях",
                        "Ложные срабатывания защитных устройств",
                        `Отсутствие срабатывания УЗО при нажатии кнопки "ТЕСТ"`,
                      ].map((item, i) => (
                        <li key={i} className="text-xl">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
              {/* Стоимость и выбор поставщика */}
              <section className="mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                  Стоимость и выбор поставщика
                </h2>
                <h3 className="text-3xl font-semibold mb-8 text-accent">
                  Ценовые категории
                </h3>
                <p className="mb-4 text-xl lg:text-2xl leading-relaxed">
                  В нашем магазине вы сможете приобрести как полноценные щиты
                  этажные, так и накладки на щиты щэ:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4 mb-8 text-xl leading-relaxed">
                  <li>
                    <span className="font-medium">
                      Бюджетные решения (от 4000 руб.):
                    </span>{" "}
                    Накладки щитов этажных ЩЭ
                  </li>
                  <li>
                    <span className="font-medium">
                      Более дорогой сегмент (от 6000 руб.):
                    </span>{" "}
                    Щиты этажные типа ЩЭ
                  </li>
                </ul>

                <h3 className="text-3xl font-semibold mb-8 text-accent">
                  Факторы ценообразования
                </h3>
                <ul className="list-disc list-inside space-y-2 pl-4 text-xl leading-relaxed ">
                  <li>
                    Количество квартир и соответственно объем оборудования
                  </li>
                  <li>Бренд и качество используемых компонентов </li>
                  <li>Сложность электрической схемы подключения</li>
                  <li>
                    Дополнительные опции — антивандальность, нестандартные
                    размеры{" "}
                  </li>
                  <li>
                    Региональные особенности ценообразования на монтажные работы
                  </li>
                </ul>
              </section>

              {/* Conclusion */}

              <section className="pt-12 border-t border-accent text-justify">
                <h2 className="text-2xl lg:text-4xl font-bold mb-8 text-accent">
                  Заключение
                </h2>
                <div className="border border-primaryLight/40 hover:border-primaryLight hover:bg-card transition-colors rounded-lg p-4 lg:p-8">
                  <p className="text-xl lg:text-2xl leading-relaxed mb-8">
                    Этажный щит ЩЭ является критически важным элементом системы
                    электроснабжения, требующим профессионального подхода к
                    проектированию, монтажу и эксплуатации. Правильное
                    расключение с соблюдением всех технических требований
                    обеспечивает безопасную и надежную работу электроустановки
                    на протяжении всего срока службы.
                  </p>
                  <p className="text-xl lg:text-2xl font-semibold text-primaryLight leading-relaxed">
                    Экономия на качестве оборудования и квалификации монтажников
                    недопустима, так как может привести к серьезным аварийным
                    ситуациям. Инвестиции в качественный этажный щит и
                    профессиональный монтаж окупаются безопасностью эксплуатации
                    и долговечностью оборудования.
                  </p>
                </div>
              </section>
              <section className="lg:pt-12 border-t border-accent text-justify">
                <h2 className="lg:text-4xl text-2xl font-bold mb-8 text-accent">
                  Список литературы:
                </h2>

                <div className="border border-accent/40 hover:border-accent hover:bg-card transition-colors rounded-lg lg:p-8">
                  <ul className="list-decimal space-y-2 py-4 px-8 lg:pl-12 text-xl leading-relaxed ">
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
                    <li>
                      Филонова М. И., Савченко А. Л. д. т. н., проф. – 2012.
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 lg:px-8 py-10 lg:py-16 text-center">
          <h2 className="lg:text-4xl text-3xl font-bold mb-8 text-accent">
            Нужна консультация?
          </h2>
          <p className="text-2xl text-accent mb-8 max-w-2xl mx-auto">
            Свяжитесь с нашими специалистами для получения профессиональной
            консультации по выбору и монтажу щитов
          </p>
          <Knopka props="Связаться с нами" />
        </section>
      </div>
    </>
  );
}
