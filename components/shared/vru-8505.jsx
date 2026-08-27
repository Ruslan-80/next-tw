"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import FaqVru8505 from "@/components/faqVru-8505";

export function vru8505Top() {
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
                Вводно-распределительные устройства ВРУ 8505
              </h1>
              <p className="text-muted-foreground text-balance leading-relaxed">
                <strong>
                  Вводно-распределительные устройства (ВРУ) серии 8505
                </strong>{" "}
                — это низковольтное комплектное устройство (НКУ),
                предназначенное для приема, распределения и коммерческого учета
                электрической энергии напряжением 380/220В трехфазного
                переменного тока частотой 50 Гц. Оборудование обеспечивает
                надежную защиту отходящих линий при перегрузках и коротких
                замыканиях в сетях с глухозаземленной нейтралью, а также
                применяется для нечастых оперативных включений и отключений
                электрических цепей (до шести в час). В Москве распределительные
                панели серии 8505 устанавливают в электрощитовых помещениях
                жилых домов, административных и общественных зданий, а также на
                промышленных объектах.
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
                alt="Вводно-распределительные устройства ВРУ 8505"
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

export function vru8505Bottom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleButtonClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="py-8 font-sans text-text">
      {/* Каталог типовых решений и цены */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6 border-l-8 border-accent pl-4">
          Каталог типовых решений и цены
        </h2>
        <p className="mb-4 text-base lg:text-lg">
          Ниже представлены базовые конфигурации панелей ВРУ 8505. Вы можете
          выбрать устройство по номинальному току, габаритам корпуса и наличию
          автоматического ввода резерва (АВР).
        </p>
        <div className="overflow-x-auto rounded-xl border border-text shadow-lg">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="text-left">
              <tr>
                {[
                  "Маркировка / Модель",
                  "Ном. ток",
                  "Вводы",
                  "Защита (IP)",
                  "Габариты шкафа (ВхШхГ)",
                  "Климатика",
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
                <td className="p-4 font-bold">ВРУ-8505-4ВА-100</td>
                <td className="p-4">100 А</td>
                <td className="p-4">1 ввод</td>
                <td className="p-4">IP31</td>
                <td className="p-4">2000x800x600</td>
                <td className="p-4">УХЛ4</td>
                <td className="p-4 font-bold text-red-700">50 000</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8505-4АВР-100</td>
                <td className="p-4">100 А</td>
                <td className="p-4">2 ввода (АВР)</td>
                <td className="p-4">IP31</td>
                <td className="p-4">2000x800x450</td>
                <td className="p-4">УХЛ4</td>
                <td className="p-4 font-bold text-red-700">85 000</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8505-4ВА-125</td>
                <td className="p-4">125 А</td>
                <td className="p-4">1 ввод</td>
                <td className="p-4">IP31</td>
                <td className="p-4">1800x450x450</td>
                <td className="p-4">УХЛ4</td>
                <td className="p-4 font-bold text-red-700">50 000</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8505-4АВР-250</td>
                <td className="p-4">250 А</td>
                <td className="p-4">2 ввода (АВР)</td>
                <td className="p-4">IP31</td>
                <td className="p-4">2000x800x600</td>
                <td className="p-4">УХЛ4</td>
                <td className="p-4 font-bold text-red-700">85 000</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8505-4ВА-400</td>
                <td className="p-4">400 А</td>
                <td className="p-4">1 ввод</td>
                <td className="p-4">IP65</td>
                <td className="p-4">1800x800x450</td>
                <td className="p-4">УХЛ1</td>
                <td className="p-4 font-bold text-red-700">50 000</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8505-4АВР-630</td>
                <td className="p-4">630 А</td>
                <td className="p-4">2 ввода (АВР)</td>
                <td className="p-4">IP31</td>
                <td className="p-4">1700x800x450</td>
                <td className="p-4">УХЛ4</td>
                <td className="p-4 font-bold text-red-700">85 000</td>
              </tr>
              <tr className="hover:bg-slate-50 border-b">
                <td className="p-4 font-bold">ВРУ-8505-4ВА-630</td>
                <td className="p-4">630 А</td>
                <td className="p-4">1 ввод</td>
                <td className="p-4">IP66</td>
                <td className="p-4">1200x800x450</td>
                <td className="p-4">УХЛ1</td>
                <td className="p-4 font-bold text-red-700">50 000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="italic text-slate-600 mt-2 text-base lg:text-lg">
          Примечание: Цены в интернет-магазине указаны за базовую комплектацию.
          Точная стоимость рассчитывается индивидуально в зависимости от вашей
          однолинейной схемы и выбранной коммутационной аппаратуры.
        </p>
      </section>

      {/* Блок "Не нашли нужную комплектацию ВРУ 8505?" */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl p-8 rounded-xl mb-12 border border-amber-200">
        <h2 className="text-2xl text-orange-800 font-bold mb-4">
          Не нашли нужную комплектацию ВРУ 8505?
        </h2>
        <p className="mb-6">
          Если среди типовых сборок в каталоге нет подходящего варианта,
          отправьте нам вашу <strong>однолинейную схему (ОЛС)</strong> или
          техническое задание — мы соберём ВРУ 8505 точно по вашему проекту с
          полным соблюдением ПУЭ и ГОСТ.
          <br />
          <br />
          Если проекта пока нет, скачайте опросный лист, чтобы наши инженеры
          подобрали оптимальную конфигурацию под ваши требования.
        </p>
        <div className="flex gap-4 flex-wrap">
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
          <Button
            onClick={() => handleButtonClick("Загрузить схему на расчёт")}
            className="bg-orange-600 hover:bg-orange-700 text-foreground"
          >
            Загрузить схему на расчёт
          </Button>
        </div>
      </section>

      {/* Комплектация и технические характеристики оборудования */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6">
          Комплектация и технические характеристики оборудования
        </h2>
        <p className="mb-6 text-base lg:text-xl">
          Мы осуществляем производство и сборку панелей как по типовым альбомам,
          так и по индивидуальным схемам заказчика. Конструкция каждого изделия
          продумана до мелочей для обеспечения безопасности и удобства
          эксплуатации:
        </p>
        <ul className="list-disc pl-6 space-y-4 text-base lg:text-xl">
          <li>
            <strong>Конструкция корпуса:</strong> Металлический цельносварной
            или сборный каркас (шкаф) одностороннего обслуживания.
            Изготавливается из прочной стали толщиной 1.5–2 мм с антикоррозийным
            покрытием.
          </li>
          <li>
            <strong>Электрические параметры:</strong> Номинальное напряжение
            380/220 В. Работа в сетях с системами заземления: TN-C, TN-S,
            TN-C-S. Медная или алюминиевая ошиновка выдерживает высокие
            переходные токи КЗ.
          </li>
          <li>
            <strong>Бренды комплектующих:</strong> Аппаратура подбирается под
            ваш бюджет. Возможна установка бюджетных и средних линеек (IEK, TDM,
            EKF, КЭАЗ), а также премиальной автоматики (ABB, Schneider
            Electric). В состав узлов входят надежные автоматические
            выключатели, рубильники, контакторы и предохранители.
          </li>
          <li>
            <strong>Приборы контроля и учета:</strong> Возможна интеграция
            электронных счетчиков электроэнергии, измерительных трансформаторов
            тока (ТТИ), амперметров и вольтметров. Для испытательных целей
            монтируется переходная коробка. Дополнительно устанавливаются блоки
            управления лестничным и коридорным освещением.
          </li>
        </ul>
      </section>

      {/* Руководство покупателя */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6">
          Руководство покупателя: Как выбрать вводную панель ВРУ 8505
        </h2>
        <p className="mb-6 text-base lg:text-xl">
          Правильный выбор аппаратов гарантирует бесперебойное электроснабжение
          потребителей и успешное прохождение проверок. Обратите внимание на
          следующие шаги:
        </p>
        <ol className="list-decimal pl-6 space-y-4 text-base lg:text-xl">
          <li>
            <strong>Определение мощности:</strong> 100–125 А подходят для
            небольших объектов, 250 А — стандарт для многоквартирных домов,
            400–630 А используются для электросетей крупных административных
            зданий и производств. Рекомендуем закладывать запас мощности в
            15-20%.
          </li>
          <li>
            <strong>Выбор схемы ввода:</strong> Для объектов III категории
            надежности достаточно панели на один ввод. Для I категории
            (противопожарные устройства, лифтовые станции, серверные)
            обязательны многопанельные устройства с АВР. При исчезновении
            напряжения на основной линии переключатель мгновенно переводит
            питание на резервный ввод.
          </li>
          <li>
            <strong>Степень защиты корпуса (IP):</strong> Для сухих отапливаемых
            электрощитовых выбирайте напольный или навесной щит IP31 (исполнение
            УХЛ4). Для сырых помещений или установки на улице требуются боксы с
            повышенной защитой IP65/IP66 (УХЛ1).
          </li>
        </ol>
      </section>

      {/* Условия покупки */}
      <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6">
          Условия покупки, доставка и гарантии качества
        </h2>
        <p className="mb-6 text-base lg:text-xl">
          Приобретение электротехнической продукции в electroshit-pro — это
          работа напрямую с российским заводом-изготовителем. Мы гарантируем
          строгий контроль на каждом этапе производства.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-base lg:text-xl mb-8">
          <li>
            <strong>Документация и стандарты:</strong> Все
            вводно-распределительные устройства собираются в строгом
            соответствии с ГОСТ 32396-2013 и требованиями ПУЭ. Каждое изделие
            сопровождается техническим паспортом, принципиальной схемой и
            копиями сертификатов ТР ТС на комплектующие.
          </li>
          <li>
            <strong>Сроки и логистика:</strong> Изготовление занимает от 3 до 14
            дней. При заказе от 70 000 руб. доставка готовых щитов по Москве и
            Московской области осуществляется бесплатно. Возможна оперативная
            отправка во все регионы России транспортной компанией.
          </li>
          <li>
            <strong>Оплата:</strong> Для постоянных клиентов доступна частичная
            предоплата для запуска в производство, остаток вносится по факту
            готовности оборудования. Предоставляется официальная гарантия сроком
            до 3 лет.
          </li>
        </ul>

        <div>
          <Button
            onClick={() => handleButtonClick("Рассчитать стоимость")}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-background font-bold text-xl py-6"
          >
            Рассчитать стоимость
          </Button>
        </div>
      </section>

      {/* Часто задаваемые вопросы (FAQ) */}
      {/* <section className="container mx-auto py-6 text-xl lg:text-2xl mb-12">
        <h2 className="text-3xl font-semibold mb-6">
          Часто задаваемые вопросы (FAQ)
        </h2>
        <div className="space-y-4">
          <div className="border p-6 rounded-xl bg-card">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Каково главное назначение панели ВРУ 8505?
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground">
              Данные устройства предназначены для организации главного узла
              электроснабжения зданий: они принимают электроэнергию от внешней
              сети, распределяют ее по группам потребителей, ведут коммерческий
              учет и защищают отходящие линии от перегрузок и токов короткого
              замыкания.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Чем отличается ВРУ 8505 с АВР от обычного шкафа?
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground">
              Панели с автоматическим вводом резерва (АВР) имеют два независимых
              силовых ввода. В случае аварийного отключения основной линии,
              автоматика без участия персонала переключает питание на резервную
              сеть, обеспечивая бесперебойную работу оборудования.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Как осуществляется ввод силового кабеля?
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground">
              Стандартный ввод питающих кабелей и вывод проводов к
              распределительным щитам осуществляется через дно каркаса (снизу).
              При разработке индивидуального проекта возможна организация
              верхнего ввода.
            </p>
          </div>
          <div className="border p-6 rounded-xl bg-card">
            <h3 className="font-bold text-lg lg:text-xl mb-2">
              Можно ли заменить аппаратуру в типовой схеме?
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground">
              Да, инженеры компании адаптируют типовые схемы под проектную
              документацию заказчика. Выполняется согласование и замена брендов
              автоматики (например, установка УЗО или модульных автоматов IEK
              вместо более дорогих аналогов) с полным сохранением селективности
              защиты.
            </p>
          </div>
        </div>
      </section> */}

      <FaqVru8505 />

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
export default vru8505Bottom;
