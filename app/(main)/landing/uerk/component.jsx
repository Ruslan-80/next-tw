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

// export const metadata = {
//   title: "Устройство этажное распределительное блочное УЭРК | ЭЛЕКТРОЩИТ-ПРО",
//   description: "Устройства этажные УЭРК по индивидуальному запросу",
// };

export default function ComponentUERK() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  return (
    <div className="container mx-auto p-6 bg-gray-50 text-2xl">
      <nav className="py-4">
        <ol className="hidden md:flex flex-wrap items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/">Главная</Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <Link
              className="hover:text-orange-400 transition-colors truncate"
              href="/catalog/schity-etazhnye-i-ustroystva-podezdnye"
            >
              Щиты этажные и устройства подъездные
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <Link
              className="hover:text-orange-400 transition-colors truncate"
              href="/catalog/ustroystva-etazhnye"
            >
              Устройства этажные
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-900 truncate">УЭРК</span>
          </li>
        </ol>
      </nav>
      <section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm font-medium">
                Модульное решение
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">
                Устройство этажное распределительное с кабельным отсеком{" "}
                <span className="text-accent">УЭРК</span>
              </h2>
              <p className="text-2xl text-muted-foreground text-balance leading-relaxed">
                Современное модульное устройство для приема, распределения и
                учета электроэнергии в многоквартирных домах с защитой от
                перегрузок и токов утечки.
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
              {/* <Button variant="outline" size="lg" className="text-xl py-8">
                      Скачать каталог
                    </Button> */}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">6-12</div>
                <div className="text-xl text-muted-foreground">квартир</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">25</div>
                <div className="text-xl text-muted-foreground">лет службы</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">IP31</div>
                <div className="text-xl text-muted-foreground">защита</div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
            <div className="relative w-[500px] h-[500px] bg-card rounded-3xl p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/landing/uerk.png"
                alt="УЭРК"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-4"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-4 mt-12">
        <div className="container mx-auto px-6">
          <div className="w-full mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
                Назначение
              </h2>
            </div>

            <Card className="mb-8">
              <CardContent className="px-8">
                <p className="text-justify leading-relaxed text-muted-foreground mb-6">
                  Устройство этажное распределительное с кабельным отсеком типа
                  УЭРК предназначено для приема, распределения и учета
                  электроэнергии в многоквартирных жилых домах. Оно обеспечивает
                  защиту групповых линий квартир от перегрузок, короткого
                  замыкания и токов утечки в сетях с глухозаземленной нейтралью
                  (230/400 В, 50 Гц, TN-S, TN-C, TN-C-S), а также служит для
                  размещения слаботочных систем (телефонной, телевизионной,
                  интернет-сетей, сигнализации, АСКУЭ). УЭРК — современная
                  альтернатива устаревшим этажным щитам типа ЩЭ, ЩЛС, УЭРП,
                  УЭРС, отличающаяся наличием отдельного кабельного отсека и
                  повышенной жесткостью конструкции. Соответствует стандартам
                  ГОСТ Р 51321.1-2007, ГОСТ IEC 60439.3-2012, ТР ТС 004/2011.
                </p>

                <div className="grid md:grid-cols-3 gap-6 pb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-7 w-7 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-2xl mb-3">
                        Применение
                      </div>
                      <div className="text-justify text-xl text-muted-foreground">
                        Установка на этажах жилых зданий, коммунально-бытовых и
                        общественных объектов.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-7 w-7 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-2xl mb-3">
                        Обслуживание
                      </div>
                      <div className="text-justify text-xl text-muted-foreground">
                        До 6–12 квартир в зависимости от типа счетчиков и
                        конфигурации.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-7 w-7 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-2xl mb-3">
                        Универсальность
                      </div>
                      <div className="text-justify text-xl text-muted-foreground">
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
        <div className="container mx-auto px-6">
          <div className="max-w-8xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="h-8 w-8 text-accent" />
              <h2 className="text-3xl lg:text-4xl font-bold">Конструкция</h2>
            </div>

            <Card>
              <CardContent className="p-8">
                <p className="text-justify text-2xl leading-relaxed text-muted-foreground indent-20">
                  УЭРК представляет собой сборную металлическую конструкцию,
                  состоящую из трех секций (нижний, средний, верхний отсеки),
                  выполненных из листового металла с полиэфирным порошковым
                  покрытием (RAL 9003/7035, шагрень) для долговечности и
                  эстетики. Устройство имеет навесное исполнение, но может
                  встраиваться в подготовленную нишу.
                </p>
                <p className="text-justify text-2xl leading-relaxed text-muted-foreground indent-20">
                  Отличительной особенностью является отдельный кабельный отсек
                  (КСС), разделенный металлической перегородкой по всей высоте
                  для изоляции слаботочных линий от силовых. Верхний отсек
                  оснащен компенсатором высоты для адаптации к высоте потолка
                  (например, до 3050 мм). Конструкция собирается болтовыми
                  соединениями, обеспечивая жесткость и удобство
                  транспортировки.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Modules Section */}
      <section className="py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <Home className="h-8 w-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-bold">Отсеки</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[
              {
                title: "Слаботочный отсек (КСС)",
                description:
                  "Расположен в отдельном кабельном отсеке, предназначен для аппаратуры связи, интернета, телевидения, сигнализации, АСКУЭ. Оснащен запираемой дверью с индивидуальным замком.",
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
                  "Поддерживает до 2 питающих стояков (рабочий и транзитный), оснащен шинами N/PE, кабельными и плашечными зажимами. Нижний отсек включает место для ответвительных сжимов или РБП.",
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
          <p className="text-2xl leading-relaxed text-muted-foreground my-6">
            Каждый отсек имеет дверь на качественных петлях с замком
            (универсальный или индивидуальный по заказу), упрощающий
            обслуживание.
          </p>
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
                      "Номинальное напряжение: 230/400 В (AC), 50 Гц.",
                      "Системы заземления: TN-S, TN-C, TN-C-S.",
                      "Номинальные токи выключателей: 25, 32, 40, 50, 63, 100, 125 А.",
                      "Дифференциальные токи АВДТ/УЗО: 10, 30, 100, 300 мА.",
                      "Отключающая способность: ≥4,5 кА.",
                      "Максимальное сечение проводников: 95 мм².",
                      "Степень защиты: IP31 (фасад), IP00 (остальные стороны в несмонтированном состоянии).",
                      "Климатическое исполнение: УХЛ3/УХЛ4 (температура от -25°C до +40°C, влажность до 60% при +20°C, высота до 2000м).",
                      "Материал корпуса: Листовой металл с полиэфирным порошковым покрытием (RAL 9003/7035, шагрень).",
                      "Габаритные размеры: Высота до 3050 мм (с компенсатором), ширина и глубина зависят от конфигурации (например, 300x150 мм для отсека).",
                      "Масса: ~21–52 кг (зависит от конфигурации).",
                      "Способ установки: Навесной (болтовое соединение) или встроенный в подготовленную нишу.",
                      "Дополнительные аксессуары: Кронштейны, хомуты, DIN-рейки, компенсатор высоты.",
                      "Срок службы: До 25 лет, гарантия 3 года.",
                    ].map((spec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-7 w-7 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-2xl text-muted-foreground leading-relaxed">
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
                <h2 className="text-3xl font-bold">Преимущества УЭРК</h2>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      "Отдельный кабельный отсек: Полная изоляция слаботочных линий от силовых, повышающая безопасность и удобство.",
                      "Быстрая установка: Трехсекционная конструкция и болтовое соединение сокращают время монтажа по сравнению с УЭРМ.",
                      "Компенсатор высоты: Адаптация к различным высотам потолков (например, до 3050 мм).",
                      "Жесткая конструкция: Высокая надежность благодаря качественной фурнитуре (петли, замки) и болтовым соединениям.",
                      "Универсальность: Поддержка одно- и трехфазных систем, обслуживание до 12 квартир.",
                      "Эстетика: Полиэфирное покрытие обеспечивает аккуратный вид на лестничных площадках.",
                      "Удобство транспортировки: Разделение на три секции упрощает доставку на объект.",
                    ].map((advantage, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-7 w-7 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-2xl text-muted-foreground leading-relaxed">
                          {advantage}
                        </span>
                      </div>
                    ))}
                    <p className="text-gray-600 pt-4">
                      УЭРК выделяется отдельным кабельным отсеком и
                      компенсатором высоты, что делает его оптимальным для
                      проектов, требующих быстрого монтажа и структурированной
                      прокладки кабелей.
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
        <div className="container mx-auto px-6">
          <div className="max-w-8xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              {/* <Cable className="h-8 w-8 text-accent" /> */}
              <h2 className="text-3xl lg:text-4xl font-bold">Комплектность</h2>
            </div>

            <div className="grid gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      "В комплект поставки входят: Корпус УЭРК (трехсекционный), двери отсеков, шины N/PE, DIN-рейки, компенсатор высоты, ключи (1 на замок), паспорт, схемы подключения, сертификат соответствия.",
                      "Не входят: Счетчики электроэнергии (например, Меркурий 200/230), фазные сжимы, УЗИП (заказываются отдельно).",
                      "По запросу: Дополнительные ключи, документация, аксессуары (хомуты, кронштейны).",
                    ].map((spec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-7 w-7 text-green-600 mt-1 flex-shrink-0" />
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
          <div className="max-w-8xl mx-auto mt-8">
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
                      "Монтаж: Навесной (болтовое соединение) или встроенный в подготовленную нишу, кабели вводятся через отверстия Ø25–32 мм, компенсатор высоты адаптирует к потолку.",
                      "Не входят: Счетчики электроэнергии (например, Меркурий 200/230), фазные сжимы, УЗИП (заказываются отдельно).",
                      "По запросу: Дополнительные ключи, документация, аксессуары (хомуты, кронштейны).",
                    ].map((spec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-7 w-7 text-green-600 mt-1 flex-shrink-0" />
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
      {/* Related Products */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
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
                href: "/catalog/uerm",
                title: "УЭРМ",
                description: "Модульное, сборное, для домов без ниш.",
              },
            ].map((product, index) => (
              <Link key={index} href={product.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-3xl text-accent">
                      {product.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl text-muted-foreground leading-relaxed">
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
            <h2 className="text-3xl text-center lg:text-4xl font-bold mb-4 text-balance">
              Заказ и покупка
            </h2>
            <p className="text-2xl justify-center text-muted-foreground mb-8  leading-relaxed">
              Предлагаем купить этажное распределительное устройство УЭРК по
              выгодной цене в интернет-магазине нашей компании. Продукция
              доступна оптом и в розницу с быстрой доставкой по Москве,
              Краснодару и всей России. Изготовление по индивидуальным проектам
              заказчика.
            </p>
            <p className="text-2xl text-left text-muted-foreground mb-8 text-balance leading-relaxed">
              Для заказа укажите:
            </p>

            <ul className="list-disc text-left pl-6 text-muted-foreground leading-relaxed pb-4">
              <li>Количество квартир (1–12).</li>
              <li>
                Тип счетчиков и аппаратуры (одно-/трехфазные, АСКУЭ, УЗИП).
              </li>
              <li>Компоновку отсеков, габариты, цвет (RAL 9003/7035).</li>
              <li>Дополнительные аксессуары (компенсатор, замки).</li>
            </ul>

            <div className="flex flex-wrap justify-center gap-4 my-4">
              <Button
                onClick={() =>
                  handleButtonClick("Получить коммерческое предложение")
                }
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-8"
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
            <p className="text-left text-muted-foreground leading-relaxed">
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
}
