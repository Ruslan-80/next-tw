import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import fs from "fs";
import nodemailer from "nodemailer";
import path from "path";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.mail.ru",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === "true" || true, // true для 465, false для других портов
  auth: {
    user: process.env.SMTP_USER || "ruslan-80@inbox.ru",
    pass: process.env.SMTP_PASS,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false, // Исключает ошибки с локальными SSL-сертификатами
  },
});

const mailTo = process.env.EMAIL_TO;
const mailFrom = process.env.SMTP_USER;

async function processEmailQueue() {
  if (!process.env.SMTP_PASS) {
    console.error("❌ Не задан SMTP_PASS в .env");
    return;
  }

  try {
    // В зависимости от вашей схемы БД используйте подходящие статусы или отдельное поле emailStatus
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

    console.log(
      `✉️ Найдено заявок для email-рассылки: ${pendingMessages.length}`,
    );

    for (const item of pendingMessages) {
      const data = item.data || {};

      const clientEmail =
        data.email ||
        (item.contact && item.contact.includes("@")
          ? item.contact
          : "Не указан");

      const productName = data.productName || "Заявка с сайта";
      const clientMessage = data.message || "—";
      const files = Array.isArray(data.files) ? data.files : [];

      try {
        console.log(`✈️ Запись #${item.id}: подготовка и отправка Email...`);

        // 1. Формируем список вложений для Nodemailer
        const attachments = [];
        if (files.length > 0) {
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
              attachments.push({
                filename: file.originalName || path.basename(filePath),
                path: filePath,
              });
            } else {
              console.warn(`   ⚠️ Файл не найден на диске: ${filePath}`);
            }
          }
        }

        // 2. HTML-структура письма
        const htmlContent = `
          <h2>📌 Новая заявка с сайта</h2>
          <p><strong>📦 Товар / Услуга:</strong> ${productName}</p>
          <p><strong>📞 Контакт:</strong> ${item.contact || "—"}</p>
          <p><strong>✉️ Email клиента:</strong> ${clientEmail}</p>
          <hr />
          <p><strong>📝 Сообщение:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">${clientMessage}</p>
        `;

        // 3. Отправка письма
        const mailOptions = {
          from: `"Сайт Electroshit-Pro" <${mailFrom}>`,
          to: mailTo,
          subject: `Новая заявка: ${productName}`,
          html: htmlContent,
          attachments: attachments,
          replyTo: clientEmail.includes("@") ? clientEmail : undefined,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(
          `   ✅ Email для записи #${item.id} отправлен (ID: ${info.messageId})`,
        );

        // 4. Обновление статуса в БД
        await prisma.messageQueue.update({
          where: { id: item.id },
          data: { status: "sent", error: null },
        });

        console.log(`   ✅ Запись #${item.id} → status=sent`);
      } catch (error) {
        console.error(
          `❌ Ошибка при отправке email для записи #${item.id}:`,
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
      "❌ Ошибка работы с базой данных или SMTP:",
      globalError.message || globalError,
    );
  }
}

export { processEmailQueue };
