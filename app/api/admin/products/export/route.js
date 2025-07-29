import { NextResponse } from "next/server";
import { exportProductsToExcel } from "@/prisma/exportProductsToExcel";

export async function GET() {
  try {
    const buffer = await exportProductsToExcel();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="products_export.xlsx"',
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (e) {
    console.error("Export API error:", e);
    return NextResponse.json(
      { error: "Failed to export products" },
      { status: 500 }
    );
  }
}
