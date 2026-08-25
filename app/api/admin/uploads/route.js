import { NextResponse } from "next/server";
import { readdir, stat, unlink } from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "uploads");

// GET — Получить список всех файлов
export async function GET() {
  try {
    let files = [];
    try {
      const fileNames = await readdir(uploadDir);

      // Получаем информацию о каждом файле (размер, дата создания)
      files = await Promise.all(
        fileNames.map(async (name) => {
          const filePath = path.join(uploadDir, name);
          const stats = await stat(filePath);

          return {
            name,
            url: `/uploads/${name}`,
            size: stats.size,
            createdAt: stats.birthtime || stats.ctime,
          };
        }),
      );

      // Сортируем: сначала самые новые
      files.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (err) {
      // Если папка еще не существует, просто возвращаем пустой массив
      if (err.code !== "ENOENT") throw err;
    }

    return NextResponse.json({ success: true, files });
  } catch (error) {
    console.error("Ошибка при получении списка файлов:", error);
    return NextResponse.json(
      { error: "Не удалось загрузить список файлов" },
      { status: 500 },
    );
  }
}

// DELETE — Удалить конкретный файл
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json(
        { error: "Имя файла не указано" },
        { status: 400 },
      );
    }

    // Защита от Path Traversal (безопасность: не даем выходить за пределы uploads)
    const safeFileName = path.basename(fileName);
    const filePath = path.join(uploadDir, safeFileName);

    // Физическое удаление файла с диска
    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка при удалении файла:", error);
    return NextResponse.json(
      { error: "Не удалось удалить файл" },
      { status: 500 },
    );
  }
}
