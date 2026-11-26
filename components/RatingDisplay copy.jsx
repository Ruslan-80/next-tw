import React from "react";
import { Star } from "lucide-react"; // Используем популярную библиотеку иконок

/**
 * Компонент для отображения рейтинга и микроразметки AggregateRating.
 * @param {number} ratingValue - Среднее значение рейтинга (например, 4.8)
 * @param {number} ratingCount - Общее количество отзывов (например, 125)
 */
export default function RatingDisplay({ ratingValue = 0, ratingCount = 0 }) {
  const MAX_STARS = 5;

  // Округляем рейтинг для отображения заполненных звёзд
  const filledStars = Math.round(ratingValue);

  // Форматируем текст рейтинга
  const ratingText = `${ratingValue.toFixed(1)} (${ratingCount} отзывов)`;

  return (
    // Контейнер с общей разметкой Product или другой сущности
    <div className="flex items-center text-text p-4 rounded-xl mb-6">
      {/* Блок микроразметки AggregateRating (скрыт, но доступен для поисковиков) 
        Используйте itemProp="aggregateRating" на родительском элементе, который имеет itemType="https://schema.org/Product"
      */}
      <div
        itemProp="aggregateRating"
        itemScope
        itemType="https://schema.org/AggregateRating"
        className="hidden" // Скрываем, так как визуальное представление уже есть
      >
        <meta itemProp="ratingValue" content={ratingValue.toFixed(1)} />
        <meta itemProp="reviewCount" content={ratingCount} />
        <meta itemProp="bestRating" content="5" />
      </div>

      {/* Визуальное отображение звёзд */}
      <div className="flex mr-3">
        {[...Array(MAX_STARS)].map((_, i) => (
          <div key={i} className="w-5 h-5">
            {i < filledStars ? (
              // Заполненная звезда
              <Star
                className="text-yellow-400 fill-current"
                fill="currentColor"
                size={16}
              />
            ) : (
              // Пустая звезда
              <Star className="text-gray-300 dark:text-gray-700" size={16} />
            )}
          </div>
        ))}
      </div>

      {/* Текстовое описание рейтинга */}
      <span className="font-medium">{ratingText}</span>
    </div>
  );
}
