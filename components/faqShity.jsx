"use client";

import { useState } from "react";

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
          квартирам одного этажа. Это ключевой элемент системы электроснабжения
          многоквартирных домов.
        </p>
        <p className="font-semibold">Основные функции:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Прием электроэнергии от центральной магистрали (стояка)</li>
          <li>Распределение электричества по квартирам (обычно 2-6 квартир)</li>
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
          Этажный щит состоит из <strong>двух или трех основных отсеков</strong>
          , каждый из которых выполняет определенную функцию:
        </p>

        <p className="font-semibold">Вводно-учетный отсек:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Размещение электросчетчиков (по количеству квартир)</li>
          <li>Автоматы защиты каждой квартиры от магистральной линии</li>
          <li>Рубильник для отключения лестничного стояка</li>
          <li>Смотровые окна для считывания показаний счетчиков</li>
        </ul>

        <p className="font-semibold">Распределительный (абонентский) отсек:</p>
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
];

export default function FaqShity() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6  text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Вопросы и ответы
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-2xl shadow-sm bg-gray-50">
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
  );
}
