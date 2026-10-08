"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewsTab({ reviews = [], productId, onReviewAdded }) {
  const [formData, setFormData] = useState({
    authorName: "",
    rating: 5,
    comment: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.authorName.trim() || !formData.comment.trim()) {
      setErrorMessage("Пожалуйста, заполните имя и текст отзыва.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productId,
        }),
      });

      if (!res.ok) {
        throw new Error("Ошибка при отправке отзыва");
      }

      setSubmitSuccess(true);
      setFormData({ authorName: "", rating: 5, comment: "" });

      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (err) {
      setErrorMessage(
        err.message || "Не удалось отправить отзыв. Попробуйте позже.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 text-text">
      {/* Список отзывов */}
      <div className="space-y-4">
        <h3 className="text-text text-xl font-bold mb-4">
          Отзывы покупателей ({reviews.length})
        </h3>

        {reviews.length === 0 ? (
          <p className="text-textMuted py-4">
            У этого товара пока нет отзывов. Будьте первыми, кто оставит отзыв!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {reviews.map((review, index) => {
              const formattedDate = review.createdAt
                ? new Date(review.createdAt).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "Давнее время";

              const formattedReplyDate = review.adminReplyAt
                ? new Date(review.adminReplyAt).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : null;

              // adminImages может прийти как массив, JSON-строка или null
              let adminImages = [];
              if (Array.isArray(review.adminImages)) {
                adminImages = review.adminImages;
              } else if (typeof review.adminImages === "string") {
                try {
                  const parsed = JSON.parse(review.adminImages);
                  if (Array.isArray(parsed)) adminImages = parsed;
                } catch {
                  // ignore
                }
              }

              const hasAdminReply = Boolean(
                review.adminReply && review.adminReply.trim(),
              );

              return (
                <div
                  key={review.id || index}
                  className="card-glass p-5 rounded-2xl border border-border bg-card space-y-3"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-base">
                        {(review.userName?.[0] || "А").toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-base">
                          {review.userName || "Аноним"}
                        </div>
                        <div className="text-xs text-textMuted">
                          {formattedDate}
                        </div>
                      </div>
                    </div>

                    {/* Звезды рейтинга */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= (review.rating || 5)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-text/90 whitespace-pre-line">
                    {review.text}
                  </p>

                  {hasAdminReply && (
                    <div className="mt-3 ml-4 pl-4 border-l-2 border-accent/50 bg-accent/5 rounded-r-xl py-3 pr-3 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-accent uppercase tracking-wide">
                          Ответ магазина
                        </span>
                        {formattedReplyDate && (
                          <span className="text-xs text-textMuted">
                            · {formattedReplyDate}
                          </span>
                        )}
                      </div>

                      <p className="text-sm leading-relaxed text-text/90 whitespace-pre-line">
                        {review.adminReply}
                      </p>

                      {adminImages.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {adminImages.map((src, i) => (
                            <a
                              key={i}
                              href={src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <img
                                src={src}
                                alt={`Ответ магазина ${i + 1}`}
                                className="w-20 h-20 object-cover rounded-lg border border-border hover:opacity-80 transition"
                              />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Форма добавления отзыва */}
      <div className="card-glass p-6 rounded-2xl border border-border bg-card">
        <h4 className="text-lg font-bold mb-4">Оставить отзыв</h4>

        {submitSuccess && (
          <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
            Спасибо! Ваш отзыв успешно отправлен и появится после проверки.
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Ваша оценка
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: star }))
                  }
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || formData.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ваше имя</label>
            <input
              type="text"
              required
              value={formData.authorName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, authorName: e.target.value }))
              }
              placeholder="Иван И."
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Отзыв</label>
            <textarea
              required
              rows={4}
              value={formData.comment}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, comment: e.target.value }))
              }
              placeholder="Расскажите о качестве товара и сроках доставки..."
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-accent focus:outline-none text-sm resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold py-3 px-6 rounded-xl font-bold text-sm disabled:opacity-50 transition-all"
          >
            {isSubmitting ? "Отправка..." : "Оставить отзыв"}
          </button>
        </form>
      </div>
    </div>
  );
}
