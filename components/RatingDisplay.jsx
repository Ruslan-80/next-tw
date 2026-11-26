import React from "react";
import { Star } from "lucide-react";

export default function RatingDisplay({ ratingValue = 0, ratingCount = 0 }) {
  const MAX_STARS = 5;

  const filledStars = Math.round(ratingValue);
  const ratingText = `${ratingValue.toFixed(1)} (${ratingCount} отзывов)`;

  return (
    <div className="flex items-center text-text p-4 rounded-xl mb-6">
      <div className="flex mr-3">
        {[...Array(MAX_STARS)].map((_, i) => (
          <div key={i} className="w-5 h-5">
            {i < filledStars ? (
              <Star
                className="text-yellow-400 fill-current"
                fill="currentColor"
                size={16}
              />
            ) : (
              <Star className="text-gray-300 dark:text-gray-700" size={16} />
            )}
          </div>
        ))}
      </div>

      <span className="font-medium">{ratingText}</span>
    </div>
  );
}
