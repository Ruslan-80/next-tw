import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { login, password } = await request.json();

    const envLogin = process.env.ADMIN_LOGIN;
    const envPassword = process.env.ADMIN_PASSWORD;

    if (login === envLogin && password === envPassword) {
      const response = NextResponse.json({ success: true });

      // Устанавливаем защищенную Cookie на 1 день
      response.cookies.set("admin_auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 часа
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
