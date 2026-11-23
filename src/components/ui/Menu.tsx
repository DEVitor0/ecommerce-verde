"use client";

import Link from "next/link";
import { useId, useRef, useState, type ReactNode } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useDismissable } from "@/hooks/useDismissable";
import styles from "./Menu.module.css";

export interface MenuItem {
  id: string;
  label: ReactNode;
  href?: string;
  onSelect?: () => void;
  checked?: boolean;
}

interface MenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  align?: "center" | "start";
  label?: string;
}

/** Menu suspenso acessível: abre com clique ou seta para baixo, fecha com Esc ou clique fora. */
export function Menu({ trigger, items, align = "center", label }: MenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  useDismissable(rootRef, () => setOpen(false), open);

  const select = (item: MenuItem) => {
    item.onSelect?.();
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-haspopup="true"
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {trigger}
        <FaAngleDown className={styles.chevron} aria-hidden="true" />
      </button>
      {open && (
        <div id={listId} className={`${styles.list} ${align === "start" ? styles.alignStart : ""}`}>
          {items.map((item) =>
            item.href ? (
              <Link
                key={item.id}
                href={item.href}
                className={styles.item}
                onClick={() => select(item)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                type="button"
                role="menuitemradio"
                aria-checked={item.checked ?? false}
                className={styles.item}
                onClick={() => select(item)}
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
