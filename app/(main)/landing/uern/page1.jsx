import { Cable, Server, Shield, Home, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Устройство этажное распределительное блочное УЭРН | ЭЛЕКТРОЩИТ-ПРО",
  description: "Устройства этажные УЭРН по индивидуальному запросу",
};

export default function UERN() {
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
            <span className="font-medium text-gray-900 truncate">УЭРН</span>
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Устройство этажное распределительное навесное УЭРН
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Назначение
        </h2>
        <p className="text-gray-600">
          Устройство этажное распределительное навесное типа УЭРН предназначено
          для приема, распределения и учета электроэнергии в многоквартирных
          жилых домах. Оно обеспечивает защиту групповых линий квартир от
          перегрузок, короткого замыкания и токов утечки в сетях с
          глухозаземленной нейтралью (230/400 В, 50 Гц, TN-S, TN-C, TN-C-S), а
          также служит для размещения слаботочных систем (телефонной,
          телевизионной, интернет-сетей, сигнализации, АСКУЭ). УЭРН —
          современная альтернатива устаревшим этажным щитам типа ЩЭ, ЩЛС, УЭРП,
          отличающаяся полной оболочкой и простотой установки без ниши.
          Соответствует стандартам ГОСТ Р 51321.1-2007, ГОСТ IEC 60439.3-2012,
          ТР ТС 004/2011 и ТУ (например, ТУ 3434-002-52681400-2019 для EKF).
        </p>
        <ul className="list-disc pl-6 mt-2 text-gray-600">
          <li>
            Применение: Установка на стену лестничных площадок жилых зданий,
            коммунально-бытовых и общественных объектов.
          </li>
          <li>
            Обслуживание: До 12 квартир в зависимости от типа счетчиков и
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
          УЭРН представляет собой цельносварную металлическую конструкцию с
          полной оболочкой, закрытой со всех сторон, кроме отверстий для ввода и
          вывода кабелей. Корпус выполнен из листового металла с полиэфирным
          порошковым покрытием (RAL 7035, шагрень) для долговечности и эстетики.
          Устройство имеет навесное исполнение, что исключает необходимость
          подготовки ниши и штрабления стен. Внутренний объем разделен на отсеки
          металлическими перегородками для изоляции силовых и слаботочных линий,
          обеспечивая безопасность и удобство обслуживания.
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
              Предназначен для аппаратуры связи, интернета, телевидения,
              сигнализации, АСКУЭ. Оснащен отдельной запираемой дверью (4
              дверцы, угол открытия 120°).
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
              шинами N/PE, кабельными и плашечными зажимами для фазных, нулевых
              и защитных проводников.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <section>
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
                  <Zap className="mr-2" /> Технические характеристики
                </h2>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Номинальное напряжение: 230/400 В (AC), 50 Гц.</li>
                  <li>Системы заземления: TN-S, TN-C, TN-C-S.</li>
                  <li>
                    Номинальные токи выключателей: 25, 32, 40, 50, 63, 100, 125
                    А.
                  </li>
                  <li>Дифференциальные токи АВДТ/УЗО: 10, 30, 100, 300 мА.</li>
                  <li>Отключающая способность: ≥4,5 кА.</li>
                  <li>Максимальное сечение проводников: 95 мм².</li>
                  <li>Степень защиты: IP31 (фасад).</li>
                  <li>
                    Климатическое исполнение: УХЛ3 (температура от -25°C до
                    +40°C, влажность до 60% при +20°C, высота до 2000 м).
                  </li>
                  <li>
                    Материал корпуса: Листовой металл с полиэфирным порошковым
                    покрытием (RAL 7035, шагрень).
                  </li>
                  <li>
                    Габаритные размеры: 2700x1700x250 мм (EKF Basic, 12
                    квартир).
                  </li>
                  <li>Масса: ~21 кг (зависит от конфигурации).</li>
                  <li>
                    Способ установки: Навесной, крепление винтами или анкерами.
                  </li>
                  <li>
                    Дополнительные аксессуары: DIN-рейки, кронштейны, хомуты.
                  </li>
                  <li>Срок службы: До 25 лет, гарантия 3 года.</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
                  <Server className="mr-2" /> Преимущества УЭРН
                </h2>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>
                    Полная оболочка: Закрытая конструкция (кроме кабельных
                    отверстий) обеспечивает эстетичный вид и защиту
                    оборудования.
                  </li>
                  <li>
                    Простота установки: Навесной монтаж на стену без подготовки
                    ниши и штрабления, экономия времени и средств.
                  </li>
                  <li>
                    Большая вместимость: Обслуживание до 12 квартир, поддержка
                    одно- и трехфазных систем.
                  </li>
                  <li>
                    Безопасность: Металлические перегородки, защита от
                    перегрузок, короткого замыкания, токов утечки и пожаров.
                  </li>
                  <li>
                    Эстетика: Полиэфирное покрытие (RAL 7035) и аккуратный
                    дизайн для лестничных площадок.
                  </li>
                  <li>
                    Экологичное производство: Использование качественных
                    материалов, безопасных для окружающей среды.
                  </li>
                  <li>
                    Удобство обслуживания: Ревизионные окошки, широкий угол
                    открытия дверей (120°), односторонний доступ.
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-600">
              УЭРН выделяется полной оболочкой и простотой навесного монтажа,
              что делает его оптимальным для проектов, где важна быстрая
              установка без строительных работ.
            </p>
          </section>
        </div>
        <div className="flex justify-center items-center mt-8">
          <Image
            src="/images/landing/uern.png"
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
          В комплект поставки входят: Корпус УЭРН (цельносварной), двери отсеков
          (4 шт.), шины N/PE, DIN-рейки, паспорт, схемы подключения, сертификат
          соответствия.
        </p>
        <p className="text-gray-600">
          Не входят: Счетчики электроэнергии (например, Меркурий 200/230),
          фазные сжимы, УЗИП, замки (заказываются отдельно).
        </p>
        <p className="text-gray-600">
          По запросу: Дополнительные замки, документация, аксессуары (хомуты,
          кронштейны).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
          <Cable className="mr-2" /> Установка и эксплуатация
        </h2>
        <p className="text-gray-600">
          Монтаж: Навесной, крепление винтами или анкерами на стену лестничной
          площадки, кабели вводятся через отверстия Ø25–32 мм.
        </p>
        <p className="text-gray-600">
          Условия эксплуатации: УХЛ3, невзрывоопасная среда, защита от воды,
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
          Предлагаем купить этажное распределительное устройство УЭРН по
          выгодной цене в интернет-магазине нашей компании. Продукция доступна
          оптом и в розницу с быстрой доставкой по Москве, М.О.и всей России.
          Изготовление по индивидуальным проектам заказчика.
        </p>
        <p className="text-gray-600">Для заказа укажите:</p>

        <ul className="list-disc pl-6 text-gray-600 pb-4">
          <li>Количество квартир (1–12).</li>
          <li>Тип счетчиков и аппаратуры (одно-/трехфазные, АСКУЭ, УЗИП).</li>
          <li>Габариты, компоновку отсеков, цвет (RAL 7035).</li>
          <li>Дополнительные аксессуары (замки, кронштейны).</li>
        </ul>
        <p className="text-gray-600">
          Каталог, фото, схемы и отзывы доступны онлайн. Заказывайте
          качественное электрощитовое оборудование от производителя с доставкой!
        </p>
      </section>
    </div>
  );
}
