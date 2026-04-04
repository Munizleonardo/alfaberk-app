import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { type Jersey } from "@/app/_lib/catalog";
import { Button } from "@/app/_components/ui/button";

type ProductCardProps = {
  product: Jersey;
  onOpen: (product: Jersey) => void;
  onAddToCart: (product: Jersey) => void;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ProductCard({
  product,
  onOpen,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="group flex min-h-full min-w-0 flex-col gap-4 overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-4 shadow-[0_18px_50px_rgba(90,80,45,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(90,80,45,0.12)]">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="flex min-w-0 cursor-pointer flex-col gap-4 text-left"
      >
        <div
          className="relative aspect-square overflow-hidden rounded-[1.6rem] border border-white/30"
          style={{
            background: `linear-gradient(135deg, ${product.colors.primary}, ${product.colors.secondary})`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_36%)]" />
          <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between">
            <span className="rounded-full bg-white/80 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[color:var(--foreground)] backdrop-blur">
              {product.team}
            </span>
            <span className="rounded-full border border-white/40 bg-black/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
              {product.model}
            </span>
          </div>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-center transition duration-500 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              {product.badge ? (
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--primary)]">
                  {product.badge}
                </span>
              ) : null}
              <h3 className="text-balance font-heading text-xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                {product.name}
              </h3>
            </div>
            <span className="shrink-0 rounded-full border border-[color:var(--border)] bg-[color:var(--secondary)] px-3 py-1 text-xs font-bold text-[color:var(--secondary-foreground)]">
              {product.category}
            </span>
          </div>

          <p className="text-sm leading-6 text-[color:var(--muted-foreground)]">
            {product.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-1 text-xs font-semibold text-[color:var(--secondary-foreground)]"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </button>

      <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
            Valor
          </span>
          <strong className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
            {currencyFormatter.format(product.price)}
          </strong>
        </div>
        <Button
          type="button"
          onClick={() => onAddToCart(product)}
          className="h-auto min-h-11 w-full rounded-full bg-[color:var(--foreground)] px-4 py-3 text-center leading-tight whitespace-normal text-white hover:bg-[color:var(--primary)] sm:w-auto sm:px-5"
        >
          <ShoppingCart />
          Adicionar ao Carrinho
        </Button>
      </div>
    </article>
  );
}
