"use client";

import { useState } from "react";

export default function useFormSubmit() {
  const [error, setError] = useState(null);

  // Теперь dataToSend — это либо объект FormData, либо обычный объект
  const handleFormSubmit = async (dataToSend, buttonId) => {
    try {
      let body;

      // Если в хук передали объект FormData (из модалки с файлами)
      if (dataToSend instanceof FormData) {
        body = dataToSend;

        // Проверка Honeypot (защита от ботов) для FormData
        if (body.get("name")) {
          setError("Обнаружен бот, отправка отменена");
          return { success: false, error: "Обнаружен бот" };
        }

        // Если передали buttonId, добавляем его в FormData
        if (buttonId) {
          body.append("buttonId", buttonId);
        }
      } else {
        // Запасной вариант: если передали обычный JS-объект
        if (dataToSend.name) {
          setError("Обнаружен бот, отправка отменена");
          return { success: false, error: "Обнаружен бот" };
        }

        body = new FormData();
        Object.entries(dataToSend).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            body.append(key, value);
          }
        });
        if (buttonId) body.append("buttonId", buttonId);
      }

      // ВАЖНО: Не указываем 'Content-Type'! Браузер установит его автоматически.
      const response = await fetch("/api/submit", {
        method: "POST",
        body: body,
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных");
      }

      const result = await response.json();
      console.log("Успешно отправлено:", result);
      setError(null);
      return { success: true, data: result };
    } catch (error) {
      console.error("Ошибка:", error.message);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  return { handleFormSubmit, error };
}
