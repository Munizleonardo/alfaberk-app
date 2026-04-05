"use client";

import { useEffect, useRef, useState } from "react";
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
  type JerseyFit,
  type Jersey,
  type JerseySize,
} from "@/app/_lib/catalog";

const initialFilters: CatalogFilterState = {
  team: "",
  category: "Todas",
  size: "Todos",
  model: "Todos",
  minPrice: "",
  maxPrice: "",
};

export type CatalogMobileView = "blocks" | "grid";

export function CatalogPage() {
  const [filters, setFilters] = useState<CatalogFilterState>(initialFilters);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    item: Jersey;
    fit: JerseyFit;
  } | null>(null);
  const [mobileView, setMobileView] = useState<CatalogMobileView>("blocks");
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasShownExitPopupRef = useRef(false);

  const teams = [...new Set(catalog.map((product) => product.team))];
  const filteredProducts = catalog.filter((product) =>
    matchesFilters(product, filters)
  );
  const cartCount = getCartCount(cartItems);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const wasShown = window.sessionStorage.getItem("exit-discount-popup");

    if (wasShown === "shown") {
      hasShownExitPopupRef.current = true;
    }
  }, []);

  useEffect(() => {
    const registerInteraction = () => setHasInteracted(true);

    window.addEventListener("pointerdown", registerInteraction, {
      passive: true,
      once: true,
    });
    window.addEventListener("keydown", registerInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", registerInteraction);
      window.removeEventListener("keydown", registerInteraction);
    };
  }, []);

  useEffect(() => {
    const onMouseOut = (event: MouseEvent) => {
      if (window.innerWidth < 1024) {
        return;
      }

      if (hasShownExitPopupRef.current) {
        return;
      }

      const relatedTarget = event.relatedTarget as Node | null;

      if (relatedTarget) {
        return;
      }

      if (event.clientY > 16) {
        return;
      }

      hasShownExitPopupRef.current = true;
      window.sessionStorage.setItem("exit-discount-popup", "shown");
      setIsExitPopupOpen(true);
    };

    document.addEventListener("mouseout", onMouseOut);

    return () => document.removeEventListener("mouseout", onMouseOut);
  }, []);

  useEffect(() => {
    if (!isExitPopupOpen || !hasInteracted) {
      return;
    }

    const AudioContextCtor =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextCtor) {
      return;
    }

    try {
      const context = new AudioContextCtor();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(920, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        1320,
        context.currentTime + 0.14
      );
      oscillator.frequency.exponentialRampToValueAtTime(
        980,
        context.currentTime + 0.28
      );

      gainNode.gain.setValueAtTime(0.0001, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + 0.34
      );

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.start();
      oscillator.stop(context.currentTime + 0.36);

      oscillator.onended = () => {
        void context.close();
      };
    } catch {
      // Ignore audio failures silently; popup still works without sound.
    }
  }, [hasInteracted, isExitPopupOpen]);

  const handleChange = (field: keyof CatalogFilterState, value: string) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleAddToCart = (
    product: Jersey,
    size: JerseySize,
    fit: JerseyFit
  ) => {
    setCartItems((current) => {
      const existingItem = current.find(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.fit === fit
      );

      if (!existingItem) {
        return [...current, { product, size, fit, quantity: 1 }];
      }

      return current.map((item) =>
        item.product.id === product.id &&
        item.size === size &&
        item.fit === fit
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartItemQuantity = (
    productId: string,
    size: JerseySize,
    fit: JerseyFit,
    nextQuantity: number
  ) => {
    setCartItems((current) =>
      current.flatMap((item) => {
        if (
          item.product.id !== productId ||
          item.size !== size ||
          item.fit !== fit
        ) {
          return [item];
        }

        if (nextQuantity <= 0) {
          return [];
        }

        return [{ ...item, quantity: nextQuantity }];
      })
    );
  };

  const handleAddFromModal = (
    product: Jersey,
    size: JerseySize,
    fit: JerseyFit
  ) => {
    handleAddToCart(product, size, fit);
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
              mobileView={mobileView}
              onMobileViewChange={setMobileView}
              products={filteredProducts}
              onOpen={(product, fit) => setSelectedProduct({ item: product, fit })}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </main>

      <CartModal
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateItemQuantity={handleUpdateCartItemQuantity}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddFromModal}
      />

      {isExitPopupOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(4,8,6,0.72)] px-4 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            onClick={() => setIsExitPopupOpen(false)}
          />
          <div className="relative flex w-full max-w-md flex-col items-center gap-4 rounded-[1.5rem] border border-[#f3d27a]/35 bg-[linear-gradient(180deg,#b01a18_0%,#8f1110_45%,#730c0c_100%)] px-6 py-7 text-center shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 rounded-[1.5rem] border border-white/10" />
            <span className="rounded-full border border-white/20 bg-black/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#ffe9b8]">
              Oferta Especial
            </span>
            <div className="relative h-16 w-12 rounded-[0.85rem] border border-[#ffd77f]/40 bg-[linear-gradient(180deg,#ff4740_0%,#cf1714_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.26)]" />
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]">
                Compre sua camisa agora com desconto!
              </h3>
              <p className="text-sm leading-6 text-white/84">
                Aproveite antes de sair e garanta sua camisa com uma oferta
                especial por tempo limitado.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsExitPopupOpen(false)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-black/10 text-lg font-bold text-white transition hover:bg-black/20"
              aria-label="Fechar popup"
            >
              X
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
