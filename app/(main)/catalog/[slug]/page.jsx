"use client";
import ProductFilters from "../../../components/ProductFilters";

const filters = [
    {
        name: "Количество квартир",
        options: [
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
        ],
    },
    {
        name: "Номинальный ток",
        options: [
            { value: "16A", label: "16A" },
            { value: "25A", label: "25A" },
            { value: "63A", label: "63A" },
        ],
    },
    {
        name: "Степень защиты",
        options: [
            { value: "IP31", label: "IP31" },
            { value: "IP54", label: "IP54" },
            { value: "IP65", label: "IP65" },
        ],
    },
];
export default function CategoryPage() {
    const handleFilterChange = values => {
        console.log("Выбранные фильтры:", values);
    };
    return (
        <div className="container mx-auto px-3">
            <div className="flex flex-wrap gap-3">
                <div className="flex flex-col max-w-70   md:w-1/3 px-3 mb-6 md:mb-0 text-black ">
                    <div className="max-w-md  p-4">
                        <h1 className="text-xl font-bold mb-4">
                            Фильтр товаров
                        </h1>
                        <ProductFilters
                            filters={filters}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>

                <div className="flex grow-1 shrink-0 basis-auto  text-black px-3 bg-blue-300">
                    Товары
                </div>
            </div>
        </div>
    );
}
