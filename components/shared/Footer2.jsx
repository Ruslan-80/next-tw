import Image from "next/image";
import Logo from "../../public/mainLogo.svg";
import Link from "next/link";
import { Mail, Phone, MapPin, Youtube } from "lucide-react";

export default function Footer() {
  const catalogLinks = [
    {
      name: "Щиты и устройства этажные",
      href: "/catalog/schity-etazhnye-i-ustroystva-podezdnye",
    },
    {
      name: "Накладки щитов ЩЭ",
      href: "/catalog/nakladki-shitov-etazhnyh-she",
    },
    { name: "Устройства модульные", href: "/catalog/ustroystva-etazhnye" },
    {
      name: "Корпуса ВРУ",
      href: "/catalog/vvodno-raspredelitelnye-ustrojstva-vru",
    },
    { name: "Акции", href: "/promotions", highlight: true },
  ];

  const customerLinks = [
    { name: "Доставка и оплата", href: "/delivery" },
    { name: "Гарантии и возврат", href: "/guarantees" },
    { name: "Бонусная программа", href: "/promotions" },
    { name: "Вопросы и ответы", href: "/faq" },
    { name: "Наши объекты", href: "/objects" },
    { name: "Контакты", href: "/contacts" },
  ];

  return (
    <footer
      className="bg-foreground text-textW pt-20 pb-10 border-t border-foreground"
      itemScope
      itemType="https://schema.org/Store"
    >
      <meta itemProp="name" content="ЭЛЕКТРОЩИТ-ПРО" />
      <meta itemProp="priceRange" content="От 1000 до 50000 рублей" />
      <meta
        itemProp="image"
        content="https://electroshit-pro.ru/mainLogo.svg"
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Блок 1: Бренд и концепт (4 колонки) */}
          <div className="lg:col-span-4 space-y-8">
            <Link
              href="/"
              className="inline-block opacity-90 hover:opacity-100 transition-opacity"
            >
              <Image
                src={Logo}
                alt="Электрощит-ПРО"
                className="h-10 w-auto brightness-0 invert" // Делаем лого белым для премиальности
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
              Инженерные решения высшего класса. Комплексные поставки
              электротехнического оборудования для объектов любой сложности.
            </p>
            <div className="flex gap-4">
              <a
                href="https://youtube.com/@electroshit-pro"
                className="p-3 rounded-full border border-slate-800 hover:border-slate-400 transition-colors"
              >
                <Youtube size={18} />
              </a>
              {/* Другие соцсети в том же стиле */}
            </div>
          </div>

          {/* Блок 2: Навигация (2 колонки) */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-8">
              Каталог
            </h3>
            <ul className="space-y-4">
              {catalogLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-slate-300 hover:text-white transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Блок 3: Покупателям (2 колонки) */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-8">
              Сервис
            </h3>
            <ul className="space-y-4">
              {customerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-slate-300 hover:text-white transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Блок 4: Контакты (4 колонки) */}
          <div className="lg:col-span-4 bg-slate-900/40 p-8 rounded-3xl border border-slate-800/50">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-backgroundAlt mb-8">
              Связь с инженером
            </h3>
            <div className="space-y-6">
              <a href="tel:+74993901467" className="block group">
                <p className="text-[10px] text-slate-500 uppercase mb-1">
                  Москва
                </p>
                <p className="text-xl font-light group-hover:text-blue-400 transition-colors">
                  +7 (499) 390-14-67
                </p>
              </a>
              <a href="mailto:info@electroshit-pro.ru" className="block group">
                <p className="text-[10px] text-slate-500 uppercase mb-1">
                  Email
                </p>
                <p className="text-lg font-light group-hover:text-blue-400 transition-colors">
                  info@electroshit-pro.ru
                </p>
              </a>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                  Чермянская ул., д. 1, стр. 1<br />
                  Пн — Пт: 09:00 — 18:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя панель (Legal) */}
        <div className="pt-10 border-t border-slate-900 flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="max-w-2xl">
            <p className="text-[10px] text-slate-600 leading-relaxed uppercase tracking-widest mb-4">
              © 2026 ElectroShit-PRO. Engineered Perfection.
            </p>
            <p className="text-[10px] text-slate-600 leading-relaxed">
              Сайт носит информационный характер. Все права защищены. Отправляя
              форму, вы соглашаетесь с{" "}
              <Link
                href="/privacy"
                className="underline hover:text-white transition-colors"
              >
                политикой конфиденциальности
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-medium text-slate-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
