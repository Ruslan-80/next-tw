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

export function uermTop() {
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
              <Badge variant="secondary" className="text-sm font-medium">
                Модульное решение
              </Badge>
              <h2 className="text-2xl lg:text-5xl font-bold text-balance leading-tight">
                Устройство этажное распределительное модульное{" "}
                <span className="text-accent">УЭРМ</span>
              </h2>
              <p className="text-muted-foreground text-balance leading-relaxed">
                Современное модульное устройство для приема, распределения и
                учета электроэнергии в многоквартирных домах с защитой от
                перегрузок и токов утечки.
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
                <div className="text-2xl font-bold text-accent">6-12</div>
                <div className="text-sm lg:text-xl text-muted-foreground">
                  квартир
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">25</div>
                <div className="text-sm lg:text-xl text-muted-foreground">
                  лет службы
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">IP31</div>
                <div className="text-sm lg:text-xl text-muted-foreground">
                  защита
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
                src="/images/landing/uerm1.png"
                alt="УЭРМ - Устройство этажное распределительное модульное"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                preload={true}
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
    </div>
  );
}

export function uermBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="bg-gradient-metal animate-metal">
        {/* Purpose Section */}
        <section className="container mx-auto py-2 lg:py-16 text-sm lg:text-xl lg:mt-12">
          <div className="w-full mx-auto">
            <div className="text-center lg:mb-12">
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-balance">
                Назначение
              </h2>
            </div>

            <Card className="mb-8">
              <CardContent className="px-4 lg:px-8">
                <p className="text-justify leading-relaxed text-muted-foreground mb-6">
                  Устройство этажное распределительное модульное типа УЭРМ
                  предназначено для приема, распределения и учета электроэнергии
                  в многоквартирных жилых домах. Оно обеспечивает защиту
                  групповых линий квартир от перегрузок, короткого замыкания,
                  токов утечки и пожаров в сетях с глухозаземленной нейтралью
                  (230/400 В, 50 Гц, TN-S, TN-C, TN-C-S), а также служит для
                  размещения слаботочных систем (телефонной, телевизионной,
                  интернет-сетей, сигнализации, АСКУЭ). УЭРМ — современная
                  альтернатива устаревшим этажным щитам типа ЩЭ, ЩЛС, УЭРП,
                  УЭРС, идеально подходящая для панельных и монолитных домов,
                  где создание ниш экономически нецелесообразно. Соответствует
                  стандартам ГОСТ Р 51321.1-2007, ГОСТ IEC 60439.3-2012, ТР ТС
                  004/2011 и ТУ (например, ТУ 3434-002-52681400-2019 ).
                </p>

                <div className="grid md:grid-cols-3 gap-6 pb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 lg:h-7 lg:w-7 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-lg lg:text-xl mb-3">
                        Применение
                      </div>
                      <div className="text-justify text-sm lg:text-xl text-muted-foreground">
                        Установка на этажах жилых зданий, коммунально-бытовых и
                        общественных объектов.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 lg:h-7 lg:w-7 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-lg lg:text-xl mb-3">
                        Обслуживание
                      </div>
                      <div className="text-justify text-sm lg:text-xl text-muted-foreground">
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
                      <div className="text-justify text-sm lg:text-xl text-muted-foreground">
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
                  <p className="text-justify leading-relaxed text-muted-foreground ">
                    УЭРМ представляет собой шкаф или сборную модульную
                    конструкцию из металлических коробов (КЭТ, КСС) и ящиков
                    ЯУР, выполненных из листового металла с полиэфирным
                    порошковым покрытием (RAL 9003/7035, шагрень) для
                    долговечности и эстетики.
                  </p>
                  <p className="text-justify leading-relaxed text-muted-foreground">
                    Устройство имеет навесное исполнение, что исключает
                    необходимость штрабления стен. Конструкция включает короба
                    электротехнических (КЭТ) и слаботочных (КСС) сетей, а также
                    квартирные ящики (ЯУР) для индивидуального учета и защиты.
                    Модули оснащены Z- и П-образными профилями для прокладки
                    кабелей и технологическими отверстиями для ответвлений.
                    Компенсаторы высоты позволяют адаптировать конструкцию к
                    высоте этажа (например, 2800 мм).
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
              <h2 className="text-2xl lg:text-4xl font-bold">Модули системы</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Короб электротехнических сетей (КЭТ)",
                  description:
                    "Вертикальный корпус (1890x300x150 мм нижний, 810x300x150 мм верхний) со съемной крышкой, Z-образными профилями для крепления силовых кабелей хомутами и плашечными зажимами для N/PE проводников.",
                },
                {
                  title: "Короб слаботочных сетей (КСС)",
                  description:
                    "Корпус (1890x300x150 мм нижний, 810x300x150 мм верхний) с четырьмя дверями для аппаратуры связи, интернета, телевидения, АСКУЭ. Оснащен П-образными профилями.",
                },
                {
                  title: "Квартирный ящик (ЯУР)",
                  description:
                    "Отдельный щит (300x300x150 мм для 12 модулей или 600x300x150 мм для 24 модулей) для счетчиков (например, Меркурий 201.5), автоматических выключателей, АВДТ, УЗО, УЗИП. Имеет ревизионное окошко и замок.",
                },
                {
                  title: "Компенсатор высоты",
                  description:
                    "Для адаптации к высоте потолка (например, 350x300x150 мм для потолка 2800 мм).",
                },
                {
                  title: "Вводно-учетный модуль",
                  description:
                    "Для счетчиков и выключателей-разъединителей, с окнами для контроля показаний.",
                },
                {
                  title: "Распределительный модуль",
                  description:
                    "Для автоматических выключателей, АВДТ, УЗО, УЗИП (до 12–24 модулей на квартиру).",
                },
                {
                  title: "Модуль силовых магистралей",
                  description:
                    "Поддерживает до 2 стояков, оснащен шинами N/PE и зажимами.",
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
                    <p className="text-justify text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className=" leading-relaxed text-muted-foreground px-2 my-6">
              Каждый модуль имеет запираемую дверь (универсальный или
              индивидуальный замок), обеспечивая безопасность и удобство
              обслуживания.
            </p>
          </div>
        </section>

        {/* Technical Specs & Advantages */}
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto lg:px-6">
            <div className="grid gap-12">
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
                        "Отключающая способность: ≥4,5 кА.",
                        "Максимальное сечение проводников: 95 мм².",
                        "Степень защиты: IP31 (фасад), IP00 (остальные стороны в несмонтированном состоянии).",
                        "Климатическое исполнение: УХЛ3/УХЛ4 (температура от -25°C до +40°C, влажность до 60% при +20°C, высота до 2000 м).",
                        "Материал корпуса: Листовой металл с полиэфирным порошковым покрытием (RAL 9003/7035, шагрень).",
                        "КЭТ/КСС: 1890x300x150 мм (нижний), 810x300x150 мм (верхний).",
                        "ЯУР: 300x300x150 мм (12 модулей) или 600x300x150 мм (24 модуля).",
                        "Компенсатор: 350x300x150 мм (пример для потолка 2800 мм).",
                        "Масса: ~21–52 кг (зависит от конфигурации).",
                        "Способ установки: Навесной, крепление винтами или хомутами.",
                        "Дополнительные аксессуары: Хомуты, кронштейны, DIN-рейки, Z-/П-профили.",
                        "Срок службы: До 25 лет, гарантия 3 года.",
                      ].map((spec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">
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
                    Преимущества УЭРМ
                  </h2>
                </div>

                <Card>
                  <CardContent className="lg:p-6">
                    <div className="space-y-4">
                      {[
                        "Модульная конструкция: Сборная система из коробов КЭТ, КСС и ящиков ЯУР, обеспечивающая универсальность для любых проектов.",
                        "Простота монтажа: Навесное исполнение исключает штрабление стен, экономя время и средства.",
                        "Гибкость: Поддержка одно- и трехфазных систем, обслуживание до 12 квартир, индивидуальная компоновка модулей.",
                        "Функциональность: Поддержка АСКУЭ, УЗИП, многотарифных счетчиков, защита от перегрузок, короткого замыкания, токов утечки и пожаров.",
                        "Эстетика: Полиэфирное покрытие, аккуратный вид на лестничных площадках.",
                        "Экологичное производство: Использование качественных материалов, безопасных для окружающей среды.",
                        "Удобство обслуживания: Ревизионные окошки, DIN-рейки, запираемые двери с замками.",
                      ].map((advantage, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">
                            {advantage}
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

        {/* Installation Section */}
        <section className="py-4">
          <div className="container mx-auto lg:px-6">
            <div className="lg:max-w-8xl mx-auto">
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
                        "В комплект поставки входят: Короба КЭТ, КСС, ящики ЯУР, шины N/PE, DIN-рейки, Z-/П-образные профили, ключи (1 на замок), паспорт, схемы подключения, сертификат соответствия.",
                        "Не входят: Счетчики электроэнергии (например, Меркурий 201.5), фазные сжимы, УЗИП (заказываются отдельно).",
                        "По запросу: Дополнительные ключи, документация, аксессуары (хомуты, компенсаторы).",
                      ].map((spec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">
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
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        "Монтаж: Навесной, сборка коробов КЭТ/КСС и ящиков ЯУР, крепление кабелей хомутами, винтовое соединение, ввод через технологические отверстия Ø25–32 мм.",
                        "Условия эксплуатации: УХЛ3/УХЛ4, невзрывоопасная среда, защита от воды, радиации, ударов.",
                        "Режим работы: Продолжительный, одностороннее обслуживание на лестничных площадках.",
                      ].map((spec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">
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
                  href: "/catalog/uerb",
                  title: "УЭРБ",
                  description:
                    "Блочное, навесное/встроенное, выламываемые отверстия.",
                },
                {
                  href: "/catalog/uern",
                  title: "УЭРН",
                  description: "Навесное, полная оболочка, до 12 квартир.",
                },
                {
                  href: "/catalog/uerk",
                  title: "УЭРК",
                  description:
                    "Навесное с кабельным отсеком, компенсатор высоты.",
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
                      <p className="text-muted-foreground leading-relaxed">
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
            <div className="lg:max-w-8xl">
              <h2 className="text-2xl text-center lg:text-4xl font-bold mb-4 text-balance">
                Заказ и покупка
              </h2>
              <p className="justify-center text-muted-foreground mb-8 leading-relaxed">
                Предлагаем купить этажное распределительное устройство УЭРМ по
                выгодной цене в интернет-магазине нашей компании. Продукция
                доступна оптом и в розницу с быстрой доставкой по Москве, М.О. и
                всей России. Изготовление по индивидуальным проектам заказчика.
              </p>
              <p className="text-2xl text-left text-muted-foreground mb-8 text-balance leading-relaxed">
                Для заказа укажите:
              </p>

              <ul className="list-disc text-left pl-6 text-muted-foreground leading-relaxed pb-4">
                <li>Количество квартир (1–12).</li>
                <li>
                  Тип счетчиков и аппаратуры (одно-/трехфазные, АСКУЭ, УЗИП).
                </li>
                <li>Компоновку модулей, габариты, цвет (RAL 9003/7035).</li>
                <li>
                  Дополнительные аксессуары (компенсаторы, замки).Свяжитесь по
                  телефону или через сайт{" "}
                </li>
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
              <p className="text-sm text-muted-foreground leading-relaxed">
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
    </>
  );
}
