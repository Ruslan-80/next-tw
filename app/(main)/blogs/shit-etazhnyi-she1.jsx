import Image from "next/image";
import Link from "next/link";
import Knopka from "../knopka";
import JsonLd from "@/components/JsonLdComponent";

export const metadata = {
  title: "Схема подключения этажного щита ЩЭ 2025",
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
      name: "ElectroShit Pro",
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
      <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
        {/* Хлебные крошки — стали мельче и изящнее */}
        <section className="sticky top-0 z-50 border-b border-gray-200 bg-gray-100/95 backdrop-blur supports-[backdrop-filter]:bg-gray-100/60">
          <nav className="container mx-auto px-6 py-2">
            <ol className="flex items-center gap-2 text-sm text-slate-400 font-light">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Главная
                </Link>
              </li>
              <span>/</span>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-blue-600 transition-colors"
                >
                  Статьи
                </Link>
              </li>
              <span>/</span>
              <li className="text-slate-600 truncate max-w-[200px] md:max-w-none">
                Щит этажный ЩЭ
              </li>
            </ol>
          </nav>
        </section>

        {/* Hero Section — Упор на типографику и воздух */}
        <header className="container mx-auto px-6 pt-12 pb-24 lg:pb-32">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="space-y-2 mb-8">
                <span className="text-blue-600 font-medium tracking-widest uppercase text-xs">
                  Руководство 2026
                </span>
                <p className="text-slate-400 text-sm">
                  {metadata.date} — Алексей Шитов
                </p>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-3xl font-light tracking-tighter leading-[1.1] text-slate-900 mb-8">
                Щит этажный ЩЭ:{" "}
                <span className="font-medium">расключение, монтаж и выбор</span>
              </h1>

              <p className="text-base md:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl font-light">
                Критически важный элемент электроснабжения многоквартирных
                домов. Узнайте, как обеспечить надежность и безопасность системы
                через правильный монтаж.
              </p>

              <div className="flex flex-wrap gap-4">
                <Knopka props="Получить консультацию" />
                <Link
                  href="/catalog/shity-etazhnye-she"
                  className="px-8 py-3.5 border border-slate-200 text-slate-900 hover:bg-slate-50 font-medium rounded-full transition-all text-sm uppercase tracking-wider"
                >
                  Каталог ЩЭ
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-blue-50/50 rounded-[2rem] -z-10 group-hover:bg-blue-100/50 transition-colors duration-500" />
              <video
                src="/video/Box.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-contain rounded-2xl shadow-2xl shadow-blue-900/10"
              />
            </div>
          </div>
        </header>

        {/* Контентная часть */}
        <main className="bg-slate-50/50 py-24 border-y border-slate-100">
          <div className="max-w-[800px] mx-auto px-6">
            {/* Секция 1: Что такое ЩЭ */}
            <article className="prose prose-slate max-w-none">
              <h2 className="text-2xl md:text-2xl font-medium tracking-tight text-slate-900 mb-8">
                Что такое щит этажный ЩЭ
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-8 font-light">
                <Link
                  href="/catalog/shity-etazhnye-she"
                  className="text-blue-600 decoration-blue-200 underline-offset-4 hover:underline"
                >
                  Щит этажный (ЩЭ)
                </Link>{" "}
                — это не просто коробка, а высокотехнологичный металлический
                распределительный шкаф. Он отвечает за прием и учет
                электроэнергии 380/220В.
              </p>

              <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm mb-16">
                <h3 className="text-lg font-medium text-slate-900 mb-6">
                  Ключевые функции системы
                </h3>
                <ul className="space-y-4">
                  {[
                    "Распределение питания по квартирам через автоматы",
                    "Точный учет потребления однофазными счетчиками",
                    "Многоуровневая защита от КЗ и утечек тока",
                    "Изолированные отсеки для слаботочных сетей (IT, ТВ)",
                  ].map((text, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 text-slate-600 font-light text-base"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Пошаговая инструкция — Карточки этапов */}
              <h2 className="text-2xl md:text-2xl font-medium tracking-tight text-slate-900 mt-24 mb-12">
                Расключение: пошаговая инструкция
              </h2>

              <div className="grid gap-4">
                {[
                  {
                    step: "01",
                    title: "Разделение PEN",
                    desc: "Правильное разделение на N и PE. Главная шина PE жестко фиксируется к корпусу.",
                  },
                  {
                    step: "02",
                    title: "Модульное оборудование",
                    desc: "Установка автоматов на DIN-рейки. Использование цветовой маркировки шин (синий/желтый).",
                  },
                  {
                    step: "03",
                    title: "Внутренние связи",
                    desc: "Применение соединительных гребенок вместо самодельных перемычек для надежного контакта.",
                  },
                  {
                    step: "04",
                    title: "Линии квартир",
                    desc: "Подключение с обязательной опрессовкой наконечниками НШВИ и маркировкой фаз L1-L3.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex gap-8 p-8 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 transition-all duration-300"
                  >
                    <span className="text-4xl font-thin text-slate-200 group-hover:text-blue-100 transition-colors tabular-nums">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-base text-slate-500 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ошибки — Выделены мягким красным, без "кричащих" фонов */}
              <div className="mt-24 p-10 bg-red-50/30 rounded-3xl border border-red-100">
                <h3 className="text-red-900 font-medium mb-6 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  Критические ошибки монтажа
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm font-medium text-red-800 mb-2">
                      Техническая часть
                    </p>
                    <p className="text-sm text-red-700/80 font-light leading-relaxed">
                      Отсутствие опрессовки жил НШВИ и использование дешевых
                      автоматов приводит к перегреву и пожарам.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-800 mb-2">
                      Логика схемы
                    </p>
                    <p className="text-sm text-red-700/80 font-light leading-relaxed">
                      Объединение нулей после разных УЗО вызывает постоянные
                      ложные срабатывания защиты.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </main>

        {/* Footer CTA */}
        <section className="py-32 text-center bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-2xl font-light tracking-tighter text-slate-900 mb-6">
              Остались вопросы по{" "}
              <span className="font-medium">комплектации ЩЭ?</span>
            </h2>
            <p className="text-slate-500 font-light text-lg mb-12 max-w-xl mx-auto">
              Наши инженеры помогут подобрать оборудование под ваш проект за 15
              минут.
            </p>
            <div className="flex justify-center scale-110">
              <Knopka props="Получить расчет проекта" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
