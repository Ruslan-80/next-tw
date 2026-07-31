import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { login, password } = await request.json();

    const envLogin = process.env.USER_CONF_LOGIN;
    const envPassword = process.env.USER_CONF_PASSWORD;

    if (login === envLogin && password === envPassword) {
      const response = NextResponse.json({ success: true });

      // Устанавливаем куку доступа к конфигуратору
      response.cookies.set("conf_auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // Доступ на 7 дней
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Неверный логин или пароль" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
