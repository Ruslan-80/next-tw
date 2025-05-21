"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { slugify as slugifyRu } from "transliteration";

export default function CreateCategoryPage() {
    const [form, setForm] = useState({
        name: "",
        fullName: "",
        slug: "",
        description: "",
        fullDescription: "",
        imageUrl: "",
        titleSeo: "",
        descriptionSeo: "",
        parentId: "",
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/admin/categories")
            .then(res => res.json())
            .then(setCategories);
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (name === "name") {
            const slug = slugifyRu(value, { lowercase: true, separator: "-" });
            setForm(prev => ({ ...prev, slug, fullName: value }));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch("/api/admin/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    fullName: form.fullName || form.name,
                    slug: form.slug,
                    description: form.description,
                    fullDescription: form.fullDescription,
                    imageUrl: form.imageUrl,
                    titleSeo: form.titleSeo,
                    descriptionSeo: form.descriptionSeo,
                    parentId: form.parentId
                        ? parseInt(form.parentId, 10)
                        : null,
                }),
            });
            if (!res.ok) throw new Error("Failed to create category");
            router.push("/admin/categories");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg min-w-[50%] mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Category</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Parent */}
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
                {/* Name, Full Name, Slug, etc. same pattern */}
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium">
                        Full Name
                    </label>
                    <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Slug</label>
                    <input
                        name="slug"
                        value={form.slug}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                {/* Description */}
                <div>
                    <label className="block text-sm font-medium">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                {/* Full Description */}
                <div>
                    <label className="block text-sm font-medium">
                        Full Description
                    </label>
                    <textarea
                        name="fullDescription"
                        value={form.fullDescription}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium">
                        Image URL
                    </label>
                    <input
                        name="imageUrl"
                        type="url"
                        value={form.imageUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                {/* SEO Title */}
                <div>
                    <label className="block text-sm font-medium">
                        SEO Title
                    </label>
                    <input
                        name="titleSeo"
                        value={form.titleSeo}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                {/* SEO Description */}
                <div>
                    <label className="block text-sm font-medium">
                        SEO Description
                    </label>
                    <textarea
                        name="descriptionSeo"
                        value={form.descriptionSeo}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Create Category"}
                </button>
            </form>
        </div>
    );
}
