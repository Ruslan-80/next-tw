import Link from "next/link";
import { prisma } from "@/prisma/client";
import { UniversalTable } from "@/components/shared/Tables";
import { Button } from "@/components/ui/button";
import SyncVariationsButton from "@/components/SyncVariationsButton";

export default async function ProductsPageAdmin() {
    const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

    return (
        <div className="p-4 mx-auto w-full">
            <h1 className="text-2xl font-bold mb-4">Товары</h1>
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/products/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Создать новый товар
                </Link>
                <SyncVariationsButton />
            </div>
            <UniversalTable data={products} caption="Список товаров" />
        </div>
    );
}
