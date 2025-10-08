"use client";
import {
  Cable,
  Server,
  Shield,
  Home,
  Zap,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Box,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import FaqNakladky from "../faqNakladky";
import WorksGallery from "../imageDoPosle";
import FAQPageNakladkyJSONLD from "@/lib/faqNakldkyJsonLd";
import JsonLd from "@/components/JsonLdComponent";

export function NakladkyEtazhnyeTop() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const FaqJsonLd = FAQPageNakladkyJSONLD();
  return (
    <>
      <JsonLd data={FaqJsonLd} />
      <section className="mb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">
                Накладки щитов этажных для многоквартирных домов – качество и
                надежность
              </h2>
              <p className="text-justify text-2xl text-muted-foreground leading-relaxed">
                Накладка щита этажного – идеальное решение для косметического
                ремонта электрических щитов в многоквартирных домах. Лицевая
                панель щита этажного (ЩЭ) позволяет обновить внешний вид
                электрощитка, сохраняя внутреннюю схему и оборудование. Это
                оптимальный выбор для реконструкции старого жилого фонда, где
                замена внутренностей распределительного щита невозможна или
                нецелесообразна.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => handleButtonClick("Получить консультацию")}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-8"
              >
                Получить консультацию
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/SEN.jpg"
                alt="Щиты этажные типа ЩЭ"
                width={500}
                height={500}
                className="object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
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
    </>
  );
}

export function NakladkyEtazhnyeBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const products = [
    {
      id: 1,
      type: "Распределительный",
      description: (
        <>
          Купить этажный распределительный щит для подключения квартирных
          щитков. Обеспечивает надежное распределение электроэнергии в
          многоквартирных домах.
        </>
      ),
      installation: "Настенный или встраиваемый в нишу",
      protection:
        "Класс I (металлический корпус с заземлением) или Класс II (изолирующий)",
      phases: "Однофазный (230 В) или трёхфазный (400/230 В)",
      uzip: "С УЗИП или без УЗИП",
      remote: "С устройствами или без",
      current: "25, 32, 40, 50, 63",
      climate: "У3, УХЛ3, УХЛ4, УХЛ4.1, УХЛ4.2",
      dimensions: "950×1200×200",
      material: "Металл или изоляционный",
    },
    {
      id: 2,
      type: "Учетно-распределительный",
      description:
        "Производство сертифицированных щитков для учета и распределения электроэнергии. Оснащены счетчиками для контроля потребления до 6 квартир.",
      installation: "Настенный или встраиваемый в нишу",
      protection: "Класс I или Класс II",
      phases: "Однофазный или трёхфазный",
      uzip: "С УЗИП или без УЗИП",
      remote: "С устройствами или без",
      current: "25, 32, 40, 50, 63",
      climate: "У3, УХЛ3, УХЛ4, УХЛ4.1, УХЛ4.2",
      dimensions: "950×1200×200",
      material: "Металл или изоляционный",
    },
    {
      id: 3,
      type: "Учетно-распределительно-групповой",
      description:
        "Этажный щит с защитой от перегрузок и замыканий. Поддерживает учет, распределение и групповые линии с автоматическими выключателями.",
      installation: "Настенный или встраиваемый в нишу",
      protection: "Класс I или Класс II",
      phases: "Однофазный или трёхфазный",
      uzip: "С УЗИП или без УЗИП",
      remote: "С устройствами или без",
      current: "25, 32, 40, 50, 63",
      climate: "У3, УХЛ3, УХЛ4, УХЛ4.1, УХЛ4.2",
      dimensions: "950×1200×200",
      material: "Металл или изоляционный",
    },
    {
      id: 4,
      type: "Совмещённый (с отсеком для слаботочных устройств)",
      description: (
        <>
          Антивандальный щит с отсеком для слаботочных систем (телефония,
          интернет). Пожаробезопасный, с металлической перегородкой для
          экранирования.
        </>
      ),
      installation: "Настенный или встраиваемый в нишу",
      protection: "Класс I или Класс II",
      phases: "Однофазный или трёхфазный",
      uzip: "С УЗИП или без УЗИП",
      remote: "С устройствами или без",
      current: "25, 32, 40, 50, 63",
      climate: "У3, УХЛ3, УХЛ4, УХЛ4.1, УХЛ4.2",
      dimensions: "950×1200×200",
      material: "Металл или изоляционный",
    },
  ];
  return (
    <div className="container mx-auto p-6 space-y-10 text-2xl mt-12">
      <section className="py-4 mt-12">
        <div className="container mx-auto px-6">
          <div className="w-full mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
                Преимущества накладок щитов этажных
              </h3>
            </div>
            <div className="grid md:grid-cols-2  gap-6">
              {[
                {
                  title: "Простота установки",
                  description:
                    "Лицевые панели ЩЭ крепятся на саморезы, дюбели или привариваются через проушины, минимизируя демонтаж и трудозатраты.",
                },
                {
                  title: "Эстетичный дизайн",
                  description:
                    "Порошковое покрытие (стандарт RAL7035, другие цвета по запросу) придает современный вид подъездному электрощитку.",
                },
                {
                  title: "Безопасность",
                  description:
                    "Над учетным или совмещен с ним, для автоматических выключателей, АВДТ, УЗО, УЗИП (до 12–24 модулей на квартиру). Обеспечивает защиту от перегрузок и короткого замыкания.",
                },
                {
                  title: "Индивидуальное производство",
                  description:
                    "Надежные замки (почтовый, треугольник, мастер-ключ) и смотровые окна для обзора счетчиков исключают риск поражения электрическим током.",
                },
                {
                  title: "Быстрая доставка",
                  description:
                    " Поставка в Москву, МО и регионы России в кратчайшие сроки.",
                },
              ].map((module, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl text-accent">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-justify text-muted-foreground text-xl leading-relaxed">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Technical Specs & Advantages */}
      <section className="py-4 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid  gap-12">
            {/* Technical Specifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Zap className="h-8 w-8 text-accent" />
                <h2 className="text-3xl font-bold">
                  Технические характеристики
                </h2>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      "Материалы: Сталь (толщина 0,8–2,0 мм).",
                      "Размеры: Типовые (1000х950, 1010х960) или индивидуальные по вашим чертежам.",
                      "Конструкции: Однодверные, двухдверные, трехдверные панели для щитов на 1–6 квартир и более.",
                      "Замки: Почтовый, треугольник или мастер-ключ для удобства жильцов и электромонтажников.",
                      "Дополнительно: Смотровые окна, дин-рейки, перегородки для слаботочных отсеков.",
                    ].map((spec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-2xl text-muted-foreground leading-relaxed">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 mt-12">
        <div className="container mx-auto px-6">
          <div className="w-full mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
                Применение и особенности установки
              </h3>
            </div>

            <Card className="mb-8">
              <CardContent className="px-8">
                <p className="text-justify leading-relaxed text-muted-foreground mb-6 text-2xl">
                  Накладки щитов этажных применяются при капитальном ремонте или
                  реновации электрощитовых в жилых домах, школах и коттеджных
                  поселках. Лицевая панель щита этажного позволяет обновить
                  распределительный электрощит, не затрагивая его начинку –
                  счетчики, автоматические выключатели, реле и кабели. Установка
                  осуществляется быстро благодаря продуманной конструкции:
                </p>

                <div className="grid gap-6 pb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div className="text-justify text-2xl text-muted-foreground">
                      Крепление на существующую раму щита или в нишу через
                      проушины.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div className="text-justify text-2xl text-muted-foreground">
                      Минимальный демонтаж старых элементов.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div className="text-justify text-2xl text-muted-foreground">
                      Возможность добавления дин-реек для дополнительного
                      электрооборудования.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Сравнение замены щита и установки лицевой панели
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full max-w-8xl mx-auto border border-gray-200 text-left text-gray-700 text-xl rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 border-b font-semibold">Параметр</th>
                <th className="px-6 py-4 border-b font-semibold">
                  Замена всего щита
                </th>
                <th className="px-6 py-4 border-b font-semibold">
                  Установка лицевой панели (накладки)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Срок выполнения работ",
                  "Дольше, требует отключения",
                  "Быстрее, без отключения оборудования",
                ],
                ["Стоимость", "Высокая", "Значительно ниже"],
                [
                  "Вмешательство во внутреннюю часть",
                  "Необходимо полная сборка",
                  "Требуется только наружная облицовка",
                ],
                [
                  "Возможность выбора дизайна",
                  "Ограничена типовыми решениями",
                  "Широкий выбор цветов и исполнений",
                ],
                [
                  "Долговечность",
                  "Зависит от нового щита",
                  "Определяется качеством металла и покрытия",
                ],
                ["Защита от вмешательства", "Да (с замком)", "Да (с замком)"],
                [
                  "Соответствие стандартам",
                  "Да",
                  "Да (при использовании сертифицированных панелей)",
                ],
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-6 py-4 border-b">{row[0]}</td>
                  <td className="px-6 py-4 border-b">{row[1]}</td>
                  <td className="px-6 py-4 border-b">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-4 mt-12">
        <div className="container mx-auto px-6">
          <div className="w-full mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
                Процесс заказа накладок
              </h3>
            </div>

            <Card className="mb-8">
              <CardContent className="px-8">
                <ol>
                  <li className="text-justify leading-relaxed text-muted-foreground mb-6 text-2xl">
                    1. Укажите параметры: размер ниши, толщина металла, цвет
                    RAL, тип замка, количество панелей.
                  </li>
                  <li className="text-justify leading-relaxed text-muted-foreground mb-6 text-2xl">
                    2. Закажите выезд замерщика или предоставьте чертежи для
                    точного изготовления.
                  </li>
                  <li className="text-justify leading-relaxed text-muted-foreground mb-6 text-2xl">
                    3. Получите готовую накладку щита этажного в срок от 1 до 4
                    недель с доставкой по России.
                  </li>
                </ol>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <p className="text-justify leading-relaxed text-muted-foreground mb-6 text-2xl">
                    Для расчета стоимости заполните форму на сайте, указав
                    габариты, материал и желаемый цвет. Наши
                    инженеры-проектировщики обеспечат точное соответствие вашим
                    требованиям, исключая ошибки при производстве.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Image
              src="/images/categories/zamery.jpg"
              alt="Процесс заказа накладок щитов этажных"
              width={1200}
              height={400}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-4 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid  gap-12">
            {/* Technical Specifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Zap className="h-8 w-8 text-accent" />
                <h2 className="text-3xl font-bold">
                  Почему выбирают наши накладки щитов этажных?
                </h2>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      "Высокое качество: Используем прочные российские материалы (сталь) и порошковое покрытие для долговечности.",
                      "Индивидуальный подход: Изготавливаем нестандартные панели по вашим чертежам или замерам.",
                      "Гарантия: Уверенность в надежности каждой лицевой панели щита этажного.",
                      "Опыт: Успешно реализованные проекты реновации жилого фонда, школ и общественных зданий.",
                      "Оперативность: Быстрое производство и доставка в любой город России.",
                    ].map((spec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-2xl text-muted-foreground leading-relaxed">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 mt-12">
        <div className="container mx-auto px-6">
          <div className="w-full mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
                Закажите накладки щитов этажных прямо сейчас!
              </h3>
            </div>

            <Card className="mb-8">
              <CardContent className="px-8">
                <p className="text-justify leading-relaxed text-muted-foreground mb-6 text-2xl">
                  Обновите внешний вид распределительного электрощитка с нашими
                  лицевыми панелями!
                </p>
                <p className="text-justify leading-relaxed text-muted-foreground mb-6 text-2xl">
                  Свяжитесь с нами по телефону, email или через форму на сайте,
                  чтобы оформить заказ, получить консультацию или запросить
                  выезд замерщика.
                </p>
                <p className="text-justify leading-relaxed text-muted-foreground mb-6 text-2xl">
                  Наши накладки щитов этажных – это сочетание качества,
                  надежности и современного дизайна для вашего дома или
                  подъезда.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <WorksGallery />
      <FaqNakladky />
    </div>
  );
}
