"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function DeleteButton({ productId }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Вы уверены, что хотите удалить этот товар?")) {
      return;
    }

    const formData = new FormData();
    formData.append("id", productId);

    try {
      const response = await fetch("/api/products/delete", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/products");
        router.refresh();
      } else {
        alert("Ошибка при удалении товара");
      }
    } catch (error) {
      alert("Ошибка при удалении товара: " + error.message);
    }
  }

  return (
    <Button
      type="button"
      className="text-red-700"
      variant="destructive"
      onClick={handleDelete}
    >
      Удалить
    </Button>
  );
}
