"use client";

import Link from "next/link";
import { FaBasketShopping, FaRegTrashCan, FaXmark } from "react-icons/fa6";
import { Dialog } from "@/components/ui/Dialog";
import { usePrice } from "@/hooks/usePrice";
import { useT } from "@/lib/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartCount, selectCartTotals, selectDetailedCart } from "@/store/selectors";
import { clearCart } from "@/store/slices/cartSlice";
import { closeCart } from "@/store/slices/uiSlice";
import styles from "./Cart.module.css";
import { CartItem } from "./CartItem";
import { CouponForm } from "./CouponForm";

export function CartDrawer() {
  const t = useT();
  const dispatch = useAppDispatch();
  const format = usePrice();
  const open = useAppSelector((state) => state.ui.cartOpen);
  const lines = useAppSelector(selectDetailedCart);
  const count = useAppSelector(selectCartCount);
  const { subtotal, discount, total } = useAppSelector(selectCartTotals);
  const close = () => dispatch(closeCart());

  return (
    <Dialog open={open} onClose={close} label={t("cart.title")} variant="drawer">
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {t("cart.title")}
            {count > 0 && <span className={styles.count}>({count})</span>}
          </h2>
          <button
            type="button"
            className="icon-btn"
            aria-label={t("common.close")}
            onClick={close}
            data-autofocus
          >
            <FaXmark aria-hidden="true" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon} aria-hidden="true">
              <FaBasketShopping />
            </span>
            <h3 className={styles.emptyTitle}>{t("cart.emptyTitle")}</h3>
            <p className={styles.emptyText}>{t("cart.emptyText")}</p>
            <Link href="/produtos" className="btn btn-primary" onClick={close}>
              {t("cart.emptyCta")}
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.body}>
              <ul role="list" className={styles.list}>
                {lines.map((line) => (
                  <CartItem key={line.product.id} line={line} />
                ))}
              </ul>
            </div>
            <div className={styles.footer}>
              <button type="button" className={styles.clear} onClick={() => dispatch(clearCart())}>
                <FaRegTrashCan aria-hidden="true" />
                {t("cart.clear")}
              </button>
              <p className={styles.summaryTitle}>{t("cart.summary")}</p>
              <CouponForm />
              <div className={styles.line}>
                <span>{t("cart.subtotal")}</span>
                <span>{format(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className={`${styles.line} ${styles.discount}`}>
                  <span>{t("cart.discount")}</span>
                  <span>− {format(discount)}</span>
                </div>
              )}
              <div className={styles.line}>
                <span>{t("cart.shipping")}</span>
                <span>{t("cart.free")}</span>
              </div>
              <div className={styles.total}>
                <span>{t("cart.total")}</span>
                <span key={total}>{format(total)}</span>
              </div>
              <Link href="/checkout" className="btn btn-primary btn-block" onClick={close}>
                {t("cart.checkout")}
              </Link>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
