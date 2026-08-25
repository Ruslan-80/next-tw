"use client";

import { useEffect, useState } from "react";

export default function AdminUploadsPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Загрузка списка файлов с сервера
  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/uploads");
      const data = await res.json();

      if (data.success) {
        setFiles(data.files);
      } else {
        setError(data.error || "Ошибка загрузки");
      }
    } catch (err) {
      setError("Ошибка сети при получении файлов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Удаление файла
  const handleDelete = async (fileName) => {
    if (!confirm(`Вы действительно хотите удалить файл "${fileName}"?`)) {
      return;
    }

    try {
      const res = await fetch(
        `/api/admin/uploads?fileName=${encodeURIComponent(fileName)}`,
        { method: "DELETE" },
      );
      const data = await res.json();

      if (data.success) {
        // Убираем удаленный файл из состояния
        setFiles((prev) => prev.filter((f) => f.name !== fileName));
      } else {
        alert(data.error || "Не удалось удалить файл");
      }
    } catch (err) {
      alert("Ошибка при запросе на удаление");
    }
  };

  // Вспомогательная функция для форматирования размера файла
  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Проверка, является ли файл изображением
  const isImage = (name) => {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(name);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Загруженные файлы (public/uploads)
        </h1>
        <button
          onClick={fetchFiles}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 rounded-lg text-sm transition-all"
        >
          Обновить
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Загрузка списка файлов...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-500">В папке пока нет файлов.</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs">
              <tr>
                <th className="p-4">Превью / Имя</th>
                <th className="p-4">Размер</th>
                <th className="p-4">Дата загрузки</th>
                <th className="p-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {files.map((file) => (
                <tr
                  key={file.name}
                  className="hover:bg-gray-50 dark:hover:bg-gray-750"
                >
                  <td className="p-4 flex items-center gap-3">
                    {isImage(file.name) ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-12 h-12 object-cover rounded border border-gray-200 dark:border-gray-600"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded text-xs text-gray-500 font-bold">
                        FILE
                      </div>
                    )}
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline truncate max-w-md"
                    >
                      {file.name}
                    </a>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {formatSize(file.size)}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {new Date(file.createdAt).toLocaleString("ru-RU")}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(file.name)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs transition-colors"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
