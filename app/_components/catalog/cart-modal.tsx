"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import {
  getCartTotal,
  getRegionalContactLink,
  regionalContacts,
  type CartItem,
  type JerseyFit,
  type JerseySize,
} from "@/app/_lib/catalog";
import { Button } from "@/app/_components/ui/button";

type CartModalProps = {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateItemQuantity: (
    productId: string,
    size: JerseySize,
    fit: JerseyFit,
    nextQuantity: number
  ) => void;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function CartModal({
  isOpen,
  items,
  onClose,
  onUpdateItemQuantity,
}: CartModalProps) {
  const [showRegionalContacts, setShowRegionalContacts] = useState(false);
  const shouldShowRegionalContacts = showRegionalContacts && items.length > 0;

  const handleClose = () => {
    setShowRegionalContacts(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowRegionalContacts(false);
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const total = getCartTotal(items);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,6,5,0.72)] px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-6">
      <div
        className="absolute inset-0 cursor-pointer"
        aria-hidden="true"
        onClick={handleClose}
      />

      <div className="relative z-10 flex max-h-[94vh] w-full max-w-3xl flex-col gap-5 overflow-y-auto rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(18,22,20,0.98),rgba(12,15,13,0.99))] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.4)] sm:gap-6 sm:rounded-[2rem] sm:p-5 md:p-8">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--accent-foreground)] sm:h-12 sm:w-12">
              <ShoppingBag />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-3xl">
                Seu carrinho
              </h3>
              <p className="text-sm text-[color:var(--muted-foreground)]">
                Revise os produtos selecionados antes de finalizar.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--secondary)] text-lg font-bold text-[color:var(--secondary-foreground)] transition hover:bg-[color:var(--muted)] sm:h-12 sm:w-12"
            aria-label="Fechar carrinho"
          >
            X
          </button>
        </div>

        {!items.length ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-[1.4rem] border border-dashed border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-8 text-center sm:min-h-[260px] sm:rounded-[1.75rem] sm:px-6 sm:py-10">
            <span className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[color:var(--accent-foreground)]">
              Carrinho vazio
            </span>
            <p className="max-w-lg text-sm leading-6 text-[color:var(--muted-foreground)]">
              Clique em um produto para adicionar ao carrinho e acompanhar o
              total por aqui.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.fit}`}
                  className="flex flex-col gap-4 rounded-[1.3rem] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-[1.5rem]"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-heading text-lg font-semibold text-[color:var(--foreground)] sm:text-xl">
                        {item.product.name}
                      </h4>
                      <span className="rounded-full bg-[color:var(--muted)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                        {item.product.model}
                      </span>
                    </div>
                    <p className="text-sm text-[color:var(--muted-foreground)]">
                      {item.product.team} - Tamanho: {item.size} - {item.fit}
                    </p>
                    <strong className="text-lg text-[color:var(--foreground)]">
                      {currencyFormatter.format(item.product.price * item.quantity)}
                    </strong>
                  </div>

                  <div className="flex flex-col gap-2 sm:items-end">
                    <div className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-1">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateItemQuantity(
                            item.product.id,
                            item.size,
                            item.fit,
                            item.quantity - 1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--foreground)] transition hover:bg-[rgba(255,255,255,0.08)]"
                        aria-label={`Diminuir quantidade de ${item.product.name}`}
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="min-w-10 text-center text-sm font-semibold text-[color:var(--foreground)]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateItemQuantity(
                            item.product.id,
                            item.size,
                            item.fit,
                            item.quantity + 1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--foreground)] transition hover:bg-[rgba(255,255,255,0.08)]"
                        aria-label={`Aumentar quantidade de ${item.product.name}`}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 rounded-[1.4rem] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-4 sm:rounded-[1.75rem] sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
                    Valor total
                  </span>
                  <strong className="font-heading text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">
                    {currencyFormatter.format(total)}
                  </strong>
                </div>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                  <Button
                    type="button"
                    onClick={() => setShowRegionalContacts(true)}
                    className="order-1 h-12 w-full rounded-full bg-[color:var(--primary)] px-6 text-[color:var(--primary-foreground)] hover:brightness-110 sm:order-none sm:w-auto"
                  >
                    Finalizar compra
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="order-2 h-12 w-full rounded-full px-6 sm:order-none sm:w-auto"
                  >
                    Continuar comprando
                  </Button>
                </div>
              </div>

              {shouldShowRegionalContacts ? (
                <div className="grid gap-4 pt-2 md:grid-cols-2">
                  {regionalContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex h-full flex-col gap-4 rounded-[1.5rem] border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] p-5"
                    >
                      <p className="text-sm leading-6 text-[color:var(--foreground)]">
                        {contact.title}
                      </p>
                      <Button
                        asChild
                        className="mt-auto h-12 w-full rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:brightness-110"
                      >
                        <a
                          href={getRegionalContactLink(contact.phone, items)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Entre em Contato
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
