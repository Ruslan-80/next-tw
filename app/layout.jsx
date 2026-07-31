import { ThemeProvider } from "@/components/theme-provider";
import GoogleTag from "@/components/GoogleTag";
import { Roboto, Roboto_Mono } from "next/font/google";
import Script from "next/script";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "300", "400", "500", "700"],
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
      suppressHydrationWarning
      className={`${roboto.variable} ${robotoMono.variable} antialiased`}
      // data-theme="dark"
    >
      {/* <head>
        <GoogleTag />
      </head> */}

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
