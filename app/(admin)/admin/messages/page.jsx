"use client";
import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  // Вспомогательная функция форматирования размера файла
  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `(${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]})`;
  };

  return (
    <div className="p-8 text-text max-w-full overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-6">Очередь сообщений и подписок</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-accent table-fixed">
          <thead>
            <tr className="bg-card">
              <th className="border p-2 w-36 text-left">Дата</th>
              <th className="border p-2 w-44 text-left">Контакт</th>
              <th className="border p-2 w-1/2 text-left">Данные</th>
              <th className="border p-2 w-24 text-center">Статус</th>
              <th className="border p-2 w-1/4 text-left">Ошибка</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => {
              // Если data пришла строкой, парсим JSON
              const payload =
                typeof m.data === "string" ? JSON.parse(m.data) : m.data;
              const files = payload?.files || [];

              return (
                <tr key={m.id} className="text-left align-top">
                  <td className="border p-2 text-xs break-words">
                    {new Date(m.createdAt).toLocaleString()}
                  </td>
                  <td className="border p-2 text-sm break-all">{m.contact}</td>

                  {/* Красивое отображение данных и файлов */}
                  <td className="border p-2 text-sm break-all">
                    {payload?.productName && (
                      <div className="font-semibold mb-1 text-blue-600 dark:text-blue-400">
                        Товар: {payload.productName}
                      </div>
                    )}

                    {payload?.message && (
                      <div className="whitespace-pre-wrap mb-3 text-gray-800 dark:text-gray-200">
                        {payload.message}
                      </div>
                    )}

                    {/* Блок со списком прикрепленных файлов */}
                    {files.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">
                          Прикрепленные файлы ({files.length}):
                        </span>
                        <ul className="space-y-1">
                          {files.map((file, idx) => (
                            <li key={idx} className="text-xs">
                              <a
                                href={file.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline inline-flex items-center gap-1 font-medium"
                              >
                                📎 {file.originalName}{" "}
                                <span className="text-gray-400 font-normal">
                                  {formatFileSize(file.size)}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>

                  <td
                    className={`border p-2 text-center text-sm font-bold ${
                      m.status === "sent" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {m.status}
                  </td>
                  <td className="border p-2 text-xs text-red-500 break-words">
                    {m.error || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
