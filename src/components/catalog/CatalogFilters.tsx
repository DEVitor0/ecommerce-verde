import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  buildCatalogHref,
  CATEGORY_OPTIONS,
  PRICE_RANGES,
  SIZE_OPTIONS,
  USE_OPTIONS,
  type CatalogFilters as Filters,
} from "@/lib/catalog";
import styles from "./Catalog.module.css";

type Key = "categoria" | "tamanho" | "preco" | "uso";

/** Alterna um filtro: clicar no ativo o remove. Tudo são links, então funciona sem JavaScript. */
function toggle(filters: Filters, key: Key, value: string) {
  const next = { ...filters, [key]: filters[key] === value ? undefined : value };
  return buildCatalogHref(next as Filters);
}

function Chips({
  filters,
  name,
  title,
  options,
}: {
  filters: Filters;
  name: Key;
  title: string;
  options: ReadonlyArray<{ id: string; label: string }>;
}) {
  return (
    <div className={styles.group}>
      <h2>{title}</h2>
      <div className={styles.chips}>
        {options.map((o) => (
          <Link
            key={o.id}
            href={toggle(filters, name, o.id)}
            replace
            scroll={false}
            className={styles.chip}
            aria-current={filters[name] === o.id}
          >
            {o.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CatalogFilters({ filters }: { filters: Filters }) {
  return (
    <div className={styles.sidebar}>
      <form action="/produtos" role="search" className={styles.search}>
        {filters.categoria && <input type="hidden" name="categoria" value={filters.categoria} />}
        {filters.tamanho && <input type="hidden" name="tamanho" value={filters.tamanho} />}
        {filters.preco && <input type="hidden" name="preco" value={filters.preco} />}
        {filters.uso && <input type="hidden" name="uso" value={filters.uso} />}
        {filters.flores && <input type="hidden" name="flores" value="1" />}
        <input type="hidden" name="ordem" value={filters.ordem} />
        <label className="sr-only" htmlFor="catalog-q">
          Buscar no catálogo
        </label>
        <input
          id="catalog-q"
          className="input"
          type="search"
          name="q"
          defaultValue={filters.q}
          placeholder="Buscar plantas"
        />
        <button type="submit" aria-label="Buscar">
          <FaMagnifyingGlass aria-hidden="true" />
        </button>
      </form>

      <Chips filters={filters} name="categoria" title="Categoria" options={CATEGORY_OPTIONS} />
      <Chips filters={filters} name="tamanho" title="Tamanho" options={SIZE_OPTIONS} />
      <Chips filters={filters} name="uso" title="Ideal para" options={USE_OPTIONS} />

      <div className={styles.group}>
        <h2>Preço</h2>
        <div className={styles.list}>
          {PRICE_RANGES.map((r) => (
            <Link
              key={r.id}
              href={toggle(filters, "preco", r.id)}
              replace
              scroll={false}
              className={styles.row}
              aria-current={filters.preco === r.id}
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <h2>Floração</h2>
        <div className={styles.chips}>
          <Link
            href={buildCatalogHref({ ...filters, flores: filters.flores ? undefined : true })}
            replace
            scroll={false}
            className={styles.chip}
            aria-current={Boolean(filters.flores)}
          >
            Plantas que florescem
          </Link>
        </div>
      </div>
    </div>
  );
}
