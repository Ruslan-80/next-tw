import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function UstrojstvaEtazhnyepodeznyeTop() {
  return (
    <section>
      <div className="flex bg-blue-300/20 shadow-xl items-center rounded-4xl px-8 py-12 mx-auto border border-blue-200">
        <div className="m-4">
          <Image
            src="/images/categories/SE24L.png"
            height={1000}
            width={1000}
            alt="Этажные электрические щиты (ЩЭ)"
          />
        </div>

        <div className="text-justify text-2xl pl-8   mb-8">
          <Link
            href="shity-etazhnye-she"
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Этажные электрические щиты (ЩЭ)
          </Link>
          ,{" "}
          <Link
            href="nakladki-shitov-etazhnyh-she"
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Накладные щитки этажные
          </Link>{" "}
          и{" "}
          <Link
            href="ustroystva-etazhnye"
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Устройства этажные
          </Link>{" "}
          распределительные модульные (
          <Link
            href="uerm"
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            УЭРМ
          </Link>
          ,{" "}
          <Link
            href="uerb"
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            УЭРБ
          </Link>
          ,{" "}
          <Link
            href="uerk"
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            УЭРК
          </Link>
          ,{" "}
          <Link
            href="uerv"
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            УЭРВ
          </Link>
          ,{" "}
          <Link
            href="uern"
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            УЭРН
          </Link>
          ) являются ключевыми элементами электрической инфраструктуры
          многоквартирных домов. Эти устройства обеспечивают безопасный прием,
          распределение и учет электроэнергии напряжением 220/380В, защищая
          электрические линии от перегрузок и коротких замыканий.
        </div>
      </div>
    </section>
  );
}

export function UstrojstvaEtazhnyepodeznyeBottom() {
  return (
    <div className="container mx-auto p-6 space-y-10 text-2xl mt-12">
      <h2 className="flex justify-center text-4xl font-bold text-gray-900 mb-10">
        Типы этажных электрощитков по способу монтажа
      </h2>

      {/* Встраиваемые */}
      <Card>
        <CardContent className="px-6">
          <Link
            href="shity-etazhnye-she-vstraivaemye"
            className="text-3xl font-semibold text-orange-600 hover:underline"
          >
            Встраиваемые щиты
          </Link>
          <p className="text-gray-600 my-4">
            Встраиваемые этажные щиты монтируются в специально подготовленную
            нишу в стене, обеспечивая максимально эстетичный внешний вид.
          </p>
          <p className="text-gray-600 mb-4">Основные характеристики:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Только фасадная панель выступает из плоскости стены</li>
            <li>Глубина встраиваемой части: 135-160 мм</li>
            <li>Степень защиты: IP31</li>
            <li>Высота установки: от 400 до 2000 мм от пола</li>
          </ul>
        </CardContent>
      </Card>

      {/* Навесные */}
      <Card>
        <CardContent className="p-6">
          <Link
            href="shity-etazhnye-she-nakladnye"
            className="text-3xl font-semibold text-orange-600 hover:underline"
          >
            Навесные щиты
          </Link>
          <p className="my-4 text-gray-600">
            Навесные этажные щиты имеют полный коробчатый корпус и монтируются
            непосредственно на поверхность стены.
          </p>
          <p className="text-gray-600 mb-4">Особенности:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Весь корпус располагается снаружи</li>
            <li>Простота установки и обслуживания</li>
            <li>Не требуют создания ниши в стене</li>
            <li>Угол открытия дверей до 105°</li>
          </ul>
        </CardContent>
      </Card>

      {/* Накладные */}
      <Card>
        <CardContent className="p-6">
          <Link
            href="nakladki-shitov-etazhnyh-she"
            className="text-3xl font-semibold text-orange-600 mb-4"
          >
            Накладные щиты
          </Link>
          <p className="text-gray-600 my-4">
            Накладные щиты этажные представляют собой лицевые панели без заднего
            каркаса.
          </p>
          <p className="text-gray-600 mb-4">Применение:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Используются при капитальном ремонте старого жилого фонда</li>
            <li>Установка на существующие ниши без демонтажа старых щитов</li>
            <li>Размеры по умолчанию: 1000х930х25 мм</li>
            <li>
              Цветовые варианты: RAL 7035 (серый), RAL 9016 (белый), RAL 7024
              (графитовый)
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Слаботочные отсеки */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-3xl font-semibold text-orange-600">
            Конструктивные особенности слаботочных отсеков
          </h2>
          <p className="mb-2 text-gray-600">
            Расположение слаботочного отсека.
          </p>
          <p className="text-gray-600">
            Слаботочный отсек может располагаться:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              <Link
                href="shity-etazhnye-she-so-slabotochnym-otsekom"
                className="text-orange-500 hover:underline"
              >
                Справа от основного отсека
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="shity-etazhnye-she?slabotochnyj-otsek=Слева"
                className="text-orange-500 hover:underline"
              >
                Слева от основного отсека
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="shity-etazhnye-she-bez-slabotochnogo-otseka"
                className="text-orange-500 hover:underline"
              >
                Отсутствовать в базовых конфигурациях
              </Link>
            </li>
          </ul>
          <p className="text-gray-600">
            Размеры отсеков слаботочного оборудования: 30х30х15 см каждый.
          </p>
        </CardContent>
      </Card>

      {/* Назначение слаботочного отсека */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-orange-600">
            Назначение слаботочного отсека
          </h2>
          <p className="text-gray-600">В отсеке размещаются:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Телефонные линии и оборудование</li>
            <li>Радиотрансляционные сети</li>
            <li>Телевизионная аппаратура</li>
            <li>Интернет-кабели</li>
            <li>Системы охранной сигнализации</li>
            <li>Домофонное оборудование</li>
            <li>
              Оборудование АСКУЭ (автоматизированная система контроля и учета
              электропотребления)
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Ревизионные окошки */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-orange-600">
            Ревизионные окошки
          </h2>
          <div>
            <Link
              href="shity-etazhnye-she?nalichie-revizionnogo-okoshka=да"
              className="text-orange-500 hover:underline"
            >
              Щиты с ревизионным окошком
            </Link>
            <p className="text-gray-600">
              Ревизионные окошки обеспечивают возможность снятия показаний
              счетчиков без открытия основной дверцы щита.
            </p>
            <p className="text-gray-600">Они могут быть:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Застекленными для защиты от пыли и влаги</li>
              <li>Различных размеров в зависимости от типа счетчика</li>
              <li>Расположены напротив счетчиков</li>
              <li>Расположены напротив каждого прибора учета</li>
            </ul>
          </div>
          <div>
            <Link
              href="shity-etazhnye-she-bez-okon"
              className="text-orange-500 hover:underline"
            >
              Щиты без ревизионного окошка
            </Link>
            <p className="text-gray-600">
              Щиты без окошек имеют глухие металлические дверцы, что
              обеспечивает:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Повышенную степень защиты IP31</li>
              <li>Более высокую безопасность оборудования</li>
              <li>Необходимость открытия дверцы для снятия показаний</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Количество дверей */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-orange-600">
            Количество дверей в этажных щитах
          </h2>
          <p className="my-2 text-gray-600">Этажные щиты могут иметь:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              {" "}
              <Link
                href="shity-etazhnye-she?kolichestvo-dverej=1"
                className="text-orange-500 hover:underline"
              >
                1 дверь - для компактных щитов на 1-2 квартиры
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="shity-etazhnye-she?kolichestvo-dverej=2"
                className="text-orange-500 hover:underline"
              >
                2 двери - стандартная конфигурация для щитов до 4 квартир
              </Link>
            </li>
            <li>
              <Link
                href="shity-etazhnye-she?kolichestvo-dverej=3"
                className="text-orange-500 hover:underline"
              >
                3 двери - для щитов с раздельными отсеками (учетный,
                распределительный, слаботочный)
              </Link>
            </li>
          </ul>
          <p className="text-gray-600">
            Каждая дверца может быть оснащена индивидуальным замком для
            разграничения доступа.
          </p>
        </CardContent>
      </Card>

      {/* Количество квартир */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-orange-600">
            Количество квартир (счетчиков)
          </h2>
          <p className="text-gray-600">
            Этажные щиты производятся для обслуживания от 1 до 12 квартир:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li key={0}>
              <Link
                href="shity-etazhnye-she-na-1-kvartiry"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 1 квартиру
              </Link>
            </li>
            <li key={1}>
              <Link
                href="shity-etazhnye-she-na-2-kvartiry"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 2 квартиры
              </Link>
            </li>
            <li key={2}>
              <Link
                href="shity-etazhnye-she-na-3-kvartiry"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 3 квартиры
              </Link>
            </li>
            <li key={3}>
              <Link
                href="shity-etazhnye-she-na-4-kvartiry"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 4 квартиры
              </Link>
            </li>
            <li key={4}>
              <Link
                href="shity-etazhnye-she-na-5-kvartir"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 5 квартир
              </Link>
            </li>
            <li key={5}>
              <Link
                href="shity-etazhnye-she-na-6-kvartir"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 6 квартир
              </Link>
            </li>
            <li key={6}>
              <Link
                href="shity-etazhnye-she-na-7-kvartir"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 7 квартир
              </Link>
            </li>
            <li key={7}>
              <Link
                href="shity-etazhnye-she-na-8-kvartir"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 8 квартир
              </Link>
            </li>
            <li key={8}>
              <Link
                href="shity-etazhnye-she-na-9-kvartir"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 9 квартир
              </Link>
            </li>
            <li key={9}>
              <Link
                href="shity-etazhnye-she-na-10-kvartir"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 10 квартир
              </Link>
            </li>
            <li key={10}>
              <Link
                href="shity-etazhnye-she?kolichestvo-kvartir-schetchikov=11"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 11 квартир
              </Link>
            </li>
            <li key={11}>
              <Link
                href="shity-etazhnye-she-na-12-kvartir"
                className="text-orange-500 hover:underline"
              >
                Щит этажный на 12 квартир
              </Link>
            </li>
          </ul>
          {/* <ul className="list-disc list-inside text-gray-600 space-y-1">
            {[...Array(12)].map((_, i) => (
              <li key={i}>
                <Link
                  href={`shity-etazhnye-she-na-${i + 1}-${
                    i === 0 ? "kvartiry" : i < 4 ? "kvartiry" : "kvartir"
                  }`}
                  className="text-orange-500 hover:underline"
                >
                  Щит этажный на {i + 1}{" "}
                  {i === 0 ? "квартиру" : i < 4 ? "квартиры" : "квартир"}
                </Link>
              </li>
            ))}
          </ul> */}
        </CardContent>
      </Card>

      {/* Модульные устройства */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-orange-600">
            Модульные устройства этажные распределительные
          </h2>
          <div>
            <Link
              href="/catalog/uerm"
              className="text-orange-500 hover:underline"
            >
              УЭРМ (Устройства этажные распределительные модульные)
            </Link>
            <p className="my-2 text-gray-600">
              УЭРМ - современные модульные системы, состоящие из нескольких
              блоков:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Короб электротехнический (КЭТ) для силовых кабелей</li>
              <li>Короб связи и сигнализации (КСС) для слаботочных сетей</li>
              <li>Ящики учетно-распределительные (ЯУР) для каждой квартиры</li>
              <li>Компенсаторы высоты для адаптации к потолкам</li>
            </ul>
          </div>
          <div>
            <Link
              href="/catalog/uerb"
              className="text-orange-500 hover:underline"
            >
              УЭРБ (Устройства этажные распределительные блочные)
            </Link>
            <p className="my-2 text-gray-600">
              УЭРБ - блочные навесные устройства, представляющие собой
              улучшенную версию УЭРМ:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Монтируются навесным способом без штробления стены</li>
              <li>Обслуживают до 9 квартир</li>
              <li>Степень защиты IP31</li>
              <li>Разделены металлическими перегородками между отсеками</li>
            </ul>
          </div>
          <div>
            <Link
              href="/catalog/uerv"
              className="text-orange-500 hover:underline"
            >
              УЭРВ (Устройства этажные распределительные встроенные)
            </Link>
            <p className="my-2 text-gray-600">
              УЭРВ - встроенные устройства современной модификации:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Монтируются в специальную нишу в стене</li>
              <li>Обслуживают до 6 квартир</li>
              <li>Степень защиты IP31</li>
              <li>Разделены металлическими перегородками между отсеками</li>
            </ul>
          </div>
          <div>
            <Link
              href="/catalog/uerk"
              className="text-orange-500 hover:underline"
            >
              УЭРК (Устройства этажные распределительные с кабельным отсеком)
            </Link>
            <p className="my-2 text-gray-600">
              УЭРК - устройства с отдельным кабельным отсеком:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Обслуживают до 6 квартир</li>
              <li>Состоят из верхнего, среднего и нижнего отделений</li>
              <li>Занимают всю высоту помещения</li>
              <li>Подвесная конструкция учетно-распределительного короба</li>
            </ul>
          </div>
          <div>
            <Link
              href="/catalog/uern"
              className="text-orange-500 hover:underline"
            >
              УЭРН (Устройства этажные распределительные навесные)
            </Link>
            <p className="my-2 text-gray-600">УЭРН - навесные устройства:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Устанавливаются на стену лестничной площадки</li>
              <li>Рассчитаны на обслуживание до 6 квартир</li>
              <li>
                Имеют защищенную оболочку со всех сторон кроме задней стенки
              </li>
              <li>Специальные отверстия с втулками для ввода проводов</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Технические характеристики */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-orange-600">
            Технические характеристики
          </h2>
          <div>
            <h3 className="font-semibold text-gray-800">Основные параметры</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Номинальное напряжение: 220-380В</li>
              <li>Частота тока: 50 Гц</li>
              <li>Номинальный ток: 25-125А</li>
              <li>Степень защиты: IP31, IP54</li>
              <li>Климатическое исполнение: УХЛ4</li>
              <li>Материал корпуса: сталь с порошковым покрытием</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Стандартные размеры</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Встраиваемые: 1000х930х135 мм, 1000х960х157 мм</li>
              <li>Навесные: 940х870х135 мм, 900х600х135 мм</li>
              <li>Накладные: 1000х930х25 мм</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
