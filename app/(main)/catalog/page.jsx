import Category from "@/components/shared/Category";
import ProizvodstvoComponent from "@/components/shared/Proizvodstvo";
import React from "react";

export const metadata = {
  title: "Каталог товаров | ЭЛЕКТРОЩИТ-ПРО",
  description: "Коталог товаров",
};

export default function Catalog() {
  return (
    <div className="container mx-auto">
      <h1>Каталог</h1>
      <Category />
    </div>
  );
}
