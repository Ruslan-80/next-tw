import Image from "next/image";
import Logo from "@/public/mainLogo.svg";
import Link from "next/link";
import { Mail, Phone, MapPin, Youtube } from "lucide-react";
import FooterSubscribeForm from "./FooterSubscribeForm"; // или укажите правильный путь

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
            <Link href="/" className="flex-shrink-1">
              <span className="font-bold text-3xl text-text">
                ЭЛЕКТРОЩИТ-PRO
              </span>
            </Link>
            <p className="my-4 text-xs md:text-sm">
              Комплексные поставки электротехнических щитов и оборудования для
              жилых и коммерческих объектов.
            </p>

            <div className="space-y-2 text-sm">
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
                <MapPin
                  size={16}
                  className="text-gray-400 mt-1 flex-shrink-0"
                />
                <span>Режим работы: Пн-Пт 9:00 - 18:00</span>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <div
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                  className="flex items-start gap-2"
                >
                  <MapPin
                    size={16}
                    className="text-gray-400 mt-1 flex-shrink-0"
                  />
                  <span>
                    <span itemProp="addressLocality">г. Москва</span>,{" "}
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
            <ul className="space-y-2 text-sm">
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
                  Щиты ВРУ
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
            <ul className="space-y-2 text-sm">
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
            <p className="mb-4 text-sm">Подпишитесь на новости и акции</p>

            {/* Вставляем интерактивный компонент формы */}
            <FooterSubscribeForm />

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 border-b border-accent/40 pb-2">
                Социальные сети
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.youtube.com/@electroshit-pro/shorts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя панель */}
      <div className="mt-auto border-t border-accent/40 pt-6 pb-8">
        <div className="container mx-auto px-4 space-y-6">
          {/* Информационные дисклеймеры */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
            <p className="leading-relaxed">
              Сайт носит информационный характер и не является публичной
              офертой. Стоимость товаров и их наличие не гарантируются.
            </p>

            <p className="leading-relaxed">
              Отправляя свой запрос на адреса электронной почты{" "}
              <a
                href="mailto:sale@electroshit-pro.ru"
                className="text-gray-400 hover:text-text transition-colors underline"
              >
                sale@electroshit-pro.ru
              </a>{" "}
              и{" "}
              <a
                href="mailto:info@electroshit-pro.ru"
                className="text-gray-400 hover:text-text transition-colors underline"
              >
                info@electroshit-pro.ru
              </a>{" "}
              (в случае заказа на сайте), Вы даете свое согласие на обработку
              персональных данных, файлов cookie и рассылку информационных,
              рекламных и новостных сообщений, согласно{" "}
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-text transition-colors underline rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                политике конфиденциальности и обработки персональных данных.
              </Link>
            </p>
          </div>

          {/* Нижний блок: Копирайт и юридические ссылки */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} ElectroShit-PRO. Все права защищены.
            </p>

            <nav
              aria-label="Юридическая информация"
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              <Link
                href="/privacy"
                className="hover:text-text transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/terms"
                className="hover:text-text transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                Пользовательское соглашение
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
