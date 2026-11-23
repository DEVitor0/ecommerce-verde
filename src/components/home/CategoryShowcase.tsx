"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { buildCatalogHref, CATEGORY_OPTIONS, filterProducts } from "@/lib/catalog";
import { useT } from "@/lib/i18n";
import type { CategoryId } from "@/types";
import styles from "./CategoryShowcase.module.css";

export function CategoryShowcase() {
  const t = useT();
  const id = useId();
  const [active, setActive] = useState<CategoryId>("interior");
  const label = CATEGORY_OPTIONS.find((c) => c.id === active)!.label;
  const items = useMemo(
    () => filterProducts(products, { categoria: active, ordem: "relevancia" }).slice(0, 6),
    [active],
  );

  return (
    <section className={styles.section} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section-title">
          <h2 id={`${id}-title`}>{t("showcase.title")}</h2>
          <p>{t("showcase.subtitle")}</p>
        </div>
        <div className={styles.layout}>
          <div
            className={styles.nav}
            role="tablist"
            aria-orientation="vertical"
            aria-label={t("showcase.title")}
          >
            {CATEGORY_OPTIONS.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                className={styles.navBtn}
                aria-selected={active === c.id}
                aria-controls={`${id}-panel`}
                onClick={() => setActive(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div id={`${id}-panel`} role="tabpanel">
            <div className={styles.grid}>
              {items.map((product, i) => (
                <div
                  key={`${active}-${product.id}`}
                  className={styles.item}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <ProductCard product={product} sizes="(max-width: 640px) 45vw, 25vw" />
                </div>
              ))}
            </div>
            <div className={styles.more}>
              <Link href={buildCatalogHref({ categoria: active })} className="btn btn-outline">
                {t("showcase.seeAll", { category: label.toLowerCase() })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
