"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaBasketShopping, FaHeart, FaRegEye, FaRegHeart } from "react-icons/fa6";
import { Price } from "@/components/ui/Price";
import { useT } from "@/lib/i18n";
import { discountPercent } from "@/lib/money";
import type { Product } from "@/types";
import styles from "./ProductCard.module.css";
import { useProductActions } from "./useProductActions";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  sizes?: string;
}

export function ProductCard({
  product,
  priority = false,
  sizes = "(max-width: 600px) 70vw, (max-width: 1100px) 30vw, 280px",
}: ProductCardProps) {
  const t = useT();
  const mediaRef = useRef<HTMLAnchorElement>(null);
  const { inCart, wishlisted, toggleCart, toggleFavorite, quickView } = useProductActions(product);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const href = `/produto/${product.slug}`;

  return (
    <article className={styles.card}>
      <div className={styles.stage}>
        {discount > 0 ? (
          <span className={styles.badge} aria-label={t("product.off", { n: discount })}>
            {discount}%
          </span>
        ) : null}

        <Link ref={mediaRef} href={href} className={styles.media} tabIndex={-1} aria-hidden="true">
          <Image
            src={product.image}
            alt=""
            fill
            sizes={sizes}
            className={styles.image}
            priority={priority}
            data-fly-source
          />
        </Link>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.action} ${inCart ? styles.actionActive : ""}`}
            aria-pressed={inCart}
            aria-label={`${inCart ? t("product.inCart") : t("product.add")}: ${product.name}`}
            onClick={() => toggleCart(mediaRef.current?.querySelector("img"))}
          >
            <FaBasketShopping aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.action} ${wishlisted ? `${styles.actionActive} ${styles.heartPop}` : ""}`}
            aria-pressed={wishlisted}
            aria-label={`${wishlisted ? t("product.wishlistRemove") : t("product.wishlistAdd")}: ${product.name}`}
            onClick={toggleFavorite}
          >
            {wishlisted ? <FaHeart aria-hidden="true" /> : <FaRegHeart aria-hidden="true" />}
          </button>
          <button
            type="button"
            className={styles.action}
            aria-label={`${t("product.quickView")}: ${product.name}`}
            onClick={quickView}
          >
            <FaRegEye aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>
          <Link href={href}>{product.name}</Link>
        </h3>
        <div className={styles.prices}>
          <Price
            cents={product.price}
            compareAt={product.compareAtPrice}
            className={styles.price}
            oldClassName={styles.old}
          />
        </div>
      </div>
    </article>
  );
}
