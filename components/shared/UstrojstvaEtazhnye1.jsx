"use client";

import Link from "next/link";

export function ShityEtazhnyeBottom() {
  return (
    <div className="container mx-auto p-6 bg-gray-50 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Типы этажных электрощитков по способу монтажа
      </h2>

      {/* Основные разделы: Способ монтажа */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          <Link href="#nakladnye" className="text-orange-500 hover:underline">
            Встраиваемые щиты
          </Link>
        </h2>
        <p className="mb-2 text-gray-600">
          Встраиваемые этажные щиты монтируются в специально подготовленную нишу
          в стене, обеспечивая максимально эстетичный внешний вид.
        </p>
        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Только фасадная панель выступает из плоскости стены</li>
          <li>Глубина встраиваемой части: 135-160 мм</li>
          <li>Степень защиты: IP31</li>
          <li>Высота установки: от 400 до 2000 мм от пола</li>
        </ul>
      </section>

      <section id="navesnye" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          <Link href="#nakladnye" className="text-orange-500 hover:underline">
            Навесные щиты
          </Link>
        </h2>
        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Весь корпус располагается снаружи</li>
          <li>Простота установки и обслуживания</li>
          <li>Не требуют создания ниши в стене</li>
          <li>Угол открытия дверей до 105°</li>
        </ul>
      </section>

      <section id="nakladnye" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          <Link href="#nakladnye" className="text-orange-500 hover:underline">
            Накладные щиты
          </Link>
        </h2>
        <p className="mb-2 text-gray-600">
          Накладные щиты этажные представляют собой лицевые панели без заднего
          каркаса. Используются при капитальном ремонте старого жилого фонда.
        </p>
        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Установка на существующие ниши без демонтажа старых щитов.</li>
          <li>Размеры по умолчанию: 1000х930х25 мм</li>
          <li>
            Цветовые варианты: RAL 7035 (серый), RAL 9016 (белый), RAL 7024
            (графитовый)
          </li>
        </ul>
      </section>
      <section id="nakladnye" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Конструктивные особенности слаботочных отсеков.
        </h2>
        <p className="mb-2 text-gray-600">Расположение слаботочного отсека.</p>
        <div>
          <h3 className="font-semibold mb-2">
            {" "}
            Слаботочный отсек может располагаться:
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>
              <Link
                href="#vstraivaemye"
                className="text-orange-500 hover:underline"
              >
                Справа от основного отсека
              </Link>
            </li>
            <li>
              <Link
                href="#navesnye"
                className="text-orange-500 hover:underline"
              >
                Слева от основного отсека
              </Link>
            </li>
            <li>
              <Link
                href="#nakladnye"
                className="text-orange-500 hover:underline"
              >
                Отсутствовать в базовых конфигурациях
              </Link>
            </li>
          </ul>
          <p>Размеры отсеков слаботочного оборудования: 30х30х15 см каждый.</p>
        </div>
      </section>
      <section id="nakladnye" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Назначение слаботочного отсека
        </h2>
        <p className="mb-2 text-gray-600">В слаботочном отсеке размещаются:</p>
        <ul className="list-disc list-inside mb-2 text-gray-600">
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
      </section>
      <section id="nakladnye" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Ревизионные окошки в этажных щитах
        </h2>

        <Link href="#nakladnye" className="text-orange-500 hover:underline">
          Щиты с ревизионным окошком
        </Link>
        <p className="my-2 text-gray-600">
          Ревизионные окошки обеспечивают возможность снятия показаний счетчиков
          без открытия основной дверцы щита. Они могут быть:
        </p>
        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Застекленными для защиты от пыли и влаги</li>
          <li>Различных размеров в зависимости от типа счетчика</li>
          <li>Расположены напротив каждого прибора учета</li>
        </ul>

        <Link href="#nakladnye" className="text-orange-500 hover:underline">
          Щиты без ревизионного окошка
        </Link>
        <p className="my-2 text-gray-600">
          Щиты без окошек имеют глухие металлические дверцы, что обеспечивает:
        </p>

        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Повышенную степень защиты IP31</li>
          <li>Более высокую безопасность оборудования</li>
          <li>Необходимость открытия дверцы для снятия показаний</li>
        </ul>
      </section>
      <section id="nakladnye" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Количество дверей в этажных щитах.
        </h2>
        <p className="mb-2 text-gray-600">Расположение слаботочного отсека.</p>
        <div>
          <h3 className="font-semibold mb-2"> Этажные щиты могут иметь:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>
              <Link
                href="#vstraivaemye"
                className="text-orange-500 hover:underline"
              >
                1 дверь - для компактных щитов на 1-2 квартиры
              </Link>
            </li>
            <li>
              <Link
                href="#navesnye"
                className="text-orange-500 hover:underline"
              >
                2 двери - стандартная конфигурация для щитов до 4 квартир
              </Link>
            </li>
            <li>
              <Link
                href="#nakladnye"
                className="text-orange-500 hover:underline"
              >
                3 двери - для щитов с раздельными отсеками (учетный,
                распределительный, слаботочный)
              </Link>
            </li>
          </ul>
          <p>
            Каждая дверца может быть оснащена индивидуальным замком для
            разграничения доступа.
          </p>
        </div>
      </section>
      <section id="nakladnye" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Количество квартир (счетчиков)
        </h2>

        <div>
          <h3 className="font-semibold mb-2">
            {" "}
            Этажные щиты производятся для обслуживания от 1 до 12 квартир:
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {[...Array(12)].map((_, i) => (
              <li key={i}>
                <Link
                  href={`#flat${i + 1}`}
                  className="text-orange-500 hover:underline"
                >
                  Щит этажный на {i + 1}{" "}
                  {i === 0 ? "квартиру" : i < 4 ? "квартиры" : "квартир"}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="nakladnye" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Модульные устройства этажные распределительные
        </h2>

        <Link href="#nakladnye" className="text-orange-500 hover:underline">
          УЭРМ (Устройства этажные распределительные модульные)
        </Link>
        <p className="my-2 text-gray-600">
          УЭРМ - современные модульные системы, состоящие из нескольких блоков:
        </p>
        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Короб электротехнический (КЭТ) для силовых кабелей</li>
          <li>Короб связи и сигнализации (КСС) для слаботочных сетей</li>
          <li>Ящики учетно-распределительные (ЯУР) для каждой квартиры</li>
          <li>Компенсаторы высоты для адаптации к потолкам</li>
        </ul>

        <Link href="#nakladnye" className="text-orange-500 hover:underline">
          УЭРБ (Устройства этажные распределительные блочные)
        </Link>
        <p className="my-2 text-gray-600">
          УЭРБ - блочные навесные устройства, представляющие собой улучшенную
          версию УЭРМ:
        </p>

        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Монтируются навесным способом без штробления стены</li>
          <li>Обслуживают до 9 квартир</li>
          <li>Состоят из 4 основных блоков</li>
        </ul>
        <Link href="#nakladnye" className="text-orange-500 hover:underline">
          УЭРВ (Устройства этажные распределительные встроенные)
        </Link>
        <p className="my-2 text-gray-600">
          УЭРВ - встроенные устройства современной модификации:
        </p>

        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Монтируются в специальную нишу в стене</li>
          <li>Обслуживают до 6 квартир</li>
          <li>Степень защиты IP31</li>
          <li>Разделены металлическими перегородками между отсеками</li>
        </ul>
        <Link href="#nakladnye" className="text-orange-500 hover:underline">
          УЭРК (Устройства этажные распределительные с кабельным отсеком)
        </Link>
        <p className="my-2 text-gray-600">
          УЭРК - устройства с отдельным кабельным отсеком:
        </p>

        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Обслуживают до 6 квартир</li>
          <li>Состоят из верхнего, среднего и нижнего отделений</li>
          <li>Занимают всю высоту помещения</li>
          <li>Подвесная конструкция учетно-распределительного короба</li>
        </ul>
        <Link href="#nakladnye" className="text-orange-500 hover:underline">
          УЭРН (Устройства этажные распределительные навесные)
        </Link>
        <p className="my-2 text-gray-600">УЭРН - навесные устройства:</p>

        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Устанавливаются на стену лестничной площадки</li>
          <li>Рассчитаны на обслуживание до 6 квартир</li>
          <li>Имеют защищенную оболочку со всех сторон кроме задней стенки</li>
          <li>Специальные отверстия с втулками для ввода проводов</li>
        </ul>
      </section>

      <section id="nakladnye" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Технические характеристики
        </h2>
        <p className="mb-2 text-gray-600">Основные параметры</p>
        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Номинальное напряжение: 220-380В</li>
          <li>Номинальный ток: 25-125А</li>
          <li>Степень защиты: IP31, IP54</li>
          <li>Климатическое исполнение: УХЛ4</li>
          <li>Материал корпуса: сталь с порошковым покрытием</li>
        </ul>

        <p className="mb-2 text-gray-600">Стандартные размеры</p>
        <ul className="list-disc list-inside mb-2 text-gray-600">
          <li>Встраиваемые: 1000х930х135 мм, 1000х960х157 мм</li>
          <li>Навесные: 940х870х135 мм, 900х600х135 мм</li>
          <li>Накладные: 1000х930х25 мм</li>
        </ul>
      </section>
    </div>
  );
}
