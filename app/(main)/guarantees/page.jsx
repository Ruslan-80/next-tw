import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  ArrowLeftRight,
  PackageCheck,
  AlertCircle,
  Clock,
  Mail,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Гарантии и возврат | ЭЛЕКТРОЩИТ-ПРО",
  description:
    "Информация о гарантии и возврате в интернет-магазине ЭЛЕКТРОЩИТ-ПРО",
};

const GuaranteesComponent = () => {
  return (
    <div className="container mx-auto p-6 space-y-10 text-2xl mt-4">
      <nav className="py-4">
        <ol className="hidden md:flex flex-wrap items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/">Главная</Link>
          </li>

          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-900 truncate">
              Гарантии и возврат
            </span>
          </li>
        </ol>
      </nav>
      {/* Main Title */}
      <section className="py-4 mt-4">
        <div className="container mx-auto px-6">
          <div className="text-center mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Гарантии и возврат
            </h1>
          </div>
        </div>
      </section>

      {/* Quality Guarantee */}
      <section className="py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-bold">
              1. Гарантия качества
            </h2>
          </div>
          <Card>
            <CardContent className="p-8 space-y-4">
              <p className="text-justify leading-relaxed text-muted-foreground">
                Интернет-магазин гарантирует, что все товары соответствуют
                описанию и не имеют дефектов на момент продажи.
              </p>
              <p className="text-justify leading-relaxed text-muted-foreground">
                Гарантийный срок на товары указан в описании каждого продукта.
                Обычно он составляет от 6 до 12 месяцев.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="py-4 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <ArrowLeftRight className="h-8 w-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-bold">
              2. Условия возврата
            </h2>
          </div>
          <Card>
            <CardContent className="p-8 space-y-4">
              <p className="text-justify leading-relaxed text-muted-foreground">
                Покупатель может вернуть товар в течение 14 дней с момента
                получения только в случае обнаружения дефектов, при условии что
                товар не был в употреблении, сохранены его товарный вид,
                потребительские свойства, пломбы и упаковка.
              </p>
              <p className="text-justify leading-relaxed text-muted-foreground">
                В другом случае товар обмену и возврату не подлежит так как
                является заказным и изготавливается под клиента индивидуально.
              </p>
              <p className="text-justify leading-relaxed text-muted-foreground">
                Для возврата необходимо связаться с службой поддержки и
                заполнить заявление на возврат.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Defective Goods Return */}
      <section className="py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <PackageCheck className="h-8 w-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-bold">
              3. Возврат бракованного товара
            </h2>
          </div>
          <Card>
            <CardContent className="p-8 space-y-4">
              <p className="text-justify leading-relaxed text-muted-foreground">
                Если товар оказался бракованным, магазин обязуется заменить его
                или вернуть деньги в течение 7 дней после получения товара и
                подтверждения дефекта.
              </p>
              <p className="text-justify leading-relaxed text-muted-foreground">
                Расходы на доставку бракованного товара оплачиваются магазином.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Return Procedure */}
      <section className="py-4 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <ArrowLeftRight className="h-8 w-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-bold">
              4. Процедура возврата
            </h2>
          </div>
          <Card>
            <CardContent className="p-8 space-y-4">
              <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                <li>Свяжитесь с службой поддержки для получения инструкций.</li>
                <li>
                  Упакуйте товар в оригинальную упаковку с чеком или накладной.
                </li>
                <li>Отправьте товар по указанному адресу.</li>
                <li>
                  После проверки товара магазин вернет деньги или отправит
                  замену.
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Exceptions */}
      <section className="py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <AlertCircle className="h-8 w-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-bold">5. Исключения</h2>
          </div>
          <Card>
            <CardContent className="p-8">
              <p className="text-justify leading-relaxed text-muted-foreground">
                Товары надлежащего качества, изготовленные на заказ, или
                относящиеся к категории личной гигиены, возврату не подлежат.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Refund Terms */}
      <section className="py-4 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="h-8 w-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-bold">
              6. Сроки возврата средств
            </h2>
          </div>
          <Card>
            <CardContent className="p-8">
              <p className="text-justify leading-relaxed text-muted-foreground">
                Денежные средства возвращаются в течение 10 рабочих дней после
                получения и проверки возвращенного товара.
              </p>
            </CardContent>
          </Card>
          <p className="text-2xl text-muted-foreground mt-6">
            По вопросам гарантии и возврата обращайтесь в службу поддержки.
          </p>
        </div>
      </section>
    </div>
  );
};

export default GuaranteesComponent;
