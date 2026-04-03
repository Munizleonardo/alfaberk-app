import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

type CatalogHeaderProps = {
  cartCount: number;
  onOpenCart: () => void;
};

export function CatalogHeader({ cartCount, onOpenCart }: CatalogHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[1.6rem] border border-[#b08d57]/25 bg-[#0a3522] shadow-[0_28px_90px_rgba(4,26,16,0.34)] sm:rounded-[2rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,168,102,0.22),_transparent_32%),linear-gradient(180deg,rgba(5,43,28,0.28)_0%,rgba(4,30,20,0.54)_100%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-position:center_center] [background-size:140px_140px]" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/12" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

      <div className="relative flex min-h-[430px] flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12 md:min-h-[540px] md:px-10 md:py-16">
        <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6 md:right-8 md:top-8">
          <Button
            type="button"
            onClick={onOpenCart}
            className="relative h-10 rounded-full border border-white/20 bg-white/10 px-3 text-white backdrop-blur hover:bg-white/20 sm:h-12 sm:px-4"
          >
            <ShoppingCart />
            <span className="hidden sm:inline">Carrinho</span>
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d7b77b] px-1 text-[0.65rem] font-bold text-[#0a3522] sm:h-6 sm:min-w-6 sm:text-xs">
              {cartCount}
            </span>
          </Button>
        </div>

        <span className="rounded-full border border-[#c9a866]/30 bg-white/6 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#d7b77b] backdrop-blur sm:px-4 sm:text-[0.72rem] sm:tracking-[0.34em]">
          Premium Football Store
        </span>

        <div className="mt-6 flex flex-col items-center sm:mt-8">
          <Image
            src="/logo.png"
            alt="Logo Football Jerseys"
            width={520}
            height={520}
            className="w-[130px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.28)] sm:w-[180px] md:w-[220px]"
          />
          <h1 className="mt-4 px-4 font-heading text-2xl font-semibold tracking-[0.14em] text-[#d7b77b] uppercase sm:mt-5 sm:text-4xl sm:tracking-[0.22em] md:text-5xl">
            Football Jerseys
          </h1>
        </div>

        <p className="mt-5 max-w-3xl px-2 text-sm leading-6 text-[#f2eadf]/88 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
          Camisas selecionadas com apresentacao mais refinada, navegacao leve e
          um visual inspirado no universo do futebol.
        </p>
      </div>
    </header>
  );
}
