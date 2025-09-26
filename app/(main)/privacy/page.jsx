import Link from "next/link";

export const metadata = {
  title: "Политика конфиденциальности | ЭЛЕКТРОЩИТ-ПРО",
  description: "Политика конфиденциальности",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Политика конфиденциальности</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
        <p className="mb-4">
          Настоящая Политика конфиденциальности (далее — Политика) определяет
          порядок сбора, использования и защиты персональных данных
          Пользователей интернет-магазина (далее — Магазин).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          2. Сбор персональных данных
        </h2>
        <p className="mb-4">
          Магазин собирает данные, предоставленные Пользователем, включая: имя,
          адрес электронной почты, номер телефона, адрес доставки и платежные
          данные.
        </p>
        <p>
          Данные собираются при регистрации, оформлении заказа или заполнении
          форм на сайте.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. Использование данных</h2>
        <p className="mb-4">
          Собранные данные используются для обработки заказов, доставки товаров,
          связи с Пользователем и улучшения работы сайта.
        </p>
        <p>
          Магазин может использовать данные для отправки информационных и
          рекламных сообщений, если Пользователь дал на это согласие.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. Защита данных</h2>
        <p className="mb-4">
          Магазин применяет технические и организационные меры для защиты
          персональных данных от несанкционированного доступа, утраты или
          изменения.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          5. Передача данных третьим лицам
        </h2>
        <p className="mb-4">
          Данные могут передаваться партнерам Магазина (например, службам
          доставки или платежным системам) исключительно для выполнения заказов.
        </p>
        <p>
          Магазин не передает данные третьим лицам в маркетинговых целях без
          согласия Пользователя.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">6. Права Пользователя</h2>
        <p className="mb-4">
          Пользователь имеет право запросить доступ, изменение или удаление
          своих персональных данных, обратившись в{" "}
          <Link href="/support" className="text-blue-600 hover:underline">
            службу поддержки
          </Link>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
        <p className="mb-4">
          Сайт использует файлы cookie для улучшения пользовательского опыта и
          анализа трафика. Пользователь может отключить cookie в настройках
          браузера.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">8. Изменения Политики</h2>
        <p className="mb-4">
          Магазин оставляет за собой право вносить изменения в Политику.
          Изменения вступают в силу с момента публикации на сайте.
        </p>
      </section>

      <p className="text-sm text-gray-600">
        По вопросам обработки данных обращайтесь в{" "}
        <Link href="/support" className="text-blue-600 hover:underline">
          службу поддержки
        </Link>
        .
      </p>
    </div>
  );
}
