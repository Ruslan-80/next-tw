import EditCategoryForm from "./edit";
import { prisma } from "@/prisma/client";

export default async function CategoryPage({ params }) {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) return <div>Invalid category ID</div>;
    const category = await prisma.category.findUnique({ where: { id: idNum } });
    if (!category) return <div>Category not found</div>;
    return (
        <EditCategoryForm
            initialData={category}
            categories={await prisma.category.findMany()}
        />
    );
}
