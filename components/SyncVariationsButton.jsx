// components/SyncVariationsButton.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SyncVariationsButton() {
    const [loading, setLoading] = useState(false);

    const handleSync = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/variations/sync", { method: "POST" });
            if (!res.ok) throw new Error(`Ошибка ${res.status}`);
            const data = await res.json();
            alert(`Синхронизировано вариаций: ${data.processed}`);
        } catch (err) {
            console.error(err);
            alert("Не удалось синхронизировать вариации");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleSync} disabled={loading}>
            {loading ? "Синхронизация..." : "Синхронизировать товары"}
        </Button>
    );
}
