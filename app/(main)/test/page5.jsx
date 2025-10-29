// app/(main)/test/page.jsx

import { cookies, headers } from "next/headers";

export default async function TestPage() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Неизвестно";
  // Next.js автоматически проксирует IP-адрес через заголовок 'x-forwarded-for' (или 'x-real-ip')
  const clientIP =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() || "Неизвестно";
  const acceptLanguage =
    headersList.get("accept-language")?.split(",")[0].trim() || "Неизвестно";

  const cookiesStore = await cookies();

  // 2. allCookies - объект для хранения всех куки
  const allCookies = {};

  // *** ИСПРАВЛЕНИЕ: Используем cookiesStore.getAll() для получения массива объектов
  // Этот метод является самым надежным для итерации в последних версиях Next.js.
  const cookieArray = cookiesStore.getAll();

  // Итерируем по массиву объектов куки и сохраняем их как ключ:значение
  for (const cookie of cookieArray) {
    allCookies[cookie.name] = cookie.value;
  }

  // 3. Выводим в лог на сервере (этот лог будет виден в консоли Node.js, где запущен Next.js)
  console.log("--- Server-Side Cookies (Next.js App Router) ---");

  console.log("Client IP (x-forwarded-for):", clientIP);
  console.log("User-Agent (Браузер + ОС):", userAgent);
  console.log("Accept-Language (Язык):", acceptLanguage);

  // Вывод всех куки как объекта
  console.log("Все куки:", allCookies);

  // Пример вывода конкретного куки (например, ID корзины)
  const cartId = cookiesStore.get("cartId")?.value || "Не найден";
  console.log("ID Корзины:", cartId);

  console.log("------------------------------------------------");
  const clientSideNote =
    "Для получения разрешения экрана, языка браузера и т.д. требуется клиентский JavaScript (use client). Эти данные не передаются в заголовках HTTP-запроса.";

  // console.log({
  //   screen: {
  //     width: window.screen.width,
  //     height: window.screen.height,
  //   },
  //   language: navigator.language,
  //   timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   plugins: navigator.plugins,
  //   platform: navigator.platform,
  //   battery: navigator.getBattery ? await navigator.getBattery() : null,
  // });

  // Теперь компонент может использовать эти данные для рендеринга
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f4f8",
        borderRadius: "8px",
        border: "1px solid #cceeff",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h1>Страница Тестирования Данных Запроса (App Router)</h1>
      <p style={{ color: "#0056b3", fontWeight: "bold" }}>
        Данные запроса (IP, User-Agent, Куки) прочитаны на сервере и выведены в
        лог Node.js.
      </p>

      <div
        style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "4px",
          marginTop: "15px",
          borderLeft: "3px solid #007bff",
        }}
      >
        <h3>Данные HTTP Заголовков</h3>
        <p>
          <strong>IP-адрес:</strong> <span>{clientIP}</span>
        </p>
        <p>
          <strong>User-Agent:</strong> <span>{userAgent}</span>
        </p>
        <p>
          <strong>Основной язык:</strong> <span>{acceptLanguage}</span>
        </p>
        <p>
          <strong>Значение куки "cartId":</strong> <span>{cartId}</span>
        </p>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #f0ad4e",
          backgroundColor: "#fcf8e3",
          borderRadius: "4px",
        }}
      >
        <p style={{ fontSize: "0.9em", color: "#8a6d3b" }}>
          **Важное Примечание:** {clientSideNote}
        </p>
      </div>
    </div>
  );
}
