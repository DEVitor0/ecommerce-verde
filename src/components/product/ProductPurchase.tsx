"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useT } from "@/lib/i18n";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/slices/cartSlice";
import type { Product } from "@/types";
import { QuantitySelector } from "./QuantitySelector";
import styles from "./ProductPage.module.css";
import { useProductActions } from "./useProductActions";

export function ProductPurchase({ product }: { product: Product }) {
  const t = useT();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const { wishlisted, toggleFavorite, addToCart } = useProductActions(product);

  return (
    <div className={styles.buy}>
      <QuantitySelector value={quantity} onChange={setQuantity} label={t("product.quantity")} />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => addToCart(quantity, document.querySelector("[data-product-image] img"))}
      >
        {t("product.add")}
      </button>
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => {
          dispatch(addItem({ productId: product.id, quantity }));
          router.push("/checkout");
        }}
      >
        {t("product.buyNow")}
      </button>
      <button
        type="button"
        className={`icon-btn ${styles.heart} ${wishlisted ? styles.heartOn : ""}`}
        aria-pressed={wishlisted}
        aria-label={wishlisted ? t("product.wishlistRemove") : t("product.wishlistAdd")}
        onClick={toggleFavorite}
      >
        {wishlisted ? <FaHeart aria-hidden="true" /> : <FaRegHeart aria-hidden="true" />}
      </button>
    </div>
  );
}
