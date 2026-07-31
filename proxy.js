import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // ⛔️ 1. Пропускаем служебные файлы Next.js
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/__nextjs_font") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/icon.svg") ||
    pathname.startsWith("/icon.ico")
  ) {
    return NextResponse.next();
  }

  // 🔒 2. Защита админки (/admin)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const authCookie = request.cookies.get("admin_auth");

    if (!authCookie || authCookie.value !== "true") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 🔒 3. Защита конфигуратора (/conf)
  if (pathname.startsWith("/conf") && !pathname.startsWith("/conf/login")) {
    const confCookie = request.cookies.get("conf_auth");

    if (!confCookie || confCookie.value !== "true") {
      const loginUrl = new URL("/conf/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ⛔️ 4. Логика cartToken для каталога и корзины
  const shouldHandleCart =
    pathname.startsWith("/api/cart") ||
    pathname === "/cart" ||
    pathname.startsWith("/catalog/");

  if (!shouldHandleCart) {
    return NextResponse.next();
  }

  // ---------- cartToken ----------
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => {
        const [k, ...v] = c.split("=");
        return [k, v.join("=")];
      }),
  );

  let token = cookies.cartToken;
  const response = NextResponse.next();

  if (!token) {
    token = crypto.randomUUID();

    response.headers.append(
      "Set-Cookie",
      [
        `cartToken=${token}`,
        "HttpOnly",
        process.env.NODE_ENV === "production" ? "Secure" : "",
        "Path=/",
        "Max-Age=31536000",
        "SameSite=Lax",
      ]
        .filter(Boolean)
        .join("; "),
    );
  }

  return response;
}

// 🎯 Не забудьте добавить /conf/:path* в matcher!
export const config = {
  matcher: [
    "/admin/:path*",
    "/conf/:path*",
    "/api/cart/:path*",
    "/cart",
    "/catalog/:path*",
  ],
};
