export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { visibility: true },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  return Response.json(products);
}
