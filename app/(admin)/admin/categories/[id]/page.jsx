import { prisma } from "@/prisma/client";
import Link from "next/link";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { id: "asc" },
    });
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            <Link
                href="/admin/categories/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Create New Category
            </Link>
            <ul className="mt-6 space-y-3">
                {categories.map(cat => (
                    <li key={cat.id}>
                        <Link
                            href={`/admin/categories/${cat.id}`}
                            className="text-blue-500 hover:underline"
                        >
                            {cat.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
