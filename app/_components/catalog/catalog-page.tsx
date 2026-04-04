"use client";

import { useState } from "react";
import { CartModal } from "@/app/_components/catalog/cart-modal";
import { CatalogHeader } from "@/app/_components/catalog/catalog-header";
import {
  CatalogFilters,
  type CatalogFilterState,
  matchesFilters,
} from "@/app/_components/catalog/catalog-filters";
import { ProductGrid } from "@/app/_components/catalog/product-grid";
import { ProductModal } from "@/app/_components/catalog/product-modal";
import {
  catalog,
  getCartCount,
  type CartItem,
  type Jersey,
} from "@/app/_lib/catalog";

const initialFilters: CatalogFilterState = {
  team: "",
  category: "Todas",
  size: "Todos",
  model: "Todos",
  minPrice: "",
  maxPrice: "",
};

export function CatalogPage() {
  const [filters, setFilters] = useState<CatalogFilterState>(initialFilters);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Jersey | null>(null);

  const teams = [...new Set(catalog.map((product) => product.team))];
  const filteredProducts = catalog.filter((product) =>
    matchesFilters(product, filters)
  );
  const cartCount = getCartCount(cartItems);

  const handleChange = (field: keyof CatalogFilterState, value: string) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleAddToCart = (product: Jersey) => {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.product.id === product.id);

      if (!existingItem) {
        return [...current, { product, quantity: 1 }];
      }

      return current.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((current) =>
      current.filter((item) => item.product.id !== productId)
    );
  };

  const handleAddFromModal = (product: Jersey) => {
    handleAddToCart(product);
    setSelectedProduct(null);
  };

  return (
    <>
      <main className="relative flex min-h-screen flex-col overflow-hidden px-2 py-2 sm:px-3 sm:py-3 md:px-5 md:py-5">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-3rem] top-16 h-24 w-24 rounded-full bg-[rgba(33,184,101,0.08)] blur-3xl sm:h-36 sm:w-36" />
          <div className="absolute right-[-2rem] top-80 h-24 w-24 rounded-full bg-[rgba(255,255,255,0.04)] blur-3xl sm:h-36 sm:w-36" />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-3 sm:gap-4 md:gap-5">
          <CatalogHeader
            cartCount={cartCount}
            onOpenCart={() => setIsCartOpen(true)}
          />

          <div className="flex flex-col gap-2.5 sm:gap-3.5 md:gap-4.5">
            <CatalogFilters
              filters={filters}
              teams={teams}
              resultsCount={filteredProducts.length}
              onChange={handleChange}
              onReset={() => setFilters(initialFilters)}
            />

            <ProductGrid
              products={filteredProducts}
              onOpen={(product) => setSelectedProduct(product)}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </main>

      <CartModal
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddFromModal}
      />
    </>
  );
}
