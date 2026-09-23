import Link from "next/link";

export default function PopularNaborVru() {
  const dataCategory = [
    {
      name: "ВРУ 250А 1 ввод",
      slug: "vvodno-raspredelitelnye-ustrojstva-vru-63a-s-avr",
    },
    {
      name: "ВРУ 630А 2 ввода",
      slug: "vvodno-raspredelitelnye-ustrojstva-vru-630a-2-vvoda",
    },
    {
      name: "ВРУ 400А с АВР",
      slug: "vvodno-raspredelitelnye-ustrojstva-vru-400a-s-avr",
    },
    {
      name: "ВРУ 63А с АВР",
      slug: "vvodno-raspredelitelnye-ustrojstva-vru-63a-s-avr",
    },
    {
      name: "ВРУ 400А 1 ввод",
      slug: "vvodno-raspredelitelnye-ustrojstva-vru-400a-1-vvod",
    },
    {
      name: "ВРУ 250А с АВР",
      slug: "vvodno-raspredelitelnye-ustrojstva-vru-250a-s-avr",
    },
    {
      name: "ВРУ 400А 2 ввода",
      slug: "vvodno-raspredelitelnye-ustrojstva-vru-400a-2-vvoda",
    },
    {
      name: "ВРУ 630А с АВР",
      slug: "vvodno-raspredelitelnye-ustrojstva-vru-630a-s-avr",
    },
    {
      name: "ВРУ 500А",
      slug: "vvodno-raspredelitelnye-ustrojstva-vru-500a",
    },
    {
      name: "ВРУ 800А 2 ввода",
      slug: "vvodno-raspredelitelnye-ustrojstva-vru-800a-2-vvoda",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="pb-6 md:pb-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-center text-text pb-6 md:pb-8">
          Популярные подборки
        </h3>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {dataCategory.map((subcategory) => (
            <li
              key={subcategory.name}
              className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                href={`/catalog/${subcategory.slug}`}
                className="flex items-center justify-center p-3 sm:p-2 md:py-2 h-full text-center"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-medium text-text hover:text-accent transition-colors leading-snug">
                  {subcategory.name}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
