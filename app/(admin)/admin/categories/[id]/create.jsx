"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCategory() {
    const [name, setName] = useState("");
    const router = useRouter();
    const handleSubmit = async e => {
        e.preventDefault();
        await fetch("/api/admin/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        router.push("/admin/categories");
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
                Create
            </button>
        </form>
    );
}
