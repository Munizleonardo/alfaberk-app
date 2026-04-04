import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

type CatalogHeaderProps = {
  cartCount: number;
  onOpenCart: () => void;
};

export function CatalogHeader({ cartCount, onOpenCart }: CatalogHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[1rem] border border-[#d89b55]/24 bg-[#0a3522] shadow-[0_16px_44px_rgba(4,26,16,0.22)] sm:rounded-[1.45rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(255,146,76,0.34),transparent_18%),radial-gradient(circle_at_86%_12%,rgba(65,210,120,0.24),transparent_21%),radial-gradient(circle_at_82%_88%,rgba(72,187,255,0.18),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(255,205,84,0.18),transparent_30%),linear-gradient(180deg,rgba(11,78,51,0.16)_0%,rgba(4,30,20,0.7)_100%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-position:center_center] [background-size:140px_140px]" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/12" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[20rem] sm:w-[20rem]" />
      <div className="absolute left-1/2 top-1/2 h-[9rem] w-[9rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[12rem] sm:w-[12rem]" />

      <div className="relative flex min-h-[268px] flex-col items-center justify-center px-3 py-5 text-center sm:px-5 sm:py-7 md:min-h-[360px] md:px-8 md:py-9">
        <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6 md:right-8 md:top-8">
          <Button
            type="button"
            onClick={onOpenCart}
            className="relative h-8 rounded-full border border-white/20 bg-white/10 px-2.5 text-white backdrop-blur hover:bg-white/20 sm:h-10 sm:px-3.5"
          >
            <ShoppingCart />
            <span className="hidden sm:inline">Carrinho</span>
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d7b77b] px-1 text-[0.65rem] font-bold text-[#0a3522] sm:h-6 sm:min-w-6 sm:text-xs">
              {cartCount}
            </span>
          </Button>
        </div>

        <span className="rounded-full border border-[#c9a866]/30 bg-white/8 px-2.5 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-[#ffd589] backdrop-blur sm:px-3.5 sm:text-[0.66rem] sm:tracking-[0.26em]">
          Premium Football Store
        </span>

        <div className="mt-3.5 flex flex-col items-center sm:mt-5">
          <Image
            src="/img/logo.png"
            alt="Logo Football Jerseys"
            width={220}
            height={220}
            className="w-[82px] drop-shadow-[0_10px_24px_rgba(0,0,0,0.28)] sm:w-[124px] md:w-[154px]"
          />
          <h1 className="mt-2 px-4 text-balance font-heading text-[1.28rem] font-semibold tracking-[0.07em] text-[#ffd186] uppercase sm:mt-3 sm:text-[2.15rem] sm:tracking-[0.16em] md:text-[2.55rem]">
            Football Jerseys
          </h1>
        </div>

        <p className="mt-2.5 max-w-lg px-2 text-balance text-[0.78rem] leading-5 text-[#fff3df]/88 sm:mt-3.5 sm:text-[0.9rem] sm:leading-6 md:text-[0.98rem]">
          Camisas selecionadas com apresentação mais refinada, navegação leve e
          um visual inspirado no universo do futebol.
        </p>
      </div>
    </header>
  );
}
