import Link from "next/link";
import ComponentsFAQ from "./components";
import FAQPageJSONLD from "@/lib/faqshityJsonLd";
import JsonLd from "@/components/JsonLdComponent";

export const metadata = {
  title: "Вопросы и ответы | ЭЛЕКТРОЩИТ-ПРО",
  description: "Вопросы и ответы",
};

export default function FAQ() {
  // const FaqJsonLd = FAQPageJSONLD();
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
            <span className="font-medium text-gray-900 truncate">
              Часто задаваемые вопросы (FAQ)
            </span>
          </li>
        </ol>
      </nav>
      <ComponentsFAQ />
    </>
  );
}
