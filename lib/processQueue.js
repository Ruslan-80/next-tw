import axios from "axios";
import { prisma } from "@/lib/prisma";

export async function processQueue() {
  // Находим все необработанные записи
  const queue = await prisma.messageQueue.findMany({ where: { status: "pending" } });

  for (const item of queue) {
    let tgOk = false;
    let mailOk = false;

    // 1. Попытка Telegram
    try {
      await axios.post(`https://api.telegram.org/...`, { ... });
      tgOk = true;
    } catch (e) { /* Логируем ошибку */ }

    // 2. Попытка Mail (используйте Resend или исправленный nodemailer)
    try {
      await sendEmail(item.data); 
      mailOk = true;
    } catch (e) { /* Логируем ошибку */ }

    // Обновляем статус в БД
    if (tgOk && mailOk) {
      await prisma.messageQueue.update({ 
        where: { id: item.id }, 
        data: { status: "sent" } 
      });
    } else {
      await prisma.messageQueue.update({ 
        where: { id: item.id }, 
        data: { status: "failed", error: "Частичная или полная ошибка отправки" } 
      });
    }
  }
}