"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Trash2 } from "lucide-react";
import {
  getCartTotal,
  getRegionalContactLink,
  regionalContacts,
  type CartItem,
} from "@/app/_lib/catalog";
import { Button } from "@/app/_components/ui/button";

type CartModalProps = {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (productId: string) => void;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function CartModal({
  isOpen,
  items,
  onClose,
  onRemoveItem,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(40,35,20,0.58)] px-4 py-6 backdrop-blur-sm">
      <div
        className="absolute inset-0 cursor-pointer"
        aria-hidden="true"
        onClick={handleClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col gap-6 overflow-y-auto rounded-[2rem] border border-white/75 bg-[color:color-mix(in_oklab,var(--card)_88%,white)] p-5 shadow-[0_30px_100px_rgba(60,50,25,0.2)] md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--accent-foreground)]">
              <ShoppingBag />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
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
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--secondary)] text-lg font-bold text-[color:var(--secondary-foreground)] transition hover:bg-[color:var(--muted)]"
            aria-label="Fechar carrinho"
          >
            X
          </button>
        </div>

        {!items.length ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-dashed border-[color:var(--border)] bg-white/60 px-6 py-10 text-center">
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
                  key={item.product.id}
                  className="flex flex-col gap-4 rounded-[1.5rem] border border-[color:var(--border)] bg-white/75 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-heading text-xl font-semibold text-[color:var(--foreground)]">
                        {item.product.name}
                      </h4>
                      <span className="rounded-full bg-[color:var(--muted)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                        {item.product.model}
                      </span>
                    </div>
                    <p className="text-sm text-[color:var(--muted-foreground)]">
                      {item.product.team} - Quantidade: {item.quantity}
                    </p>
                    <strong className="text-lg text-[color:var(--foreground)]">
                      {currencyFormatter.format(item.product.price * item.quantity)}
                    </strong>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onRemoveItem(item.product.id)}
                    className="h-11 rounded-full px-4"
                  >
                    <Trash2 />
                    Excluir produto
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--muted)] p-5">
              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
                    Valor total
                  </span>
                  <strong className="font-heading text-4xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                    {currencyFormatter.format(total)}
                  </strong>
                </div>

                <Button
                  type="button"
                  onClick={() => setShowRegionalContacts(true)}
                  className="h-12 rounded-full bg-[color:var(--foreground)] px-6 text-white hover:bg-[color:var(--primary)]"
                >
                  Finalizar compra
                </Button>
              </div>

              {shouldShowRegionalContacts ? (
                <div className="grid gap-4 pt-2 md:grid-cols-2">
                  {regionalContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex flex-col gap-4 rounded-[1.5rem] border border-[color:var(--border)] bg-white p-5"
                    >
                      <p className="text-sm leading-6 text-[color:var(--foreground)]">
                        {contact.title}
                      </p>
                      <Button
                        asChild
                        className="h-12 rounded-full bg-[color:var(--primary)] text-white hover:bg-[color:var(--foreground)]"
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
