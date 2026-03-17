import { Breadcrumb } from "@/components/ui/breadcrumb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Статья о щите этажном ЩЭ | ЭЛЕКТРОЩИТ-ПРО",
  date: "2025-11-01",
  description: "Статья о щите этажном ЩЭ",
  image: "/images/categories/SE24L.png",
  robots: {
    index: true,
    follow: true,
  },
};

export default function Blog() {
  return (
    <>
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
                href="/blogs"
              >
                Статьи
              </Link>
            </li>

            <li className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>
              <span className="font-medium text-gray-900 truncate">
                Щит этажный ЩЭ
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 lg:p-12">
          {/* Заголовок статьи */}
          {/* <header className="mb-10 border-b pb-4 border-blue-200 dark:border-blue-700">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Щит этажный ЩЭ: расключение, монтаж и выбор — полное руководство
              2025
            </h1>
          </header> */}
          <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Левая часть: текст и соцсети */}
            <div className="lg:col-span-7">
              {/* Дата и автор */}
              <div>
                <div className="text-gray-400 text-sm">
                  24&nbsp;ноября&nbsp;2024 &nbsp; &mdash; &nbsp; Шамиль
                  Дашыпылов
                </div>
                <h1 className="text-4xl font-bold mt-4 mb-6 leading-tight">
                  TCL представила первый в мире 4K-монитор с технологией IJP
                  OLED
                </h1>
              </div>
              {/* Социальные иконки */}
              <div className="mt-8">
                <span className="text-gray-500 mr-2">Поделиться:</span>
                <div className="inline-flex gap-2 align-middle">
                  <span className="w-8 h-8 rounded-full bg-black inline-block" />
                  <span className="w-8 h-8 rounded-full bg-black inline-block" />
                  <span className="w-8 h-8 rounded-full bg-black inline-block" />
                  <span className="w-8 h-8 rounded-full bg-black inline-block" />
                  <span className="w-8 h-8 rounded-full bg-black inline-block" />
                </div>
              </div>
            </div>
            {/* Правая часть: изображение */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-blue-50/50 rounded-[2rem] -z-10 group-hover:bg-blue-100/50 transition-colors duration-500" />
              <video
                src="/video/Box.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-contain rounded-2xl shadow-2xl shadow-blue-900/10"
              />
            </div>
          </section>

          {/* Вводный абзац */}
          <section className="text-sm text-gray-700 dark:text-gray-300 mb-8 space-y-6">
            <p>
              Щит этажный (ЩЭ) является критически важным элементом
              электроснабжения многоквартирных домов, обеспечивающим безопасное
              распределение электроэнергии между квартирами. Правильное
              расключение, качественный монтаж и грамотный выбор компонентов
              напрямую влияют на надежность и безопасность всей электрической
              системы здания.
            </p>
          </section>

          {/* Что такое щит этажный ЩЭ */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Что такое щит этажный ЩЭ
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Щит этажный (ЩЭ) — металлический распределительный шкаф для
              приема, учета и распределения электроэнергии напряжением 380/220В
              между квартирами одного этажа. Устройство выполняет функции защиты
              от перегрузок и коротких замыканий, учета электропотребления и
              размещения слаботочных сетей.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Основные функции этажного щита
            </h3>
            <ul className="text-xl list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300">
              <li>
                Прием электроэнергии от питающего стояка без разрезания
                магистрали
              </li>
              <li>
                Распределение питания по квартирам этажа через индивидуальные
                автоматы
              </li>
              <li>
                Учет электропотребления однофазными счетчиками электроэнергии
              </li>
              <li>
                Защита от аварийных ситуаций — КЗ, перегрузки, утечки тока на
                землю
              </li>
              <li>
                Размещение слаботочных сетей — интернет, домофон, ТВ, охранная
                сигнализация
              </li>
            </ul>
          </section>

          {/* Конструкция и устройство ЩЭ */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Конструкция и устройство ЩЭ
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-xl">
              Современный этажный щит изготавливается из стали толщиной 1-1,2 мм
              с антикоррозийным полимерно-порошковым покрытием серого цвета RAL
              7035. Степень защиты корпуса IP31 обеспечивает защиту от твердых
              частиц размером более 2,5 мм и капель воды.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Основные отсеки этажного щита
            </h3>
            <ol className="text-xl list-decimal list-inside space-y-4 pl-4 text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-medium text-gray-900 dark:text-white">
                  Вводно-учетный отсек
                </span>
                <ul className="list-disc list-inside space-y-1 pl-6 text-lg">
                  <li>
                    <span className="font-medium">Размещение:</span>{" "}
                    электросчетчики и вводные автоматические выключатели
                  </li>
                  <li>
                    <span className="font-medium">Оборудование:</span>{" "}
                    однофазные счетчики по количеству квартир
                  </li>
                  <li>
                    <span className="font-medium">Особенности:</span> прозрачные
                    смотровые окна для снятия показаний без вскрытия щита
                  </li>
                  <li>
                    <span className="font-medium">Защита:</span> индивидуальные
                    замки с уникальными ключами
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-medium text-gray-900 dark:text-white">
                  Распределительный отсек
                </span>
                <ul className="list-disc list-inside space-y-1 pl-6 text-lg">
                  <li>
                    <span className="font-medium">Назначение:</span> установка
                    защитной и коммутационной аппаратуры
                  </li>
                  <li>
                    <span className="font-medium">Оборудование:</span> DIN-рейки
                    для модульных автоматов, УЗО, дифавтоматов
                  </li>
                  <li>
                    <span className="font-medium">Компоненты:</span> нулевые
                    шины N и защитные шины PE, соединительные перемычки
                  </li>
                  <li>
                    <span className="font-medium">Безопасность:</span> съемная
                    фальш-панель для защиты от случайного прикосновения
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-medium text-gray-900 dark:text-white">
                  Слаботочный отсек
                </span>
                <ul className="list-disc list-inside space-y-1 pl-6 text-lg">
                  <li>
                    <span className="font-medium">Назначение:</span> размещение
                    телефонного, телевизионного и интернет-оборудования
                  </li>
                  <li>
                    <span className="font-medium">Конструкция:</span>{" "}
                    перфорированные планки для крепления кабелей и коробок
                  </li>
                  <li>
                    <span className="font-medium">Применение:</span> домофонные
                    системы, видеонаблюдение, пожарная сигнализация
                  </li>
                  <li>
                    <span className="font-medium">Разделение:</span> изолирован
                    от силового отсека специальными перегородками
                  </li>
                </ul>
              </li>
            </ol>
          </section>

          {/* Виды этажных щитов по способу установки */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Виды этажных щитов по способу установки
            </h2>

            <div className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Встраиваемые щиты ЩЭ
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700 dark:text-gray-300 text-lg">
                  <li>
                    <span className="font-medium">Применение:</span> для скрытой
                    проводки в новостройках
                  </li>
                  <li>
                    <span className="font-medium">Монтаж:</span> установка в
                    специально подготовленные ниши в стенах
                  </li>
                  <li>
                    <span className="font-medium">Преимущества:</span>{" "}
                    эстетичный вид, экономия места в коридоре
                  </li>
                  <li>
                    <span className="font-medium">Ограничения:</span> запрещена
                    установка в несущие стены
                  </li>
                  <li>
                    <span className="font-medium">Размеры ниш:</span>{" "}
                    стандартные 950 x 900 x 140 мм, возможны индивидуальные
                    варианты
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Навесные (накладные) щиты ЩЭН
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700 dark:text-gray-300 text-lg">
                  <li>
                    <span className="font-medium">Применение:</span> для
                    открытой проводки, при модернизации сетей
                  </li>
                  <li>
                    <span className="font-medium">Монтаж:</span> крепление к
                    стене анкерными болтами
                  </li>
                  <li>
                    <span className="font-medium">Преимущества:</span> простота
                    установки, не требуется подготовка ниш
                  </li>
                  <li>
                    <span className="font-medium">Недостатки:</span> выступают
                    от стены, занимают больше места
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Технические характеристики ЩЭ */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Технические характеристики ЩЭ
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Основные параметры
            </h3>
            <ul className="text-lg list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300">
              <li>
                Номинальное напряжение: 380/220В переменного тока частотой 50 Гц
              </li>
              <li>Номинальный ток: до 100А на вводе, 50А на квартиру</li>
              <li>
                Система заземления: TN-S, TN-C-S с глухозаземленной нейтралью
              </li>
              <li>Количество квартир: от 1 до 8 квартир (стандартно 2-6) </li>
              <li>
                Срок службы: до 25 лет при соблюдении условий эксплуатации
              </li>
              <li>Гарантийный срок: не менее 2 лет</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
              Условия эксплуатации
            </h3>
            <ul className="text-lg list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300">
              <li>Температура: от +1°C до +35°C</li>
              <li>Влажность: до 80% при температуре +25°C</li>
              <li>Высота над уровнем моря: до 1000 м</li>
              <li>Исключается: токопроводящая пыль, агрессивные пары и газы</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
              Требования ПУЭ к установке
            </h3>
            <ul className="text-lg list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300">
              <li>Расстояние от стояка: не более 3 м по длине проводки</li>
              <li>Высота установки: от 0,4 до 2,0 м от пола</li>
              <li>Высота органов управления: 0,7-1,9 м от пола</li>
              <li>Высота измерительных приборов: 1,0-1,8 м от пола</li>
            </ul>
          </section>

          {/* Расключение этажного щита: пошаговая инструкция */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Расключение этажного щита: пошаговая инструкция
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Подготовительные работы
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              Перед началом расключения необходимо полностью обесточить щит и
              убедиться в отсутствии напряжения. Составляется подробная схема
              подключения с указанием всех потребителей и их характеристик.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Необходимый инструмент
                </h4>
                <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700 dark:text-gray-300 text-lg">
                  <li>Крестовые и шлицевые отвертки различных размеров</li>
                  <li>Кусачки, стрипперы для зачистки проводов</li>
                  <li>Пресс-клещи для опрессовки наконечников НШVI</li>
                  <li>Мультиметр, указатель напряжения для проверок</li>
                  <li>Маркер для маркировки проводов и групп </li>
                </ul>
              </div>

              <div className="p-4 border border-green-300 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Материалы для монтажа
                </h4>
                <ul className="list-disc list-inside space-y-1 pl-4 text-gray-700 dark:text-gray-300 text-lg">
                  <li>Автоматические выключатели соответствующих номиналов</li>
                  <li>УЗО и дифференциальные автоматы для защиты от утечек </li>
                  <li>
                    Соединительные гребенки (шинопроводы) для фазных соединений
                  </li>
                  <li>
                    Провода ПуГВ для внутренних соединений сечением 6 мм²{" "}
                  </li>
                  <li>
                    Наконечники НШVI для опрессовки многожильных проводов{" "}
                  </li>
                  <li>Кабельные стяжки и маркировочные элементы </li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
              Основные этапы расключения
            </h3>
            <ol className="text-lg list-decimal list-inside space-y-4 pl-4 text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-medium text-gray-900 dark:text-white">
                  Этап 1: Разделение PEN проводника
                </span>
                <p className="pl-4 mt-1 ">
                  Критически важный этап — правильное разделение совмещенного
                  PEN проводника на рабочий нуль N и защитное заземление PE.
                  Сечение нулевого проводника стояка должно быть не менее 16 мм²
                  для алюминия или 10 мм² для меди. Устанавливаются отдельные
                  сжимы типа "орех" для N и PE проводников на магистральном
                  стояке. Главная заземляющая шина PE подключается к корпусу
                  щита отдельным проводником соответствующего сечения.
                </p>
              </li>
              <li>
                <span className="font-medium text-gray-900 dark:text-white">
                  Этап 2: Установка модульного оборудования
                </span>
                <p className="pl-4 mt-1 ">
                  На DIN-рейки устанавливаются вводные автоматические
                  выключатели для каждой квартиры, обычно двухполюсные на 50А.
                  Монтируются групповые автоматы и УЗО согласно разработанной
                  схеме распределения нагрузок. Нулевые шины N и защитные шины
                  PE устанавливаются с соответствующей цветовой маркировкой —
                  синей для нуля и желто-зеленой для заземления.
                </p>
              </li>
              <li>
                <span className="font-medium text-gray-900 dark:text-white">
                  Этап 3: Выполнение внутренних соединений
                </span>
                <p className="pl-4 mt-1">
                  Фазные соединения между автоматами выполняются с помощью
                  соединительных гребенок (шинопроводов). Это обеспечивает
                  надежный контакт и аккуратный внешний вид сборки. Все PE
                  проводники подключаются к общей шине заземления. Сечение
                  защитного проводника должно соответствовать фазному до 16 мм².
                  Между УЗО и групповыми автоматами устанавливаются
                  соединительные перемычки.
                </p>
              </li>
              <li>
                <span className="font-medium text-gray-900 dark:text-white">
                  Этап 4: Подключение отходящих линий
                </span>
                <div className="pl-4 mt-1">
                  Кабели от каждой квартиры подключаются к соответствующим
                  автоматам с обязательной маркировкой всех проводников:
                  <ul className="list-disc list-inside space-y-1 pl-6 mt-1 ">
                    <li>Фазные: L1, L2, L3 (коричневый, черный, серый)</li>
                    <li>Нулевой рабочий: N (синий)</li>
                    <li>Защитный: PE (желто-зеленый)</li>
                  </ul>
                  Многожильные провода обязательно опрессовываются наконечниками
                  НШVI. Это предотвращает распушивание жил и обеспечивает
                  надежный контакт.
                </div>
              </li>
            </ol>
          </section>

          {/* Схемы подключения этажных щитов */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Схемы подключения этажных щитов
            </h2>

            <div className="space-y-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Однофазная схема подключения
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3 text-lg ">
                  В однофазной схеме от стояка приходит один фазный провод,
                  нулевой рабочий и защитный проводники. После вводного
                  двухполюсного автомата устанавливается счетчик электроэнергии,
                  затем УЗО на 30мА для защиты от утечек тока.
                </p>
                <p className="font-mono bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2 rounded text-sm">
                  Схема подключения: Стояк $\rightarrow$ Вводный автомат
                  $\rightarrow$ Счетчик $\rightarrow$ УЗО $\rightarrow$
                  Групповые автоматы $\rightarrow$ Квартира
                </p>
              </div>

              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Трехфазная схема подключения
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3 text-lg ">
                  При трехфазном питании от стояка приходят три фазы, нулевой
                  рабочий и защитный проводники. Устанавливается трехполюсный
                  вводный автомат и трехфазный счетчик электроэнергии.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Нагрузки равномерно распределяются по трем фазам — каждая
                  квартира получает одну фазу напряжением 220В. Мощные
                  потребители типа электроплит могут подключаться трехфазно.
                </p>
              </div>
            </div>
          </section>

          {/* Типичные ошибки при монтаже ЩЭ */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Типичные ошибки при монтаже ЩЭ
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Ошибки выбора оборудования
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg ">
              Использование некачественных автоматических выключателей дешевых
              брендов приводит к ненадежной защите и возможному залипанию
              контактов. Неправильный расчет номиналов может привести к ложным
              срабатываниям или отказу в работе при аварийных режимах.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Ошибки монтажа
            </h3>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300 mb-6 text-lg ">
              <li>
                <span className="font-medium">
                  Подключение разносечных проводов в одну клемму
                </span>{" "}
                категорически запрещено. Попадание изоляции в зажимы контактов
                нарушает надежность соединения.{" "}
              </li>
              <li>
                <span className="font-medium">
                  Отсутствие опрессовки многожильных проводников
                </span>{" "}
                наконечниками приводит к распушиванию жил и ухудшению
                контакта.{" "}
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Ошибки в расключении
            </h3>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300 text-lg ">
              <li>
                <span className="font-medium">
                  Подключение нулей от разных УЗО в одну общую шину
                </span>{" "}
                приводит к ложным срабатываниям защиты. Путаница в цветовой
                маркировке проводов создает опасность при обслуживании.{" "}
              </li>
              <li>
                <span className="font-medium">
                  Неправильное разделение PEN проводника
                </span>{" "}
                может привести к появлению опасного потенциала на корпусах
                оборудования.{" "}
              </li>
            </ul>
          </section>

          {/* Техническое обслуживание и эксплуатация */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Техническое обслуживание и эксплуатация
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Периодичность осмотров
            </h3>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300 text-lg ">
              <li>
                <span className="font-medium">Ежемесячно:</span> визуальный
                осмотр, проверка нагрева корпусов автоматов
              </li>
              <li>
                <span className="font-medium">Ежеквартально:</span> проверка
                работы УЗО кнопкой "ТЕСТ"
              </li>
              <li>
                <span className="font-medium">Ежегодно:</span> измерение
                сопротивления изоляции, проверка заземления
              </li>
              <li>
                <span className="font-medium">По необходимости:</span> подтяжка
                контактных соединений после 3-4 недель эксплуатации
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
              Признаки неисправности
            </h3>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300 text-lg ">
              <li>Нагрев корпусов автоматических выключателей</li>
              <li>Запах гари или оплавленной изоляции</li>
              <li>Искрение в контактных соединениях</li>
              <li>Ложные срабатывания защитных устройств</li>
              <li>Отсутствие срабатывания УЗО при нажатии кнопки "ТЕСТ"</li>
            </ul>
          </section>

          {/* Стоимость и выбор поставщика */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Стоимость и выбор поставщика
            </h2>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Ценовые категории
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg ">
              В нашем магазине вы сможете приобрести как полноценные щиты
              этажные, так и накладки на щиты щэ:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300 mb-6 text-lg ">
              <li>
                <span className="font-medium">
                  Бюджетные решения (от 4000 руб.):
                </span>{" "}
                Накладки щитов этажных ЩЭ
              </li>
              <li>
                <span className="font-medium">
                  Более дорогой сегмент (от 6000 руб.):
                </span>{" "}
                Щиты этажные типа ЩЭ
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Факторы ценообразования
            </h3>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300 text-lg ">
              <li>Количество квартир и соответственно объем оборудования</li>
              <li>Бренд и качество используемых компонентов </li>
              <li>Сложность электрической схемы подключения</li>
              <li>
                Дополнительные опции — антивандальность, нестандартные
                размеры{" "}
              </li>
              <li>
                Региональные особенности ценообразования на монтажные работы
              </li>
            </ul>
          </section>

          {/* Заключение */}
          <footer className="pt-8 border-t border-blue-200 dark:border-blue-700 text-lg ">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Заключение
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Этажный щит ЩЭ является критически важным элементом системы
              электроснабжения, требующим профессионального подхода к
              проектированию, монтажу и эксплуатации. Правильное расключение с
              соблюдением всех технических требований обеспечивает безопасную и
              надежную работу электроустановки на протяжении всего срока службы.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              Экономия на качестве оборудования и квалификации монтажников
              недопустима, так как может привести к серьезным аварийным
              ситуациям. Инвестиции в качественный этажный щит и
              профессиональный монтаж окупаются безопасностью эксплуатации и
              долговечностью оборудования.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
