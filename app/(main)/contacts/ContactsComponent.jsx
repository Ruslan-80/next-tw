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

  // Данные компании
  const details = [
    { name: "Название компании", value: 'ООО "Капитал Строй"' },
    { name: "ИНН", value: "7725361494" },
    { name: "КПП", value: "772501001" },
    { name: "ОГРН", value: "1177746248008" },
    {
      name: "Юридический адрес",
      value: "115191, г. Москва, ул. Б. Тульская, дом № 2",
    },
    {
      name: "Фактический адрес",
      value: "127282, Москва, Чермянская улица, 1, стр. 1",
    },
    {
      name: "Наименование банка",
      value: 'МОСКОВСКИЙ ФИЛИАЛ АО КБ "МОДУЛЬБАНК"',
    },
    { name: "Расчетный счет", value: "40702810870010018082" },
    { name: "БИК банка", value: "044525092" },
    { name: "Корреспонденский счет", value: "30101810645250000092" },
    { name: "Email", value: "info@electroshit-pro.ru" },
    { name: "Телефон", value: "+7 (499) 390-14-67" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-10 text-2xl mt-4">
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
      {/* <section className="bg-gray-50 dark:bg-gray-900 py-10 px-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Реквизиты компании</h2>
        <div className="flex items-center text-lg">
          <span className="font-semibold">Название компании</span>

          <span className="flex-1 mx-3 border-b border-dotted border-gray-400"></span>

          <span>ООО «Ромашка»</span>
        </div>
      </section> */}
      <section className="container mx-auto  lg:px-4 py-8 md:py-12">
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
          Реквизиты компании
        </h2>

        <div className="bg-secondary/30 shadow-lg rounded-xl p-2 lg:p-8">
          <dl className="space-y-4">
            {details.map((item, index) => (
              <div
                key={index}
                // Используем flexbox для размещения элементов в строку
                className="flex flex-col lg:flex-row items-baseline text-xl font-medium text-gray-700"
              >
                {/* Левый элемент (Название) */}
                <dt className="text-sm lg:text-xl shrink-0 pr-2">
                  {item.name}
                </dt>

                {/* Пространство, заполненное точками */}
                <span
                  // flex-grow позволяет элементу заполнить все доступное пространство
                  // relative и z-10 нужны для позиционирования псевдоэлементов,
                  // но в данном случае проще использовать border-b
                  className="flex-grow border-b border-dotted border-gray-400 mx-1 mb-1"
                >
                  {/* Вместо span с border-b, который может быть неровным, 
                    для точек лучше использовать стилизованный div или псевдоэлементы.
                    Однако, для простоты и совместимости с Tailwind, 
                    border-dotted является самым быстрым способом.
                    
                    Если нужен более точный эффект точек, можно использовать:
                    className="flex-grow overflow-hidden whitespace-nowrap"
                    style={{ letterSpacing: '4px' }}
                */}
                </span>

                {/* Правый элемент (Значение) */}
                <dd className="text-sm lg:text-xl shrink-0 lg:pl-2 text-left lg:text-right font-semibold text-gray-900">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="text-center mt-8">
          <Link
            // Ссылка на файл в папке public
            href="/docs/kapital_stroy.pdf"
            // Атрибут download заставляет браузер скачать файл, а не открыть его
            download
            // Стиль Tailwind: синяя кнопка с тенью
            className="inline-flex items-center justify-center px-8 py-3 
                     border border-transparent text-base font-medium rounded-md 
                     text-white bg-blue-600 shadow-lg 
                     hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Скачать реквизиты в формате PDF
          </Link>
        </div>
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
