import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

// Явно указываем Node.js runtime (на всякий случай)
export const runtime = "nodejs";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { visibility: true },
      select: {
        id: true,
        slug: true,
        updatedAt: true,
      },
    });

    const filePath = path.join(
      process.cwd(),
      "public",
      "products.json"
    );

    await fs.writeFile(
      filePath,
      JSON.stringify(products, null, 2),
      "utf8"
    );

    return NextResponse.json({
      success: true,
      count: products.length,
      message: "products.json generated",
    });
  } catch (error) {
    console.error("Error generating products.json:", error);

    return NextResponse.json(
      { success: false, error: "Failed to generate products.json" },
      { status: 500 }
    );
  }
}
