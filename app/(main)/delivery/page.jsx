import Link from "next/link";

export const metadata = {
  title: "Доставка и оплата | ЭЛЕКТРОЩИТ-ПРО",
  description: "Доставка и оплата",
};

export default function DeliveryPayment() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Доставка и оплата</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Способы доставки</h2>
        <p className="mb-4">Мы предлагаем следующие варианты доставки:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Курьерская доставка:</strong> 2–5 рабочих дней, стоимость от
            300 рублей.
          </li>
          <li>
            <strong>Почта России:</strong> 5–10 рабочих дней, стоимость от 200
            рублей.
          </li>
          <li>
            <strong>Пункты выдачи:</strong> 3–7 рабочих дней, стоимость от 150
            рублей.
          </li>
        </ul>
        <p>
          Точные сроки и стоимость зависят от региона. Рассчитываются при
          оформлении заказа.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. Бесплатная доставка</h2>
        <p className="mb-4">
          Бесплатная доставка на заказы от 10 000 рублей любым способом.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. Способы оплаты</h2>
        <p className="mb-4">Мы принимаем:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Банковские карты (Visa, MasterCard, Мир)</li>
          <li>Электронные кошельки (ЮMoney, Qiwi)</li>
          <li>Банковский перевод</li>
        </ul>
        <p>Оплата происходит через защищенные платежные системы.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. Возврат и обмен</h2>
        <p className="mb-4">
          Если товар не подошел или имеет дефекты, вы можете вернуть его в
          течение 14 дней. Подробности в разделе{" "}
          <Link href="/guarantees" className="text-blue-600 hover:underline">
            Гарантии и возврат
          </Link>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">5. Отслеживание заказа</h2>
        <p className="mb-4">
          После отправки заказа вы получите трек-номер для отслеживания на email
          или в личном кабинете.
        </p>
      </section>

      <p className="text-sm text-gray-600">
        По вопросам доставки или оплаты обращайтесь в{" "}
        <Link href="/support" className="text-blue-600 hover:underline">
          службу поддержки
        </Link>
        .
      </p>
    </div>
  );
}
