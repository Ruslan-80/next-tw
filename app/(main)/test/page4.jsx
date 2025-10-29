// components/CookieLogger.js (или любой компонент на вашей странице)
"use client";
import React, { useEffect, useState } from "react";

function CookieLogger() {
  const [clientCookies, setClientCookies] = useState("");

  useEffect(() => {
    // 1. Получаем строку куки напрямую из браузера
    const cookiesString = document.cookie;

    // 2. Устанавливаем в состояние для отображения (необязательно)
    setClientCookies(cookiesString);

    // 3. Выводим в лог на клиенте (этот лог будет виден в консоли браузера)
    console.log("--- Client-Side Cookies (Browser Console) ---");

    // document.cookie возвращает куки одной строкой: "key1=value1; key2=value2;..."
    console.log(cookiesString);

    // Если нужно распарсить:
    const parsedCookies = cookiesString.split("; ").reduce((acc, current) => {
      const [key, value] = current.split("=");
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});
    console.log("Parsed Cookies:", parsedCookies);
    console.log("---------------------------------------------");
  }, []);

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}
    >
      <h3>Куки на стороне Клиента (Client-Side)</h3>
      <p>**document.cookie:** {clientCookies || "Куки не найдены."}</p>
      <p>
        <em>Проверьте консоль вашего браузера для полного лога.</em>
      </p>
    </div>
  );
}

export default CookieLogger;
