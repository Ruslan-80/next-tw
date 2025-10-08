import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import axios from "axios";

export async function POST(request) {
  try {
    const { email, contact, message, name } = await request.json();

    // Проверка на бота: если поле name заполнено, отклоняем запрос
    if (name) {
      return NextResponse.json({ error: "Обнаружен бот" }, { status: 400 });
    }

    // Валидация обязательных полей
    if (!contact) {
      return NextResponse.json(
        { error: "Отсутствуют обязательные поля: contact" },
        { status: 400 }
      );
    }

    // Настройка Nodemailer для отправки письма
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: "manager@example.com", // Укажите ваш email
    //   subject: "Новое сообщение с сайта",
    //   text: `Контакт: ${contact}\nКнопка: ${buttonId}\nВремя: ${new Date().toLocaleString()}`,
    //   html: `<p><strong>Контакт:</strong> ${contact}</p>
    //          <p><strong>Кнопка:</strong> ${buttonId}</p>
    //          <p><strong>Время:</strong> ${new Date().toLocaleString()}</p>`,
    // };

    // // Отправка письма
    // await transporter.sendMail(mailOptions);

    // Отправка сообщения в Telegram
    const telegramMessage = `Новое сообщение:\nКонтакт: ${contact}\nEmail: ${email}\nСообщение: ${message}\nВремя: ${new Date().toLocaleString()}`;
    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: telegramMessage,
      }
    );

    console.log("Письмо и Telegram-сообщение отправлены:", {
      contact,
    });

    // Здесь можно добавить логику для сохранения данных, например, в базу данных
    // Пример: await saveToDatabase({ contact, buttonId });

    // Имитация успешной обработки
    // console.log("Получены данные:", { contact });

    return NextResponse.json(
      {
        status: "success",
        message: "Данные успешно отправленны",
        data: { contact },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка сервера:", error.message);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
