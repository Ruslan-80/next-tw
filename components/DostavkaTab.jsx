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

export default function Dostavka({}) {
  return (
    <div className="bg-white shadow text-xs lg:text-base rounded-md p-6">
      <section className="py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Truck className="h-8 w-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-bold">
              1. Способы доставки
            </h2>
          </div>
          <Card>
            <CardContent className="p-8 space-y-6">
              <p className="text-justify leading-relaxed text-muted-foreground mb-6">
                Мы предлагаем следующие варианты доставки:
              </p>

              <div className="space-y-4">
                <div className="font-bold text-2xl">БЕСПЛАТНАЯ ДОСТАВКА</div>
                <p className="text-muted-foreground ml-4">
                  Осуществляется в московском регионе при заказе:
                </p>
                <ul className="list-disc pl-8 text-muted-foreground">
                  <li>
                    от 50 000 рублей — в пределах МКАД или до терминала ТТК
                    которую вы укажите. (Работаем со всеми ТТК региона)
                  </li>
                  <li>от 100 000 рублей — в пределах ЦКАД.</li>
                </ul>

                <div className="font-bold text-2xl">ПЛАТНАЯ ДОСТАВКА</div>
                <p className="text-muted-foreground">
                  Доставка при заказе на сумму менее 50 000 рублей
                  осуществляется на платной основе и рассчитывается
                  индивидуально
                </p>

                <div className="font-bold text-2xl">Другие виды доставки</div>
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

              <div className="font-bold text-2xl flex items-center gap-2">
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
