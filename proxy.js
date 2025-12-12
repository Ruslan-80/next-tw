import { NextResponse } from "next/server"; // <-- Важно!

export default async function proxy(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => {
      const parts = c.trim().split("="); // Учитываем пробелы в начале/конце
      return [parts[0], parts[1]];
    })
  );

  let token = cookies.cartToken;

  const responseHeaders = new Headers();

  if (!token) {
    // В Next.js 16/Edge Runtime лучше использовать криптографически безопасный генератор,
    // но если crypto.randomUUID() работает, то это нормально.
    // Если нет, рассмотрите вариант с 'nanoid' или similar.
    token = crypto.randomUUID();

    const cookieString = [
      `cartToken=${token}`,
      "HttpOnly",
      process.env.NODE_ENV === "production" ? "Secure" : "",
      "Path=/",
      "Max-Age=31536000",
      "SameSite=Lax", // Рекомендуется для безопасности
    ]
      .filter(Boolean)
      .join("; ");

    // Добавляем заголовок Set-Cookie
    responseHeaders.append("Set-Cookie", cookieString);
  }

  // 👉 1. Получаем *внутренний* ответ от Next.js-страницы/API
  // Этот метод передает управление Next.js, который генерирует ответ
  const finalResponse = NextResponse.next();

  // 👉 2. Добавляем Set-Cookie (если нужно) к ответу Next.js
  for (const [k, v] of responseHeaders.entries()) {
    finalResponse.headers.append(k, v);
  }

  return finalResponse;
}

export const config = {
  // Ваш матчер выглядит нормально для перехвата нужных путей
  matcher: ["/api/cart/:path*", "/cart", "/catalog/:path*"],
};
