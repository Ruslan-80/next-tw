// components/Pagination.jsx
import Link from "next/link";
import { Fragment } from "react";

export default function Pagination({ currentPage, totalPages, getPageUrl }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-2 flex-wrap">
      {/* Мобильная версия */}
      <div className="flex w-full justify-between sm:hidden mt-2">
        {currentPage > 1 ? (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="px-3 py-2 text-text rounded hover:text-accent"
          >
            ← Назад
          </Link>
        ) : (
          <span className="px-3 py-2 text-text">← Назад</span>
        )}

        {currentPage < totalPages ? (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="px-3 py-2 text-text rounded hover:text-accent"
          >
            Вперёд →
          </Link>
        ) : (
          <span className="px-3 py-2 text-text">Вперёд →</span>
        )}
      </div>

      {/* Планшет + десктоп */}
      <div className="hidden sm:flex gap-2 flex-wrap py-6">
        {currentPage > 1 && (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="px-3 py-2 btn-gold"
          >
            ←
          </Link>
        )}

        {/* Логика показа страниц */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            if (page === 1 || page === totalPages) return true;
            if (Math.abs(page - currentPage) <= 2) return true;
            return false;
          })
          .map((page, idx, arr) => {
            const prev = arr[idx - 1];

            return (
              <Fragment key={page}>
                {/* Троеточие, если есть пропуск */}
                {prev && page - prev > 1 && (
                  <span className="px-3 py-2 text-text">…</span>
                )}

                <Link
                  href={getPageUrl(page)}
                  className={`px-3 py-2 rounded ${
                    page === currentPage
                      ? "btn-gold"
                      : "text-text hover:text-accent"
                  }`}
                >
                  {page}
                </Link>
              </Fragment>
            );
          })}

        {currentPage < totalPages && (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="px-3 py-2 btn-gold"
          >
            →
          </Link>
        )}
      </div>
    </nav>
  );
}
