"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import {
  ChevronDown,
  ChevronUp,
  Cable,
  Server,
  Shield,
  Home,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

const ComparisonTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const tableData = [
    {
      parameter: "Тип устройства",
      data: [
        "Встроенное",
        "Блочное, навесное/встроенное",
        "Навесное",
        "Навесное с кабельным отсеком",
        "Модульное, навесное",
      ],
    },
    {
      parameter: "Назначение",
      data: [
        "Прием, распределение, учет электроэнергии, защита линий, слаботочные системы",
        "Аналогично УЭРВ",
        "Аналогично УЭРВ",
        "Аналогично УЭРВ",
        "Аналогично УЭРВ, акцент на АСКУЭ и модульность",
      ],
    },
    {
      parameter: "Конструкция",
      data: [
        "Пространственная рама, открытая, кроме фасада, короба ТБ с ГВЛ",
        "Блочная, закрывает стену, выламываемые отверстия, винты",
        "Цельносварная, полная оболочка, кроме кабельных отверстий",
        "Трехсекционная, кабельный отсек, компенсатор высоты, болты",
        "Сборная, короба КЭТ, КСС, ящики ЯУР, компенсатор высоты",
      ],
    },
    {
      parameter: "Материал корпуса",
      data: [
        "Листовой металл, RAL 9003",
        "Листовой металл, RAL 9003/7035",
        "Листовой металл, RAL 7035",
        "Листовой металл, RAL 9003/7035",
        "Листовой металл, RAL 9003/7035",
      ],
    },
    {
      parameter: "Способ установки",
      data: [
        "Встроенный, в нишу, анкеры",
        "Навесной/встроенный, винты",
        "Навесной, винты/анкеры",
        "Навесной/встроенный, болты",
        "Навесной, винты/хомуты",
      ],
    },
    {
      parameter: "Габаритные размеры",
      data: [
        "От 1200x1200x200 мм",
        "~1890x300x150 мм (по проекту)",
        "2700x1700x250 мм (EKF, 12 квартир)",
        "До 3050 мм высота (с компенсатором)",
        "КЭТ/КСС: 1890x300x150 мм (нижний), 810x300x150 мм (верхний); ЯУР: 300x300x150 мм (12 модулей) или 600x300x150 мм (24 модуля)",
      ],
    },
    {
      parameter: "Масса",
      data: ["~52 кг", "~21–52 кг", "~21 кг", "~21–52 кг", "~21–52 кг"],
    },
    {
      parameter: "Количество квартир",
      data: ["До 10", "До 9", "До 12", "До 12", "До 12"],
    },
    {
      parameter: "Отсеки/модули",
      data: [
        "Слаботочный, вводно-учетный, распределительный, силовые магистрали",
        "Слаботочный, вводно-учетный, распределительный, силовые магистрали",
        "Слаботочный, вводно-учетный, распределительный, силовые магистрали (4 дверцы)",
        "Слаботочный (КСС), вводно-учетный, распределительный, силовые магистрали, кабельный отсек",
        "КЭТ, КСС (4 дверцы), ЯУР, вводно-учетный, распределительный, силовые магистрали",
      ],
    },
    {
      parameter: "Степень защиты",
      data: [
        "IP31 (фасад), IP00 (остальные стороны)",
        "IP31 (фасад), IP00 (остальные стороны)",
        "IP31 (фасад)",
        "IP31 (фасад), IP00 (остальные стороны)",
        "IP31 (фасад), IP00 (остальные стороны)",
      ],
    },
    {
      parameter: "Климатическое исполнение",
      data: [
        "УХЛ4 (-25°C до +40°C)",
        "УХЛ4 (-25°C до +40°C)",
        "УХЛ3 (-25°C до +40°C)",
        "УХЛ4 (-25°C до +40°C)",
        "УХЛ3/УХЛ4 (-25°C до +40°C)",
      ],
    },
    {
      parameter: "Номинальное напряжение",
      data: [
        "230/400 В, 50 Гц",
        "230/400 В, 50 Гц",
        "230/400 В, 50 Гц",
        "230/400 В, 50 Гц",
        "230/400 В, 50 Гц",
      ],
    },
    {
      parameter: "Номинальные токи",
      data: ["25–125 А", "25–125 А", "25–125 А", "25–125 А", "25–125 А"],
    },
    {
      parameter: "Дифференциальные токи АВДТ/УЗО",
      data: [
        "10, 30, 100, 300 мА",
        "10, 30, 100, 300 мА",
        "10, 30, 100, 300 мА",
        "10, 30, 100, 300 мА",
        "10, 30, 100, 300 мА",
      ],
    },
    {
      parameter: "Максимальное сечение проводников",
      data: ["95 мм²", "95 мм²", "95 мм²", "95 мм²", "95 мм²"],
    },
    {
      parameter: "Отключающая способность",
      data: ["≥4,5 кА", "≥4,5 кА", "≥4,5 кА", "≥4,5 кА", "≥4,5 кА"],
    },
    {
      parameter: "Уникальные особенности",
      data: [
        "ГВЛ-отделка, компактность для ниш",
        "Выламываемые отверстия, закрытие стены",
        "Полная оболочка, монтаж без ниши",
        "Кабельный отсек, компенсатор высоты",
        "Модульная сборка, поддержка АСКУЭ",
      ],
    },
    {
      parameter: "Преимущества",
      data: [
        "Эстетичная интеграция, компактность, безопасность",
        "Гибкая компоновка, эстетика, простота монтажа",
        "Простота установки, вместимость, эстетика",
        "Быстрая установка, жесткость, удобство транспортировки",
        "Универсальность, модульность, поддержка АСКУЭ",
      ],
    },
    {
      parameter: "Комплектность",
      data: [
        "Каркас, двери, шины N/PE, DIN-рейки, ключи, паспорт, схемы, сертификат",
        "Корпус, двери, шины N/PE, DIN-рейки, ключи, паспорт, схемы, сертификат",
        "Корпус, 4 дверцы, шины N/PE, DIN-рейки, паспорт, схемы, сертификат",
        "Корпус (3 секции), двери, шины N/PE, DIN-рейки, компенсатор, ключи, паспорт, схемы, сертификат",
        "Короба КЭТ/КСС, ЯУР, шины N/PE, DIN-рейки, Z-/П-профили, ключи, паспорт, схемы, сертификат",
      ],
    },
    {
      parameter: "Не входит в комплект",
      data: [
        "Счетчики, фазные сжимы, УЗИП",
        "Счетчики, фазные сжимы, УЗИП",
        "Счетчики, фазные сжимы, УЗИП, замки",
        "Счетчики, фазные сжимы, УЗИП",
        "Счетчики, фазные сжимы, УЗИП",
      ],
    },
    {
      parameter: "Монтаж",
      data: [
        "В нишу, анкеры, отверстия Ø25–32 мм",
        "Навесной/встроенный, винты, выламываемые отверстия",
        "Навесной, винты/анкеры, отверстия Ø25–32 мм",
        "Навесной/встроенный, болты, отверстия Ø25–32 мм",
        "Навесной, винты/хомуты, отверстия Ø25–32 мм",
      ],
    },
    {
      parameter: "Срок службы",
      data: [
        "25 лет, гарантия 3 года",
        "25 лет, гарантия 3 года",
        "25 лет, гарантия 3 года",
        "25 лет, гарантия 3 года",
        "25 лет, гарантия 3 года",
      ],
    },
  ];

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...tableData].sort((a, b) => {
    if (!sortColumn) return 0;
    const index = ["УЭРВ", "УЭРБ", "УЭРН", "УЭРК", "УЭРМ"].indexOf(sortColumn);
    const aValue = a.data[index];
    const bValue = b.data[index];
    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    }
    return bValue.localeCompare(aValue);
  });

  return (
    <div className="container mx-auto px-4 lg:px-6">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6">
        Сравнительная таблица устройств этажных распределительных: УЭРВ, УЭРБ,
        УЭРН, УЭРК, УЭРМ
      </h2>
      <div className="shadow-lg rounded-lg">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="py-3 px-4 text-left font-semibold w-1/6">
                Параметр
              </TableHead>
              {["УЭРВ", "УЭРБ", "УЭРН", "УЭРК", "УЭРМ"].map((header) => (
                <TableHead
                  key={header}
                  className="py-3 px-4 text-left font-semibold cursor-pointer hover:bg-gray-200 w-1/6"
                  onClick={() => handleSort(header)}
                >
                  <div className="flex items-center gap-2">
                    {header}
                    {sortColumn === header &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow
                key={index}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <TableCell className="py-3 px-4 font-medium w-1/6 whitespace-normal break-words">
                  {row.parameter}
                </TableCell>
                {row.data.map((value, i) => (
                  <TableCell
                    key={i}
                    className="py-3 px-4 w-1/6 whitespace-normal break-words"
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-3 mb-12">
            <Home className="h-8 w-8 text-accent" />
            <h2 className="text-2xl lg:text-3xl font-bold">Примечания</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: "/catalog/uerv",
                title: "УЭРВ",
                description:
                  "Оптимально для ниш в панельных/монолитных домах, эстетичная ГВЛ-отделка.",
              },
              {
                href: "/catalog/uerb",
                title: "УЭРБ",
                description:
                  "Гибкость компоновки благодаря выламываемым отверстиям, эстетичное закрытие стены.",
              },
              {
                href: "/catalog/uerk",
                title: "УЭРК",
                description:
                  "Быстрая установка, отдельный кабельный отсек, компенсатор высоты.",
              },
              {
                href: "/catalog/uern",
                title: "УЭРН",
                description:
                  "Простота монтажа без ниши, полная оболочка, вместимость до 12 квартир.",
              },
              {
                href: "/catalog/uerm",
                title: "УЭРМ",
                description:
                  "Модульная сборка, универсальность для домов без ниш, поддержка АСКУЭ.",
              },
            ].map((product, index) => (
              <Link key={index} href={product.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-2xl lg:text-3xl text-accent">
                      {product.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-4">
        <div className="container mx-auto px-2 lg:px-6">
          <div className="w-full ">
            <h2 className="text-2xl text-center lg:text-3xl font-bold mb-4 text-balance">
              Заказ и покупка
            </h2>
            <p className="text-lg lg:text-xl justify-center text-muted-foreground mb-8 leading-relaxed">
              Предлагаем купить этажные распределительные устройства УЭРВ, УЭРБ,
              УЭРН, УЭРК, УЭРМ по выгодной цене в интернет-магазине нашей
              компании. Продукция доступна оптом и в розницу с быстрой доставкой
              по Москве, MO и всей России. Изготовление по индивидуальным
              проектам заказчика. Свяжитесь по телефону +7 (499) 390-14-67 или
              через сайт{" "}
              <a
                href="https://electroshit-pro.ru"
                className="text-blue-600 hover:underline"
              >
                electroshit-pro.ru
              </a>
              . Каталог, фото, схемы и отзывы доступны онлайн.
            </p>
            <p className="text-lg lg:text-xl text-left text-muted-foreground mb-8 text-balance leading-relaxed">
              Для заказа укажите:
            </p>

            <ul className="text-lg lg:text-xl list-disc text-left pl-6 text-muted-foreground leading-relaxed pb-4">
              <li>Количество квартир (1–12).</li>
              <li>
                Тип счетчиков и аппаратуры (одно-/трехфазные, АСКУЭ, УЗИП).
              </li>
              <li>Габариты, компоновку отсеков, цвет (RAL 7035).</li>
              <li>Дополнительные аксессуары (замки, кронштейны).</li>
            </ul>

            <div className="flex flex-col lg:flex-row justify-center gap-4 my-4 px-4">
              <Button
                onClick={() =>
                  handleButtonClick("Получить коммерческое предложение")
                }
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground w-full lg:w-auto h-auto whitespace-normal py-6 text-xl"
              >
                Получить коммерческое предложение
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Button>
              <Button
                onClick={() => handleButtonClick("Связаться с менеджером")}
                variant="outline"
                size="lg"
                className="w-full lg:w-auto h-auto whitespace-normal py-6 text-xl"
              >
                Связаться с менеджером
              </Button>
            </div>
            <p className="text-lg lg:text-xl text-left text-muted-foreground leading-relaxed mt-8">
              Каталог, фото, схемы и отзывы доступны онлайн. Заказывайте
              качественное электрощитовое оборудование от производителя с
              доставкой!
            </p>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialContent={modalContent}
        onSubmit={handleFormSubmit}
        submitError={error}
      />
    </div>
  );
};

export default ComparisonTable;
