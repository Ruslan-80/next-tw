"use client";

import { useState } from "react";
import Link from "next/link";

export default function FooterSubscribeForm() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      setErrorMessage("Необходимо согласие на обработку персональных данных.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ошибка при оформлении подписки");
      }

      setStatus("success");
      setEmail("");
      setAgreed(false);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex">
          <input
            id="footer_email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш email"
            label="Ваш email"
            className="bg-background border border-accent/30 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-accent text-sm text-foreground"
          />
          <button
            id="footer_submit"
            type="submit"
            disabled={!agreed || status === "loading"}
            className={`btn-gold rounded-r-lg rounded-l-none px-6 transition-opacity ${
              !agreed || status === "loading"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {status === "loading" ? "..." : "OK"}
          </button>
        </div>

        {/* Согласие 152-ФЗ / 38-ФЗ */}
        <div className="flex items-start gap-2 text-xs">
          <input
            type="checkbox"
            id="footer_privacy"
            aria-label="Согласие на обработку персональных данных"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-3.5 w-3.5 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
          />
          <label
            htmlFor="footer_privacy"
            className="text-gray-400 cursor-pointer text-[11px] leading-tight"
          >
            Я даю согласие на{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              обработку персональных данных
            </Link>{" "}
            и получение рекламных и новостных рассылок.
          </label>
        </div>
      </form>

      {status === "success" && (
        <p className="text-green-500 text-xs mt-2">
          ✅ Вы успешно подписались на рассылку!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-xs mt-2">❌ {errorMessage}</p>
      )}
    </div>
  );
}
