import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  Cable,
  Server,
  Shield,
  Home,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import ComparisonTable from "@/app/(main)/landing/ustroystva-etazhnye/table";

export function VruSoSchetchikamiTop() {
  return (
    <>
      <section className="container mx-auto mb-4">
        <div className="flex flex-col lg:flex-row bg-card shadow-xl items-center rounded-4xl px-2 lg:px-8 py-4 lg:py-12 mx-auto border border-card">
          <div className="p-4">
            <Image
              src="/images/categories/SE24L.png"
              alt="Этажные электрические щиты (ЩЭ)"
              height={1000}
              width={1000}
              className="rounded object-cover"
            />
          </div>

          <div className="text-justify text-lg lg:text-2xl px-2 lg:px-8 mb-8">
            <p className="text-text">
              Устройства типа{" "}
              <Link
                href="uerm"
                className="font-bold text-accent hover:text-accent/80 hover:underline"
              >
                УЭРМ
              </Link>
              ,{" "}
              <Link
                href="uerb"
                className="font-bold text-accent hover:text-accent/80 hover:underline"
              >
                УЭРБ
              </Link>
              ,{" "}
              <Link
                href="uerk"
                className="font-bold text-accent hover:text-accent/80 hover:underline"
              >
                УЭРК
              </Link>
              ,{" "}
              <Link
                href="uerv"
                className="font-bold text-accent hover:text-accent/80 hover:underline"
              >
                УЭРВ
              </Link>
              ,{" "}
              <Link
                href="uern"
                className="font-bold text-accent hover:text-accent/80 hover:underline"
              >
                УЭРН
              </Link>{" "}
              — современные решения для приема, распределения и учета
              электроэнергии в многоквартирных домах. Защищают от перегрузок,
              короткого замыкания, токов утечки в сетях 380/220 В, 50 Гц (TN-S,
              TN-C, TN-C-S). Поддерживают слаботочные системы (телефон,
              интернет, сигнализация, АСКУЭ). Соответствуют ГОСТ Р 51321.1-2007,
              ГОСТ IEC 60439.3-2012, ТР ТС 004/2011.
            </p>
            <ul className="list-disc pl-6 mt-2 text-text">
              <li>Применение: этажи жилых зданий, коммунальные объекты.</li>
              <li>Обслуживание: 6–12 квартир.</li>
              <li>
                Универсальность: однофазные (до 11 кВт) и трехфазные (до 32 кВт)
                системы.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export function VruSoSchetchikamiBottom() {
  return (
    <>
      <div className="container mx-auto py-6 space-y-10 text-lg lg:text-2xl mt-12">
        {/* Construction Section */}
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-8xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Shield className="h-8 w-8 text-accent" />
                <h2 className="text-3xl lg:text-4xl font-bold">Конструкция</h2>
              </div>

              <Card>
                <CardContent className="px-4 lg:px-8">
                  <p className="text-justify text-lg lg:text-2xl leading-relaxed text-muted-foreground lg:indent-20">
                    Металлические корпуса (цельносварные/сборные) с полиэфирным
                    покрытием (RAL 9003/7035, шагрень). Модульная/блочная
                    компоновка с отсеками для силовых и слаботочных линий.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-12">
              <Home className="h-8 w-8 text-accent" />
              <h2 className="text-3xl lg:text-4xl font-bold">Типы устройств</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
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
        {/* Modules Section */}
        <section className="py-4">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-12">
              <Home className="h-8 w-8 text-accent" />
              <h2 className="text-3xl lg:text-4xl font-bold">Отсеки/блоки</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[
                {
                  title: "Слаботочный отсек",
                  description: "Телефон, интернет, сигнализация, АСКУЭ.",
                },
                {
                  title: "Вводно-учетный (ЯУР) отсек",
                  description: "Счетчики, выключатели, ревизионное окно.",
                },
                {
                  title: "Распределительный отсек",
                  description: "Автоматы, АВДТ, УЗО, УЗИП (12–24 модуля).",
                },
                {
                  title: "Силовых магистралей (КЭТ)",
                  description: "Стояки, шины N/PE, зажимы.",
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
                  <h2 className="text-2xl lg:text-3xl font-bold">
                    Технические характеристики
                  </h2>
                </div>

                <Card>
                  <CardContent className="px-4 lg:px-6">
                    <div className="space-y-4">
                      {[
                        "Номинальное напряжение: 230/400 В (AC), 50 Гц.",
                        "Системы заземления: TN-S, TN-C, TN-C-S.",
                        "Номинальные токи выключателей: 25, 32, 40, 50, 63, 100, 125 А.",
                        "Дифференциальные токи АВДТ/УЗО: 10, 30, 100, 300 мА.",
                        "Отключающая способность: ≥ 4,5 кА.",
                        "Максимальное сечение проводников: 95 мм².",
                        "Степень защиты: IP31 (фасад), IP00 (несмонтированное).",
                        "Климатическое исполнение: УХЛ3/УХЛ4 (температура от -25°C до +40°C, влажность до 60% при +20°C).",
                        "Материал корпуса: Листовой металл с полиэфирным порошковым покрытием (RAL 7035, шагрень).",
                        "Срок службы: До 25 лет, гарантия 3 года.",
                      ].map((spec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 lg:h-7 lg:w-7 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-lg lg:text-2xl text-muted-foreground leading-relaxed">
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
                    Преимущества
                  </h2>
                </div>

                <Card>
                  <CardContent className="px-4 lg:px-6">
                    <div className="space-y-4">
                      {[
                        "Современная альтернатива устаревшим щитам.",
                        "Универсальность для одно- и трехфазных сетей.",
                        "Экологичные материалы, прочное покрытие.",
                        "Гибкая компоновка отсеков.",
                        "Безопасность: защита от перегрузок, КЗ, утечек.",
                      ].map((advantage, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 lg:h-7 lg:w-7 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-lg lg:text-2xl text-muted-foreground leading-relaxed">
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

        <ComparisonTable />
      </div>
    </>
  );
}
