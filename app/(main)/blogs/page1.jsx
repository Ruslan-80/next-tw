import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Блог — Электрощитовое оборудование",
  description: "Статьи и советы по сборке и выбору электрооборудования",
};

export default function BlogSection({ posts = [] }) {
  // posts: [{ id, href, title, excerpt, date, image }]
  const sample = [
    {
      id: 1,
      href: "/blogs/shchit-etazhnyy-shche-rasklyuchenie-montazh",
      title:
        "Щит этажный ЩЭ: расключение, монтаж и выбор — полное руководство 2025",
      excerpt:
        "Щит этажный (ЩЭ) является критически важным элементом электроснабжения многоквартирных домов, обеспечивающим безопасное...",
      date: "01 ноября 2025",
      image: "/images/categories/SE24L.png",
    },
    {
      id: 2,
      href: "#",
      title: "Google отменила работу над Pixel Tablet 3",
      excerpt:
        "В сети появилась информация, что Google отменила разработку планшета Pixel Tablet 3, релиз...",
      date: "24 ноября 2024",
      image:
        "/wa-data/public/blog/ewblogpimg/8/1/snapedit_173217787525567428996d286e2.53970357_640x400.png",
    },
    {
      id: 3,
      href: "#",
      title: "Sony обновила PlayStation Portal",
      excerpt:
        "Если раньше все ругали PlayStation Portal за ограниченный функционал, то теперь вы сможете...",
      date: "24 ноября 2024",
      image:
        "/wa-data/public/blog/ewblogpimg/7/1/17321786842156742894a479d07.63332582_640x400.jpg",
    },
  ];

  const items = posts.length ? posts : sample;

  return (
    <main id="main-content" role="main" className="container mx-auto px-4">
      {/* Breadcrumbs */}
      <section className="py-4">
        <nav
          className="text-sm text-gray-600"
          itemScope
          itemType="http://schema.org/BreadcrumbList"
        >
          <ol className="flex gap-2 items-center">
            <li
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <Link href="/" itemProp="item" className="hover:underline">
                <span itemProp="name">Главная</span>
              </Link>
              <meta itemProp="position" content="1" />
              <span className="mx-2">/</span>
            </li>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <span itemProp="name" className="text-gray-800">
                Статьи
              </span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </section>

      {/* Header */}
      <section className="py-6">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">Статьи</h1>

          <div className="flex gap-3 pt-2">
            {/* <Link
              href="#"
              className="text-sm rounded-full py-1 px-3 border border-gray-200 hover:bg-gray-50"
            >
              Наши новости
            </Link>
            <Link
              href="#"
              className="text-sm rounded-full py-1 px-3 border border-gray-200 hover:bg-gray-50"
            >
              Статьи
            </Link> */}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section aria-label="blog posts">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((post) => (
            <article
              key={post.id}
              className="bg-white shadow-sm border  rounded-2xl overflow-hidden flex flex-col"
              itemScope
              itemType="http://schema.org/BlogPosting"
            >
              <Link href={post.href} className="block relative w-full">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "62.5%" }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain rounded-2xl transition-transform duration-300 hover:scale-105 p-2"
                  />
                </div>
              </Link>

              <div className="p-4 flex-1 flex flex-col">
                <time className="text-xs text-gray-500 mb-2">{post.date}</time>
                <h3 className="text-lg font-medium mb-2">
                  <Link href={post.href} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-sm text-gray-600 mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div className="mt-2">
                  <Link
                    href={post.href}
                    className="inline-flex items-center text-sm font-medium text-accent hover:underline"
                  >
                    Читать далее
                    <svg
                      className="ml-2"
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
