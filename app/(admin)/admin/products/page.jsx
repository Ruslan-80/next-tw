export const dynamic = "force-dynamic";
import { prisma } from "@/prisma/client";
import Link from "next/link";
import { UniversalTable } from "@/components/shared/Tables";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { DeleteButton } from "@/components/shared/DeleteButton";
import SyncVariationsButton from "@/components/SyncVariationsButton";

// Server Action для массового удаления по артикулам
async function deleteProductsByArticles(formData) {
  "use server";
  const rawArticles = formData.get("articles");
  if (!rawArticles) return;

  // Парсим артикулы (разделители: запятая, пробел, перенос строки)
  const articles = rawArticles
    .split(/[\n,\s]+/)
    .map((a) => a.trim())
    .filter(Boolean);

  if (articles.length > 0) {
    await prisma.product.deleteMany({
      where: {
        article: {
          in: articles,
        },
      },
    });
    revalidatePath("/admin/products");
  }
}

export default async function ProductsPageAdmin() {
  let products = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { id: "asc" },
      include: { category: true },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Товары</h1>

      {/* Верхняя панель управления */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/products/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          Создать новый товар
        </Link>
        <SyncVariationsButton />
      </div>

      {/* Форма массового удаления по артикулам */}
      <div className="mb-6 p-4 border rounded-lg bg-card max-w-xl">
        <h2 className="text-sm font-semibold mb-2">
          Массовое удаление по артикулу
        </h2>
        <form
          action={deleteProductsByArticles}
          className="flex gap-2 items-start"
        >
          <textarea
            name="articles"
            placeholder="Введите артикулы через запятую или с новой строки..."
            rows={2}
            className="w-full p-2 border rounded-md text-sm bg-card focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <Button type="submit" variant="destructive" className="shrink-0">
            Удалить
          </Button>
        </form>
      </div>

      {/* Компактная таблица */}
      <div className="overflow-x-auto">
        <UniversalTable
          data={products}
          caption="Список товаров"
          excludeKeys={[
            "createdAt",
            "updatedAt",
            "description",
            "descriptionSeo",
            "titleSeo",
            "category",
            "slug",
            "categorySlug",
            "categoryId",
            "manufacturingTime",
          ]}
          customHeaders={{
            id: "ID",
            name: "Название",
            article: "Артикул",
            basePrice: "Цена",
            stock: "Запас",
            visibility: "Видимость",
          }}
          actions={(item) => (
            <div className="flex gap-2 shrink-0">
              <Link
                href={`products/${item.slug}`}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs flex items-center"
              >
                Редактировать
              </Link>
              <DeleteButton productId={item.id} />
            </div>
          )}
        />
      </div>
    </div>
  );
}
