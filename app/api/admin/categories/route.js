import { prisma } from "@/prisma/client";

export async function GET() {
    const categories = await prisma.category.findMany({
        orderBy: { id: "asc" },
    });
    return new Response(JSON.stringify(categories), { status: 200 });
}

export async function POST(req) {
    const { name } = await req.json();
    const newCat = await prisma.category.create({
        data: { name, slug: name.toLowerCase().replace(/\s+/g, "-") },
    });
    return new Response(JSON.stringify(newCat), { status: 201 });
}
