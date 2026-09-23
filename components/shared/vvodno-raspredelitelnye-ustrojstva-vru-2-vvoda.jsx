"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import useFormSubmit from "hooks/useFormSubmit";
import PopularNaborVru from "@/components/PopularNaborVru";

export function vruTwoInputsTop() {
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
                Щиты ВРУ на 2 ввода
              </h1>
              <p className="text-muted-foreground text-text leading-relaxed">
                <strong>
                  Вводно-распределительные устройства на два ввода (двухфидерные
                  щиты)
                </strong>{" "}
                применяются для обеспечения бесперебойного питания
                электроприемников I и II категорий надежности. Наличие основного
                и резервного источника (от независимых трансформаторных
                подстанций) позволяет оперативно переключать нагрузку при аварии
                на магистрали, исключая длительный простой оборудования здания.
                Коммутация в таких шкафах осуществляется вручную (через
                перекидные рубильники) или автоматически (через блок АВР),
                гарантируя максимальную защиту электрической сети.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
              <Button
                onClick={() => handleButtonClick("Получить консультацию")}
                size="lg"
                // className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-8"
                className="btn-gold text-xl py-8 text-black"
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
                src="/images/categories/vru-all.webp"
                alt="Щит ВРУ в сборе"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 500px"
                priority
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

export function vruTwoInputsBottom() {
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
        {/* Товарная сетка */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Популярные модели ВРУ на 2 ввода
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Комплектация двухфидерных щитов напрямую зависит от номинального
            тока и типа переключения (рубильники или контакторы АВР). Ниже
            представлены популярные модификации из серии ВРУ21L.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-card">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Артикул
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Описание и Характеристики комплектации
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Наименование типового объекта
                  </th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-border">
                    Цена
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-8505-4avr-630А-1700x800x450
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-8505-4АВР-630 Вводно-распределительное устройство 630А
                    IP31, 2 ввода, с АВР, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">
                    Многоквартирные жилые дома высотой более 5 этажей
                  </td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap text-destructive">
                    от 85 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-8504-4avr-125А-1600x450x450
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-8504-4АВР-125 Вводно-распределительное устройство 125А
                    IP65, 2 ввода, с АВР, со счётчиком, УХЛ1
                  </td>
                  <td className="py-3 px-4">
                    Крупные торгово-развлекательные центры (ТРЦ)
                  </td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap text-destructive">
                    от 85 000 руб.
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
                  <td className="py-3 px-4">
                    Больницы и медицинские учреждения
                  </td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap text-destructive">
                    от 85 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru21L-(500+500)-201-630А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ21L-(500+500)-201 Вводно-распределительное устройство 630
                    А, IP31, 2 ввода, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">Центры обработки данных (ЦОД)</td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap text-destructive">
                    от 135 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-1-16-40a-800А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-16-40А Вводно-распределительное устройство 800 А, IP66,
                    2 ввода, со счётчиком, УХЛ4
                  </td>
                  <td className="py-3 px-4">
                    Промышленные предприятия непрерывного цикла
                  </td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap text-destructive">
                    от 60 000 руб.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic">
            * Итоговая стоимость ВРУ зависит от выбранной схемы, бренда
            комплектующих, сечения ошиновки и дополнительных опций (АВР, учёт и
            т.д.).
          </p>
        </section>

        {/* Добавочная ценность */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Категории надежности и схемные решения (АВР vs Ручной реверс)
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Для ответственных объектов вводно-распределительное устройство на
            два ввода — это система, жестко регламентируемая ПУЭ. В отличие от
            типовых щитов для частных домов (с одним кабелем), питание больниц,
            ЦОДов, промышленных цехов и крупных ТЦ обязывает иметь два
            независимых источника.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Проектная схема электроснабжения на два ввода реализуется по одному
            из двух сценариев:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              <strong>Для объектов II категории надёжности:</strong> Допускается
              перерыв в электроснабжении на время, необходимое дежурному
              персоналу для переключения. Типовая схема в этом случае
              подразумевает, что один ввод рабочий, а второй – в холодном
              резерве. На вводе устанавливаются переключатели (рубильники) QS1 и
              QS2 для ручной коммутации.
            </li>
            <li>
              <strong>Для объектов I категории надёжности:</strong> Перерыв
              питания недопустим. В этом случае устройство комплектуется
              панелями с автоматическим вводом резерва (АВР). В схему
              интегрируются вводные автоматические выключатели QF1, QF2,
              контакторы KM1, KM2 и логический модуль АВР, который сам фиксирует
              пропадание фазы и мгновенно перекидывает нагрузку на резервную
              магистраль.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Обе конфигурации штатно комплектуются трансформаторами тока ТА1…ТА6,
            узлами коммерческого учета PI1, PI2 и линейными автоматами отходящих
            линий SF1…SFn.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-accent bg-card space-y-2">
              <h3 className="text-lg font-bold">
                Чем отличается комплектация щита на 2 ввода для первой и второй
                категории надёжности?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Для второй категории надёжности переключение вводов
                осуществляется в ручном режиме, поэтому на вводе устанавливаются
                обычные переключатели (рубильники). Для первой категории
                обязательна установка блока АВР с магнитными пускателями
                (контакторами) или моторными приводами, которые переключают
                вводы автоматически без участия человека.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-accent bg-card space-y-2">
              <h3 className="text-lg font-bold">
                Можно ли организовать коммерческий учёт на обоих вводах?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Да. Классическая схема двухфидерного ВРУ включает установку
                вводных автоматических выключателей и измерительных
                трансформаторов тока (ТА1...ТА6) на каждом из независимых
                вводов, к которым подключаются два отдельных счётчика
                электроэнергии (PI1 и PI2).
              </p>
            </div>
          </div>
        </section>

        {/* CTA / Запросить расчёт */}
        <section
          id="calculate"
          className="rounded-2xl p-6 border border-accent bg-card space-y-4"
        >
          <h2 className="text-2xl font-bold">
            Запросить расчёт стоимости ВРУ на 2 ввода
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Оставьте заявку или позвоните — мы подберём оптимальную конфигурацию
            под ваш проект.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-background font-bold"
            >
              <a href="tel:+74993901467">Позвонить</a>
            </Button>
            <Button
              onClick={() => handleButtonClick("Оставить заявку")}
              size="lg"
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-background font-bold"
            >
              Оставить заявку
            </Button>
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
