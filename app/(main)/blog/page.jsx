import { Breadcrumb } from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Статья о щите этажном ЩЭ | ЭЛЕКТРОЩИТ-ПРО",
  description: "Статья о щите этажном ЩЭ",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Blog() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 prose prose-lg prose-blue">
      <section className="bg-gray-50 rounded-xl shadow p-6 md:p-10 flex flex-col md:flex-row gap-8 max-w-5xl mx-auto my-12">
        {/* Левая часть: текст и соцсети */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Дата и автор */}
          <div>
            <div className="text-gray-400 text-sm">
              24 ноября 2024 &nbsp; &mdash; &nbsp; Шамиль Дашаыпылов
            </div>
            <h1 className="text-4xl font-bold mt-4 mb-6 leading-tight">
              TCL представила первый в мире 4K-монитор с технологией IJP OLED
            </h1>
          </div>
          {/* Социальные иконки */}
          <div className="mt-8">
            <span className="text-gray-500 mr-2">Поделиться:</span>
            <div className="inline-flex gap-2 align-middle">
              <span className="w-8 h-8 rounded-full bg-black inline-block" />
              <span className="w-8 h-8 rounded-full bg-black inline-block" />
              <span className="w-8 h-8 rounded-full bg-black inline-block" />
              <span className="w-8 h-8 rounded-full bg-black inline-block" />
              <span className="w-8 h-8 rounded-full bg-black inline-block" />
            </div>
          </div>
        </div>
        {/* Правая часть: изображение */}
        <div className="flex-1 flex items-center">
          <img
            src="/images/categories/SE24L.png"
            alt="TCL 4K IJP OLED Monitor"
            className="rounded-xl shadow-md w-full object-cover"
            style={{ maxHeight: "340px" }}
          />
        </div>
      </section>
      export default BlogPromo;
      <article>
        <h1 className="font-bold text-3xl mb-6">
          TCL представила первый в мире 4K-монитор с технологией IJP OLED
        </h1>
        <p className="mb-4">
          TCL CSOT анонсировала новейший монитор с разрешением 4K и технологией
          IJP OLED, который предлагает высокую яркость, контрастность и цветовой
          охват.
        </p>

        <img
          src="/images/tcl-4k-ijp-oled.jpg"
          alt="TCL 4K IJP OLED Monitor"
          className="w-full rounded-lg mb-6"
        />

        <h2 className="text-2xl font-semibold mb-4">
          Технические характеристики
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Разрешение: 3840×2160 (4K UHD)</li>
          <li>Технология: Inkjet Printed OLED (IJP OLED)</li>
          <li>Яркость: до 350 нит (пиковая)</li>
          <li>Контрастность: 1 000 000:1</li>
          <li>Цветовое покрытие: 99% DCI-P3</li>
          <li>Частота обновления: 120 Гц</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Описание технологии</h2>
        <p className="mb-4">
          Технология IJP OLED использует процесс струйной печати для нанесения
          органических светодиодных материалов, что обеспечивает высокое
          качество изображения, энергоэффективность и длительный срок службы
          дисплея.
        </p>
        <p>
          Такое инновационное производство позволяет создавать гибкие и тонкие
          панели с улучшенными характеристиками по сравнению с традиционными
          OLED.
        </p>
      </article>
    </main>
  );
}
