import Link from "next/link";

export default function Subcategories({ subcategories }) {
    if (!subcategories || subcategories.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Подкатегории
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategories.map(subcategory => (
                    <li
                        key={subcategory.id}
                        className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white"
                    >
                        <Link
                            href={`/catalog/${subcategory.slug}`}
                            className="block p-4"
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
}
