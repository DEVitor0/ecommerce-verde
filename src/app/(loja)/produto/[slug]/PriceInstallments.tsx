"use client";

import { usePrice } from "@/hooks/usePrice";
import { useT } from "@/lib/i18n";
import { installmentValue } from "@/lib/money";

export function PriceInstallments({ cents, className }: { cents: number; className?: string }) {
  const format = usePrice();
  const t = useT();
  return (
    <p className={className}>
      {t("product.installments", { value: format(installmentValue(cents)) })}
    </p>
  );
}
