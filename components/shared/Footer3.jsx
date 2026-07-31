import Image from "next/image";
import Logo from "@/public/mainLogo.svg";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Vk,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-card text-foreground pt-12 pb-6 text-sm lg:text-xl border-t border-t-accent/40"
      itemScope
      itemType="https://schema.org/Store"
    >
      <meta itemProp="name" content="ЭЛЕКТРОЩИТ-ПРО" />
      <meta itemProp="telephone" content="+74993901467" />
      <meta itemProp="priceRange" content="1000-50000 RUB" />

      <meta
        itemProp="image"
        content="https://electroshit-pro.ru/mainLogo.svg"
      />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Лого и контакты */}
          <div>
            {/* <Link href="/">
              <Image
                src={Logo}
                // width={200}
                // height={80}
                alt="Электрощит-ПРО"
                // className="h-12 w-auto mb-4 bg-white px-4 rounded-lg"
                className="mb-4 card-machined"
              />
            </Link> */}
            <Link href="/" className="flex-shrink-1 ">
              {" "}
              <span className="font-bold text-3xl text-text">
                ЭЛЕКТРОЩИТ-PRO
              </span>{" "}
            </Link>
            <p className="my-4 text-xs md:text-sm">
              Комплексные поставки электротехнических щитов и оборудования для
              жилых и коммерческих объектов.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <a
                  itemProp="telephone"
                  href="tel:+74993901467"
                  className="hover:text-text transition-colors"
                >
                  +7 (499) 390-14-67
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <a
                  itemProp="telephone"
                  href="tel:+79262762415"
                  className="hover:text-text transition-colors"
                >
                  +7 (926) 276-24-15
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <a
                  itemProp="email"
                  href="mailto:info@electroshit-pro.ru"
                  className="hover:text-text transition-colors"
                >
                  info@electroshit-pro.ru
                </a>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <span className="">Режим работы: Пн-Пт 9:00 - 18:00</span>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <div
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                  className="flex items-start gap-2 mt-3"
                >
                  <MapPin size={16} className="text-gray-400 mt-1" />
                  <span className="">
                    <span itemProp="addressLocality">г. Москва</span>,
                    <span itemProp="streetAddress">улица Чермянская, 1с1</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="text-accent text-xl font-semibold mb-4 border-b border-accent/40 pb-2">
              Каталог
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/catalog/schity-etazhnye-i-ustroystva-podezdnye"
                  className="hover:text-accent transition-colors"
                >
                  Щиты и устройства этажные
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/nakladki-shitov-etazhnyh-she"
                  className="hover:text-accent transition-colors"
                >
                  Накладки щитов этажных ЩЭ
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/ustroystva-etazhnye"
                  className="hover:text-accent transition-colors"
                >
                  Устройства модульные
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru"
                  className="hover:text-accent transition-colors"
                >
                  Корпуса ВРУ
                </Link>
              </li>
              <li>
                <Link
                  href="/promotions"
                  className="text-accent hover:text-accentHover transition-colors font-medium"
                >
                  Акции
                </Link>
              </li>
            </ul>
          </div>

          {/* Покупателям */}
          <div>
            <h3 className="text-accent text-lg font-semibold mb-4 border-b border-accent/40 pb-2">
              Покупателям
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/delivery"
                  className="hover:text-accent transition-colors"
                >
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link
                  href="/guarantees"
                  className="hover:text-accent transition-colors"
                >
                  Гарантии и возврат
                </Link>
              </li>
              <li>
                <Link
                  href="/promotions"
                  className="hover:text-accent transition-colors"
                >
                  Бонусная программа
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-accent transition-colors"
                >
                  Вопросы и ответы
                </Link>
              </li>
              <li>
                <Link
                  href="/objects"
                  className="hover:text-accent transition-colors"
                >
                  Наши объекты
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="hover:text-accent transition-colors"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Соцсети и подписка */}
          <div>
            <h3 className="text-accent text-xl font-semibold mb-4 border-b border-accent/40 pb-2">
              Подписка
            </h3>
            <p className="mb-4">Подпишитесь на новости и акции</p>
            <form className="flex mb-6" id="footer_form" name="footer_form">
              <input
                id="footer_email"
                type="email"
                placeholder="Ваш email"
                className="bg-card rounded-l-lg px-4 py-2 w-full focus:outline-none focus:primaryLight"
              />
              <button id="footer_submit" type="submit" className="btn-gold">
                OK
              </button>
            </form>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 border-b border-accent/40 pb-2">
                Социальные сети
              </h3>
              <div className="flex space-x-4">
                {/* <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <Twitter size={20} />
                </a> */}
                <a
                  href="https://www.youtube.com/@electroshit-pro/shorts"
                  className="bg-background p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя панель */}
        <div className="pt-6 border-t border-accent/40 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2026 ElectroShit-PRO. Все права защищены.
          </div>
          <div className="flex flex-col text-justify px-4">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              Сайт носит информационный характер и не является публичной
              офертой. Стоимость товаров и их наличие не гарантируются.
            </div>
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              Отправляя свой запрос на адреса электронной почты
              sale@electroshit-pro.ru и info@electroshit-pro.ru (в случае заказа
              на сайте), Вы даете свое согласие на обработку персональных
              данных, файлов cookie и рассылку информационных, рекламных и
              новостных сообщений, согласно{" "}
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                политике конфиденциальности и обработки персональных данных.
              </Link>{" "}
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-x-6">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
