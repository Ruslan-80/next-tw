import { prisma } from "../../../../prisma/client.js";
import Link from "next/link";
import { Button } from "../../../../components/ui/button.jsx";
import { Input } from "../../../../components/ui/input.jsx";
import { redirect } from "next/navigation.js";
import { DeleteButton } from "../../../../components/shared/DeleteButton.jsx";
import fs from "fs/promises";
import path from "path";

// Серверное действие для удаления товара
async function deleteProduct(formData) {
  "use server";
  const id = parseInt(formData.get("id"));
  await prisma.product.delete({
    where: { id },
  });
  redirect("/admin/medifiles");
}

// Серверное действие для добавления изображения
async function addProductImage(formData) {
  "use server";
  const productId = parseInt(formData.get("productId"));
  const file = formData.get("image");
  const fileName = `${file.name}`;
  const filePath = `/images/product/se/${fileName}`;

  // Сохранение файла на сервере
  await saveFile(file, filePath);

  // Сохранение в БД
  await prisma.mediaFile.create({
    data: {
      url: filePath,
      type: "IMAGE",
      productId,
    },
  });

  redirect("/admin/medifiles");
}

// Функция для сохранения файла
async function saveFile(file, filePath) {
  try {
    const uploadDir = path.join(process.cwd(), "public/images/product/se");
    await fs.mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(uploadDir, path.basename(filePath)), buffer);
  } catch (error) {
    console.error("Error saving file:", error);
    throw new Error("Failed to save file");
  }
}

// Главная страница админки товаров
export default async function ProductsPageAdmin() {
  const products = await prisma.product.findMany({
    orderBy: { article: "asc" },
    include: {
      mediaFiles: {
        select: {
          id: true,
          url: true,
          type: true,
        },
      },
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Управление товарами</h1>
      <div className="space-y-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-6 border rounded-lg shadow-sm bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  {product.article} - {product.name}
                </h2>
                <p className="text-gray-600">ID: {product.id}</p>
                <p className="text-gray-600">Slug: {product.slug}</p>
                <p className="text-gray-600">
                  Категория ID: {product.categoryId}
                </p>
                <p className="text-gray-600">
                  Категория Slug: {product.categorySlug}
                </p>
                <p className="text-gray-600">Цена: {product.basePrice} руб.</p>
                <p className="text-gray-600">Запас: {product.stock}</p>
                <p className="text-gray-600">
                  Время производства: {product.manufacturingTime}
                </p>
                <p className="text-gray-600">
                  Видимость: {product.visibility ? "Да" : "Нет"}
                </p>
                <p className="text-gray-600">Описание: {product.description}</p>
              </div>
              <div className="flex space-x-2">
                <Link href={`/medifiles/edit/${product.id}`}>
                  <Button variant="outline">Редактировать</Button>
                </Link>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={product.id} />
                  <DeleteButton />
                </form>
              </div>
            </div>

            {/* Изображения товара */}
            {product.mediaFiles.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Изображения</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {product.mediaFiles.map((file) => (
                    <div
                      key={file.id}
                      className="relative border rounded-lg overflow-hidden"
                    >
                      <img
                        src={file.url}
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-2">
                        <Input
                          value={file.url}
                          readOnly
                          className="text-sm truncate"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Форма добавления нового изображения */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Добавить изображение
              </h3>
              <form action={addProductImage} className="flex gap-4">
                <input type="hidden" name="productId" value={product.id} />
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  className="w-full"
                />
                <Button type="submit">Загрузить</Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
