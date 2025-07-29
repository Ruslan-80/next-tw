import { prisma } from "@/prisma/client";
import Link from "next/link";
import { UniversalTable } from "@/components/shared/Tables";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/shared/DeleteButton";

// Серверное действие для удаления товара
async function deleteProduct(formData) {
  "use server";
  const id = parseInt(formData.get("id"));
  await prisma.product.delete({
    where: { id },
  });
  redirect("/products");
}
// Главная страница админки товаров
export default async function ProductsPageAdmin() {
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
    include: { category: true },
  });

  return (
    <div className="p-4 mx-auto w-full max-w-7xl">
      <h1 className="text-2xl font-bold mb-4">Товары</h1>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/products/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Создать новый товар
        </Link>
      </div>
      <UniversalTable
        data={products}
        caption="Список товаров"
        excludeKeys={["createdAt", "updatedAt", "descriptionSeo", "titleSeo"]}
        customHeaders={{
          id: "ID",
          name: "Название",
          article: "Артикул",
          slug: "Слаг",
          basePrice: "Цена",
          stock: "Запас",
          visibility: "Видимость",
          categoryId: "ID Категории",
          categorySlug: "Слаг категории",
          manufacturingTime: "Время производства",
        }}
        actions={(item) => (
          <div className="flex gap-2 text-blue-100 ">
            <Link
              href={`products/${item.id}`}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Редактировать
            </Link>
            <DeleteButton productId={item.id} />
          </div>
        )}
      />
    </div>
  );
}
