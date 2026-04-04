"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { type Jersey } from "@/app/_lib/catalog";
import { Button } from "@/app/_components/ui/button";

type ProductCardProps = {
  product: Jersey;
  onOpen: (product: Jersey) => void;
  onAddToCart: (product: Jersey) => void;
  index: number;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ProductCard({
  product,
  onOpen,
  onAddToCart,
  index,
}: ProductCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = cardRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`catalog-card-enter group flex min-h-full min-w-0 flex-col gap-3 overflow-hidden rounded-[1.15rem] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(18,22,20,0.96),rgba(14,17,15,0.98))] p-2.5 shadow-[0_14px_28px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(33,184,101,0.22)] hover:shadow-[0_22px_44px_rgba(0,0,0,0.34)] sm:rounded-[1.45rem] sm:p-3 ${
        isVisible ? "is-visible" : ""
      }`}
      style={
        {
          "--card-delay": `${Math.min(index * 90, 360)}ms`,
        } as CSSProperties
      }
    >
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="flex min-w-0 cursor-pointer flex-col gap-3 text-left"
      >
        <div
          className="relative aspect-square overflow-hidden rounded-[0.95rem] border border-white/30 sm:rounded-[1.2rem]"
          style={{
            background: `linear-gradient(135deg, ${product.colors.primary}, ${product.colors.secondary})`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_36%)]" />
          <div className="absolute inset-x-2.5 top-2.5 z-10 flex items-center justify-between">
            <span className="rounded-full bg-[color:var(--primary)] px-2 py-1 text-[0.54rem] font-bold uppercase tracking-[0.16em] text-[color:var(--primary-foreground)] backdrop-blur">
              {product.team}
            </span>
            <span className="rounded-full border border-white/18 bg-black/28 px-2 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
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

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              {product.badge ? (
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--primary)]">
                  {product.badge}
                </span>
              ) : null}
              <h3 className="text-balance font-heading text-[0.95rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-[1.08rem]">
                {product.name}
              </h3>
            </div>
            <span className="shrink-0 rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] px-2 py-1 text-[0.62rem] font-bold text-[color:var(--secondary-foreground)]">
              {product.category}
            </span>
          </div>

          <p className="text-[0.78rem] leading-5 text-[color:var(--muted-foreground)]">
            {product.shortDescription}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] px-2 py-1 text-[0.62rem] font-semibold text-[color:var(--secondary-foreground)]"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </button>

      <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
            Valor
          </span>
          <strong className="font-heading text-[1.2rem] font-semibold text-[color:var(--foreground)] sm:text-[1.4rem]">
            {currencyFormatter.format(product.price)}
          </strong>
        </div>
        <Button
          type="button"
          onClick={() => onAddToCart(product)}
          className="h-auto min-h-9 w-full rounded-full bg-[color:var(--primary)] px-3 py-2 text-center text-[0.76rem] leading-tight whitespace-normal text-[color:var(--primary-foreground)] hover:brightness-110 sm:w-auto sm:px-4"
        >
          <ShoppingCart />
          Adicionar ao Carrinho
        </Button>
      </div>
    </article>
  );
}
