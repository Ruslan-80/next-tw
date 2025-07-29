import { NextResponse } from "next/server";
import { importProductsFromExcel } from "@/prisma/importProductsFromExcel";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await importProductsFromExcel(buffer);

    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
  } catch (e) {
    console.error("Import API error:", e);
    return NextResponse.json(
      { error: "Failed to import products" },
      { status: 500 }
    );
  }
}
