import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import data from "@/app/data/dostavka.json";
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

export default function Dostavka({ article }) {
  const text = data[article] || "";
  return (
    <div className="shadow text-sm lg:text-base rounded-md lg:p-6">
      <section className="py-4 text-text">
        <div className="container mx-auto lg:px-6">
          <div className="flex items-baseline gap-3 mb-8">
            <Truck className="h-10 w-10 text-text" />
            <h2 className="text-xl text-text lg:text-4xl font-bold">
              Способы доставки
            </h2>
          </div>
          <Card>
            <CardContent className="lg:p-8 space-y-6">
              <div className="leading-relaxed text-muted-foreground text-sm lg:text-2xl text-justify lg:indent-30">
                {text}
              </div>
              <p className="text-justify text-sm lg:text-xl leading-relaxed mb-6">
                Мы предлагаем следующие варианты доставки:
              </p>

              <div className="space-y-4">
                <div className="font-bold text-xl lg:text-2xl">
                  БЕСПЛАТНАЯ ДОСТАВКА
                </div>
                <p className="ml-4">
                  Осуществляется в московском регионе при заказе:
                </p>
                <ul className="list-disc pl-8">
                  <li>
                    от 50 000 рублей — в пределах МКАД или до терминала ТТК
                    которую вы укажите. (Работаем со всеми ТТК региона)
                  </li>
                  <li>от 100 000 рублей — в пределах ЦКАД.</li>
                </ul>

                <div className="font-bold text-xl lg:text-2xl">
                  ПЛАТНАЯ ДОСТАВКА
                </div>
                <p className="">
                  Доставка при заказе на сумму менее 50 000 рублей
                  осуществляется на платной основе и рассчитывается
                  индивидуально
                </p>

                <div className="font-bold text-xl lg:text-2xl">
                  ДРУГИЕ ВИДЫ ДОСТАВКИ
                </div>
                <ul className="list-disc pl-8 space-y-2">
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
                <p className="">
                  Точные сроки и стоимость зависят от региона. Рассчитываются
                  при оформлении заказа.
                </p>
              </div>

              <div className="font-bold text-xl lg:text-2xl flex items-center gap-2">
                <Clock className="h-7 w-7" /> ВРЕМЯ ДОСТАВКИ
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
    </div>
  );
}
