import type { CategoryId, PlantSize, Product, UseId } from "@/types";
import { normalizeText } from "./text";

export type SortId = "relevancia" | "menor-preco" | "maior-preco" | "nome" | "maior-desconto";

export interface PriceRange {
  id: string;
  label: string;
  /** Limite inferior, inclusivo, em centavos. */
  min: number;
  /** Limite superior, exclusivo, em centavos. */
  max: number;
}

/** Faixas contíguas e sem lacunas: toda planta cai em exatamente uma faixa. */
export const PRICE_RANGES: readonly PriceRange[] = [
  { id: "0-20", label: "Por menos de R$ 20,00", min: 0, max: 2000 },
  { id: "20-30", label: "De R$ 20,00 a R$ 29,99", min: 2000, max: 3000 },
  { id: "30-40", label: "De R$ 30,00 a R$ 39,99", min: 3000, max: 4000 },
  { id: "40-50", label: "De R$ 40,00 a R$ 49,99", min: 4000, max: 5000 },
  { id: "50-60", label: "De R$ 50,00 a R$ 59,99", min: 5000, max: 6000 },
  { id: "60+", label: "R$ 60,00 ou mais", min: 6000, max: Number.POSITIVE_INFINITY },
];

export const SIZE_OPTIONS: ReadonlyArray<{ id: PlantSize; label: string }> = [
  { id: "pequena", label: "Plantas pequenas" },
  { id: "media", label: "Plantas médias" },
  { id: "grande", label: "Plantas grandes" },
];

export const CATEGORY_OPTIONS: ReadonlyArray<{ id: CategoryId; label: string }> = [
  { id: "interior", label: "Plantas de interior" },
  { id: "exterior", label: "Plantas de exterior" },
  { id: "decorativas", label: "Plantas decorativas" },
  { id: "mudas", label: "Mudas e sementes" },
  { id: "tropicais", label: "Plantas tropicais" },
];

export const USE_OPTIONS: ReadonlyArray<{ id: UseId; label: string }> = [
  { id: "escritorio", label: "Para escritório" },
  { id: "facil", label: "Fáceis de cuidar" },
  { id: "estetica", label: "Estética" },
];

export const SORT_OPTIONS: ReadonlyArray<{ id: SortId; label: string }> = [
  { id: "relevancia", label: "Mais populares" },
  { id: "menor-preco", label: "Menor preço" },
  { id: "maior-preco", label: "Maior preço" },
  { id: "maior-desconto", label: "Maior desconto" },
  { id: "nome", label: "Nome (A a Z)" },
];

export interface CatalogFilters {
  q?: string;
  categoria?: CategoryId;
  tamanho?: PlantSize;
  preco?: string;
  uso?: UseId;
  flores?: boolean;
  ordem: SortId;
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

function pick<T extends string>(value: string | undefined, options: ReadonlyArray<{ id: T }>) {
  return options.find((option) => option.id === value)?.id;
}

/** Converte os parâmetros da URL em filtros válidos, descartando valores desconhecidos. */
export function parseFilters(params: RawParams): CatalogFilters {
  const q = first(params.q)?.trim().slice(0, 80);
  return {
    q: q || undefined,
    categoria: pick(first(params.categoria), CATEGORY_OPTIONS),
    tamanho: pick(first(params.tamanho), SIZE_OPTIONS),
    preco: pick(first(params.preco), PRICE_RANGES),
    uso: pick(first(params.uso), USE_OPTIONS),
    flores: first(params.flores) === "1" ? true : undefined,
    ordem: pick(first(params.ordem), SORT_OPTIONS) ?? "relevancia",
  };
}

/** Monta a URL do catálogo, omitindo filtros vazios e a ordenação padrão. */
export function buildCatalogHref(filters: Partial<CatalogFilters>): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.categoria) params.set("categoria", filters.categoria);
  if (filters.tamanho) params.set("tamanho", filters.tamanho);
  if (filters.preco) params.set("preco", filters.preco);
  if (filters.uso) params.set("uso", filters.uso);
  if (filters.flores) params.set("flores", "1");
  if (filters.ordem && filters.ordem !== "relevancia") params.set("ordem", filters.ordem);
  const query = params.toString();
  return query ? `/produtos?${query}` : "/produtos";
}

export function countActiveFilters(filters: CatalogFilters): number {
  return [
    filters.q,
    filters.categoria,
    filters.tamanho,
    filters.preco,
    filters.uso,
    filters.flores,
  ].filter(Boolean).length;
}

export function matchesQuery(product: Product, query: string): boolean {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalizeText(
    [
      product.name,
      product.scientificName,
      product.description,
      product.categories.join(" "),
      product.uses.join(" "),
    ].join(" "),
  );
  return terms.every((term) => haystack.includes(term));
}

export function sortProducts(list: Product[], order: SortId): Product[] {
  const sorted = [...list];
  switch (order) {
    case "menor-preco":
      return sorted.sort((a, b) => a.price - b.price);
    case "maior-preco":
      return sorted.sort((a, b) => b.price - a.price);
    case "nome":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    case "maior-desconto":
      return sorted.sort((a, b) => savings(b) - savings(a));
    default:
      return sorted.sort(
        (a, b) => (a.popularRank ?? 99) - (b.popularRank ?? 99) || b.reviews - a.reviews,
      );
  }
}

function savings(product: Product): number {
  return product.compareAtPrice ? 1 - product.price / product.compareAtPrice : 0;
}

export function filterProducts(list: Product[], filters: CatalogFilters): Product[] {
  const range = PRICE_RANGES.find((r) => r.id === filters.preco);
  const filtered = list.filter((product) => {
    if (filters.q && !matchesQuery(product, filters.q)) return false;
    if (filters.categoria && !product.categories.includes(filters.categoria)) return false;
    if (filters.tamanho && product.size !== filters.tamanho) return false;
    if (filters.uso && !product.uses.includes(filters.uso)) return false;
    if (filters.flores && !product.blooms) return false;
    if (range && (product.price < range.min || product.price >= range.max)) return false;
    return true;
  });
  return sortProducts(filtered, filters.ordem);
}

/** Busca rápida para o campo de pesquisa: nomes que começam com o termo vêm primeiro. */
export function searchProducts(list: Product[], query: string, limit = 6): Product[] {
  const normalized = normalizeText(query);
  if (normalized.length < 2) return [];
  return list
    .filter((product) => matchesQuery(product, query))
    .sort((a, b) => {
      const aStarts = normalizeText(a.name).startsWith(normalized) ? 0 : 1;
      const bStarts = normalizeText(b.name).startsWith(normalized) ? 0 : 1;
      return aStarts - bStarts || (a.popularRank ?? 99) - (b.popularRank ?? 99);
    })
    .slice(0, limit);
}

export function getCategoryLabel(id: CategoryId): string {
  return CATEGORY_OPTIONS.find((c) => c.id === id)?.label ?? id;
}
