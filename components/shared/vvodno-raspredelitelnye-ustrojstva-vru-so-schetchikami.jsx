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
import FaqVru from "@/components/faqVru";
import PopularNaborVru from "@/components/PopularNaborVru";

const QUICK_LINKS = [
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-bez-schetchika",
    label: "Без счетчика",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-transformator-toka",
    label: "С трансформаторами тока",
  },
  {
    href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru-paneli-pvr",
    label: "Панели вводно-распределительные",
  },
];

export function VruSoSchetchikamiTop() {
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
        <div className="grid lg:grid-cols-2 gap-2 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4 px-2">
              <h1 className="text-2xl lg:text-5xl font-bold text-text leading-tight">
                Щиты ВРУ со счетчиками
              </h1>
              <p className="text-muted-foreground text-text leading-relaxed">
                Устройства ВРУ со встроенным счётчиком (с коммерческим учетом)
                обеспечивают одновременный приём, распределение и строгий
                коммерческий учёт электроэнергии. Такие панели оснащаются
                трансформаторами тока и испытательными переходными коробками
                (КИК), полностью соответствуя жёстким регламентам Россетей и
                Энергосбыта для опломбировки.
              </p>
              <p className="text-muted-foreground text-text leading-relaxed">
                Это классическое вводное устройство многоквартирного дома,
                коммерческого здания или производственного цеха, гарантирующее
                бесперебойную работу и точную фиксацию потребляемой мощности.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
              <Button
                onClick={() => handleButtonClick("Получить бесплатный расчёт")}
                size="lg"
                className="btn-gold text-xl py-8 text-black"
              >
                Получить бесплатный расчёт
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
            <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/vru-all.webp"
                alt="Щит ВРУ со счетчиком"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                priority
              />
            </div>
          </div>
        </div>
        {/* Blok bystrykh ssylok vo vsyu shirinu pod dvukhkolonochnym blokom */}
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

export function VruSoSchetchikamiBottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-metal animate-metal py-8 px-4 font-sans text-text">
      <div className="container mx-auto rounded-3xl shadow-xl space-y-12">
        {/* SECTION: ПОПУЛЯРНЫЕ МОДЕЛИ ВРУ СО СЧЁТЧИКОМ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Популярные модели ВРУ со счётчиком
          </h2>
          <p className="text-muted-foreground mb-6">
            Все представленные щиты учёта комплектуются сертифицированными
            измерительными трансформаторами тока и испытательными коробками
            (КИК) для безопасного подключения приборов учёта.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-card">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Артикул
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Наименование оборудования (Спецификация)
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Типовые объекты эксплуатации
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Цена
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-1-11-10-250А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-11-10 Вводно-распределительное устройство 250 А, IP31,
                    1 ввод, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">
                    Многоквартирные жилые дома (МКД), бизнес-центры
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    от 75 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-1-21-00-100А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-21-00 Вводно-распределительное устройство 100 А, IP55,
                    1 ввод, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">Торговые павильоны, склады</td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    от 45 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-3-10-250А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-3-10 Вводно-распределительное устройство 250 А, IP31, 2
                    ввода, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">Объекты II категории надёжности</td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    от 85 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-8504-4r-125А-2000x450x450
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-8504-4Р-125 Вводно-распределительное устройство 125А
                    IP31, 1 ввод, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">
                    Малые промышленные объекты, уличные ввода
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    от 50 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-8505-4va-630А-1800x800x600
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-8505-4ВА-630 Вводно-распределительное устройство 630А
                    IP31, 1 ввод, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">
                    Энергоёмкие производства, крупные ТРЦ
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    от 50 000 руб.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs italic text-muted-foreground">
            * Итоговая стоимость ВРУ зависит от выбранной схемы, бренда
            комплектующих, сечения ошиновки и дополнительных опций (АВР, учёт и
            т.д.).
          </p>
        </section>

        {/* SECTION: ТРЕБОВАНИЯ ЭНЕРГОСБЫТА И ГОСТ */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Требования Энергосбыта и ГОСТ к узлам учёта
          </h2>
          <p className="text-muted-foreground">
            При проектировании узлов коммерческого учёта мы строго соблюдаем
            требования сетевых компаний (Россети, Энергосбыт) и ГОСТ 32396-2021.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Изолированные отсеки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  В однопанельных ВРУ и во вводных панелях многопанельных
                  устройств обязательно предусматриваются специализированные
                  изолированные отсеки для размещения блоков коммерческого
                  учёта.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  Опломбировка и безопасность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Дверцы таких отсеков должны запираться на индивидуальный ключ
                  и иметь специальные элементы (проушины) для установки пломб
                  энергоснабжающей организации. Часто для удобства снятия
                  показаний без открытия щита дверцы оснащаются прозрачными
                  смотровыми окнами.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Server className="h-5 w-5 text-accent" />
                  Состав блока учёта
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Отсеки рассчитаны на размещение оборудования для одного или
                  двух вводов (если ВРУ запитывается от двух независимых сетей).
                  Каждый полноценный блок учёта включает в себя сам счётчик,
                  испытательную переходную коробку (КИК) и измерительные
                  трансформаторы тока (при токах нагрузки свыше 100 А, когда
                  применяется трансформаторное включение).
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Использование КИК
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Испытательная переходная коробка — обязательное требование
                  ПУЭ. Она позволяет безопасно закорачивать вторичные цепи
                  трансформаторов тока, отключать токовые цепи и цепи напряжения
                  в каждой фазе счётчика при его замене или поверке, не
                  обесточивая при этом сам объект.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION: FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-4">
            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-lg">
                  Можно ли установить два счётчика в одном ВРУ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Да. Если вводно-распределительное устройство получает питание
                  от двух независимых питающих сетей (например, на объектах I
                  или II категории надёжности), отсеки учёта проектируются для
                  размещения двух независимых блоков коммерческого учёта.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-lg">
                  Для чего нужны прозрачные окна на дверцах отсека учёта?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Прозрачные окна из ударопрочного поликарбоната позволяют
                  инспекторам Энергосбыта и дежурному персоналу беспрепятственно
                  снимать показания счётчика и визуально контролировать
                  целостность пломб без необходимости открывать сам щит и
                  получать доступ к токоведущим частям.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION: CTA */}
        <section
          className="mb-12 rounded-2xl p-6 md:p-8 border border-accent bg-card"
          id="calculate"
        >
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Запросить расчёт стоимости ВРУ со счётчиком
            </h2>
            <p className="text-muted-foreground">
              Оставьте заявку или позвоните — мы подберём узел учёта под
              требования вашей сетевой организации.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
              >
                <a href="tel:+74993901467">Позвонить</a>
              </Button>
              <Button
                onClick={() => handleButtonClick("Оставить заявку")}
                variant="outline"
                size="lg"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold"
              >
                Оставить заявку
              </Button>
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
    </div>
  );
}
