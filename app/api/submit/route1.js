import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import axios from "axios";
import { Resend } from "resend";

export async function POST(request) {
  try {
    const { email, contact, message, name, productName } = await request.json();

    // Проверка на бота: если поле name заполнено, отклоняем запрос
    if (name) {
      return NextResponse.json({ error: "Обнаружен бот" }, { status: 400 });
    }

    // Валидация обязательных полей
    if (!contact) {
      return NextResponse.json(
        { error: "Отсутствуют обязательные поля: contact" },
        { status: 400 },
      );
    }

    const timeString = new Date().toLocaleString();

    // Формируем текст сообщения
    const notificationText = `Новое сообщение:
Контакт: ${contact}
Email: ${email || "не указан"}
Сообщение: ${message || "не указано"}
Товар: ${productName || "не указан"}
Время: ${timeString}`;

    let telegramSent = false;
    let emailSent = false;
    let telegramErrorMsg = null;

    // 1. Пытаемся отправить сообщение в Telegram
    try {
      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: notificationText,
        },
      );
      telegramSent = true;
    } catch (tgError) {
      telegramErrorMsg = tgError.response?.data?.description || tgError.message;
      console.error("Ошибка отправки в Telegram:", telegramErrorMsg);
    }

    // 2. Настраиваем Nodemailer для отправки письма
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru", // Хост Mail.ru
      port: 465, // Порт для SSL
      secure: true, // true для 465 порта
      family: 4,
      auth: {
        user: process.env.EMAIL_USER, // Ваш email на mail.ru
        pass: process.env.EMAIL_PASS, // Пароль для внешних приложений
      },
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ruslan-80@inbox.ru",
      subject: telegramSent
        ? "Новое сообщение с сайта"
        : "⚠️ Ошибка Telegram! Новое сообщение с сайта",
      text: notificationText,
      html: `<p><strong>Контакт:</strong> ${contact}</p>
             <p><strong>Email:</strong> ${email || "не указан"}</p>
             <p><strong>Сообщение:</strong> ${message || "не указано"}</p>
             <p><strong>Товар:</strong> ${productName || "не указан"}</p>
             <p><strong>Время:</strong> ${timeString}</p>
             ${!telegramSent ? `<p style="color: red;"><strong>Внимание:</strong> Не удалось отправить сообщение в Telegram. Ошибка: ${telegramErrorMsg}</p>` : ""}`,
    };

    // Если Telegram упал, обязательно отправляем на почту
    try {
      await transporter.sendMail(mailOptions);
      emailSent = true;
    } catch (mailError) {
      console.error("Ошибка отправки email:", mailError.message);
    }

    // Если и Telegram, и Почта не сработали — возвращаем 500 ошибку
    if (!telegramSent && !emailSent) {
      return NextResponse.json(
        {
          error:
            "Внутренняя ошибка сервера: не удалось отправить уведомление ни в Telegram, ни на почту.",
        },
        { status: 500 },
      );
    }

    console.log("Результаты отправки:", { telegramSent, emailSent, contact });

    return NextResponse.json(
      {
        status: "success",
        message: "Данные успешно отправлены",
        data: { contact, telegramSent, emailSent },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Критическая ошибка сервера:", error.message);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
