"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditCategoryForm({ initialData, categories }) {
    const [form, setForm] = useState({
        name: initialData.name,
        fullName: initialData.fullName,
        slug: initialData.slug,
        description: initialData.description || "",
        fullDescription: initialData.fullDescription || "",
        imageUrl: initialData.imageUrl || "",
        titleSeo: initialData.titleSeo || "",
        descriptionSeo: initialData.descriptionSeo || "",
        parentId: initialData.parentId ? initialData.parentId.toString() : "",
    });
    const router = useRouter();

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (name === "name") {
            const slug = value.toLowerCase().replace(/\s+/g, "-");
            setForm(prev => ({ ...prev, slug, fullName: value }));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch(`/api/admin/categories/${initialData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                parentId: form.parentId ? parseInt(form.parentId, 10) : null,
            }),
        });
        if (res.ok) router.push("/admin/categories");
    };

    const handleDelete = async () => {
        if (!confirm("Delete this category?")) return;
        const res = await fetch(`/api/admin/categories/${initialData.id}`, {
            method: "DELETE",
        });
        if (res.ok) router.push("/admin/categories");
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Parent category */}
                <div>
                    <label className="block text-sm font-medium">
                        Parent Category
                    </label>
                    <select
                        name="parentId"
                        value={form.parentId}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                        <option value="">None</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* остальные поля аналогично Create */}
                {/* ... */}
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
}
