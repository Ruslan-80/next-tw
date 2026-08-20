import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Введите корректный email адрес" },
        { status: 400 },
      );
    }

    // --- Отправка в Telegram Bot ---
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const text = `📬 *Новая подписка на новости и акции!*\n\n📧 *Email:* \`${email}\``;

      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: text,
            parse_mode: "Markdown",
          }),
        },
      );
    }

    // Если у вас также подключена база данных или сервис рассылок (например, Unisender / Resend / Nodemailer),
    // здесь можно вызвать функцию для сохранения email подписки.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscription Error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
