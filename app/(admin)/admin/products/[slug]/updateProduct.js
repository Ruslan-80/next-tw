export const dynamic = "force-dynamic";
import { writeFile } from "fs/promises";
import path from "path";

async function uploadFile(formData) {
  "use server";

  const productId = parseInt(formData.get("productId"));
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    throw new Error("Файл не загружен");
  }

  // Читаем содержимое файла
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Путь сохранения в public/uploads
  const filename = Date.now() + "-" + file.name;
  const filepath = path.join(process.cwd(), "public", "uploads", filename);

  // Записываем файл на диск
  await writeFile(filepath, buffer);

  // Сохраняем ссылку в БД
  await prisma.mediaFile.create({
    data: {
      productId,
      type: "IMAGE",
      url: "/uploads/" + filename,
    },
  });

  // Перезагрузка страницы
  redirect(`/admin/products/${productId}`);
}
