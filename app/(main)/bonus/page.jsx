import Link from "next/link";

export const metadata = {
  title: "Текущие акции | ЭЛЕКТРОЩИТ-ПРО",
  description: "Текущие акции",
};

export default function Promotions() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Акции</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Текущие акции</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">
              Скидка 5% на первый заказ
            </h3>
            <p className="mb-4">
              Зарегистрируйтесь и получите скидку 5% на ваш первый заказ при
              покупке от 50000 рублей.
            </p>
            <p className="text-sm text-gray-600">
              Действует до 31 декабря 2025 года.
            </p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Бесплатная доставка</h3>
            <p className="mb-4">
              от 50 000 рублей — в пределах МКАД или до терминала ТТК которую вы
              укажите. (Работаем со всеми ТТК региона)
            </p>
            <p className="mb-4">от 100 000 рублей — в пределах ЦКАД.</p>
            <p className="text-sm text-gray-600">Без ограничения по времени.</p>
            <Link href="/" className="text-blue-600 hover:underline">
              К покупкам
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Сезонные предложения</h2>
        <div className="border p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Осенняя распродажа</h3>
          <p className="mb-4">
            Скидки до 20% на избранные товары из осенней коллекции.
          </p>
          <p className="text-sm text-gray-600">
            Действует до 30 ноября 2025 года.
          </p>
          <Link href="/bonus" className="text-blue-600 hover:underline">
            Посмотреть товары
          </Link>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Программа лояльности</h2>
        <p className="mb-4">
          Получайте бонусные баллы за каждый заказ и обменивайте их на скидки. 1
          балл = 1 рубль.
        </p>
        <p>
          Подробности в разделе{" "}
          <Link href="/bonus" className="text-blue-600 hover:underline">
            Программа лояльности
          </Link>
          .
        </p>
      </section>

      <p className="text-sm text-gray-600">
        Следите за обновлениями акций на сайте или через подписку на рассылку.
        По вопросам обращайтесь в{" "}
        <Link href="/support" className="text-blue-600 hover:underline">
          службу поддержки
        </Link>
        .
      </p>
    </div>
  );
}
