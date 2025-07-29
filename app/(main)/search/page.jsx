import { searchProducts } from "./actions";
import ProductList from "@/components/shared/ProductList";

export default async function SearchPage({ searchParams }) {
    const query = (await searchParams).query || "";

    try {
        const products = await searchProducts(query);

        // Проверка, что products — массив
        if (!Array.isArray(products)) {
            console.error("searchProducts returned non-array:", products);
            return (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Ошибка поиска
                    </h1>
                    <p className="text-red-500">
                        Некорректный результат поиска
                    </p>
                </div>
            );
        }
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Результаты поиска: {query || "Все товары"}
                </h1>
                <ProductList products={products} />
            </div>
        );
    } catch (error) {
        console.error("Search page error:", error);
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Ошибка поиска
                </h1>
                <p className="text-red-500">
                    Не удалось выполнить поиск: {error.message}
                </p>
            </div>
        );
    }
}
