import { prisma } from "@/lib/prisma";
import ProductPageClient from "./ProductPageClient";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function Page({ params }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // Загружаем продукт и связанную категорию с иерархией
    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            mediaFiles: true,
            attributes: true,
            variations: true,
            category: {
                include: {
                    parent: {
                        include: {
                            parent: true, // Загружаем до двух уровней вложенности
                        },
                    },
                },
            },
        },
    });

    if (!product) {
        return <p className="text-center py-8">Товар не найден</p>;
    }

    // Формируем цепочку хлебных крошек
    const breadcrumbs = [];
    let currentCategory = product.category;
    while (currentCategory) {
        breadcrumbs.unshift({
            name: currentCategory.name,
            slug: currentCategory.slug,
        });
        currentCategory = currentCategory.parent;
    }
    breadcrumbs.push({
        name: product.name,
        slug: product.slug,
    });

    return (
        <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbs} />
            <ProductPageClient product={product} />
        </div>
    );
}
