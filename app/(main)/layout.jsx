import Script from "next/script";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import BottomNavigation from "@/components/shared/BottomNavigation";
import { CompareProvider } from "@/context/CompareContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import MetricsInitializer from "@/components/MetricsInitializer";
import MobileSearch from "@/components/shared/MobileSearch";
import CookieBanner from "@/components/CookieBanner";

import "../../styles/globals2.css";

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
            <div className="hidden md:block">
              <Header />
            </div>
            <div className="md:hidden">
              <MobileSearch />
            </div>

            <main className="flex-1 pt-[60px] md:pt-0">{children}</main>
            <Footer />
            <div className="block md:hidden">
              <BottomNavigation />
            </div>
          </div>
        </FavoritesProvider>
      </CompareProvider>
      <MetricsInitializer />
      <CookieBanner />
    </>
  );
}
