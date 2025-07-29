import React from "react";

export default function Delivery() {
  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex justify-center items-center py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-10">
          Доставка и оплата
        </h1>
      </div>
      <div>
        <div className="bg-blue-300/50 shadow-2xl rounded-4xl px-8 py-12 mx-auto border border-blue-200">
          <div className="flex items-center justify-center text-3xl font-bold mb-12 mt-4">
            Преимущества и особенности конструкции
          </div>
          <ul className="list-disc pl-6 text-2xl space-y-2 text-gray-900 max-w-[1200px] mx-auto">
            <li className="mb-4">
              <strong>Безопасность:</strong> Металлический корпус с классами
              защиты I или II минимизирует риск поражения током. Дверца с замком
              исключает доступ к токоведущим частям{" "}
              <a href="https://docs.cntd.ru/document/9018351\">
                <strong className="bg-amber-200">
                  (ГОСТ 32395-2020, п. 6.1.2, 6.2.16).
                </strong>
              </a>
            </li>
            <li className="mb-4">
              <strong>Низкое излучение:</strong> Электрическое поле ≤ 0,5 кВ/м,
              магнитное ≤ 4 А/м, что обеспечивает безопасное пространство (п.
              6.1.3).
            </li>
            <li className="mb-4">
              <strong>Прочное крепление:</strong> Конструкция для ниши
              гарантирует долговечность и стабильность (п. 6.2.10).
            </li>
            <li className="mb-4">
              <strong>Эстетика:</strong> Обрамления защищают от повреждений,
              создавая аккуратный вид (п. 6.2.12).
            </li>
            <li className="mb-4">
              <strong>Соответствие ГОСТ:</strong> Размеры соответствуют{" "}
              <a href="https://docs.cntd.ru/document/1200165116\">
                <strong className="bg-amber-200">Приложению Г</strong>
              </a>
              , упрощая монтаж (п. 6.2.13).
            </li>
            <li className="mb-4">
              <strong>Лёгкое обслуживание:</strong> Замена аппаратов и счетчиков
              без демонтажа (п. 6.2.24).
            </li>
            <li className="mb-4">
              <strong>Удобный доступ:</strong> Дверца открывается на ≥ 95°,
              упрощая доступ к аппаратам (п. 6.2.15).
            </li>
            <li className="mb-4 pb-12">
              <strong>Защита:</strong> Замок и люк для вводных аппаратов
              усиливают безопасность (п. 6.2.17).
            </li>
          </ul>
        </div>
        <p className="mx-auto mt-10 text-gray-900 text-3xl px-4">
          Щит этажный серии <strong>ЩЭ-6</strong> — надёжный выбор для этажей с
          шестью квартирами, обеспечивающий учет электроэнергии и
          функциональность.{" "}
          <a href="#order\">
            <strong>Закажите с доставкой!</strong>
          </a>
        </p>
      </div>
    </div>
  );
}
