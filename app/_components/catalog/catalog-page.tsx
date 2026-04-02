"use client";

import { useState } from "react";
import { CatalogHeader } from "@/app/_components/catalog/catalog-header";
import {
  CatalogFilters,
  type CatalogFilterState,
  matchesFilters,
} from "@/app/_components/catalog/catalog-filters";
import { ProductGrid } from "@/app/_components/catalog/product-grid";
import { ProductModal } from "@/app/_components/catalog/product-modal";
import { catalog, type Jersey } from "@/app/_lib/catalog";

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
  const [selectedProduct, setSelectedProduct] = useState<Jersey | null>(null);

  const teams = [...new Set(catalog.map((product) => product.team))];
  const filteredProducts = catalog.filter((product) =>
    matchesFilters(product, filters)
  );
  const handleChange = (field: keyof CatalogFilterState, value: string) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <>
      <main className="flex min-h-screen flex-col px-4 py-4 md:px-8 md:py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <CatalogHeader />

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
            />
          </div>
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
