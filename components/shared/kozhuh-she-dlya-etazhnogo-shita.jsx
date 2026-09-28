"use client";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

export function KozhukhTop() {
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
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <p className="text-justify text-xl text-muted-foreground text-balance leading-relaxed">
                Кожух ЩЭ для навесного исполнения представляет собой
                металлическую конструкцию, предназначенную для преобразования
                встраиваемого этажного распределительного щита в навесное
                исполнение. Основное назначение кожуха заключается в обеспечении
                возможности установки этажного щита непосредственно на
                поверхность стены без необходимости создания ниши.
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
            {/* 
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1-12</div>
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
            </div> */}
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/kozhukh_top.png"
                alt="УЭРМ - Устройство этажное распределительное модульное"
                width={1000}
                height={1000}
                className="object-contain hover:scale-105 transition-transform duration-500"
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
    </>
  );
}

export function KozhukhBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="container mx-auto px-2 space-y-10 text-xl mt-6">
        {/* Application Section */}
        <section className="py-4 mt-12">
          <div className="container mx-auto ">
            <div className="w-full mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-balance">
                  Основные области применения
                </h2>
              </div>

              <Card className="mb-8">
                <CardContent className="px-4 space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">
                      Жилые здания и сооружения
                    </h3>
                    <p className="text-justify text-lg text-muted-foreground leading-relaxed">
                      Кожухи ЩЭ используются для сборки этажных
                      распределительных щитов в многоквартирных жилых домах,
                      общежитиях и коммунальных зданиях. Эти щиты обеспечивают
                      прием и поквартирное распределение электроэнергии
                      напряжением 230В, а также учет потребления электроэнергии.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-3">
                      Общественные здания
                    </h3>
                    <p className="text-justify text-lg text-muted-foreground leading-relaxed">
                      Применяются в офисных зданиях, административных комплексах
                      и других общественных сооружениях для организации
                      надежного электроснабжения.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-3">
                      Защитные функции
                    </h3>
                    <p className="text-justify text-lg text-muted-foreground leading-relaxed">
                      Кожух обеспечивает защиту отходящих линий при перегрузках
                      и коротких замыканиях, а также защиту от случайного
                      прикосновения к токоведущим частям щита этажного при его
                      навесном монтаже.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Construction Features */}
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto">
            <div className="max-w-8xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Shield className="h-8 w-8 text-accent" />
                <h2 className="text-2xl lg:text-3xl font-bold">
                  Конструктивные особенности применения
                </h2>
              </div>

              <Card>
                <CardContent className="px-4 space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">
                      Многоотсечная система
                    </h3>
                    <p className="text-justify text-lg text-muted-foreground leading-relaxed">
                      Этажный щит в кожухе состоит из трех основных отсеков:
                      <br />
                      <strong>Вводно-учетный отсек</strong> — размещаются
                      счетчики электроэнергии (по количеству квартир) и возможна
                      установка аппарата отключения магистральной линии.
                      <br />
                      <strong>Распределительный отсек</strong> — устанавливаются
                      DIN-рейки для групповых автоматов и элементы для шин N и
                      PE.
                      <br />
                      <strong>Слаботочный отсек</strong> — предназначен для
                      размещения телевизионных, радио, телефонных линий, систем
                      охранной сигнализации и домофонов.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-3">
                      Модульность и масштабируемость
                    </h3>
                    <p className="text-justify text-lg text-muted-foreground leading-relaxed">
                      Конструкция позволяет установить до 9 модулей защитной
                      аппаратуры на каждую квартиру, что обеспечивает гибкость в
                      планировании электроснабжения.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section className="py-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="h-8 w-8 text-accent" />
              <h2 className="text-2xl lg:text-3xl font-bold">
                Основные технические параметры
              </h2>
            </div>

            <Card>
              <CardContent className="px-4 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Габаритные размеры
                  </h3>
                  <ul className="list-disc pl-6 text-lg text-muted-foreground space-y-2">
                    <li>
                      <strong>Высота:</strong> 995 мм (для модели ЩЭ)
                    </li>
                    <li>
                      <strong>Ширина:</strong> 945 мм (для модели ЩЭ)
                    </li>
                    <li>
                      <strong>Глубина:</strong> 160 мм (стандартная для всех
                      моделей)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-3">
                    Материал и конструкция
                  </h3>
                  <ul className="list-disc pl-6 text-xl text-muted-foreground space-y-2">
                    <li>
                      <strong>Материал корпуса:</strong> Листовая сталь толщиной
                      1,0 мм
                    </li>
                    <li>
                      <strong>Тип покрытия:</strong> Порошковая окраска с
                      фактурой "шагрень"
                    </li>
                    <li>
                      <strong>Цвет:</strong> RAL 7035 (светло-серый)
                    </li>
                    <li>
                      <strong>Вес:</strong> 8,5 кг
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-3">
                    Защитные характеристики
                  </h3>
                  <ul className="list-disc pl-6 text-xl text-muted-foreground space-y-2">
                    <li>
                      <strong>Степень защиты:</strong> IP31 защита от твердых
                      частиц и капель воды
                    </li>
                    <li>
                      <strong>Климатическое исполнение:</strong> УХЛ3 по ГОСТ
                      15150-69
                    </li>
                    <li>
                      <strong>Антикоррозийная стойкость:</strong> Повышенная
                      благодаря качественному покрытию
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Exploitation */}
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Server className="h-8 w-8 text-accent" />
              <h2 className="text-3xl lg:text-4xl font-bold">
                Эксплуатационные характеристики
              </h2>
            </div>

            <Card>
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-3">
                    Срок службы и гарантия
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <strong>Срок службы:</strong> 25 лет при соблюдении условий
                    эксплуатации <br />
                    <strong>Гарантийный срок:</strong> 3 года от производителя
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Условия эксплуатации
                  </h3>
                  <ul className="list-disc pl-6 text-lg text-muted-foreground space-y-2">
                    <li>
                      <strong>Рабочая температура:</strong> от +1°C до +35°C
                    </li>
                    <li>
                      <strong>Относительная влажность:</strong> не более 80% при
                      +25°C
                    </li>
                    <li>
                      <strong>Номинальный ток:</strong> до 50А для одной
                      квартиры
                    </li>
                    <li>
                      <strong>Номинальное напряжение:</strong> 230/400В, частота
                      50 Гц
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Installation */}
        <section className="py-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Cable className="h-8 w-8 text-accent" />
              <h2 className="text-3xl lg:text-4xl font-bold">
                Монтажные характеристики
              </h2>
            </div>

            <Card>
              <CardContent className="px-4 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Способ установки
                  </h3>
                  <ul className="list-disc pl-6 text-lg text-muted-foreground space-y-2">
                    <li>
                      <strong>Тип монтажа:</strong> Накладной (поверхностный)
                    </li>
                    <li>
                      <strong>Высота установки:</strong> 1,5–1,8 м от уровня
                      пола
                    </li>
                    <li>
                      <strong>Угол открытия дверей:</strong> Не менее 95° (до
                      105° для расширенных моделей)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Комплектация</h3>
                  <ul className="list-disc pl-6 text-lg text-muted-foreground space-y-2">
                    <li>Кожух с монтажной рейкой</li>
                    <li>Комплект метизов для крепления</li>
                    <li>Паспорт изделия</li>
                    <li>Знаки "Высокое напряжение" и "Заземление"</li>
                    <li>Маркировочная таблица</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Дополнительные технические особенности
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Возможность регулировки глубины расположения элементов по
                    корпусу. <br />
                    Перфорированные отверстия для ввода кабелей. <br />
                    Совместимость с модульной аппаратурой стандарта DIN. <br />
                    Возможность опломбирования (4 точки).
                  </p>
                </div>
              </CardContent>
            </Card>

            <p className="text-lg text-muted-foreground leading-relaxed px-4 mt-6">
              Кожух ЩЭ для навесного исполнения обеспечивает высокую
              технологичность сборки, простоту монтажа и долговечность
              эксплуатации, соответствуя всем современным требованиям
              безопасности и функциональности электротехнических изделий.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-4">
          <div className="container mx-auto">
            <div className="max-w-8xl  ">
              <h2 className="text-3xl text-center lg:text-4xl font-bold mb-4 text-balance">
                Заказ и покупка
              </h2>
              <p className="text-lg justify-center text-muted-foreground mb-8 px-4  leading-relaxed">
                Предлагаем купить этажное распределительное устройство УЭРМ по
                выгодной цене в интернет-магазине нашей компании. Продукция
                доступна оптом и в розницу с быстрой доставкой по Москве, М.О. и
                всей России. Изготовление по индивидуальным проектам заказчика.
              </p>
              <p className="text-lg text-left text-muted-foreground mb-8 text-balance leading-relaxed">
                Для заказа укажите:
              </p>

              <ul className="list-disc text-left pl-6 text-lg text-muted-foreground leading-relaxed pb-4">
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
              <p className="text-left px-4 text-lg text-muted-foreground leading-relaxed">
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
