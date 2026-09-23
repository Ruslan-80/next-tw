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

export function VruPaneliVpTop() {
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
                Вводные панели ВРУ (ВП)
              </h1>
              <p className="text-muted-foreground text-text leading-relaxed">
                <strong>Вводные панели ВРУ</strong> (маркировка 11–19) служат
                главным принимающим узлом системы электроснабжения зданий и
                промышленных объектов. Они принимают питание напрямую от
                трансформаторной подстанции, обеспечивают коммерческий учёт
                электроэнергии и защищают сборные шины последующих
                распределительных щитов.
              </p>
              <p className="text-muted-foreground text-text leading-relaxed">
                Конструкция предусматривает степень защиты IP00 со стороны дна
                для удобной разделки и ввода мощных кабелей сечением до 240 мм².
              </p>
            </div>

            <div className="flex flex-wrap gap-4 px-2">
              <Button
                onClick={() => handleButtonClick("Заказать бесплатный расчёт")}
                size="lg"
                className="btn-gold text-xl py-8 text-black"
              >
                Заказать бесплатный расчёт
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
            <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] aspect-square rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl flex justify-center mx-auto">
              <Image
                src="/images/categories/vru-all.webp"
                alt="Вводные панели ВРУ (ВП)"
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

export function VruPaneliVpBottom() {
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
        {/* SECTION: ПОПУЛЯРНЫЕ МОДЕЛИ ВВОДНЫХ ПАНЕЛЕЙ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Популярные модели вводных панелей
          </h2>
          <p className="text-muted-foreground mb-6">
            Сборка осуществляется в строгом соответствии с ПУЭ-7. Мы гарантируем
            точный подбор сечения сборных шин для предотвращения деформаций при
            ударных токах короткого замыкания.
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
                    vru-1-15-00k-40А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-15-00К Вводно-распределительное устройство (In: 40 А,
                    IP65, 2 ввода, со счетч., с АВР, УХЛ4)
                  </td>
                  <td className="py-3 px-4">
                    Объекты I категории надёжности (АВР)
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    85 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-1-11-00-32А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-11-00 Вводно-распределительное устройство (In: 32 А,
                    IP31, 1 ввод, со счётчиком, УХЛ4)
                  </td>
                  <td className="py-3 px-4">Малые электроустановки, офисы</td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    50 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-1-17-00-200А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ1-17-00 Вводно-распределительное устройство (In: 200 А,
                    IP55, 1 ввод, со счётчиком, УХЛ4)
                  </td>
                  <td className="py-3 px-4">
                    Промышленные помещения, паркинги
                  </td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    50 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition border-b border-border">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-3-11-250А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-3-11 Вводно-распределительное устройство (In: 250 А,
                    IP31, 1 ввод, УХЛ4)
                  </td>
                  <td className="py-3 px-4">Жилые дома (МКД), бизнес-центры</td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    75 000 руб.
                  </td>
                </tr>
                <tr className="hover:bg-accent/10 transition">
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    vru-3-10-250А
                  </td>
                  <td className="py-3 px-4">
                    ВРУ-3-10 Вводно-распределительное устройство (In: 250 А,
                    IP31, 2 ввода, со счётчиком, УХЛ4)
                  </td>
                  <td className="py-3 px-4">Объекты II категории надёжности</td>
                  <td className="py-3 px-4 font-semibold text-destructive whitespace-nowrap">
                    85 000 руб.
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

        {/* SECTION: СОВМЕСТИМОСТЬ СХЕМ И МОДИФИКАЦИЙ ВВОДНЫХ ПАНЕЛЕЙ */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Совместимость схем и модификаций вводных панелей
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Оборудование 11–19 серий проектируется под индивидуальные схемы
            электроснабжения. Модификации 100–103 подходят для многопанельных
            сборок по схеме 1 (с учётом/без учёта, ширина 400–600 мм).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Однопанельные и шкафные модификации 304–319 поддерживают схемы ввода
            2, 4, 5 и 7, а варианты 400–403 оптимизированы под токи до 125 А.
          </p>
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
                  Какую нагрузку выдерживает ошиновка вводной панели?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Сборная ошиновка, применяемая в наших вводных панелях,
                  обладает высокой механической прочностью и выдерживает без
                  деформаций и повреждений ударный ток короткого замыкания не
                  менее 10 кА.
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
              Запросить расчёт стоимости вводной панели
            </h2>
            <p className="text-muted-foreground">
              Оставьте заявку или позвоните — мы подберём оптимальную
              конфигурацию под ваш проект.
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
