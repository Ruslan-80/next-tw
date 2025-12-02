import Link from "next/link";
import ContactsComponent from "./ContactsComponent";

export const metadata = {
  title: "Контакты | ЭЛЕКТРОЩИТ-ПРО",
  description:
    "Свяжитесь с нами для получения дополнительной информации или поддержки.",
};

export default function FAQ() {
  return (
    <>
      {/* <JsonLd data={FaqJsonLd} /> */}
      <nav className="container mx-auto py-4">
        <ol className="hidden md:flex flex-wrap items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/">Главная</Link>
          </li>

          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-900 truncate">Контакты</span>
          </li>
        </ol>
      </nav>
      <ContactsComponent />
    </>
  );
}
