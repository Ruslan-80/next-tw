import { NextResponse } from "next/server";

const ANALYZE_URL = "http://72.56.40.39/analyze-schema";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Файл не передан" },
        { status: 400 },
      );
    }

    // Пересылаем файл на внешний сервер
    const externalForm = new FormData();
    externalForm.append("file", file, file.name || "schema.png");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 600_000); // 10 мин

    const response = await fetch(ANALYZE_URL, {
      method: "POST",
      body: externalForm,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const text = await response.text();
      console.error("Analyze API error:", response.status, text);
      return NextResponse.json(
        {
          success: false,
          error: `Сервер вернул ${response.status}`,
          details: text,
        },
        { status: response.status },
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    if (err.name === "AbortError") {
      return NextResponse.json(
        { success: false, error: "Превышено время ожидания (10 мин)" },
        { status: 504 },
      );
    }
    console.error("Analyze schema error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
