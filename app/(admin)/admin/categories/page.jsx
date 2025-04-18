import React from "react";
import dataCategory from "../../../data/categories.json";

const CategoryAdmin = () => {
    const { categories } = dataCategory;
    return (
        <div className="flex w-full px-4 bg-gray-200">
            <h1 className="text-2xl font-bold text-center">CategoryAdmin</h1>
            <div className="flex flex-col items-center justify-center w-full">
                <h2 className="text-xl font-semibold">Categories</h2>
                <ul className="mt-4 space-y-3">
                    {categories.map(cat => (
                        <li
                            key={cat.id}
                            className="bg-white p-4 rounded-lg shadow-md"
                        >
                            <h3 className="text-lg font-bold">{cat.name}</h3>
                            <p>{cat.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryAdmin;
