export type CouponRule =
  | { type: "percent"; value: number; minSubtotal: number; description: string }
  | { type: "fixed"; value: number; minSubtotal: number; description: string };

/** Valores monetários em centavos. */
export const COUPONS: Record<string, CouponRule> = {
  VERDE10: {
    type: "percent",
    value: 10,
    minSubtotal: 0,
    description: "10% de desconto na compra",
  },
  BEMVINDO15: {
    type: "fixed",
    value: 1500,
    minSubtotal: 10000,
    description: "R$ 15,00 de desconto em compras a partir de R$ 100,00",
  },
  PLANTA20: {
    type: "percent",
    value: 20,
    minSubtotal: 20000,
    description: "20% de desconto em compras a partir de R$ 200,00",
  },
};
