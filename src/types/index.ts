export type Currency = "BRL" | "USD" | "EUR";
export type Locale = "pt-BR" | "en-US";

export type PlantSize = "pequena" | "media" | "grande";
export type CategoryId = "interior" | "exterior" | "decorativas" | "mudas" | "tropicais";
export type UseId = "escritorio" | "facil" | "estetica";
export type LightLevel = "sombra" | "meia-sombra" | "sol-pleno";
export type WaterNeed = "baixa" | "media" | "alta";

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  scientificName: string;
  image: string;
  /** Preço atual em centavos de real. */
  price: number;
  /** Preço "de", em centavos. Presente apenas quando o produto está em oferta. */
  compareAtPrice?: number;
  size: PlantSize;
  height: string;
  categories: CategoryId[];
  uses: UseId[];
  blooms: boolean;
  light: LightLevel;
  water: WaterNeed;
  petSafe: boolean;
  description: string;
  highlights: string[];
  careTip: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  /** Posição na lista de populares (1 = mais popular). */
  popularRank?: number;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Data ISO (AAAA-MM-DD). */
  date: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  intro: string;
  sections: BlogSection[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

export type ToastKind = "success" | "info" | "error";

export interface Toast {
  id: string;
  kind: ToastKind;
  message: string;
  action?: { label: string; href: string };
}
