// /app/api/products/route.js
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { visibility: true },
  });

  return Response.json(products);
}
