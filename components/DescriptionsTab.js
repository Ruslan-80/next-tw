"use client";

// Импортируем ваш файл данных
import vruData from "@/app/data/vru1.json";

export default function DescriptionsTab({ description, slug }) {
  // 1. Пытаемся найти данные в файле, если slug содержит 'vru'
  let displayDescription = description;

  if (slug && slug.toLowerCase().includes("vru")) {
    const foundItem = vruData.find((item) => item.article === slug);
    if (foundItem && foundItem.description) {
      displayDescription = foundItem.description;
    }
  }

  // 2. Если описания нет ни в пропсах, ни в файле
  if (!displayDescription || displayDescription.length === 0) {
    return (
      <p className="text-center py-4 text-gray-500">
        Пока нет описания этого товара, но мы над этим работаем
      </p>
    );
  }

  return (
    <div className="bg-white shadow text-xs lg:text-base rounded-md p-6">
      <div className="divide-y">
        <div className="py-3 grid">
          <span
            className="text-gray-900 text-sm lg:text-xl text-justify whitespace-pre-line"
            style={{ textIndent: "30px" }} // Tailwind не всегда поддерживает indent-30 из коробки
          >
            {displayDescription}
          </span>
        </div>
      </div>
    </div>
  );
}
