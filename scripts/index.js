import "dotenv/config";
import cron from "node-cron";
import { processQueue } from "./queueProcessor.js";
import { processEmailQueue } from "./emailQueueProcessor.js"; // 1. Импортируем новый процессор

console.log("🚀 Воркер очереди (Telegram + Email) успешно запущен...");

// Запускаем проверку каждые 5 минут (согласно cron-расписанию "*/5 * * * *")
cron.schedule("*/15 * * * *", async () => {
  console.log("⏱️  Проверка очередей...");

  // Выполняем параллельно
  await Promise.allSettled([processQueue(), processEmailQueue()]);
});
