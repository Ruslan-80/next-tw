import Link from "next/link";
import { prisma } from "@/prisma/client";
import { UniversalTable } from "@/components/shared/Tables";

export default async function ProductsPageAdmin() {
    const attributes = await prisma.attribute.findMany({
        orderBy: { id: "asc" },
    });
    return (
        <div className="p-4 mx-auto w-full">
            <h1 className="text-2xl font-bold mb-4">Товары</h1>
            <Link
                href="/products/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Создать новую характеристику
            </Link>
            <UniversalTable data={attributes} caption="Список характеристик" />
        </div>
    );
}
