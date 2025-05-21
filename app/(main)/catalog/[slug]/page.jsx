import { prisma } from "@/lib/prisma";
import { getProductsByCategory } from "./actions";
import Filters from "./Filters";
import ProductList from "@/components/shared/ProductList";
import Breadcrumbs from "@/components/Breadcrumbs";
import Subcategories from "@/components/Subcategories";

export default async function CategoryPage({ params, searchParams }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const resolvedSearchParams = await searchParams;

    // Загружаем текущую категорию, её иерархию и подкатегории
    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            parent: {
                include: {
                    parent: true, // Загружаем до двух уровней вложенности
                },
            },
            children: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });

    if (!category) {
        return <p className="text-center py-8">Категория не найдена</p>;
    }

    // Формируем цепочку категорий для хлебных крошек
    const breadcrumbs = [];
    let currentCategory = category;
    while (currentCategory) {
        breadcrumbs.unshift({
            name: currentCategory.name,
            slug: currentCategory.slug,
        });
        currentCategory = currentCategory.parent;
    }

    const products = await getProductsByCategory(slug, resolvedSearchParams);

    // Собираем атрибуты для фильтров
    const attributes = {};
    products.forEach(product => {
        product.attributes.forEach(attr => {
            if (!attributes[attr.attributeSlug]) {
                attributes[attr.attributeSlug] = {
                    name: attr.attributeName,
                    values: new Set(),
                };
            }
            attributes[attr.attributeSlug].values.add(attr.attributeValueName);
        });
    });

    // Превращаем Set → Array и формируем attributesList
    const attributesList = Object.fromEntries(
        Object.entries(attributes).map(([slug, { name, values }]) => [
            slug,
            { name, values: Array.from(values) },
        ])
    );

    return (
        <div className="container mx-auto px-4 py-6">
            <Breadcrumbs items={breadcrumbs} className="mb-4" />

            <div className="flex flex-col md:flex-row gap-8">
                {/* Боковая панель с фильтрами */}
                <div className="w-full md:w-72 shrink-0">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">
                        Каталог: {category.name}
                    </h1>

                    {/* Подкатегории */}
                    {category.children.length > 0 && (
                        <Subcategories
                            subcategories={category.children}
                            className="mb-6"
                        />
                    )}

                    {/* Фильтры */}
                    <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
                        <Filters
                            slug={slug}
                            searchParams={resolvedSearchParams}
                            attributes={attributesList}
                        />
                    </div>
                </div>

                {/* Основной контент */}
                <div className="flex-1">
                    <ProductList products={products} />
                </div>
            </div>
        </div>
    );
}
