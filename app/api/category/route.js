import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        slug: true,
        updatedAt: true,
      },
    });

    const filePath = path.join(
      process.cwd(),
      "public",
      "categories.json"
    );

    await fs.writeFile(
      filePath,
      JSON.stringify(categories, null, 2),
      "utf8"
    );

    return NextResponse.json({
      success: true,
      count: categories.length,
      message: "categories.json generated",
    });
  } catch (error) {
    console.error("Error generating categories.json:", error);

    return NextResponse.json(
      { success: false, error: "Failed to generate categories.json" },
      { status: 500 }
    );
  }
}
