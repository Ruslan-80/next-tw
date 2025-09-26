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
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UERMProductPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 py-16 lg:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8 animate-fade-in-up">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Главная
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li>
                <Link
                  href="/catalog/schity-etazhnye-i-ustroystva-podezdnye"
                  className="hover:text-accent transition-colors"
                >
                  Щиты этажные и устройства подъездные
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li>
                <Link
                  href="/catalog/ustroystva-etazhnye"
                  className="hover:text-accent transition-colors"
                >
                  Устройства этажные
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li className="font-medium text-foreground">УЭРМ</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm font-medium">
                  Модульное решение
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">
                  Устройство этажное распределительное модульное{" "}
                  <span className="text-accent">УЭРМ</span>
                </h1>
                <p className="text-2xl text-muted-foreground text-balance leading-relaxed">
                  Современное модульное устройство для приема, распределения и
                  учета электроэнергии в многоквартирных домах с защитой от
                  перегрузок и токов утечки.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-8"
                >
                  Получить консультацию
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="text-xl py-8">
                  Скачать каталог
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">6-12</div>
                  <div className="text-xl text-muted-foreground">квартир</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">25</div>
                  <div className="text-xl text-muted-foreground">
                    лет службы
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">IP31</div>
                  <div className="text-xl text-muted-foreground">защита</div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-card rounded-3xl p-8 shadow-2xl flex justify-center mx-auto">
                <Image
                  src="/images/landing/uerm1.png"
                  alt="УЭРМ - Устройство этажное распределительное модульное"
                  width={250}
                  height={250}
                  className="object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
                Назначение
              </h2>
            </div>

            <Card className="mb-8">
              <CardContent className="px-8">
                <p className="text-xl leading-relaxed text-muted-foreground mb-6">
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

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-2xl">Применение</div>
                      <div className="text-xl text-muted-foreground">
                        Установка на этажах жилых зданий, коммунально-бытовых и
                        общественных объектов.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-2xl">Обслуживание</div>
                      <div className="text-xl text-muted-foreground">
                        До 6–12 квартир в зависимости от типа счетчиков и
                        конфигурации.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-2xl">
                        Универсальность
                      </div>
                      <div className="text-xl text-muted-foreground">
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
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-8xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="h-8 w-8 text-accent" />
              <h2 className="text-3xl lg:text-4xl font-bold">Конструкция</h2>
            </div>

            <Card>
              <CardContent className="p-8">
                <p className="text-xl leading-relaxed text-muted-foreground">
                  УЭРМ представляет собой сборную модульную конструкцию из
                  металлических коробов (КЭТ, КСС) и ящиков ЯУР, выполненных из
                  листового металла с полиэфирным порошковым покрытием (RAL
                  9003/7035, шагрень) для долговечности и эстетики. Устройство
                  имеет навесное исполнение, что исключает необходимость
                  штрабления стен. Конструкция включает короба
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
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <Home className="h-8 w-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-bold">Модули системы</h2>
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
                  "Распределительный модуль: Для автоматических выключателей, АВДТ, УЗО, УЗИП (до 12–24 модулей на квартиру).",
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
                  <p className="text-muted-foreground text-xl leading-relaxed">
                    {module.description}
                  </p>
                </CardContent>
              </Card>
            ))}
            <p className="text-xl leading-relaxed text-muted-foreground mb-6">
              Каждый модуль имеет запираемую дверь (универсальный или
              индивидуальный замок), обеспечивая безопасность и удобство
              обслуживания.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Specs & Advantages */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
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
                      "Напряжение: 230/400 В, 50 Гц",
                      "Заземление: TN-S, TN-C, TN-C-S",
                      "Токи выключателей: 25–125 А",
                      "Диф. токи: 10–300 мА",
                      "Отключающая способность: ≥4,5 кА",
                      "Сечение проводников: до 95 мм²",
                      "Степень защиты: IP31 (фасад), IP00 (несмонтированное)",
                      "Климат: УХЛ3/УХЛ4, -25°C до +40°C, влажность до 60%",
                      "Материал: Листовой металл, покрытие RAL 9003/7035",
                      "Срок службы: 25 лет, гарантия 3 года",
                    ].map((spec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-xl">{spec}</span>
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
                <h2 className="text-3xl font-bold">Преимущества УЭРМ</h2>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      "Модульная сборка, универсальность",
                      "Навесной монтаж, без штрабления",
                      "Поддержка одно-/трехфазных систем, до 12 квартир",
                      "АСКУЭ, УЗИП, защита от перегрузок, КЗ, утечек, пожаров",
                      "Эстетичное покрытие, экологичные материалы",
                      "Ревизионные окошки, запираемые двери",
                    ].map((advantage, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-xl">{advantage}</span>
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
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Cable className="h-8 w-8 text-accent" />
              <h2 className="text-3xl lg:text-4xl font-bold">
                Установка и эксплуатация
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Комплектность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Включает: короба КЭТ, КСС, ящики ЯУР, шины N/PE, DIN-рейки,
                    Z-/П-профили, ключи, паспорт, схемы, сертификат. Не
                    включает: счетчики, фазные сжимы, УЗИП (по заказу).
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Монтаж</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Навесной монтаж, винтовое соединение, кабели через отверстия
                    Ø25–32 мм. Условия: УХЛ3/УХЛ4, невзрывоопасная среда. Режим:
                    продолжительный, одностороннее обслуживание.
                  </p>
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
                href: "/catalog/uerk",
                title: "УЭРК",
                description:
                  "Навесное с кабельным отсеком, компенсатор высоты.",
              },
            ].map((product, index) => (
              <Link key={index} href={product.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-2xl text-accent">
                      {product.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-xl leading-relaxed">
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
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
              Заказ и покупка
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-balance leading-relaxed">
              Купить УЭРМ по выгодной цене с доставкой по Москве, М.О. и России.
              Заказывайте оптом/в розницу, указав количество квартир, тип
              счетчиков, компоновку модулей, цвет, аксессуары.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-8"
              >
                Получить коммерческое предложение
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="py-8 text-xl">
                Связаться с менеджером
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
