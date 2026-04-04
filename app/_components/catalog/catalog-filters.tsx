"use client";

import { useState } from "react";
import type { Jersey, JerseyModel, JerseySize } from "@/app/_lib/catalog";

type CategoryFilter = "Todas" | "Clube" | "Seleção";
type SizeFilter = "Todos" | JerseySize;
type ModelFilter = "Todos" | JerseyModel;

export type CatalogFilterState = {
  team: string;
  category: CategoryFilter;
  size: SizeFilter;
  model: ModelFilter;
  minPrice: string;
  maxPrice: string;
};

type CatalogFiltersProps = {
  filters: CatalogFilterState;
  teams: string[];
  resultsCount: number;
  onChange: (field: keyof CatalogFilterState, value: string) => void;
  onReset: () => void;
};

const filterLabelClassName =
  "text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[color:var(--muted-foreground)]";

const filterInputClassName =
  "w-full rounded-xl border border-[color:var(--border)] bg-[rgba(255,255,255,0.03)] px-3 py-2.5 text-[0.84rem] text-[color:var(--foreground)] outline-none transition placeholder:text-[color:var(--muted-foreground)] focus:border-[color:var(--primary)] focus:ring-4 focus:ring-[color:color-mix(in_oklab,var(--primary)_18%,transparent)]";

export function CatalogFilters({
  filters,
  teams,
  resultsCount,
  onChange,
  onReset,
}: CatalogFiltersProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleReset = () => {
    onReset();
    setIsMobileFiltersOpen(false);
  };

  return (
    <section className="relative flex w-full flex-col gap-3.5 overflow-hidden rounded-[1rem] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(18,24,21,0.94),rgba(14,18,16,0.96))] px-3 py-3 shadow-[0_12px_28px_rgba(0,0,0,0.22)] backdrop-blur sm:px-4 sm:py-4 md:rounded-[1.35rem] md:px-5 md:py-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[radial-gradient(circle_at_top,rgba(33,184,101,0.14),transparent_68%)]" />
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">
            Filtros do catálogo
          </span>
          <h2 className="font-heading text-[0.95rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-[1.12rem] md:text-[1.42rem]">
            Encontre a peça certa sem esforço.
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="w-full rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-center text-[0.78rem] font-semibold text-[color:var(--secondary-foreground)] sm:w-auto">
            {resultsCount} resultado(s)
          </span>
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen((current) => !current)}
            className="w-full cursor-pointer rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.04)] px-3.5 py-2.5 text-[0.8rem] font-semibold text-[color:var(--foreground)] transition hover:bg-[rgba(255,255,255,0.08)] md:hidden"
            aria-expanded={isMobileFiltersOpen}
            aria-controls="catalog-mobile-filters"
          >
            {isMobileFiltersOpen ? "Ocultar filtros" : "Abrir filtros"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="hidden w-full cursor-pointer rounded-full bg-[color:var(--primary)] px-3.5 py-2.5 text-[0.8rem] font-semibold text-[color:var(--primary-foreground)] transition hover:brightness-110 sm:w-auto sm:py-2 md:block"
          >
            Limpar filtros
          </button>
        </div>
      </div>

      <div
        id="catalog-mobile-filters"
        className={`${isMobileFiltersOpen ? "flex" : "hidden"} flex-col gap-2.5 md:grid md:grid-cols-2 md:gap-3 xl:grid-cols-3`}
      >
        <div className="flex min-w-0 flex-col gap-2">
          <label className={filterLabelClassName} htmlFor="team">
            Time
          </label>
          <select
            id="team"
            value={filters.team}
            onChange={(event) => onChange("team", event.target.value)}
            className={filterInputClassName}
          >
            <option value="">Todos os times</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label className={filterLabelClassName} htmlFor="category">
            Categoria
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={(event) => onChange("category", event.target.value)}
            className={filterInputClassName}
          >
            <option value="Todas">Todas</option>
            <option value="Clube">Clube</option>
            <option value="Seleção">Seleção</option>
          </select>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label className={filterLabelClassName} htmlFor="size">
            Tamanho
          </label>
          <select
            id="size"
            value={filters.size}
            onChange={(event) => onChange("size", event.target.value)}
            className={filterInputClassName}
          >
            <option value="Todos">Todos</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
          </select>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label className={filterLabelClassName} htmlFor="minPrice">
            Preço de
          </label>
          <input
            id="minPrice"
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(event) => onChange("minPrice", event.target.value)}
            placeholder="Ex: 200"
            className={filterInputClassName}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label className={filterLabelClassName} htmlFor="maxPrice">
            Preço ate
          </label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(event) => onChange("maxPrice", event.target.value)}
            placeholder="Ex: 350"
            className={filterInputClassName}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label className={filterLabelClassName} htmlFor="model">
            Modelo da camisa
          </label>
          <select
            id="model"
            value={filters.model}
            onChange={(event) => onChange("model", event.target.value)}
            className={filterInputClassName}
          >
            <option value="Todos">Todos</option>
            <option value="Torcedor">Torcedor</option>
            <option value="Jogador">Jogador</option>
            <option value="Retro">Retrô</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="w-full cursor-pointer rounded-full bg-[color:var(--primary)] px-3.5 py-2.5 text-[0.8rem] font-semibold text-[color:var(--primary-foreground)] transition hover:brightness-110 md:hidden"
        >
          Limpar filtros
        </button>
      </div>
    </section>
  );
}

export function matchesFilters(product: Jersey, filters: CatalogFilterState) {
  const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
  const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;

  if (filters.team && product.team !== filters.team) {
    return false;
  }

  if (filters.category !== "Todas" && product.category !== filters.category) {
    return false;
  }

  if (filters.size !== "Todos" && !product.sizes.includes(filters.size)) {
    return false;
  }

  if (filters.model !== "Todos" && product.model !== filters.model) {
    return false;
  }

  if (minPrice !== null && product.price < minPrice) {
    return false;
  }

  if (maxPrice !== null && product.price > maxPrice) {
    return false;
  }

  return true;
}
