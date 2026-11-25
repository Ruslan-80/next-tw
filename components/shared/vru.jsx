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

export function vruTop() {
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
        <div className="grid lg:grid-cols-2 gap-2 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4 px-2">
              <h2 className="text-2xl lg:text-5xl font-bold text-text leading-tight">
                Вводно-распределительное устройство (ВРУ)
              </h2>
              <p className="text-muted-foreground text-text leading-relaxed">
                <strong>ВРУ</strong> — это электрический шкаф, который служит
                для приёма, распределения и учёта электроэнергии в сетях{" "}
                <a
                  href="vvodno-raspredelitelnye-ustrojstva-vru?nominalnoe-napryazhenie=380%2F220"
                  className="text-accent hover:underline"
                >
                  380В
                </a>
                , а также для защиты линий при перегрузках и коротких
                замыканиях. <strong>Купить щит ВРУ в сборе</strong> в Москве вы
                можете напрямую с нашего производства — без посредников, с
                полным пакетом документов и гарантией 3 года.
              </p>
              <p className="text-muted-foreground text-text leading-relaxed">
                Мы занимаемся изготовлением ВРУ на заказ по однолинейным схемам,
                а также предлагаем готовые силовые щиты ВРУ, собранные на
                проверенной аппаратуре отечественных и зарубежных брендов.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
              <Button
                onClick={() => handleButtonClick("Получить консультацию")}
                size="lg"
                // className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-8"
                className="btn-gold text-xl py-8 text-black"
              >
                Получить консультацию
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
            <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/vru-all.webp"
                alt="Щит ВРУ в сборе"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                preload={true}
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

export function vruBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // ----- Состояния калькулятора -----
  const [activeTab, setActiveTab] = useState("tab-1");

  // Таб 1: Расшифровка
  const [markInput, setMarkInput] = useState("");
  const [markResult, setMarkResult] = useState(null);

  // Таб 2: Тип ВРУ
  const [buildingType, setBuildingType] = useState("");
  const [floors, setFloors] = useState("");
  const [inputs, setInputs] = useState("1");
  const [avr, setAvr] = useState("no");
  const [typeResult, setTypeResult] = useState(null);

  // Таб 3: Номинальный ток
  const [currentExecution, setCurrentExecution] = useState("cabinet");
  const [voltage, setVoltage] = useState("400");
  const [power, setPower] = useState("");
  const [cosPhi, setCosPhi] = useState("0.9");
  const [reserve, setReserve] = useState("10");
  const [calcCurrentResult, setCalcCurrentResult] = useState(null);

  // Таб 4: Схема ввода
  const [schemeInputs, setSchemeInputs] = useState("1");
  const [schemeAvr, setSchemeAvr] = useState("no");
  const [schemeMetering, setSchemeMetering] = useState("yes");
  const [schemeGrounding, setSchemeGrounding] = useState("tn-c-s");
  const [schemeResult, setSchemeResult] = useState(null);

  // --- Словари расшифровки маркировок ---
  const legacyPurposeMap = {
    11: "Вводная панель",
    12: "Вводная панель",
    13: "Вводная панель",
    14: "Вводная панель",
    15: "Вводная панель",
    16: "Вводная панель",
    17: "Вводная панель с АВР",
    18: "Вводная панель с АВР",
    19: "Вводная панель с АВР",
    21: "Вводно-распределительная панель",
    22: "Вводно-распределительная панель",
    23: "Вводно-распределительная панель",
    24: "Вводно-распределительная панель",
    25: "Вводно-распределительная панель",
    26: "Вводно-распределительная панель",
    27: "Вводно-распределительная панель",
    28: "Вводно-распределительная панель",
    29: "Вводно-распределительная панель",
    41: "Распределительная панель",
    42: "Распределительная панель",
    43: "Распределительная панель",
    44: "Распределительная панель",
    45: "Распределительная панель",
    46: "Распределительная панель",
    47: "Распределительная панель",
    48: "Распределительная панель",
    49: "Распределительная панель",
    50: "Распределительная панель",
  };
  const legacyInputEquipmentMap = {
    0: "Аппаратура управления на вводе отсутствует",
    1: "Переключатель на вводе 250 А",
    2: "Переключатель на вводе 400 А",
    3: "Переключатель на вводе 630 А",
    4: "Выключатель на вводе 630 А",
    5: "Два выключателя на вводе 250 А",
    6: "Выключатель на вводе 250 А",
    7: "Выключатель и аппаратура АВР на 100 А",
    8: "Выключатель и аппаратура АВР на 250 А",
    9: "Выключатель и аппаратура АВР на 160 А",
  };
  const legacyAdditionalEquipmentMap = {
    0: "Дополнительное оборудование отсутствует",
    1: "Автоматическое управление освещением, до 30 групп",
    2: "Неавтоматическое управление освещением, до 30 групп",
    3: "Автоматическое управление освещением, до 14 групп",
    4: "Неавтоматическое управление освещением, до 14 групп",
    5: "Автоматическое управление освещением, до 8 групп",
    6: "Неавтоматическое управление освещением, до 8 групп",
  };
  const modernModificationMap = {
    100: "Вводная панель, схема 1, без учета, ширина 400 мм",
    101: "Вводная панель, схема 1, без учета, ширина 600 мм",
    102: "Вводная панель, схема 1, с учетом, ширина 400 мм",
    103: "Вводная панель, схема 1, с учетом, ширина 600 мм",
    104: "Вводная панель, схема 2, без учета, ширина 400 мм",
    105: "Вводная панель, схема 2, без учета, ширина 600 мм",
    106: "Вводная панель, схема 2, с учетом, ширина 400 мм",
    107: "Вводная панель, схема 2, с учетом, ширина 600 мм",
    108: "Вводная панель, схема 4, без учета, ширина 600 мм",
    109: "Вводная панель, схема 4, без учета, ширина 800 мм",
    110: "Вводная панель, схема 4, с учетом, ширина 600 мм",
    111: "Вводная панель, схема 4, с учетом, ширина 800 мм",
    112: "Вводная панель, схема 6, без учета, ширина 800 мм",
    113: "Вводная панель, схема 6, без учета, ширина 1200 мм",
    114: "Вводная панель, схема 6, с учетом, ширина 800 мм",
    115: "Вводная панель, схема 6, с учетом, ширина 1200 мм",
    116: "Вводная панель, схема 7, без учета, ширина 600 мм",
    117: "Вводная панель, схема 7, без учета, ширина 800 мм",
    118: "Вводная панель, схема 7, с учетом, ширина 600 мм",
    119: "Вводная панель, схема 7, с учетом, ширина 800 мм",
  };

  // Хэндлеры отправки форм калькулятора
  const handleMarkSubmit = (e) => {
    e.preventDefault();
    const mark = markInput.trim().toUpperCase().replace(/\s+/g, " ");
    if (!mark) {
      setMarkResult({ error: "Введите маркировку ВРУ." });
      return;
    }

    const legacyRegex = /^ВРУ-?1-(\d{2})-(\d)(\d)(А)?(?:\s|-)?(УХЛ\d)?$/iu;
    const modernRegex = /^ВРУ-(\d{1,2})-(\d{2,3})-(\d{3})(?:\s|-)?(УХЛ\d)?$/iu;

    const legacyMatch = mark.match(legacyRegex);
    const modernMatch = mark.match(modernRegex);

    if (legacyMatch) {
      const panelCode = legacyMatch[1];
      const inputCode = legacyMatch[2];
      const additionalCode = legacyMatch[3];
      const autoSuffix = legacyMatch[4];
      const climate = legacyMatch[5] || "УХЛ4";

      setMarkResult({
        type: "legacy",
        series: "ВРУ-1",
        purpose:
          legacyPurposeMap[panelCode] ||
          "Назначение уточняется по каталогу производителя",
        inputEquipment:
          legacyInputEquipmentMap[inputCode] ||
          "Код аппаратуры ввода не распознан",
        additionalEquipment:
          legacyAdditionalEquipmentMap[additionalCode] ||
          "Код дополнительного оборудования не распознан",
        protection: autoSuffix
          ? "На отходящих линиях применены автоматические выключатели"
          : "Тип защитных аппаратов уточняется по исполнению",
        climate: climate,
        panelCode: panelCode,
      });
      return;
    }

    if (modernMatch) {
      const development = modernMatch[1];
      const nominalCurrent = modernMatch[2];
      const modification = modernMatch[3];
      const climate = modernMatch[4] || "УХЛ4";

      setMarkResult({
        type: "modern",
        development,
        nominalCurrent,
        modification,
        modificationName:
          modernModificationMap[modification] ||
          "Модификация уточняется по альбому типовых решений",
        climate,
      });
      return;
    }

    setMarkResult({
      error:
        "Маркировка не распознана. Используйте, например: ВРУ-1-21-10 УХЛ4 или ВРУ-2-400-102-УХЛ4.",
    });
  };

  const handleTypeSubmit = (e) => {
    e.preventDefault();
    const fl = Number(floors);
    if (!buildingType) {
      setTypeResult({ error: "Выберите тип объекта." });
      return;
    }
    if (!fl || fl < 1) {
      setTypeResult({ error: "Укажите этажность объекта." });
      return;
    }
    if (inputs === "1" && avr === "yes") {
      setTypeResult({
        error: "АВР требует минимум два взаиморезервируемых питающих ввода.",
      });
      return;
    }

    let recommendation = "";
    let explanation = "";

    if (buildingType === "apartment" && fl > 5) {
      recommendation = "Многопанельное ВРУ";
      explanation =
        "Для многоквартирного жилого дома выше пяти этажей предварительно рассматривается многопанельное ВРУ. Окончательное число панелей определяется составом функциональных блоков и аппаратов.";
    } else if (buildingType === "private") {
      recommendation = "Шкафное или однопанельное ВРУ";
      explanation =
        "Для малоэтажного объекта предварительно рассматривается шкафное либо однопанельное исполнение. Выбор зависит от расчетного тока, количества линий, учета и состава аппаратуры.";
    } else {
      recommendation = "Однопанельное или многопанельное ВРУ";
      explanation =
        "Для общественного или коммерческого здания исполнение выбирают по расчетному току, числу вводов, АВР, учету и требуемому количеству функциональных блоков.";
    }

    setTypeResult({ recommendation, explanation });
  };

  const handleCurrentSubmit = (e) => {
    e.preventDefault();
    const p = parseFloat(power);
    const u = parseFloat(voltage);
    const cos = parseFloat(cosPhi);
    const res = parseFloat(reserve) || 0;

    if (isNaN(p) || p <= 0) {
      setCalcCurrentResult({
        error: "Введите корректное значение расчетной мощности (кВт).",
      });
      return;
    }

    let calculatedI = 0;
    if (u === 400) {
      calculatedI = (p * 1000) / (Math.sqrt(3) * 400 * cos);
    } else {
      calculatedI = (p * 1000) / (230 * cos);
    }

    const currentWithReserve = calculatedI * (1 + res / 100);

    const standardNominals = [
      25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800,
      1000, 1250, 1600,
    ];
    const recommendedNominal =
      standardNominals.find((n) => n >= currentWithReserve) ||
      standardNominals[standardNominals.length - 1];

    setCalcCurrentResult({
      exactCurrent: calculatedI.toFixed(1),
      currentWithReserve: currentWithReserve.toFixed(1),
      reserve: res,
      recommendedNominal,
    });
  };

  const handleSchemeSubmit = (e) => {
    e.preventDefault();
    if (schemeInputs === "1" && schemeAvr === "yes") {
      setSchemeResult({
        error: "АВР требует минимум два взаиморезервируемых питающих ввода.",
      });
      return;
    }

    let schemeName = "";
    let description = "";

    if (schemeInputs === "1") {
      schemeName = "Схема с одним питающим вводом";
      description =
        "Применяется для объектов III категории надежности электроснабжения. Содержит один вводной аппарат защиты/коммутации, учет (при необходимости) и распределительную секцию.";
    } else if (schemeInputs === "2" && schemeAvr === "no") {
      schemeName = "Схема с двумя вводами и ручным переключением";
      description =
        "Применяется для объектов II категории надежности. Позволяет вручную переключать питание между основным и резервным вводами с помощью секционного выключателя или переключателя.";
    } else {
      schemeName =
        "Схема с двумя вводами и автоматическим вводом резерва (АВР)";
      description =
        "Применяется для объектов I категории надежности. При пропаже напряжения на основном вводе устройство автоматически переключает нагрузку на резервный источник.";
    }

    setSchemeResult({
      schemeName,
      description,
      grounding: schemeGrounding.toUpperCase(),
      metering: schemeMetering === "yes" ? "Требуется" : "Не требуется",
    });
  };

  return (
    <div className="bg-gradient-metal animate-metal py-8 px-4 font-sans text-text">
      <div className="container mx-auto rounded-3xl shadow-xl">
        {/* =========================================
             ОНЛАЙН-КАЛЬКУЛЯТОРЫ ВРУ
           ========================================= */}
        <section
          className="mb-12 rounded-2xl p-6 border border-accent bg-card"
          id="vru-calc"
        >
          <div className="max-w-3xl mx-auto text-center mb-8">
            <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
              Онлайн-подбор
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Подберите ВРУ по параметрам объекта
            </h2>
            <p className="text-muted-foreground text-sm">
              Получите предварительный подбор по маркировке, типу исполнения,
              номинальному току и конфигурации вводов.
            </p>
          </div>

          {/* Вкладки калькулятора */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
            <Button
              variant={activeTab === "tab-1" ? "default" : "outline"}
              className={`h-auto py-3 px-4 text-sm font-bold justify-center ${
                activeTab === "tab-1"
                  ? "bg-accent text-background hover:bg-accent/90"
                  : ""
              }`}
              onClick={() => setActiveTab("tab-1")}
            >
              Расшифровка маркировки
            </Button>
            <Button
              variant={activeTab === "tab-2" ? "default" : "outline"}
              className={`h-auto py-3 px-4 text-sm font-bold justify-center ${
                activeTab === "tab-2"
                  ? "bg-accent text-background hover:bg-accent/90"
                  : ""
              }`}
              onClick={() => setActiveTab("tab-2")}
            >
              Тип ВРУ
            </Button>
            <Button
              variant={activeTab === "tab-3" ? "default" : "outline"}
              className={`h-auto py-3 px-4 text-sm font-bold justify-center ${
                activeTab === "tab-3"
                  ? "bg-accent text-background hover:bg-accent/90"
                  : ""
              }`}
              onClick={() => setActiveTab("tab-3")}
            >
              Номинальный ток
            </Button>
            <Button
              variant={activeTab === "tab-4" ? "default" : "outline"}
              className={`h-auto py-3 px-4 text-sm font-bold justify-center ${
                activeTab === "tab-4"
                  ? "bg-accent text-background hover:bg-accent/90"
                  : ""
              }`}
              onClick={() => setActiveTab("tab-4")}
            >
              Схема ввода
            </Button>
          </div>

          {/* Таб 1: Расшифровка */}
          {activeTab === "tab-1" && (
            <div className="max-w-2xl mx-auto space-y-4">
              <form onSubmit={handleMarkSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Маркировка ВРУ
                  </label>
                  <input
                    type="text"
                    value={markInput}
                    onChange={(e) => setMarkInput(e.target.value)}
                    placeholder="Например: ВРУ-1-21-10 УХЛ4"
                    aria-label="Маркировка ВРУ"
                    className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <span className="block mt-1 text-xs text-muted-foreground">
                    Поддерживаются форматы: ВРУ-1-21-10 УХЛ4 и
                    ВРУ-2-400-102-УХЛ4.
                  </span>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-background font-bold"
                >
                  Получить расшифровку
                </Button>
              </form>

              {markResult && (
                <div
                  className={`p-4 rounded-lg border-l-4 ${
                    markResult.error
                      ? "bg-destructive/10 border-destructive text-destructive"
                      : "bg-card border-accent"
                  }`}
                >
                  {markResult.error ? (
                    <p className="text-sm font-semibold">{markResult.error}</p>
                  ) : markResult.type === "legacy" ? (
                    <div className="space-y-2 text-sm">
                      <h3 className="text-lg font-bold">Расшифровка ВРУ-1</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Серия:</strong> ВРУ-1
                        </li>
                        <li>
                          <strong>Назначение:</strong> {markResult.purpose}
                        </li>
                        <li>
                          <strong>Аппаратура ввода:</strong>{" "}
                          {markResult.inputEquipment}
                        </li>
                        <li>
                          <strong>Дополнительное оборудование:</strong>{" "}
                          {markResult.additionalEquipment}
                        </li>
                        <li>
                          <strong>Защитные аппараты:</strong>{" "}
                          {markResult.protection}
                        </li>
                        <li>
                          <strong>Климатическое исполнение:</strong>{" "}
                          {markResult.climate}
                        </li>
                      </ul>
                      <p className="text-xs text-muted-foreground italic pt-2">
                        Расшифровка относится к структуре обозначения серии
                        ВРУ-1. Состав аппаратов конкретной позиции должен
                        подтверждаться паспортом или номенклатурным каталогом
                        производителя.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <h3 className="text-lg font-bold">
                        Расшифровка типового обозначения
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Тип конструкторской разработки:</strong>{" "}
                          {markResult.development}
                        </li>
                        <li>
                          <strong>Номинальный ток:</strong>{" "}
                          {markResult.nominalCurrent} А
                        </li>
                        <li>
                          <strong>Модификация:</strong>{" "}
                          {markResult.modification}
                        </li>
                        <li>
                          <strong>Описание модификации:</strong>{" "}
                          {markResult.modificationName}
                        </li>
                        <li>
                          <strong>Климатическое исполнение:</strong>{" "}
                          {markResult.climate}
                        </li>
                      </ul>
                      <p className="text-xs text-muted-foreground italic pt-2">
                        Модификация и габариты следует подтверждать по
                        конкретному альбому типовых решений или техническим
                        условиям изготовителя.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Таб 2: Тип ВРУ */}
          {activeTab === "tab-2" && (
            <div className="max-w-2xl mx-auto space-y-4">
              <form onSubmit={handleTypeSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Тип объекта
                    </label>
                    <select
                      value={buildingType}
                      onChange={(e) => setBuildingType(e.target.value)}
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Выберите вариант</option>
                      <option value="private">Частный дом / коттедж</option>
                      <option value="apartment">
                        Многоквартирный жилой дом
                      </option>
                      <option value="public">
                        Общественное / коммерческое здание
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Этажность
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={floors}
                      onChange={(e) => setFloors(e.target.value)}
                      placeholder="Например: 9"
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Количество вводов
                    </label>
                    <select
                      value={inputs}
                      onChange={(e) => setInputs(e.target.value)}
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="1">1 ввод</option>
                      <option value="2">2 ввода</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Требуется АВР
                    </label>
                    <select
                      value={avr}
                      onChange={(e) => setAvr(e.target.value)}
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="no">Нет</option>
                      <option value="yes">Да</option>
                    </select>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-background font-bold"
                >
                  Подобрать тип ВРУ
                </Button>
              </form>

              {typeResult && (
                <div
                  className={`p-4 rounded-lg border-l-4 ${
                    typeResult.error
                      ? "bg-destructive/10 border-destructive text-destructive"
                      : "bg-card border-accent"
                  }`}
                >
                  {typeResult.error ? (
                    <p className="text-sm font-semibold">{typeResult.error}</p>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <h3 className="text-lg font-bold">
                        Рекомендуемое исполнение:
                      </h3>
                      <p className="text-accent font-semibold text-base">
                        {typeResult.recommendation}
                      </p>
                      <p className="text-muted-foreground">
                        {typeResult.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Таб 3: Номинальный ток */}
          {activeTab === "tab-3" && (
            <div className="max-w-2xl mx-auto space-y-4">
              <form onSubmit={handleCurrentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Ожидаемое исполнение
                    </label>
                    <select
                      value={currentExecution}
                      onChange={(e) => setCurrentExecution(e.target.value)}
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="cabinet">Шкафное ВРУ — до 160 А</option>
                      <option value="singlePanel">
                        Однопанельное ВРУ — 160–250 А
                      </option>
                      <option value="multiPanel">
                        Многопанельное ВРУ — 250–630 А
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Напряжение сети
                    </label>
                    <select
                      value={voltage}
                      onChange={(e) => setVoltage(e.target.value)}
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="400">400 В, трехфазная сеть</option>
                      <option value="230">230 В, однофазная сеть</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Расчетная мощность, кВт
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={power}
                      onChange={(e) => setPower(e.target.value)}
                      placeholder="Например: 50"
                      label="Расчетная мощность, кВт"
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Коэффициент мощности, cos φ
                    </label>
                    <select
                      value={cosPhi}
                      onChange={(e) => setCosPhi(e.target.value)}
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="0.8">0,80</option>
                      <option value="0.85">0,85</option>
                      <option value="0.9">0,90</option>
                      <option value="0.95">0,95</option>
                      <option value="1">1,00</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-1">
                      Запас по току, %
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={reserve}
                      onChange={(e) => setReserve(e.target.value)}
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-background font-bold"
                >
                  Рассчитать номинальный ток
                </Button>
              </form>

              {calcCurrentResult && (
                <div
                  className={`p-4 rounded-lg border-l-4 ${
                    calcCurrentResult.error
                      ? "bg-destructive/10 border-destructive text-destructive"
                      : "bg-card border-accent"
                  }`}
                >
                  {calcCurrentResult.error ? (
                    <p className="text-sm font-semibold">
                      {calcCurrentResult.error}
                    </p>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <h3 className="text-lg font-bold">Результаты расчёта:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Расчетный ток нагрузки:</strong>{" "}
                          {calcCurrentResult.exactCurrent} А
                        </li>
                        <li>
                          <strong>
                            Ток с учетом запаса ({calcCurrentResult.reserve}%):
                          </strong>{" "}
                          {calcCurrentResult.currentWithReserve} А
                        </li>
                        <li>
                          <strong>Рекомендуемый номинал аппарата:</strong>{" "}
                          <span className="text-accent text-lg font-bold">
                            {calcCurrentResult.recommendedNominal} А
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Таб 4: Схема ввода */}
          {activeTab === "tab-4" && (
            <div className="max-w-2xl mx-auto space-y-4">
              <form onSubmit={handleSchemeSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Количество вводов
                    </label>
                    <select
                      value={schemeInputs}
                      onChange={(e) => setSchemeInputs(e.target.value)}
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="1">1 ввод</option>
                      <option value="2">2 ввода</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Автоматический ввод резерва
                    </label>
                    <select
                      value={schemeAvr}
                      onChange={(e) => setSchemeAvr(e.target.value)}
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="no">Не требуется</option>
                      <option value="yes">Требуется АВР</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Учет электроэнергии
                    </label>
                    <select
                      value={schemeMetering}
                      onChange={(e) => setSchemeMetering(e.target.value)}
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="yes">Требуется счетчик</option>
                      <option value="no">Счетчик не требуется</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Система заземления
                    </label>
                    <select
                      value={schemeGrounding}
                      onChange={(e) => setSchemeGrounding(e.target.value)}
                      className="w-full border border-accent rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="tn-c-s">TN-C-S</option>
                      <option value="tn-s">TN-S</option>
                      <option value="tn-c">TN-C</option>
                    </select>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-background font-bold"
                >
                  Подобрать конфигурацию ввода
                </Button>
              </form>

              {schemeResult && (
                <div
                  className={`p-4 rounded-lg border-l-4 ${
                    schemeResult.error
                      ? "bg-destructive/10 border-destructive text-destructive"
                      : "bg-card border-accent"
                  }`}
                >
                  {schemeResult.error ? (
                    <p className="text-sm font-semibold">
                      {schemeResult.error}
                    </p>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <h3 className="text-lg font-bold">
                        {schemeResult.schemeName}
                      </h3>
                      <p className="text-muted-foreground">
                        {schemeResult.description}
                      </p>
                      <ul className="list-disc pl-5 space-y-1 pt-2">
                        <li>
                          <strong>Учет электроэнергии:</strong>{" "}
                          {schemeResult.metering}
                        </li>
                        <li>
                          <strong>Система заземления:</strong>{" "}
                          {schemeResult.grounding}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground text-center">
            Результат является предварительным. Окончательный выбор ВРУ,
            аппаратов защиты, сечений шин и кабелей, а также проверка токов
            короткого замыкания выполняются по проекту и техническим условиям
            изготовителя.
          </div>
        </section>

        {/* SECTION: ЦЕНЫ И БАЗОВЫЕ СМЕТЫ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Сколько стоит купить щит ВРУ в сборе в Москве?
          </h2>
          <p className="text-muted-foreground mb-6">
            Купить вводно-распределительное устройство (ВРУ) в Москве можно по
            цене от 15 000 рублей за уличный щит 15 кВт и от 45 000 рублей за
            типовые вводные панели на 250 А. Итоговая стоимость зависит от
            схемы, номинального тока (до 1600 А) и бренда автоматики.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-card">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Модель
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Назначение
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Ток
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Габариты
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Цена
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    ВРУ‑1‑11‑10
                  </td>
                  <td className="py-3 px-4">Вводная панель</td>
                  <td className="py-3 px-4">
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=250"
                      className="text-accent hover:underline"
                    >
                      250 А
                    </Link>
                  </td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    1800×800×450
                  </td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    от 75 000 ₽
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    ВРУ‑8504‑4АВР‑100
                  </td>
                  <td className="py-3 px-4">Панель с АВР, 2 ввода</td>
                  <td className="py-3 px-4">
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=100"
                      className="text-accent hover:underline"
                    >
                      100 А
                    </Link>
                  </td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    2000×800×450
                  </td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    от 85 000 ₽
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    ВРУ‑8505‑4Р‑100
                  </td>
                  <td className="py-3 px-4">Распределительная панель с УЗО</td>
                  <td className="py-3 px-4">100 А</td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    2000×600×450
                  </td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    от 50 000 ₽
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    ВРУ 15 кВт (пластик IP66)
                  </td>
                  <td className="py-3 px-4">Щит учёта на столб</td>
                  <td className="py-3 px-4">25 А</td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    520×350×165
                  </td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    от 15 000 ₽
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl p-4 mt-4 text-sm bg-card border border-border">
            <span className="text-muted-foreground">
              <strong>
                Итоговая стоимость ВРУ зависит от схемы, бренда комплектующих и
                степени защиты IP. Выше приведены ориентировочные цены на
                популярные модели.
              </strong>
            </span>
            <Button
              onClick={() => handleButtonClick("Запросить точную смету")}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-background text-lg py-4"
            >
              Запросить точную смету
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* SECTION: КАТАЛОГ СЕРИЙ ВРУ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Каталог серий ВРУ: выберите подходящий шкаф
          </h2>
          <p className="text-muted-foreground mb-6">
            В нашем каталоге представлены все основные серии
            вводно-распределительных устройств. Каждая панель собирается на
            собственном производстве в Москве, проходит заводские испытания и
            поставляется с сертификатом и паспортом.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[650px]">
              <thead className="bg-card">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Серия
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Назначение и ключевые преимущества
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Токи
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    IP
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">
                    <Link href="vru-1" className="text-accent hover:underline">
                      ВРУ‑1
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    Классические вводные и распределительные панели для жилых и
                    общественных зданий. Наличие панелей с рубильником и АВР
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">до 1600 А</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP31"
                      className="text-accent hover:underline"
                    >
                      IP31
                    </Link>
                    , IP54
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">
                    <Link href="vru-3" className="text-accent hover:underline">
                      ВРУ‑3
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    Улучшенная компоновка, меньшие габариты и вес. Блоки
                    управления освещением. Панель вводно-распределительная и щит
                    уличный ВРУ.
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">до 1600 А</td>
                  <td className="py-3 px-4 whitespace-nowrap">IP31, IP66</td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">
                    <Link href="vru-4" className="text-accent hover:underline">
                      ВРУ‑4
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    Поддержка пятипроводных сетей TN‑S. Влагостойкость до 98%.{" "}
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?sposob-montazha=навесные"
                      className="text-accent hover:underline"
                    >
                      Навесные
                    </Link>{" "}
                    и{" "}
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?sposob-montazha=напольные"
                      className="text-accent hover:underline"
                    >
                      напольные
                    </Link>{" "}
                    исполнения.
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">до 1600 А</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    IP31,{" "}
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP55"
                      className="text-accent hover:underline"
                    >
                      IP55
                    </Link>
                    ,{" "}
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP65"
                      className="text-accent hover:underline"
                    >
                      IP65
                    </Link>
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">
                    <Link
                      href="vru-8504"
                      className="text-accent hover:underline"
                    >
                      ВРУ‑8504
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    Модульная конструкция, усиленная рама 1,5 мм. АВР на реле
                    ЕЛ‑11. Шкаф ВРУ в сборе цена которого вас приятно удивит.
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">до 630 А</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    IP31, IP55, IP66
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">
                    <Link
                      href="vru-8505"
                      className="text-accent hover:underline"
                    >
                      ВРУ‑8505
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    Раздельные отсеки ввода и учёта по ПУЭ. Прозрачная панель
                    учёта. Вводно-распределительное устройство купить можно с
                    приборами в базе.
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">до 630 А</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    IP31, IP55, IP65, IP66
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">
                    <Link href="vru-21" className="text-accent hover:underline">
                      ВРУ‑21
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    Компактная серия: оцинкованная рама, медный монтаж,
                    стойкость к КЗ. Щит ВРУ 0 4 кВ цена — отличный выбор для
                    небольших объектов.
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">до 250 А</td>
                  <td className="py-3 px-4 whitespace-nowrap">IP31, IP54</td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-semibold">
                    <Link
                      href="vru-15-kvt-380v-trekhfaznyj"
                      className="text-accent hover:underline"
                    >
                      Готовые ВРУ 15 кВт 380в
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    Для частных домов и дач. Вводное устройство ВРУ цена
                    которого доступна каждому. Вводной автомат 25 А, счётчик,
                    УЗО.
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">25 А</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    IP55, IP65, IP66
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION: СРАВНЕНИЕ СЕРИЙ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Сравнение серий ВРУ по ключевым параметрам
          </h2>
          <p className="text-muted-foreground mb-6">
            Чтобы быстро выбрать подходящее вводно-распределительное устройство,
            воспользуйтесь сводной таблицей. В ней собраны конструктивные и
            функциональные особенности каждой серии.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[800px]">
              <thead className="bg-card">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Параметр
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    ВРУ‑1
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    ВРУ‑3
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    ВРУ‑4
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    ВРУ‑8504
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    ВРУ‑8505
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    ВРУ‑21
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">Номинальные токи</td>
                  <td className="py-3 px-4">100–1600 А</td>
                  <td className="py-3 px-4">32–1600 А</td>
                  <td className="py-3 px-4">40–1600 А</td>
                  <td className="py-3 px-4">32–630 А</td>
                  <td className="py-3 px-4">32–630 А</td>
                  <td className="py-3 px-4">40–250 А</td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">
                    Степень защиты (IP)
                  </td>
                  <td className="py-3 px-4">31, 54</td>
                  <td className="py-3 px-4">31, 66</td>
                  <td className="py-3 px-4">31, 55, 65</td>
                  <td className="py-3 px-4">31, 55, 66</td>
                  <td className="py-3 px-4">31, 55, 65, 66</td>
                  <td className="py-3 px-4">31, 54</td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">
                    Тип сети (система заземления)
                  </td>
                  <td className="py-3 px-4">TN‑C‑S</td>
                  <td className="py-3 px-4">TN‑C‑S</td>
                  <td className="py-3 px-4">
                    <strong>TN‑S</strong>, TN‑C‑S
                  </td>
                  <td className="py-3 px-4">TN‑S, TN‑C‑S</td>
                  <td className="py-3 px-4">TN‑S, TN‑C‑S</td>
                  <td className="py-3 px-4">TN‑S, TN‑C‑S</td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">Несущая рама</td>
                  <td className="py-3 px-4">1,0 мм</td>
                  <td className="py-3 px-4">1,0 мм</td>
                  <td className="py-3 px-4">1,5 мм</td>
                  <td className="py-3 px-4">
                    <strong>1,5 мм</strong>
                  </td>
                  <td className="py-3 px-4">1,0 мм (отсеки)</td>
                  <td className="py-3 px-4">
                    <strong>1,5 мм (оцинк.)</strong>
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">Макс. влажность</td>
                  <td className="py-3 px-4">60%</td>
                  <td className="py-3 px-4">60%</td>
                  <td className="py-3 px-4">
                    <strong>98%</strong>
                  </td>
                  <td className="py-3 px-4">
                    <strong>98%</strong>
                  </td>
                  <td className="py-3 px-4">
                    <strong>98%</strong>
                  </td>
                  <td className="py-3 px-4">60%</td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">АВР</td>
                  <td className="py-3 px-4">опция</td>
                  <td className="py-3 px-4">опция</td>
                  <td className="py-3 px-4">опция</td>
                  <td className="py-3 px-4">
                    <strong>встроен (реле ЕЛ‑11)</strong>
                  </td>
                  <td className="py-3 px-4">встроен</td>
                  <td className="py-3 px-4">опция</td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">Базовый комплект</td>
                  <td className="py-3 px-4">нет</td>
                  <td className="py-3 px-4">нет</td>
                  <td className="py-3 px-4">освещение, конденсаторы</td>
                  <td className="py-3 px-4">освещение, конденсаторы</td>
                  <td className="py-3 px-4">
                    <strong>счётчик, амперметр, вольтметр, исп. коробка</strong>
                  </td>
                  <td className="py-3 px-4">нет</td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">
                    Распределительные панели
                  </td>
                  <td className="py-3 px-4">предохранители / автоматы</td>
                  <td className="py-3 px-4">автоматы</td>
                  <td className="py-3 px-4">автоматы</td>
                  <td className="py-3 px-4">
                    <strong>УЗО + автоматы</strong>
                  </td>
                  <td className="py-3 px-4">УЗО + автоматы + пускатели</td>
                  <td className="py-3 px-4">автоматы</td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">
                    Учёт электроэнергии
                  </td>
                  <td className="py-3 px-4">опция</td>
                  <td className="py-3 px-4">опция</td>
                  <td className="py-3 px-4">опция</td>
                  <td className="py-3 px-4">опция</td>
                  <td className="py-3 px-4">
                    <strong>прозрачная панель, отдельный отсек</strong>
                  </td>
                  <td className="py-3 px-4">опция</td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold">
                    Управление освещением
                  </td>
                  <td className="py-3 px-4">нет</td>
                  <td className="py-3 px-4">опция (БУО)</td>
                  <td className="py-3 px-4">нет</td>
                  <td className="py-3 px-4">нет</td>
                  <td className="py-3 px-4">
                    <strong>готовые панели для МКД</strong>
                  </td>
                  <td className="py-3 px-4">нет</td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-semibold">Гарантия</td>
                  <td className="py-3 px-4">3 года</td>
                  <td className="py-3 px-4">3 года</td>
                  <td className="py-3 px-4">3 года</td>
                  <td className="py-3 px-4">3 года</td>
                  <td className="py-3 px-4">3 года</td>
                  <td className="py-3 px-4">3 года</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION: ГОТОВЫЕ РЕШЕНИЯ 15 КВТ */}
        <section className="mb-12 rounded-2xl p-6 border border-accent bg-card">
          <h2 className="text-2xl font-bold mb-3">
            Готовые решения 15 кВт 380В — щиты для частного дома
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Если вам нужно <strong>купить щит вру в сборе</strong> для
            подключения участка или дачи, обратите внимание на наши готовые
            комплекты{" "}
            <Link
              href="vvodno-raspredelitelnye-ustrojstva-vru?schetchik=да"
              className="text-accent hover:underline"
            >
              ВРУ со счётчиками
            </Link>
            . Такой <strong>щит уличный вру</strong> полностью соответствует ТУ
            Россетей и проходит приёмку инспектором с первого раза. В составе:
            вводной автомат 3P 25А, трёхфазный счётчик, УЗО, разделение PEN на N
            и PE. Корпуса: металл IP65 или пластик IP66 (не глушит GSM-сигнал).{" "}
            <strong>Сколько стоит вру</strong> такого плана? Цена начинается от
            15 000 рублей — и это <strong>вру в сборе цена</strong> с полным
            пакетом документов.
          </p>
        </section>

        {/* SECTION: РУКОВОДСТВО ПО ВЫБОРУ */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Руководство по выбору ВРУ
          </h2>
          <p className="text-muted-foreground">
            Правильно подобранное вводно-распределительное устройство
            гарантирует бесперебойное электроснабжение и беспроблемную сдачу
            объекта. Следуйте пошаговой инструкции, чтобы купить щит ВРУ в
            сборе, идеально подходящий под ваши задачи.
          </p>

          <div className="grid grid-cols-1 gap-6">
            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-xl">
                  Шаг 1. Определите номинальный ток (Iₙ) и расчётную мощность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm italic text-muted-foreground">
                  Для индивидуального жилого дома (ИЖД) или дачи обычно
                  достаточно 15 кВт (25 А). Многоквартирные дома (МКД) до 5
                  этажей требуют 100–250 А, высотные МКД и производства — от 250
                  А и выше.
                </p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-card">
                      <tr>
                        <th className="text-left py-2 px-3 font-semibold border-b border-border">
                          Ток
                        </th>
                        <th className="text-left py-2 px-3 font-semibold border-b border-border">
                          Типовые объекты
                        </th>
                        <th className="text-left py-2 px-3 font-semibold border-b border-border">
                          Рекомендуемые серии ВРУ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 font-bold">до 100 А</td>
                        <td className="py-2 px-3">
                          ИЖД, дачи, небольшие офисы, торговые павильоны
                        </td>
                        <td className="py-2 px-3">
                          ВРУ‑21, ВРУ‑8504, ВРУ‑8505, готовые ВРУ 15 кВт
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 font-bold">100–250 А</td>
                        <td className="py-2 px-3">
                          МКД до 5 этажей, административные здания, коттеджи
                        </td>
                        <td className="py-2 px-3">
                          ВРУ‑1, ВРУ‑3, ВРУ‑4, ВРУ‑8504, ВРУ‑8505
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 font-bold">250–400 А</td>
                        <td className="py-2 px-3">
                          Крупные жилые комплексы, торговые центры, производства
                        </td>
                        <td className="py-2 px-3">
                          ВРУ‑1, ВРУ‑3, ВРУ‑4, ВРУ‑8504, ВРУ‑8505
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 font-bold">400–630 А</td>
                        <td className="py-2 px-3">
                          Промышленные объекты, логистические комплексы, ЦОД
                        </td>
                        <td className="py-2 px-3">
                          ВРУ‑1, ВРУ‑3, ВРУ‑8504, ВРУ‑8505
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-bold">630–1600 А</td>
                        <td className="py-2 px-3">
                          Крупные заводы, высотные здания, энергоёмкие
                          производства
                        </td>
                        <td className="py-2 px-3">ВРУ‑1, ВРУ‑3, ВРУ‑4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-xl">
                  Шаг 2. Выберите количество вводов и необходимость АВР
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=1"
                      className="text-accent hover:underline font-semibold"
                    >
                      1 ввод
                    </Link>{" "}
                    — для объектов III категории надёжности (допустим перерыв до
                    1 суток). Подойдут любые вводные панели.
                  </li>
                  <li>
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?kolichestvo-vvodov=2"
                      className="text-accent hover:underline font-semibold"
                    >
                      2 ввода
                    </Link>{" "}
                    (основной + резервный) — для объектов II категории.
                    Требуется ручной реверсивный переключатель или панель с АВР.
                  </li>
                  <li>
                    <strong>
                      2 ввода с автоматическим вводом резерва (АВР)
                    </strong>{" "}
                    — для объектов I категории (больницы, серверные, котельные).
                    Используйте панели{" "}
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?naznachenie-paneli=с+АВР"
                      className="text-accent hover:underline"
                    >
                      ВРУ с АВР
                    </Link>{" "}
                    из серий ВРУ‑8504, ВРУ‑8505, ВРУ‑1.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-xl">
                  Шаг 3. Определите степень защиты IP и климатическое исполнение
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    IP31 (
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?klimaticheskoe-ispolnenie=УХЛ4"
                      className="text-accent hover:underline font-semibold"
                    >
                      УХЛ4
                    </Link>
                    ) — для сухих отапливаемых электрощитовых внутри зданий.
                  </li>
                  <li>
                    IP54 / IP55 (
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?klimaticheskoe-ispolnenie=УХЛ1"
                      className="text-accent hover:underline font-semibold"
                    >
                      УХЛ1
                    </Link>
                    ) — для подвалов, влажных и неотапливаемых помещений,
                    установки под навесом.
                  </li>
                  <li>
                    IP65 /{" "}
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?stepen-zashity-ip=IP66"
                      className="text-accent hover:underline font-semibold"
                    >
                      IP66
                    </Link>{" "}
                    (УХЛ1) — для уличной установки на столбах, фасадах, в
                    агрессивных средах.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-xl">
                  Шаг 4. Подберите серию ВРУ по функциональным требованиям
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="italic text-muted-foreground mb-2">
                  Для высотных МКД (более 5 этажей) используйте многопанельные
                  компоновки из серий ВРУ‑1 или ВРУ‑8505. Для ИЖД и коттеджей
                  достаточно компактного ВРУ‑21 или готового решения 15 кВт.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Нужна <strong>пятипроводная сеть TN‑S</strong> и высокая
                    влагостойкость (98%) — выбирайте ВРУ‑4.
                  </li>
                  <li>
                    Важна <strong>усиленная несущая рама 1,5 мм</strong> и{" "}
                    <strong>АВР на реле ЕЛ‑11</strong> — ВРУ‑8504.
                  </li>
                  <li>
                    Требуется{" "}
                    <strong>
                      разделение отсеков ввода и учёта с прозрачной панелью
                    </strong>{" "}
                    (полное соответствие ПУЭ) — ВРУ‑8505. Счётчик и
                    измерительные приборы уже в базе.
                  </li>
                  <li>
                    Нужно <strong>компактное и экономичное решение</strong> для
                    небольших объектов — ВРУ‑21. Оцинкованная рама, медный
                    монтаж.
                  </li>
                  <li>
                    Если проект бюджетный или типовой, подойдут проверенные
                    временем ВРУ‑1 и ВРУ‑3.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-xl">
                  Шаг 5. Выберите комплектацию и дополнительные опции
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Тип вводного аппарата:</strong> рубильник,
                    переключатель,{" "}
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?vyklyuchatel-na-othodyashih-liniyah=да"
                      className="text-accent hover:underline"
                    >
                      автоматические выключатели
                    </Link>
                    .
                  </li>
                  <li>
                    <strong>Управление нагрузками:</strong> для дистанционного
                    включения мощных потребителей или работы в составе АВР могут
                    применяться{" "}
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?kontaktory=да"
                      className="text-accent hover:underline"
                    >
                      контакторы
                    </Link>
                    .
                  </li>
                  <li>
                    <strong>Приборы учёта:</strong> трёхфазный счётчик
                    (Меркурий, Энергомера),{" "}
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?transformator-toka=да"
                      className="text-accent hover:underline"
                    >
                      трансформаторы тока
                    </Link>
                    . Для «умного» учёта — счётчики с GSM/RS‑485. Если счётчик
                    не требуется, можно заказать{" "}
                    <Link
                      href="vvodno-raspredelitelnye-ustrojstva-vru?schetchik=нет"
                      className="text-accent hover:underline"
                    >
                      вру без счётчика
                    </Link>
                    .
                  </li>
                  <li>
                    <strong>Дополнительная защита:</strong> УЗО
                    (противопожарное, 100/300 мА), УЗИП (класс B+C), реле
                    напряжения.
                  </li>
                  <li>
                    <strong>Автоматика управления освещением</strong> — готовые
                    панели для лестнично-лифтовых узлов и коридоров (ВРУ‑8505).
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-xl">
                  Шаг 6. Определите ценовую категорию комплектующих
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    <strong>Эконом:</strong> IEK, DEKraft, EKF.
                  </li>
                  <li>
                    <strong>Стандарт (рекомендуем):</strong> КЭАЗ, CHINT.
                  </li>
                  <li>
                    <strong>Премиум:</strong> Systeme Electric, ABB.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-xl">
                  Шаг 7. Для частного дома или дачи (15 кВт 380В) — готовое
                  решение
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  Вам не нужно подбирать компоненты по отдельности. Достаточно
                  готового ВРУ 15 кВт 380В в корпусе IP65/IP66. Внутри уже
                  установлены вводной автомат 25А, трёхфазный счётчик, УЗО и
                  выполнено разделение PEN. Такой щит полностью соответствует ТУ
                  Россетей и принимается инспектором с первого раза.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION: СТРУКТУРА ОБОЗНАЧЕНИЯ ВРУ */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Для проектировщиков: структура условного обозначения ВРУ
          </h2>
          <p className="text-muted-foreground">
            Точная маркировка панелей позволяет сформировать заказ без ошибок и
            ускоряет расчёт стоимости. Ниже приведена расшифровка индексов для
            всех серий, которые мы производим.
          </p>
          <p className="text-sm font-semibold">
            Наиболее востребованные типовые панели: ВРУ1-11-10 (вводная 2×250
            А), ВРУ1-21-10 (вводно-распределительная), ВРУ8505-4Р-100
            (распределительная с УЗО). Полный перечень и расшифровку индексов
            смотрите в таблицах ниже.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Серии ВРУ‑1, ВРУ‑3 и ВРУ‑4
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Структура:{" "}
                <code className="bg-card px-2 py-1 rounded text-accent">
                  ВРУ‑X‑XX‑X X X‑УХЛ4
                </code>
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-card">
                    <tr>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Позиция
                      </th>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Значение
                      </th>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Расшифровка
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">1</td>
                      <td className="py-2 px-3 font-bold">1, 3 или 4</td>
                      <td className="py-2 px-3">
                        Номер разработки: 1 → ВРУ‑1; 3 → ВРУ‑3; 4 → ВРУ‑4
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">2</td>
                      <td className="py-2 px-3 font-bold">XX</td>
                      <td className="py-2 px-3">
                        <strong>Назначение панели:</strong> 11–19 —{" "}
                        <Link
                          href="vvodno-raspredelitelnye-ustrojstva-vru?naznachenie-paneli=вводные"
                          className="text-accent hover:underline"
                        >
                          вводные
                        </Link>
                        ; 21–29 —{" "}
                        <Link
                          href="vvodno-raspredelitelnye-ustrojstva-vru?naznachenie-paneli=вводно-распределительные"
                          className="text-accent hover:underline"
                        >
                          вводно-распределительные
                        </Link>
                        ; 41–50 —{" "}
                        <Link
                          href="vvodno-raspredelitelnye-ustrojstva-vru?naznachenie-paneli=распределительные"
                          className="text-accent hover:underline"
                        >
                          распределительные
                        </Link>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">3</td>
                      <td className="py-2 px-3 font-bold">X</td>
                      <td className="py-2 px-3">
                        <strong>Наличие аппарата на вводе:</strong> 0 —
                        отсутствует; 1 — переключатель 250 А; 2 — переключатель{" "}
                        <Link
                          href="vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=400"
                          className="text-accent hover:underline"
                        >
                          400 А
                        </Link>
                        ; 3 — переключатель{" "}
                        <Link
                          href="vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=630"
                          className="text-accent hover:underline"
                        >
                          630 А
                        </Link>
                        ; 4 — выключатель 630 А; 5 — выключатель 250 А; 6 — блок
                        «выключатель-предохранитель» 250 А; 7 — блок
                        «выключатель-предохранитель» + АВР 100 А; 8 — аналогично
                        250 А; 9 — аналогично 400 А
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">4</td>
                      <td className="py-2 px-3 font-bold">X</td>
                      <td className="py-2 px-3">
                        <strong>Дополнительное оборудование:</strong> 0 — нет; 1
                        — блок АУО на 30 групп; 2 — блок РУО на 30 групп; 3 —
                        АУО на 14 групп; 4 — РУО на 14 групп; 5 — АУО на 8
                        групп; 6 — РУО на 8 групп
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">5</td>
                      <td className="py-2 px-3 font-bold">«А» или пусто</td>
                      <td className="py-2 px-3">
                        <strong>Защитные аппараты на отходящих линиях:</strong>{" "}
                        «А» — автоматические выключатели; нет значения —
                        предохранители
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold">6</td>
                      <td className="py-2 px-3 font-bold">УХЛ4</td>
                      <td className="py-2 px-3">
                        <strong>Климатическое исполнение</strong> по ГОСТ 15150
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">
                Серии ВРУ‑8504 и ВРУ‑8505
              </h3>
              <h4 className="text-base font-semibold mb-2 text-accent">
                Вводные панели (структура: Х ХХ‑X‑XX‑X‑XX)
              </h4>
              <div className="overflow-x-auto rounded-xl border border-border mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-card">
                    <tr>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Позиция
                      </th>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Значение
                      </th>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Расшифровка
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">1</td>
                      <td className="py-2 px-3 font-bold">3 или 4</td>
                      <td className="py-2 px-3">
                        Разработка: 3 → ВРУ‑8504; 4 → ВРУ‑8505
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">2</td>
                      <td className="py-2 px-3 font-bold">
                        ВА / ВР / ВП / КВП
                      </td>
                      <td className="py-2 px-3">
                        Исполнение: ВА — вводная с автоматическим выключателем;
                        ВР — с рубильником; ВП — с переключателем; КВП — с
                        переключателем для однокабельного ввода до 95 мм²
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">3</td>
                      <td className="py-2 px-3 font-bold">X</td>
                      <td className="py-2 px-3">
                        Номер принципиальной электрической схемы
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">4</td>
                      <td className="py-2 px-3 font-bold">16, 25, 40, 63</td>
                      <td className="py-2 px-3">
                        Номинальный ток:{" "}
                        <Link
                          href="vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=1600"
                          className="text-accent hover:underline"
                        >
                          1600 А
                        </Link>
                        , 250 А, 400 А, 630 А
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">5</td>
                      <td className="py-2 px-3 font-bold">0 или 1</td>
                      <td className="py-2 px-3">
                        Наличие АВР: 0 — нет; 1 — есть (АВР)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold">6</td>
                      <td className="py-2 px-3 font-bold">00, 31</td>
                      <td className="py-2 px-3">Степень защиты IP: IP31</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="text-base font-semibold mb-2 text-accent">
                Распределительные панели (структура: Х Р‑X‑XX‑XX)
              </h4>
              <div className="overflow-x-auto rounded-xl border border-border mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-card">
                    <tr>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Позиция
                      </th>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Значение
                      </th>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Расшифровка
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">1</td>
                      <td className="py-2 px-3 font-bold">3 или 4</td>
                      <td className="py-2 px-3">
                        Разработка (3 → 8504; 4 → 8505)
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">2</td>
                      <td className="py-2 px-3 font-bold">Р</td>
                      <td className="py-2 px-3">Распределительная панель</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">3</td>
                      <td className="py-2 px-3 font-bold">1 или 2</td>
                      <td className="py-2 px-3">
                        Ширина панели: 1 → 450 мм; 2 → 630 мм
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">4</td>
                      <td className="py-2 px-3 font-bold">XX</td>
                      <td className="py-2 px-3">Номер принципиальной схемы</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold">5</td>
                      <td className="py-2 px-3 font-bold">00, 31</td>
                      <td className="py-2 px-3">Степень защиты IP: IP31</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="text-base font-semibold mb-2 text-accent">
                Панели АВР (структура: Х АВР‑XX‑X‑XX)
              </h4>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-card">
                    <tr>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Позиция
                      </th>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Значение
                      </th>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Расшифровка
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">1</td>
                      <td className="py-2 px-3 font-bold">3 или 4</td>
                      <td className="py-2 px-3">Разработка</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">2</td>
                      <td className="py-2 px-3 font-bold">АВР</td>
                      <td className="py-2 px-3">АВР</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">3</td>
                      <td className="py-2 px-3 font-bold">10, 16, 25, 40</td>
                      <td className="py-2 px-3">
                        Номинальный ток: 100 А, 1600 А, 250 А, 400 А
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">4</td>
                      <td className="py-2 px-3 font-bold">
                        01 или 02 (только для 100 А)
                      </td>
                      <td className="py-2 px-3">
                        Дополнительное оборудование: 01 — два доп. автомата; 02
                        — три доп. автомата
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold">5</td>
                      <td className="py-2 px-3 font-bold">00, 31</td>
                      <td className="py-2 px-3">Степень защиты IP: IP31</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Серия ВРУ‑21</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Структура:{" "}
                <code className="bg-card px-2 py-1 rounded text-accent">
                  ВРУ‑21‑XX‑X‑X‑XX
                </code>
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-card">
                    <tr>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Позиция
                      </th>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Значение
                      </th>
                      <th className="text-left py-2 px-3 font-semibold border-b border-border">
                        Расшифровка
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">1</td>
                      <td className="py-2 px-3 font-bold">21</td>
                      <td className="py-2 px-3">Номер разработки: ВРУ‑21</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">2</td>
                      <td className="py-2 px-3 font-bold">XX</td>
                      <td className="py-2 px-3">
                        <strong>Назначение панели:</strong> 11–19 — вводные;
                        21–29 — вводно-распределительные; 41–50 —
                        распределительные
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">3</td>
                      <td className="py-2 px-3 font-bold">X</td>
                      <td className="py-2 px-3">
                        <strong>Наличие АВР:</strong> 0 — нет; 1 — есть (АВР)
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3 font-bold">4</td>
                      <td className="py-2 px-3 font-bold">X</td>
                      <td className="py-2 px-3">
                        <strong>Дополнительное оборудование:</strong> 0 — нет;
                        1–6 — аналогично ВРУ‑1/3/4 (блоки управления освещением)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold">5</td>
                      <td className="py-2 px-3 font-bold">31, 54</td>
                      <td className="py-2 px-3">
                        Степень защиты IP: IP31, IP54
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic">
              Если вы затрудняетесь с выбором индексов, отправьте нам
              однолинейную схему или опросный лист — инженер подберёт точную
              конфигурацию и рассчитает стоимость.
            </p>
          </div>
        </section>

        {/* SECTION: ПРЕИМУЩЕСТВА ПРОИЗВОДСТВА */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Почему выбирают наше производство щитов ВРУ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-accent">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">
                  Собственный сборочный цех в Москве
                </h3>
                <p className="text-sm text-muted-foreground">
                  Мы изготовитель вру, а не перекупщик. Всегда можете приехать
                  на предприятие и посмотреть, как собирается ваш заказ.
                </p>
              </CardContent>
            </Card>
            <Card className="border-accent">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">
                  ВРУ купить с сертификатом
                </h3>
                <p className="text-sm text-muted-foreground">
                  Каждое изделие поставляется с паспортом, однолинейной схемой,
                  протоколом испытаний и копией сертификата ТР ТС.
                </p>
              </CardContent>
            </Card>
            <Card className="border-accent">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">
                  Любые бренды комплектующих
                </h3>
                <p className="text-sm text-muted-foreground">
                  Собираем как на отечественной аппаратуре (КЭАЗ, IEK, DEKraft),
                  так и на премиальной (Systeme Electric, ABB).
                </p>
              </CardContent>
            </Card>
            <Card className="border-accent">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">
                  Быстрые сроки изготовления
                </h3>
                <p className="text-sm text-muted-foreground">
                  Изготовление ВРУ в Москве занимает от 3 до 14 дней в
                  зависимости от сложности. Есть срочные заказы — постараемся
                  уложиться в минимальные сроки.
                </p>
              </CardContent>
            </Card>
            <Card className="border-accent md:col-span-2 lg:col-span-2">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">
                  Удобство — шкаф ВРУ в сборе
                </h3>
                <p className="text-sm text-muted-foreground">
                  Это полностью укомплектованный щит, который не нужно собирать
                  по частям — ставьте и подключайте.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION: КАК ЗАКАЗАТЬ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Как заказать ВРУ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-accent bg-card">
              <div className="text-2xl font-bold text-accent mb-2">01</div>
              <p className="text-sm font-medium">
                Отправьте однолинейную схему или ТЗ — инженер рассчитает КП за 2
                часа.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-accent bg-card">
              <div className="text-2xl font-bold text-accent mb-2">02</div>
              <p className="text-sm font-medium">
                Согласуйте спецификацию и выберите бренд автоматики.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-accent bg-card">
              <div className="text-2xl font-bold text-accent mb-2">03</div>
              <p className="text-sm font-medium">
                Мы изготовим шкаф, проведём испытания и подготовим документы.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-accent bg-card">
              <div className="text-2xl font-bold text-accent mb-2">04</div>
              <p className="text-sm font-medium">
                Доставка по Москве и области собственным транспортом с
                гидробортом.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => handleButtonClick("Получить бесплатный расчёт")}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-background text-xl py-6 px-8"
            >
              Получить бесплатный расчёт
            </Button>
          </div>
        </section>

        {/* FAQ COMPONENT */}
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
