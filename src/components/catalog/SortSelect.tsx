"use client";

import { useRouter } from "next/navigation";
import { buildCatalogHref, SORT_OPTIONS, type CatalogFilters, type SortId } from "@/lib/catalog";
import styles from "./Catalog.module.css";

export function SortSelect({ filters }: { filters: CatalogFilters }) {
  const router = useRouter();
  return (
    <label className={styles.sort}>
      Ordenar por
      <select
        value={filters.ordem}
        onChange={(e) =>
          router.replace(buildCatalogHref({ ...filters, ordem: e.target.value as SortId }), {
            scroll: false,
          })
        }
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
