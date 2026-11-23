"use client";

import { useEffect } from "react";

let locks = 0;

/** Trava a rolagem da página enquanto algum diálogo/gaveta estiver aberto (suporta vários). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    locks += 1;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      locks -= 1;
      if (locks === 0) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    };
  }, [locked]);
}
