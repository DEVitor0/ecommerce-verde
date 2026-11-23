"use client";

import { useId, useState, type FormEvent } from "react";
import { FaPlus } from "react-icons/fa6";
import { evaluateCoupon } from "@/lib/coupons";
import { useT } from "@/lib/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartTotals } from "@/store/selectors";
import { setCoupon } from "@/store/slices/cartSlice";
import styles from "./Cart.module.css";

export function CouponForm() {
  const t = useT();
  const dispatch = useAppDispatch();
  const { subtotal, coupon } = useAppSelector(selectCartTotals);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const panelId = useId();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = evaluateCoupon(code, subtotal);
    if (result.status === "valid") {
      dispatch(setCoupon(result.code));
      setCode("");
      setError(null);
      return;
    }
    if (result.reason === "empty") setError("Digite o código do cupom.");
    else if (result.reason === "unknown")
      setError("Este cupom não existe. Confira o código e tente de novo.");
    else setError("Seu carrinho ainda não atinge o valor mínimo deste cupom.");
  };

  return (
    <div>
      <button
        type="button"
        className={styles.couponToggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <FaPlus aria-hidden="true" />
        {t("cart.addCoupon")}
      </button>
      <div id={panelId} className={styles.couponPanel} data-open={open}>
        <div className={styles.couponInner} inert={!open}>
          {coupon?.status === "valid" ? (
            <p className={`${styles.applied} ${styles.couponOk}`}>
              <strong>{coupon.code}</strong> — {coupon.description}
              <button type="button" onClick={() => dispatch(setCoupon(null))}>
                {t("cart.couponRemove")}
              </button>
            </p>
          ) : (
            <form className={styles.couponForm} onSubmit={submit} noValidate>
              <input
                className="input"
                aria-label={t("cart.couponLabel")}
                placeholder="VERDE10"
                value={code}
                autoComplete="off"
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(null);
                }}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                {t("cart.couponApply")}
              </button>
            </form>
          )}
          {error && (
            <p className={`${styles.couponMsg} ${styles.couponBad}`} role="alert">
              {error}
            </p>
          )}
          {coupon?.status === "invalid" && coupon.reason === "min-subtotal" && (
            <p className={`${styles.couponMsg} ${styles.couponBad}`}>
              O cupom {coupon.code} pede um valor mínimo maior no carrinho.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
