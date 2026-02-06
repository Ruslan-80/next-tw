// app/api/admin/categories/[id]/route.js
import { prisma } from "@/prisma/client";
import { slugify as slugifyRu } from "transliteration";

// Заставляем Next.js игнорировать этот файл при сборке
export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
    try {
        // В App Router параметры приходят вторым аргументом, и их нужно дождаться (await)
        const { id } = await params; 
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

        return new Response(JSON.stringify(updated), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Update Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}