import Image from "next/image";
import Link from "next/link";
import Knopka from "../knopka";
import JsonLd from "@/components/JsonLdComponent";
import BlogCta from "@/components/BlogCta";

export const metadata = {
  title:
    "Сборка и установка ВРУ: инженерный гайд от проектирования до сдачи объекта",
  date: "11 июня 2026",
  description:
    "Детальный разбор технологических этапов производства и установки силовых щитов ВРУ. Инженерный аудит, заводская сборка, правила монтажа и подключения питающих кабелей.",
  image: "/images/blogs/sborka-vru-1.jpeg",
  images: ["/images/blogs/sborka-vru-1.jpeg"],
  slug: "sborka-vru",
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
      "@type": "jpegage",
      "@id": `https://electroshit-pro.ru/blogs/${metadata.slug}`,
    },
    headline: metadata.title,
    description: metadata.description,
    image: ["https://electroshit-pro.ru/images/blogs/sborka-vru-1.jpeg"],
    datePublished: "2026-06-11",
    dateModified: "2026-06-11",
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
      "Инженерный аудит схемы и подбор комплектующих",
      "Технология заводской сборки ВРУ (почему опасна сборка «на коленке»)",
      "Правила установки ВРУ на объекте и подключение",
    ],
  };

  return (
    <>
      <JsonLd data={blogJsonLd} script_name="blog-jsonld" />

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
              <li
                className="text-accent truncate max-w-[300px] lg:max-w-none"
                title={metadata.title}
              >
                {metadata.title}
              </li>
            </ol>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-metal animate-metal">
          <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-3 text-sm lg:text-lg font-medium text-muted-foreground">
                  <span>{metadata.date}</span>
                  <span>—</span>
                  <span>Алексей Шитов</span>
                </div>

                <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-text">
                  Сборка и установка ВРУ: инженерный гайд от проектирования до
                  сдачи объекта
                </h1>

                <p className="text-xl lg:text-2xl leading-relaxed text-text/80 text-justify">
                  Ошибка на этапе компоновки или монтажа
                  Вводно-распределительного устройства (ВРУ) обходится заказчику
                  дорого: от предписаний контролирующих органов и задержек ввода
                  здания в эксплуатацию до критических тепловых пробоев.
                </p>
                <p className="text-xl lg:text-2xl leading-relaxed text-text/80 text-justify">
                  В данном руководстве мы детально разберем технологические
                  этапы производства и установки силовых щитов. Современные ВРУ
                  присоединяются к питающим электрическим сетям напряжением
                  230/400 В переменного тока частотой 50—60 Гц с
                  глухозаземленной нейтралью. Качественная сборка — это не
                  просто механическое соединение аппаратов, а строгий инженерный
                  процесс, гарантирующий бесперебойную работу объекта на
                  десятилетия.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Knopka props="Получить консультацию" />
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru"
                    className="inline-flex items-center rounded-md border-2 border-accent bg-transparent px-5 py-2.5 font-bold text-accent transition-colors hover:bg-accent/10 text-lg lg:text-xl"
                  >
                    Смотреть каталог ВРУ
                  </Link>
                </div>
              </div>

              {/* Right Media */}
              <div className="order-1 lg:order-2 relative h-96 lg:h-full lg:min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl rounded-2xl" />
                <Image
                  src="/images/categories/vru-all.webp"
                  alt="Щиты ВРУ на 1 ввод"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                  preload={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-6 lg:py-12">
          <div className="max-w-5xl mx-auto space-y-16 px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            {/* Этап 1 */}
            <section>
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-accent">
                Этап 1: Инженерный аудит схемы и подбор комплектующих
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                Сборка надежного распределительного узла начинается задолго до
                работы с металлом — на стадии анализа однолинейной схемы и
                технического задания (ТЗ). Главный инженер производства обязан
                учесть архитектуру сети, климатические условия и специфику
                нагрузок конкретного здания.
              </p>
              <p className="text-xl lg:text-2xl leading-relaxed mb-10 text-justify text-text/90">
                Для однопанельных и шкафных ВРУ, а также для каждой панели
                многопанельного ВРУ следует определять их номинальные токи, а
                для встроенных в них аппаратов — номинальные рабочие токи. Если
                проигнорировать поправочные коэффициенты на взаимный нагрев
                аппаратуры внутри металлического шкафа, при пиковых нагрузках
                произойдет тепловое срабатывание защиты.
              </p>

              <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-accent">
                Фундаментальные инженерные задачи на этапе проектирования
                сборки:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    title: "Координация токов короткого замыкания (Icc)",
                    desc: "Сборные шины и блок ввода обязаны выдерживать расчетные электродинамические удары. Пиковое значение тока короткого замыкания следует принимать равным произведению действующего значения на коэффициент 1,5. В зависимости от модификации, номинальный кратковременно выдерживаемый ток короткого замыкания для сборных шин может составлять 15 кА, 20 кА или рассчитываться индивидуально.",
                  },
                  {
                    title: "Интеграция систем заземления",
                    desc: "Конструкция ВРУ должна обеспечивать возможность присоединения к четырех- и пятипроводным питающим сетям (тип заземления системы TN-C, TN-S или TN-C-S).",
                  },
                  {
                    title: "Электромагнитная совместимость",
                    desc: "Предельно допустимые уровни напряженности магнитных полей частотой 50 Гц на наружных сторонах оболочки ВРУ не должны превышать 4 А/м (или 5 мкТл магнитной индукции) для щитов, устанавливаемых внутри жилых и общественных зданий.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-accent/30 rounded-xl p-6 shadow-sm hover:border-accent transition-colors"
                  >
                    <h4 className="text-xl lg:text-2xl font-bold mb-4 text-text">
                      {item.title}
                    </h4>
                    <p className="text-lg lg:text-xl text-text/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Лид-магнит / CTA */}
              <div className="bg-accent/5 border-l-4 border-accent p-6 lg:p-8 rounded-r-xl my-10 shadow-sm">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-text">
                  Сомневаетесь в корректности вашей проектной документации?
                </h3>
                <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-text/80">
                  Загрузите вашу однолинейную схему (PDF/AutoCAD) в форму ниже.
                  Наши инженеры-проектировщики бесплатно проведут аудит ТЗ,
                  проверят селективность аппаратуры и подготовят
                  оптимизированную спецификацию под ваш бюджет.
                </p>

                <BlogCta
                  title="Сомневаетесь в корректности вашей проектной документации?"
                  description="Загрузите вашу однолинейную схему (PDF/AutoCAD) в форму ниже. Наши инженеры-проектировщики бесплатно проведут аудит ТЗ..."
                  buttonText="Прикрепить схему для аудита"
                  modalTitle="Загрузить схему на аудит"
                />
              </div>
            </section>

            {/* Этап 2 */}
            <section className="pt-10 border-t border-accent">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                Этап 2: Технология заводской сборки ВРУ (почему опасна сборка
                «на коленке»)
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-8 text-justify text-text/90">
                Для заказчика выбор между кустарной сборкой на объекте и заказом
                готового щита на заводе часто сводится к цене. Однако экономия
                на производственных стандартах оборачивается проблемами при
                сдаче объекта Ростехнадзору и рисками аварий. Заводская сборка
                регламентирована строгими ГОСТами, обеспечивающими расчетный
                срок службы оборудования до 25 лет (при условии своевременной
                замены изнашиваемых компонентов).
              </p>

              <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-text">
                Механическая прочность и шинные мосты
              </h3>
              <p className="text-xl lg:text-2xl leading-relaxed mb-8 text-justify text-text/90">
                При возникновении токов короткого замыкания (КЗ) или коммутации
                мощных нагрузок внутри щита возникают колоссальные
                электродинамические удары. В закрепленном положении ВРУ обязаны
                обладать достаточной жесткостью, исключающей деформации, которые
                могут отрицательно повлиять на работу аппаратов при бросках
                токов. Металлический профиль кустарного щита без необходимых
                ребер жесткости просто выгнет дугой.
              </p>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg mb-10">
                <Image
                  src="/images/blogs/sborka-vru-1.jpeg"
                  alt="Механическая прочность и шинные мосты: технология заводской сборки ВРУ"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="bg-card border border-accent/20 rounded-xl p-8 hover:border-accent/60 transition-colors mb-10">
                <h4 className="text-xl lg:text-2xl font-bold mb-6 text-accent">
                  Особое внимание на производстве уделяется ошиновке:
                </h4>
                <ul className="space-y-4">
                  {[
                    "В многопанельных комплексах сборные фазные шины прокладываются в пределах распределительных панелей, а защитная (PE) и нулевая рабочая (N) шины проводятся через каждую панель — как вводную, так и распределительную.",
                    "Соединения фазных шин и внутренних проводников защитных аппаратов должны быть строго разборными (болтовыми).",
                    "Межпанельные шинные перемычки обязаны выполняться из того же материала (медь или алюминий), что и основные шины, а их сечение не может быть меньше сечения соединяемых шин.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-4 text-xl lg:text-2xl text-text/90 leading-relaxed"
                    >
                      <span className="text-accent font-bold flex-shrink-0">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-text">
                Безопасность и эргономика обслуживания
              </h3>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                Обслуживание щита под напряжением — штатная ситуация для
                квалифицированного персонала. Для защиты от прямого
                прикосновения к токоведущим частям во ВРУ устанавливаются
                специальные пластроны (ограждения). Согласно нормативам, эти
                ограждения должны устанавливаться и сниматься исключительно с
                применением инструмента, что исключает риск случайного
                соприкосновения с оголенными фазами.
              </p>
            </section>

            {/* Этап 3 */}
            <section className="pt-10 border-t border-accent">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                Этап 3: Правила установки ВРУ на объекте и подключение
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-8 text-justify text-text/90">
                Монтаж вводно-распределительного устройства — финальная стадия,
                требующая точной подготовки кабельных трасс и помещения
                электрощитовой.
              </p>

              <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-text">
                Способы установки и габариты
              </h3>
              <p className="text-xl lg:text-2xl leading-relaxed mb-10 text-justify text-text/90">
                Тип монтажа напрямую зависит от конструкторского исполнения
                щита. Однопанельные и многопанельные устройства устанавливаются
                исключительно на полу с жесткой фиксацией к основанию. Шкафные
                модификации более универсальны: они могут монтироваться на полу,
                крепиться на стене или встраиваться в заранее подготовленные
                строительные ниши, для чего комплектуются соответствующими
                крепежными элементами.
              </p>

              <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-text">
                Ввод силовых кабелей
              </h3>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                Грубая ошибка неопытных монтажников — попытка завести питающий
                кабель в панель с неверной стороны.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex gap-4 text-xl lg:text-2xl leading-relaxed text-text/90">
                  <span className="text-accent font-bold flex-shrink-0">✓</span>
                  <span>
                    В одно- и многопанельных ВРУ ввод питающих кабелей и вывод
                    отходящих линий конструктивно предусмотрен только снизу.
                  </span>
                </li>
                <li className="flex gap-4 text-xl lg:text-2xl leading-relaxed text-text/90">
                  <span className="text-accent font-bold flex-shrink-0">✓</span>
                  <span>
                    Во ВРУ шкафного исполнения вводы и выводы проводников могут
                    осуществляться как через нижнюю, так и через верхнюю панели.
                  </span>
                </li>
              </ul>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg mb-8">
                <Image
                  src="/images/blogs/sborka-vru-2.jpeg"
                  alt="Правильный ввод силовых кабелей и подключение внутри блока ВРУ"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <p className="text-xl lg:text-2xl leading-relaxed mb-10 text-justify text-text/90">
                Внутри блока ввода обязательно резервируется достаточное
                пространство для соблюдения нормированных радиусов изгиба
                толстых жил кабелей. При проектировании кабельных трасс важно
                учитывать предельные сечения жил, которые физически способны
                принять вводные зажимы. Например, для аппаратов на 250А предел
                составляет два кабеля по 95 мм², для 400А — два по 120 мм², а
                для мощных сборок на 630А — четыре кабеля сечением до 150 мм²
                каждый.
              </p>

              <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-text">
                Интеграция систем заземления
              </h3>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                При подключении питающей сети к устройству важно правильно
                расключить нулевые и заземляющие проводники. ВРУ поставляются с
                нулевой рабочей шиной (N), которая строго изолирована от
                металлического корпуса, и защитной шиной (PE), имеющей надежное
                электрическое соединение с корпусом. Такая конфигурация
                позволяет беспрепятственно интегрировать ВРУ в четырех- и
                пятипроводные сети с системами заземления TN-C, TN-S или
                комбинированной TN-C-S.
              </p>
            </section>

            {/* Спецпредложение / CTA */}
            <section className="my-16 space-y-6 rounded-2xl border-2 border-accent bg-card p-8 md:p-12 shadow-xl text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-text">
                Планируете закупку ВРУ для строящегося объекта или реконструкции
                здания?
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Не рискуйте сроками сдачи. Оставьте заявку на расчет стоимости:
                наши инженеры соберут щит любой сложности в строгом соответствии
                с ПУЭ и ГОСТ, проведут стендовые испытания и выдадут полный
                пакет паспортов и сертификатов для Ростехнадзора.
              </p>
              <div className="pt-6 flex justify-center">
                <BlogCta
                  title="Получить коммерческое предложение и схему"
                  description="Загрузите вашу однолинейную схему (PDF/AutoCAD) в форму ниже. Наши инженеры-проектировщики бесплатно проведут аудит ТЗ..."
                  buttonText="Получить коммерческое предложение и схему"
                  modalTitle="Получить коммерческое предложение и схему"
                />
              </div>
            </section>

            {/* Список литературы */}
            <section className="pt-12 border-t border-accent text-justify">
              <h2 className="lg:text-4xl text-2xl font-bold mb-8 text-accent">
                Список литературы:
              </h2>
              <div className="border border-accent/40 hover:border-accent hover:bg-card transition-colors rounded-lg lg:p-8 p-4">
                <ol className="list-decimal space-y-3 px-4 lg:pl-8 text-lg lg:text-xl leading-relaxed text-muted-foreground">
                  <li>
                    Олифиренко Н., Овчинникова И., Хлыстунова Т. Сборка, монтаж,
                    регулировка и ремонт электрооборудования (ПМ. 01).
                  </li>
                  <li>
                    Правила устройства электроустановок в вопросах и ответах.
                    Пособие для изучения и подготовки к проверке знаний. Разделы
                    1, 6, 7.
                  </li>
                </ol>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
