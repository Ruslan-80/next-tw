"use client";
import { ArrowRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import FaqVru8504 from "@/components/faqVru-8504";
import PopularNaborVru from "@/components/PopularNaborVru";

export function vru8504Top() {
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
              <h1 className="text-2xl lg:text-5xl font-bold text-text leading-tight">
                Вводно-распределительные устройства ВРУ 8504 в Москве
              </h1>
              <p className="text-muted-foreground text-text leading-relaxed">
                <strong className="text-accent">
                  Вводно-распределительные устройства (ВРУ) серии 8504
                </strong>{" "}
                — это электрощитовое оборудование для приема, учета и
                распределения электроэнергии в трехфазных сетях переменного тока
                напряжением 380/220В частотой 50 Гц, применяемое для
                комплектации трансформаторных подстанций и электрощитовых в
                жилых и промышленных зданиях Москвы.{" "}
                <strong className="text-accent">
                  Вводно распределительное устройство вру 8504
                </strong>{" "}
                предназначено для защиты отходящих линий от перегрузок и
                коротких замыканий, объединяя ввод, учет и защиту в едином
                сертифицированном изделии.{" "}
                <strong className="text-accent">
                  Вводно распределительное устройство типа вру 8504
                </strong>{" "}
                может быть выполнено с одним или двумя вводами, с автоматическим
                вводом резерва (АВР) или без него.{" "}
                <strong className="text-accent">Вру 8504 цена</strong> на
                базовые модели указана в каталоге ниже и зависит от номинального
                тока, количества вводов и выбранной комплектации.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
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
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            {/* Светящееся размытие позади */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>

            {/* Адаптивный контейнер */}
            <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/vvodno-raspredelitelnye-ustrojstva-vru.png"
                alt="Вводно-распределительные устройства ВРУ 8504"
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

export function vru8504Bottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="py-8 font-sans text-text">
      {/* SECTION: CATALOG / TABLE */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6 border-l-8 border-accent pl-4">
          Популярные модификации панелей ВРУ 8504
        </h2>
        <p className="mb-4 text-base lg:text-lg">
          Ниже представлены базовые варианты панелей. Полный ассортимент
          доступен через интерфейс фильтров каталога.
        </p>
        <div className="overflow-x-auto rounded-xl border border-text shadow-lg">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="text-left">
              <tr>
                {[
                  "Артикул",
                  "Назначение",
                  "Номинальный ток",
                  "Напряжение",
                  "Степень защиты",
                  "Кол-во вводов",
                  "Цена",
                ].map((h) => (
                  <th key={h} className="p-4 border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8504-4ВА-100</td>
                <td className="p-4">Вводная</td>
                <td className="p-4">100 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31 (УХЛ4)</td>
                <td className="p-4">1 ввод</td>
                <td className="p-4 font-bold text-red-700">50 000 руб.</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8504-4АВР-100</td>
                <td className="p-4">С АВР</td>
                <td className="p-4">100 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31 (УХЛ4)</td>
                <td className="p-4">2 ввода</td>
                <td className="p-4 font-bold text-red-700">85 000 руб.</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8504-4Р-100</td>
                <td className="p-4">Распределительная</td>
                <td className="p-4">100 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31 (УХЛ4)</td>
                <td className="p-4">1 ввод</td>
                <td className="p-4 font-bold text-red-700">50 000 руб.</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8504-4ВА-250</td>
                <td className="p-4">Вводная</td>
                <td className="p-4">250 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31 (УХЛ4)</td>
                <td className="p-4">1 ввод</td>
                <td className="p-4 font-bold text-red-700">50 000 руб.</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8504-4АВР-250</td>
                <td className="p-4">С АВР</td>
                <td className="p-4">250 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31 (УХЛ4)</td>
                <td className="p-4">2 ввода</td>
                <td className="p-4 font-bold text-red-700">85 000 руб.</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8504-4Р-250</td>
                <td className="p-4">Распределительная</td>
                <td className="p-4">250 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31 (УХЛ4)</td>
                <td className="p-4">1 ввод</td>
                <td className="p-4 font-bold text-red-700">50 000 руб.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="italic text-slate-600 mt-2 text-base lg:text-lg">
          — Итоговая стоимость зависит от брендов автоматики, габаритов и
          необходимости интеграции приборов учёта. Доступны модификации с IP55,
          IP65, IP66 (климатическое исполнение УХЛ1).
        </p>
      </section>

      {/* Блок "Не нашли комплектацию" */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl p-8 rounded-xl mb-12 border border-orange-200">
        <h2 className="text-2xl text-orange-800 font-bold mb-4">
          Не нашли нужную комплектацию ВРУ 8504?
        </h2>
        <p className="mb-6 text-base lg:text-xl">
          Если среди типовых сборок нет подходящего варианта, отправьте нам вашу{" "}
          <strong>однолинейную схему (ОЛС)</strong> или техническое задание — мы
          соберём ВРУ 8504 точно по вашему проекту с полным соблюдением ПУЭ и
          ГОСТ. Если проекта пока нет, скачайте опросный лист, чтобы инженеры
          рассчитали оптимальную конфигурацию.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Button
            asChild
            variant="outline"
            className="border-orange-600 text-orange-700 hover:bg-orange-100"
          >
            <a
              href="/docs/oprosnyj-list-vru.docx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Скачать опросный лист (DOCX)
            </a>
          </Button>
          <Button
            onClick={() => handleButtonClick("Загрузить схему на расчёт")}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold"
          >
            Загрузить схему на расчёт
          </Button>
        </div>
      </section>

      {/* Блок "Аудит сметы" */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl p-8 rounded-xl mb-12 border border-accent">
        <h2 className="text-2xl text-accent font-bold mb-4">
          Уже есть спецификация или расчёт от другого поставщика?
        </h2>
        <p className="mb-4 text-base lg:text-xl">
          Наши инженеры бесплатно проведут <strong>технический аудит</strong>{" "}
          вашей сметы:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-base lg:text-xl">
          <li>
            Проверим однолинейную схему на соответствие ПУЭ и ГОСТ, исключим
            возможные ошибки в расчёте номиналов и сечений.
          </li>
          <li>
            Предложим оптимизированное бюджетное решение на надёжных аналогах —
            часто это снижает стоимость на 15–30% без потери технических
            характеристик.
          </li>
          <li>
            Поможем сравнить наше коммерческое предложение с конкурентным и
            выбрать выгодный вариант.
          </li>
        </ul>
        <Button
          onClick={() => handleButtonClick("Загрузить спецификацию на аудит")}
          className="bg-red-600 hover:bg-red-700 text-white font-bold"
        >
          Загрузить спецификацию на аудит
        </Button>
      </section>

      {/* Коммерческие преимущества и сервис */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6">
          Коммерческие преимущества и сервис
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-4 text-accent">
              Оптимизация сметы и выбор комплектующих
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                <strong>Соответствие ГОСТ и ПУЭ без переплаты.</strong> ВРУ
                проектируются и собираются в соответствии с ГОСТ Р 51732-2013,
                ГОСТ 32396-2013/2021 и требованиями ПУЭ (7-е изд.). Подбираем
                комплектацию, которая проходит приёмку, но не перегружена
                лишними функциями.
              </li>
              <li>
                <strong>Расчёт токов и шин под реальную нагрузку.</strong>{" "}
                Подбираем номинальные токи вводных и распределительных цепей
                (In), сечения медных/алюминиевых шин и проверяем их на
                кратковременно выдерживаемый ток КЗ (Icc). Это позволяет
                избежать завышенных сечений и избыточных номиналов аппаратов.
              </li>
              <li>
                <strong>Выбор брендов аппаратуры под бюджет.</strong>{" "}
                Комплектуем ВРУ аппаратами КЭАЗ, IEK, CHINT, DEKraft, TDM, а
                также ABB, Schneider Electric, Siemens (по согласованию). Даём
                несколько вариантов комплектации с разной ценой и одинаковым
                уровнем соответствия нормам.
              </li>
            </ul>
          </div>

          <div className="border p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-4 text-accent">
              Скорость сборки, монтажа и ввода в работу
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                <strong>Заводская сборка вместо «щитов на коленке».</strong> ВРУ
                изготавливаются в производственных условиях, а не на объекте,
                что повышает качество сборки и повторяемость. Каждое изделие
                проходит внутренний контроль перед отгрузкой.
              </li>
              <li>
                <strong>Сокращение сроков на объекте.</strong> Щит поставляется
                собранным, промаркированным и готовым к подключению, что
                сокращает время монтажных работ. Для типовых ВРУ срок
                изготовления — от 7–10 рабочих дней, для индивидуальных — по
                согласованию.
              </li>
              <li>
                <strong>ОТК и предмонтажная подготовка.</strong> Проверяем
                монтаж, маркировку, затяжку соединений, комплектность и
                работоспособность схемы. Щит поступает с нанесённой маркировкой
                аппаратов, фидеров и кабельных подключений.
              </li>
            </ul>
          </div>

          <div className="border p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-4 text-accent">
              Документы, гарантия и сопровождение
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                <strong>Паспорт ВРУ на каждое изделие.</strong> Передаём паспорт
                с основными техническими данными, схемой, составом аппаратуры и
                требованиями к эксплуатации. Документ соответствует фактической
                комплектации поставленного ВРУ.
              </li>
              <li>
                <strong>Однолинейная схема и спецификация.</strong>{" "}
                Предоставляем однолинейную схему и спецификацию, которые
                полностью соответствуют собранному щиту. Это упрощает монтаж,
                приёмку и дальнейшую эксплуатация.
              </li>
              <li>
                <strong>Протоколы заводской проверки.</strong> По запросу
                передаём протоколы внутреннего контроля и проверки
                работоспособности схемы. Подтверждение того, что ВРУ прошло ОТК
                перед отгрузкой.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Производство и покупка ВРУ 8504 в Москве */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          Производство и покупка ВРУ 8504 в Москве
        </h2>
        <p className="mb-6 text-base lg:text-xl">
          Заказать производство, сборку и купить ВРУ 8504 напрямую от
          завода-изготовителя можно с доставкой по Москве и всем регионам
          России.
        </p>

        {/* Контакты и Оплата */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-xl border">
            <h3 className="font-bold text-xl mb-4">📍 Контакты и логистика</h3>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                <strong>Адрес производства:</strong> г. Москва, ул. Чермянская,
                д. 1, стр. 1, офис 214.
              </li>
              <li>
                <strong>Доставка по Москве:</strong> Бесплатно при сумме заказа
                от 70 000 руб.
              </li>
              <li>
                <strong>Доставка в регионы:</strong> Отправка любой транспортной
                компанией (доставка до терминала в Москве — бесплатно).
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border">
            <h3 className="font-bold text-xl mb-4">💳 Оплата и гарантия</h3>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                <strong>Рассрочка (B2B):</strong> Возможность частичной
                предоплаты для быстрого запуска в производство, остаток
                оплачивается по готовности оборудования.
              </li>
              <li>
                <strong>Гарантия:</strong> От 24 до 36 месяцев на всю сборку.
              </li>
              <li>
                <strong>Сервисный центр:</strong> Бесплатные удалённые
                технические консультации и выезд инженера на объект по запросу.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <FaqVru8504 />
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
