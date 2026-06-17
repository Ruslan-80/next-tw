import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Переписываем схему, используя чистые строки вместо импортируемых типов
const electricalSchemaDeclaration = {
  type: "object",
  properties: {
    components: {
      type: "array",
      description:
        "Полный список всех обнаруженных компонентов на электрической схеме щита",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description:
              "Маркировка элемента на схеме (например: QF-1, QS-1, Mercury, ВА88-35)",
          },
          type: {
            type: "string",
            enum: ["breaker", "meter", "disconnector", "current_transformer"],
            description:
              "Тип устройства: breaker, meter, disconnector, current_transformer",
          },
          model: {
            type: "string",
            description:
              "Модель устройства, если указана (например: ВА47-29, Меркурий-234 ART-03 P)",
            nullable: true,
          },
          rating_a: {
            type: "string",
            description: "Номинальный ток (например: 50A, 16A, 160A, 500A)",
            nullable: true,
          },
          poles: {
            type: "integer",
            description: "Количество полюсов (фазность). Например, 3 или 1",
            nullable: true,
          },
          current_transformers: {
            type: "string",
            description:
              "Коэффициент трансформации для счетчиков или вводных рубильников, если применимо (например: 250/5A, 160/5A)",
            nullable: true,
          },
          purpose: {
            type: "string",
            description:
              "Назначение линии / наименование потребителя на русском языке (например: Торговая зона, Резерв, Аварийное освещение)",
            nullable: true,
          },
        },
        required: ["id", "type"],
      },
    },
  },
  required: ["components"],
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Файл не найден" },
        { status: 400 },
      );
    }

    const fileName = file.name.replace(/\.[^/.]+$/, "");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes).toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: electricalSchemaDeclaration,
        temperature: 0.1,
      },
    });

    const systemInstruction =
      "Ты — эксперт-проектировщик систем электроснабжения. Твоя задача — внимательно изучить " +
      "однолинейную электрическую схему и составить спецификацию оборудования. " +
      "Внимательно соотноси маркировку автомата (QF-x) с его номиналом (например, 50А, 16А) и " +
      "текстовым описанием нагрузки в самом низу таблицы (под каждым автоматом). " +
      "Для счетчиков обязательно найди модель (Меркурий) и трансформаторы тока (например, 250/5А).";

    const prompt =
      "Проанализируй прикрепленную схему ВРУ/ВРЩ. Извлеки все вводные рубильники, счетчики, " +
      "трансформаторы и все отходящие линии (автоматы от QF-1 до QF-21, включая резервные). " +
      "Заполни данные строго в соответствии со схемой вывода.";

    const result = await model.generateContent(
      [{ inlineData: { data: buffer, mimeType: file.type } }, { text: prompt }],
      { systemInstruction },
    );

    let jsonText = result.response.text().trim();

    // На всякий случай оставляем очистку, если вкрался маркдаун
    if (jsonText.startsWith("```")) {
      jsonText = jsonText
        .replace(/^```json\s*/i, "")
        .replace(/```$/, "")
        .trim();
    }

    const data = JSON.parse(jsonText);

    // Сохраняем результат в public/analysis/
    const savePath = path.join(
      process.cwd(),
      "public",
      "analysis",
      `${fileName}_result.json`,
    );
    await fs.mkdir(path.dirname(savePath), { recursive: true });
    await fs.writeFile(savePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Ошибка на сервере:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
