import { Roboto, Roboto_Mono } from "next/font/google";
import JsonLd from "@/components/JsonLdComponent";
import getOrganizationJsonLd from "@/lib/organizationJsonLd";

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
  const organizationJsonLd = getOrganizationJsonLd();
  return (
    <html
      lang="ru"
      className={`${roboto.variable} ${robotoMono.variable} antialiased`}
    >
      <body className="bg-white dark:bg-gray-900 dark:text-white">
        <JsonLd data={organizationJsonLd} script_name="organization-jsonld" />

        {children}
      </body>
    </html>
  );
}
