"use client";

import { useState } from "react";
import WorksGallery from "@/components/imageDoPosle";

export default function ComponentsFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqs = [
    {
      question: "Как правильно называется электрощит в подъезде?",
      answer: (
        <div className="space-y-2">
          <p>
            Электрический щиток в подъезде имеет несколько официальных названий,
            которые используются в нормативной документации и среди
            профессионалов:
          </p>
          <p className="font-semibold">Основные официальные наименования:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Этажный щит (ЩЭ)</strong> — наиболее распространенное и
              правильное название
            </li>
            <li>
              <strong>Этажный распределительный щиток (ЩЭР)</strong>
            </li>
            <li>
              <strong>Щит этажный учетно-распределительный</strong>
            </li>
            <li>
              <strong>Щит лестничный слаботочный (ЩЛС)</strong> — когда включает
              слаботочный отсек
            </li>
            <li>
              <strong>
                Устройство этажное распределительное модернизированное (УЭРМ)
              </strong>
            </li>
          </ul>
          <p>
            В профессиональной среде также используются аббревиатуры{" "}
            <strong>ШЭ</strong> и <strong>ШЛС</strong>. Правильность названия
            зависит от конкретного типа и назначения щита, но термин{" "}
            <strong>"этажный щит"</strong> является универсальным и наиболее
            точным.
          </p>
        </div>
      ),
    },
    {
      question: "Что такое этажный распределительный щиток?",
      answer: (
        <div className="space-y-2">
          <p>
            Этажный распределительный щиток представляет собой металлическое
            устройство, предназначенное для{" "}
            <strong>приема, распределения и учета электроэнергии</strong> по
            квартирам одного этажа. Это ключевой элемент системы
            электроснабжения многоквартирных домов.
          </p>
          <p className="font-semibold">Основные функции:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Прием электроэнергии от центральной магистрали (стояка)</li>
            <li>
              Распределение электричества по квартирам (обычно 2-6 квартир)
            </li>
            <li>Учет потребления электроэнергии каждой квартиры</li>
            <li>Защита линий от перегрузок и коротких замыканий</li>
            <li>
              Обеспечение возможности отключения электроснабжения отдельных
              квартир
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "Как устроен этажный щиток?",
      answer: (
        <div className="space-y-3">
          <p>
            Этажный щит состоит из{" "}
            <strong>двух или трех основных отсеков</strong>, каждый из которых
            выполняет определенную функцию:
          </p>

          <p className="font-semibold">Вводно-учетный отсек:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Размещение электросчетчиков (по количеству квартир)</li>
            <li>Автоматы защиты каждой квартиры от магистральной линии</li>
            <li>Рубильник для отключения лестничного стояка</li>
            <li>Смотровые окна для считывания показаний счетчиков</li>
          </ul>

          <p className="font-semibold">
            Распределительный (абонентский) отсек:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>DIN-рейки для установки модульной автоматики</li>
            <li>Автоматические выключатели и УЗО</li>
            <li>Защитные устройства от перенапряжения</li>
            <li>До 9 модулей автоматики на каждую квартиру</li>
          </ul>

          <p className="font-semibold">Слаботочный отсек:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Кабели телефонной связи, интернета</li>
            <li>Оборудование домофона и сигнализации</li>
            <li>Перфорированные полосы для крепления проводов</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Щит этажный размеры?",
      answer: (
        <ul className="list-disc pl-6 space-y-1">
          <li>Внешние габариты: 1000×950×140-160 мм</li>
          <li>Без слаботочного отсека: 1000×580×135 мм</li>
          <li>Устанавливаются в специально подготовленные ниши в стене</li>
          <li>Стандартный размер ниши: 880×830×130-140 мм</li>
        </ul>
      ),
    },
    {
      question: "Какова высота установки этажного щитка?",
      answer: (
        <div className="space-y-3">
          <p>
            Согласно нормативным документам, этажный щит должен устанавливаться
            на высоте:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Общие требования:</strong> от 400 до 2000 мм от пола
            </li>
            <li>
              <strong>Аппараты ручного управления:</strong> 700-1900 мм от пола
            </li>
            <li>
              <strong>Измерительные приборы:</strong> 1000-1800 мм от пола
            </li>
            <li>
              <strong>Оптимальная высота:</strong> 1400-1700 мм (на уровне глаз
              взрослого человека)
            </li>
            <li>
              <strong>Максимальная высота верха щита:</strong> не выше 1800-2000
              мм
            </li>
            <li>
              <strong>Минимальная высота низа щита:</strong> не ниже 500-600 мм
            </li>
          </ul>

          <h4 className="font-semibold text-gray-800">
            Требования к размещению
          </h4>
          <p className="font-medium">Запрещается установка:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Вблизи газовых коммуникаций и тепловых приборов</li>
            <li>В местах с повышенной влажностью</li>
            <li>В труднодоступных местах</li>
          </ul>
          <p className="font-medium">Обязательные условия:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Свободный доступ для обслуживания</li>
            <li>Расстояние до трубопроводов не менее 50 см</li>
            <li>Расстояние до дверных проемов не менее 15 см</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Что такое ЩЭ? Что такое ЩЛС?",
      answer: (
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800">
            Основные обозначения и расшифровка
          </h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>ЩЭ</strong> — Щит этажный
            </li>
            <li>
              <strong>ЩЭР</strong> — Щит этажный распределительный
            </li>
            <li>
              <strong>ЩЛС</strong> — Щит лестничный слаботочный
            </li>
            <li>
              <strong>УЭРМ</strong> — Устройство этажное распределительное
              модернизированное
            </li>
            <li>
              <strong>ЩК</strong> — Щит квартирный
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "Какова цена на этажный щит на 4 квартиры?",
      answer: (
        <div className="space-y-2">
          <p>
            Накладка щита этажного на 4 квартиры —{" "}
            <strong>от 3730 до 4735 рублей</strong>
            <br />
            Щит этажный ШЭ 4 на 4 квартиры —{" "}
            <strong>от 5855 до 7946 рублей</strong>
          </p>
          <p className="font-semibold">Факторы, влияющие на цену:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Наличие слаботочного отсека</li>
            <li>Комплектация (DIN-рейки, замки, цвет RAL)</li>
            <li>Размеры и толщина металла</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Кто несет ответственность за щиток в подъезде?",
      answer: (
        <div className="space-y-2">
          <p>
            Управляющая компания несет полную ответственность за этажные щиты
            согласно:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Постановлению Правительства РФ от 13.08.2006 №491</li>
            <li>Статье 162 Жилищного кодекса РФ</li>
            <li>Постановлению Госстроя РФ от 27.09.2003 №170</li>
          </ul>
          <p className="font-semibold">В зону ответственности УК входят:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Сам корпус этажного щита</li>
            <li>Все автоматы, предохранители и защитные устройства</li>
            <li>
              Внутридомовая система электроснабжения до квартирных счетчиков
            </li>
            <li>Регулярные осмотры и техническое обслуживание</li>
            <li>Ремонт и замена оборудования</li>
          </ul>
          <p className="italic">
            Исключение: квартирные счетчики электроэнергии остаются в зоне
            ответственности собственников.
          </p>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="container mx-auto p-6 bg-white text-gray-800">
        <h1 className="text-3xl font-bold mb-12 text-gray-800">
          Часто задаваемые вопросы (FAQ)
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-2xl shadow-sm bg-gray-50"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-2xl"
              >
                {faq.question}
                <span className="ml-2 text-gray-500 text-2xl leading-none">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  openIndex === index
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-700 text-xl leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WorksGallery />
      {/* <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">
          Часто задаваемые вопросы (FAQ)
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Как сделать заказ?</h2>
          <p className="mb-4">
            Выберите товары, добавьте их в корзину, перейдите в корзину и
            следуйте инструкциям для оформления заказа.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            2. Какие способы оплаты доступны?
          </h2>
          <p className="mb-4">
            Мы принимаем оплату банковскими картами, электронными кошельками и
            банковским переводом. Подробности в разделе{" "}
            <Link href="/delivery" className="text-blue-600 hover:underline">
              Оплата
            </Link>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            3. Каковы сроки доставки?
          </h2>
          <p className="mb-4">
            Сроки доставки зависят от региона и выбранного способа доставки.
            Обычно от 2 до 7 рабочих дней. Подробности в разделе{" "}
            <Link href="/delivery" className="text-blue-600 hover:underline">
              Доставка
            </Link>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            4. Могу ли я вернуть товар?
          </h2>
          <p className="mb-4">
            Да, возврат возможен в течение 14 дней при сохранении товарного
            вида. Подробности в разделе{" "}
            <Link href="/guarantees" className="text-blue-600 hover:underline">
              Гарантии и возврат
            </Link>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            5. Как связаться с поддержкой?
          </h2>
          <p className="mb-4">
            Обратитесь в{" "}
            <Link href="/support" className="text-blue-600 hover:underline">
              службу поддержки
            </Link>{" "}
            через форму на сайте или по указанным контактам.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            6. Есть ли программа лояльности?
          </h2>
          <p className="mb-4">
            Да, вы получаете бонусные баллы за заказы, которые можно
            использовать для скидок. Подробности в разделе{" "}
            <Link href="/bonus" className="text-blue-600 hover:underline">
              Программа лояльности
            </Link>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            7. Как узнать о текущих акциях?
          </h2>
          <p className="mb-4">
            Информация об акциях доступна в разделе{" "}
            <Link href="/bonus" className="text-blue-600 hover:underline">
              Акции
            </Link>{" "}
            или через подписку на рассылку.
          </p>
        </section>

        <p className="text-sm text-gray-600">
          Не нашли ответ? Свяжитесь с{" "}
          <Link href="/support" className="text-blue-600 hover:underline">
            службой поддержки
          </Link>
          .
        </p>
      </div> */}
    </>
  );
}
