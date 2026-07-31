"use client";

import { useState } from "react";

const faqs2 = [
  {
    question: "Какова высота установки этажного щитка?",
    answer: (
      <div className="space-y-3">
        <p>
          Согласно нормативным документам, этажный щит должен устанавливаться на
          высоте:
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

        <h4 className="font-semibold text-gray-800">Требования к размещению</h4>
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

export default function FaqNakladky() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto pb-4 lg:px-6 text-text">
      <h2 className="text-2xl lg:text-3xl text-accent font-bold mb-6 ">
        Вопросы и ответы
      </h2>
      <div className="space-y-4">
        {faqs2.map((faq, index) => (
          <div
            key={index}
            className="border rounded-2xl shadow-sm bg-cardBackground"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-4 lg:px-6 py-4 flex justify-between items-center font-semibold text-accent text-xl lg:text-2xl"
            >
              {faq.question}
              <span className="ml-4 lg:ml-8 text-2xl text-accent leading-none">
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
              <div className="px-6 pb-6 text-text text-lg leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
