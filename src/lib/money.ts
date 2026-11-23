import type { Currency, Locale } from "@/types";

export const CURRENCIES: readonly Currency[] = ["BRL", "USD", "EUR"];

/**
 * Taxas de conversão estáticas, a partir do real. São apenas indicativas:
 * a cobrança é sempre feita em BRL. Para taxas ao vivo, troque este mapa
 * por uma chamada a uma API de câmbio.
 */
export const EXCHANGE_RATES: Record<Currency, number> = {
  BRL: 1,
  USD: 0.18,
  EUR: 0.16,
};

/** Converte centavos de real para centavos da moeda escolhida. */
export function convertFromBRL(cents: number, currency: Currency): number {
  return Math.round(cents * EXCHANGE_RATES[currency]);
}

export function formatMoney(cents: number, currency: Currency = "BRL", locale: Locale = "pt-BR") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    convertFromBRL(cents, currency) / 100,
  );
}

/** Percentual de desconto inteiro entre o preço "de" e o preço atual. */
export function discountPercent(price: number, compareAtPrice?: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round((1 - price / compareAtPrice) * 100);
}

/** Valor de cada parcela, arredondado para cima para nunca ficar abaixo do preço. */
export function installmentValue(cents: number, installments = 6): number {
  return Math.ceil(cents / installments);
}
