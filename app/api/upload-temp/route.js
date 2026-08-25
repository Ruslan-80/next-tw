import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Указываем папку для сохранения (например, uploads внутри корня проекта)
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Создаем директорию, если она не существует
    await mkdir(uploadDir, { recursive: true });

    // Генерируем уникальное имя файла с сохранением временной метки
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Сохраняем файл на диск
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      filePath: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error("Ошибка при сохранении файла:", error);
    return NextResponse.json(
      { error: "Ошибка сервера при загрузке файла" },
      { status: 500 },
    );
  }
}
