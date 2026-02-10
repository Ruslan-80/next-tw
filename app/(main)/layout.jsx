import Script from "next/script";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { CompareProvider } from "@/context/CompareContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import MetricsInitializer from "@/components/MetricsInitializer";
// import CookieBanner from "@/components/CookieBanner";

import "../../styles/globals.css";

export const metadata = {
  title: "ЭЛЕКТРОЩИТ-ПРО — Главная",
  description: "Производство и сборка электрощитового оборудования.",
};

export default function MainLayout({ children }) {
  return (
    <>
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
      <MetricsInitializer />
      {/* <CookieBanner /> */}
    </>
  );
}
