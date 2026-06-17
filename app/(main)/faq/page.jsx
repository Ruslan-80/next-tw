import Link from "next/link";
import ComponentsFAQ from "./components";

export const metadata = {
  title: "Вопросы и ответы | ЭЛЕКТРОЩИТ-ПРО",
  description:
    "Вопросы и ответы на часто задаваемые вопросы о нашей продукции и услугах.",
};

export default function FAQ() {
  // const FaqJsonLd = FAQPageJSONLD();
  return (
    <>
      {/* <JsonLd data={FaqJsonLd} /> */}
      <nav className="container mx-auto py-4">
        <ol className="hidden md:flex flex-wrap items-center space-x-2 text-sm text-text">
          <li>
            <Link href="/">Главная</Link>
          </li>

          <li className="flex items-center space-x-2">
            <span className="text-text">/</span>
            <span className="font-medium text-text truncate">
              Часто задаваемые вопросы (FAQ)
            </span>
          </li>
        </ol>
      </nav>
      <ComponentsFAQ />
    </>
  );
}
