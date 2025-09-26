import { Cable, Server, Shield, Home, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Устройство этажное распределительное блочное УЭРВ | ЭЛЕКТРОЩИТ-ПРО",
  description: "Устройства этажные УЭРВ по индивидуальному запросу",
};

export default function UERV() {
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
            <span className="font-medium text-gray-900 truncate">УЭРВ</span>
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Устройство этажное распределительное встроенное УЭРВ
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Назначение
        </h2>
        <p className="text-gray-600">
          Устройство этажное распределительное встроенное типа УЭРВ
          предназначено для приема, распределения и учета электроэнергии в
          многоквартирных жилых домах. Оно обеспечивает защиту групповых линий
          квартир от перегрузок, короткого замыкания и токов утечки в сетях с
          глухозаземленной нейтралью (230/400 В, 50 Гц, TN-S, TN-C, TN-C-S), а
          также служит для размещения слаботочных систем (телефонной,
          телевизионной, интернет-сетей, сигнализации, АСКУЭ). УЭРВ —
          современная альтернатива устаревшим этажным щитам типа ЩЭ, ЩЛС, УЭРП,
          предлагая комплексное электрощитовое решение с высокой надежностью и
          эстетикой. Соответствует стандартам ГОСТ Р 51321.1-2007, ГОСТ IEC
          60439.3-2012, ТР ТС 004/2011 и ТУ (например, ТУ 3434-002-52681400-2019
          ).
        </p>
        <ul className="list-disc pl-6 mt-2 text-gray-600">
          <li>
            Применение: Установка в подготовленную нишу на этажах жилых зданий.
          </li>
          <li>
            Обслуживание: До 6–10 квартир в зависимости от типа счетчиков и
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
          УЭРВ представляет собой пространственную металлическую конструкцию,
          встроенную в нишу, открытую со всех сторон, кроме фасада. Корпус
          выполнен из листового металла с полиэфирным порошковым покрытием (RAL
          9003, шагрень), обеспечивающим долговечность и эстетику. Верхняя и
          нижняя части каркаса оснащены коробами ТБ, зашиваемыми листами ГВЛ для
          интеграции в интерьер многоквартирных домов. Внутренний объем разделен
          на отсеки металлическими перегородками для безопасной прокладки
          силовых и слаботочных линий.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <Home className="mr-2" /> Отсеки
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Слаботочный отсек
            </h3>
            <p className="text-gray-600">
              Расположен слева, предназначен для аппаратуры связи, интернета,
              телевидения, сигнализации, АСКУЭ. Оснащен отдельной запираемой
              дверью с индивидуальным замком.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Вводно-учетный отсек
            </h3>
            <p className="text-gray-600">
              Справа от слаботочного, для установки счетчиков электроэнергии
              (например, Меркурий 200/230) и выключателей-разъединителей. Имеет
              ревизионное окошко для контроля показаний.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Распределительный отсек
            </h3>
            <p className="text-gray-600">
              Над учетным или совмещен с ним, для автоматических выключателей,
              АВДТ, УЗО, УЗИП (до 12–24 модулей на квартиру). Обеспечивает
              защиту от перегрузок и короткого замыкания.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Отсек силовых магистралей
            </h3>
            <p className="text-gray-600">
              Слева или у задней стенки, поддерживает до 2 питающих стояков
              (рабочий и транзитный). Оснащен шинами N/PE, кабельными и
              плашечными зажимами для фазных, нулевых и защитных проводников.
            </p>
          </div>
        </div>
        <p className="text-gray-600 mt-4">
          Каждый отсек имеет дверь на петлях с замком (универсальный или
          индивидуальный по заказу), обеспечивая удобство обслуживания и
          безопасность.
        </p>
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
                несмонтированном состоянии, зависит от ниши).
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
                Габаритные размеры: От 1200x1200x200 мм (зависит от количества
                квартир и конфигурации).
              </li>
              <li>Масса: ~52 кг (зависит от модели).</li>
              <li>
                Способ установки: Встроенный, крепление анкерами в
                подготовленную нишу.
              </li>
              <li>
                Дополнительные аксессуары: Кронштейны, люк для розетки,
                Z-образные профили, DIN-рейки.
              </li>
              <li>Срок службы: До 25 лет, гарантия 3 года.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
              <Server className="mr-2" /> Преимущества УЭРВ
            </h2>
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                Компактное встроенное исполнение: Идеально для ниш в панельных и
                монолитных домах, экономия пространства.
              </li>
              <li>
                Эстетичная интеграция: Короба ТБ и ГВЛ обеспечивают аккуратный
                вид, подходящий для современных жилых зданий.
              </li>
              <li>
                Универсальность: Поддержка одно- и трехфазных систем,
                обслуживание до 10 квартир.
              </li>
              <li>
                Безопасность: Металлические перегородки, защита от перегрузок,
                короткого замыкания, токов утечки и пожаров.
              </li>
              <li>
                Гибкость: Индивидуальная компоновка отсеков, габаритов и
                аппаратуры по техническому заданию заказчика.
              </li>
              <li>
                Качественное производство: Экологически чистые материалы,
                полиэфирное покрытие, соответствие ГОСТ и ТР ТС.
              </li>
              <li>
                Простота обслуживания: Ревизионные окошки, удобные замки,
                односторонний доступ.
              </li>
            </ul>
          </section>
        </div>
        <div className="flex justify-center items-center mt-8 ">
          <Image
            src="/images/landing/uerv.jpg"
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
          В комплект поставки входят: Каркас УЭРВ, двери отсеков, шины N/PE,
          DIN-рейки, Z-образные профили, ключи (1 на замок), паспорт, схемы
          подключения, сертификат соответствия.
        </p>
        <p className="text-gray-600">
          Не входят: Счетчики электроэнергии (например, Меркурий 200/230),
          фазные сжимы, УЗИП (заказываются отдельно).
        </p>
        <p className="text-gray-600">
          По запросу: Дополнительные ключи, документация, аксессуары
          (кронштейны, хомуты).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <Cable className="mr-2" /> Установка и эксплуатация
        </h2>
        <p className="text-gray-600">
          Монтаж: Встраивается в подготовленную нишу, крепление анкерами, кабели
          вводятся через отверстия Ø25–32 мм.
        </p>
        <p className="text-gray-600">
          Условия эксплуатации: УХЛ4, невзрывоопасная среда, защита от воды,
          радиации, ударов.
        </p>
        <p className="text-gray-600">
          Режим работы: Продолжительный, одностороннее обслуживание на
          лестничных площадках.
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
          Предлагаем купить этажное распределительное устройство УЭРВ по
          выгодной цене в интернет-магазине нашей компании. Продукция доступна
          оптом и в розницу с быстрой доставкой по Москве, М.О. и всей России.
          Изготовление по индивидуальным проектам заказчика.
        </p>
        <p className="text-gray-600">Для заказа укажите:</p>
        <ul className="list-disc pl-6 text-gray-600 pb-4">
          <li>Количество квартир (1–10).</li>
          <li>Тип счетчиков и аппаратуры (одно-/трехфазные, АСКУЭ, УЗИП).</li>
          <li>Габариты, компоновку отсеков, цвет (RAL 9003/7035).</li>
          <li>Дополнительные аксессуары (кронштейны, замки).</li>
        </ul>
        <p className="text-gray-600">
          Каталог, фото, схемы и отзывы доступны онлайн. Заказывайте
          качественное электрощитовое оборудование от производителя с доставкой!
        </p>
      </section>
    </div>
  );
}
