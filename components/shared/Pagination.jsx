// components/Pagination.jsx
import Link from "next/link";

export default function Pagination({ currentPage, totalPages, getPageUrl }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="hidden lg:flex justify-center space-x-2">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Предыдущая
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={`px-4 py-2 rounded ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Следующая
        </Link>
      )}
    </nav>
  );
}
