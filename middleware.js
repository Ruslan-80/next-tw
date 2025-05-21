// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
    const res = NextResponse.next();
    const token = req.cookies.get("cartToken");

    if (!token) {
        // Генерируем новый токен для корзины
        const newToken = crypto.randomUUID();
        // Устанавливаем HTTP-only, secure куку на год
        res.cookies.set("cartToken", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 365, // 1 год
            path: "/",
        });
    }

    return res;
}

export const config = {
    matcher: ["/api/cart/:path*", "/cart", "/catalog/:path*"],
};
