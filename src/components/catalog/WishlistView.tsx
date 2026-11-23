"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { getProductById } from "@/data/products";
import { useT } from "@/lib/i18n";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated, selectWishlistIds } from "@/store/selectors";
import styles from "./Catalog.module.css";

export function WishlistView() {
  const t = useT();
  const authenticated = useAppSelector(selectIsAuthenticated);
  const ids = useAppSelector(selectWishlistIds);
  const items = ids.flatMap((id) => getProductById(id) ?? []);

  if (!authenticated) {
    return (
      <div className={styles.empty}>
        <h2>{t("wishlist.promptTitle")}</h2>
        <p>{t("wishlist.promptText")}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/login" className="btn btn-primary">
            {t("wishlist.login")}
          </Link>
          <Link href="/criar-conta" className="btn btn-outline">
            {t("wishlist.signup")}
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>{t("wishlist.empty")}</h2>
        <p>Toque no coração de uma planta para guardá-la aqui.</p>
        <Link href="/produtos" className="btn btn-primary">
          {t("cart.emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((product, i) => (
        <div key={product.id} className={styles.item} style={{ "--i": i } as React.CSSProperties}>
          <ProductCard product={product} sizes="(max-width: 860px) 45vw, 22vw" />
        </div>
      ))}
    </div>
  );
}
