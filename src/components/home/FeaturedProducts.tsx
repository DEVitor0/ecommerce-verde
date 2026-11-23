"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { ProductCard } from "@/components/product/ProductCard";
import { newProducts, popularProducts, saleProducts } from "@/data/products";
import { useT, type MessageKey } from "@/lib/i18n";
import styles from "./FeaturedProducts.module.css";

const TABS = [
  { id: "popular", label: "featured.popular", items: popularProducts },
  { id: "new", label: "featured.new", items: newProducts },
  { id: "sales", label: "featured.sales", items: saleProducts },
] as const satisfies ReadonlyArray<{ id: string; label: MessageKey; items: unknown }>;

type TabId = (typeof TABS)[number]["id"];

export function FeaturedProducts() {
  const t = useT();
  const baseId = useId();
  const [active, setActive] = useState<TabId>("popular");
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const items = TABS.find((tab) => tab.id === active)!.items;

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0, behavior: "auto" });
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [active, updateEdges]);

  const scrollBy = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setActive(TABS[next]!.id);
    document.getElementById(`${baseId}-tab-${TABS[next]!.id}`)?.focus();
  };

  return (
    <section className={styles.section} aria-labelledby={`${baseId}-title`}>
      <div className="container">
        <div className="section-title">
          <h2 id={`${baseId}-title`}>{t("featured.title")}</h2>
          <p>{t("featured.subtitle")}</p>
        </div>

        <div className={styles.tabs} role="tablist" aria-label={t("featured.title")}>
          {TABS.map((tab, index) => (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              className={styles.tab}
              aria-selected={active === tab.id}
              aria-controls={`${baseId}-panel`}
              tabIndex={active === tab.id ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onTabKeyDown(e, index)}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>

        <div className={styles.stage}>
          <div
            ref={trackRef}
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            className={styles.track}
            onScroll={updateEdges}
          >
            {items.map((product, i) => (
              <div
                key={`${active}-${product.id}`}
                className={styles.slide}
                style={{ "--i": i } as React.CSSProperties}
              >
                <ProductCard product={product} priority={active === "popular" && i < 4} />
              </div>
            ))}
          </div>
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              aria-label={t("featured.prev")}
              disabled={edges.start}
              onClick={() => scrollBy(-1)}
            >
              <FaAngleLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label={t("featured.next")}
              disabled={edges.end}
              onClick={() => scrollBy(1)}
            >
              <FaAngleRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
