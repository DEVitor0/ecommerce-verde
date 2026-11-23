/**
 * Dados institucionais da loja. Edite aqui: tudo que aparece no rodapé,
 * nos metadados e no contato vem deste arquivo.
 */
export const siteConfig = {
  name: "Jardim Exótico",
  tagline: "Plantas e mudas selecionadas, entregues com cuidado",
  description:
    "Loja de plantas naturais, mudas e vasos. Escolha por tamanho, luz e rotina de cuidado e receba em casa com frete grátis.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "(11) 98765-4321",
  phoneHref: "tel:+5511987654321",
  email: "contato@jardimexotico.com.br",
  address: "Av. das Flores, 1200 · Jardim Botânico · São Paulo, SP",
  hours: "Segunda a sexta, das 9h às 18h",
  social: [
    { name: "YouTube", href: "https://www.youtube.com/" },
    { name: "Facebook", href: "https://www.facebook.com/" },
    { name: "Instagram", href: "https://www.instagram.com/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
} as const;
