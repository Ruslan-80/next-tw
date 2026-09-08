import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import fs from "fs";
import { createRequire } from "module";
import path from "path";

const require = createRequire(import.meta.url);
// Импортируем Bot и InputFile
const { Bot, InputFile } = require("node-telegram-bot-api");

const prisma = new PrismaClient();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://electroshit-pro.ru";

let bot = null;
if (token) {
  bot = new Bot(token);
}

// Экранирование спецсимволов для Telegram Markdown
function escapeMarkdown(text) {
  if (!text) return "";
  return String(text).replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

async function processQueue() {
  if (!token || !chatId) {
    console.error("❌ Не задан TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID в .env");
    return;
  }

  try {
    const pendingMessages = await prisma.messageQueue.findMany({
      where: {
        status: {
          in: ["pending", "failed"],
        },
      },
      take: 10,
      orderBy: { createdAt: "asc" },
    });

    if (pendingMessages.length === 0) {
      return;
    }

    console.log(`📨 Найдено сообщений в очереди: ${pendingMessages.length}`);

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

        // 1. Формируем кликабельный список файлов для текста
        let fileText = "";
        if (files.length > 0) {
          const links = files.map((f, i) => {
            const fileName = escapeMarkdown(f.originalName || `Файл ${i + 1}`);
            const rawPath = f.path.startsWith("/") ? f.path : `/${f.path}`;
            const fileUrl = `${baseUrl}${rawPath}`;
            return `• [${fileName}](${fileUrl})`;
          });

          fileText = `\n\n📎 *Прикреплённые файлы:*\n` + links.join("\n");
        }

        // 2. Отправка основного текста
        const tgText =
          `📌 *Новая заявка с сайта*\n\n` +
          `📦 *Товар:* ${escapeMarkdown(productName)}\n` +
          `📞 *Контакт:* ${escapeMarkdown(item.contact)}\n` +
          `✉️ *Email:* ${escapeMarkdown(clientEmail || "Не указан")}\n\n` +
          `📝 *Сообщение:*\n${escapeMarkdown(clientMessage)}` +
          fileText;

        const result = await bot.api.sendMessage({
          chat_id: chatId,
          text: tgText,
          parse_mode: "Markdown",
        });

        console.log(
          `   ✅ Telegram-текст для записи #${item.id} отправлен (Message ID: ${result.message_id})`,
        );

        // 3. Отправка вложений (Фото альбомом + Документы поштучно)
        if (files.length > 0) {
          const mediaPhotos = [];
          const docFiles = [];

          for (const file of files) {
            const rawPath = file.path.startsWith("/")
              ? file.path.slice(1)
              : file.path;

            let relativePath = rawPath;
            if (!rawPath.startsWith("public")) {
              relativePath = path.join("public", rawPath);
            }

            const filePath = path.resolve(process.cwd(), relativePath);

            if (fs.existsSync(filePath)) {
              console.log(`   🔍 Файл найден на диске: ${filePath}`);

              // Читаем файл в Buffer вместо Stream (решает Network request failed)
              const fileBuffer = fs.readFileSync(filePath);
              const isImage = /\.(jpg|jpeg|png|webp)$/i.test(
                file.path || file.originalName || "",
              );

              if (isImage) {
                mediaPhotos.push({
                  type: "photo",
                  media: new InputFile(fileBuffer, path.basename(filePath)),
                });
              } else {
                // Безопасное имя файла (убираем спецсимволы, ломающие HTTP-заголовки)
                const safeName = (file.originalName || path.basename(filePath))
                  .replace(/№/g, "N")
                  .replace(/[^\w\d\s\.\-а-яА-ЯёЁ]/g, "_");

                docFiles.push({
                  buffer: fileBuffer,
                  filename: safeName,
                });
              }
            } else {
              console.warn(`   ⚠️ Файл не найден на диске: ${filePath}`);
            }
          }

          // А. Картинки альбомом
          if (mediaPhotos.length > 0) {
            try {
              await bot.api.sendMediaGroup({
                chat_id: chatId,
                media: mediaPhotos.slice(0, 10),
              });
              console.log(
                `   📸 Успешно отправлен альбом с фото (${mediaPhotos.length} шт.)`,
              );
            } catch (imgError) {
              console.error(
                `   ❌ Ошибка при отправке фото в Telegram:`,
                imgError.description || imgError.message || imgError,
              );
            }
          }

          // Б. Документы (.xlsx, .pdf)
          for (const doc of docFiles) {
            try {
              await bot.api.sendDocument({
                chat_id: chatId,
                document: new InputFile(doc.buffer, doc.filename),
              });
              console.log(`   📄 Успешно отправлен документ: ${doc.filename}`);
            } catch (docError) {
              console.error(
                `   ❌ Ошибка при отправке документа (${doc.filename}):`,
                docError.description || docError.message || docError,
              );
            }
          }
        }

        // 4. Обновляем статус в БД
        await prisma.messageQueue.update({
          where: { id: item.id },
          data: { status: "sent", error: null },
        });

        console.log(`   ✅ Запись #${item.id} → status=sent`);
      } catch (error) {
        console.error(
          `❌ Ошибка при обработке записи #${item.id}:`,
          error.description || error.message || error,
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
