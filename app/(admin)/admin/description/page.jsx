"use client";

import { Button } from "../../../../components/ui/button"; // Shadcn Button

export default function ProductsAdmin() {
  const handleExport = async () => {
    try {
      const response = await fetch("/api/admin/description");
      if (!response.ok) throw new Error("Ошибка экспорта");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "products.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось экспортировать товары");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Управление товарами</h1>
      <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
        Экспортировать товары
      </Button>
    </div>
  );
}
