export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/prisma/client";
import { UniversalTable } from "@/components/shared/Tables";

export default async function CategoriesPageAdmin() {
  let categories = [];
  try {
    categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <div className="p-4 mx-auto w-full">
      <h1 className="text-2xl font-bold mb-4">Категории</h1>
      <Link
        href="/admin/categories/create"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Создать новую категорию
      </Link>
      <UniversalTable data={categories} caption="Список категорий" />
    </div>
  );
}
