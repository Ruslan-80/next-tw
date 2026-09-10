// scripts/test-smtp.js
import nodemailer from "nodemailer";

// ⚠️ ВСТАВЬТЕ СВОЙ 16-ЗНАЧНЫЙ ПАРОЛЬ ПРИЛОЖЕНИЯ
const SMTP_USER = "site@electroshit-pro.ru";
const SMTP_PASS =
  "AHNpdGVAZWxlY3Ryb3NoaXQtcHJvLnJ1AGY3WDB2anNHV3IwWXBvZm5wMjhV";
const EMAIL_TO = "info@electroshit-pro.ru";

async function main() {
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    logger: true,
    debug: true,
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP: соединение и авторизация успешны");
  } catch (err) {
    console.error("❌ SMTP verify failed:", err.message);
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Test" <${SMTP_USER}>`,
      to: EMAIL_TO,
      subject: "Test SMTP auth",
      text: "Проверка аутентификации и отправки через Mail.ru",
    });
    console.log("✅ Письмо отправлено:", info.messageId);
  } catch (err) {
    console.error("❌ Отправка не удалась:", err.message);
  }
}

main();
