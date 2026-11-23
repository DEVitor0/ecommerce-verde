"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaCheck, FaXmark, FaCircleExclamation } from "react-icons/fa6";
import { useT } from "@/lib/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { dismissToast } from "@/store/slices/uiSlice";
import type { Toast } from "@/types";
import styles from "./Toasts.module.css";

const DURATION_MS = 4500;

function ToastItem({ toast }: { toast: Toast }) {
  const dispatch = useAppDispatch();
  const t = useT();
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    timer.current = window.setTimeout(() => dispatch(dismissToast(toast.id)), DURATION_MS);
    return () => window.clearTimeout(timer.current);
  }, [dispatch, toast.id]);

  const pause = () => window.clearTimeout(timer.current);
  const resume = () => {
    timer.current = window.setTimeout(() => dispatch(dismissToast(toast.id)), 2000);
  };

  return (
    <div
      className={`${styles.toast} ${toast.kind === "error" ? styles.error : ""}`}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <span className={styles.icon} aria-hidden="true">
        {toast.kind === "error" ? <FaCircleExclamation /> : <FaCheck />}
      </span>
      <p className={styles.text}>{toast.message}</p>
      {toast.action && (
        <Link
          href={toast.action.href}
          className={styles.action}
          onClick={() => dispatch(dismissToast(toast.id))}
        >
          {toast.action.label}
        </Link>
      )}
      <button
        type="button"
        className={styles.close}
        aria-label={t("common.close")}
        onClick={() => dispatch(dismissToast(toast.id))}
      >
        <FaXmark aria-hidden="true" />
      </button>
      <span className={styles.bar} aria-hidden="true" />
    </div>
  );
}

export function Toasts() {
  const toasts = useAppSelector((state) => state.ui.toasts);
  return (
    <div className={styles.region} role="status" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
