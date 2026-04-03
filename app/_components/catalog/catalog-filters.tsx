import type { Jersey, JerseyModel, JerseySize } from "@/app/_lib/catalog";

type CategoryFilter = "Todas" | "Clube" | "Selecao";
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
  "w-full rounded-2xl border border-[color:var(--border)] bg-[color:color-mix(in_oklab,var(--card)_84%,white)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition placeholder:text-[color:var(--muted-foreground)] focus:border-[color:var(--primary)] focus:ring-4 focus:ring-[color:color-mix(in_oklab,var(--primary)_12%,white)]";

export function CatalogFilters({
  filters,
  teams,
  resultsCount,
  onChange,
  onReset,
}: CatalogFiltersProps) {
  return (
    <section className="flex w-full flex-col gap-6 rounded-[1.6rem] border border-white/70 bg-white/78 px-4 py-5 shadow-[0_20px_55px_rgba(90,80,45,0.08)] backdrop-blur sm:px-5 sm:py-6 md:rounded-[2rem] md:px-8 md:py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold uppercase tracking-[0.22em] text-[color:var(--primary)]">
            Filtros do catalogo
          </span>
          <h2 className="font-heading text-xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-2xl md:text-3xl">
            Encontre a peca certa sem esforco.
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="w-full rounded-full border border-[color:var(--border)] bg-[color:var(--secondary)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--secondary-foreground)] sm:w-auto">
            {resultsCount} resultado(s)
          </span>
          <button
            type="button"
            onClick={onReset}
            className="w-full cursor-pointer rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:color-mix(in_oklab,var(--foreground)_86%,black)] sm:w-auto sm:py-2"
          >
            Limpar filtros
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
            <option value="Selecao">Selecao</option>
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
            Preco de
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
            Preco ate
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
            <option value="Retro">Retro</option>
          </select>
        </div>
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
