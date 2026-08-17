"use client";

import Image from "next/image";

export default function WorksGallery({ slug }) {
  // Список картинок для vru
  const vruImages = [
    "/images/after/before-after-1.jpg",
    "/images/after/before-after-2.jpg",
    "/images/after/before-after-3.jpg",
    "/images/after/before-after-4.jpg",
    "/images/after/before-after-5.jpg",
    "/images/after/before-after-6.jpg",
  ];

  // Список картинок для se
  const seImages = [
    "/images/after/after-1.jpg",
    "/images/after/after-2.jpg",
    "/images/after/after-3.jpg",
    "/images/after/after-4.jpg",
    "/images/after/after-5.jpg",
    "/images/after/after-6.jpg",
  ];

  // Дефолтный список (если slug не содержит ни vru, ни se)
  const defaultImages = [
    "/images/after/after-1.jpg",
    "/images/after/after-2.jpg",
    "/images/after/after-3.jpg",
    "/images/after/after-4.jpg",
    "/images/after/after-5.jpg",
    "/images/after/after-6.jpg",
  ];

  // Нормализуем slug (приводим к нижнему регистру и проверяем на undefined)
  const normalizedSlug = slug?.toLowerCase() || "";

  // Выбираем список картинок
  let images = defaultImages;
  if (normalizedSlug.includes("vru")) {
    images = vruImages;
  } else if (normalizedSlug.includes("se")) {
    images = seImages;
  }

  return (
    <section className="rounded-xl">
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-xl lg:text-3xl font-bold mb-10 text-center text-text">
          Выполненные работы
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={src}
                alt={`Выполненная работа ${idx + 1}`}
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
