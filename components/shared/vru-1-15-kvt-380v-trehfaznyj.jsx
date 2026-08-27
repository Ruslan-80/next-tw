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

export function vru15kvtTop() {
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
              <h2 className="text-2xl lg:text-5xl font-bold text-balance leading-tight">
                Вводно-распределительное устройство (ВРУ)
              </h2>
              <p className="text-muted-foreground text-balance leading-relaxed">
                <strong>ВРУ</strong> — это электрический шкаф, который служит
                для приёма, распределения и учёта электроэнергии в сетях{" "}
                <a
                  href="vvodno-raspredelitelnye-ustrojstva-vru?nominalnoe-napryazhenie=380%2F220"
                  className="text-accent hover:underline"
                >
                  380В
                </a>
                , а также для защиты линий при перегрузках и коротких
                замыканиях. <strong>Купить щит ВРУ в сборе</strong> в Москве вы
                можете напрямую с нашего производства — без посредников, с
                полным пакетом документов и гарантией 3 года.
              </p>
              <p className="text-muted-foreground text-balance leading-relaxed">
                Мы занимаемся изготовлением ВРУ на заказ по однолинейным схемам,
                а также предлагаем готовые силовые щиты ВРУ, собранные на
                проверенной аппаратуре отечественных и зарубежных брендов.
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
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
            <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/vvodno-raspredelitelnye-ustrojstva-vru.webp"
                alt="Щит ВРУ в сборе"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
              />
            </div>
          </div>
        </div>
      </section>

      <PopularNaborVru />

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

export function vru15kvtBottom() {
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
        {/* HERO SECTION */}
        <section className="py-6 text-xl lg:text-2xl">
          <div className="grid lg:grid-cols-2 gap-2 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4 px-2">
                <Badge className="bg-accent text-background mb-2">
                  ТУ Россетей 2026
                </Badge>
                <h1 className="text-2xl lg:text-5xl font-bold text-balance leading-tight">
                  ПОЛНОЕ РУКОВОДСТВО ПО ВЫБОРУ ВРУ 15 кВт 380В
                </h1>
                <p className="text-muted-foreground text-balance leading-relaxed">
                  Технические стандарты, нормы ТУ Россетей 2026, схемы
                  заземления и чек-лист приемки
                </p>
              </div>

              <div className="flex flex-wrap gap-4 px-2">
                <Button
                  onClick={() => handleButtonClick("Получить консультацию")}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-background text-xl py-8"
                >
                  Получить консультацию
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
              <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl flex justify-center mx-auto">
                <Image
                  src="/images/categories/vvodno-raspredelitelnye-ustrojstva-vru.webp"
                  alt="ВРУ 15 кВт 380В"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: Расчетные параметры и нормативно-техническая база */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            1. Расчетные параметры и нормативно-техническая база
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            При подключении частного дома или объекта к трехфазной сети 380В
            мощностью 15 кВт ключевым расчетом является определение номинального
            тока вводного автомата:
          </p>

          <div className="rounded-2xl p-6 border border-accent bg-card text-center my-4">
            <span className="text-muted-foreground">
              Формула трехфазной мощности:{" "}
            </span>
            <span className="font-serif italic font-bold text-accent text-lg md:text-xl">
              I = P / (√3 · U · cos φ) = 15000 / (1.732 · 380 · 0.95) ≈ 24.1 А
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Исходя из этого расчета, стандартным решением в ТУ сетевых
            организаций (Россети, МОЭСК и др.) является{" "}
            <strong>вводной трехполюсный автомат номиналом 25А</strong>{" "}
            (обеспечивает максимальную выделенную мощность до 16.4 кВт).
          </p>

          <Card className="border-accent bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-amber-500 font-bold">
                Важно (ФЗ №522 и нормы ТУ 2020–2026 гг.):
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Сетевая организация обязана самостоятельно устанавливать
                интеллектуальный прибор учета (сплит-систему на опоре ЛЭП). ВРУ
                на границе участка выполняет роль щита распределения, защиты и
                коммутации. Однако щит со встроенным счетчиком по-прежнему
                допускается для контроля и коммерческого учета при согласовании.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* SECTION 2: Сравнительный анализ конфигураций ВРУ 15 кВт */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            2. Сравнительный анализ конфигураций ВРУ 15 кВт
          </h2>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-card">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Тип ВРУ
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Оснащение / Автоматика
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Исполнение / Степень защиты
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Сценарий применения
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    ВРУ Базовый (Уличный)
                  </td>
                  <td className="py-3 px-4">
                    Вводной ВА 25А (3P) + Селективное УЗО 63А 300mA
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    Металл IP54 / IP65 (УХЛ1)
                  </td>
                  <td className="py-3 px-4">
                    Установка на столбе/стойке границы участка
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    ВРУ Учет + Защита
                  </td>
                  <td className="py-3 px-4">
                    ВА 25А + Счетчик (Меркурий/Энергомера) + УЗИП тип 2
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    Металл IP54 с окном / Опломбировка
                  </td>
                  <td className="py-3 px-4">
                    Для прямого коммерческого учета на фасаде
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    ВРУ с Генератором
                  </td>
                  <td className="py-3 px-4">
                    ВА 25А + Реверсивный рубильник (1-0-2) + Вывод
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    Металл/Пластик IP54/IP65
                  </td>
                  <td className="py-3 px-4">
                    Объекты с резервным питанием от бензо/дизель-генератора
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    ВРУ GSM/Smart Line
                  </td>
                  <td className="py-3 px-4">
                    ВА 25А + Smart-счетчик / Модем передачи данных
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <strong>Пластик (Radio-Transparent) IP65</strong>
                  </td>
                  <td className="py-3 px-4">
                    Бесперебойная передача сигналов GSM/PLC/Wi-Fi
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Схемы заземления и безопасность */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            3. Схемы заземления и безопасность
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            При монтаже ВРУ применяются две основные системы заземления:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>TN-C-S:</strong> Нулевой защитный (PE) и нулевой рабочий
              (N) проводники разделяются во ВРУ на главной заземляющей шине
              (ГЗШ). PEN-проводник от линии расщепляется до вводного автомата.
              Обязательна установка повторного заземления корпуса ВРУ.
            </li>
            <li>
              <strong>TT:</strong> Нейтраль питающей сети не имеет связи с
              заземлением покупателя. Повторное заземление делается автономно.
              Требует обязательного применения дифференциальной защиты
              (УЗО/АВДТ) на всех линиях.
            </li>
          </ul>

          <div className="rounded-2xl p-6 border border-accent bg-card">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Противопожарная защита:</strong> Рекомендуется установка
              селективного УЗО (класс <strong>S</strong>) с током утечки 100mA
              или 300mA на вводе. Это предотвращает отключение главного щита при
              локальных утечках в доме и защищает вводной кабель от возгорания.
            </p>
          </div>
        </section>

        {/* SECTION 4: Чек-лист проверки ВРУ перед вызовом инспектора Россетей */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            4. Чек-лист проверки ВРУ перед вызовом инспектора Россетей
          </h2>

          <Card className="border-accent bg-card">
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>Вводной автомат 25А:</strong> Оснащен прозрачной
                    пломбировочной крышкой/боксом для доступа инспектора.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>Разделение PEN:</strong> Выполнено на шине ГЗШ из
                    меди/латуни с наглядным заземлением корпуса и дверцы гибким
                    проводником.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>Герметичность ввода:</strong> В нижней части шкафа
                    установлены сальники (MG/PG) для кабеля СИП или подведено
                    уплотнение IP54+.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>Оконцевание кабеля:</strong> Алюминиевые жилы СИП
                    обжаты алюмомедными гильзами (ГАМ) или зажаты с контактной
                    пастой.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>Заземление корпуса:</strong> Внешний контур
                    заземления подключен к болту заземления шкафа проводником от
                    10 мм² (медь).
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* SECTION 5: Рекомендуемые сопутствующие материалы для монтажа */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            5. Рекомендуемые сопутствующие материалы для монтажа
          </h2>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-card">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Наименование
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Характеристики / Назначение
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Количество
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    Кабель СИП-4 4х16
                  </td>
                  <td className="py-3 px-4">
                    Алюминиевый самонесущий изолированный кабель 380В
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    По длине от пролета (м)
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    Прокалывающие зажимы ЗОИ (или ЗПО)
                  </td>
                  <td className="py-3 px-4">
                    Для подключения СИП к магистральной линии без снятия
                    изоляции
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">4 шт.</td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    Анкерный зажим / Кронштейн CA 1500
                  </td>
                  <td className="py-3 px-4">
                    Крепление кабеля СИП к опоре ЛЭП и фасаду здания
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">2 шт.</td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    Комплект модульного заземления (4.5м)
                  </td>
                  <td className="py-3 px-4">
                    Оцинкованные/медненные стальные стержни для штыревого
                    заземления
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">1 компл.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 justify-center py-6">
          <Button
            onClick={() => handleButtonClick("Заказать ВРУ 15 кВт")}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-background text-xl py-8"
          >
            Заказать ВРУ 15 кВт
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialContent={modalContent}
          onSubmit={handleFormSubmit}
          submitError={error}
        />
      </div>
    </div>
  );
}
