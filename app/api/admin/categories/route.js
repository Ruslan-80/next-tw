import { prisma } from "@/prisma/client";
import { slugify as slugifyRu } from "transliteration";

export async function GET() {
    const cats = await prisma.category.findMany({ orderBy: { id: "asc" } });
    return new Response(JSON.stringify(cats), { status: 200 });
}

export async function POST(req) {
    const data = await req.json();
    const newCat = await prisma.category.create({
        data: {
            name: data.name,
            fullName: data.fullName || data.name,
            slug: slugifyRu(data.name, { lowercase: true, separator: "-" }),
            description: data.description,
            fullDescription: data.fullDescription,
            imageUrl: data.imageUrl,
            titleSeo: data.titleSeo,
            descriptionSeo: data.descriptionSeo,
            parentId: data.parentId,
        },
    });
    return new Response(JSON.stringify(newCat), { status: 201 });
}
