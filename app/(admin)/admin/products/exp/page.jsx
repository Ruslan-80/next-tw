"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminProducts() {
  const [file, setFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null); // Состояние для JSON файла
  const [isLoading, setIsLoading] = useState({
    export: false,
    import: false,
    jsonImport: false, // Состояние загрузки для JSON
  });

  // --- Существующая логика XLSX ---
  const handleExport = async () => {
    setIsLoading((prev) => ({ ...prev, export: true }));
    try {
      const response = await fetch("/api/admin/products/export");
      if (!response.ok) throw new Error("Failed to export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "products_export.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Products exported successfully!");
    } catch (error) {
      toast.error(
        `Export error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, export: false }));
    }
  };
  const handleImportPrice = async () => {
    if (!file) return toast.error("Please select an XLSX file");
    setIsLoading((prev) => ({ ...prev, import: true }));
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/admin/products/importprice", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok)
        toast.success(result.message || "Imported successfully!");
      else throw new Error(result.error || "Failed to import");
    } catch (error) {
      toast.error(`Import error: ${error.message}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, import: false }));
    }
  };

  const handleImport = async () => {
    if (!file) return toast.error("Please select an XLSX file");
    setIsLoading((prev) => ({ ...prev, import: true }));
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/admin/products/import", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok)
        toast.success(result.message || "Imported successfully!");
      else throw new Error(result.error || "Failed to import");
    } catch (error) {
      toast.error(`Import error: ${error.message}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, import: false }));
    }
  };

  // --- Новая логика для JSON ---
  const handleJsonImport = async () => {
    if (!jsonFile) return toast.error("Please select a JSON file");

    setIsLoading((prev) => ({ ...prev, jsonImport: true }));

    const reader = new FileReader();

    // Читаем файл как текст
    reader.onload = async (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== "string") throw new Error("Failed to read file");

        const jsonData = JSON.parse(content);

        const response = await fetch("/api/prod/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success(
            `Успешно! Создано/обновлено: ${result.stats.successCount}`,
          );
          if (result.stats.failedCount > 0) {
            toast.warning(
              `Ошибок: ${result.stats.failedCount}. Проверьте консоль.`,
            );
            console.error("Failed items:", result.failedItems);
          }
        } else {
          throw new Error(result.error || "Ошибка при загрузке JSON");
        }
      } catch (error) {
        toast.error(`Ошибка: ${error.message}`);
      } finally {
        setIsLoading((prev) => ({ ...prev, jsonImport: false }));
      }
    };

    reader.readAsText(jsonFile);
  };
  // --- Новая логика для JSON ---
  const handleJsonImportOpisanie = async () => {
    if (!jsonFile) return toast.error("Please select a JSON file");

    setIsLoading((prev) => ({ ...prev, jsonImport: true }));

    const reader = new FileReader();

    // Читаем файл как текст
    reader.onload = async (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== "string") throw new Error("Failed to read file");

        const jsonData = JSON.parse(content);

        const response = await fetch("/api/prod/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success(
            `Успешно! Создано/обновлено: ${result.stats.successCount}`,
          );
          if (result.stats.failedCount > 0) {
            toast.warning(
              `Ошибок: ${result.stats.failedCount}. Проверьте консоль.`,
            );
            console.error("Failed items:", result.failedItems);
          }
        } else {
          throw new Error(result.error || "Ошибка при загрузке JSON");
        }
      } catch (error) {
        toast.error(`Ошибка: ${error.message}`);
      } finally {
        setIsLoading((prev) => ({ ...prev, jsonImport: false }));
      }
    };

    reader.readAsText(jsonFile);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      {/* Секция XLSX */}
      <section className="p-4 border border-accent rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-3">XLSX Export/Import</h2>
        <div className="space-y-4">
          <Button
            onClick={handleExport}
            disabled={isLoading.export}
            variant="outline"
          >
            {isLoading.export ? "Exporting..." : "Export XLSX"}
          </Button>
          <div className="flex items-center space-x-4">
            <Input
              type="file"
              accept=".xlsx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button onClick={handleImport} disabled={isLoading.import || !file}>
              {isLoading.import ? "Importing..." : "Import XLSX"}
            </Button>
          </div>
        </div>
      </section>

      <hr />

      {/* Секция JSON (Bulk Create) */}
      <section className="p-4 border border-accent rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-3 text-blue-900">
          Bulk Create Products (JSON)
        </h2>
        <p className="text-sm text-text mb-4">
          Выберите JSON файл с массивом продуктов для массового создания или
          обновления.
        </p>
        <div className="flex items-center space-x-4">
          <Input
            type="file"
            accept=".json"
            onChange={(e) => setJsonFile(e.target.files?.[0] || null)}
            className="bg-white"
          />
          <Button
            onClick={handleJsonImport}
            disabled={isLoading.jsonImport || !jsonFile}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading.jsonImport ? "Processing..." : "Upload JSON"}
          </Button>
        </div>
      </section>
      {/* Секция JSON (Bulk Create) */}
      <section className="p-4 border border-accent rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-3 text-blue-900">
          Обновить описание Products (JSON)
        </h2>
        <p className="text-sm text-text mb-4">
          Выберите JSON файл с массивом продуктов для массового создания или
          обновления.
        </p>
        <div className="flex items-center space-x-4">
          <Input
            type="file"
            accept=".json"
            onChange={(e) => setJsonFile(e.target.files?.[0] || null)}
            className="bg-white"
          />
          <Button
            onClick={handleJsonImportOpisanie}
            disabled={isLoading.jsonImport || !jsonFile}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading.jsonImport ? "Processing..." : "Upload JSON"}
          </Button>
        </div>
      </section>
      <section className="p-4 border border-accent rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-3">XLSX Import Price</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input
              type="file"
              accept=".xlsx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button
              onClick={handleImportPrice}
              disabled={isLoading.import || !file}
            >
              {isLoading.import ? "Importing..." : "Import XLSX"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
