"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";

export function vru21Top() {
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
              <h1 className="text-2xl lg:text-5xl font-bold text-balance leading-tight">
                Щиты ВРУ-21: купить в Москве с доставкой (сборка по ГОСТ)
              </h1>
              <p className="text-muted-foreground text-balance leading-relaxed">
                <strong>Вводно-распределительные устройства ВРУ-21</strong> —
                это низковольтное комплектное устройство (НКУ), предназначенное
                для приёма, распределения и учёта электроэнергии в трёхфазных
                сетях переменного тока напряжением 380/220В частотой 50 Гц с
                глухозаземлённой нейтралью. Напольные электрощитовые панели со
                степенью защиты IP31 и климатическим исполнением УХЛ4 защищают
                отходящие линии от перегрузок и коротких замыканий. В компании
                Еlectroshit-pro можно купить готовые щиты ВРУ-21 на токи от 125А
                до 630А или заказать индивидуальную сборку по однолинейной схеме
                с доставкой по Москве и МО.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
              <Button
                onClick={() => handleButtonClick("Получить бесплатный расчёт")}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-8"
              >
                Получить бесплатный расчёт
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
                src="/images/categories/vvodno-raspredelitelnye-ustrojstva-vru.webp"
                alt="Щиты ВРУ-21"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
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

export function vru21Bottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="py-8 font-sans text-text">
      {/* Блок 2: Триггеры доверия */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-xl bg-card shadow-sm border-l-4 border-l-blue-600">
            <strong className="text-xl block mb-2">🛡️ Документы</strong>
            <p className="text-base text-muted-foreground">
              Выдаем Паспорт изделия, Сертификат ТР ТС 004/2011 и схему для
              Ростехнадзора.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card shadow-sm border-l-4 border-l-blue-600">
            <strong className="text-xl block mb-2">⏱️ Сроки</strong>
            <p className="text-base text-muted-foreground">
              Собственное производство в Москве — сборка от 2 до 5 рабочих дней.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card shadow-sm border-l-4 border-l-blue-600">
            <strong className="text-xl block mb-2">⚙️ Комплектующие</strong>
            <p className="text-base text-muted-foreground">
              Эконом (IEK), Стандарт (КЭАЗ), Премиум (Systeme Electric, ABB).
            </p>
          </div>
        </div>
      </section>

      {/* Блок 3: Каталог панелей ВРУ-21 */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6 border-l-8 border-accent pl-4">
          Каталог панелей ВРУ-21
        </h2>
        <div className="overflow-x-auto rounded-xl border border-text shadow-lg">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="text-left">
              <tr>
                {[
                  "Артикул",
                  "Наименование",
                  "Ном. ток",
                  "Напряжение",
                  "IP",
                  "Вводы",
                  "Цена, руб.",
                ].map((h) => (
                  <th key={h} className="p-4 border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ21L-125-1</td>
                <td className="p-4">ВРУ-21 с узлом учёта, 1 ввод</td>
                <td className="p-4">125 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31</td>
                <td className="p-4">1</td>
                <td className="p-4 font-bold text-red-700">55 000</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ21L-250-1</td>
                <td className="p-4">ВРУ-21 без учёта, 1 ввод</td>
                <td className="p-4">250 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31</td>
                <td className="p-4">1</td>
                <td className="p-4 font-bold text-red-700">60 000</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ21L-400-1</td>
                <td className="p-4">ВРУ-21 распределительное, 1 ввод</td>
                <td className="p-4">400 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31</td>
                <td className="p-4">1</td>
                <td className="p-4 font-bold text-red-700">75 000</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ21L-630-1</td>
                <td className="p-4">ВРУ-21 промышленное, 1 ввод</td>
                <td className="p-4">630 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31</td>
                <td className="p-4">1</td>
                <td className="p-4 font-bold text-red-700">90 000</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ21L-250-2АВР</td>
                <td className="p-4">ВРУ-21 с АВР и учётом, 2 ввода</td>
                <td className="p-4">250 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31</td>
                <td className="p-4">2</td>
                <td className="p-4 font-bold text-red-700">110 000</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ21L-400-2АВР</td>
                <td className="p-4">ВРУ-21 с АВР и учётом, 2 ввода</td>
                <td className="p-4">400 А</td>
                <td className="p-4">380/220 В</td>
                <td className="p-4">IP31</td>
                <td className="p-4">2</td>
                <td className="p-4 font-bold text-red-700">130 000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="italic text-slate-600 mt-2 text-base lg:text-lg">
          — Итоговая стоимость зависит от брендов автоматики, габаритов и
          необходимости интеграции приборов учёта.
        </p>
      </section>

      {/* Блок 4: Кастомизация */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl p-8 rounded-xl mb-12 border border-amber-200">
        <h2 className="text-2xl text-orange-800 font-bold mb-4">
          Сборка ВРУ-21 под заказ по индивидуальным схемам
        </h2>
        <ol className="list-decimal pl-6 space-y-2 mb-6 text-base lg:text-xl">
          <li>Аудит вашей схемы.</li>
          <li>Подбор аналогов комплектующих под бюджет.</li>
          <li>Утверждение КП и сборка.</li>
          <li>Заводские испытания и отгрузка.</li>
        </ol>

        <div className="flex gap-4 flex-wrap">
          <Button
            onClick={() => handleButtonClick("Прикрепить схему для расчёта")}
            className="bg-orange-600 hover:bg-orange-700 text-foreground"
          >
            Прикрепить схему для расчёта
          </Button>
        </div>
      </section>

      {/* Блок 5: Руководство по выбору ВРУ-21 */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6">
          Руководство по выбору ВРУ-21
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="border p-6 rounded-xl bg-card shadow-sm">
            <strong className="text-lg block mb-2">
              Шаг 1. Номинальный ток
            </strong>
            <p className="text-sm text-muted-foreground">
              Определите суммарную мощность. Для 125–630А подходят разные
              модификации ВРУ-21.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card shadow-sm">
            <strong className="text-lg block mb-2">Шаг 2. Вводы и АВР</strong>
            <p className="text-sm text-muted-foreground">
              1 ввод — III категория электроснабжения, 2 ввода с автоматическим
              вводом резерва (АВР) — I/II категории надёжности.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card shadow-sm">
            <strong className="text-lg block mb-2">
              Шаг 3. Степень защиты
            </strong>
            <p className="text-sm text-muted-foreground">
              IP31 для щитовых помещений, IP54 для цехов с пылью/влагой.
              Возможно исполнение с металлическим корпусом и порошковой
              окраской.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card shadow-sm">
            <strong className="text-lg block mb-2">
              Шаг 4. Бренды автоматики
            </strong>
            <p className="text-sm text-muted-foreground">
              Эконом, Стандарт или Премиум — влияет на смету и надёжность.
            </p>
          </div>
        </div>

        <div>
          <Button
            asChild
            variant="outline"
            className="border-orange-600 text-orange-700"
          >
            <a
              href="/docs/oprosnyj-list-vru.docx"
              target="_blank"
              rel="noopener noreferrer"
            >
              Скачать опросный лист
            </a>
          </Button>
        </div>
      </section>

      {/* Блок 6: Почему выбирают нас */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6">Почему выбирают нас</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border p-6 rounded-xl bg-card">
            <h3 className="font-bold text-lg lg:text-xl mb-4 text-accent">
              Инженерная проработка и соответствие нормам
            </h3>
            <div className="space-y-4 text-base lg:text-lg">
              <p>
                <strong>Соответствие ГОСТ и ПУЭ как база проекта.</strong> ВРУ
                проектируются и собираются в соответствии с ГОСТ Р 51732-2013,
                ГОСТ 32396-2013/2021 и требованиями ПУЭ (7-е изд.). Это
                подтверждается паспортами изделий и комплектом документации на
                каждую поставку.
              </p>
              <p>
                <strong>Расчёт токов и сборных шин.</strong> Подбираем
                номинальные токи вводных и распределительных цепей (In), сечения
                медных/алюминиевых шин и проверяем их на кратковременно
                выдерживаемый ток КЗ (Icc). В результате — минимизация перегрева
                и запас по термической стойкости.
              </p>
              <p>
                <strong>Селективность защитных аппаратов.</strong> Согласовываем
                характеристики вводного автомата/выключателя и отходящих
                групповых аппаратов. Это позволяет локализовать аварию на уровне
                одного фидера без отключения всего ВРУ.
              </p>
            </div>
          </div>

          <div className="border p-6 rounded-xl bg-card">
            <h3 className="font-bold text-lg lg:text-xl mb-4 text-accent">
              Документы, гарантия и сопровождение
            </h3>
            <div className="space-y-4 text-base lg:text-lg">
              <p>
                <strong>Сертификаты на комплектующие.</strong> Предоставляем
                сертификаты и документы на применяемую аппаратуру и материалы по
                запросу. Это важно для прохождения приёмки и соответствия
                требованиям заказчика/сети.
              </p>
              <p>
                <strong>Маркировка по проекту.</strong> Обозначения аппаратов и
                цепей приводим в соответствие с однолинейной схемой и кабельным
                журналом. Монтажники и эксплуатирующая организация сразу видят
                назначение каждого автомата и фидера.
              </p>
              <p>
                <strong>Гарантия и условия сервиса.</strong> Фиксируем
                гарантийные обязательства на ВРУ и аппаратуру, а также условия
                сервисного сопровождения в договоре. При возникновении вопросов
                — оперативно подключаем инженеров для разбора ситуации.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Блок 7: Часто задаваемые вопросы */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6">
          Часто задаваемые вопросы
        </h2>
        <div className="space-y-4">
          <div className="border p-6 rounded-xl bg-card">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Какие сроки сборки и доставки ВРУ-21 по Москве?
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground">
              Собственное производство позволяет собирать типовые щиты ВРУ-21 за
              2–5 рабочих дней. Доставка по Москве и Московской области
              осуществляется собственным транспортом.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Можно ли заказать ВРУ-21 по индивидуальной однолинейной схеме?
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground">
              Да, мы специализируемся на индивидуальной сборке. Отправьте вашу
              однолинейную схему или ТЗ через форму на сайте — инженеры
              подготовят КП в течение дня.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Какие документы предоставляются при отгрузке щита?
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground">
              При отгрузке вы получаете паспорт изделия, однолинейную схему,
              сертификат соответствия ТР ТС 004/2011, протоколы испытаний ОТК и
              товарную накладную.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              На базе каких комплектующих осуществляется сборка?
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground">
              Мы предлагаем три уровня комплектации: Эконом (IEK), Стандарт
              (КЭАЗ, DEKraft) и Премиум (Systeme Electric, ABB, Schneider
              Electric). Выбор бренда влияет на итоговую смету.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Как формируется цена и возможна ли отсрочка?
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground">
              Цена зависит от номинального тока, количества вводов, наличия АВР
              и выбранных комплектующих. Для постоянных B2B-клиентов доступна
              частичная предоплата и отсрочка платежа по договорённости.
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

export default vru21Bottom;
