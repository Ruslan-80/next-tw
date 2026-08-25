import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    // 1. Читаем FormData вместо request.json()
    const formData = await request.formData();

    const contact = formData.get("contact");
    const message = formData.get("message");
    const productName = formData.get("productName");
    const files = formData.getAll("files"); // Получаем все загруженные файлы

    if (!contact) {
      return NextResponse.json({ error: "No contact" }, { status: 400 });
    }

    const savedFilesInfo = [];

    // 2. Если есть файлы, сохраняем их на сервер
    if (files && files.length > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");

      // Создаем папку, если ее еще нет
      await mkdir(uploadDir, { recursive: true });

      for (const file of files) {
        // Проверяем, что это реальный файл, а не пустая строка
        if (typeof file === "object" && file.name) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          // Генерируем уникальное имя файла
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.name)}`;
          const filePath = path.join(uploadDir, uniqueName);

          // Записываем файл на диск
          await writeFile(filePath, buffer);

          // Сохраняем метаданные для базы
          savedFilesInfo.push({
            originalName: file.name,
            path: `/uploads/${uniqueName}`, // Публичный URL для доступа
            size: file.size,
            type: file.type,
          });
        }
      }
    }

    // 3. Сохраняем в БД (файлы уже физически на диске)
    await prisma.messageQueue.create({
      data: {
        contact,
        data: {
          message,
          productName,
          files: savedFilesInfo, // Пути и имена файлов сохраняются в JSON-поле
        },
      },
    });

    return NextResponse.json({ status: "success", message: "Заявка принята" });
  } catch (error) {
    console.error("Ошибка обработки формы:", error);
    return NextResponse.json({ error: "Ошибка сохранения" }, { status: 500 });
  }
}
