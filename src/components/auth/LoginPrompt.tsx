"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaXmark } from "react-icons/fa6";
import { Dialog } from "@/components/ui/Dialog";
import { useT } from "@/lib/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideLoginPrompt, type LoginPromptReason } from "@/store/slices/uiSlice";
import styles from "./LoginPrompt.module.css";

/** Substitui o antigo aviso "Sessão expirada": explica o que fazer, sem culpar a pessoa. */
export function LoginPrompt() {
  const t = useT();
  const dispatch = useAppDispatch();
  const reason = useAppSelector((s) => s.ui.loginPrompt);
  const [shown, setShown] = useState<LoginPromptReason | null>(reason);
  if (reason && reason !== shown) setShown(reason);
  const close = () => dispatch(hideLoginPrompt());
  const checkout = shown === "checkout";

  return (
    <Dialog open={reason !== null} onClose={close} label={t("wishlist.promptTitle")} width={420}>
      <div className={styles.box}>
        <button
          type="button"
          className={`icon-btn ${styles.close}`}
          aria-label={t("common.close")}
          onClick={close}
        >
          <FaXmark aria-hidden="true" />
        </button>
        <span className={styles.icon} aria-hidden="true">
          <FaHeart />
        </span>
        <h2 className={styles.title}>
          {checkout ? "Entre para finalizar" : t("wishlist.promptTitle")}
        </h2>
        <p className={styles.text}>
          {checkout ? "Entre na sua conta para concluir a compra." : t("wishlist.promptText")}
        </p>
        <div className={styles.actions}>
          <Link href="/login" className="btn btn-primary" onClick={close} data-autofocus>
            {t("wishlist.login")}
          </Link>
          <Link href="/criar-conta" className="btn btn-outline" onClick={close}>
            {t("wishlist.signup")}
          </Link>
        </div>
      </div>
    </Dialog>
  );
}
