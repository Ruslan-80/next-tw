import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Путь к вашему экземпляру Prisma

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Введите корректный email адрес" },
        { status: 400 },
      );
    }

    // Сохраняем подписку в таблицу очереди сообщений
    await prisma.messageQueue.create({
      data: {
        contact: email, // Используем email как контакт
        data: {
          type: "subscription", // Помечаем тип записи, чтобы воркер понимал, как её форматировать
          email: email,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Подписка успешно оформлена",
    });
  } catch (error) {
    console.error("Subscription Error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
