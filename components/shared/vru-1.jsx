"use client";
import {
  Cable,
  Server,
  Shield,
  Home,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import FaqVru from "@/components/faqVru";
import PopularNaborVru from "@/components/PopularNaborVru";

export function vru1Top() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-metal animate-metal">
      <section className="container mx-auto py-6 text-xl lg:text-2xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4 px-2">
              <h2 className="text-2xl lg:text-5xl font-bold text-balance leading-tight">
                Вводно-распределительные устройства ВРУ-1 (
                <Link href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?nominalnoe-napryazhenie=380%2F220">
                  380В
                </Link>
                ) <small>от 60 кВт</small>{" "}
              </h2>
              <p className="text-muted-foreground text-balance leading-relaxed">
                Производство и комплектация электрощитовых панелей строго по{" "}
                <strong>ГОСТ Р 51321.1</strong>. Предназначены для приема, учета
                и распределения электрической энергии в сетях трехфазного
                переменного тока частотой 50 Гц. Ниже приведены базовые
                расчетные цены на сборки от 60 до 400 кВт, инженерные
                спецификации и структура маркировок для безошибочного заказа
                оборудования.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
              <Button
                onClick={() => handleButtonClick("Получить консультацию")}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-8"
              >
                Получить консультацию
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {/* <Button variant="outline" size="lg" className="text-xl py-8">
                Скачать каталог
              </Button> */}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">📅</div>
                <div className="text-sm lg:text-xl text-muted-foreground">
                  Актуально на 2026 г.
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">🏷️</div>
                <div className="text-sm lg:text-xl text-muted-foreground">
                  Производство в Москве
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">📦</div>
                <div className="text-sm lg:text-xl text-muted-foreground">
                  Сборка от 7 дней
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            {/* Светящееся размытие позади */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>

            {/* Адаптивный контейнер */}
            <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/vvodno-raspredelitelnye-ustrojstva-vru.png"
                alt="Вводно-распределительные устройства ВРУ-1"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
              />
            </div>
          </div>
        </div>
      </section>
      <PopularNaborVru />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialContent={modalContent}
        onSubmit={handleFormSubmit}
        submitError={error}
      />
    </div>
  );
}

export function vru1Bottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  // Состояния для калькулятора
  const [power, setPower] = useState(100);
  const [voltage, setVoltage] = useState(0.38);
  const [cosPhi, setCosPhi] = useState(0.95);
  const [current, setCurrent] = useState(() => {
    // Инициализация расчёта
    const sqrt3 = 1.732;
    return power / (sqrt3 * voltage * cosPhi);
  });

  // Функция пересчёта
  const calculateCurrent = (p, u, cos) => {
    if (u > 0 && cos > 0) {
      const sqrt3 = 1.732;
      return p / (sqrt3 * u * cos);
    }
    return NaN;
  };

  const handlePowerChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setPower(val);
      setCurrent(calculateCurrent(val, voltage, cosPhi));
    }
  };

  const handleVoltageChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setVoltage(val);
      setCurrent(calculateCurrent(power, val, cosPhi));
    }
  };

  const handleCosChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setCosPhi(val);
      setCurrent(calculateCurrent(power, voltage, val));
    }
  };

  return (
    <div className="bg-gradient-metal animate-metal py-8 px-4 font-sans text-text">
      <div className="container mx-auto rounded-3xl shadow-xl p-6 md:p-10">
        {/* HEADER */}
        <header className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold  flex flex-wrap items-center gap-2">
            Вводно-распределительные устройства ВРУ-1 (380В)
            <span className="text-base font-normal border border-accent px-3 py-0.5 rounded-full">
              от 60 кВт
            </span>
          </h2>
          <p className="text-lg mt-1">
            Производство и комплектация электрощитовых панелей строго по{" "}
            <strong>ГОСТ Р 51321.1</strong>. Предназначены для приема, учета и
            распределения электрической энергии в сетях трехфазного переменного
            тока частотой 50 Гц. Ниже приведены базовые расчетные цены на сборки
            от 60 до 400 кВт, инженерные спецификации и структура маркировок для
            безошибочного заказа оборудования.
          </p>
          <div className="flex flex-wrap gap-6 text-sm mt-2">
            <span>📅 Актуально на 2026 г.</span>
            <span>🏷️ Производство в Москве</span>
            <span>📦 Сборка от 7 дней</span>
          </div>
        </header>
        <hr className="border-t-2 border-accent my-6" />
        {/* CATALOG */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            🗄️ Базовые сметы: Каталог комплектаций
          </h2>
          <div className="overflow-x-auto rounded-xl border border-text">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="text-text">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold  border-b border-text whitespace-nowrap">
                    Модель
                  </th>
                  <th className="text-left py-3 px-4 font-semibold  border-b border-text whitespace-nowrap">
                    Мощность
                  </th>
                  <th className="text-left py-3 px-4 font-semibold  border-b border-text whitespace-nowrap">
                    Ток
                  </th>
                  <th className="text-left py-3 px-4 font-semibold  border-b border-text whitespace-nowrap">
                    Базовая цена
                  </th>
                  <th className="text-left py-3 px-4 font-semibold  border-b border-text whitespace-nowrap">
                    Вводы
                  </th>
                  <th className="text-left py-3 px-4 font-semibold  border-b border-text whitespace-nowrap">
                    Защита
                  </th>
                  <th className="text-left py-3 px-4 font-semibold  border-b border-text whitespace-nowrap">
                    Назначение
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold  whitespace-nowrap">
                    ВРУ1-21-00
                  </td>
                  <td className="py-2 px-4">~ 60 кВт</td>
                  <td className="py-2 px-4">100 А</td>
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    45 000 руб.
                  </td>
                  <td className="py-2 px-4 hover:underline">
                    <Link href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=1">
                      1 ввод
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP55"
                      passHref
                    >
                      <span className="bg-accent text-background hover:text-primaryLight text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        IP55
                      </span>
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    Влагозащищенный щит (подвалы, паркинги).
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    ВРУ-1-19-90
                  </td>
                  <td className="py-2 px-4">~ 100 кВт</td>
                  <td className="py-2 px-4">160 А</td>
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    90 000 руб.
                  </td>
                  <td className="py-2 px-4 hover:underline">
                    <Link href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=2&s-blokom-avr=да">
                      2 ввода + АВР
                    </Link>
                  </td>

                  <td className="py-2 px-4">
                    <Link
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP31"
                      passHref
                    >
                      <span className="bg-accent text-background hover:text-primaryLight text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        IP31
                      </span>
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    Для объектов 1/2-й категории надежности.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    ВРУ-1-11-10
                  </td>
                  <td className="py-2 px-4">~ 150 кВт</td>
                  <td className="py-2 px-4">250 А</td>
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    75 000 руб.
                  </td>
                  <td className="py-2 px-4 hover:underline">
                    <Link href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=1">
                      1 ввод
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP31"
                      passHref
                    >
                      <span className="bg-accent text-background hover:text-primaryLight text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        IP31
                      </span>
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    Базовый вводный щит (стандартная нагрузка).
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    ВРУ-1-18-80
                  </td>
                  <td className="py-2 px-4">~ 150 кВт</td>
                  <td className="py-2 px-4">250 А</td>
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    110 000 руб.
                  </td>
                  <td className="py-2 px-4 hover:underline">
                    <Link href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=2&s-blokom-avr=да">
                      2 ввода + АВР
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP31"
                      passHref
                    >
                      <span className="bg-accent text-background hover:text-primaryLight text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        IP31
                      </span>
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    Вводный узел с автоматическим резервом.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    ВРУ1-12-10К
                  </td>
                  <td className="py-2 px-4">~ 150 кВт</td>
                  <td className="py-2 px-4">250 А</td>
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    110 000 руб.
                  </td>
                  <td className="py-2 px-4 hover:underline">
                    <Link href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=2&s-blokom-avr=да">
                      2 ввода + АВР
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP65"
                      passHref
                    >
                      <span className="bg-accent text-background hover:text-primaryLight text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        IP65
                      </span>
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    Уличная установка с обязательным резервированием.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    ВРУ-1-13-20
                  </td>
                  <td className="py-2 px-4">~ 200 кВт</td>
                  <td className="py-2 px-4">400 А</td>
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    95 000 руб.
                  </td>
                  <td className="py-2 px-4 hover:underline">
                    <Link href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=1">
                      1 ввод
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP31"
                      passHref
                    >
                      <span className="bg-accent text-background hover:text-primaryLight text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        IP31
                      </span>
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    Для промышленных и крупных коммерческих зданий.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    ВРУ1-47-30
                  </td>
                  <td className="py-2 px-4">~ 300 кВт</td>
                  <td className="py-2 px-4">500 А</td>
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    45 000 руб.
                  </td>
                  <td className="py-2 px-4 hover:underline">
                    <Link href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=1">
                      1 ввод
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP31"
                      passHref
                    >
                      <span className="bg-accent text-background hover:text-primaryLight text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        IP31
                      </span>
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    Поканальное распределение на отходящие магистрали.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    ВРУ1-13-30А
                  </td>
                  <td className="py-2 px-4">~ 400 кВт</td>
                  <td className="py-2 px-4">630 А</td>
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    135 000 руб.
                  </td>
                  <td className="py-2 px-4 hover:underline">
                    <Link href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=2">
                      2 ввода
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP66"
                      passHref
                    >
                      <span className="bg-accent text-background hover:text-primaryLight text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        IP66
                      </span>
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    Влагозащищенный вводный узел для крупных зданий.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl p-4 mt-4 text-sm">
            <span>
              <strong>Требуется решение для малого бизнеса?</strong> Перейдите
              на специализированную страницу{" "}
              <Link
                href="/catalog/vru-1-15-kvt-380v-trehfaznyj"
                className="text-blue-600 hover:underline"
              >
                ВРУ-1 на 15 кВт (380В)
              </Link>
              .
            </span>
            <Button
              onClick={() => handleButtonClick("Запросить точную смету")}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-background text-xl py-4"
            >
              Запросить точную смету
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
        {/* SECTION: HARD CRITERIA & FAILURE MODES */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">
            ⚠️ Проектирование: Габариты, спецификации и частые ошибки
          </h2>
          <p className="mb-6">
            Критерии, которые необходимо учесть до утверждения однолинейной
            схемы и передачи заказа в производство.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Калькулятор */}
            <div className="rounded-2xl p-6 border border-accent">
              <h3 className="text-lg text-accent font-semibold flex items-center gap-2 mb-3">
                🧮 Универсальный калькулятор тока
              </h3>
              <p className="mb-4 text-sm">
                Основан на формуле: <strong>I = P / (√3 · U · cos(φ))</strong>.
                Позволяет точно подобрать номинал вводного аппарата.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Расчетная мощность, P (кВт):
                  </label>
                  <input
                    type="number"
                    value={power}
                    onChange={handlePowerChange}
                    className="w-full border border-accent rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Напряжение сети, U (кВ):
                  </label>
                  <input
                    type="number"
                    value={voltage}
                    step="0.01"
                    onChange={handleVoltageChange}
                    className="w-full border border-accent rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <small className="text-slate-500 text-xs">
                    * 0.38 кВ = 380 В (стандартная трехфазная сеть)
                  </small>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Коэфф. мощности, cos(φ):
                  </label>
                  <input
                    type="number"
                    value={cosPhi}
                    step="0.01"
                    onChange={handleCosChange}
                    className="w-full border border-accent rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-5 bg-card p-4 rounded-lg border-l-4 border-accent">
                <p className="text-sm font-semibold ">
                  Искомый ток (I):{" "}
                  <span className="text-accent text-xl ml-2">
                    {isFinite(current) ? current.toFixed(1) : "Ошибка ввода"} А
                  </span>
                </p>
              </div>
            </div>

            {/* Электрические характеристики */}
            <div className="rounded-2xl p-6 border border-accent">
              <h3 className="text-lg text-accent font-semibold flex items-center gap-2 mb-3">
                Электрические характеристики
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  <strong>Стойкость к КЗ:</strong> Оборудование обеспечивает
                  защиту линий при перегрузках и коротких замыканиях (ударный
                  ток до{" "}
                  <span className="bg-card px-2 py-0.5 rounded font-medium text-accent">
                    10 кА
                  </span>
                  ).
                </li>
                <li>
                  <strong>Заземление:</strong> Применяется в сетях с
                  глухозаземленной нейтралью (поддержка TN-C-S и TN-S). Нулевая
                  шина N изолирована, защитная шина PE соединена с корпусом.
                </li>
                <li>
                  <strong>Срабатывание АВР:</strong> Автоматическое переключение
                  на резервный источник питания занимает{" "}
                  <strong>≤ 0,7 сек</strong>.
                </li>
                <li>
                  <strong>Вводные зажимы:</strong> Максимальное сечение
                  подключаемых кабелей — до 4x150 мм² (для 630А).
                </li>
              </ul>
            </div>

            {/* Габариты и монтажные ограничения */}
            <div className="rounded-2xl p-6 border border-accent">
              <h3 className="text-lg text-accent font-semibold flex items-center gap-2 mb-3">
                Габариты и монтажные ограничения
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-text">
                <li>
                  <strong>Конструкция:</strong> Базовое исполнение — напольный
                  цельносварной металлический каркас из листовой стали
                  (климатическое исполнение УХЛ4).
                </li>
                <li>
                  <strong>Стандартные размеры панелей:</strong> Высота 1700–2000
                  мм, ширина 800 мм.
                </li>
                <li>
                  <strong>Монтажная глубина:</strong> Корпуса выпускаются в
                  вариантах глубины 450 мм и 600 мм. Выбор глубины 600 мм
                  обязателен при использовании{" "}
                  <a
                    href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?transformator-toka=да"
                    className="text-accent hover:underline"
                  >
                    трансформаторов тока
                  </a>{" "}
                  крупных габаритов.
                </li>
                <li>
                  <strong>Обслуживание:</strong> Панели имеют одностороннее
                  обслуживание (фронтальный доступ).
                </li>
              </ul>
            </div>

            {/* Ошибки */}
            <div className="rounded-2xl p-6 border border-accent md:col-span-2">
              <div className="border-l-4 border-red-500 bg-card-50 p-4 rounded-r-xl">
                <h4 className="text-red-800 font-semibold">
                  Сценарии отказов: Чего избегать при заказе
                </h4>
                <p className="text-sm text-red-700 mt-1">
                  <strong>1. Ошибка климатического исполнения:</strong> Выбор
                  панелей IP31 для установки на подземных паркингах или в
                  неотапливаемых подвалах приводит к выпадению конденсата на
                  шинах. Для таких зон требуются корпуса не ниже IP54 с
                  антиконденсатным подогревом.
                  <br />
                  <strong>2. Игнорирование дверных проемов:</strong>{" "}
                  Цельносварные каркасы шириной 800 мм не проходят в стандартные
                  двери (700 мм) старых электрощитовых. В таких случаях
                  необходимо указывать в заявке разборные корпуса.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* STRUCTURE LEGEND */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            📋 Структура условного обозначения (индексы сборки)
          </h2>
          <div className="overflow-x-auto rounded-xl border border-text">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="text-text">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b text-text border-text">
                    Формат: ВРУ‑X‑XX‑X X X‑УХЛ4
                  </th>
                  <th className="text-left py-3 px-4 font-semibold  border-b text-text border-text">
                    Расшифровка позиций
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold">1 (Первая цифра)</td>
                  <td className="py-2 px-4">Номер разработки (ВРУ-1)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold">
                    XX (Вторая группа)
                  </td>
                  <td className="py-2 px-4">
                    <strong>Назначение:</strong> 11–19 —{" "}
                    <a
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?naznachenie-paneli=вводные"
                      className="text-blue-600 hover:underline"
                    >
                      вводные
                    </a>
                    ; 21–29 —{" "}
                    <a
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?naznachenie-paneli=вводно-распределительные"
                      className="text-blue-600 hover:underline"
                    >
                      вводно-распределительные
                    </a>
                    ; 41–50 —{" "}
                    <a
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?naznachenie-paneli=распределительные"
                      className="text-blue-600 hover:underline"
                    >
                      распределительные
                    </a>{" "}
                    панели
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold">X (Третья группа)</td>
                  <td className="py-2 px-4">
                    <strong>Аппарат на вводе:</strong> 0 — нет; 1-3 —
                    переключатель; 4-5 — выключатель; 7-9 —{" "}
                    <a
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?s-blokom-avr=да"
                      className="text-blue-600 hover:underline"
                    >
                      блок с АВР
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold">
                    X (Четвертая группа)
                  </td>
                  <td className="py-2 px-4">
                    <strong>Освещение:</strong> 0 — нет; 1/3/5 — блок
                    автоматического управления; 2/4/6 — ручное управление
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2 px-4 font-semibold">X (Пятая группа)</td>
                  <td className="py-2 px-4">
                    <strong>Защита отходящих линий:</strong> «А» —{" "}
                    <a
                      href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru?vyklyuchatel-na-othodyashih-liniyah=да"
                      className="text-blue-600 hover:underline"
                    >
                      автоматические выключатели
                    </a>
                    ; пустое поле — плавкие вставки (предохранители)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {/* PURCHASE SECTION */}
        <section className="mb-8">
          <h2 className="text-2xl text-accent font-semibold mb-4">
            💼 Коммерческие условия и Логистика
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 border border-accent">
              <h3 className="text-lg font-semibold mb-3">Финансовые условия</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-text">
                <li>
                  <strong>Безналичный расчет:</strong> Работаем с юридическими
                  лицами с НДС (22%). Предоставляется полная техническая
                  документация.
                </li>
                <li>
                  <strong>Гибкая оплата:</strong> Доступна частичная предоплата
                  для запуска в производство (сборка 7–14 дней).
                </li>
                <li>
                  <strong>Индивидуальные схемы:</strong> Возможна сборка
                  нетиповых НКУ по опросным листам на элементной базе ведущих
                  производителей (КЭАЗ, IEK, EKF).
                </li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 border border-accent">
              <h3 className="text-lg font-semibold mb-3">
                Доставка и Гарантия
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-text">
                <li>
                  <strong>Бесплатная доставка:</strong> По Москве собственным
                  автопарком при заказе от 70 000 руб.
                </li>
                <li>
                  <strong>Самовывоз:</strong> Склад готовой продукции:{" "}
                  <span className="border-b border-accent px-3 py-0.5 inline-block mt-1">
                    г. Москва, ул. Чермянская, д. 1, стр. 1, офис 214
                  </span>
                  .
                </li>
                <li>
                  <strong>Надежность:</strong> Расширенная гарантия от завода до
                  3 лет. Паспорт на каждую панель.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <FaqVru />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialContent={modalContent}
        onSubmit={handleFormSubmit}
        submitError={error}
      />
    </div>
  );
}
