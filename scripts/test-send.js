import "dotenv/config";
import nodemailer from "nodemailer";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// node-telegram-bot-api v2.1.0
const { Bot } = require("node-telegram-bot-api");

// ============================================================
// MAIL.RU
// ============================================================

async function testMail() {
  console.log("\n📫 Проверка отправки через Mail.ru...");

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.error("❌ Не заданы SMTP_USER или SMTP_PASS в .env");
    return false;
  }

  /*
   * На твоём ПК Node пытается использовать IPv6:
   *
   * ENETUNREACH 2a00:1148:...:465
   *
   * Поэтому временно используем IPv4 напрямую.
   *
   * IP получен из предыдущей попытки:
   * 217.69.139.160
   *
   * servername нужен для корректной проверки TLS-сертификата
   * smtp.mail.ru.
   */

  const smtpHost = "217.69.139.160";
  const smtpPort = 465;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true,

    auth: {
      user: smtpUser,
      pass: smtpPass,
    },

    tls: {
      servername: "smtp.mail.ru",
    },

    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });

  try {
    console.log(`   SMTP: smtp.mail.ru:${smtpPort}`);
    console.log(`   IPv4: ${smtpHost}`);
    console.log(`   User: ${smtpUser}`);

    console.log("   🔌 Проверяем SMTP-соединение...");

    await transporter.verify();

    console.log("   ✅ SMTP-соединение и авторизация работают");

    console.log("   📤 Отправляем тестовое письмо...");

    const result = await transporter.sendMail({
      from: `"Тест с локального ПК" <${smtpUser}>`,
      to: smtpUser,
      subject: "🧪 Тестовое письмо с локального компьютера",
      html: `
        <h2>Тест SMTP</h2>

        <p>
          Если вы видите это письмо,
          настройки SMTP Mail.ru работают.
        </p>

        <p>
          Отправлено с локального компьютера через Node.js.
        </p>
      `,
    });

    console.log("   ✅ Письмо успешно отправлено!");
    console.log(`   Message ID: ${result.messageId}`);

    return true;
  } catch (error) {
    console.error("   ❌ Ошибка SMTP:");
    console.error(`      ${error.message}`);

    if (error.code) {
      console.error(`      Code: ${error.code}`);
    }

    if (error.command) {
      console.error(`      Command: ${error.command}`);
    }

    return false;
  } finally {
    transporter.close();
  }
}

// ============================================================
// TELEGRAM
// ============================================================

async function testTelegram() {
  console.log("\n✈️ Проверка Telegram...");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token) {
    console.error("❌ Не задан TELEGRAM_BOT_TOKEN в .env");
    return false;
  }

  if (!chatId) {
    console.error("❌ Не задан TELEGRAM_CHAT_ID в .env");
    return false;
  }

  try {
    console.log(`   Chat ID: ${chatId}`);
    console.log("   🔌 Подключаемся к Telegram...");

    if (typeof Bot !== "function") {
      console.error("   ❌ Экспорт Bot не является конструктором.");
      return false;
    }

    const bot = new Bot(token);

    // Проверяем токен и доступность Telegram API
    const me = await bot.api.getMe();

    console.log(`   ✅ Бот найден: @${me.username || me.first_name}`);

    console.log("   📤 Отправляем сообщение...");

    const result = await bot.api.sendMessage({
      chat_id: chatId,
      text: "🧪 *Тестовое сообщение с локального компьютера*",
      parse_mode: "Markdown",
    });

    console.log("   ✅ Сообщение в Telegram успешно отправлено!");
    console.log(`   Message ID: ${result.message_id}`);

    return true;
  } catch (error) {
    console.error("   ❌ Ошибка Telegram:");
    console.error(`      ${error.message}`);

    if (error.code) {
      console.error(`      Code: ${error.code}`);
    }

    if (error.errorCode) {
      console.error(`      Telegram error code: ${error.errorCode}`);
    }

    if (error.description) {
      console.error(`      Description: ${error.description}`);
    }

    return false;
  }
}

// ============================================================
// RUN
// ============================================================

async function runTest() {
  console.log("========================================");
  console.log("🚀 ТЕСТ ОТПРАВКИ");
  console.log("========================================");

  //   const mailOk = await testMail();
  const telegramOk = await testTelegram();

  console.log("\n========================================");
  console.log("📊 РЕЗУЛЬТАТ");
  console.log("========================================");

  //   console.log(`Mail.ru:    ${mailOk ? "✅ OK" : "❌ ОШИБКА"}`);

  console.log(`Telegram:   ${telegramOk ? "✅ OK" : "❌ ОШИБКА"}`);

  console.log("========================================\n");

  process.exit(telegramOk ? 0 : 1);
}

runTest().catch((error) => {
  console.error("\n💥 Критическая ошибка:", error);
  process.exit(1);
});
