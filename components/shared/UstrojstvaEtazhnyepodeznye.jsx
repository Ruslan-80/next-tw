import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function UstrojstvaEtazhnyepodeznyeTop() {
  return (
    <section className="bg-gradient-metal animate-metal">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row shadow-xl items-center rounded-4xl py-12 mx-auto border border-blue-200">
          <div className="m-4">
            <Image
              src="/images/categories/SE24L.png"
              height={1000}
              width={1000}
              alt="Этажные электрические щиты (ЩЭ)"
              preload={true}
            />
          </div>

          <div className="text-justify text-xl lg:text-2xl p-8 mb-8">
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
            многоквартирных домов. Эти металлические изделия обеспечивают
            безопасный прием, распределение и учет электроэнергии напряжением
            220/380В, защищая электрические линии от перегрузок и коротких
            замыканий.
          </div>
        </div>
      </div>
    </section>
  );
}

export function UstrojstvaEtazhnyepodeznyeBottom() {
  return (
    <div className="container mx-auto p-6 space-y-10 text-xl lg:text-2xl mt-12">
      <h2 className="flex justify-center text-2xl lg:text-4xl font-bold text-text mb-10">
        Типы этажных электрощитков по способу монтажа
      </h2>

      {/* Встраиваемые */}
      <Card>
        <CardContent className="px-6">
          <Link
            href="shity-etazhnye-she-vstraivaemye"
            className="text-3xl font-semibold text-accent hover:underline"
          >
            Встраиваемые щиты
          </Link>
          <p className="text-text my-4">
            Этажные щиты такого вида монтируются в специально подготовленную
            нишу в стене, обеспечивая максимально эстетичный внешний вид.
          </p>
          <p className="text-text mb-4">Отличительные характеристики:</p>
          <ul className="list-disc list-inside space-y-1 text-text">
            <li>Только фасадная панель выступающая из плоскости</li>
            <li>Глубина внедряемой части: 135-160 мм</li>
            <li>Класс IP31</li>
            <li>Высота установки: от 400 до 2000 мм от пола</li>
          </ul>
        </CardContent>
      </Card>

      {/* Навесные */}
      <Card>
        <CardContent className="px-6">
          <Link
            href="shity-etazhnye-she-nakladnye"
            className="text-3xl font-semibold text-accent hover:underline"
          >
            Навесные щиты
          </Link>
          <p className="my-4 text-text">
            Такие этажные щиты имеют полный коробчатый корпус и монтируются
            непосредственно на поверхность стены.
          </p>
          <p className="text-text mb-4">Особенности:</p>
          <ul className="list-disc list-inside space-y-1 text-text">
            <li>Весь корпус располагается снаружи</li>
            <li>Простота установки и обслуживания</li>
            <li>Не требуют создания ниши</li>
            <li>Угол открытия дверей до 105°</li>
          </ul>
        </CardContent>
      </Card>

      {/* Накладные */}
      <Card>
        <CardContent className="px-6">
          <Link
            href="nakladki-shitov-etazhnyh-she"
            className="text-3xl font-semibold text-accent mb-4"
          >
            Накладные щиты
          </Link>
          <p className="text-text my-4">
            Щиты этажные такого исполнения представляют собой лицевые панели без
            заднего каркаса.
          </p>
          <p className="text-text mb-4">Применение:</p>
          <ul className="list-disc list-inside space-y-1 text-text">
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
        <CardContent className="px-6 space-y-4">
          <h2 className="text-3xl font-semibold text-accent">
            Конструктивные особенности слаботочных отсеков
          </h2>
          <p className="mb-2 text-text">В зависимости от модификации.</p>
          <p className="text-text">Слаботочный отсек может располагаться:</p>
          <ul className="list-disc list-inside space-y-1 text-text">
            <li>
              <Link
                href="shity-etazhnye-she-so-slabotochnym-otsekom"
                className="text-accent hover:underline"
              >
                Справа от основного отделения
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="shity-etazhnye-she?slabotochnyj-otsek=Слева"
                className="text-accent hover:underline"
              >
                Слева от основного
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="shity-etazhnye-she-bez-slabotochnogo-otseka"
                className="text-accent hover:underline"
              >
                Отсутствовать в базовых конфигурациях
              </Link>
            </li>
          </ul>
          <p className="text-text">
            Размеры отделений слаботочного оборудования: 30х30х15 см каждый.
          </p>
        </CardContent>
      </Card>

      {/* Назначение слаботочного отсека */}
      <Card>
        <CardContent className="px-6 space-y-3">
          <h2 className="text-3xl font-semibold text-accent hover:underline">
            Назначение слаботочного отсека
          </h2>
          <p className="text-text">В нем размещаются:</p>
          <ul className="list-disc list-inside space-y-1 text-text">
            <li>Телефонные линии и приборы</li>
            <li>Радиотрансляционные сети</li>
            <li>Телевизионная аппаратура</li>
            <li>Интернет-кабели</li>
            <li>Системы охранной сигнализации</li>
            <li>Домофонные агрегаты</li>
            <li>
              Оборудование АСКУЭ (автоматизированная система контроля и учета
              электропотребления)
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Ревизионные окошки */}
      <Card>
        <CardContent className="px-6 space-y-6">
          <h2 className="text-3xl font-semibold text-accent hover:underline">
            Ревизионные окошки
          </h2>
          <div>
            <Link
              href="shity-etazhnye-she?nalichie-revizionnogo-okoshka=да"
              className="text-accent hover:underline"
            >
              Щиты с ревизионным окошком
            </Link>
            <p className="text-text">
              С ними обеспечивается возможность снятия показаний счетчиков без
              открытия соответствующей дверцы щита.
            </p>
            <p className="text-text">Они бывают:</p>
            <ul className="list-disc list-inside space-y-1 text-text">
              <li>Застекленными для предотвращения попадания пыли и влаги</li>
              <li>Различных размеров для удобства снятия показаний</li>
              <li>Расположены напротив счетчиков</li>
              <li>Расположены напротив каждого прибора учета</li>
            </ul>
          </div>
          <div>
            <Link
              href="shity-etazhnye-she-bez-okon"
              className="text-accent hover:underline"
            >
              Щиты без ревизионного окошка
            </Link>
            <p className="text-text">
              Щиты такого плана имеют глухие металлические дверцы, что
              обеспечивает:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text">
              <li>Более высокую безопасность автоматики и электропроводки</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Количество дверей */}
      <Card>
        <CardContent className="px-6 space-y-3">
          <h2 className="text-3xl font-semibold text-accent hover:underline">
            Количество дверей в этажных щитах
          </h2>
          <p className="my-2 text-text">Этажные щиты могут иметь:</p>
          <ul className="list-disc list-inside space-y-1 text-text">
            <li>
              {" "}
              <Link
                href="shity-etazhnye-she?kolichestvo-dverej=1"
                className="text-accent hover:underline"
              >
                1 дверь - для компактных щитов на 1-2 квартиры
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="shity-etazhnye-she?kolichestvo-dverej=2"
                className="text-accent hover:underline"
              >
                2 двери - стандартная конфигурация для щитов до 4 квартир
              </Link>
            </li>
            <li>
              <Link
                href="shity-etazhnye-she?kolichestvo-dverej=3"
                className="text-accent hover:underline"
              >
                3 двери - для щитов с раздельными отсеками (учетный,
                распределительный, слаботочный)
              </Link>
            </li>
          </ul>
          <p className="text-text">
            Каждая из них оснащена индивидуальным замком для разграничения
            доступа.
          </p>
        </CardContent>
      </Card>

      {/* Количество квартир */}
      <Card>
        <CardContent className="px-6 space-y-3">
          <h2 className="text-3xl font-semibold text-accent hover:underline">
            Количество квартир (счетчиков)
          </h2>
          <p className="text-text">
            Этажные щиты производятся для обслуживания от 1 до 12 квартир:
          </p>
          <ul className="list-disc list-inside text-text space-y-1">
            <li key={0}>
              <Link
                href="shity-etazhnye-she-na-1-kvartiry"
                className="text-accent hover:underline"
              >
                Щит на 1
              </Link>
            </li>
            <li key={1}>
              <Link
                href="shity-etazhnye-she-na-2-kvartiry"
                className="text-accent hover:underline"
              >
                Щит на 2
              </Link>
            </li>
            <li key={2}>
              <Link
                href="shity-etazhnye-she-na-3-kvartiry"
                className="text-accent hover:underline"
              >
                Щит на 3
              </Link>
            </li>
            <li key={3}>
              <Link
                href="shity-etazhnye-she-na-4-kvartiry"
                className="text-accent hover:underline"
              >
                Щит на 4
              </Link>
            </li>
            <li key={4}>
              <Link
                href="shity-etazhnye-she-na-5-kvartir"
                className="text-accent hover:underline"
              >
                Щит на 5
              </Link>
            </li>
            <li key={5}>
              <Link
                href="shity-etazhnye-she-na-6-kvartir"
                className="text-accent hover:underline"
              >
                Щит на 6
              </Link>
            </li>
            <li key={6}>
              <Link
                href="shity-etazhnye-she-na-7-kvartir"
                className="text-accent hover:underline"
              >
                Щит на 7
              </Link>
            </li>
            <li key={7}>
              <Link
                href="shity-etazhnye-she-na-8-kvartir"
                className="text-accent hover:underline"
              >
                Щит на 8
              </Link>
            </li>
            <li key={8}>
              <Link
                href="shity-etazhnye-she-na-9-kvartir"
                className="text-accent hover:underline"
              >
                Щит на 9
              </Link>
            </li>
            <li key={9}>
              <Link
                href="shity-etazhnye-she-na-10-kvartir"
                className="text-accent hover:underline"
              >
                Щит на 10
              </Link>
            </li>
            <li key={10}>
              <Link
                href="shity-etazhnye-she?kolichestvo-kvartir-schetchikov=11"
                className="text-accent hover:underline"
              >
                Щит на 11
              </Link>
            </li>
            <li key={11}>
              <Link
                href="shity-etazhnye-she-na-12-kvartir"
                className="text-accent hover:underline"
              >
                Щит на 12
              </Link>
            </li>
          </ul>
          {/* <ul className="list-disc list-inside text-text space-y-1">
            {[...Array(12)].map((_, i) => (
              <li key={i}>
                <Link
                  href={`shity-etazhnye-she-na-${i + 1}-${
                    i === 0 ? "kvartiry" : i < 4 ? "kvartiry" : "kvartir"
                  }`}
                  className="text-accent hover:underline"
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
        <CardContent className="px-6 space-y-6">
          <h2 className="text-2xl font-semibold text-text">
            Модульные устройства этажные в подъезды
          </h2>
          <div>
            <Link href="/catalog/uerm" className="text-accent hover:underline">
              УЭРМ (Устройства этажные распределительные модульные)
            </Link>
            <p className="my-2 text-text">
              УЭРМ - современные электротехнические системы, состоящие из
              нескольких блоков:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text">
              <li>Короб электротехнический (КЭТ) для силовых кабелей</li>
              <li>Короб связи и сигнализации (КСС) для слаботочных сетей</li>
              <li>Ящики учетно-распределительные (ЯУР) для каждой квартиры</li>
              <li>Компенсаторы высоты для адаптации к потолкам</li>
            </ul>
          </div>
          <div>
            <Link href="/catalog/uerb" className="text-accent hover:underline">
              УЭРБ (Устройства этажные распределительные блочные)
            </Link>
            <p className="my-2 text-text">
              УЭРБ - блочные навесные конструкции, представляющие собой
              улучшенную версию УЭРМ:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text">
              <li>Монтируются упрощенным способом без штробления стены</li>
              <li>Обслуживают до 9 квартир</li>
              <li>Класс IP31</li>
              <li>Разделены металлическими перегородками между отсеками</li>
            </ul>
          </div>
          <div>
            <Link href="/catalog/uerv" className="text-accent hover:underline">
              УЭРВ (Устройства этажные распределительные встроенные)
            </Link>
            <p className="my-2 text-text">
              УЭРВ - встроенные электрощиты современной модификации:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text">
              <li>Монтируются в специальную нишу в стене</li>
              <li>Обслуживают до 6 квартир</li>
              <li>Степень IP31</li>
              <li>Разделены металлическими перегородками между отсеками</li>
            </ul>
          </div>
          <div>
            <Link href="/catalog/uerk" className="text-accent hover:underline">
              УЭРК (Устройства этажные распределительные с кабельным отсеком)
            </Link>
            <p className="my-2 text-text">
              УЭРК - изготавливаются с отдельным кабельным отсеком:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text">
              <li>Обслуживают до 6 квартир</li>
              <li>Состоят из верхнего, среднего и нижнего отделений</li>
              <li>Занимают всю высоту помещения</li>
              <li>Подвесная конструкция учетно-распределительного короба</li>
            </ul>
          </div>
          <div>
            <Link href="/catalog/uern" className="text-accent hover:underline">
              УЭРН (Устройства этажные распределительные навесные)
            </Link>
            <p className="my-2 text-text"></p>
            <ul className="list-disc list-inside space-y-1 text-text">
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
        <CardContent className="px-6 space-y-4">
          <h2 className="text-2xl font-semibold text-text">
            Технические характеристики
          </h2>
          <div>
            <h3 className="font-semibold text-text">Параметры</h3>
            <ul className="list-disc list-inside space-y-1 text-text">
              <li>Номинальное напряжение: 220-380В</li>
              <li>Частота тока: 50 Гц</li>
              <li>Номинальный ток: 25-125А</li>
              <li>Степень защиты: IP31, IP54</li>
              <li>Климатическое исполнение: УХЛ4</li>
              <li>Материал корпуса: сталь с порошковым покрытием</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-text">Стандартные размеры</h3>
            <ul className="list-disc list-inside space-y-1 text-text">
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
