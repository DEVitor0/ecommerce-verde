"use client";

import { useEffect, useState } from "react";

/**
 * Mantém o elemento montado por `exitMs` depois que `open` vira false,
 * para que a animação de saída possa terminar antes da remoção do DOM.
 */
export function usePresence(open: boolean, exitMs = 280) {
  const [exited, setExited] = useState(!open);
  const [previousOpen, setPreviousOpen] = useState(open);

  // Ajuste de estado durante o render (padrão recomendado pelo React): reabrir cancela o "exited".
  if (open !== previousOpen) {
    setPreviousOpen(open);
    if (open) setExited(false);
  }

  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => setExited(true), exitMs);
    return () => window.clearTimeout(timer);
  }, [open, exitMs]);

  return { mounted: open || !exited, state: open ? "open" : "closed" } as const;
}
