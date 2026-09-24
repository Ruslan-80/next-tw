"use client";

import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  FileText,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import FaqVru15kwt from "@/components/faqVru15kwt";
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
              <h1 className="text-2xl lg:text-5xl font-bold text-text leading-tight">
                ВРУ 15 кВт 380В трехфазный
              </h1>
              <p className="text-muted-foreground text-text leading-relaxed">
                <strong>ВРУ 15 кВт 380В трехфазный</strong> – это готовый
                уличный щит учёта и распределения для частного дома, собранный в
                корпусе IP54/IP65 строго по действующим ТУ Россетей: вводной
                автомат ровно 25 А (3P), система заземления TN‑C‑S с разделением
                PEN, обязательный опломбировочный бокс, а также полный пакет
                документов, гарантирующий приёмку инспектором с первого раза без
                переделок и скрытых бюрократических рисков.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
              <Button
                onClick={() => handleButtonClick("Получить бесплатный расчёт")}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-background text-xl py-8"
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
                src="/images/categories/vru-15kvt.jpeg"
                alt="ВРУ 15 кВт 380В трехфазный"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                preload={true}
              />
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
      <div className="container mx-auto ">
        {/* Технический стандарт и расчёт */}
        <section className="space-y-6">
          <p className="text-muted-foreground text-text leading-relaxed">
            В зависимости от потребностей доступны проверенные конфигурации – от
            базовой с трёхфазным счётчиком и противопожарным УЗО на 300 мА до
            «Премиум» с грозозащитой (УЗИП класс B+C) и «Умный дом» со
            сплит-счётчиком и GSM‑модемом для автоматической передачи показаний,
            а для тех, кому прибор учёта бесплатно ставит сетевая организация,
            предусмотрен вариант «Эконом» без счётчика.
          </p>
          <p className="text-muted-foreground text-text leading-relaxed">
            Внутренний монтаж выполнен негорючим медным проводом ПуГВ,
            алюминиевые жилы СИП оконцованы гильзами ГАМ, автоматы имеют
            отключающую способность 6 кА, что полностью исключает риск пожара
            при коротком замыкании, при этом каждая сборка сопровождается
            однолинейной схемой, паспортом и свежей поверкой счётчика, закрывая
            как технические, так и регуляторные требования, а значит, вы
            получаете безопасное и полностью согласованное с сетевой
            организацией решение «под ключ».
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Технический стандарт: почему мы ставим автомат на 25А?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            В основе любого правильного ТУ лежит электротехнический расчёт.
            Расчётный ток для выделенной мощности 15 кВт при трёхфазном вводе
            380В (cos φ = 0.95) составляет:
          </p>

          <div className="rounded-2xl p-6 border border-accent bg-card text-center my-4">
            <span className="font-mono text-lg md:text-xl text-accent font-bold">
              I = P / (√3 × U × cos φ) = 15000 / (1.732 × 380 × 0.95) ≈ 24.1 А
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Именно поэтому отраслевым стандартом является{" "}
            <strong>трёхполюсный вводной автомат номиналом 25А</strong> с
            характеристикой срабатывания С.
          </p>
        </section>

        {/* Каталог готовых решений */}
        <section className="space-y-6 mt-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Каталог готовых решений: выберите ВРУ под ваши ТУ
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Мы разработали 7 базовых конфигураций ВРУ под разные сценарии
            использования и требования сетевых организаций:
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-card">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Модель ВРУ 15 кВт
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Ключевое оснащение
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Назначение
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Ориентировочная цена
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    Базовый
                  </td>
                  <td className="py-3 px-4">
                    Автомат 25А, счётчик (1 тариф), шины N/PE, корпус IP54.
                  </td>
                  <td className="py-3 px-4">
                    Сдача ТУ, минимальный бюджет, временное подключение.
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    8 500 – 11 000 ₽
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    Стандарт
                  </td>
                  <td className="py-3 px-4">
                    Всё базовое + Противопожарное УЗО 300мА.
                  </td>
                  <td className="py-3 px-4">
                    Частный дом (постоянное проживание), надёжная защита от
                    пожара.
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    13 500 – 17 000 ₽
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    Комфорт (Строй)
                  </td>
                  <td className="py-3 px-4">
                    + Розетки 220В (16А) и 380В (32А) на корпусе с дифавтоматом.
                  </td>
                  <td className="py-3 px-4">
                    Активное строительство, удобное подключение инструмента без
                    удлинителей.
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    16 500 – 21 000 ₽
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    Премиум
                  </td>
                  <td className="py-3 px-4">
                    + УЗИП (Класс B+C), селективное УЗО, корпус IP65.
                  </td>
                  <td className="py-3 px-4">
                    Максимальная защита дорогой техники от ударов молний и
                    перенапряжений.
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    22 000 – 29 000 ₽
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    Умный учёт
                  </td>
                  <td className="py-3 px-4">
                    Сплит-счётчик с пультом / GSM-модемом, пластиковый корпус
                    IP65.
                  </td>
                  <td className="py-3 px-4">
                    Выполнение требований сетей по автоматической передаче
                    показаний (АСКУЭ).
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    18 000 – 25 000 ₽
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-bold whitespace-nowrap">
                    С генератором
                  </td>
                  <td className="py-3 px-4">
                    + Реверсивный рубильник (3P/4P), розетка АВР.
                  </td>
                  <td className="py-3 px-4">
                    Объекты с частыми отключениями. Защита от встречного тока за
                    5 секунд.
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    21 000 – 28 000 ₽
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Что важно знать в 2026 */}
        <section className="space-y-6 mt-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Что важно знать при подключении 15 кВт 380В в 2026 году?
          </h2>
          <ol className="list-decimal pl-5 space-y-4 text-muted-foreground leading-relaxed">
            <li>
              <strong>Закон № 522-ФЗ и счётчик на столбе:</strong>
              <br />
              Как есть: Сетевая компания сама ставит сплит-счётчик на верхушке
              опоры.
              <br />
              Что нужно вам: Ваш ВРУ на заборе/фасаде выполняет роль главного
              распределительного и защитного щита с возможностью установки
              собственного учётного прибора.
            </li>
            <li>
              <strong>Точный расчёт автомата:</strong> Вводной автомат строго на
              25А — выжимает максимум из выделенных 15 кВт без ложных
              срабатываний.
              <Card className="border-destructive/50 bg-destructive/10 my-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> Критическая ошибка:
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  Установка автомата на 32А без прямого письменного согласования
                  в ТУ — это самая частая причина отказа инспектора в подписании
                  Акта ввода в эксплуатацию, так как такой номинал пропускает до
                  21 кВт мощности.
                </CardContent>
              </Card>
            </li>
            <li>
              <strong>Безопасность дома и кабеля:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Селективное УЗО на вводе (300mA, тип S) защищает вводной
                  кабель от пожара и исключает обесточивание всего дома при
                  локальной утечке.
                </li>
                <li>
                  Уникальный факт: Корпуса уличных ВРУ IP66 из антивандального
                  пластика не экранируют GSM-сигнал, обеспечивая стабильную
                  передачу данных с умных счётчиков в АСКУЭ без установки
                  внешних антенн.
                </li>
              </ul>
              <Card className="border-accent bg-card my-3">
                <CardContent className="pt-4 text-sm flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong>💡 Инженерный совет:</strong> Если ваши ТУ требуют
                    установки счетчика с GSM / Wi-Fi / Radio модулем, выбирайте
                    ВРУ в антивандальном пластиковом корпусе (поликарбонат
                    IP65). Классический металлический шкаф работает как клетка
                    Фарадея и блокирует радиосигнал модема.
                  </div>
                </CardContent>
              </Card>
            </li>
          </ol>
        </section>

        {/* ПОЛНОЕ РУКОВОДСТВО ПО ВЫБОРУ ВРУ 15 кВт 380В */}
        <section className="space-y-6 border border-border p-6 md:p-8 rounded-3xl bg-card">
          <div className="text-text p-6 rounded-2xl mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-text">
              ПОЛНОЕ РУКОВОДСТВО ПО ВЫБОРУ ВРУ 15 кВт 380В
            </h2>
            <p className="text-text">
              Технические стандарты, нормы ТУ Россетей 2026, схемы заземления и
              чек-лист приемки
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold border-l-4 border-accent pl-3">
              1. Расчетные параметры и нормативно-техническая база
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              При подключении частного дома или объекта к трехфазной сети 380В
              мощностью 15 кВт ключевым расчетом является определение
              номинального тока вводного автомата:
            </p>
            <div className="rounded-xl p-4 border border-accent bg-background text-center">
              <span className="text-muted-foreground">
                Формула трехфазной мощности:{" "}
              </span>
              <span className="font-serif italic font-bold text-accent text-lg">
                I = P / (√3 · U · cos φ) = 15000 / (1.732 · 380 · 0.95) ≈ 24.1 А
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Исходя из этого расчета, стандартным решением в ТУ сетевых
              организаций (Россети, МОЭСК и др.) является{" "}
              <strong>вводной трехполюсный автомат номиналом 25А</strong>{" "}
              (обеспечивает максимальную выделенную мощность до 16.4 кВт).
            </p>
            <Card className="border-amber-500/50 bg-amber-500/10">
              <CardContent className="pt-4 text-sm text-muted-foreground leading-relaxed">
                <strong>Важно (ФЗ №522 и нормы ТУ 2020–2026 гг.):</strong>
                <br />
                Сетевая организация обязана самостоятельно устанавливать
                интеллектуальный прибор учета (сплит-систему на опоре ЛЭП). ВРУ
                на границе участка выполняет роль щита распределения, защиты и
                коммутации. Однако щит со встроенным счетчиком по-прежнему
                допускается для контроля и коммерческого учета при согласовании.
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold border-l-4 border-accent pl-3">
              2. Сравнительный анализ конфигураций ВРУ 15 кВт
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm min-w-[720px]">
                <thead className="bg-background">
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
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold border-l-4 border-accent pl-3">
              3. Схемы заземления и безопасность
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              При монтаже ВРУ применяются две основные системы заземления:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
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
            <div className="rounded-xl p-4 border border-accent bg-background text-sm text-muted-foreground">
              <strong>Противопожарная защита:</strong> Рекомендуется установка
              селективного УЗО (класс <strong>S</strong>) с током утечки 100mA
              или 300mA на вводе. Это предотвращает отключение главного щита при
              локальных утечках в доме и защищает вводной кабель от возгорания.
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold border-l-4 border-accent pl-3">
              4. Чек-лист проверки ВРУ перед вызовом инспектора Россетей
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
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
                  <strong>Заземление корпуса:</strong> Внешний контур заземления
                  подключен к болту заземления шкафа проводником от 10 мм²
                  (медь).
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold border-l-4 border-accent pl-3">
              5. Рекомендуемые сопутствующие материалы для монтажа
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-background">
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
          </div>
        </section>

        {/* Скачать руководство */}
        <section className="space-y-4 mt-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Скачайте бесплатное руководство
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            📘{" "}
            <strong>
              «Полное руководство по выбору ВРУ 15 кВт 380В и чек-лист сдачи
              инспектору»
            </strong>
            <br />
            Мы подготовили подробный PDF-документ, который поможет вам избежать
            ошибок и успешно пройти все этапы.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/Docs/Buying_Guide_VRU_15kW_380V.pdf" download>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 px-6">
                <FileText className="mr-2 h-5 w-5" /> Скачать PDF-руководство
              </Button>
            </Link>
            {/* <Link href="/vru-15kw-checklist.pdf" download>
              <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-6">
                <FileText className="mr-2 h-5 w-5" /> Скачать чек-лист сдачи
                инспектору
              </Button>
            </Link> */}
          </div>
        </section>

        {/* Секция гарантии сдачи */}
        <section className="space-y-6 mt-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            100% гарантия сдачи Россетям: мы продумали каждую деталь
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Наши щиты проходят строгий контроль качества ОТК. Мы исключили все
            технические причины, по которым инспектор может отказать в приёмке в
            день проверки:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong>Защита от несанкционированного доступа:</strong> Вводной
              автомат 25А обязательно устанавливается в специальный защитный
              бокс с проушинами под опломбировку.
            </li>
            <li>
              <strong>Правильное заземление:</strong> Выполнено грамотное
              расщепление PEN-проводника на главной заземляющей шине (медные
              шины N и PE) для системы TN-C-S строго до счётчика.
            </li>
            <li>
              <strong>Безопасный ввод СИП:</strong> Ввод алюминиевого кабеля
              (СИП-4 4х16) осуществляется снизу через герметичные сальники,
              корпус и поворотная дверца соединены гибким медным проводником.
            </li>
            <li>
              <strong>Промышленная надёжность:</strong> Мы используем аппараты
              защиты с отключающей способностью не менее <strong>6 кА</strong>{" "}
              по ГОСТ, избегая бюджетных линеек на 4.5 кА.
            </li>
          </ul>
        </section>

        {/* Комплектация и схема */}
        <section className="space-y-6 mt-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Комплектация и схема
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Для тех, кто хочет понимать, из чего состоит устройство, мы
            подготовили наглядную спецификацию и логику работы.
          </p>
          <h3 className="text-xl font-bold">
            Как работает схема нашего ВРУ 15 кВт:
          </h3>
          <ol className="list-decimal pl-5 space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong>Ввод линии:</strong> СИП 4х16 заходит в нижнюю часть шкафа
              через герметичные сальники IP54, обеспечивая полную влагозащиту.
            </li>
            <li>
              <strong>Защита:</strong> Вводной автомат 25А (3P) первым принимает
              нагрузку. Далее ток идёт на счётчик для учёта.
            </li>
            <li>
              <strong>Безопасность:</strong> После счётчика установлено
              селективное УЗО на 300мА. Оно спасёт ваш вводной кабель от пожара
              при утечке, но при этом не отключит весь дом из-за ложной тревоги.
            </li>
            <li>
              <strong>Распределение:</strong> Через кросс-модуль и выходные
              клеммы фазы равномерно распределяются для передачи в дом.
            </li>
          </ol>
        </section>

        {/* Качественные компоненты */}
        <section className="space-y-6 mt-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Почему мы используем качественные компоненты
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong>Автоматы 6кА:</strong> Ставим автоматы с отключающей
              способностью 6 кА, а не дешёвые 4.5 кА. Это исключает залипание
              контактов и пожар при серьёзном КЗ.
            </li>
            <li>
              <strong>Медный провод ПуГВ:</strong> Весь внутренний монтаж
              выполняется негорючим медным проводом соответствующего сечения.
            </li>
            <li>
              <strong>Обжим алюмомедью:</strong> Алюминиевые жилы СИП
              оконцовываются специальными гильзами ГАМ для надёжного контакта с
              медной «начинкой» щита.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Не берите на себя риски по сборке ответственного узла, от которого
            зависит безопасность вашего дома и электроснабжение.
          </p>
          <p className="text-muted-foreground leading-relaxed font-semibold">
            Мы гарантируем: профессиональную сборку, полное соответствие
            нормативам и техническую поддержку на всех этапах — от выбора до
            проверки инспектором.
          </p>
        </section>

        <FaqVru15kwt />

        {/* CTA */}
        <section
          className="rounded-3xl bg-card border border-accent p-8 text-center space-y-6 mt-6"
          id="calculate"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Заказать ВРУ 15 кВт 380В или получить расчёт
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Оставьте заявку, и мы подберём оптимальную конфигурацию под ваше ТУ.
            Ответим на все вопросы и поможем с документами.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a href="tel:+74993901467">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-background py-6 px-8 text-lg font-bold"
              >
                <Phone className="mr-2 h-5 w-5" /> Позвонить
              </Button>
            </a>

            <Button
              onClick={() => handleButtonClick("Оставить заявку на ВРУ 15 кВт")}
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 py-6 px-8 text-lg font-bold"
            >
              Оставить заявку
            </Button>
          </div>
          <p className="text-xs text-muted-foreground italic mt-4">
            * Все цены рассчитываются индивидуально в зависимости от выбранной
            комплектации и требований сетевой организации.
          </p>
        </section>

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
