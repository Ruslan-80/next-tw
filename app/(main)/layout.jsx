import Script from "next/script";
import YandexMetrika from "./YandexMetrika";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import { CompareProvider } from "../../context/CompareContext";
import { FavoritesProvider } from "../../context/FavoritesContext";

import "../../styles/globals.css";

export const metadata = {
  title: "ЭЛЕКТРОЩИТ-ПРО — Главная",
  description: "Производство и сборка электрощитового оборудования.",
};

export default function MainLayout({ children }) {
  return (
    <>
      {/* Скрипт Яндекс.Метрики с задержкой 3 секунды */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          setTimeout(() => {
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) return;
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

            ym(104651483, 'init', {
                webvisor:true,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                ecommerce:"dataLayer"
            });
          }, 3000);
        `}
      </Script>

      {/* noscript для пользователей без JS */}
      <noscript>
        <img
          src="https://mc.yandex.ru/watch/104651483"
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </noscript>

      {/* Оборачиваем всё в провайдеры */}
      <CompareProvider>
        <FavoritesProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </FavoritesProvider>
      </CompareProvider>

      {/* SPA-трекинг переходов */}
      <YandexMetrika />
    </>
  );
}
