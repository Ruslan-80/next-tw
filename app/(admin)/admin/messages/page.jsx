"use client";
import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

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
            {messages.map((m) => (
              <tr key={m.id} className="text-left align-top">
                <td className="border p-2 text-xs break-words">
                  {new Date(m.createdAt).toLocaleString()}
                </td>
                <td className="border p-2 text-sm break-all">{m.contact}</td>
                <td className="border p-2 text-sm break-all whitespace-pre-wrap font-mono">
                  {JSON.stringify(m.data, null, 2)}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
