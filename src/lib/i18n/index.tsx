"use client";

import { useCallback } from "react";
import { useAppSelector } from "@/store/hooks";
import { translate, type MessageKey } from "./messages";

export type { MessageKey };

export type TFunction = (key: MessageKey, vars?: Record<string, string | number>) => string;

export function useT(): TFunction {
  const locale = useAppSelector((state) => state.ui.locale);
  return useCallback<TFunction>((key, vars) => translate(locale, key, vars), [locale]);
}

/** Permite traduzir texto dentro de Server Components: <T id="hero.title" /> */
export function T({ id, vars }: { id: MessageKey; vars?: Record<string, string | number> }) {
  const t = useT();
  return <>{t(id, vars)}</>;
}
