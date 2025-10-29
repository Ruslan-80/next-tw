import Link from "next/link";

export default function PopularNabor({ excludeSlug }) {
  const dataCategory = [
    {
      name: "Щиты этажные ЩЭ без окон",
      slug: "shity-etazhnye-she-bez-okon",
    },
    {
      name: "Щиты этажные ЩЭ 1",
      slug: "shity-etazhnye-she-na-1-kvartiry",
    },
    {
      name: "Щиты этажные ЩЭ 2",
      slug: "shity-etazhnye-she-na-2-kvartiry",
    },
    {
      name: "Щиты этажные ЩЭ 3",
      slug: "shity-etazhnye-she-na-3-kvartiry",
    },
    {
      name: "Щиты этажные ЩЭ 4",
      slug: "shity-etazhnye-she-na-4-kvartiry",
    },
    {
      name: "Щиты этажные ЩЭ 5",
      slug: "shity-etazhnye-she-na-5-kvartir",
    },
    {
      name: "Щиты этажные ЩЭ 6",
      slug: "shity-etazhnye-she-na-6-kvartir",
    },
    {
      name: "Щиты этажные ЩЭ 7",
      slug: "shity-etazhnye-she-na-7-kvartir",
    },
    {
      name: "Щиты этажные ЩЭ 8",
      slug: "shity-etazhnye-she-na-8-kvartir",
    },
    {
      name: "Щиты этажные ЩЭ 9",
      slug: "shity-etazhnye-she-na-9-kvartir",
    },
    {
      name: "Щиты этажные ЩЭ 10",
      slug: "shity-etazhnye-she-na-10-kvartir",
    },
    {
      name: "Щиты этажные ЩЭ 12",
      slug: "shity-etazhnye-she-na-12-kvartir",
    },
    {
      name: "Щиты этажные ЩЭ встраиваемые",
      slug: "shity-etazhnye-she-vstraivaemye",
    },
    {
      name: "Щиты этажные ЩЭ накладные",
      slug: "shity-etazhnye-she-nakladnye",
    },
    {
      name: "Щиты ЩЭ со слаботочным отсеком",
      slug: "shity-etazhnye-she-so-slabotochnym-otsekom",
    },
    {
      name: "Кожух ЩЭ",
      slug: "kozhuh-she-dlya-etazhnogo-shita",
    },
  ];

  if (dataCategory.some((item) => item.slug === excludeSlug)) {
    return (
      <div className="mb-8 mt-8">
        <h3 className="text-2xl font-semibold text-gray-600 mb-8">
          Популярные подборки
        </h3>
        <ul className="flex flex-wrap justify-center gap-4">
          {dataCategory
            .filter((subcategory) => subcategory.slug !== excludeSlug)
            .map((subcategory) => (
              <li
                key={subcategory.name}
                className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-gray-100"
              >
                <Link
                  href={`/catalog/${subcategory.slug}`}
                  className="flex items-center gap-2 p-2"
                >
                  <h3 className="text-lg font-medium text-gray-900 hover:text-orange-400 transition-colors">
                    {subcategory.name}
                  </h3>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}
