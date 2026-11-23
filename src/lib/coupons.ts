import { COUPONS } from "@/data/coupons";

export type CouponResult =
  | { status: "valid"; code: string; discount: number; description: string }
  | {
      status: "invalid";
      code: string;
      reason: "empty" | "unknown" | "min-subtotal";
      minSubtotal?: number;
    };

export function normalizeCouponCode(code: string): string {
  return code.trim().toUpperCase();
}

/** Avalia um cupom contra o subtotal (em centavos). Nunca desconta mais que o subtotal. */
export function evaluateCoupon(rawCode: string | null | undefined, subtotal: number): CouponResult {
  const code = normalizeCouponCode(rawCode ?? "");
  if (!code) return { status: "invalid", code, reason: "empty" };

  const rule = COUPONS[code];
  if (!rule) return { status: "invalid", code, reason: "unknown" };

  if (subtotal < rule.minSubtotal) {
    return { status: "invalid", code, reason: "min-subtotal", minSubtotal: rule.minSubtotal };
  }

  const raw = rule.type === "percent" ? Math.round((subtotal * rule.value) / 100) : rule.value;
  return {
    status: "valid",
    code,
    discount: Math.min(raw, subtotal),
    description: rule.description,
  };
}
