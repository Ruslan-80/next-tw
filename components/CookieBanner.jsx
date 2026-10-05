"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useConsentStore } from "@/lib/store/useConsentStore";

export default function CookieBanner() {
  const { isVisible, acceptConsent, initConsent } = useConsentStore();

  useEffect(() => {
    initConsent(); // вызываем один раз при загрузке клиента
  }, [initConsent]);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 bg-slate-400/30 backdrop-blur-sm shadow-lg p-4 rounded z-50 max-w-[550px]"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="text-sm">
          Продолжая использовать данный сайт, вы соглашаетесь с использованием
          нами cookie-файлов.{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Политика конфиденциальности
          </Link>
          .
        </div>
        <div className="text-sm">
          Да, мы собираем куки как и все. Они нужны, чтобы мы стали лучше.{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Политика конфиденциальности
          </Link>
          .
        </div>
        <button
          onClick={acceptConsent}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Принимаю
        </button>
      </div>
    </div>
  );
}
