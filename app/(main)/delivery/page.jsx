import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Truck,
  CreditCard,
  Package,
  Clock,
  Shield,
  Mail,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Доставка и оплата — Электрощитовое оборудование",
  description: "Информация о доставке и оплате продукции",
};

const DeliveryComponent = () => {
  return (
    <div className="container mx-auto p-2 lg:p-6 space-y-10 text-sm lg:text-2xl lg:mt-4">
      <nav className="py-4">
        <ol className="hidden md:flex flex-wrap items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/">Главная</Link>
          </li>

          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-900 truncate">
              Доставка и оплата
            </span>
          </li>
        </ol>
      </nav>
      {/* Main Title */}
      <section className="py-4 lg:mt-4">
        <div className="container mx-auto px-2 lg:px-6">
          <div className="text-center lg:mb-4">
            <h1 className="text-2xl lg:text-4xl font-bold">
              Доставка и оплата
            </h1>
          </div>
        </div>
      </section>

      {/* Delivery Methods */}
      <section className="py-4">
        <div className="container mx-auto px-2 lg:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Truck className="h-8 w-8 text-accent" />
            <h2 className="text-xl lg:text-4xl font-bold">
              1. Способы доставки
            </h2>
          </div>
          <Card>
            <CardContent className="p-4 lg:p-8 lg:space-y-6">
              <p className="text-justify leading-relaxed text-muted-foreground mb-6">
                Мы предлагаем следующие варианты доставки:
              </p>

              <div className="space-y-4 mb-4">
                <div className="font-bold text-xl lg:text-2xl">
                  БЕСПЛАТНАЯ ДОСТАВКА
                </div>
                <p className="text-muted-foreground lg:ml-4">
                  Осуществляется в московском регионе при заказе:
                </p>
                <ul className="list-disc pl-4 lg:pl-8 text-muted-foreground">
                  <li>
                    от 50 000 рублей — в пределах МКАД или до терминала ТТК
                    которую вы укажите. (Работаем со всеми ТТК региона)
                  </li>
                  <li>от 100 000 рублей — в пределах ЦКАД.</li>
                </ul>

                <div className="font-bold text-xl lg:text-2xl">
                  ПЛАТНАЯ ДОСТАВКА
                </div>
                <p className="text-muted-foreground">
                  Доставка при заказе на сумму менее 50 000 рублей
                  осуществляется на платной основе и рассчитывается
                  индивидуально
                </p>

                <div className="font-bold text-xl lg:text-2xl">
                  ДРУГИЕ ВИДЫ ДОСТАВКИ
                </div>
                <ul className="list-disc pl-8 text-muted-foreground space-y-2">
                  <li>
                    Курьерская доставка: рассчитывается индивидуально у
                    оператора, которого вы выбрали
                  </li>
                  <li>Почта России: рассчитывается индивидуально</li>
                  <li>
                    Пункты выдачи: при заказе на любую сумму. Адрес: г. Москва,
                    ул. Чермянская, д1с1
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  Точные сроки и стоимость зависят от региона. Рассчитываются
                  при оформлении заказа.
                </p>
              </div>

              <div className="font-bold text-xl lg:text-2xl flex items-center gap-2 mb-4">
                <Clock className="h-7 w-7 " /> ВРЕМЯ ДОСТАВКИ
              </div>
              <p className="text-muted-foreground">
                Стандартная доставка совершается в следующие временные интервалы
                (по московскому времени): с 09:00 до 18:00 — по заявкам,
                поданным с 09:00 до 15:00 предшествующего дня
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-4 bg-secondary/30">
        <div className="container mx-auto lg:px-6">
          <div className="flex items-center gap-3 mb-8">
            <CreditCard className="h-8 w-8 text-accent" />
            <h2 className="text-xl lg:text-4xl font-bold">3. Способы оплаты:</h2>
          </div>
          <Card>
            <CardContent className="lg:p-8 space-y-4">
              <div className="font-bold text-xl lg:text-2xl">
                БЕЗНАЛИЧНЫЙ РАСЧЁТ
              </div>
              <p className="text-muted-foreground">
                После оформления на указанную при заказе почту придёт счёт. Его
                необходимо оплатить в течение трёх рабочих дней. В противном
                случае мы не гарантируем сохранение цен.
              </p>

              <div className="font-bold text-xl lg:text-2xl">
                НАЛИЧНЫЙ РАСЧЁТ
              </div>
              <ul className="list-disc pl-8 text-muted-foreground space-y-2">
                <li>Банковский перевод</li>
                <li>Банковские карты (Visa, MasterCard, Мир)</li>
              </ul>
              <p className="text-muted-foreground">
                Оплата происходит через защищенные платежные системы.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Return and Exchange */}
      <section className="py-4">
        <div className="container mx-auto lg:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-accent" />
            <h2 className="text-xl lg:text-4xl font-bold">
              4. Возврат и обмен
            </h2>
          </div>
          <Card>
            <CardContent className="lg:p-8">
              <p className="text-muted-foreground">
                Если товар имеет дефекты, вы можете вернуть его в течение 14
                дней. Подробности в разделе Гарантии и возврат.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Order Tracking */}
      <section className="py-4 bg-secondary/30">
        <div className="container mx-auto lg:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Package className="h-8 w-8 text-accent" />
            <h2 className="text-xl lg:text-4xl font-bold">
              5. Отслеживание заказа
            </h2>
          </div>
          <Card>
            <CardContent className="lg:p-8">
              <p className="text-muted-foreground">
                После отправки заказа вы получите трек-номер для отслеживания на
                email или в личном кабинете.
              </p>
            </CardContent>
          </Card>
          <p className="text-muted-foreground mt-6">
            По вопросам доставки или оплаты обращайтесь в службу поддержки.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DeliveryComponent;
