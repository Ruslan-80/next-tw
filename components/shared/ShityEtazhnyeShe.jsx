"use client";
import {
  ArrowRight,
  Download,
  Upload,
  Mail,
  FileText,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import WorksGallery from "../imageDoPosle";
import FAQPageShityJSONLD from "@/lib/faqshityJsonLd";
import JsonLd from "@/components/JsonLdComponent";
import PopularNabor from "../PopularNabor";

export function ShityEtazhnyeTop() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const FaqJsonLd = FAQPageShityJSONLD();

  return (
    <>
      <JsonLd data={FaqJsonLd} script_name="FAQ-jsonld" />
      <section className="bg-gradient-metal animate-metal">
        <div className="container mx-auto p-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-5xl font-bold text-balance leading-[100%] mb-16">
                  Щиты этажные <span className="text-accent">ЩЭ</span>
                </h2>
                <p className="text-xl text-justify lg:text-2xl text-muted-foreground leading-[150%] mb-8">
                  Современный <strong>этажный щит</strong> (он же{" "}
                  <strong>шкаф</strong> этажный, щиток подъездный или{" "}
                  <strong>щит</strong> межэтажный) предназначен для организации
                  поквартирного учёта и распределения электроэнергии (220/380В)
                  в жилых и общественных зданиях. Изучив наш{" "}
                  <strong>каталог</strong>, вы сможете <strong>купить</strong>{" "}
                  оптимальную <strong>модель</strong> оборудования под любые
                  проектные требования как <strong>оптом</strong>, так и в{" "}
                  <strong>розницу</strong>: в наличии представлены как готовые{" "}
                  <strong>распределительные</strong> решения под ключ, так и
                  пустой <strong>металлический корпус</strong> электрощита для
                  самостоятельной комплектации НКУ. Вся продукция спроектирована
                  так, чтобы дополнительно <strong>усиливать</strong>{" "}
                  безопасность электросети, и изготовлена в строгом соответствии
                  с ГОСТ 32395-2020.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() =>
                    handleButtonClick("Получить бесплатный расчёт")
                  }
                  size="lg"
                  className="btn-accent text-accent-foreground text-xl py-8"
                >
                  Получить бесплатный расчёт
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">1-12</div>
                  <div className="text-xl text-muted-foreground">квартир</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">25</div>
                  <div className="text-xl text-muted-foreground">
                    лет службы
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">IP31</div>
                  <div className="text-xl text-muted-foreground">защита</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative animate-slide-in-right">
              <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-card rounded-2xl shadow-2xl flex justify-center mx-auto">
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
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialContent={modalContent}
        onSubmit={handleFormSubmit}
        submitError={error}
      />
    </>
  );
}

/* ============================================================
   ИНТЕРАКТИВНЫЙ ПОДБОР ЩЭ (1–12 квартир) + артикул
   ============================================================ */
function SheConfigurator() {
  const [mount, setMount] = useState("vstra");
  const [flats, setFlats] = useState(1);
  const [doors, setDoors] = useState(1);
  const [sc, setSc] = useState("none");
  const [win, setWin] = useState("yes");
  const [copied, setCopied] = useState(false);

  const METER_DIN = "на DIN-рейке 210×150×100";

  const GROUPS = [
    {
      n: 1,
      mount: "Встраиваемый",
      doors: 1,
      sc: "Нет",
      size: "1000×580×135",
      win: "С окошками",
      tpl: "SE1N",
    },
    {
      n: 2,
      mount: "Встраиваемый",
      doors: 2,
      sc: "Нет",
      size: "1000×580×135",
      win: "опц.",
      tpl: "SE2N·B",
    },
    {
      n: 3,
      mount: "Встраиваемый",
      doors: 2,
      sc: "Справа",
      size: "1000×950×135",
      win: "опц.",
      tpl: "SE2N·R",
    },
    {
      n: 4,
      mount: "Встраиваемый",
      doors: 2,
      sc: "Слева",
      size: "1000×950×135",
      win: "опц.",
      tpl: "SE2N·L",
    },
    {
      n: 5,
      mount: "Встраиваемый",
      doors: 3,
      sc: "Справа",
      size: "1000×950×135",
      win: "опц.",
      tpl: "SE3N·R",
    },
    {
      n: 6,
      mount: "Встраиваемый",
      doors: 3,
      sc: "Слева",
      size: "1000×950×135",
      win: "опц.",
      tpl: "SE3N·L",
    },
    {
      n: 7,
      mount: "Накладной",
      doors: 1,
      sc: "Нет",
      size: "1000×580×135",
      win: "С окошками",
      tpl: "SE1N-N",
    },
    {
      n: 8,
      mount: "Накладной",
      doors: 2,
      sc: "Нет",
      size: "1000×580×135",
      win: "опц.",
      tpl: "SE2N·B-N",
    },
    {
      n: 9,
      mount: "Накладной",
      doors: 2,
      sc: "Справа",
      size: "1000×950×135",
      win: "опц.",
      tpl: "SE2N·R-N",
    },
    {
      n: 10,
      mount: "Накладной",
      doors: 2,
      sc: "Слева",
      size: "1000×950×135",
      win: "опц.",
      tpl: "SE2N·L-N",
    },
    {
      n: 11,
      mount: "Накладной",
      doors: 3,
      sc: "Справа",
      size: "1000×950×135",
      win: "опц.",
      tpl: "SE3N·R-N",
    },
    {
      n: 12,
      mount: "Накладной",
      doors: 3,
      sc: "Слева",
      size: "1000×950×135",
      win: "опц.",
      tpl: "SE3N·L-N",
    },
  ];

  const validateConfig = () => {
    if (doors === 3 && sc === "none")
      return "Исполнение «3-дверный без слаботочного отсека» в номенклатуре отсутствует.";
    if (doors === 1 && sc !== "none")
      return "Исполнение «1-дверный со слаботочным отсеком» в номенклатуре отсутствует.";
    if (doors === 1 && win === "no")
      return "Исполнение «1-дверный без окошек» в номенклатуре отсутствует.";
    if (doors === 2 && sc === "none" && flats > 10)
      return `Для 2-дверного исполнения без слаботочного отсека доступны только 1–10 квартир (запрошено ${flats}).`;
    return null;
  };

  const pluralFlats = (n) => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return "квартиру (счетчик)";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
      return "квартиры (счетчика)";
    return "квартир (счетчиков)";
  };

  const buildArticle = () => {
    let base = doors === 1 ? "SE1" : doors === 2 ? "SE2" : "SE3";
    let scSuffix = "";
    if (sc === "right") scSuffix = "R";
    else if (sc === "left") scSuffix = "L";
    else if (sc === "none" && doors !== 1) scSuffix = "B";
    const mountSuffix = mount === "nakl" ? "-N" : "";
    return base + String(flats) + scSuffix + mountSuffix;
  };

  const buildName = () => {
    const size = sc === "none" ? "1000x580x135" : "1000x950x135";
    const doorWord =
      doors === 1 ? "1-дверный" : doors === 2 ? "2-дверный" : "3-дверный";
    const mountWord = mount === "nakl" ? " накладной" : "";
    const winWord = win === "no" ? " без окошек" : "";
    const scWord =
      sc === "none"
        ? " без слаботочного отсека"
        : sc === "right"
        ? " со слаботочным отсеком справа"
        : " со слаботочным отсеком слева";
    let flatsStr;
    if (flats === 0) {
      flatsStr = "Щит этажный ЩЭ на 1-12 квартир (счетчиков)";
    } else {
      flatsStr = `Щит этажный ЩЭ-${flats} на ${flats} ${pluralFlats(flats)}`;
    }
    return `${flatsStr} ${doorWord}${mountWord}${winWord}${scWord} (${size}) IP31 УХЛ3`;
  };

  const err = validateConfig();
  const article = err ? "—" : buildArticle();
  const name = err ? "⚠ " + err : buildName();
  const sizeDisp = sc === "none" ? "1000×580×135 мм" : "1000×950×135 мм";
  const hint = err
    ? ""
    : `Артикул: SE${doors}·N·${
        sc === "none" ? "B" : sc === "right" ? "R" : "L"
      }${mount === "nakl" ? "·(-N)" : ""}${
        flats === 0 ? " · N = 0 (общее «1–12»)" : ` · N = ${flats}`
      }`;

  const handleCopy = () => {
    const text = article + " — " + name;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <Card>
      <CardContent className="px-6">
        <h3 className="text-3xl font-semibold text-text">
          ⚡ Интерактивный подбор ЩЭ (1–12 квартир) + артикул
        </h3>

        <div className="bg-surface-container border rounded-xl p-6 my-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Способ монтажа
              </label>
              <select
                value={mount}
                onChange={(e) => setMount(e.target.value)}
                className="w-full p-2 border rounded-md bg-card text-text"
              >
                <option value="vstra">Встраиваемый</option>
                <option value="nakl">Накладной</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Количество квартир
              </label>
              <select
                value={flats}
                onChange={(e) => setFlats(Number(e.target.value))}
                className="w-full p-2 border rounded-md bg-card text-text"
              >
                <option value={0}>1–12 (общий)</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <option key={i} value={i}>
                    {i} {i === 1 ? "квартира" : i < 5 ? "квартиры" : "квартир"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Количество дверей
              </label>
              <select
                value={doors}
                onChange={(e) => setDoors(Number(e.target.value))}
                className="w-full p-2 border rounded-md bg-card text-text"
              >
                <option value={1}>1-дверный</option>
                <option value={2}>2-дверный</option>
                <option value={3}>3-дверный</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Слаботочный отсек
              </label>
              <select
                value={sc}
                onChange={(e) => setSc(e.target.value)}
                className="w-full p-2 border rounded-md bg-card text-text"
              >
                <option value="none">Нет</option>
                <option value="right">Справа</option>
                <option value="left">Слева</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Окошки
              </label>
              <select
                value={win}
                onChange={(e) => setWin(e.target.value)}
                className="w-full p-2 border rounded-md bg-card text-text"
              >
                <option value="yes">С окошками</option>
                <option value="no">Без окошек</option>
              </select>
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-slate-50 border-l-4 border-accent p-5 rounded-lg">
            <div className="text-xs uppercase text-muted-foreground font-bold tracking-wide mb-2">
              Подобранная позиция
            </div>

            <div className="flex items-baseline gap-3 flex-wrap mb-3">
              <span className="font-mono text-xl font-bold text-accent bg-white px-3 py-1 rounded-md border border-orange-200">
                {article}
              </span>
              {!err && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`text-xs px-3 py-1 rounded-md font-semibold text-white transition-colors ${
                    copied ? "bg-green-700" : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  {copied ? "✅ Скопировано" : "📋 Скопировать"}
                </button>
              )}
            </div>

            <div
              className={`text-base font-semibold mb-3 ${
                err ? "text-red-600" : "text-primary"
              }`}
            >
              {name}
            </div>

            {!err && (
              <>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-muted-foreground">
                    Габариты: <b className="text-text">{sizeDisp}</b>
                  </span>
                  <span className="text-muted-foreground">
                    IP: <b className="text-text">IP31</b>
                  </span>
                  <span className="text-muted-foreground">
                    Климат: <b className="text-text">УХЛ3</b>
                  </span>
                  <span className="text-muted-foreground">
                    Макс. счётчик: <b className="text-text">{METER_DIN} мм</b>
                  </span>
                </div>
                {hint && (
                  <div className="text-xs text-muted-foreground mt-3 p-2 bg-white rounded-md border">
                    {hint}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <h4 className="text-xl font-semibold text-text mt-6 mb-3">
          🧩 Кожух для накладного монтажа
        </h4>
        <div className="bg-orange-50 border border-dashed border-accent p-4 rounded-lg text-text">
          <p>
            Если щит встраиваемый, а монтаж требуется наружный — добавьте кожух:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <b>Со слаботочным отсеком</b> (щит 1000×950×135):{" "}
              <code className="bg-slate-100 px-1 rounded">995×945×160</code>
            </li>
            <li>
              <b>Без слаботочного отсека</b> (щит 1000×580×135):{" "}
              <code className="bg-slate-100 px-1 rounded">995×645×160</code>
            </li>
          </ul>
        </div>

        <p className="leading-[150%] text-text my-6">
          Для удобного поиска нужной спецификации в нашем каталоге по{" "}
          <strong>умолчанию</strong> работает умный фильтр. Вы можете
          отсортировать товары по <strong>наименованию</strong>, популярности у
          проектировщиков (<strong>рейтинг</strong>), а также настроить вывод
          позиций по <strong>возрастанию</strong> или <strong>убыванию</strong>{" "}
          стоимости. Это поможет максимально <strong>выгодно</strong> подобрать
          оборудование под ваш бюджет. Ниже представлена сводная матрица
          габаритов.
        </p>

        <h4 className="text-xl font-semibold text-text mt-6 mb-3">
          📋 Сводная таблица структурных групп
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-surface-container shadow-md border-collapse">
            <thead>
              <tr className="bg-surface-highest text-text">
                <th className="p-2 text-left font-bold">№</th>
                <th className="p-2 text-left font-bold">Монтаж</th>
                <th className="p-2 text-left font-bold">Двери</th>
                <th className="p-2 text-left font-bold">Слаботочка</th>
                <th className="p-2 text-left font-bold">Габариты, мм</th>
                <th className="p-2 text-left font-bold">
                  Макс. габариты счётчика, мм
                </th>
                <th className="p-2 text-left font-bold">Окошки</th>
                <th className="p-2 text-left font-bold">Кв.</th>
                <th className="p-2 text-left font-bold">Шаблон артикула</th>
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((g) => (
                <tr
                  key={g.n}
                  className="border-b hover:bg-card even:bg-primaryForeground"
                >
                  <td className="p-2 text-center">
                    <b>{g.n}</b>
                  </td>
                  <td className="p-2">{g.mount}</td>
                  <td className="p-2 text-center">{g.doors}</td>
                  <td className="p-2">{g.sc}</td>
                  <td className="p-2">
                    <b>{g.size}</b>
                  </td>
                  <td className="p-2 font-mono text-xs">{METER_DIN}</td>
                  <td
                    className={`p-2 ${
                      g.win === "С окошками"
                        ? "text-green-700 font-semibold"
                        : ""
                    }`}
                  >
                    {g.win}
                  </td>
                  <td className="p-2 text-center">1–12</td>
                  <td className="p-2 font-mono text-xs">{g.tpl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground italic mt-3">
          N — число квартир (1–12) или <b>0</b> для общего исполнения «на 1–12
          квартир». Суффикс{" "}
          <code className="bg-slate-100 px-1 rounded">-N</code> — накладной
          монтаж. Максимальные габариты счётчика указаны для крепления на
          DIN-рейке; при использовании перфорированной планки — до 210×150×115
          мм.
        </p>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   ОСНОВНОЙ КОНТЕНТ
   ============================================================ */
export function ShityEtazhnyeBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container mx-auto space-y-10 text-justify text-xl lg:text-2xl mt-16">
        {/* ---------- Единые стандарты качества ---------- */}
        <Card>
          <CardContent className="px-6">
            <h3 className="text-3xl leading-[100%] font-semibold text-text">
              Единые стандарты качества (Технические характеристики всех
              моделей)
            </h3>
            <p className="leading-[150%] text-text my-4">
              Независимо от выбранной модификации, каждый электрический щиток
              этажный нашего производства имеет усиленную базовую спецификацию:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text leading-[150%]">
              <li>
                <strong>Антикоррозийная защита:</strong> Применяется
                высококачественная порошковая краска RAL7035 (шагрень) от
                мирового бренда Jotun.
              </li>
              <li>
                <strong>Тотальное заземление:</strong> Приварные омеднённые
                заземляющие шпильки штатно установлены на всех элементах
                металлоконструкции (двери, панели, корпус). Все дверцы надёжно
                заземлены гибкими проводниками.
              </li>
              <li>
                <strong>Оцинкованные детали:</strong> Во всех отсеках
                применяются исключительно оцинкованные DIN-рейки, устойчивые к
                окислению во влажной среде.
              </li>
              <li>
                <strong>Удобство снятия показаний:</strong> Ударопрочные
                пластиковые ревизионные окошки устанавливаются строго по
                количеству обслуживаемых абонентов.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* ---------- Фото 3 стандарта качества ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <figure className="bg-card p-3 rounded-lg shadow-md">
            <Image
              src="/images/she-din-reyka.jpeg"
              alt="Оцинкованная DIN-рейка в этажном щите ЩЭ — крепление модульной автоматики и счётчиков"
              title="Оцинкованная DIN-рейка"
              width={600}
              height={450}
              className="w-full h-auto rounded-md"
            />
            <figcaption className="text-sm text-muted-foreground text-center mt-3 italic leading-snug">
              Оцинкованная DIN-рейка — устойчива к окислению, применяется для
              монтажа модульной автоматики и счётчиков.
            </figcaption>
          </figure>
          <figure className="bg-card p-3 rounded-lg shadow-md">
            <Image
              src="/images/she-zazemlyayushchaya-shpilka.jpeg"
              alt="Омеднённая заземляющая шпилька в этажном щите ЩЭ — приварная, для надёжного заземления корпуса и дверей"
              title="Омеднённая заземляющая шпилька"
              width={600}
              height={450}
              className="w-full h-auto rounded-md"
            />
            <figcaption className="text-sm text-muted-foreground text-center mt-3 italic leading-snug">
              Омеднённая заземляющая шпилька — приварная, обеспечивает надёжное
              заземление корпуса и дверей щита.
            </figcaption>
          </figure>
          <figure className="bg-card p-3 rounded-lg shadow-md">
            <Image
              src="/images/she-ral7035.jpeg"
              alt="Порошковая краска RAL7035 (шагрень) на корпусе этажного щита ЩЭ — антикоррозийное покрытие от бренда Jotun"
              title="Порошковая краска RAL7035"
              width={600}
              height={450}
              className="w-full h-auto rounded-md"
            />
            <figcaption className="text-sm text-muted-foreground text-center mt-3 italic leading-snug">
              Порошковая краска RAL7035 (шагрень) от Jotun — стойкое
              антикоррозийное покрытие корпуса щита.
            </figcaption>
          </figure>
        </div>

        {/* ---------- Детализация отсеков ---------- */}
        <Card>
          <CardContent className="px-6">
            <h3 className="text-3xl leading-[100%] font-semibold text-text">
              Детализация и назначение отсеков (Внутреннее устройство)
            </h3>
            <p className="leading-[150%] text-text my-4">
              Надёжный щит этажный распределительный конструктивно разделён на
              изолированные отсеки для соблюдения требований ПУЭ и
              пожаробезопасности:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text leading-[150%]">
              <li>
                <strong>Абонентский отсек (Автоматика):</strong> Оснащён
                дополнительной защитной фальшпанелью (<strong>панель</strong>
                -пластрон). Внутри устанавливается модульная автоматика и{" "}
                <strong>клеммный блок</strong> (или изолированная нулевая{" "}
                <strong>группа</strong>). Пластрон полностью закрывает силовые
                контакты, защищая жильцов от случайного прикосновения.
              </li>
              <li>
                <strong>Вводно-учётный отсек (Счётчики):</strong> Разделён на
                изолированные секции под <strong>счетчик</strong> на каждую
                квартиру. Установлен рубильник стояка, позволяющий при
                необходимости безопасно <strong>отсекать</strong> питание, и
                смотровые окна для удобного снятия показаний.
              </li>
              <li>
                <strong>Слаботочный отсек (Связь и ТВ):</strong> Имеет
                встроенные перфорированные полосы для фиксации кабелей связи.
                Для объектов со специфической планировкой доступно{" "}
                <strong>два</strong> типа компоновки: отсек{" "}
                <strong>слева</strong> (<strong>левосторонний</strong> вариант)
                или справа. Замки слаботочного и силовых отсеков имеют разную
                степень секретности.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* ---------- Фото отсеков ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <figure className="bg-card p-3 rounded-lg shadow-md">
            <Image
              src="/images/she-zakrytyy.jpeg"
              alt="Этажный щит ЩЭ в закрытом виде — металлический корпус с ревизионными окошками для снятия показаний счётчиков"
              title="Щит этажный ЩЭ — общий вид"
              width={600}
              height={450}
              className="w-full h-auto rounded-md"
            />
            <figcaption className="text-sm text-muted-foreground text-center mt-3 italic leading-snug">
              Общий вид: металлический корпус с ревизионными окошками.
            </figcaption>
          </figure>
          <figure className="bg-card p-3 rounded-lg shadow-md">
            <Image
              src="/images/she-otkrytyy.jpeg"
              alt="Этажный щит ЩЭ с открытыми дверцами — видны DIN-рейки, отсеки для счётчиков и абонентский отсек автоматики"
              title="Щит этажный ЩЭ — внутреннее устройство"
              width={600}
              height={450}
              className="w-full h-auto rounded-md"
            />
            <figcaption className="text-sm text-muted-foreground text-center mt-3 italic leading-snug">
              Внутреннее устройство: отсеки для счётчиков и автоматики.
            </figcaption>
          </figure>
          <figure className="bg-card p-3 rounded-lg shadow-md">
            <Image
              src="/images/she-bez-dverey.jpeg"
              alt="Этажный щит ЩЭ со снятой передней панелью — монтажные рамы, DIN-рейки и перфорированные полосы слаботочного отсека"
              title="Щит этажный ЩЭ — монтажные рамы и DIN-рейки"
              width={600}
              height={450}
              className="w-full h-auto rounded-md"
            />
            <figcaption className="text-sm text-muted-foreground text-center mt-3 italic leading-snug">
              Монтажные рамы, DIN-рейки и перфополосы слаботочного отсека.
            </figcaption>
          </figure>
        </div>

        {/* ---------- Комплектация и конструктивные особенности ---------- */}
        <Card>
          <CardContent className="px-6">
            <h3 className="text-3xl leading-[100%] font-semibold text-text">
              Комплектация и конструктивные особенности
            </h3>
            <p className="leading-[150%] text-text my-4">
              Каждый выпускаемый нами щит этажный поставляется в собранном виде,
              упакованным в прочный гофрокартон, и полностью готов к монтажу.
            </p>
            <h4 className="text-2xl font-semibold text-text mt-4 mb-2">
              Усиленная конструкция, монтаж и безопасность
            </h4>
            <ul className="list-disc list-inside space-y-1 text-text leading-[150%]">
              <li>
                <strong>Антивандальная защита:</strong>{" "}
                <strong>Усиленный</strong> цельносварной стальной{" "}
                <strong>корпус</strong> имеет степень защиты от механических
                воздействий IK05.
              </li>
              <li>
                <strong>Универсальный ввод:</strong> Конструкция оптимизирована
                для транзитной прокладки. Магистральный кабель заводится в{" "}
                <strong>отсек</strong> без разрезания жил.
              </li>
            </ul>
            <h4 className="text-2xl font-semibold text-text mt-4 mb-2">
              Базовый комплект поставки
            </h4>
            <p className="leading-[150%] text-text my-2">
              Приобретая продукцию у нас, вы получаете полный{" "}
              <strong>монтажный</strong> набор без скрытых доплат:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text leading-[150%]">
              <li>Металлический корпус с дверями и замками.</li>
              <li>
                Набор оцинкованных DIN-реек (каждая <strong>рейка</strong>{" "}
                защищена от коррозии).
              </li>
              <li>
                Шины N и PEN с изоляторами, маркировочная таблица и анкерный
                крепеж.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* ---------- Варианты исполнения ---------- */}
        <Card>
          <CardContent className="px-6">
            <h3 className="text-3xl leading-[100%] font-semibold text-text">
              Варианты исполнения под задачи объекта
            </h3>
            <p className="leading-[150%] text-text my-4">
              Мы предлагаем различные серии оборудования под задачи конкретных
              строительных объектов:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text leading-[150%]">
              <li>
                <strong>Серия «Стандарт / Эконом»:</strong> Базовый щит этажный,
                цена которого оптимизирована для массовой застройки. Толщина
                металла от 0.8 до 1 мм, надёжные замки.
              </li>
              <li>
                <strong>Серия «Антивандал / Премиум»:</strong> Прочный корпус ЩЭ
                из усиленного металла со сложными ригельными замками.
                Рекомендуется для ТСЖ и управляющих компаний.
              </li>
              <li>
                <strong>Реконструкция старого фонда:</strong> Конструкции
                поддерживают современные системы заземления TN-S, TN-C-S, TN-C с
                возможностью безопасного разделения PEN-проводника.
                Магистральные зажимы рассчитаны на питающие линии сечением до 70
                мм².
              </li>
              <li>
                <strong>Дизайнерское исполнение (для ЖК бизнес-класса):</strong>{" "}
                Помимо стандартного светло-серого цвета (RAL 7035), возможно
                окрашивание корпусов в любой оттенок по палитре RAL (включая
                популярные графит RAL 7024, матовый чёрный RAL 9005). Доступно
                проектирование щитов со скрытыми петлями и плоскими дверцами для
                бесшовной интеграции в современную отделку холлов.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* ---------- Фото дизайнерского исполнения ---------- */}
        <div className="my-8 text-center">
          <Image
            src="/images/matoviy-cherniy-ral9005.jpeg"
            alt="Щит этажный ЩЭ в дизайнерском исполнении — матовый чёрный RAL 9005, встраиваемый в кирпичную стену"
            title="Дизайнерский щит этажный RAL 9005"
            width={1200}
            height={800}
            className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
          />
          <p className="text-sm text-muted-foreground italic mt-2">
            Дизайнерское исполнение: матовый чёрный RAL 9005 со скрытыми петлями
            и плоскими дверцами.
          </p>
        </div>

        {/* ---------- ИНТЕРАКТИВНЫЙ ПОДБОР ---------- */}
        <SheConfigurator />

        {/* ---------- Техническая матрица ---------- */}
        <Card>
          <CardContent className="px-6">
            <h3 className="text-3xl leading-[100%] font-semibold text-text">
              Техническая матрица габаритов и стандартов
            </h3>
            <p className="leading-[150%] text-text my-4">
              Выбор габаритов зависит от типа монтажа, наличия слаботочного
              отсека и количества обслуживаемых абонентов.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full max-w-5xl mx-auto bg-surface-container shadow-md border-collapse">
                <thead>
                  <tr className="bg-surface-highest text-text">
                    <th className="p-3 text-left text-sm md:text-base font-bold">
                      Тип изделия
                    </th>
                    <th className="p-3 text-left text-sm md:text-base font-bold">
                      Количество квартир
                    </th>
                    <th className="p-3 text-left text-sm md:text-base font-bold">
                      Наличие слаботочного отсека
                    </th>
                    <th className="p-3 text-left text-sm md:text-base font-bold">
                      Габариты ниши (встраиваемые) (ШхВхГ)
                    </th>
                    <th className="p-3 text-left text-sm md:text-base font-bold">
                      Цена
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-card even:bg-primaryForeground">
                    <td className="p-3 text-sm md:text-base">ЩЭ-1 ... ЩЭ-4</td>
                    <td className="p-3 text-sm md:text-base">от 1 до 4</td>
                    <td className="p-3 text-sm md:text-base">Нет</td>
                    <td className="p-3 text-sm md:text-base">
                      1000 x 580 x 135 мм
                    </td>
                    <td className="p-3 text-sm md:text-base font-bold text-red-700 whitespace-nowrap">
                      от 5 815 ₽
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-card even:bg-primaryForeground">
                    <td className="p-3 text-sm md:text-base">ЩЭ-1 ... ЩЭ-4</td>
                    <td className="p-3 text-sm md:text-base">от 1 до 4</td>
                    <td className="p-3 text-sm md:text-base">Есть</td>
                    <td className="p-3 text-sm md:text-base">
                      950 × 1200 × 200 мм
                    </td>
                    <td className="p-3 text-sm md:text-base font-bold text-red-700 whitespace-nowrap">
                      от 7 935 ₽
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-card even:bg-primaryForeground">
                    <td className="p-3 text-sm md:text-base">ЩЭ-5 ... ЩЭ-8</td>
                    <td className="p-3 text-sm md:text-base">от 5 до 8</td>
                    <td className="p-3 text-sm md:text-base">
                      По выбору заказчика
                    </td>
                    <td className="p-3 text-sm md:text-base">
                      Уточняется по спецификации проекта
                    </td>
                    <td className="p-3 text-sm md:text-base font-bold text-red-700 whitespace-nowrap">
                      от 5 815 ₽
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-card even:bg-primaryForeground">
                    <td className="p-3 text-sm md:text-base">ЩЭ-9 ... ЩЭ-12</td>
                    <td className="p-3 text-sm md:text-base">от 9 до 12</td>
                    <td className="p-3 text-sm md:text-base">
                      По выбору заказчика
                    </td>
                    <td className="p-3 text-sm md:text-base">
                      Уточняется по спецификации проекта
                    </td>
                    <td className="p-3 text-sm md:text-base font-bold text-red-700 whitespace-nowrap">
                      от 5 815 ₽
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground italic mt-3">
              Для переоборудования встраиваемых моделей в навесные без долбления
              стен поставляется специальный корпус щита этажного навесного типа
              или отдельный защитный кожух.
            </p>
          </CardContent>
        </Card>

        {/* ---------- Промежуточная CTA ---------- */}
        <div className="bg-orange-50 border-l-4 border-accent p-5 rounded-lg flex flex-wrap items-center justify-between gap-4">
          <p className="text-text font-semibold m-0 text-lg">
            Нужен точный расчёт под ваш проект? Пришлите спецификацию — ответим
            в течение часа.
          </p>
          <Button
            onClick={() => handleButtonClick("Получить бесплатный расчёт")}
            className="btn-accent text-accent-foreground"
          >
            Получить бесплатный расчёт
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* ---------- Эксплуатационные характеристики ---------- */}
        <Card>
          <CardContent className="px-6">
            <h3 className="text-3xl leading-[100%] font-semibold text-text">
              Эксплуатационные характеристики и надежность
            </h3>
            <ul className="list-disc list-inside space-y-1 text-text leading-[150%] mt-4">
              <li>
                <strong>Температурный режим и срок службы:</strong> Расчетный
                срок службы металлокорпусов составляет не менее 25 лет.
                Оборудование выдерживает экстремальные перепады температур от
                -60 до +40 °C, сохраняя геометрию и целостность защитного
                порошкового покрытия.
              </li>
              <li>
                <strong>Теплоотдача и нагрузки:</strong> Максимальная
                статическая нагрузка на оболочку составляет 170 Н. Конструкция
                корпуса обеспечивает эффективный естественный отвод тепла
                (потеря эффективной мощности до 100,8 Вт для крупногабаритных
                моделей), что предотвращает ложное срабатывание модульных
                автоматов от перегрева в замкнутом пространстве.
              </li>
              <li>
                <strong>Ограничения монтажа:</strong> Степень защиты оболочки
                IP31 (и климатическое исполнение УХЛ3 / УХЛ4) требует установки
                оборудования исключительно внутри сухих, отапливаемых или
                неотапливаемых закрытых лестничных клеток. Монтаж на открытых
                балконах или фасадах зданий категорически запрещен.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* ---------- Производство нестандартных ЩЭ ---------- */}
        <Card>
          <CardContent className="px-6">
            <h3 className="text-3xl leading-[100%] font-semibold text-text">
              Производство нестандартных ЩЭ по индивидуальным чертежам
            </h3>
            <p className="leading-[150%] text-text my-4">
              Если вам требуется специфическое изготовление этажных щитов,
              нестандартный щит распределительный этажный купить по
              индивидуальному проекту или заказать щиты этажные квартирные под
              уникальную планировку реновации, наше собственное производство
              этажных щитов готово реализовать задачу любой сложности.
            </p>
            <ul className="list-disc list-inside space-y-1 text-text leading-[150%]">
              <li>
                <strong>Сроки расчёта:</strong> Инженерный расчёт и оценка
                стоимости проекта — от 1 часа.
              </li>
              <li>
                <strong>Сроки запуска:</strong> Производство партии стартует
                сразу после согласования конструкторской документации.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* ---------- Фото-инструкция и видео ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <Image
              src="/images/foto-instrukciya.jpg"
              alt="Фото-инструкция: как снять размеры этажного щита — измерить ширину и высоту каждого отсека, отправить размеры, получить расчёт и забрать готовый щит"
              title="Инструкция по снятию размеров ЩЭ"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <p className="text-sm text-muted-foreground text-center mt-2 italic">
              Пошаговая инструкция: измерьте отсеки на старом щитке и пришлите
              размеры нам.
            </p>
          </div>
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
              <iframe
                src="/video/insruction.mp4"
                title="Видео: производство этажных щитов ЩЭ"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2 italic">
              Видео о производстве этажных щитов и работе с нестандартными
              заказами.
            </p>
          </div>
        </div>

        {/* ---------- Кнопки: скачать / загрузить / отправить ---------- */}
        <div className="flex flex-wrap gap-3 mt-2">
          <a href="/docs/eskiz.pdf" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-orange-700 hover:bg-orange-800 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              📄 Скачать пустой эскиз-опросный лист (PDF)
            </Button>
          </a>
          <Button
            size="lg"
            onClick={() =>
              handleButtonClick("Загрузить чертёж или фото для расчёта")
            }
            className="btn-accent text-accent-foreground"
          >
            <Upload className="mr-2 h-4 w-4" />
            Загрузить чертёж или фото для расчёта
          </Button>
          <a href="mailto:info@electroshit-pro.ru">
            <Button size="lg" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Отправить ТЗ на e-mail
            </Button>
          </a>
        </div>
        <p className="text-sm text-muted-foreground italic mt-2">
          Скачайте чертёж-эскиз этажного щита, укажите ваши габариты, количество
          окошек и расположение отсеков, а затем прикрепите заполненный файл к
          форме заявки.
        </p>

        {/* ---------- Доставка и самовывоз ---------- */}
        <Card>
          <CardContent className="px-6">
            <h3 className="text-3xl leading-[100%] font-semibold text-text">
              Доставка и самовывоз
            </h3>
            <p className="leading-[150%] text-text my-4">
              Мы предлагаем <strong>выгодный</strong> прайс-лист не только на
              продукцию, но и на логистику. Отгрузка готовых изделий
              осуществляется с нашего центрального склада (логистический{" "}
              <strong>блок</strong>). По Москве возможен бесплатный самовывоз
              или адресная доставка на объект, а для регионов России —
              бесплатная сдача груза на терминалы транспортных компаний.
            </p>
            <ul className="list-disc list-inside space-y-1 text-text leading-[150%]">
              <li>
                <strong>Самовывоз (Москва):</strong> Бесплатная погрузка на ваш
                транспорт со склада по адресу: г. Москва, ул. Чермянская, д. 1,
                стр. 1, офис 214.
              </li>
              <li>
                <strong>Доставка по Москве и МО:</strong> Осуществляется
                собственным автопарком. При заказе на сумму от 70 000 руб.
                доставка на строительный объект выполняется бесплатно.
              </li>
              <li>
                <strong>Доставка по России:</strong> Мы бесплатно довозим и
                сдаём ваш груз на терминалы ведущих транспортных компаний
                (Деловые Линии, ПЭК, Байкал Сервис) в Москве для дальнейшей
                отправки в любой регион РФ.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* ---------- Техническая документация и сертификаты ---------- */}
        <Card>
          <CardContent className="px-6">
            <h3 className="text-3xl leading-[100%] font-semibold text-text">
              Техническая документация и сертификаты
            </h3>
            <p className="leading-[150%] text-text my-4">
              Для беспрепятственной сдачи объектов надзорным органам и
              эксплуатирующим организациям к каждой партии оборудования
              прилагается полный пакет документации:
            </p>
            <ul className="list-none p-0 space-y-3 text-text">
              <li className="bg-card p-3 rounded-md shadow-sm">
                <FileText className="inline h-5 w-5 mr-2 text-accent" />
                <a
                  href="/docs/sertifikat_sootvetstvia.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  📄 Скачать Сертификат соответствия ТУ 3434-002-52681400-2019
                  (PDF)
                </a>
              </li>
              <li className="bg-card p-3 rounded-md shadow-sm">
                <FileText className="inline h-5 w-5 mr-2 text-accent" />
                <a
                  href="/docs/eskiz.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  📐 Бланк-эскиз для самостоятельного нанесения размеров (PDF)
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* ---------- FAQ ---------- */}
        <Card>
          <CardContent className="px-6">
            <h3 className="text-3xl leading-[100%] font-semibold text-text mb-6">
              Вопросы и ответы
            </h3>

            <div className="space-y-6">
              {/* Q1 */}
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold text-text mb-2 leading-snug">
                  Как правильно называется электрощит в подъезде?
                </h4>
                <p className="leading-[150%] text-text mb-2">
                  Электрический щиток в подъезде имеет несколько официальных
                  названий, которые используются в нормативной документации и
                  среди профессионалов.
                </p>
                <p className="leading-[150%] text-text mb-1">
                  <strong>Основные официальные наименования:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-text leading-[150%]">
                  <li>
                    Этажный щит (ЩЭ) — наиболее распространённое и правильное
                    название;
                  </li>
                  <li>Этажный распределительный щиток (ЩЭР);</li>
                  <li>Щит этажный учётно-распределительный;</li>
                  <li>
                    Щит лестничный слаботочный (ЩЛС) — когда включает
                    слаботочный отсек;
                  </li>
                  <li>
                    Устройство этажное распределительное модернизированное
                    (УЭРМ).
                  </li>
                </ul>
                <p className="leading-[150%] text-text mt-2">
                  В профессиональной среде также используются аббревиатуры ШЭ и
                  ШЛС. Правильность названия зависит от конкретного типа и
                  назначения щита, но термин «этажный щит» является
                  универсальным и наиболее точным.
                </p>
              </div>

              {/* Q2 */}
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold text-text mb-2 leading-snug">
                  Что такое этажный распределительный щиток?
                </h4>
                <p className="leading-[150%] text-text mb-2">
                  Этажный распределительный щиток представляет собой
                  металлическое устройство, предназначенное для приёма,
                  распределения и учёта электроэнергии по квартирам одного
                  этажа. Это ключевой элемент системы электроснабжения
                  многоквартирных домов.
                </p>
                <p className="leading-[150%] text-text mb-1">
                  <strong>Основные функции:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-text leading-[150%]">
                  <li>
                    Приём электроэнергии от центральной магистрали (стояка);
                  </li>
                  <li>
                    Распределение электричества по квартирам (обычно 2–6
                    квартир);
                  </li>
                  <li>Учёт потребления электроэнергии каждой квартиры;</li>
                  <li>Защита линий от перегрузок и коротких замыканий;</li>
                  <li>
                    Обеспечение возможности отключения электроснабжения
                    отдельных квартир.
                  </li>
                </ul>
              </div>

              {/* Q3 */}
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold text-text mb-2 leading-snug">
                  Как устроен этажный щиток?
                </h4>
                <p className="leading-[150%] text-text mb-2">
                  Этажный щит состоит из двух или трёх основных отсеков, каждый
                  из которых выполняет определённую функцию.
                </p>
                <p className="leading-[150%] text-text mb-1">
                  <strong>Вводно-учётный отсек:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-text leading-[150%] mb-2">
                  <li>Размещение электросчётчиков (по количеству квартир);</li>
                  <li>
                    Автоматы защиты каждой квартиры от магистральной линии;
                  </li>
                  <li>Рубильник для отключения лестничного стояка;</li>
                  <li>Смотровые окна для считывания показаний счётчиков.</li>
                </ul>
                <p className="leading-[150%] text-text mb-1">
                  <strong>Распределительный (абонентский) отсек:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-text leading-[150%] mb-2">
                  <li>DIN-рейки для установки модульной автоматики;</li>
                  <li>Автоматические выключатели и УЗО;</li>
                  <li>Защитные устройства от перенапряжения;</li>
                  <li>До 9 модулей автоматики на каждую квартиру.</li>
                </ul>
                <p className="leading-[150%] text-text mb-1">
                  <strong>Слаботочный отсек:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-text leading-[150%]">
                  <li>Кабели телефонной связи, интернета;</li>
                  <li>Оборудование домофона и сигнализации;</li>
                  <li>Перфорированные полосы для крепления проводов.</li>
                </ul>
              </div>

              {/* Q4 */}
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold text-text mb-2 leading-snug">
                  Щит этажный размеры?
                </h4>
                <ul className="list-disc list-inside space-y-1 text-text leading-[150%]">
                  <li>Внешние габариты: 1000×950×140–160 мм;</li>
                  <li>Без слаботочного отсека: 1000×580×135 мм;</li>
                  <li>
                    Устанавливаются в специально подготовленные ниши в стене;
                  </li>
                  <li>Стандартный размер ниши: 880×830×130–140 мм.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ---------- CTA ---------- */}
        <Card id="calculate" className="bg-blue-50 border border-blue-200">
          <CardContent className="px-6 py-6">
            <h3 className="text-3xl leading-[100%] font-semibold text-text mb-4">
              Получить бесплатный расчёт стоимости ЩЭ
            </h3>
            <p className="leading-[150%] text-text mb-6">
              Отправьте нам ваш проект, чертёж или заполненный эскиз — инженеры
              рассчитают стоимость изготовления и сроки производства партии.
              Ответим в течение 1 часа в рабочее время.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+74993901467">
                <Button size="lg" className="btn-accent text-accent-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  Позвонить
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleButtonClick("Оставить заявку")}
              >
                Оставить заявку
              </Button>
            </div>
          </CardContent>
        </Card>

        <WorksGallery slug="se" />
        <PopularNabor excludeSlug="shity-etazhnye-she" />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialContent={modalContent}
        onSubmit={handleFormSubmit}
        submitError={error}
      />
    </>
  );
}
