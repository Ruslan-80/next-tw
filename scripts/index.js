import "dotenv/config";
import cron from "node-cron";
import { processQueue } from "./queueProcessor.js"; // Указан точный путь и расширение .js

console.log("🚀 Воркер очереди успешно запущен...");

// Запускаем проверку очереди каждые 30 секунд
cron.schedule("*/30 * * * * *", async () => {
  console.log("⏱️  Проверка очереди сообщений...");
  await processQueue();
});
