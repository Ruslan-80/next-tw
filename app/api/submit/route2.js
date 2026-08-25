import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ваш экземпляр Prisma

export async function POST(request) {
  try {
    const body = await request.json();
    const { contact, email, message, productName } = body;

    // Валидация
    if (!contact)
      return NextResponse.json({ error: "No contact" }, { status: 400 });

    // Сохраняем в очередь
    await prisma.messageQueue.create({
      data: {
        contact,
        data: { email, message, productName },
      },
    });

    return NextResponse.json({ status: "success", message: "Заявка принята" });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сохранения" }, { status: 500 });
  }
}
