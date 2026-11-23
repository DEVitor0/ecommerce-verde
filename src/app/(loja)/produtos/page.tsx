import type { Metadata } from "next";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import styles from "@/components/catalog/Catalog.module.css";
import { SortSelect } from "@/components/catalog/SortSelect";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import {
  buildCatalogHref,
  CATEGORY_OPTIONS,
  countActiveFilters,
  filterProducts,
  parseFilters,
  PRICE_RANGES,
  SIZE_OPTIONS,
  USE_OPTIONS,
  type CatalogFilters as Filters,
} from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Todas as plantas",
  description:
    "Filtre por tamanho, preço, ambiente e nível de cuidado e encontre a planta certa para o seu espaço.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function activePills(filters: Filters): Array<{ key: string; label: string; href: string }> {
  const pills: Array<{ key: string; label: string; href: string }> = [];
  const add = (key: keyof Filters, label: string | undefined) => {
    if (label) pills.push({ key, label, href: buildCatalogHref({ ...filters, [key]: undefined }) });
  };
  add("q", filters.q ? `“${filters.q}”` : undefined);
  add("categoria", CATEGORY_OPTIONS.find((c) => c.id === filters.categoria)?.label);
  add("tamanho", SIZE_OPTIONS.find((c) => c.id === filters.tamanho)?.label);
  add("uso", USE_OPTIONS.find((c) => c.id === filters.uso)?.label);
  add("preco", PRICE_RANGES.find((c) => c.id === filters.preco)?.label);
  add("flores", filters.flores ? "Plantas que florescem" : undefined);
  return pills;
}

export default async function CatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = parseFilters(await searchParams);
  const results = filterProducts(products, filters);
  const active = countActiveFilters(filters);
  const pills = activePills(filters);

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <h1 className={styles.title}>Todas as plantas</h1>
        <p className={styles.count} role="status">
          {results.length === 1 ? "1 planta encontrada" : `${results.length} plantas encontradas`}
        </p>
      </div>

      <div className={styles.layout}>
        <aside aria-label="Filtros">
          <details className={styles.filterToggle}>
            <summary>Filtros{active > 0 ? ` (${active})` : ""}</summary>
            <div>
              <CatalogFilters filters={filters} />
            </div>
          </details>
          <div className={styles.desktopOnly}>
            <CatalogFilters filters={filters} />
          </div>
        </aside>

        <section aria-label="Resultados">
          <div className={styles.toolbar}>
            <div className={styles.active}>
              {pills.map((pill) => (
                <Link
                  key={pill.key}
                  href={pill.href}
                  replace
                  scroll={false}
                  className={styles.pill}
                  aria-label={`Remover filtro ${pill.label}`}
                >
                  {pill.label}
                  <FaXmark aria-hidden="true" />
                </Link>
              ))}
              {pills.length > 1 && (
                <Link href="/produtos" replace scroll={false} className={styles.clear}>
                  Limpar filtros
                </Link>
              )}
            </div>
            <SortSelect filters={filters} />
          </div>

          {results.length === 0 ? (
            <div className={styles.empty}>
              <h2>Nenhuma planta com esses filtros</h2>
              <p>Tente remover algum filtro ou buscar por outro termo.</p>
              <Link href="/produtos" className="btn btn-primary">
                Limpar filtros
              </Link>
            </div>
          ) : (
            <div className={styles.grid} key={JSON.stringify(filters)}>
              {results.map((product, i) => (
                <div
                  key={product.id}
                  className={styles.item}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <ProductCard
                    product={product}
                    priority={i < 3}
                    sizes="(max-width: 860px) 45vw, 22vw"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
