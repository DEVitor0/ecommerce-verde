import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";

/** Estrelas de avaliação (0 a 5, com meias estrelas), com texto alternativo para leitores de tela. */
export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <span
      role="img"
      aria-label={`Nota ${rating.toFixed(1).replace(".", ",")} de 5`}
      style={{ display: "inline-flex", gap: 2, color: "var(--gold)", fontSize: size }}
    >
      {[1, 2, 3, 4, 5].map((n) =>
        rounded >= n ? (
          <FaStar key={n} />
        ) : rounded >= n - 0.5 ? (
          <FaStarHalfStroke key={n} />
        ) : (
          <FaRegStar key={n} />
        ),
      )}
    </span>
  );
}
