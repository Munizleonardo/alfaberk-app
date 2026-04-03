"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { type Jersey } from "@/app/_lib/catalog";
import { Button } from "@/app/_components/ui/button";

type ProductModalProps = {
  product: Jersey | null;
  onClose: () => void;
  onAddToCart: (product: Jersey) => void;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  useEffect(() => {
    if (!product) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, product]);

  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(40,35,20,0.58)] px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-6">
      <div
        className="absolute inset-0 cursor-pointer"
        aria-hidden="true"
        onClick={onClose}
      />

      <ModalContent
        key={product.id}
        product={product}
        onClose={onClose}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

function ModalContent({
  product,
  onClose,
  onAddToCart,
}: {
  product: Jersey;
  onClose: () => void;
  onAddToCart: (product: Jersey) => void;
}) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="relative z-10 flex max-h-[94vh] w-full max-w-5xl flex-col gap-5 overflow-y-auto rounded-[1.5rem] border border-white/75 bg-[color:color-mix(in_oklab,var(--card)_88%,white)] p-4 shadow-[0_30px_100px_rgba(60,50,25,0.2)] sm:gap-6 sm:rounded-[2rem] sm:p-5 md:p-8">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          {product.badge ? (
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--primary)]">
              {product.badge}
            </span>
          ) : null}
          <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-3xl">
            {product.name}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--secondary)] text-lg font-bold text-[color:var(--secondary-foreground)] transition hover:bg-[color:var(--muted)] sm:h-12 sm:w-12"
          aria-label="Fechar detalhes"
        >
          X
        </button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <div
            className="relative aspect-square overflow-hidden rounded-[1.75rem]"
            style={{
              background: `linear-gradient(135deg, ${product.colors.primary}, ${product.colors.secondary})`,
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_38%)]" />
            <Image
              src={product.images[activeImage]}
              alt={`${product.name} imagem ${activeImage + 1}`}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            {product.images.map((image, index) => (
              <button
                key={`${product.id}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border p-1.5 transition sm:h-24 sm:w-24 sm:rounded-2xl sm:p-2 ${
                  activeImage === index
                    ? "border-[color:var(--primary)] bg-[color:color-mix(in_oklab,var(--accent)_55%,white)]"
                    : "border-[color:var(--border)] bg-[color:var(--muted)]"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} miniatura ${index + 1}`}
                  width={96}
                  height={96}
                  unoptimized
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm font-semibold text-white">
              {product.team}
            </span>
            <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--secondary)] px-4 py-2 text-sm font-semibold text-[color:var(--secondary-foreground)]">
              {product.category}
            </span>
            <span className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-[color:var(--accent-foreground)]">
              Modelo {product.model}
            </span>
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted-foreground)] sm:text-base sm:leading-8">
            {product.fullDescription}
          </p>

          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--muted)] p-5">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
              Tamanhos disponiveis
            </span>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--foreground)]"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-[1.5rem] border border-[color:var(--border)] bg-white/70 p-4 sm:p-5">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
              Valor
            </span>
            <strong className="font-heading text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">
              {currencyFormatter.format(product.price)}
            </strong>
            <span className="text-sm text-[color:var(--muted-foreground)]">
              Veja os detalhes e adicione este item ao seu carrinho.
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={() => onAddToCart(product)}
              className="h-12 flex-1 rounded-full bg-[color:var(--foreground)] text-white hover:bg-[color:var(--primary)]"
            >
              <ShoppingCart />
              Adicionar ao Carrinho
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="h-12 flex-1 rounded-full"
            >
              Continuar vendo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
