import Image from "next/image";
import Link from "next/link";
import Knopka from "../knopka";
import JsonLd from "@/components/JsonLdComponent";
import BlogCta from "@/components/BlogCta";
import banner from "@/public/images/categories/vru-all.webp";

export const metadata = {
  title: "ВРУ в электрике: назначение, схемы и устройство щитов",
  date: "26 марта 2026",
  description:
    "Устройство вводно-распределительных устройств (ВРУ), требования к комплектации, расшифровка маркировки и специфика однолинейных схем согласно ПУЭ и ГОСТ.",
  image: "/images/blogs/vru-photo-1.jpeg",
  images: ["/images/blogs/vru-photo-1.jpeg"],
  slug: "vru-v-electrike",
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
      "@id": `https://electroshit-pro.ru/blogs/${metadata.slug}`,
    },
    headline:
      "ВРУ в электрике: назначение, схемы и устройство вводно-распределительных щитов",
    description: metadata.description,
    image: ["https://electroshit-pro.ru/images/blogs/vru-photo-1.jpeg"],
    datePublished: "2026-03-26",
    dateModified: "2026-03-26",
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
      "Что такое ВРУ и каковы его функции",
      "Архитектура и основные комплектующие щита",
      "Особенности ВРУ для многоквартирного жилого дома (МКД)",
      "Расшифровка маркировки ВРУ (по ГОСТ 32396-2021)",
      "Однолинейная схема ВРУ: основа проектной документации",
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
                <div className="flex items-center gap-3 text-sm lg:text-lg font-medium text-muted-foreground">
                  <span>{metadata.date}</span>
                  <span>—</span>
                  <span>Алексей Шитов</span>
                </div>

                <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-text">
                  ВРУ в электрике: назначение, схемы и устройство
                  вводно-распределительных щитов
                </h1>

                <p className="text-xl lg:text-2xl leading-relaxed text-text/80 text-justify">
                  Надежное энергоснабжение коммерческого здания,
                  производственного цеха или многоквартирного дома начинается с
                  грамотно спроектированного вводного узла. Ошибки в подборе
                  оборудования на этом этапе обходятся дорого: от предписаний
                  Ростехнадзора при сдаче объекта до тепловых пробоев кабельных
                  трасс при пиковых нагрузках.
                </p>
                <p className="text-xl lg:text-2xl leading-relaxed text-text/80 text-justify">
                  В этом руководстве мы детально, с опорой на ГОСТ 32396-2021 и
                  правила устройства электроустановок (ПУЭ), разберем устройство
                  вводно-распределительных устройств (ВРУ), требования к их
                  комплектации и специфику однолинейных схем.
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
              <div className="order-1 lg:order-2 relative h-96 lg:h-full lg:min-h-100">
                <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-primary/20 blur-3xl rounded-2xl" />
                <Image
                  src={banner}
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
            {/* Раздел 1 */}
            <section>
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-accent">
                Что такое ВРУ и каковы его функции (инженерный взгляд)
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                Вводно-распределительное устройство (ВРУ) — это
                электротехническое устройство низкого напряжения, содержащее
                аппаратуру, обеспечивающую возможность ввода, распределения и
                учета электроэнергии, а также управления и защиты отходящих
                электрических цепей.
              </p>
              <p className="text-xl lg:text-2xl leading-relaxed mb-8 text-justify text-text/90">
                Оборудование предназначено для работы в питающих сетях
                напряжением 230/400 В (или 380/220 В) переменного тока частотой
                50—60 Гц с глухозаземленной нейтралью.
              </p>

              <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-accent">
                Фундаментальные задачи силового щита ВРУ:
              </h3>
              <ul className="space-y-4 pl-4">
                {[
                  {
                    title: "Прием мощностей:",
                    desc: "безопасное подключение внутренних сетей здания к внешнему питающему кабелю от трансформаторной подстанции.",
                  },
                  {
                    title: "Распределение:",
                    desc: "разделение общего потока энергии на изолированные отходящие линии (на разные этажи, секции или группы потребителей).",
                  },
                  {
                    title: "Защита сети:",
                    desc: "автоматическое обесточивание цепей при перегрузках и токах короткого замыкания (КЗ).",
                  },
                  {
                    title: "Коммерческий учет:",
                    desc: "размещение трансформаторов тока и счетчиков в выделенных, пломбируемых отсеках для контроля расхода электроэнергии.",
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-xl lg:text-2xl leading-relaxed text-text/90"
                  >
                    <span className="text-accent font-bold shrink-0">•</span>
                    <span>
                      <span className="font-semibold text-text">
                        {item.title}
                      </span>{" "}
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Раздел 2 */}
            <section className="pt-10 border-t border-accent">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                Архитектура и основные комплектующие щита
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-8 text-justify text-text/90">
                Заводской шкаф ВРУ в сборе — это сложный комплекс, надежность
                которого зависит от качества каждого элемента. Базовая
                комплектация включает:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "Вводные коммутационные аппараты",
                    desc: "выключатели-разъединители, рубильники и автоматические выключатели. Для многопанельных ВРУ ГОСТ строго регламентирует номинальные токи вводных аппаратов: 250, 400 или 630 А.",
                  },
                  {
                    title: "Сборные шины",
                    desc: "система медных или алюминиевых проводников. Они обязаны выдерживать колоссальные электродинамические удары: номинальный кратковременно выдерживаемый ток короткого замыкания (в течение 1 с) для блока ввода и сборных шин составляет 20 кА.",
                  },
                  {
                    title: "Шины заземления и нейтрали",
                    desc: "ВРУ комплектуются нулевой рабочей шиной (N), изолированной от металлического корпуса, и защитной шиной (PE), имеющей надежное электрическое соединение с ним. Это позволяет использовать щиты в современных системах заземления TN-S, TN-C и TN-C-S.",
                  },
                  {
                    title: "Аппаратура защиты",
                    desc: "плавкие предохранители и автоматические выключатели на отходящих линиях (с номиналами от 10 А до 250 А).",
                  },
                ].map((section, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-accent/40 rounded-xl p-6 lg:p-8 hover:border-accent transition-colors shadow-sm"
                  >
                    <h4 className="text-xl lg:text-2xl font-semibold mb-4 text-accent">
                      {section.title}
                    </h4>
                    <p className="text-lg lg:text-xl text-text/80 leading-relaxed">
                      {section.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-l-4 border-amber-500/50 bg-amber-500/5 dark:bg-amber-500/10 p-6 rounded-r-lg mb-10">
                <p className="text-xl lg:text-2xl leading-relaxed text-justify text-text/90">
                  <span className="font-bold text-amber-600 dark:text-amber-400">
                    Важный конструктивный нюанс
                  </span>
                  , о котором часто забывают неопытные монтажники: по нормативам
                  ввод и вывод толстых питающих кабелей в одно- и многопанельных
                  ВРУ осуществляется строго снизу. Для подключения кабелей
                  сечением 150–240 мм² шкаф должен оснащаться металлическим
                  цоколем.
                </p>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg mt-8">
                <Image
                  src="/images/blogs/vru-photo-1.jpeg"
                  alt="Внутреннее устройство шкафа ВРУ: медные сборные шины, защитная аппаратура и нижний ввод кабеля"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  preload={true}
                />
              </div>
            </section>

            {/* Раздел 3 */}
            <section className="pt-10 border-t border-accent">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                Особенности ВРУ для многоквартирного жилого дома (МКД)
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                Вводное устройство многоквартирного дома проектируется с учетом
                этажности и категории надежности электроснабжения.
              </p>
              <ul className="space-y-4 pl-4 mb-8">
                <li className="flex gap-4 text-xl lg:text-2xl leading-relaxed text-text/90">
                  <span className="text-accent font-bold shrink-0">✓</span>
                  <span>
                    Для зданий высотой до 5 этажей применяются компактные
                    однопанельные ВРУ (номинальные токи на вводе ограничены 160
                    или 250 А).
                  </span>
                </li>
                <li className="flex gap-4 text-xl lg:text-2xl leading-relaxed text-text/90">
                  <span className="text-accent font-bold shrink-0">✓</span>
                  <span>
                    Для жилых комплексов свыше 5 этажей монтируются
                    многопанельные ВРУ.
                  </span>
                </li>
              </ul>

              <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-accent">
                Многопанельные комплексы состоят из секций разного назначения:
              </h3>

              <div className="space-y-6 mb-10">
                {[
                  {
                    title: "Вводные панели",
                    desc: "принимают кабели от сети. Для домов 1-й и 2-й категории надежности устанавливаются две вводные панели с системой АВР (автоматическое включение резерва), которая мгновенно переключает питание на резервную линию при аварии.",
                  },
                  {
                    title: "Распределительные панели",
                    desc: "питают этажные щитки.",
                  },
                  {
                    title: "Панели общедомовых нужд",
                    desc: "выделенные линии для критической инфраструктуры (лифты, системы дымоудаления, дежурное освещение).",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-accent/20 rounded-lg p-6 hover:border-accent/60 transition-colors"
                  >
                    <h4 className="text-xl lg:text-2xl font-semibold mb-2 text-text">
                      {item.title}
                    </h4>
                    <p className="text-lg lg:text-xl text-text/80">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                <Image
                  src="/images/blogs/vru-photo-2.jpeg"
                  alt="Схема многопанельного ВРУ для многоквартирного дома с панелями АВР и распределения"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </section>

            {/* Раздел 4 */}
            <section className="pt-10 border-t border-accent">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                Расшифровка маркировки ВРУ (по ГОСТ 32396-2021)
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                Оборудование маркируется по единым стандартам (с учетом
                климатического исполнения по ГОСТ 15150-69). Понимание структуры
                аббревиатуры необходимо снабженцу для корректного заказа.
              </p>

              <div className="bg-card border border-accent/40 rounded-xl overflow-hidden shadow-sm mt-8">
                <div className="p-6 bg-accent/5 border-b border-accent/20">
                  <h3 className="text-xl lg:text-2xl font-semibold text-text">
                    Пример:{" "}
                    <span className="text-accent font-bold">
                      ВРУ-1-21-10 УХЛ4
                    </span>
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-lg lg:text-xl text-left">
                    <thead className="bg-card">
                      <tr>
                        <th className="border-b border-border px-6 py-5 font-semibold text-accent whitespace-nowrap">
                          Элемент маркировки
                        </th>
                        <th className="border-b border-border px-6 py-5 font-semibold text-accent">
                          Значение
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="transition-colors hover:bg-accent/5">
                        <td className="px-6 py-5 font-bold text-text">ВРУ</td>
                        <td className="px-6 py-5 text-text/80">
                          Вводно-распределительное устройство.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-accent/5">
                        <td className="px-6 py-5 font-bold text-text">1</td>
                        <td className="px-6 py-5 text-text/80">
                          Номер конструкторской разработки (габариты, вес,
                          металлоемкость).
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-accent/5">
                        <td className="px-6 py-5 font-bold text-text">21</td>
                        <td className="px-6 py-5 text-text/80">
                          Назначение панели: 11-19 — вводные, 21-29 —
                          вводно-распределительные, 41-50 — распределительные.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-accent/5">
                        <td className="px-6 py-5 font-bold text-text">10</td>
                        <td className="px-6 py-5 text-text/80">
                          Тип аппаратов управления: «1» — переключатель на 250
                          А; «0» — блоки автоматического управления освещением
                          отсутствуют.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-accent/5">
                        <td className="px-6 py-5 font-bold text-text">УХЛ4</td>
                        <td className="px-6 py-5 text-text/80">
                          Климатическое исполнение (температура эксплуатации от
                          +1 до +35 °С, для сухих закрытых помещений).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Раздел 5 */}
            <section className="pt-10 border-t border-accent">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-accent">
                Однолинейная схема ВРУ: основа проектной документации
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                Собрать безопасный щит, а тем более сдать его инспектору
                Энергонадзора, невозможно без утвержденной однолинейной схемы.
              </p>
              <p className="text-xl lg:text-2xl leading-relaxed mb-6 text-justify text-text/90">
                Это технический чертеж, на котором три фазы питающей сети
                изображаются одной линией для простоты чтения. На схеме ВРУ в
                обязательном порядке фиксируются:
              </p>

              <div className="bg-card border border-accent/40 rounded-xl p-8 hover:border-accent transition-colors shadow-sm mb-10">
                <ul className="space-y-4">
                  {[
                    "Точка подключения к внешней ЛЭП или подстанции.",
                    "Марки и расчетные сечения вводных кабелей (например, 2х120 мм² для ввода на 400 А).",
                    "Номинальные токи всех коммутационных аппаратов и расцепителей.",
                    "Коэффициенты трансформации трансформаторов тока для узлов коммерческого учета.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-4 text-xl lg:text-2xl text-text/90 leading-relaxed"
                    >
                      <span className="text-accent font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                <Image
                  src="/images/blogs/vru-photo-3.jpeg"
                  alt="Пример технического чертежа однолинейной схемы ВРУ для расчета стоимости"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </section>

            {/* CTA Блок */}
            <section className="my-16 space-y-6 rounded-2xl border-2 border-accent bg-card p-8 md:p-12 shadow-xl text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-text">
                Готов проект, но смета превышает бюджет?
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Пришлите нам свою однолинейную схему. Ведущие инженеры завода
                проведут аудит спецификации, подберут качественные аналоги
                аппаратуры (КЭАЗ, IEK, CHINT) и предоставят расчет стоимости
                сборки шкафа ВРУ за 1 рабочий день. Оборудование поставляется с
                заводской гарантией и полным пакетом паспортов для
                Ростехнадзора.
              </p>
              <div className="pt-6 flex justify-center">
                <BlogCta
                  title="Рассчитать стоимость сборки"
                  description="Загрузите вашу однолинейную схему (PDF/AutoCAD) в форму ниже. Наши инженеры-проектировщики бесплатно проведут аудит ТЗ..."
                  buttonText="Прикрепить схему и узнать цену"
                  modalTitle="Прикрепить схему и узнать цену"
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
                    Виноградов А. В. и др. Вариант структурной схемы
                    вводно-учётно-распределительного устройства Агротехника и
                    энергообеспечение–2020.№. 3 (28)
                  </li>
                  <li>
                    Винокуров В. В. и др. ВВОДНО-РАСПРЕДЕЛИТЕЛЬНОЕ УСТРОЙСТВО. –
                    2007.
                  </li>
                  <li>
                    Сунцов И. М., Фрайштетер В. П. Построение модели
                    однолинейной схемы при создании эффективной системы
                    автоматизированного проектирования электроэнергетических
                    объектов Нефтяное хозяйство – 2014.
                  </li>
                  <li>
                    Плотников Н. М. Разработка электроснабжения жилого дома :
                    дис. – Российский государственный
                    профессионально-педагогический университет, 2017.
                  </li>
                </ol>
              </div>
            </section>
          </div>
        </section>

        {/* <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalContent}
          onSubmit={handleFormSubmit}
          error={error}
        /> */}
      </div>
    </>
  );
}
