import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Статьи — Электрощитовое оборудование",
  description:
    "Полезные статьи и советы по сборке и выбору электрооборудования",
};

export default async function BlogsList() {
  const postsDir = path.join(process.cwd(), "app/(main)/blogs/posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".jsx"));

  // Загружаем все статьи динамически
  const posts = await Promise.all(
    files.map(async (file) => {
      const module = await import(`./posts/${file}`);
      const slug = file.replace(".jsx", "");

      return {
        slug,
        title: module.metadata?.title || "Без названия",
        date: module.metadata?.date || "",
        excerpt: module.metadata?.description || "",
        image: module.metadata?.image || "/images/blog-placeholder.jpg", // можно добавить в metadata
        href: `/blogs/${slug}`,
      };
    }),
  );

  // Сортировка по дате (если есть)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main id="main-content" role="main">
      {/* Breadcrumbs */}
      <section className="sticky top-0 z-50 border-b border-gray-200 bg-gray-100/95 backdrop-blur supports-[backdrop-filter]:bg-gray-100/60">
        <nav
          className="container mx-auto px-6 py-2 text-sm text-gray-600"
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

      <div className="container mx-auto px-6 py-4">
        {/* Header */}
        <section className="py-6">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold">Статьи</h1>

            <div className="flex gap-3 pt-2">
              {/* Здесь можно добавить категории или фильтры */}
            </div>
          </div>
        </section>

        {/* Posts grid */}
        <section aria-label="blog posts">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white shadow-sm border rounded-2xl overflow-hidden flex flex-col"
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
                  {post.date && (
                    <time
                      className="text-xs text-gray-500 mb-2"
                      itemProp="datePublished"
                    >
                      {post.date}
                    </time>
                  )}

                  <h3 className="text-lg font-medium mb-2" itemProp="headline">
                    <Link href={post.href} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>

                  <p
                    className="text-sm text-gray-600 mb-4 flex-1"
                    itemProp="description"
                  >
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
      </div>
    </main>
  );
}
