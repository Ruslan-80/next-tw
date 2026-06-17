import Image from "next/image";
import Link from "next/link";

export default function Subcategories({ subcategories }) {
  if (!subcategories || subcategories.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-metal animate-metal py-8">
      <div className="container mx-auto">
        {/* <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        Подкатегории
      </h3> */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subcategories.map((subcategory) => (
            <li
              key={subcategory.id}
              className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                href={`/catalog/${subcategory.slug}`}
                className="flex items-center gap-4 p-4"
              >
                {subcategory.imageUrl && (
                  // Проверяем наличие imageUrl перед использованием
                  <Image
                    src={subcategory.imageUrl}
                    alt={subcategory.name}
                    width={156}
                    height={156}
                    className="w-14 h-14 object-contain hover:scale-115 transition-transform transform duration-300"
                  />
                )}
                <h3 className="text-lg font-medium text-text hover:text-accent transition-colors">
                  {subcategory.name}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
