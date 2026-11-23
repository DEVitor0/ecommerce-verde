/**
 * Anima uma cópia da imagem do produto voando até o ícone do carrinho.
 * Usa a Web Animations API e é ignorada quando a pessoa prefere menos movimento.
 */
export function flyToCart(source: Element | null): void {
  if (typeof window === "undefined" || !source) return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-cart-target]"));
  const target = targets.find((el) => el.offsetParent !== null);
  if (!target) return;

  const from = source.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  if (from.width === 0 || to.width === 0) return;

  const clone = source.cloneNode(true) as HTMLElement;
  Object.assign(clone.style, {
    position: "fixed",
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    margin: "0",
    objectFit: "contain",
    pointerEvents: "none",
    zIndex: "400",
    borderRadius: "12px",
  });
  clone.removeAttribute("srcset");
  clone.setAttribute("aria-hidden", "true");
  document.body.appendChild(clone);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  const animation = clone.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      {
        transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 70}px) scale(0.55)`,
        opacity: 0.95,
        offset: 0.55,
      },
      { transform: `translate(${dx}px, ${dy}px) scale(0.08)`, opacity: 0.2 },
    ],
    { duration: 760, easing: "cubic-bezier(0.5, 0, 0.75, 0.4)", fill: "forwards" },
  );
  const cleanup = () => clone.remove();
  animation.onfinish = cleanup;
  animation.oncancel = cleanup;
}
