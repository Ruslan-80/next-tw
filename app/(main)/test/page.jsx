import React from "react";

export default function HeroSection() {
  // Замените этот URL на реальный адрес вашего .ics файла в будущем
  const calendarUrl = "your-site.com/api/calendar.ics";

  // Ссылка для Google Calendar (через добавление по URL)
  const googleSubscribeUrl = `https://www.google.com/calendar/render?cid=webcal://${calendarUrl}`;

  // Ссылка для Apple / iOS (прямой протокол webcal)
  const appleSubscribeUrl = `webcal://${calendarUrl}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="font-bold text-xl tracking-tight">ШТУРМАН</div>
        <div className="text-sm text-slate-500">v 1.0</div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-16 pb-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Твой невидимый <br />
          <span className="text-blue-600">штурман в отношениях</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Просто подпишись на календарь. Раз в пару дней там будут появляться
          идеи, которые сделают её счастливее. Без давления и уведомлений.
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            <a
              href={googleSubscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-white border border-slate-200 rounded-xl font-medium hover:shadow-md transition-all flex items-center justify-center gap-3"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
                className="w-5 h-5"
                alt=""
              />
              Google Календарь
            </a>
            <a
              href={appleSubscribeUrl}
              className="px-6 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              Apple / iPhone
            </a>
          </div>
          <p className="text-sm text-slate-400 mt-2">
            События появятся в твоем стандартном календаре автоматически
          </p>
        </div>
      </main>

      {/* Инструкция, если не синхронизировалось */}
      <section className="max-w-2xl mx-auto px-6 py-10 border-t border-slate-100">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
          Если календарь не появился на телефоне:
        </h4>
        <ol className="text-left text-slate-500 text-sm space-y-3">
          <li>
            1. Перейди в{" "}
            <a
              href="https://calendar.google.com/calendar/syncselect"
              target="_blank"
              className="text-blue-500 underline"
            >
              настройки синхронизации Google
            </a>
            .
          </li>
          <li>
            2. Поставь галочку напротив <b>«Штурман»</b> и нажми «Сохранить».
          </li>
          <li>3. В приложении на телефоне нажми «Обновить».</li>
        </ol>
      </section>
    </div>
  );
}
