import type { Jersey } from "@/app/_lib/catalog";
import { ProductCard } from "@/app/_components/catalog/product-card";

type ProductGridProps = {
  products: Jersey[];
  onOpen: (product: Jersey) => void;
  onAddToCart: (product: Jersey) => void;
};

export function ProductGrid({
  products,
  onOpen,
  onAddToCart,
}: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="flex min-h-[180px] w-full flex-col items-center justify-center gap-3 rounded-[1rem] border border-dashed border-[color:var(--border)] bg-white/72 px-4 py-5 text-center">
        <span className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[color:var(--accent-foreground)]">
          Nenhum item encontrado
        </span>
        <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
          Ajuste os filtros para encontrar outras camisas.
        </h3>
        <p className="max-w-xl text-sm leading-6 text-[color:var(--muted-foreground)]">
          Tente ampliar a faixa de preco, trocar o tamanho ou voltar para todos
          os modelos disponiveis.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid gap-2.5 md:grid-cols-2 md:gap-3.5 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="flex w-full">
            <ProductCard
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
