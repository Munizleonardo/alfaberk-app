"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getImagesForFit,
  type Jersey,
  type JerseyFit,
  type JerseySize,
} from "@/app/_lib/catalog";
import { Button } from "@/app/_components/ui/button";

type ProductModalProps = {
  product: {
    item: Jersey;
    fit: JerseyFit;
  } | null;
  onClose: () => void;
  onAddToCart: (product: Jersey, size: JerseySize, fit: JerseyFit) => void;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,6,5,0.72)] px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-6">
      <div
        className="absolute inset-0 cursor-pointer"
        aria-hidden="true"
        onClick={onClose}
      />

      <ModalContent
        key={`${product.item.id}-${product.fit}`}
        product={product.item}
        initialFit={product.fit}
        onClose={onClose}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

function ModalContent({
  product,
  initialFit,
  onClose,
  onAddToCart,
}: {
  product: Jersey;
  initialFit: JerseyFit;
  onClose: () => void;
  onAddToCart: (product: Jersey, size: JerseySize, fit: JerseyFit) => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<JerseySize>(product.sizes[0]!);
  const [selectedFit, setSelectedFit] = useState<JerseyFit>(initialFit);
  const visibleImages = getImagesForFit(product.images, selectedFit);

  return (
    <div className="relative z-10 flex max-h-[94vh] w-full max-w-5xl flex-col gap-5 overflow-y-auto rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(18,22,20,0.98),rgba(12,15,13,0.99))] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.4)] sm:gap-6 sm:rounded-[2rem] sm:p-5 md:p-8">
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
              src={
                visibleImages[activeImage] ??
                visibleImages[0] ??
                product.images.Masculina[0]!
              }
              alt={`${product.name} ${selectedFit.toLowerCase()} imagem ${activeImage + 1}`}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            {visibleImages.map((image, index) => (
              <button
                key={`${product.id}-${selectedFit}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border p-1.5 transition sm:h-24 sm:w-24 sm:rounded-2xl sm:p-2 ${
                  activeImage === index
                    ? "border-[color:var(--primary)] bg-[rgba(33,184,101,0.16)]"
                    : "border-[color:var(--border)] bg-[rgba(255,255,255,0.04)]"
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
            <span className="rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-[color:var(--primary-foreground)]">
              {product.team}
            </span>
            <span className="rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm font-semibold text-[color:var(--secondary-foreground)]">
              {product.category}
            </span>
            <span className="rounded-full bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)]">
              Modelo {product.model}
            </span>
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted-foreground)] sm:text-base sm:leading-8">
            {product.fullDescription}
          </p>

          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-5">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
              Tamanhos disponiveis
            </span>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selectedSize === size
                      ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                      : "border-[color:var(--border)] bg-[rgba(255,255,255,0.06)] text-[color:var(--foreground)]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-5">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
              Modelagem
            </span>
            <div className="inline-flex w-full rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-1">
              {(["Masculina", "Feminina"] as const).map((fit) => (
                <button
                  key={fit}
                  type="button"
                  onClick={() => {
                    setSelectedFit(fit);
                    setActiveImage(0);
                  }}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedFit === fit
                      ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                      : "text-[color:var(--muted-foreground)]"
                  }`}
                  aria-pressed={selectedFit === fit}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-[1.5rem] border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] p-4 sm:p-5">
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
              onClick={() => onAddToCart(product, selectedSize, selectedFit)}
              className="h-12 flex-1 rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:brightness-110"
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
