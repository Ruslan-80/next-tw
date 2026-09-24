import Image from "next/image";
import Link from "next/link";
import Knopka from "../knopka";
import JsonLd from "@/components/JsonLdComponent";
import BlogCta from "@/components/BlogCta";

export const metadata = {
  title:
    "ВРУ и ГРЩ: в чем разница, главные отличия и статус энергопринимающего устройства",
  date: "24 сентября 2026",
  description:
    "Четкое разграничение понятий ВРУ и ГРЩ по ПУЭ и ГОСТ. Узнайте технические и конструктивные отличия, а также почему сетевые компании называют вводный щит энергопринимающим устройством.",
  image: "/images/blogs/vru-grsh-1.jpeg",
  images: ["/images/blogs/vru-grsh-1.jpeg"],
  slug: "vru-grsh",
  robots: {
    index: true,
    follow: true,
  },
};

export default function VruGrshBlog() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://electroshit-pro.ru/blogs/${metadata.slug}`,
    },
    headline: metadata.title,
    description: metadata.description,
    image: ["https://electroshit-pro.ru/images/blogs/vru-grsh-1.jpeg"],
    datePublished: "2026-09-24",
    dateModified: "2026-09-24",
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
              <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-3 text-sm lg:text-lg font-medium text-muted-foreground">
                  <span>{metadata.date}</span>
                  <span>—</span>
                  <span>Алексей Шитов</span>
                </div>

                <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-text">
                  ВРУ и ГРЩ: в чем разница, главные отличия и статус
                  энергопринимающего устройства
                </h1>

                <p className="text-xl lg:text-2xl leading-relaxed text-text/80 text-justify">
                  Путаница в электротехнической терминологии — это не просто
                  вопрос лингвистики, а реальная причина задержек при сдаче
                  объектов в эксплуатацию. Ошибка на этапе составления
                  технического задания, когда проектировщик или снабженец путает
                  Главный распределительный щит (ГРЩ) с Вводно-распределительным
                  устройством (ВРУ), часто приводит к предписаниям от
                  Ростехнадзора и проблемам при оформлении актов
                  технологического присоединения.
                </p>
                <p className="text-xl lg:text-2xl leading-relaxed text-text/80 text-justify">
                  Как инженеры-проектировщики с многолетним опытом производства
                  силовых щитов, в этом руководстве мы четко разграничим понятия{" "}
                  <strong>ВРУ и ГРЩ</strong>, опираясь на действующие редакции
                  ПУЭ и ГОСТ 32396-2021. Вы узнаете точные технические отличия
                  этих узлов и разберетесь, почему сетевые компании называют
                  вводный щит «энергопринимающим устройством».
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Knopka props="Получить консультацию" />
                  <Link
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru"
                    className="inline-flex items-center rounded-md border-2 border-accent bg-transparent px-5 py-2.5 font-bold text-accent transition-colors hover:bg-accent/10 text-lg lg:text-xl"
                  >
                    Каталог ВРУ
                  </Link>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative h-96 lg:h-full lg:min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl rounded-2xl" />

                <Image
                  src="/images/categories/vru-all.webp"
                  alt="Щиты ВРУ на 1 ввод"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-6 lg:py-12">
          <div className="max-w-5xl mx-auto space-y-16 px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            {/* Раздел 1 */}
            <section>
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-accent">
                Техническая граница: <br />
                ГРЩ и ВРУ - в чем разница по ГОСТ
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                В повседневной речи монтажников понятия «ВРУ» и «ГРЩ» часто
                используют как синонимы, подразумевая главный электрический шкаф
                здания. Однако нормативная документация ставит между ними
                строгую границу, основанную на архитектуре электросети и
                пропускной способности оборудования.
              </p>

              <div className="bg-card border border-accent/20 rounded-xl p-8 mb-8 shadow-sm">
                <p className="text-xl lg:text-2xl leading-relaxed text-text/90 mb-4">
                  <strong>Вводно-распределительное устройство (ВРУ)</strong> —
                  это электротехническое устройство низкого напряжения,
                  содержащее аппаратуру, обеспечивающую возможность ввода,
                  распределения и учета электроэнергии, а также управления и
                  защиты отходящих электрических цепей.
                </p>
                <p className="text-xl lg:text-2xl leading-relaxed text-text/90 mb-4">
                  Фундаментальное отличие ВРУ кроется в его номинальных токах.
                  Согласно требованиям ГОСТ 32396-2021 и ГОСТ 32396-2013,
                  характеристики строго регламентированы:
                </p>
                <ul className="space-y-3 mt-4 text-xl lg:text-2xl text-text/90">
                  <li className="flex gap-4">
                    <span className="text-accent font-bold">•</span> Номинальные
                    токи вводных аппаратов для многопанельных ВРУ составляют
                    строго 250, 400 или 630 А.
                  </li>
                  <li className="flex gap-4">
                    <span className="text-accent font-bold">•</span> Для
                    однопанельных модификаций этот предел ограничен значениями
                    160 и 250 А.
                  </li>
                  <li className="flex gap-4">
                    <span className="text-accent font-bold">•</span> Для шкафных
                    ВРУ номинальные токи вводных аппаратов составляют от 50 до
                    160 А.
                  </li>
                </ul>
              </div>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg mb-8">
                <Image
                  src="/images/blogs/vru-grsh-1.jpeg"
                  alt="Сравнение ГРЩ и ВРУ: отличия по номинальному току и габаритам электрощитов"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                <strong>Главный распределительный щит (ГРЩ)</strong> — это
                низковольтное комплектное устройство (НКУ), которое стоит на
                вершине цепочки электроснабжения крупного объекта. Сборка ГРЩ
                применяется там, где расчетные мощности выходят за рамки 630 А
                (проектируется на токи 800 А, 1600 А, 3200 А и выше). ГРЩ может
                распределять питание на несколько локальных ВРУ, но ВРУ никогда
                не питает ГРЩ.
              </p>
            </section>

            {/* Раздел 2 */}
            <section className="pt-10 border-t border-accent">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                ВРУ как энергопринимающее устройство: юридический статус и акты
                с электросетями
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                В регламентах технологического присоединения фигурирует базовый
                юридический термин —{" "}
                <strong>энергопринимающее устройство</strong>. Сетевая компания
                подает напряжение не абстрактному «зданию», а конкретному
                электротехническому узлу. Для большинства коммерческих объектов,
                жилых домов и производственных цехов средней мощности этим
                устройством официально является ВРУ.
              </p>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg mb-8">
                <Image
                  src="/images/blogs/vru-grsh-2.jpeg"
                  alt="Граница балансовой принадлежности и эксплуатационной ответственности на клеммах ВРУ"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                Именно на вводных клеммах ВРУ проходит граница балансовой
                принадлежности и эксплуатационной ответственности:
              </p>

              <ul className="space-y-4 mb-6">
                <li className="flex gap-4 text-xl lg:text-2xl leading-relaxed text-text/90">
                  <span className="text-accent font-bold flex-shrink-0">✓</span>
                  <span>
                    <strong>Сетевая компания</strong> отвечает за внешний
                    питающий кабель вплоть до наконечников, подключаемых к
                    вводному аппарату устройства.
                  </span>
                </li>
                <li className="flex gap-4 text-xl lg:text-2xl leading-relaxed text-text/90">
                  <span className="text-accent font-bold flex-shrink-0">✓</span>
                  <span>
                    <strong>Собственник здания</strong> несет ответственность за
                    само ВРУ и все внутренние отходящие линии.
                  </span>
                </li>
              </ul>

              <p className="text-xl lg:text-2xl leading-relaxed mb-10 text-justify text-text/90">
                Если проектировщик ошибочно называет вводной щит на 400 А
                аббревиатурой «ГРЩ», инспектор Ростехнадзора имеет право вернуть
                документы на доработку. Правильная классификация исключает
                задержки при подписании Актов с Энергосбытом.
              </p>

              {/* Лид-магнит / CTA */}
              <div className="bg-accent/5 border-l-4 border-accent p-6 lg:p-8 rounded-r-xl shadow-sm">
                <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-text/90 italic">
                  Скачайте наш бесплатный «Шаблон правильного ТЗ для сетевой
                  компании». В документе собраны юридически выверенные
                  формулировки для наименования щитового оборудования, которые
                  гарантированно принимаются инспекторами Энергосбыта без лишних
                  вопросов.
                </p>

                <BlogCta
                  title="Скачать шаблон ТЗ"
                  description="Загрузите вашу однолинейную схему (PDF/AutoCAD) в форму ниже. Наши инженеры-проектировщики бесплатно проведут аудит ТЗ..."
                  buttonText="Скачать шаблон ТЗ"
                  modalTitle="Скачать шаблон ТЗ"
                />
              </div>
            </section>

            {/* Раздел 3 */}
            <section className="pt-10 border-t border-accent">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                Конструктивные отличия и специфика сборки ВРУ
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-8 text-justify text-text/90">
                Разница между ВРУ и мощным ГРЩ заключается в жестких
                конструктивных требованиях, заложенных в стандартах.
              </p>

              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-text">
                    1. Электродинамическая стойкость к коротким замыканиям (Icc)
                  </h3>
                  <p className="text-xl lg:text-2xl leading-relaxed mb-4 text-text/90">
                    Шинопроводы и коммутационные аппараты обязаны выдерживать
                    тепловые и механические удары при авариях.
                  </p>
                  <ul className="space-y-3 text-xl lg:text-2xl text-text/90 list-disc pl-6 marker:text-accent">
                    <li>
                      Номинальный кратковременно выдерживаемый ток короткого
                      замыкания (в течение 1 с) для блока ввода и сборных шин
                      многопанельных ВРУ составляет 20 кА.
                    </li>
                    <li>Для однопанельных ВРУ этот показатель равен 15 кА.</li>
                    <li>
                      Для ВРУ шкафного исполнения ток короткого замыкания
                      составляет не более 10 кА.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-text">
                    2. Вместимость вводных зажимов и кабельные трассы
                  </h3>
                  <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-text/90">
                    В одно- и многопанельных ВРУ ввод питающих кабелей и вывод
                    отходящих линий конструктивно предусмотрен преимущественно
                    снизу. При проектировании ВРУ необходимо строго учитывать
                    предельное количество и сечение жил, которые можно
                    присоединить к вводным зажимам:
                  </p>

                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg mb-6">
                    <Image
                      src="/images/blogs/vru-grsh-3.jpeg"
                      alt="Безопасный нижний ввод силового кабеля в напольный шкаф ВРУ с металлическим цоколем"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <ul className="space-y-3 text-xl lg:text-2xl text-text/90 list-disc pl-6 marker:text-accent">
                    <li>
                      На номинальный ток 250 А допускается подключение 2 жил
                      сечением 95 мм².
                    </li>
                    <li>
                      На номинальный ток 400 А допускается подключение 2 жил
                      сечением 120 мм².
                    </li>
                    <li>
                      На номинальный ток 630 А допускается подключение 4 жил
                      сечением 150 мм².
                    </li>
                    <li>
                      Для удобства разделки и безопасного подключения кабелей
                      большого сечения (150–240 мм²) мы настоятельно рекомендуем
                      заказывать ВРУ с цоколями (подставками) высотой 150 мм или
                      200 мм.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-text">
                    3. Степень защиты (IP) и заземление
                  </h3>
                  <ul className="space-y-4 text-xl lg:text-2xl text-text/90 list-disc pl-6 marker:text-accent">
                    <li>
                      Для интеграции ВРУ в четырех- и пятипроводные сети
                      (системы заземления TN-C, TN-S, TN-C-S) устройства
                      оснащаются изолированной нулевой рабочей шиной N и
                      защитной шиной PE, которая имеет надежное электрическое
                      соединение с металлическим корпусом.
                    </li>
                    <li>
                      Вводные и распределительные панели часто поставляются со
                      степенью защиты IP00 со стороны дна, поскольку монтируются
                      вплотную к полу, и IP31 или IP21 с других сторон.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Раздел 4 */}
            <section className="pt-10 border-t border-accent">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                Как правильно выбрать щит для вашего объекта (Чек-лист
                снабженца)
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                Чтобы не переплачивать за избыточные мощности и не нарушить
                нормы ПУЭ при заказе оборудования, сверьте свой проект с
                базовыми параметрами:
              </p>

              <ol className="list-decimal space-y-6 px-4 lg:pl-8 text-xl lg:text-2xl leading-relaxed text-text/90 marker:text-accent marker:font-bold">
                <li>
                  <strong>Мощность:</strong> Если расчетный ток на вводе не
                  превышает 630 А — проектируется ВРУ.
                </li>
                <li>
                  <strong>Климатика:</strong> Стандартное климатическое
                  исполнение оборудования для закрытых электрощитовых — УХЛ4 по
                  ГОСТ 15150-69 (температура от +1 до +35°С, невзрывоопасная
                  среда без токопроводящей пыли).
                </li>
                <li>
                  <strong>Долговечность:</strong> Установленный срок службы ВРУ
                  заводской сборки составляет 25 лет при условии плановой замены
                  отдельных комплектующих с меньшим ресурсом.
                </li>
                <li>
                  <strong>Коммерческий учет:</strong> ВРУ всегда предусматривает
                  возможность установки приборов учета электроэнергии (счетчиков
                  и трансформаторов тока), которые отделяются специальными
                  перегородками для безопасного обслуживания.
                </li>
              </ol>
            </section>

            {/* Спецпредложение / CTA */}
            <section className="my-16 space-y-6 rounded-2xl border-2 border-accent bg-card p-8 md:p-12 shadow-xl text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-text">
                Переведите вашу однолинейную схему в готовое решение!
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Отправьте ТЗ или проект нам на почту. Наши инженеры бесплатно
                проведут аудит, подберут качественную элементную базу (КЭАЗ,
                IEK, CHINT) и предоставят спецификацию с честной ценой. Все наши
                ВРУ проходят строгие заводские испытания ОТК и поставляются с
                полным пакетом паспортов для сдачи объекта.
              </p>
              <div className="pt-6 flex justify-center">
                <BlogCta
                  title="Получить расчет проекта ВРУ/ГРЩ"
                  description="Загрузите вашу однолинейную схему (PDF/AutoCAD) в форму ниже. Наши инженеры-проектировщики бесплатно проведут аудит ТЗ..."
                  buttonText="Прикрепить схему для аудита"
                  modalTitle="Получить расчет проекта"
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
                    Костин В. Н., Сериков В. А. АКТУАЛЬНЫЕ АСПЕКТЫ
                    ЭЛЕКТРОСНАБЖЕНИЯ: Методические.
                  </li>
                  <li>
                    Вихман А. Е. Проектирование систем электроснабжения
                    //МОСКВА. – 2016.
                  </li>
                  <li>
                    Василишина К. А. Проектирование жизненного цикла
                    производства щита электропитания. – 2020.
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
