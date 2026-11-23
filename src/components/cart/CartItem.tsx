"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { Price } from "@/components/ui/Price";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { usePrice } from "@/hooks/usePrice";
import { useT } from "@/lib/i18n";
import { useAppDispatch } from "@/store/hooks";
import type { DetailedCartLine } from "@/store/selectors";
import { removeItem, setQuantity } from "@/store/slices/cartSlice";
import { closeCart } from "@/store/slices/uiSlice";
import styles from "./Cart.module.css";

export function CartItem({ line }: { line: DetailedCartLine }) {
  const { product, quantity, lineTotal } = line;
  const t = useT();
  const dispatch = useAppDispatch();
  const format = usePrice();
  const [removing, setRemoving] = useState(false);

  const remove = () => {
    setRemoving(true);
    window.setTimeout(() => dispatch(removeItem(product.id)), 280);
  };

  return (
    <li className={styles.item} data-removing={removing}>
      <div className={styles.itemInner}>
        <div className={styles.row}>
          <Link
            href={`/produto/${product.slug}`}
            className={styles.thumb}
            onClick={() => dispatch(closeCart())}
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image src={product.image} alt="" fill sizes="84px" />
          </Link>
          <div className={styles.info}>
            <div className={styles.nameRow}>
              <Link
                href={`/produto/${product.slug}`}
                className={styles.name}
                onClick={() => dispatch(closeCart())}
              >
                {product.name}
              </Link>
              <button
                type="button"
                className={styles.remove}
                aria-label={t("cart.remove", { name: product.name })}
                onClick={remove}
              >
                <FaRegTrashCan aria-hidden="true" />
              </button>
            </div>
            <p className={styles.unit}>
              {product.compareAtPrice ? (
                <del>
                  {t("cart.from")}: {format(product.compareAtPrice)}
                </del>
              ) : null}
              <span>
                {product.compareAtPrice ? `${t("cart.to")}: ` : ""}
                <Price cents={product.price} />
              </span>
            </p>
            <div className={styles.lineRow}>
              <QuantitySelector
                value={quantity}
                label={`${t("product.quantity")}: ${product.name}`}
                onChange={(value) =>
                  dispatch(setQuantity({ productId: product.id, quantity: value }))
                }
              />
              <span className={styles.lineTotal}>{format(lineTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
