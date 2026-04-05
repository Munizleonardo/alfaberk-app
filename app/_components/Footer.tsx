import Link from "next/link";
import LogoParks from "./LogoParks";

export default function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-6xl px-3 pb-6 pt-2 sm:px-4 md:px-5">
      <div className="relative overflow-hidden rounded-[1.6rem] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(18,22,20,0.92),rgba(12,15,13,0.96))] px-4 py-4 shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-5 sm:py-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(33,184,101,0.12),transparent_30%)]" />

        <div className="relative flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[color:var(--foreground)]">
              © 2026 FootballJerseys. Todos os direitos reservados.
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
              Catalogo premium de camisas
            </p>
          </div>

          <Link
            href="https://parkscompany.com.br"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm text-[color:var(--secondary-foreground)] transition hover:border-[rgba(33,184,101,0.28)] hover:bg-[rgba(255,255,255,0.06)]"
          >
            <span className="text-[color:var(--muted-foreground)]">
              Desenvolvido por
            </span>
            <LogoParks />
          </Link>
        </div>
      </div>
    </footer>
  );
}
