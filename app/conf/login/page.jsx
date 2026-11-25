"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfLoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/conf/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Неверный логин или пароль");
      }

      router.push("/conf");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-card p-8 rounded-2xl border border-accent/30 shadow-lg">
        <h1 className="text-2xl font-bold text-foreground text-center mb-6">
          Доступ к конфигуратору
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Логин
            </label>
            <input
              type="text"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-background dark:border-gray-700 text-foreground"
              placeholder="Введите логин"
              label="Логин"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Пароль
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-background dark:border-gray-700 text-foreground"
              placeholder="••••••••"
              label="Пароль"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-3 rounded-lg font-bold transition-opacity disabled:opacity-50 mt-2"
          >
            {loading ? "Проверка..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
