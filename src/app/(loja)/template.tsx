import type { ReactNode } from "react";

/** O template é remontado a cada navegação, então a entrada suave roda em toda troca de página. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
