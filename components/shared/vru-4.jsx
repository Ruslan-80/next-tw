"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import PopularNaborVru from "@/components/PopularNaborVru";
import { MathJaxContext, MathJax } from "better-react-mathjax";

const QUICK_LINKS = [
  {
    href: "/catalog/vru-21",
    label: "Серия ВРУ 21",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-s-avr",
    label: "ВРУ с АВР",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-na-kontaktorakh",
    label: "ВРУ на контакторах",
  },
];

export function vru4Top() {
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
              <h2 className="text-2xl lg:text-5xl font-bold text-accent leading-tight">
                Вводно-распределительные устройства ВРУ-4 в Москве
              </h2>
              <p className="text-muted-foreground text-text leading-relaxed">
                <strong className="text-accent">
                  Вводно-распределительное устройство ВРУ‑4
                </strong>{" "}
                — это специализированное электрощитовое оборудование,
                предназначенное для приёма, коммерческого учёта и распределения
                электроэнергии напряжением 380/220 В, а также для защиты
                отходящих линий от перегрузок и коротких замыканий.{" "}
                <strong className="text-accent">Щит ВРУ‑4</strong> широко
                востребован в Москве для многоквартирных домов, промышленных и
                общественных зданий, где требуется соответствие современным
                стандартам энергобезопасности.{" "}
                <strong className="text-accent">Шкаф ВРУ‑4</strong> может
                комплектоваться автоматическими выключателями, счётчиками,
                трансформаторами тока и АВР под проект заказчика. Все{" "}
                <strong className="text-accent">панели ВРУ‑4</strong>{" "}
                изготавливаются по ГОСТ и ПУЭ, что гарантирует их надёжность и
                прохождение контроля в энергосбытовых компаниях. Купить{" "}
                <strong className="text-accent">вру 4</strong> в сборе от
                производителя можно с доставкой по Москве и в регионы России.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
              <Button
                onClick={() =>
                  handleButtonClick("Бесплатный расчет по вашей схеме")
                }
                size="lg"
                className="bg-accent hover:bg-accent/90 text-background text-xl py-8"
              >
                Бесплатный расчет по вашей схеме
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            {/* Светящееся размытие позади */}
            <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>

            {/* Адаптивный контейнер */}
            <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/vvodno-raspredelitelnye-ustrojstva-vru.webp"
                alt="Вводно-распределительные устройства ВРУ-4"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                preload={true}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 px-2 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="whitespace-nowrap text-base font-semibold text-text/70 lg:text-lg">
              Смотрите также:
            </span>
            <div className="flex flex-wrap gap-2.5 text-base">
              {QUICK_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-1.5 font-medium text-text transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <PopularNaborVru /> */}
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

export function vru4Bottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // --- Состояния калькулятора ---
  const [activeTab, setActiveTab] = useState("vru-tab-1");
  const [markInput, setMarkInput] = useState("");
  const [markResult, setMarkResult] = useState(null);

  const [typeForm, setTypeForm] = useState({
    buildingType: "",
    floors: "",
    inputs: "1",
    avr: "no",
  });
  const [typeResult, setTypeResult] = useState(null);

  const [currentForm, setCurrentForm] = useState({
    vruType: "cabinet",
    voltage: "400",
    power: "",
    cosPhi: "0.9",
    reserve: "10",
  });
  const [currentResult, setCurrentResult] = useState(null);

  const [schemeForm, setSchemeForm] = useState({
    inputs: "1",
    avr: "no",
    metering: "yes",
    grounding: "tn-c-s",
  });
  const [schemeResult, setSchemeResult] = useState(null);

  // --- Состояния пагинации таблицы ---
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // --- Данные товаров ---
  const products = [
    [
      "ВРУ-4-32-111",
      "Вводно-распределительное устройство 32А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-32-221",
      "Вводно-распределительное устройство 32А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-32-411",
      "Вводно-распределительное устройство 32А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-40-112",
      "Вводно-распределительное устройство 40А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-40-222",
      "Вводно-распределительное устройство 40А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-40-412",
      "Вводно-распределительное устройство 40А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-63-113",
      "Вводно-распределительное устройство 63А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-63-223",
      "Вводно-распределительное устройство 63А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-63-413",
      "Вводно-распределительное устройство 63А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-100-114",
      "Вводно-распределительное устройство 100А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-100-224",
      "Вводно-распределительное устройство 100А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-100-414",
      "Вводно-распределительное устройство 100А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-125-115",
      "Вводно-распределительное устройство 125А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-125-225",
      "Вводно-распределительное устройство 125А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-125-415",
      "Вводно-распределительное устройство 125А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-250-116",
      "Вводно-распределительное устройство 250А IP31, 1 ввод, с АВР, со счетчиком, УХЛ4",
      75000,
    ],
    [
      "ВРУ-4-250-226",
      "Вводно-распределительное устройство 250А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-250-416",
      "Вводно-распределительное устройство 250А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-400-117",
      "Вводно-распределительное устройство 400А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-400-227",
      "Вводно-распределительное устройство 400А IP31, 1 ввод, с АВР, со счетчиком, УХЛ4",
      75000,
    ],
    [
      "ВРУ-4-400-417",
      "Вводно-распределительное устройство 400А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-500-118",
      "Вводно-распределительное устройство 500А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-500-228",
      "Вводно-распределительное устройство 500А IP31, 1 ввод, с АВР, со счетчиком, УХЛ4",
      75000,
    ],
    [
      "ВРУ-4-500-418",
      "Вводно-распределительное устройство 500А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-630-119",
      "Вводно-распределительное устройство 630А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-630-229",
      "Вводно-распределительное устройство 630А IP31, 1 ввод, с АВР, со счетчиком, УХЛ4",
      75000,
    ],
    [
      "ВРУ-4-630-419",
      "Вводно-распределительное устройство 630А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-800-120",
      "Вводно-распределительное устройство 800А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-800-230",
      "Вводно-распределительное устройство 800А IP31, 1 ввод, с АВР, со счетчиком, УХЛ4",
      75000,
    ],
    [
      "ВРУ-4-800-420",
      "Вводно-распределительное устройство 800А IP31, 1 ввод, со счетчиком, УХЛ4",
      50000,
    ],
    [
      "ВРУ-4-1000-121",
      "Вводно-распределительное устройство 1000А IP55, 1 ввод, со счетчиком, УХЛ1",
      50000,
    ],
    [
      "ВРУ-4-1000-231",
      "Вводно-распределительное устройство 1000А IP31, 1 ввод, с АВР, со счетчиком, УХЛ4",
      75000,
    ],
    [
      "ВРУ-4-1000-421",
      "Вводно-распределительное устройство 1000А IP65, 1 ввод, со счетчиком, УХЛ1",
      50000,
    ],
    [
      "ВРУ-4-1600-122",
      "Вводно-распределительное устройство 1600А IP66, 1 ввод, со счетчиком, УХЛ1",
      50000,
    ],
    [
      "ВРУ-4-1600-232",
      "Вводно-распределительное устройство 1600А IP31, 1 ввод, с АВР, со счетчиком, УХЛ4",
      75000,
    ],
    [
      "ВРУ-4-1600-422",
      "Вводно-распределительное устройство 1600А IP65, 1 ввод, со счетчиком, УХЛ1",
      50000,
    ],
  ];

  const totalPages = Math.ceil(products.length / rowsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Инициализация MathJax
  useEffect(() => {
    if (typeof window !== "undefined" && window.MathJax) {
      window.MathJax.typesetPromise && window.MathJax.typesetPromise();
    }
  }, []);

  // --- Словари для расшифровки ---
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

  // --- Обработчики калькулятора ---
  const handleMarkSubmit = (e) => {
    e.preventDefault();
    const mark = markInput.trim().toUpperCase().replace(/\s+/g, " ");
    if (!mark) {
      setMarkResult({ isError: true, text: "Введите маркировку ВРУ." });
      return;
    }

    const legacyRegex = /^ВРУ-?1-(\d{2})-(\d)(\d)(А)?(?:\s|-)?(УХЛ\d)?$/iu;
    const modernRegex = /^ВРУ-(\d{1,2})-(\d{2,3})-(\d{3})(?:\s|-)?(УХЛ\d)?$/iu;

    const legacyMatch = mark.match(legacyRegex);
    const modernMatch = mark.match(modernRegex);

    if (legacyMatch) {
      setMarkResult({
        isError: false,
        type: "legacy",
        series: "ВРУ-1",
        panelName:
          legacyPurposeMap[legacyMatch[1]] ||
          "Назначение уточняется по каталогу производителя",
        inputName:
          legacyInputEquipmentMap[legacyMatch[2]] ||
          "Код аппаратуры ввода не распознан",
        additionalName:
          legacyAdditionalEquipmentMap[legacyMatch[3]] ||
          "Код дополнительного оборудования не распознан",
        protectionName: legacyMatch[4]
          ? "На отходящих линиях применены автоматические выключатели"
          : "Тип защитных аппаратов уточняется по исполнению",
        climate: legacyMatch[5] || "УХЛ4",
      });
      return;
    }

    if (modernMatch) {
      setMarkResult({
        isError: false,
        type: "modern",
        development: modernMatch[1],
        nominalCurrent: modernMatch[2],
        modification: modernMatch[3],
        modificationName:
          modernModificationMap[modernMatch[3]] ||
          "Модификация уточняется по альбому типовых решений",
        climate: modernMatch[4] || "УХЛ4",
      });
      return;
    }

    setMarkResult({
      isError: true,
      text: "Маркировка не распознана. Используйте, например: ВРУ-1-21-10 УХЛ4 или ВРУ-2-400-102-УХЛ4.",
    });
  };

  const handleTypeSubmit = (e) => {
    e.preventDefault();
    const { buildingType, floors, inputs, avr } = typeForm;
    const numFloors = Number(floors);

    if (!buildingType) {
      setTypeResult({ isError: true, text: "Выберите тип объекта." });
      return;
    }
    if (!numFloors || numFloors < 1) {
      setTypeResult({ isError: true, text: "Укажите этажность объекта." });
      return;
    }
    if (inputs === "1" && avr === "yes") {
      setTypeResult({
        isError: true,
        text: "АВР требует минимум два взаиморезервируемых питающих ввода.",
      });
      return;
    }

    let recommendation = "";
    let explanation = "";

    if (buildingType === "apartment" && numFloors > 5) {
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

    setTypeResult({
      isError: false,
      recommendation,
      inputs,
      avrText:
        avr === "yes"
          ? "Предусмотрено исполнение с АВР и двумя взаиморезервируемыми вводами."
          : "АВР не требуется по выбранным параметрам.",
      explanation,
    });
  };

  const handleCurrentSubmit = (e) => {
    e.preventDefault();
    const { vruType, voltage, power, cosPhi, reserve } = currentForm;
    const numVoltage = Number(voltage);
    const numPower = Number(power);
    const numCos = Number(cosPhi);
    const numReserve = Number(reserve);

    if (!numPower || numPower <= 0) {
      setCurrentResult({
        isError: true,
        text: "Введите расчетную мощность больше нуля.",
      });
      return;
    }
    if (numReserve < 0 || numReserve > 50) {
      setCurrentResult({
        isError: true,
        text: "Запас по току должен быть в диапазоне от 0 до 50%.",
      });
      return;
    }

    const reserveRatio = numReserve / 100;
    const baseCurrent =
      numVoltage === 400
        ? (numPower * 1000) / (Math.sqrt(3) * numVoltage * numCos)
        : (numPower * 1000) / (numVoltage * numCos);
    const currentWithReserve = baseCurrent * (1 + reserveRatio);

    const nominalSets = {
      cabinet: [25, 32, 40, 63, 100, 125, 160],
      singlePanel: [160, 200, 250],
      multiPanel: [250, 400, 500, 630, 800, 1000, 1600],
    };
    const typeNames = {
      cabinet: "шкафное ВРУ",
      singlePanel: "однопанельное ВРУ",
      multiPanel: "многопанельное ВРУ",
    };
    const nominalCurrent = nominalSets[vruType].find(
      (item) => item >= currentWithReserve
    );

    setCurrentResult({
      isError: false,
      baseCurrent: baseCurrent.toFixed(1),
      reservePercent: numReserve,
      currentWithReserve: currentWithReserve.toFixed(1),
      vruTypeName: typeNames[vruType],
      recommendation: nominalCurrent
        ? `${nominalCurrent}`
        : "Номинал превышает допустимый ряд выбранного исполнения",
      note: nominalCurrent
        ? "Результат предварительный: перед выбором необходимо проверить селективность защит, токи короткого замыкания, нагрев шин и аппаратов."
        : "Выберите следующее исполнение ВРУ либо передайте расчет инженеру для подбора индивидуального решения.",
      hasNominal: Boolean(nominalCurrent),
    });
  };

  const handleSchemeSubmit = (e) => {
    e.preventDefault();
    const { inputs, avr, metering, grounding } = schemeForm;

    if (inputs === "1" && avr === "yes") {
      setSchemeResult({
        isError: true,
        text: "АВР нельзя выбрать для одного ввода: требуется минимум два взаиморезервируемых источника питания.",
      });
      return;
    }

    let title = "";
    let description = "";

    if (inputs === "1") {
      title = "Один рабочий ввод без АВР";
      description =
        "Предварительно подходит ВРУ с одним вводом. Конкретная схема и состав аппаратов определяются по системе заземления, учету, току и проекту.";
    } else if (inputs === "2" && avr === "no") {
      title = "Два ввода без автоматического переключения";
      description =
        "Предварительно рассматривается решение с ручным переключением, раздельным питанием секций или иной схемой, заданной проектом.";
    } else {
      title = "Два взаиморезервируемых ввода с АВР";
      description =
        "Требуется ВРУ или вводная панель с блоком АВР. Конкретные коммутационные аппараты, алгоритм АВР и категория надежности должны быть определены проектом.";
    }

    setSchemeResult({
      isError: false,
      title,
      meteringText:
        metering === "yes"
          ? "Необходимо предусмотреть блок учета."
          : "Отдельный блок учета не выбран.",
      grounding: grounding.toUpperCase(),
      description,
    });
  };

  return (
    <div className="py-8 font-sans text-text">
      {/* SECTION: CALCULATOR TABS */}
      <section
        id="vru-calc"
        className="container mx-auto py-6 text-xl lg:text-2xl mb-12"
      >
        <div className="mb-6">
          <p className="text-sm font-bold tracking-widest text-accent uppercase mb-1">
            Онлайн-подбор
          </p>
          <h2 className="text-3xl font-semibold mb-2">
            Подберите ВРУ по параметрам объекта
          </h2>
          <p className="text-base lg:text-lg text-slate-600">
            Получите предварительный подбор по маркировке, типу исполнения,
            номинальному току и конфигурации вводов.
          </p>
        </div>

        {/* Переключение табов */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
          <button
            type="button"
            className={`px-4 py-2 font-medium text-base rounded-t-lg transition-colors ${
              activeTab === "vru-tab-1"
                ? "bg-accent text-background font-bold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("vru-tab-1")}
          >
            Расшифровка маркировки
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium text-base rounded-t-lg transition-colors ${
              activeTab === "vru-tab-2"
                ? "bg-accent text-background font-bold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("vru-tab-2")}
          >
            Тип ВРУ
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium text-base rounded-t-lg transition-colors ${
              activeTab === "vru-tab-3"
                ? "bg-accent text-background font-bold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("vru-tab-3")}
          >
            Номинальный ток
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium text-base rounded-t-lg transition-colors ${
              activeTab === "vru-tab-4"
                ? "bg-accent text-background font-bold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("vru-tab-4")}
          >
            Схема ввода
          </button>
        </div>

        {/* Панели табов */}
        <div className="p-6 rounded-xl border border-gray-200 shadow-sm">
          {/* Таб 1: Маркировка */}
          {activeTab === "vru-tab-1" && (
            <div>
              <form onSubmit={handleMarkSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="vru-mark-input"
                    className="block text-base font-medium mb-1"
                  >
                    Маркировка ВРУ
                  </label>
                  <input
                    type="text"
                    id="vru-mark-input"
                    className="w-full p-3 border rounded-lg text-base"
                    placeholder="Например: ВРУ-1-21-10 УХЛ4"
                    aria-label="Маркировка ВРУ"
                    value={markInput}
                    onChange={(e) => setMarkInput(e.target.value)}
                  />
                  <small className="text-gray-500 block mt-1 text-sm">
                    Поддерживаются форматы: ВРУ-1-21-10 УХЛ4 и
                    ВРУ-2-400-102-УХЛ4.
                  </small>
                </div>
                <Button type="submit" className="bg-accent text-background">
                  Получить расшифровку
                </Button>
              </form>

              {markResult && (
                <div
                  className={`mt-6 p-4 rounded-lg border text-base ${
                    markResult.isError
                      ? "border-red-300 bg-red-50 text-red-800"
                      : "border-blue-200 bg-blue-50 text-blue-900"
                  }`}
                >
                  {markResult.isError ? (
                    <div>
                      <strong>Ошибка:</strong> {markResult.text}
                    </div>
                  ) : markResult.type === "legacy" ? (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold">
                        Расшифровка {markResult.series}
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Серия:</strong> {markResult.series}
                        </li>
                        <li>
                          <strong>Назначение:</strong> {markResult.panelName}
                        </li>
                        <li>
                          <strong>Аппаратура ввода:</strong>{" "}
                          {markResult.inputName}
                        </li>
                        <li>
                          <strong>Дополнительное оборудование:</strong>{" "}
                          {markResult.additionalName}
                        </li>
                        <li>
                          <strong>Защитные аппараты:</strong>{" "}
                          {markResult.protectionName}
                        </li>
                        <li>
                          <strong>Климатическое исполнение:</strong>{" "}
                          {markResult.climate}
                        </li>
                      </ul>
                      <p className="text-sm text-gray-600">
                        Расшифровка относится к структуре обозначения серии
                        ВРУ-1. Состав аппаратов конкретной позиции должен
                        подтверждаться паспортом или номенклатурным каталогом
                        производителя.
                      </p>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-2"
                      >
                        <a
                          href={`/catalog/vvodno-raspredelitelnye-ustrojstva-vru${markResult.series}`}
                        >
                          Посмотреть ВРУ в каталоге
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
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
                      <p className="text-sm text-gray-600">
                        Модификация и габариты следует подтверждать по
                        конкретному альбому типовых решений или техническим
                        условиям изготовителя.
                      </p>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-2"
                      >
                        <a
                          href={`/catalog/vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=${markResult.nominalCurrent}`}
                        >
                          Показать ВРУ с этим номиналом
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Таб 2: Тип */}
          {activeTab === "vru-tab-2" && (
            <div>
              <form onSubmit={handleTypeSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="vru-building-type"
                      className="block text-base font-medium mb-1"
                    >
                      Тип объекта
                    </label>
                    <select
                      id="vru-building-type"
                      className="w-full p-3 border rounded-lg text-base"
                      value={typeForm.buildingType}
                      onChange={(e) =>
                        setTypeForm({
                          ...typeForm,
                          buildingType: e.target.value,
                        })
                      }
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
                    <label
                      htmlFor="vru-building-floors"
                      className="block text-base font-medium mb-1"
                    >
                      Этажность
                    </label>
                    <input
                      type="number"
                      id="vru-building-floors"
                      className="w-full p-3 border rounded-lg text-base"
                      min="1"
                      max="100"
                      placeholder="Например: 9"
                      aria-label="Этажность"
                      value={typeForm.floors}
                      onChange={(e) =>
                        setTypeForm({ ...typeForm, floors: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="vru-building-inputs"
                      className="block text-base font-medium mb-1"
                    >
                      Количество вводов
                    </label>
                    <select
                      id="vru-building-inputs"
                      className="w-full p-3 border rounded-lg text-base"
                      value={typeForm.inputs}
                      onChange={(e) =>
                        setTypeForm({ ...typeForm, inputs: e.target.value })
                      }
                    >
                      <option value="1">1 ввод</option>
                      <option value="2">2 ввода</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="vru-building-avr"
                      className="block text-base font-medium mb-1"
                    >
                      Требуется АВР
                    </label>
                    <select
                      id="vru-building-avr"
                      className="w-full p-3 border rounded-lg text-base"
                      value={typeForm.avr}
                      onChange={(e) =>
                        setTypeForm({ ...typeForm, avr: e.target.value })
                      }
                    >
                      <option value="no">Нет</option>
                      <option value="yes">Да</option>
                    </select>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground"
                >
                  Подобрать тип ВРУ
                </Button>
              </form>

              {typeResult && (
                <div
                  className={`mt-6 p-4 rounded-lg border text-base ${
                    typeResult.isError
                      ? "border-red-300 bg-red-50 text-red-800"
                      : "border-blue-200 bg-blue-50 text-blue-900"
                  }`}
                >
                  {typeResult.isError ? (
                    <div>
                      <strong>Ошибка:</strong> {typeResult.text}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold">
                        Предварительный подбор типа
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Рекомендуемое исполнение:</strong>{" "}
                          {typeResult.recommendation}
                        </li>
                        <li>
                          <strong>Количество вводов:</strong>{" "}
                          {typeResult.inputs}
                        </li>
                        <li>
                          <strong>АВР:</strong> {typeResult.avrText}
                        </li>
                      </ul>
                      <p className="text-sm text-gray-600">
                        {typeResult.explanation}
                      </p>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-2"
                      >
                        <a href="#vru-catalog">Подобрать товары</a>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Таб 3: Ток */}
          {activeTab === "vru-tab-3" && (
            <div>
              <form onSubmit={handleCurrentSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="vru-current-type"
                      className="block text-base font-medium mb-1"
                    >
                      Ожидаемое исполнение
                    </label>
                    <select
                      id="vru-current-type"
                      className="w-full p-3 border rounded-lg text-base"
                      value={currentForm.vruType}
                      onChange={(e) =>
                        setCurrentForm({
                          ...currentForm,
                          vruType: e.target.value,
                        })
                      }
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
                    <label
                      htmlFor="vru-current-voltage"
                      className="block text-base font-medium mb-1"
                    >
                      Напряжение сети
                    </label>
                    <select
                      id="vru-current-voltage"
                      className="w-full p-3 border rounded-lg text-base"
                      value={currentForm.voltage}
                      onChange={(e) =>
                        setCurrentForm({
                          ...currentForm,
                          voltage: e.target.value,
                        })
                      }
                    >
                      <option value="400">400 В, трехфазная сеть</option>
                      <option value="230">230 В, однофазная сеть</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="vru-current-power"
                      className="block text-base font-medium mb-1"
                    >
                      Расчетная мощность, кВт
                    </label>
                    <input
                      type="number"
                      id="vru-current-power"
                      className="w-full p-3 border rounded-lg text-base"
                      min="0.1"
                      step="0.1"
                      placeholder="Например: 50"
                      aria-label="Расчетная мощность, кВт"
                      value={currentForm.power}
                      onChange={(e) =>
                        setCurrentForm({
                          ...currentForm,
                          power: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="vru-current-cosphi"
                      className="block text-base font-medium mb-1"
                    >
                      Коэффициент мощности, cos φ
                    </label>
                    <select
                      id="vru-current-cosphi"
                      className="w-full p-3 border rounded-lg text-base"
                      value={currentForm.cosPhi}
                      onChange={(e) =>
                        setCurrentForm({
                          ...currentForm,
                          cosPhi: e.target.value,
                        })
                      }
                    >
                      <option value="0.8">0,80</option>
                      <option value="0.85">0,85</option>
                      <option value="0.9">0,90</option>
                      <option value="0.95">0,95</option>
                      <option value="1">1,00</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="vru-current-reserve"
                      className="block text-base font-medium mb-1"
                    >
                      Запас по току, %
                    </label>
                    <input
                      type="number"
                      id="vru-current-reserve"
                      className="w-full p-3 border rounded-lg text-base"
                      min="0"
                      max="50"
                      value={currentForm.reserve}
                      onChange={(e) =>
                        setCurrentForm({
                          ...currentForm,
                          reserve: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <Button type="submit" className="bg-accent text-background">
                  Рассчитать номинальный ток
                </Button>
              </form>

              {currentResult && (
                <div
                  className={`mt-6 p-4 rounded-lg border text-base ${
                    currentResult.isError
                      ? "border-red-300 bg-red-50 text-red-800"
                      : "border-blue-200 bg-blue-50 text-blue-900"
                  }`}
                >
                  {currentResult.isError ? (
                    <div>
                      <strong>Ошибка:</strong> {currentResult.text}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold">
                        Предварительный расчет тока
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Расчетный ток:</strong>{" "}
                          {currentResult.baseCurrent} А
                        </li>
                        <li>
                          <strong>
                            Ток с учетом запаса {currentResult.reservePercent}%:
                          </strong>{" "}
                          {currentResult.currentWithReserve} А
                        </li>
                        <li>
                          <strong>Выбранное исполнение:</strong>{" "}
                          {currentResult.vruTypeName}
                        </li>
                        <li>
                          <strong>Рекомендуемый номинал:</strong>{" "}
                          {currentResult.recommendation}
                        </li>
                      </ul>
                      <p className="text-sm text-gray-600">
                        {currentResult.note}
                      </p>
                      {currentResult.hasNominal && (
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="mt-2"
                        >
                          <a
                            href={`/catalog/vvodno-raspredelitelnye-ustrojstva-vru?nominalnyj-tok=${currentResult.recommendation}`}
                          >
                            Показать ВРУ по току
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Таб 4: Схема */}
          {activeTab === "vru-tab-4" && (
            <div>
              <form onSubmit={handleSchemeSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="vru-scheme-inputs"
                      className="block text-base font-medium mb-1"
                    >
                      Количество вводов
                    </label>
                    <select
                      id="vru-scheme-inputs"
                      className="w-full p-3 border rounded-lg text-base"
                      value={schemeForm.inputs}
                      onChange={(e) =>
                        setSchemeForm({ ...schemeForm, inputs: e.target.value })
                      }
                    >
                      <option value="1">1 ввод</option>
                      <option value="2">2 ввода</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="vru-scheme-avr"
                      className="block text-base font-medium mb-1"
                    >
                      Автоматический ввод резерва
                    </label>
                    <select
                      id="vru-scheme-avr"
                      className="w-full p-3 border rounded-lg text-base"
                      value={schemeForm.avr}
                      onChange={(e) =>
                        setSchemeForm({ ...schemeForm, avr: e.target.value })
                      }
                    >
                      <option value="no">Не требуется</option>
                      <option value="yes">Требуется АВР</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="vru-scheme-metering"
                      className="block text-base font-medium mb-1"
                    >
                      Учет электроэнергии
                    </label>
                    <select
                      id="vru-scheme-metering"
                      className="w-full p-3 border rounded-lg text-base"
                      value={schemeForm.metering}
                      onChange={(e) =>
                        setSchemeForm({
                          ...schemeForm,
                          metering: e.target.value,
                        })
                      }
                    >
                      <option value="yes">Требуется счетчик</option>
                      <option value="no">Счетчик не требуется</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="vru-scheme-grounding"
                      className="block text-base font-medium mb-1"
                    >
                      Система заземления
                    </label>
                    <select
                      id="vru-scheme-grounding"
                      className="w-full p-3 border rounded-lg text-base"
                      value={schemeForm.grounding}
                      onChange={(e) =>
                        setSchemeForm({
                          ...schemeForm,
                          grounding: e.target.value,
                        })
                      }
                    >
                      <option value="tn-c-s">TN-C-S</option>
                      <option value="tn-s">TN-S</option>
                      <option value="tn-c">TN-C</option>
                    </select>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground"
                >
                  Подобрать конфигурацию ввода
                </Button>
              </form>

              {schemeResult && (
                <div
                  className={`mt-6 p-4 rounded-lg border text-base ${
                    schemeResult.isError
                      ? "border-red-300 bg-red-50 text-red-800"
                      : "border-blue-200 bg-blue-50 text-blue-900"
                  }`}
                >
                  {schemeResult.isError ? (
                    <div>
                      <strong>Ошибка:</strong> {schemeResult.text}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold">
                        Предварительная конфигурация ввода
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Конфигурация:</strong> {schemeResult.title}
                        </li>
                        <li>
                          <strong>Учет:</strong> {schemeResult.meteringText}
                        </li>
                        <li>
                          <strong>Система заземления:</strong>{" "}
                          {schemeResult.grounding}
                        </li>
                      </ul>
                      <p className="text-sm text-gray-600">
                        {schemeResult.description}
                      </p>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-2"
                      >
                        <a href="#vru-catalog">Показать подходящие ВРУ</a>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <p className="italic text-slate-600 mt-3 text-sm lg:text-base">
          Результат является предварительным. Окончательный выбор ВРУ, аппаратов
          защиты, сечений шин и кабелей, а также проверка токов короткого
          замыкания выполняются по проекту и техническим условиям изготовителя.
        </p>
      </section>

      {/* SECTION: CATALOG TABLE */}
      <section
        id="vru-catalog"
        className="container mx-auto py-6 text-xl lg:text-2xl mb-12"
      >
        <h2 className="text-3xl font-semibold mb-6 border-l-8 border-accent pl-4">
          В наличии ВРУ‑4 в Москве
        </h2>
        <div className="overflow-x-auto rounded-xl border border-text shadow-lg">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="text-left bg-slate-100 border-b">
              <tr>
                <th className="p-4 border">Артикул</th>
                <th className="p-4 border">Наименование и характеристики</th>
                <th className="p-4 border">Базовая цена, руб.</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((prod, idx) => (
                <tr key={idx} className="hover:bg-slate-50 border-b">
                  <td className="p-4 font-bold">{prod[0]}</td>
                  <td className="p-4">{prod[1]}</td>
                  <td className="p-4 font-bold text-red-700">
                    {prod[2].toLocaleString()} руб.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Пагинация */}
        <div className="flex gap-2 justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`px-4 py-2 border rounded-lg text-base font-medium transition-colors ${
                page === currentPage
                  ? "bg-accent text-background font-bold"
                  : "bg-white text-slate-800 hover:bg-slate-100 border-slate-300"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION: CTA AUDIT & NO CONFIGURATION */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12 space-y-8">
        {/* Блок "Аудит сметы" */}
        <div className="p-8 rounded-xl border border-text shadow-sm">
          <h2 className="text-2xl text-accent font-bold mb-4">
            Уже есть спецификация или расчет от другого поставщика?
          </h2>
          <p className="mb-4 text-base lg:text-xl">
            Наши инженеры бесплатно проведут <strong>технический аудит</strong>{" "}
            вашей сметы:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-base lg:text-lg">
            <li>
              Проверим однолинейную схему на соответствие ПУЭ и ГОСТ, исключим
              возможные <strong>ошибки в расчете</strong> номиналов и сечений.
            </li>
            <li>
              Предложим <strong>оптимизированное бюджетное решение</strong> на
              надёжных альтернативных комплектующих (IEK, EKF, КЭАЗ) — часто это
              снижает итоговую стоимость сборки на 15–30% без потери
              характеристик.
            </li>
            <li>
              Если вы уже получили конкурентное предложение, мы поможем сравнить
              его с нашим и выбрать действительно выгодный вариант.
            </li>
          </ul>
          <Button
            onClick={() => handleButtonClick("Загрузить спецификацию на аудит")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-base py-6 px-8"
          >
            Загрузить спецификацию на аудит
          </Button>
        </div>

        {/* Блок "Не нашли комплектацию" */}
        <div className="p-8 rounded-xl border border-text shadow-sm">
          <h2 className="text-2xl text-accent font-bold mb-4">
            Не нашли нужную комплектацию?
          </h2>
          <p className="mb-6 text-base lg:text-xl">
            Если среди типовых сборок нет подходящего варианта, просто отправьте
            нам вашу <strong>однолинейную схему (ОЛС)</strong> — мы соберём{" "}
            <strong>ВРУ‑4</strong> точно по вашему проекту. Или скачайте и
            заполните опросный лист, чтобы наши инженеры спроектировали и
            подобрали оптимальную конфигурацию под ваши задачи.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button
              asChild
              variant="outline"
              className="border-orange-600 text-orange-700 hover:bg-orange-100"
            >
              <a
                href="/docs/oprosnyj-list-vru.docx"
                target="_blank"
                rel="noopener noreferrer"
              >
                Скачать опросный лист
              </a>
            </Button>
            <Button
              onClick={() => handleButtonClick("Загрузить однолинейную схему")}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Загрузить однолинейную схему
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION: GUIDE */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6">
          Руководство по выбору ВРУ‑4
        </h2>
        <p className="mb-6 text-base lg:text-xl">
          При выборе <strong>вру 4</strong> инженерам и проектировщикам
          необходимо учитывать расчётный номинальный ток, степень защиты
          металлокорпуса, схему вводов и наличие автоматического резервирования.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">
              1. Расчёт мощности и номинального тока
            </h3>
            <p className="mb-4 text-base lg:text-lg">
              Ошибки на этом этапе приводят либо к переплате, либо к
              срабатыванию защиты. Для трёхфазной сети переменного тока
              применяется формула:
            </p>
            <div className="my-6 p-4 rounded-lg font-bold border border-text text-center font-serif">
              <MathJaxContext>
                <MathJax>
                  {`\\( I = \\frac{P}{\\sqrt{3} \\cdot U \\cdot \\cos \\phi} \\)`}
                </MathJax>
              </MathJaxContext>
            </div>
            <p className="mb-6 text-base lg:text-lg">
              Где <em>P</em> — мощность в ваттах, <em>U</em> — линейное
              напряжение (380 В), а <em>cos φ</em> — коэффициент мощности
              (обычно принимается за 0,9).
            </p>

            <h3 className="text-xl font-bold mb-2">2. Схемы вводов и АВР</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-base lg:text-lg">
              <li>
                <strong>Один ввод:</strong> стандартное решение для объектов III
                категории надёжности.
              </li>
              <li>
                <strong>Два ввода (перекидной рубильник):</strong> ручное
                переключение на резерв при аварии.
              </li>
              <li>
                <strong>Два ввода с АВР:</strong> автоматическое переключение
                для критически важных объектов (больницы, серверные).
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">3. Степень защиты (IP)</h3>
            <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg">
              <li>
                <strong>IP31 (УХЛ4):</strong> для сухих отапливаемых
                электрощитовых.
              </li>
              <li>
                <strong>IP54/IP55 (УХЛ3):</strong> для производственных цехов и
                подвалов.
              </li>
              <li>
                <strong>IP65/IP66 (УХЛ1):</strong> для улицы и строительных
                площадок.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION: COMMERCIAL / SERVICE */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          Покупка ВРУ‑4 в Москве (Производство и логистика)
        </h2>
        <p className="mb-6 text-base lg:text-xl">
          Мы обеспечиваем строгий контроль качества, оперативную отгрузку и
          всестороннее инженерное сопровождение на всех этапах поставки ВРУ-4.
        </p>

        {/* Контакты и Оплата */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold text-xl mb-4">📍 Контакты и логистика</h3>
            <ul className="list-disc pl-5 space-y-2 text-base lg:text-lg">
              <li>
                <strong>Адрес производства и самовывоз:</strong> г. Москва, ул.
                Чермянская, д. 1, стр. 1, офис 214.
              </li>
              <li>
                <strong>Бесплатная доставка по Москве:</strong> При заказе от 70
                000 рублей.
              </li>
              <li>
                <strong>Доставка в регионы:</strong> Любой транспортной
                компанией (доставка до терминала ТК в Москве — бесплатно).
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold text-xl mb-4">
              💳 Рассрочка, оплата и гарантия
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-base lg:text-lg">
              <li>
                <strong>Рассрочка (B2B):</strong> Для постоянных партнёров
                доступен запуск производства по частичной предоплате.
                Окончательный расчёт — по готовности шкафа.
              </li>
              <li>
                <strong>Гарантия:</strong> На все собранные шкафы
                предоставляется гарантия до <strong>3 лет</strong>.
              </li>
              <li>
                <strong>Сервисный центр:</strong> Удалённые технические
                консультации и выезд инженера на объект.
              </li>
            </ul>
          </div>
        </div>

        {/* Аудит и Оптимизация */}
        <div className="p-6 rounded-xl border shadow-sm mb-12">
          <h3 className="font-bold text-xl mb-4">
            Бесплатный анализ спецификации и оптимизация затрат
          </h3>
          <p className="text-base lg:text-lg mb-4">
            Если у вас уже есть готовая проектная документация или коммерческое
            предложение от сторонней организации, наши инженеры выполнят{" "}
            <strong>технический аудит расчета</strong>. Мы не только выявим
            возможные <strong>ошибки</strong> в подборе аппаратов защиты и
            сечениях кабелей, но и подготовим{" "}
            <strong>альтернативное бюджетное решение</strong> на компонентах с
            сопоставимыми характеристиками. Такой подход позволяет заказчикам
            получить <strong>оптимизированную смету</strong> и сэкономить до 30%
            бюджета без ущерба для безопасности электроустановки.
          </p>
          <Button
            onClick={() =>
              handleButtonClick("Получить коммерческое предложение")
            }
            className="bg-accent text-background font-bold"
          >
            Получить коммерческое предложение
          </Button>
        </div>
      </section>

      {/* SECTION: FAQ */}
      {/* <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6">
          Часто задаваемые вопросы
        </h2>
        <div className="space-y-6">
          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Обязательно ли устанавливать ВРУ-4 в отдельном специализированном
              помещении (электрощитовой)?
            </h3>
            <p className="text-base lg:text-lg text-slate-700">
              Согласно ПУЭ, вводно-распределительные устройства рекомендуется
              размещать в выделенных электрощитовых. Однако допускается
              установка в общих коридорах или подвалах, если щит имеет надежно
              запирающийся <strong>металлический корпус</strong> и
              соответствующую <strong>степень защиты</strong> от пыли и влаги —
              не ниже IP31. Это позволяет обеспечить безопасную эксплуатацию без
              организации отдельного помещения.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Можно ли модернизировать ВРУ-4 после покупки и установки на
              объекте?
            </h3>
            <p className="text-base lg:text-lg text-slate-700">
              Да, конструкция наших шкафов имеет модульную архитектуру. Она
              позволяет добавлять новые <strong>отходящие линии</strong>,
              устанавливать дополнительные{" "}
              <strong>реле контроля напряжения</strong>, менять автоматические
              выключатели на более мощные или даже интегрировать{" "}
              <strong>трансформаторы тока</strong> для подключения цепей учета.
              Главное — не превышать пропускную способность вводного кабеля и
              сечения <strong>медных шин</strong>, что всегда проверяется нашими
              инженерами перед внесением изменений.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Как организован ввод питающих кабелей: сверху или снизу?
            </h3>
            <p className="text-base lg:text-lg text-slate-700">
              Конструкция обговаривается индивидуально под особенности вашей
              кабельной трассы. Возможен как{" "}
              <strong>верхний, так и нижний ввод/вывод</strong>. Для удобного
              нижнего ввода проектируется съемная часть дна шкафа или
              применяется специальное <strong>цокольное основание</strong>.
              Такое решение упрощает монтаж и не требует нарушения целостности
              корпуса при прокладке кабелей.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Можно ли внести изменения в комплектацию после того, как счет уже
              оплачен?
            </h3>
            <p className="text-base lg:text-lg text-slate-700">
              Если щит еще не передан на <strong>сборочную линию</strong>,
              оперативное внесение изменений возможно. Мы просто скорректируем
              спецификацию и заменим необходимые комплектующие. Если же процесс
              сборки уже стартовал, потребуется индивидуальное согласование с
              нашими инженерами и, при необходимости, корректировка сметы. В
              любом случае мы найдем решение, чтобы готовое устройство полностью
              соответствовало вашему проекту.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Требуется ли спецтехника (манипулятор) для разгрузки ВРУ-4?
            </h3>
            <p className="text-base lg:text-lg text-slate-700">
              ВРУ-4 — это крупногабаритное электрощитовое оборудование. Вес
              одной панели, зависящий от толщины металла, сечения{" "}
              <strong>медных шин</strong> и плотности компоновки, может
              составлять от 80 до 150 кг. Для безопасной разгрузки на объекте
              часто требуется <strong>манипулятор</strong> или подготовленная
              бригада. Мы заранее предупреждаем о габаритных размерах и весе
              готового шкафа, чтобы вы могли спланировать логистику без
              задержек.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow-sm">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              У меня есть смета от другой компании. Вы можете её проверить и
              предложить более дешёвый вариант?
            </h3>
            <p className="text-base lg:text-lg text-slate-700">
              Да, это одна из наших ключевых услуг. Пришлите расчёт или
              спецификацию — мы бесплатно проведём{" "}
              <strong>технический аудит</strong>: проверим корректность выбора
              вводного автомата, уставок защиты и сечений шин. После анализа
              предложим <strong>оптимизированное решение</strong> на надёжных
              комплектующих, которое позволит снизить итоговую стоимость щита.
              Как правило, такое <strong>бюджетное решение</strong> обходится на
              15–30% дешевле исходного, полностью соответствуя нормам ПУЭ и
              ГОСТ.
            </p>
          </div>
        </div>
      </section> */}

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
