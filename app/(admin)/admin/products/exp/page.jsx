"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminProducts() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState({
    export: false,
    import: false,
  });

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
        `Failed to export products: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, export: false }));
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error("Please select a file to import");
      return;
    }

    setIsLoading((prev) => ({ ...prev, import: true }));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/products/import", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Products imported successfully!");
      } else {
        throw new Error(result.error || "Failed to import");
      }
    } catch (error) {
      toast.error(
        `Failed to import products: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, import: false }));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <div className="space-y-4">
        <div>
          <Button onClick={handleExport} disabled={isLoading.export}>
            {isLoading.export ? "Exporting..." : "Export XLSX"}
          </Button>
        </div>
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
    </div>
  );
}
