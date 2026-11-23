"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeContent: "center",
        justifyItems: "center",
        gap: 12,
        padding: 32,
        textAlign: "center",
      }}
    >
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
        Algo deu errado por aqui
      </h1>
      <p style={{ maxWidth: "44ch", color: "var(--stone-700)" }}>
        Não conseguimos carregar esta página. Tente de novo; se continuar, volte ao início.
      </p>
      <button type="button" className="btn btn-primary" onClick={reset}>
        Tentar de novo
      </button>
    </main>
  );
}
