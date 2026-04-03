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
      <main className="flex min-h-screen flex-col px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <CatalogHeader
            cartCount={cartCount}
            onOpenCart={() => setIsCartOpen(true)}
          />

          <div className="flex flex-col gap-6">
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
