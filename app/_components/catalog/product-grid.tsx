import type { Jersey } from "@/app/_lib/catalog";
import { ProductCard } from "@/app/_components/catalog/product-card";

type ProductGridProps = {
  products: Jersey[];
  onOpen: (product: Jersey) => void;
};

export function ProductGrid({ products, onOpen }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="flex min-h-[260px] w-full flex-col items-center justify-center gap-4 rounded-[2rem] border border-dashed border-[color:var(--border)] bg-white/70 px-6 py-10 text-center">
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
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="flex w-full">
            <ProductCard product={product} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </div>
  );
}
