import { prisma } from "@/prisma/client";
import { slugify as slugifyRu } from "transliteration";

export async function PUT(req) {
    const { id } = req.params;
    const idNum = parseInt(id, 10);
    const data = await req.json();
    const updated = await prisma.category.update({
        where: { id: idNum },
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
    return new Response(JSON.stringify(updated), { status: 200 });
}
