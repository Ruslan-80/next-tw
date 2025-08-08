import Image from "next/image";
import Logo from "@/public/mainLogo.svg";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Лого и контакты */}
          <div>
            <Link href="/">
              <Image
                src={Logo}
                alt="Kapital Stroy"
                className="h-12 w-auto mb-4"
              />
            </Link>
            <p className="text-gray-400 mb-4 text-sm">
              Комплексные поставки электротехнического оборудования и автоматики
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <a href="tel:+74993901467" className="hover:text-red-500 transition-colors">
                  +7 (499) 390-14-67
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <a href="tel:+79262762415" className="hover:text-red-500 transition-colors">
                  +7 (926) 276-24-15
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <a href="mailto:snab@kplstroy.ru" className="hover:text-red-500 transition-colors">
                  snab@kplstroy.ru
                </a>
              </div>
              <div className="flex items-start gap-2 mt-3">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <span className="text-gray-400">
                  г. Москва, улица Чермянская, дом 1, строение 1
                </span>
              </div>
            </div>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Каталог</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/catalog/shchity-i-etazhnye-ustroystva"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Щиты и устройства этажные
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/nakladki-shitov-etazhnyh-she"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Накладки щитов этажных ЩЭ
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/ustroystva-etazhnye"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Устройства модульные
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/vvodno-raspredelitelnye-ustrojstva-vru"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Корпуса ВРУ
                </Link>
              </li>
              <li>
                <Link
                  href="/promotions"
                  className="text-red-500 hover:text-red-400 transition-colors font-medium"
                >
                  Акции
                </Link>
              </li>
            </ul>
          </div>

          {/* Покупателям */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Покупателям</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/delivery"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link
                  href="/guarantees"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Гарантии и возврат
                </Link>
              </li>
              <li>
                <Link
                  href="/bonus"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Бонусная программа
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Вопросы и ответы
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Соцсети и подписка */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Подписка</h3>
            <p className="text-gray-400 mb-4">
              Подпишитесь на новости и акции
            </p>
            <form className="flex mb-6">
              <input
                type="email"
                placeholder="Ваш email"
                className="bg-gray-800 text-white rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white rounded-r-lg px-4 py-2 transition-colors"
              >
                OK
              </button>
            </form>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Социальные сети</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя панель */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Kapital Stroy. Все права защищены.
          </div>
          <div className="flex space-x-6">
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
