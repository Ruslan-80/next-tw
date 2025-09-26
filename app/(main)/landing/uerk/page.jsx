import { Cable, Server, Shield, Home, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Устройство этажное распределительное блочное УЭРК | ЭЛЕКТРОЩИТ-ПРО",
  description: "Устройства этажные УЭРК по индивидуальному запросу",
};

export default function UERK() {
  return (
    <div className="container mx-auto p-6 bg-gray-50 text-2xl">
      <nav className="py-4">
        <ol className="hidden md:flex flex-wrap items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/">Главная</Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <Link
              className="hover:text-orange-400 transition-colors truncate"
              href="/catalog/schity-etazhnye-i-ustroystva-podezdnye"
            >
              Щиты этажные и устройства подъездные
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <Link
              className="hover:text-orange-400 transition-colors truncate"
              href="/catalog/ustroystva-etazhnye"
            >
              Устройства этажные
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-900 truncate">УЭРК</span>
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Устройство этажное распределительное с кабельным отсеком УЭРК
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Назначение
        </h2>
        <p className="text-gray-600">
          Устройство этажное распределительное с кабельным отсеком типа УЭРК
          предназначено для приема, распределения и учета электроэнергии в
          многоквартирных жилых домах. Оно обеспечивает защиту групповых линий
          квартир от перегрузок, короткого замыкания и токов утечки в сетях с
          глухозаземленной нейтралью (230/400 В, 50 Гц, TN-S, TN-C, TN-C-S), а
          также служит для размещения слаботочных систем (телефонной,
          телевизионной, интернет-сетей, сигнализации, АСКУЭ). УЭРК —
          современная альтернатива устаревшим этажным щитам типа ЩЭ, ЩЛС, УЭРП,
          УЭРС, отличающаяся наличием отдельного кабельного отсека и повышенной
          жесткостью конструкции. Соответствует стандартам ГОСТ Р 51321.1-2007,
          ГОСТ IEC 60439.3-2012, ТР ТС 004/2011.
        </p>
        <ul className="list-disc pl-6 mt-2 text-gray-600">
          <li>
            Применение: Установка на этажах жилых зданий, коммунально-бытовых и
            общественных объектов.
          </li>
          <li>
            Обслуживание: До 6–12 квартир в зависимости от типа счетчиков и
            конфигурации.
          </li>
          <li>
            Универсальность: Поддержка однофазных (до 11 кВт) и трехфазных (до
            32 кВт) систем для эффективного контроля расхода электроэнергии.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <Shield className="mr-2" /> Конструкция
        </h2>
        <p className="text-gray-600">
          УЭРК представляет собой сборную металлическую конструкцию, состоящую
          из трех секций (нижний, средний, верхний отсеки), выполненных из
          листового металла с полиэфирным порошковым покрытием (RAL 9003/7035,
          шагрень) для долговечности и эстетики. Устройство имеет навесное
          исполнение, но может встраиваться в подготовленную нишу. Отличительной
          особенностью является отдельный кабельный отсек (КСС), разделенный
          металлической перегородкой по всей высоте для изоляции слаботочных
          линий от силовых. Верхний отсек оснащен компенсатором высоты для
          адаптации к высоте потолка (например, до 3050 мм). Конструкция
          собирается болтовыми соединениями, обеспечивая жесткость и удобство
          транспортировки.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <Home className="mr-2" /> Отсеки
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Слаботочный отсек (КСС)
            </h3>
            <p className="text-gray-600">
              Расположен в отдельном кабельном отсеке, предназначен для
              аппаратуры связи, интернета, телевидения, сигнализации, АСКУЭ.
              Оснащен запираемой дверью с индивидуальным замком.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Вводно-учетный отсек
            </h3>
            <p className="text-gray-600">
              Для установки счетчиков электроэнергии (например, Меркурий
              200/230) и выключателей-разъединителей. Имеет ревизионное окошко
              для контроля показаний.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Распределительный отсек
            </h3>
            <p className="text-gray-600">
              Для автоматических выключателей, АВДТ, УЗО, УЗИП (до 12 модулей на
              квартиру). Обеспечивает защиту от перегрузок и короткого
              замыкания.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Отсек силовых магистралей
            </h3>
            <p className="text-gray-600">
              Поддерживает до 2 питающих стояков (рабочий и транзитный), оснащен
              шинами N/PE, кабельными и плашечными зажимами. Нижний отсек
              включает место для ответвительных сжимов или РБП.
            </p>
          </div>
          <p className="text-gray-600">
            Каждый отсек имеет дверь на качественных петлях с замком
            (универсальный или индивидуальный по заказу), упрощающий
            обслуживание.
          </p>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
              <Zap className="mr-2" /> Технические характеристики
            </h2>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Номинальное напряжение: 230/400 В (AC), 50 Гц.</li>
              <li>Системы заземления: TN-S, TN-C, TN-C-S.</li>
              <li>
                Номинальные токи выключателей: 25, 32, 40, 50, 63, 100, 125 А.
              </li>
              <li>Дифференциальные токи АВДТ/УЗО: 10, 30, 100, 300 мА.</li>
              <li>Отключающая способность: ≥4,5 кА.</li>
              <li>Максимальное сечение проводников: 95 мм².</li>

              <li>
                Степень защиты: IP31 (фасад), IP00 (остальные стороны в
                несмонтированном состоянии, для встроенных зависит от ниши).
              </li>
              <li>
                Климатическое исполнение: УХЛ4 (температура от -25°C до +40°C,
                влажность до 60% при +20°C, высота до 2000 м).
              </li>
              <li>
                Материал корпуса: Листовой металл с полиэфирным порошковым
                покрытием (RAL 9003/7035, шагрень).
              </li>
              <li>
                Габаритные размеры: Высота до 3050 мм (с компенсатором), ширина
                и глубина зависят от конфигурации (например, 300x150 мм для
                отсека).
              </li>
              <li>Масса: ~21–52 кг (зависит от конфигурации).</li>
              <li>
                Способ установки: Навесной (болтовое соединение) или встроенный
                в подготовленную нишу.
              </li>
              <li>
                Дополнительные аксессуары: Кронштейны, хомуты, DIN-рейки,
                компенсатор высоты.
              </li>
              <li>Срок службы: До 25 лет, гарантия 3 года.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
              <Server className="mr-2" /> Преимущества УЭРК
            </h2>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                Отдельный кабельный отсек: Полная изоляция слаботочных линий от
                силовых, повышающая безопасность и удобство.
              </li>
              <li>
                Быстрая установка: Трехсекционная конструкция и болтовое
                соединение сокращают время монтажа по сравнению с УЭРМ.
              </li>
              <li>
                Компенсатор высоты: Адаптация к различным высотам потолков
                (например, до 3050 мм).
              </li>
              <li>
                Жесткая конструкция: Высокая надежность благодаря качественной
                фурнитуре (петли, замки) и болтовым соединениям.
              </li>
              <li>
                Универсальность: Поддержка одно- и трехфазных систем,
                обслуживание до 12 квартир.
              </li>
              <li>
                Эстетика: Полиэфирное покрытие обеспечивает аккуратный вид на
                лестничных площадках.
              </li>
              <li>
                Удобство транспортировки: Разделение на три секции упрощает
                доставку на объект.
              </li>
            </ul>
            <p className="text-gray-600 pt-4">
              УЭРК выделяется отдельным кабельным отсеком и компенсатором
              высоты, что делает его оптимальным для проектов, требующих
              быстрого монтажа и структурированной прокладки кабелей.
            </p>
          </section>
        </div>
        <div className="flex justify-center items-center mt-8">
          <Image
            src="/images/landing/uerk.png"
            alt="UERV"
            width={300}
            height={300}
            className="object-contain max-h-180 w-auto hover:scale-115 transition-transform transform duration-300"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Комплектность
        </h2>
        <p className="text-gray-600">
          В комплект поставки входят: Корпус УЭРК (трехсекционный), двери
          отсеков, шины N/PE, DIN-рейки, компенсатор высоты, ключи (1 на замок),
          паспорт, схемы подключения, сертификат соответствия.
        </p>
        <p className="text-gray-600">
          Не входят: Счетчики электроэнергии (например, Меркурий 200/230),
          фазные сжимы, УЗИП (заказываются отдельно).
        </p>
        <p className="text-gray-600">
          По запросу: Дополнительные ключи, документация, аксессуары (хомуты,
          кронштейны).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <Cable className="mr-2" /> Установка и эксплуатация
        </h2>
        <p className="text-gray-600">
          Монтаж: Навесной (болтовое соединение) или встроенный в подготовленную
          нишу, кабели вводятся через отверстия Ø25–32 мм, компенсатор высоты
          адаптирует к потолку.
        </p>
        <p className="text-gray-600">
          Не входят: Счетчики электроэнергии (например, Меркурий 200/230),
          фазные сжимы, УЗИП (заказываются отдельно).
        </p>
        <p className="text-gray-600">
          По запросу: Дополнительные ключи, документация, аксессуары (хомуты,
          кронштейны).
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <Home className="mr-2" /> Вам так же может быть интересно
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/catalog/uerv"
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800">УЭРВ</h3>
            <p className="text-gray-600">
              Встроенное, в нишу, открыто кроме фасада, ГВЛ-отделка.
            </p>
          </Link>
          <Link
            href="/catalog/uerb"
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800">УЭРБ</h3>
            <p className="text-gray-600">
              Блочное, навесное/встроенное, выламываемые отверстия.
            </p>
          </Link>
          <Link
            href="/catalog/uern"
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800">УЭРН</h3>
            <p className="text-gray-600">
              Навесное, полная оболочка, до 12 квартир.
            </p>
          </Link>
          <Link
            href="/catalog/uerk"
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800">УЭРК</h3>
            <p className="text-gray-600">
              Навесное с кабельным отсеком, компенсатор высоты.
            </p>
          </Link>
          <Link
            href="/catalog/uerm"
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800">УЭРМ</h3>
            <p className="text-gray-600">
              Модульное, сборное, для домов без ниш.
            </p>
          </Link>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Заказ и покупка
        </h2>
        <p className="text-gray-600">
          Предлагаем купить этажное распределительное устройство УЭРК по
          выгодной цене в интернет-магазине нашей компании. Продукция доступна
          оптом и в розницу с быстрой доставкой по Москве, Краснодару и всей
          России. Изготовление по индивидуальным проектам заказчика.
        </p>
        <p className="text-gray-600">Для заказа укажите:</p>

        <ul className="list-disc pl-6 text-gray-600 pb-4">
          <li>Количество квартир (1–12).</li>
          <li>Тип счетчиков и аппаратуры (одно-/трехфазные, АСКУЭ, УЗИП).</li>
          <li>Компоновку отсеков, габариты, цвет (RAL 9003/7035).</li>
          <li>Дополнительные аксессуары (компенсатор, замки).</li>
        </ul>
        <p className="text-gray-600">
          Каталог, фото, схемы и отзывы доступны онлайн. Заказывайте
          качественное электрощитовое оборудование от производителя с доставкой!
        </p>
      </section>
    </div>
  );
}
