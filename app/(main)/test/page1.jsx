"use client";
import React, { use } from "react";

import PopularProduct from "@/components/PopularProduct";
import CatalogButton from "@/components/shared/CatalogButton";
import Advantages from "../product/[slug]/Advantages2";
import useCartStore from "@/lib/store/cartStore";

console.log("Cart store:", useCartStore.getState());

export default function test() {
  return (
    <div className="container mx-auto px-4">
      <PopularProduct />
      <CatalogButton />
      <Advantages />
    </div>
  );
}
