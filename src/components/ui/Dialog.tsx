"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { usePresence } from "@/hooks/usePresence";
import { useScrollLock } from "@/hooks/useScrollLock";
import styles from "./Dialog.module.css";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  label: string;
  variant?: "center" | "drawer" | "drawerLeft" | "top";
  width?: number;
  children: ReactNode;
}

/** Diálogo acessível: foco preso, Esc fecha, clique fora fecha, rolagem travada e saída animada. */
export function Dialog({ open, onClose, label, variant = "center", width, children }: DialogProps) {
  const { mounted, state } = usePresence(open);
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);
  useFocusTrap(panelRef, open && mounted);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`${styles.backdrop} ${styles[variant]}`}
      data-state={state}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        style={width ? ({ "--dialog-width": `${width}px` } as React.CSSProperties) : undefined}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
