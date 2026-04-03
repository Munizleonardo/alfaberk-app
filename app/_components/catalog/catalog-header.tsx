import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

type CatalogHeaderProps = {
  cartCount: number;
  onOpenCart: () => void;
};

export function CatalogHeader({ cartCount, onOpenCart }: CatalogHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-[#b08d57]/25 bg-[#0a3522] shadow-[0_28px_90px_rgba(4,26,16,0.34)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,168,102,0.22),_transparent_32%),linear-gradient(180deg,rgba(5,43,28,0.28)_0%,rgba(4,30,20,0.54)_100%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-position:center_center] [background-size:140px_140px]" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/12" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

      <div className="relative flex min-h-[540px] flex-col items-center justify-center px-6 py-12 text-center md:px-10 md:py-16">
        <div className="absolute right-6 top-6 z-10 md:right-8 md:top-8">
          <Button
            type="button"
            onClick={onOpenCart}
            className="relative h-12 rounded-full border border-white/20 bg-white/10 px-4 text-white backdrop-blur hover:bg-white/20"
          >
            <ShoppingCart />
            <span>Carrinho</span>
            <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#d7b77b] px-1 text-xs font-bold text-[#0a3522]">
              {cartCount}
            </span>
          </Button>
        </div>

        <span className="rounded-full border border-[#c9a866]/30 bg-white/6 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#d7b77b] backdrop-blur">
          Premium Football Store
        </span>

        <div className="mt-8 flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Logo Football Jerseys"
            width={520}
            height={520}
            
            className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.28)] sm:w-[180px] md:w-[220px]"
          />
          <h1 className="mt-5 font-heading text-3xl font-semibold tracking-[0.22em] text-[#d7b77b] uppercase sm:text-4xl md:text-5xl">
            Football Jerseys
          </h1>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-7 text-[#f2eadf]/88 sm:text-base md:text-lg">
          Camisas selecionadas com apresentacao mais refinada, navegacao leve e
          um visual inspirado no universo do futebol.
        </p>
      </div>
    </header>
  );
}
