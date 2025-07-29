import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";

export async function POST(request) {
  const formData = await request.formData();
  const id = parseInt(formData.get("id"));

  try {
    await prisma.product.delete({
      where: { id },
    });
    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
