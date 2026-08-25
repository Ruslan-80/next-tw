// app/api/admin/schema/route.js
import { Prisma } from "@prisma/client";
import { TABLE_CONFIGS } from "@/lib/schemaConfig";

export async function GET() {
  try {
    // Получаем метаданные всех моделей из Prisma Client
    const models = Prisma.dmmf.datamodel.models;

    const schemaInfo = models.map((model) => {
      const tableName = model.name.toLowerCase();
      const config = TABLE_CONFIGS[tableName] || {
        readOnly: ["id", "createdAt", "updatedAt"],
        restricted: [],
      };

      const fields = model.fields
        .filter((field) => field.kind === "scalar") // Берем только скалярные поля (исключаем объектные связи)
        .map((field) => ({
          name: field.name,
          type: field.type,
          isRequired: field.isRequired,
          isId: field.isId,
          isReadOnly:
            config.readOnly?.includes(field.name) ||
            field.isId ||
            field.name === "createdAt" ||
            field.name === "updatedAt",
          isRestricted:
            config.restricted?.includes(field.name) || field.isUnique,
        }));

      return {
        modelName: model.name,
        tableName,
        fields,
      };
    });

    return new Response(JSON.stringify(schemaInfo), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
