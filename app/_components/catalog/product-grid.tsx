import { LayoutGrid, Rows3 } from "lucide-react";
import type { CatalogMobileView } from "@/app/_components/catalog/catalog-page";
import type { Jersey, JerseyFit, JerseySize } from "@/app/_lib/catalog";
import { ProductCard } from "@/app/_components/catalog/product-card";

type ProductGridProps = {
  mobileView: CatalogMobileView;
  onMobileViewChange: (view: CatalogMobileView) => void;
  products: Jersey[];
  onOpen: (product: Jersey, fit: JerseyFit) => void;
  onAddToCart: (product: Jersey, size: JerseySize, fit: JerseyFit) => void;
};

export function ProductGrid({
  mobileView,
  onMobileViewChange,
  products,
  onOpen,
  onAddToCart,
}: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="flex min-h-[180px] w-full flex-col items-center justify-center gap-3 rounded-[1rem] border border-dashed border-[color:var(--border)] bg-[rgba(18,22,20,0.92)] px-4 py-5 text-center">
        <span className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[color:var(--accent-foreground)]">
          Nenhum item encontrado
        </span>
        <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
          Ajuste os filtros para encontrar outras camisas.
        </h3>
        <p className="max-w-xl text-sm leading-6 text-[color:var(--muted-foreground)]">
          Tente ampliar a faixa de preço, trocar o tamanho ou voltar para todos
          os modelos disponíveis.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex md:hidden">
        <div className="inline-flex w-full rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-1">
          <button
            type="button"
            onClick={() => onMobileViewChange("blocks")}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-[0.76rem] font-semibold transition ${
              mobileView === "blocks"
                ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                : "text-[color:var(--muted-foreground)]"
            }`}
            aria-pressed={mobileView === "blocks"}
          >
            <Rows3 className="size-3.5" />
            Blocos
          </button>
          <button
            type="button"
            onClick={() => onMobileViewChange("grid")}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-[0.76rem] font-semibold transition ${
              mobileView === "grid"
                ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                : "text-[color:var(--muted-foreground)]"
            }`}
            aria-pressed={mobileView === "grid"}
          >
            <LayoutGrid className="size-3.5" />
            Grade
          </button>
        </div>
      </div>

      <div
        className={`grid ${
          mobileView === "grid"
            ? "auto-rows-fr grid-cols-2 gap-2"
            : "gap-2.5"
        } md:grid-cols-2 md:gap-3.5 xl:grid-cols-3`}
      >
        {products.map((product, index) => (
          <div key={product.id} className="flex h-full w-full">
            <ProductCard
              index={index}
              mobileView={mobileView}
              product={product}
              onOpen={onOpen}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
