import Link from "next/link";

export const metadata = {
  title: "Поддержка | ЭЛЕКТРОЩИТ-ПРО",
  description: "Поддержка",
};

export default function Support() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Служба поддержки</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Связаться с нами</h2>
        <p className="mb-4">
          Если у вас есть вопросы или проблемы, наша служба поддержки готова
          помочь.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@shop.com"
              className="text-blue-600 hover:underline"
            >
              info@electroshit.ru
            </a>
          </li>
          <li>
            <strong>Телефон:</strong> +7(499) 390-14-67 (Пн-Пт, 9:00–18:00)
          </li>
          {/* <li>
            <strong>Чат:</strong> Доступен на сайте в правом нижнем углу
          </li> */}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Часто задаваемые вопросы
        </h2>
        <p className="mb-4">
          Ответы на популярные вопросы вы найдете в разделе{" "}
          <Link href="/faq" className="text-blue-600 hover:underline">
            FAQ
          </Link>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Форма обратной связи</h2>
        <p className="mb-4">
          Заполните форму ниже, и мы свяжемся с вами в течение 24 часов.
        </p>
        <div className="border p-4 rounded-lg">
          <input
            type="text"
            placeholder="Ваше имя"
            aria-label="Ваше имя"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="email"
            placeholder="Ваш email"
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            placeholder="Ваше сообщение"
            aria-label="Ваше сообщение"
            className="w-full p-2 mb-4 border rounded"
            rows={5}
          ></textarea>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Отправить
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Полезные ссылки</h2>
        <ul className="list-disc pl-6">
          <li>
            <Link href="/guarantees" className="text-blue-600 hover:underline">
              Гарантии и возврат
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Политика конфиденциальности
            </Link>
          </li>
          <li>
            <Link href="/terms" className="text-blue-600 hover:underline">
              Пользовательское соглашение
            </Link>
          </li>
        </ul>
      </section>

      <p className="text-sm text-gray-600">
        Мы ценим ваше доверие и стремимся оперативно решать все вопросы!
      </p>
    </div>
  );
}
