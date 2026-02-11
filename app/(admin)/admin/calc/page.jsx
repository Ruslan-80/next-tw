"use client";

import React, { useState, useEffect } from "react";

const nf = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0,
});

const format = (value) => nf.format(Math.round(value || 0));

export default function ProfitCalculator() {
  const [values, setValues] = useState({
    buyPrice: 0,
    sellPrice: 0,
    delivery: 0,
    maxTax: 0,
  });

  const [result, setResult] = useState({
    calculatedX: 0,
    requiredSellPrice: 0,
  });

  useEffect(() => {
    // === ПРЯМОЙ РАСЧЕТ ===
    const vP = values.sellPrice - values.buyPrice;
    const vPExVat = vP * (100 / 122);
    const netProfit = vPExVat * 0.75;
    const directX =
      ((netProfit - values.delivery * 1.07) / 2) / 1.07;

    // === ОБРАТНЫЙ РАСЧЕТ ===
    const reverseSell =
      (((values.maxTax * 1.07 * 2) +
        values.delivery * 1.07) /
        0.75) *
        1.22 +
      values.buyPrice;

    setResult({
      calculatedX: Math.round(directX),
      requiredSellPrice: Math.round(reverseSell),
    });
  }, [values]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: Number(value) || 0,
    }));
  };

  const isReverse = values.maxTax > 0;

  return (
    <div className="max-w-md min-w-[450px] mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Калькулятор
      </h2>

      <div className="space-y-4">
        <div className="pt-4 border-t">
          <label className="block text-sm font-bold text-blue-600">
            Стоимость продажи
          </label>
          <input
            type="number"
            name="sellPrice"
            value={
              isReverse
                ? result.requiredSellPrice
                : values.sellPrice
            }
            onChange={handleInputChange}
            disabled={isReverse}
            className={`w-full p-2 border rounded-md ${
              isReverse ? "bg-blue-50 border-blue-300" : ""
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Стоимость закупки
          </label>
          <input
            type="number"
            name="buyPrice"
            value={values.buyPrice}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Доставка
          </label>
          <input
            type="number"
            name="delivery"
            value={values.delivery}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="pb-4 border-b">
          <label className="block text-sm font-bold text-green-600">
            MAX_TAX
          </label>
          <input
            type="number"
            name="maxTax"
            value={values.maxTax}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md border-green-300 focus:ring-green-500"
            placeholder="Включить обратный расчет"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500 uppercase font-semibold">
          Результат
        </p>

        {isReverse ? (
          <p className="text-lg">
            Чтобы получить{" "}
            <span className="font-bold text-green-600">
              {format(values.maxTax)}
            </span>
            , стоимость продажи должна быть:{" "}
            <span className="font-bold text-blue-600">
              {format(result.requiredSellPrice)}
            </span>
          </p>
        ) : (
          <p className="text-lg">
            Сумма:{" "}
            <span className="font-bold text-gray-800">
              {format(result.calculatedX)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
