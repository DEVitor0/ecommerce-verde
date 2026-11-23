import type { Testimonial } from "@/types";

/** Depoimentos de exemplo. Troque pelos relatos reais dos seus clientes. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Carlos Oliveira",
    role: "Cliente",
    quote:
      "A planta chegou protegida, com o vaso bem preso e as folhas intactas. Seguindo o cartão de cuidados que veio junto, ela já soltou folha nova na primeira semana.",
    avatar: "/images/people/pessoa3.webp",
  },
  {
    id: "t2",
    name: "João Santos",
    role: "Cliente",
    quote:
      "Montei meu escritório em casa com três plantas daqui. O atendimento me ajudou a escolher espécies para um canto com pouca luz, e todas se adaptaram bem.",
    avatar: "/images/people/pessoa2.webp",
  },
  {
    id: "t3",
    name: "Maria Silva",
    role: "Cliente",
    quote:
      "Tirei uma dúvida sobre rega pelo suporte e recebi a resposta no mesmo dia, com orientação clara. Já indiquei a loja para duas amigas.",
    avatar: "/images/people/pessoa1.webp",
  },
];
