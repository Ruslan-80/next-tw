"use client";

import { useState } from "react";

export default function useFormSubmit() {
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData, buttonId) => {
    if (formData.name) {
      setError("Обнаружен бот, отправка отменена");
      return { success: false, error: "Обнаружен бот" };
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: formData.contact,
          buttonId: buttonId,
        }),
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
