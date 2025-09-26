import { Roboto, Roboto_Mono } from "next/font/google";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import { CompareProvider } from "../../context/CompareContext";
import { FavoritesProvider } from "../../context/FavoritesContext";

import "../../styles/globals.css";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export default function MainLayout({ children }) {
  return (
    <div
      lang="ru"
      className={`${roboto.variable} ${robotoMono.variable} antialiased`}
    >
      <CompareProvider>
        <FavoritesProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <div style={{ flex: 1 }}>{children}</div>
            <Footer />
          </div>
        </FavoritesProvider>
      </CompareProvider>
    </div>
  );
}
