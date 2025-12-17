import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

function cutSeo(text) {
  if (!text) return null;
  if (text.length <= 191) return text;

  const trimmed = text.slice(0, 191);
  return trimmed.slice(0, trimmed.lastIndexOf(" "));
}

async function main() {
  const filePath = path.resolve("./DescriptionSeo.json");

  const items = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  let updated = 0;
  let skipped = 0;

  for (const item of items) {
    const { article, description, titleSeo, descriptionSeo } = item;

    if (!article) {
      skipped++;
      continue;
    }

    const result = await prisma.product.updateMany({
      where: { article },
      data: {
        description: description ?? null,
        titleSeo: titleSeo ?? null,
        descriptionSeo: cutSeo(descriptionSeo),
      },
    });

    if (result.count > 0) {
      updated += result.count;
      console.log(
        `✅ ${article} → descriptionSeo: ${
          cutSeo(descriptionSeo)?.length || 0
        } симв.`
      );
    } else {
      skipped++;
      console.log(`⚠️ Товар не найден: ${article}`);
    }
  }

  console.log("\n📊 Итог:");
  console.log(`Обновлено: ${updated}`);
  console.log(`Пропущено: ${skipped}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
