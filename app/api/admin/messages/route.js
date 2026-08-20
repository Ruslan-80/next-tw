import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const messages = await prisma.messageQueue.findMany({
      orderBy: { createdAt: "desc" }, // Сначала самые новые
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при получении данных" },
      { status: 500 },
    );
  }
}
