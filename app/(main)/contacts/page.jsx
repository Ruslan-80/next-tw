"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import useFormSubmit from "hooks/useFormSubmit";
import { useState } from "react";

const ContactsComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
    buttonId: "contact_form",
  });

  const [modalContent, setModalContent] = useState("");
  const { handleFormSubmit, error } = useFormSubmit();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      await handleFormSubmit(formData);
      setModalContent("Сообщение успешно отправлено!");
      setFormData({ name: "", contact: "", email: "", message: "" }); // очистка формы
    } catch (err) {
      console.error(err);
      setModalContent("Ошибка при отправке формы. Попробуйте позже.");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-10 text-2xl mt-4">
      {/* Хлебные крошки */}
      <nav className="py-4">
        <ol className="hidden md:flex flex-wrap items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/">Главная</Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-900 truncate">Контакты</span>
          </li>
        </ol>
      </nav>

      {/* Заголовок */}
      <section className="py-4 mt-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Контакты</h1>
        </div>
      </section>

      {/* Контактная информация */}
      <section className="py-4">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <Phone className="h-8 w-8 text-accent" />
              <CardTitle className="text-2xl">Телефон</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="tel:+74993901467" className="text-muted-foreground">
                +7 (499) 390-14-67
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <Mail className="h-8 w-8 text-accent" />
              <CardTitle className="text-2xl">Email</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href="mailto:info@electroshit-pro.ru"
                className="text-muted-foreground"
              >
                info@electroshit-pro.ru
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <MapPin className="h-8 w-8 text-accent" />
              <CardTitle className="text-2xl">Адрес</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                г. Москва, ул. Чермянская, дом 1с1
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Карта */}
      <section className="py-4 bg-secondary/30">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Карта</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: "600px",
              }}
            >
              {/* Ссылки, наложенные поверх карты */}
              <a
                href="https://yandex.ru/maps/org/elektroshchit_pro/43074692917/?utm_medium=mapframe&utm_source=maps"
                style={{
                  color: "#eee",
                  fontSize: "12px",
                  position: "absolute",
                  top: "0px",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Электрощит Pro
              </a>
              <a
                href="https://yandex.ru/maps/213/moscow/category/electrical_products/184107066/?utm_medium=mapframe&utm_source=maps"
                style={{
                  color: "#eee",
                  fontSize: "12px", // font-size -> fontSize
                  position: "absolute",
                  top: "14px",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Электротехническая продукция в Москве
              </a>
              <a
                href="https://yandex.ru/maps/213/moscow/category/lamps/184108003/?utm_medium=mapframe&utm_source=maps"
                style={{
                  color: "#eee",
                  fontSize: "12px",
                  position: "absolute",
                  top: "28px",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Светильники в Москве
              </a>

              {/* Iframe карты */}
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.634865%2C55.884479&mode=search&oid=43074692917&ol=biz&sctx=ZAAAAAgBEAAaKAoSCZ5eKcsQz0JAEdOgaB7A4EtAEhIJs3xdhv%2B0%2FT8RJezbSUR45D8iBgABAgMEBSgKOABAAUgBagJydZ0BzczMPaABAKgBAL0BJs0cq8IBBrXOzrugAYICG9GN0LvQtdC60YLRgNC%2B0YnQuNGCINCf0YDQvooCAJICBTk4NTg4mgIMZGVza3RvcC1tYXBz&sll=37.634865%2C55.884479&sspn=0.010458%2C0.004615&text=%D1%8D%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D1%89%D0%B8%D1%82%20%D0%9F%D1%80%D0%BE&z=17.11"
                width="100%"
                height="600"
                allowFullScreen={true}
                style={{ position: "relative" }}
                title="Яндекс Карта с местоположением"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Форма обратной связи */}
      <section className="py-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Форма обратной связи</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
                className={"hidden"}
              />
              <Input
                name="contact"
                placeholder="Ваше имя"
                value={formData.contact}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                placeholder="Сообщение"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button
                onClick={() => handleSubmit("Форма обратной связи")}
                type="submit"
                className="w-full"
              >
                <Send className="mr-2 h-4 w-4" /> Отправить
              </Button>
            </form>

            {modalContent && (
              <p className="mt-4 text-center text-lg text-muted-foreground">
                {modalContent}
              </p>
            )}
            {error && <p className="mt-2 text-center text-red-600">{error}</p>}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ContactsComponent;
