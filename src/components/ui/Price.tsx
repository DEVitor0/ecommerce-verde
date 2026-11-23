"use client";

import { usePrice } from "@/hooks/usePrice";

interface PriceProps {
  cents: number;
  compareAt?: number;
  className?: string;
  oldClassName?: string;
}

/** Preço atual e, quando houver, o preço "de" riscado, na moeda escolhida. */
export function Price({ cents, compareAt, className, oldClassName }: PriceProps) {
  const format = usePrice();
  return (
    <>
      <span className={className}>{format(cents)}</span>
      {compareAt ? (
        <del className={oldClassName}>
          <span className="sr-only">De </span>
          {format(compareAt)}
        </del>
      ) : null}
    </>
  );
}
