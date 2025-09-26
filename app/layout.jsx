import JsonLd from "@/components/JsonLdComponent";
import getOrganizationJsonLd from "@/lib/organizationJsonLd";

export default function RootLayout({ children }) {
  const organizationJsonLd = getOrganizationJsonLd();
  return (
    <html lang="ru">
      <body>
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  );
}
