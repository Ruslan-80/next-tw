import JsonLd from "@/components/JsonLdComponent";
import getOrganizationJsonLd from "@/lib/organizationJsonLd";

export default function RootLayout({ children }) {
  const organizationJsonLd = getOrganizationJsonLd();
  return (
    <html lang="ru">
      <body className="bg-white dark:bg-gray-900 dark:text-white">
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  );
}
