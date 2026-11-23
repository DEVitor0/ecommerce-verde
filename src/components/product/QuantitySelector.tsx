"use client";

import { FaMinus, FaPlus } from "react-icons/fa6";
import { MAX_QUANTITY_PER_ITEM } from "@/store/slices/cartSlice";
import styles from "./QuantitySelector.module.css";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = MAX_QUANTITY_PER_ITEM,
  label,
}: QuantitySelectorProps) {
  return (
    <div className={styles.root} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.button}
        aria-label="Diminuir quantidade"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <FaMinus aria-hidden="true" />
      </button>
      {/* A chave reinicia a animação a cada mudança de valor. */}
      <output key={value} className={styles.value} data-bump aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className={styles.button}
        aria-label="Aumentar quantidade"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <FaPlus aria-hidden="true" />
      </button>
    </div>
  );
}
