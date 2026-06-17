import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // ⛔️ 1. ВСЕГДА пропускаем служебные пути Next.js
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/__nextjs_font") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/icon.svg") ||
    pathname.startsWith("/icon.ico")
  ) {
    return NextResponse.next();
  }

  // ⛔️ 2. Ограничиваем область действия
  const shouldHandle =
    pathname.startsWith("/api/cart") ||
    pathname === "/cart" ||
    pathname.startsWith("/catalog/");

  if (!shouldHandle) {
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

export const config = {
  matcher: ["/api/cart/:path*", "/cart", "/catalog/:path*"],
};
