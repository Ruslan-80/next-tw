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
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

export function uervTop() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  return (
    <>
      <section className="container mx-auto px-2">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-5xl font-bold text-balance leading-tight">
                Устройство этажное распределительное встроенное типа{" "}
                <span className="text-accent">УЭРВ</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => handleButtonClick("Получить консультацию")}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm lg:text-xl py-8"
              >
                Получить консультацию
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/uerv.png"
                alt="УЭРМ - Устройство этажное распределительное модульное"
                width={500}
                height={500}
                className="object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-4 mt-12">
        <div className="container mx-auto lg:px-6">
          <div className="w-full mx-auto">
            <div className="text-center lg:mb-12">
              <h2 className="text-xl lg:text-4xl font-bold mb-4 text-balance">
                Назначение
              </h2>
            </div>

            <Card className="mb-8">
              <CardContent className="lg:px-8">
                <p className="text-justify leading-relaxed text-muted-foreground mb-6 text-sm lg:text-2xl">
                  Устройство этажное распределительное встроенное типа УЭРВ
                  предназначено для приема, распределения и учета электроэнергии
                  в многоквартирных жилых домах. Оно обеспечивает защиту
                  групповых линий квартир от перегрузок, короткого замыкания и
                  токов утечки в сетях с глухозаземленной нейтралью (230/400 В,
                  50 Гц, TN-S, TN-C, TN-C-S), а также служит для размещения
                  слаботочных систем (телефонной, телевизионной, интернет-сетей,
                  сигнализации, АСКУЭ). УЭРВ — современная альтернатива
                  устаревшим этажным щитам типа ЩЭ, ЩЛС, УЭРП, предлагая
                  комплексное электрощитовое решение с высокой надежностью и
                  эстетикой. Соответствует стандартам ГОСТ Р 51321.1-2007, ГОСТ
                  IEC 60439.3-2012, ТР ТС 004/2011 и ТУ (например, ТУ
                  3434-002-52681400-2019 ).
                </p>

                <div className="grid gap-6 pb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-xl lg:text-2xl mb-3">
                        Применение
                      </div>
                      <div className="text-justify text-sm lg:text-xl text-muted-foreground">
                        Установка в подготовленную нишу на этажах жилых зданий.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-xl lg:text-2xl mb-3">
                        Обслуживание
                      </div>
                      <div className="text-justify text-sm lg:text-xl text-muted-foreground">
                        До 6–10 квартир в зависимости от типа счетчиков и
                        конфигурации.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-xl lg:text-2xl mb-3">
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

export function uervBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="container mx-auto lg:p-6 space-y-10 text-2xl mt-12">
        {/* Construction Section */}
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto lg:px-6">
            <div className="max-w-8xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Shield className="h-8 w-8 text-accent" />
                <h2 className="text-2xl lg:text-4xl font-bold">Конструкция</h2>
              </div>

              <Card>
                <CardContent className="p-8">
                  <p className="text-justify text-sm lg:text-2xl leading-relaxed text-muted-foreground lg:indent-20">
                    УЭРВ представляет собой пространственную металлическую
                    конструкцию, встроенную в нишу, открытую со всех сторон,
                    кроме фасада. Корпус выполнен из листового металла с
                    полиэфирным порошковым покрытием (RAL 9003, шагрень),
                    обеспечивающим долговечность и эстетику. Верхняя и нижняя
                    части каркаса оснащены коробами ТБ, зашиваемыми листами ГВЛ
                    для интеграции в интерьер многоквартирных домов. Внутренний
                    объем разделен на отсеки металлическими перегородками для
                    безопасной прокладки силовых и слаботочных линий.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="py-4">
          <div className="container mx-auto lg:px-6">
            <div className="flex items-center gap-3 mb-12">
              <Home className="h-8 w-8 text-accent" />
              <h2 className="text-2xl lg:text-4xl font-bold">Отсеки</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Слаботочный отсек",
                  description:
                    "Расположен слева, предназначен для аппаратуры связи, интернета, телевидения, сигнализации, АСКУЭ. Оснащен отдельной запираемой дверью с индивидуальным замком.",
                },
                {
                  title: "Вводно-учетный отсек",
                  description:
                    "Справа от слаботочного, для установки счетчиков электроэнергии (например, Меркурий 200/230) и выключателей-разъединителей. Имеет ревизионное окошко для контроля показаний.",
                },
                {
                  title: "Распределительный отсек",
                  description:
                    "Над учетным или совмещен с ним, для автоматических выключателей, АВДТ, УЗО, УЗИП (до 12–24 модулей на квартиру). Обеспечивает защиту от перегрузок и короткого замыкания.",
                },
                {
                  title: "Отсек силовых магистралей",
                  description:
                    "Слева или у задней стенки, поддерживает до 2 питающих стояков (рабочий и транзитный). Оснащен шинами N/PE, кабельными и плашечными зажимами для фазных, нулевых и защитных проводников.",
                },
              ].map((module, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-xl lg:text-2xl text-accent">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-justify text-muted-foreground text-sm lg:text-xl leading-relaxed">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm lg:text-2xl leading-relaxed text-muted-foreground text-justify my-6">
              Каждый отсек имеет дверь на петлях с замком (универсальный или
              индивидуальный по заказу), обеспечивая удобство обслуживания и
              безопасность.
            </p>
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
                  <h2 className="text-xl lg:text-3xl font-bold">
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
                        "Степень защиты: IP31 (фасад), IP00 (остальные стороны в несмонтированном состоянии, зависит от ниши).",
                        "Климатическое исполнение: УХЛ4 (температура от -25°C до +40°C, влажность до 60% при +20°C, высота до 2000 м).",
                        "Материал корпуса: Листовой металл с полиэфирным порошковым покрытием (RAL 9003/7035, шагрень).",
                        "Габаритные размеры: От 1200x1200x200 мм (зависит от количества квартир и конфигурации).",

                        "Масса: ~52 кг (зависит от модели).",
                        "Способ установки: Встроенный, крепление анкерами в подготовленную нишу.",
                        "Дополнительные аксессуары: Кронштейны, люк для розетки, Z-образные профили, DIN-рейки.",
                        "Срок службы: До 25 лет, гарантия 3 года.",
                      ].map((spec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                          <span className="text-sm lg:text-2xl text-muted-foreground leading-relaxed">
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
                  <h2 className="text-xl lg:text-3xl font-bold">
                    Преимущества УЭРВ
                  </h2>
                </div>

                <Card>
                  <CardContent className="lg:p-6">
                    <div className="space-y-4">
                      {[
                        "Компактное встроенное исполнение: Идеально для ниш в панельных и монолитных домах, экономия пространства.",
                        "Эстетичная интеграция: Короба ТБ и ГВЛ обеспечивают аккуратный вид, подходящий для современных жилых зданий.",
                        "Универсальность: Поддержка одно- и трехфазных систем, обслуживание до 10 квартир.",
                        "Безопасность: Металлические перегородки, защита от перегрузок, короткого замыкания, токов утечки и пожаров.",
                        "Гибкость: Индивидуальная компоновка отсеков, габаритов и аппаратуры по техническому заданию заказчика.",
                        "Качественное производство: Экологически чистые материалы, полиэфирное покрытие, соответствие ГОСТ и ТР ТС.",
                        "Простота обслуживания: Ревизионные окошки, удобные замки, односторонний доступ.",
                      ].map((advantage, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                          <span className="text-sm lg:text-2xl text-justify text-muted-foreground leading-relaxed">
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
            <div className="max-w-8xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                {/* <Cable className="h-8 w-8 text-accent" /> */}
                <h2 className="text-xl lg:text-4xl font-bold">Комплектность</h2>
              </div>

              <div className="grid gap-8">
                <Card>
                  <CardContent className="lg:p-6">
                    <div className="space-y-4">
                      {[
                        "В комплект поставки входят: Каркас УЭРВ, двери отсеков, шины N/PE, DIN-рейки, Z-образные профили, ключи (1 на замок), паспорт, схемы подключения, сертификат соответствия.",
                        "Не входят: Счетчики электроэнергии (например, Меркурий 200/230), фазные сжимы, УЗИП (заказываются отдельно).",
                        "По запросу: Дополнительные ключи, документация, аксессуары (кронштейны, хомуты).",
                      ].map((spec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                          <span className="text-sm lg:text-2xl text-muted-foreground leading-relaxed">
                            {spec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="max-w-8xl mx-auto mt-8">
              <div className="flex items-center gap-3 mb-8">
                <Cable className="h-8 w-8 text-accent" />
                <h2 className="text-xl lg:text-4xl font-bold">
                  Установка и эксплуатация
                </h2>
              </div>

              <div className="grid gap-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        "Монтаж: Встраивается в подготовленную нишу, крепление анкерами, кабели вводятся через отверстия Ø25–32 мм.",
                        "Условия эксплуатации: УХЛ4, невзрывоопасная среда, защита от воды, радиации, ударов.",
                        "Режим работы: Продолжительный, одностороннее обслуживание на лестничных площадках.",
                      ].map((spec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                          <span className="text-sm lg:text-2xl text-muted-foreground leading-relaxed">
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
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto lg:px-6">
            <div className="flex items-center gap-3 mb-12">
              <Home className="h-8 w-8 text-accent" />
              <h2 className="text-xl lg:text-4xl font-bold">
                Вам также может быть интересно
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  href: "/catalog/uerm",
                  title: "УЭРМ",
                  description: "Модульное, сборное, для домов без ниш.",
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
                      <CardTitle className="text-xl lg:text-3xl text-accent">
                        {product.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm lg:text-xl text-muted-foreground leading-relaxed">
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
        <section className="py-4">
          <div className="container mx-auto px-6">
            <div className="max-w-8xl  ">
              <h2 className="text-xl lg:text-3xl text-center font-bold mb-4 text-balance">
                Заказ и покупка
              </h2>
              <p className="text-sm lg:text-2xl justify-center text-muted-foreground mb-8  leading-relaxed">
                Предлагаем купить этажное распределительное устройство УЭРВ по
                выгодной цене в интернет-магазине нашей компании. Продукция
                доступна оптом и в розницу с быстрой доставкой по Москве, М.О. и
                всей России. Изготовление по индивидуальным проектам заказчика.
              </p>
              <p className="text-xl lg:text-2xl text-left text-muted-foreground mb-8 text-balance leading-relaxed">
                Для заказа укажите:
              </p>

              <ul className="list-disc text-left text-sm lg:text-2xl lg:pl-6 text-muted-foreground leading-relaxed pb-4">
                <li>Количество квартир (1–10).</li>
                <li>
                  Тип счетчиков и аппаратуры (одно-/трехфазные, АСКУЭ, УЗИП).
                </li>
                <li>Габариты, компоновку отсеков, цвет (RAL 9003/7035).</li>
                <li>Дополнительные аксессуары (кронштейны, замки).</li>
              </ul>

              <div className="flex flex-wrap justify-center gap-4 my-4">
                <Button
                  onClick={() =>
                    handleButtonClick("Получить коммерческое предложение")
                  }
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm lg:text-xl py-8"
                >
                  Получить коммерческое предложение
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleButtonClick("Связаться с менеджером")}
                  variant="outline"
                  size="lg"
                  className="py-8 text-sm lg:text-xl"
                >
                  Связаться с менеджером
                </Button>
              </div>
              <p className="text-sm lg:text-xl text-left text-muted-foreground leading-relaxed">
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
