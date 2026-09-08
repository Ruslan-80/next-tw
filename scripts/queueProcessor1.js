import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import fs from "fs";
import { createRequire } from "module";
import path from "path";

const require = createRequire(import.meta.url);
const { Bot } = require("node-telegram-bot-api");

const prisma = new PrismaClient();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://electroshit-pro.ru";

// Инициализируем бот единоразово вне функции
let bot = null;
if (token) {
  bot = new Bot(token);
}

// in: ["pending", "failed", "sent"],

async function processQueue() {
  if (!token || !chatId) {
    console.error("❌ Не задан TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID в .env");
    return;
  }

  try {
    // Берём неотправленные или упавшие с ошибкой записи
    const pendingMessages = await prisma.messageQueue.findMany({
      where: {
        status: {
          in: ["test"],
        },
      },
      take: 10,
      orderBy: { createdAt: "asc" },
    });

    if (pendingMessages.length === 0) {
      return;
    }

    console.log(`📨 Найдено сообщений в очереди: ${pendingMessages.length}`);

    // Проверяем доступность Telegram API
    const me = await bot.api.getMe();
    console.log(`   ✅ Бот найден: @${me.username || me.first_name}`);

    for (const item of pendingMessages) {
      const data = item.data || {};

      const clientEmail =
        data.email ||
        (item.contact && item.contact.includes("@") ? item.contact : null);

      const productName = data.productName || "Заявка с сайта";
      const clientMessage = data.message || "—";
      const files = Array.isArray(data.files) ? data.files : [];

      try {
        console.log(`✈️ Запись #${item.id}: отправка в Telegram...`);

        // 1. Формируем список ссылок на файлы для текста сообщения
        let fileText = "";
        if (files.length > 0) {
          const links = files.map((f, i) => {
            const fileName = f.originalName || `Файл ${i + 1}`;
            const fileUrl = `${baseUrl}${f.path.startsWith("/") ? "" : "/"}${f.path}`;
            return `• [${fileName}](${fileUrl})`;
          });

          fileText = `\n\n📎 *Прикреплённые файлы:*\n` + links.join("\n");
        }

        // 2. Формируем и отправляем основное текстовое сообщение
        const tgText =
          `📌 *Новая заявка с сайта*\n\n` +
          `📦 *Товар:* ${productName}\n` +
          `📞 *Контакт:* ${item.contact}\n` +
          `✉️ *Email:* ${clientEmail || "Не указан"}\n\n` +
          `📝 *Сообщение:*\n${clientMessage}` +
          fileText;

        const result = await bot.api.sendMessage({
          chat_id: chatId,
          text: tgText,
          parse_mode: "Markdown",
        });

        console.log(
          `   ✅ Telegram-текст для записи #${item.id} отправлен (Message ID: ${result.message_id})`,
        );

        // 3. Отправляем оригиналы изображений альбомом или поштучно
        if (files.length > 0) {
          const mediaGroup = [];

          for (const file of files) {
            // Файлы находятся относительно рабочей директории в public/
            const filePath = path.join(process.cwd(), "public", file.path);

            if (fs.existsSync(filePath)) {
              mediaGroup.push({
                type: "photo",
                media: fs.createReadStream(filePath),
              });
            } else {
              console.warn(
                `   ⚠️ Файл не найден на диске для отправки картиной: ${filePath}`,
              );
            }
          }

          if (mediaGroup.length > 0) {
            try {
              // Telegram позволяет прикреплять до 10 файлов в один альбомом (sendMediaGroup)
              await bot.api.sendMediaGroup({
                chat_id: chatId,
                media: mediaGroup.slice(0, 10),
              });
              console.log(
                `   📸 Успешно прикреплено изображений: ${mediaGroup.length} шт.`,
              );
            } catch (imgError) {
              console.error(
                `   ❌ Ошибка при отправке медиагруппы в Telegram:`,
                imgError.message || imgError,
              );
            }
          }
        }

        // 4. Обновляем статус в БД на 'sent'
        await prisma.messageQueue.update({
          where: { id: item.id },
          data: { status: "sent", error: null },
        });

        console.log(`   ✅ Запись #${item.id} → status=sent`);
      } catch (error) {
        console.error(
          `❌ Ошибка при обработке записи #${item.id}:`,
          error.message || error,
        );

        await prisma.messageQueue.update({
          where: { id: item.id },
          data: {
            status: "failed",
            error: error.message || String(error),
          },
        });
      }
    }
  } catch (globalError) {
    console.error(
      "❌ Ошибка работы с базой данных или Telegram API:",
      globalError.message || globalError,
    );
  }
}

export { processQueue };
