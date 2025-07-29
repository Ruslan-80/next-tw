import { prisma } from "@/prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/shared/DeleteButton";

export default async function EditProductPage({ params }) {
  const { id } = params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return <div>Товар не найден</div>;
  }

  async function updateProduct(formData) {
    "use server";
    const data = Object.fromEntries(formData);
    const category = await prisma.category.findUnique({
      where: { id: parseInt(data.categoryId) },
    });

    await prisma.product.update({
      where: { id: parseInt(data.id) },
      data: {
        name: data.name,
        article: data.article,
        slug: data.slug,
        description: data.description,
        basePrice: parseInt(data.basePrice),
        stock: parseInt(data.stock),
        manufacturingTime: data.manufacturingTime,
        visibility: data.visibility === "true",
        categoryId: parseInt(data.categoryId),
        categorySlug: category?.slug || "",
      },
    });
    redirect("/products");
  }

  const categories = await prisma.category.findMany();

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-4">Редактировать товар</h1>
      <form action={updateProduct} className="space-y-4">
        <Input type="hidden" name="id" value={product.id} />
        <div>
          <Label htmlFor="name">Название</Label>
          <Input id="name" name="name" defaultValue={product.name} required />
        </div>
        <div>
          <Label htmlFor="article">Артикул</Label>
          <Input
            id="article"
            name="article"
            defaultValue={product.article}
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Слаг</Label>
          <Input id="slug" name="slug" defaultValue={product.slug} required />
        </div>
        <div>
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={product.description}
          />
        </div>
        <div>
          <Label htmlFor="basePrice">Цена</Label>
          <Input
            id="basePrice"
            name="basePrice"
            type="number"
            defaultValue={product.basePrice}
            required
          />
        </div>
        <div>
          <Label htmlFor="stock">Запас</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            defaultValue={product.stock}
            required
          />
        </div>
        <div>
          <Label htmlFor="manufacturingTime">Время производства</Label>
          <Input
            id="manufacturingTime"
            name="manufacturingTime"
            defaultValue={product.manufacturingTime}
            required
          />
        </div>
        <div>
          <Label htmlFor="visibility">Видимость</Label>
          <select
            id="visibility"
            name="visibility"
            defaultValue={product.visibility.toString()}
            className="w-full p-2 border rounded"
          >
            <option value="true">Видимый</option>
            <option value="false">Скрытый</option>
          </select>
        </div>
        <div>
          <Label htmlFor="categoryId">Категория</Label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={product.categoryId}
            className="w-full p-2 border rounded"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4">
          <Button type="submit text-blue-50">Сохранить</Button>
          <DeleteButton productId={product.id} />
          <Link href="/products" className="px-4 py-2 bg-gray-200 rounded-md">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
