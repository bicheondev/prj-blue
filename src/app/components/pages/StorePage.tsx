import { useState } from "react";
import { toast } from "sonner";
import Desktop from "../../../imports/Desktop9";
import { PRODUCTS } from "../../../data/store";
import type { Product } from "../../../data/types";
import ScaledCanvas from "../ScaledCanvas";

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filteredProducts =
    activeCategory === "전체"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    toast.success(`장바구니에 추가되었습니다!`, {
      description: product.name,
    });
  };

  return (
    <ScaledCanvas>
      <Desktop
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        products={filteredProducts}
        onAddToCart={handleAddToCart}
      />
    </ScaledCanvas>
  );
}
