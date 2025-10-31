import { Roboto, Roboto_Mono } from "next/font/google";

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="ru"
      className={`${roboto.variable} ${robotoMono.variable} antialiased`}
    >
      <body className="bg-white dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
