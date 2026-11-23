"use client";

import { useCallback } from "react";
import { formatMoney } from "@/lib/money";
import { useAppSelector } from "@/store/hooks";

/** Retorna um formatador de preço (em centavos de BRL) na moeda e no idioma escolhidos. */
export function usePrice() {
  const currency = useAppSelector((state) => state.ui.currency);
  const locale = useAppSelector((state) => state.ui.locale);
  return useCallback((cents: number) => formatMoney(cents, currency, locale), [currency, locale]);
}
