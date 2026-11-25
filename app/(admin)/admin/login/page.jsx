"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
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
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ошибка входа");
      }

      // Перенаправляем в главную панель админки
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card p-8 rounded-2xl border border-accent/30 shadow-2xl">
        <h1 className="text-2xl font-bold text-text text-center mb-6">
          Вход в панель администратора
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="admin_login"
              className="block text-sm font-medium mb-1 text-foreground"
            >
              Логин
            </label>
            <input
              id="admin_login"
              type="text"
              label="Логин"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-800 dark:border-gray-700 text-foreground"
              placeholder="Введите логин"
            />
          </div>

          <div>
            <label
              htmlFor="admin_password"
              className="block text-sm font-medium mb-1 text-foreground"
            >
              Пароль
            </label>
            <input
              id="admin_password"
              type="password"
              label="Пароль"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-800 dark:border-gray-700 text-foreground"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-3 rounded-lg font-bold transition-opacity disabled:opacity-50 mt-4"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
