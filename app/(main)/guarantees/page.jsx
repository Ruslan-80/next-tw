import Link from "next/link";

export const metadata = {
  title: "Гарантии и возврат | ЭЛЕКТРОЩИТ-ПРО",
  description: "Гарантии и возврат",
};

export default function Returns() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Гарантии и возврат</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Гарантия качества</h2>
        <p className="mb-4">
          Интернет-магазин гарантирует, что все товары соответствуют описанию и
          не имеют дефектов на момент продажи.
        </p>
        <p>
          Гарантийный срок на товары указан в описании каждого продукта. Обычно
          он составляет от 6 до 12 месяцев.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. Условия возврата</h2>
        <p className="mb-4">
          Покупатель может вернуть товар в течение 14 дней с момента получения,
          если товар не был в употреблении, сохранены его товарный вид,
          потребительские свойства, пломбы и упаковка.
        </p>
        <p>
          Для возврата необходимо связаться с{" "}
          <Link href="/support" className="text-blue-600 hover:underline">
            службой поддержки
          </Link>{" "}
          и заполнить заявление на возврат.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          3. Возврат бракованного товара
        </h2>
        <p className="mb-4">
          Если товар оказался бракованным, магазин обязуется заменить его или
          вернуть деньги в течение 7 дней после получения товара и подтверждения
          дефекта.
        </p>
        <p>Расходы на доставку бракованного товара оплачиваются магазином.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. Процедура возврата</h2>
        <p className="mb-4">
          1. Свяжитесь с{" "}
          <Link href="/support" className="text-blue-600 hover:underline">
            службой поддержки
          </Link>{" "}
          для получения инструкций.
          <br />
          2. Упакуйте товар в оригинальную упаковку с чеком или накладной.
          <br />
          3. Отправьте товар по указанному адресу.
          <br />
          4. После проверки товара магазин вернет деньги или отправит замену.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">5. Исключения</h2>
        <p className="mb-4">
          Товары надлежащего качества, изготовленные на заказ, или относящиеся к
          категории личной гигиены, возврату не подлежат.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          6. Сроки возврата средств
        </h2>
        <p className="mb-4">
          Денежные средства возвращаются в течение 10 рабочих дней после
          получения и проверки возвращенного товара.
        </p>
      </section>

      <p className="text-sm text-gray-600">
        По вопросам гарантии и возврата обращайтесь в{" "}
        <Link href="/support" className="text-blue-600 hover:underline">
          службу поддержки
        </Link>
        .
      </p>
    </div>
  );
}
