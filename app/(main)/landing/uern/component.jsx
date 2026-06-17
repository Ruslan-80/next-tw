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

export const metadata = {
  title: "Устройство этажное распределительное блочное УЭРК | ЭЛЕКТРОЩИТ-ПРО",
  description: "Устройства этажные УЭРК по индивидуальному запросу",
};

export default function ComponentUERN() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  return (
    <>
      <section className="hidden md:block sticky top-0 z-50 border-b border-gray-200 bg-gray-100/95 backdrop-blur supports-[backdrop-filter]:bg-gray-100/60">
        <nav
          className="container mx-auto px-6 py-2 flex flex-wrap items-center text-sm text-gray-600"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          aria-label="Breadcrumb"
        >
          <div
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              href="/"
              className="hover:text-orange-400 transition-colors break-words"
              itemProp="item"
              title="Главная"
            >
              <span itemProp="name">Главная</span>
            </Link>
            <meta itemProp="position" content="1" />
            <span className="mx-1 text-gray-400">/</span>
          </div>
          <div
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              href="/catalog/schity-etazhnye-i-ustroystva-podezdnye"
              className="hover:text-orange-400 transition-colors break-words"
              itemProp="item"
              title="Щиты этажные и устройства подъездные"
            >
              <span itemProp="name">Щиты этажные и устройства подъездные</span>
            </Link>
            <meta itemProp="position" content="2" />
            <span className="mx-1 text-gray-400">/</span>
          </div>
          <div
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              href="/catalog/ustroystva-etazhnye"
              className="hover:text-orange-400 transition-colors break-words"
              itemProp="item"
              title="Устройства этажные"
            >
              <span itemProp="name">Устройства этажные</span>
            </Link>
            <meta itemProp="position" content="3" />
            <span className="mx-1 text-gray-400">/</span>
          </div>
          <div
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span
              className="text-gray-900 font-medium break-words"
              itemProp="name"
              title="УЭРН"
            >
              УЭРН
            </span>
            <meta itemProp="position" content="4" />
          </div>
        </nav>
      </section>
      <div className="container mx-auto py-6 bg-background text-xl lg:text-2xl">
        <section className="container mx-auto p-4 bg-background text-xl lg:text-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm font-medium">
                  Модульное решение
                </Badge>
                <h1 className="text-2xl lg:text-5xl font-bold text-balance leading-tight">
                  Устройство этажное распределительное навесное{" "}
                  <span className="text-accent">УЭРН</span>
                </h1>
                <p className="text-muted text-balance leading-relaxed">
                  Современное модульное устройство для приема, распределения и
                  учета электроэнергии в многоквартирных домах с защитой от
                  перегрузок и токов утечки.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => handleButtonClick("Получить консультацию")}
                  size="lg"
                  className="btn-gold text-primary text-xl py-8"
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
                  <div className="text-2xl font-bold text-accent">6-12</div>
                  <div className="text-sm lg:text-xl text-muted">квартир</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">25</div>
                  <div className="text-sm lg:text-xl text-muted">
                    лет службы
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">IP31</div>
                  <div className="text-sm lg:text-xl text-muted">защита</div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
              <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square  p-4 md:p-6 lg:p-8  flex justify-center mx-auto">
                <Image
                  src="/images/landing/uerb.png"
                  alt="УЭРК"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container mx-auto p-4 lg:p-6 space-y-10 text-sm lg:text-xl lg:mt-12">
        <section className="py-4 lg:mt-12">
          <div className="container mx-auto lg:px-6">
            <div className="w-full mx-auto">
              <div className="text-center lg:mb-12">
                <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-balance">
                  Назначение
                </h2>
              </div>

              <Card className="mb-8">
                <CardContent className="px-4 lg:px-8">
                  <p className="text-justify leading-relaxed text-muted mb-6">
                    Устройство этажное распределительное навесное типа УЭРН
                    предназначено для приема, распределения и учета
                    электроэнергии в многоквартирных жилых домах. Оно
                    обеспечивает защиту групповых линий квартир от перегрузок,
                    короткого замыкания и токов утечки в сетях с
                    глухозаземленной нейтралью (230/400 В, 50 Гц, TN-S, TN-C,
                    TN-C-S), а также служит для размещения слаботочных систем
                    (телефонной, телевизионной, интернет-сетей, сигнализации,
                    АСКУЭ).
                  </p>
                  <p className="text-justify leading-relaxed text-muted mb-6">
                    УЭРН — современная альтернатива устаревшим этажным щитам
                    типа ЩЭ, ЩЛС, УЭРП, отличающаяся полной оболочкой и
                    простотой установки без ниши. Соответствует стандартам ГОСТ
                    Р 51321.1-2007, ГОСТ IEC 60439.3-2012, ТР ТС 004/2011 и ТУ
                    (например, ТУ 3434-002-52681400-2019 для EKF).
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 pb-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 lg:h-7 lg:w-7 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-lg lg:text-xl mb-3">
                          Применение
                        </div>
                        <div className="text-justify text-sm lg:text-xl text-muted">
                          Установка на стену лестничных площадок жилых зданий,
                          коммунально-бытовых и общественных объектов.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 lg:h-7 lg:w-7 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-lg lg:text-xl mb-3">
                          Обслуживание
                        </div>
                        <div className="text-justify text-sm lg:text-xl text-muted">
                          До 6–12 квартир в зависимости от типа счетчиков и
                          конфигурации.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 lg:h-7 lg:w-7 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-lg lg:text-xl mb-3">
                          Универсальность
                        </div>
                        <div className="text-justify text-sm lg:text-xl text-muted">
                          Поддержка однофазных (до 11 кВт) и трехфазных (до 32
                          кВт) систем для эффективного контроля расхода
                          электроэнергии.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Construction Section */}
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto lg:px-6 text-xl lg:text-2xl">
            <div className="lg:max-w-8xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Shield className="h-8 w-8 text-accent" />
                <h2 className="text-2xl lg:text-4xl font-bold">Конструкция</h2>
              </div>

              <Card>
                <CardContent className="text-sm lg:text-xl px-4 lg:px-8 lg:indent-20">
                  <p className="text-justify leading-relaxed text-muted">
                    УЭРН представляет собой цельносварную металлическую
                    конструкцию с полной оболочкой, закрытой со всех сторон,
                    кроме отверстий для ввода и вывода кабелей. Корпус выполнен
                    из листового металла с полиэфирным порошковым покрытием (RAL
                    7035, шагрень) для долговечности и эстетики.
                  </p>
                  <p className="text-justify leading-relaxed text-muted">
                    Устройство имеет навесное исполнение, что исключает
                    необходимость подготовки ниши и штрабления стен. Внутренний
                    объем разделен на отсеки металлическими перегородками для
                    изоляции силовых и слаботочных линий, обеспечивая
                    безопасность и удобство обслуживания.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Modules Section */}
        <section className="py-4">
          <div className="container mx-auto lg:px-6">
            <div className="flex items-center gap-3 mb-4 lg:mb-12">
              <Home className="h-8 w-8 text-accent" />
              <h2 className="text-2xl lg:text-4xl font-bold">Отсеки</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[
                {
                  title: "Слаботочный отсек",
                  description:
                    "Предназначен для аппаратуры связи, интернета, телевидения, сигнализации, АСКУЭ. Оснащен отдельной запираемой дверью (4 дверцы, угол открытия 120°).",
                },
                {
                  title: "Вводно-учетный отсек",
                  description:
                    "Для установки счетчиков электроэнергии (например, Меркурий 200/230) и выключателей-разъединителей. Имеет ревизионное окошко для контроля показаний.",
                },
                {
                  title: "Распределительный отсек",
                  description:
                    "Для автоматических выключателей, АВДТ, УЗО, УЗИП (до 12 модулей на квартиру). Обеспечивает защиту от перегрузок и короткого замыкания.",
                },
                {
                  title: "Отсек силовых магистралей",
                  description:
                    "Поддерживает до 2 питающих стояков (рабочий и транзитный), оснащен шинами N/PE, кабельными и плашечными зажимами для фазных, нулевых и защитных проводников.",
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
                    <p className="text-justify text-muted leading-relaxed">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Technical Specs & Advantages */}
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto lg:px-6">
            <div className="grid  gap-12">
              {/* Technical Specifications */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Zap className="h-8 w-8 text-accent" />
                  <h2 className="text-2xl lg:text-3xl font-bold">
                    Технические характеристики
                  </h2>
                </div>

                <Card>
                  <CardContent className="lg:p-6">
                    <div className="space-y-4">
                      {[
                        "Номинальное напряжение: 230/400 В (AC), 50 Гц.",
                        "Системы заземления: TN-S, TN-C, TN-C-S.",
                        "Номинальные токи выключателей: 25, 32, 40, 50, 63, 100, 125 А.",
                        "Дифференциальные токи АВДТ/УЗО: 10, 30, 100, 300 мА.",
                        "Отключающая способность: ≥ 4,5 кА.",
                        "Максимальное сечение проводников: 95 мм².",
                        "Степень защиты: IP31 (фасад).",
                        "Климатическое исполнение: УХЛ3 (температура от -25°C до +40°C, влажность до 60% при +20°C, высота до 2000 м).",
                        "Материал корпуса: Листовой металл с полиэфирным порошковым покрытием (RAL 7035, шагрень).",
                        "Габаритные размеры: 2700x1700x250 мм (12 квартир).",
                        "Масса: ~21 кг (зависит от конфигурации).",
                        "Способ установки: Навесной, крепление винтами или анкерами.",
                        "Дополнительные аксессуары: DIN-рейки, кронштейны, хомуты.",
                        "Срок службы: До 25 лет, гарантия 3 года.",
                      ].map((spec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-muted leading-relaxed">
                            {spec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Advantages */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Server className="h-8 w-8 text-accent" />
                  <h2 className="text-2xl lg:text-3xl font-bold">
                    Преимущества УЭРН
                  </h2>
                </div>

                <Card>
                  <CardContent className="lg:p-6">
                    <div className="space-y-4">
                      {[
                        "Полная оболочка: Закрытая конструкция (кроме кабельных отверстий) обеспечивает эстетичный вид и защиту оборудования.",
                        "Простота установки: Навесной монтаж на стену без подготовки ниши и штрабления, экономия времени и средств.",
                        "Большая вместимость: Обслуживание до 12 квартир, поддержка одно- и трехфазных систем.",
                        "Безопасность: Металлические перегородки, защита от перегрузок, короткого замыкания, токов утечки и пожаров.",
                        "Эстетика: Полиэфирное покрытие (RAL 7035) и аккуратный дизайн для лестничных площадок.",
                        "Экологичное производство: Использование качественных материалов, безопасных для окружающей среды.",
                        "Удобство обслуживания: Ревизионные окошки, широкий угол открытия дверей (120°), односторонний доступ.",
                      ].map((advantage, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-muted leading-relaxed">
                            {advantage}
                          </span>
                        </div>
                      ))}
                      <p className="text-gray-600 pt-4">
                        УЭРН выделяется полной оболочкой и простотой навесного
                        монтажа, что делает его оптимальным для проектов, где
                        важна быстрая установка без строительных работ.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        {/* Installation Section */}
        <section className="py-4">
          <div className="container mx-auto lg:px-6">
            <div className="max-w-8xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                {/* <Cable className="h-8 w-8 text-accent" /> */}
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Комплектность
                </h2>
              </div>

              <div className="grid gap-8">
                <Card>
                  <CardContent className="px-4 lg:p-6">
                    <div className="space-y-4">
                      {[
                        "В комплект поставки входят: Корпус УЭРН (цельносварной), двери отсеков (4 шт.), шины N/PE, DIN-рейки, паспорт, схемы подключения, сертификат соответствия.",
                        "Не входят: Счетчики электроэнергии (например, Меркурий 200/230), фазные сжимы, УЗИП, замки (заказываются отдельно).",
                        "По запросу: Дополнительные замки, документация, аксессуары (хомуты, кронштейны).",
                      ].map((spec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-muted leading-relaxed">
                            {spec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="lg:max-w-8xl mx-auto mt-8">
              <div className="flex items-center gap-3 mb-8">
                <Cable className="h-8 w-8 text-accent" />
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Установка и эксплуатация
                </h2>
              </div>

              <div className="grid gap-8">
                <Card>
                  <CardContent className="px-4 lg:p-6">
                    <div className="space-y-4">
                      {[
                        "Монтаж: Навесной, крепление винтами или анкерами на стену лестничной площадки, кабели вводятся через отверстия Ø25–32 мм.",
                        "Условия эксплуатации: УХЛ3, невзрывоопасная среда, защита от воды, радиации, ударов.",
                        "Режим работы: Продолжительный, одностороннее обслуживание на лестничных площадках.",
                      ].map((spec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-muted leading-relaxed">
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
        {/* Related Products */}
        <section className="py-4 lg:py-8 bg-secondary/30">
          <div className="container mx-auto lg:px-6">
            <div className="flex items-center gap-3 mb-12">
              <Home className="h-8 w-8 text-accent" />
              <h2 className="text-3xl lg:text-4xl font-bold">
                Вам также может быть интересно
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  href: "/catalog/uerv",
                  title: "УЭРВ",
                  description:
                    "Встроенное, в нишу, открыто кроме фасада, ГВЛ-отделка.",
                },
                {
                  href: "/catalog/uerk",
                  title: "УЭРК",
                  description:
                    "Навесное с кабельным отсеком, компенсатор высоты.",
                },
                {
                  href: "/catalog/uern",
                  title: "УЭРН",
                  description: "Навесное, полная оболочка, до 12 квартир.",
                },
                {
                  href: "/catalog/uerm",
                  title: "УЭРМ",
                  description: "Модульное, сборное, для домов без ниш.",
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
                      <p className="text-muted leading-relaxed">
                        {product.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-4 text-lg lg:text-2xl">
          <div className="container mx-auto lg:px-6">
            <div className="lg:max-w-8xl  ">
              <h2 className="text-2xl text-center lg:text-4xl font-bold mb-4 text-balance">
                Заказ и покупка
              </h2>
              <p className="justify-center text-muted mb-8 leading-relaxed">
                Предлагаем купить этажное распределительное устройство УЭРН по
                выгодной цене в интернет-магазине нашей компании. Продукция
                доступна оптом и в розницу с быстрой доставкой по Москве, М.О.и
                всей России. Изготовление по индивидуальным проектам заказчика.
              </p>
              <p className="text-2xl text-left text-muted mb-8 text-balance leading-relaxed">
                Для заказа укажите:
              </p>

              <ul className="list-disc text-left pl-6 text-muted leading-relaxed pb-4">
                <li>Количество квартир (1–12).</li>
                <li>
                  Тип счетчиков и аппаратуры (одно-/трехфазные, АСКУЭ, УЗИП).
                </li>
                <li>Габариты, компоновку отсеков, цвет (RAL 7035).</li>
                <li>Дополнительные аксессуары (замки, кронштейны).</li>
              </ul>

              <div className="flex flex-wrap justify-center gap-4 my-4">
                <Button
                  onClick={() =>
                    handleButtonClick("Получить коммерческое предложение")
                  }
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm lg:text-xl mx-4 py-8"
                >
                  Получить коммерческое предложение
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleButtonClick("Связаться с менеджером")}
                  variant="outline"
                  size="lg"
                  className="py-8 text-xl"
                >
                  Связаться с менеджером
                </Button>
              </div>
              <p className="text-sm text-left text-muted leading-relaxed">
                Каталог, фото, схемы и отзывы доступны онлайн. Заказывайте
                качественное электрощитовое оборудование от производителя с
                доставкой!
              </p>
            </div>
          </div>
        </section>
      </div>
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
