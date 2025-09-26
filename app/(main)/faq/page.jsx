import Link from "next/link";

export const metadata = {
  title: "Вопросы и ответы | ЭЛЕКТРОЩИТ-ПРО",
  description: "Вопросы и ответы",
};

export default function FAQ() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Часто задаваемые вопросы (FAQ)
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Как сделать заказ?</h2>
        <p className="mb-4">
          Выберите товары, добавьте их в корзину, перейдите в корзину и следуйте
          инструкциям для оформления заказа.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          2. Какие способы оплаты доступны?
        </h2>
        <p className="mb-4">
          Мы принимаем оплату банковскими картами, электронными кошельками и
          банковским переводом. Подробности в разделе{" "}
          <Link href="/delivery" className="text-blue-600 hover:underline">
            Оплата
          </Link>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          3. Каковы сроки доставки?
        </h2>
        <p className="mb-4">
          Сроки доставки зависят от региона и выбранного способа доставки.
          Обычно от 2 до 7 рабочих дней. Подробности в разделе{" "}
          <Link href="/delivery" className="text-blue-600 hover:underline">
            Доставка
          </Link>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          4. Могу ли я вернуть товар?
        </h2>
        <p className="mb-4">
          Да, возврат возможен в течение 14 дней при сохранении товарного вида.
          Подробности в разделе{" "}
          <Link href="/guarantees" className="text-blue-600 hover:underline">
            Гарантии и возврат
          </Link>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          5. Как связаться с поддержкой?
        </h2>
        <p className="mb-4">
          Обратитесь в{" "}
          <Link href="/support" className="text-blue-600 hover:underline">
            службу поддержки
          </Link>{" "}
          через форму на сайте или по указанным контактам.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          6. Есть ли программа лояльности?
        </h2>
        <p className="mb-4">
          Да, вы получаете бонусные баллы за заказы, которые можно использовать
          для скидок. Подробности в разделе{" "}
          <Link href="/bonus" className="text-blue-600 hover:underline">
            Программа лояльности
          </Link>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          7. Как узнать о текущих акциях?
        </h2>
        <p className="mb-4">
          Информация об акциях доступна в разделе{" "}
          <Link href="/bonus" className="text-blue-600 hover:underline">
            Акции
          </Link>{" "}
          или через подписку на рассылку.
        </p>
      </section>

      <p className="text-sm text-gray-600">
        Не нашли ответ? Свяжитесь с{" "}
        <Link href="/support" className="text-blue-600 hover:underline">
          службой поддержки
        </Link>
        .
      </p>
    </div>
  );
}
