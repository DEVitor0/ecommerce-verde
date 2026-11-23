import type { Product } from "@/types";

/**
 * Catálogo único da loja. Todas as telas (home, catálogo, busca, carrinho)
 * leem daqui, então preço e nome nunca divergem entre seções.
 * Os dados de avaliação são de exemplo: substitua pelos reais quando houver.
 */
export const products: Product[] = [
  {
    id: "p01",
    slug: "ninho-de-passaro",
    sku: "JE-001",
    name: "Ninho-de-pássaro",
    scientificName: "Asplenium nidus",
    image: "/images/products/ninho-de-passaro.webp",
    price: 4800,
    compareAtPrice: 8000,
    size: "media",
    height: "40 a 60 cm",
    categories: ["interior", "tropicais"],
    uses: ["estetica", "facil"],
    blooms: false,
    light: "meia-sombra",
    water: "media",
    petSafe: true,
    description:
      "Samambaia de folhas inteiras e onduladas, que nascem em roseta e lembram um ninho. Dá volume e frescor a cantos de sala, varandas cobertas e banheiros com janela.",
    highlights: [
      "Não é tóxica para gatos e cachorros",
      "Gosta de umidade e luz indireta",
      "Vem em cachepô de juta",
    ],
    careTip:
      "Regue o substrato ao redor, sem deixar água acumulada no centro da roseta, onde as folhas novas nascem.",
    rating: 4.8,
    reviews: 126,
    isNew: true,
    popularRank: 1,
  },
  {
    id: "p02",
    slug: "agave-dragao",
    sku: "JE-002",
    name: "Agave-dragão",
    scientificName: "Agave attenuata",
    image: "/images/products/agave-dragao.webp",
    price: 2000,
    compareAtPrice: 6600,
    size: "pequena",
    height: "30 a 40 cm",
    categories: ["exterior", "decorativas", "mudas"],
    uses: ["facil", "estetica"],
    blooms: false,
    light: "sol-pleno",
    water: "baixa",
    petSafe: false,
    description:
      "Suculenta escultural de folhas macias e sem espinhos na ponta, em formato de roseta. Resiste bem a sol forte e a esquecimentos de rega.",
    highlights: [
      "Pede pouca água, ideal para quem viaja",
      "Folhas sem espinho terminal",
      "Vem em vaso branco de cerâmica",
    ],
    careTip:
      "Regue só quando o substrato estiver completamente seco e garanta um vaso com furo de drenagem.",
    rating: 4.7,
    reviews: 98,
    isNew: true,
    popularRank: 2,
  },
  {
    id: "p03",
    slug: "filodendro-cachepo",
    sku: "JE-003",
    name: "Filodendro no cachepô de aço",
    scientificName: "Philodendron sp.",
    image: "/images/products/filodendro.webp",
    price: 4000,
    size: "media",
    height: "50 a 70 cm",
    categories: ["interior", "decorativas", "tropicais"],
    uses: ["estetica", "escritorio"],
    blooms: false,
    light: "meia-sombra",
    water: "media",
    petSafe: false,
    description:
      "Folhagem de crescimento generoso, com folhas longas e brilhantes sobre hastes finas. O cachepô de aço com suporte aramado deixa o conjunto pronto para decorar.",
    highlights: [
      "Cachepô de aço incluso",
      "Adapta-se bem a ambientes internos",
      "Mantenha longe de pets e crianças",
    ],
    careTip: "Regue quando os 2 a 3 cm superiores do substrato estiverem secos ao toque.",
    rating: 4.6,
    reviews: 74,
    isNew: true,
    popularRank: 3,
  },
  {
    id: "p04",
    slug: "haworthia",
    sku: "JE-004",
    name: "Haworthia",
    scientificName: "Haworthiopsis attenuata",
    image: "/images/products/haworthia.webp",
    price: 7300,
    size: "pequena",
    height: "15 a 20 cm",
    categories: ["interior", "decorativas", "mudas"],
    uses: ["facil", "escritorio", "estetica"],
    blooms: false,
    light: "meia-sombra",
    water: "baixa",
    petSafe: true,
    description:
      "Suculenta compacta de folhas pontudas com listras brancas em relevo. Cabe em mesa de trabalho, estante ou parapeito e dispensa cuidados frequentes.",
    highlights: [
      "Não é tóxica para pets",
      "Cresce devagar e mantém o formato",
      "Vaso de cerâmica incluso",
    ],
    careTip:
      "Regue de forma espaçada, em geral a cada 10 a 15 dias, e só com o substrato totalmente seco.",
    rating: 4.9,
    reviews: 153,
    popularRank: 4,
  },
  {
    id: "p05",
    slug: "xanadu",
    sku: "JE-005",
    name: "Xanadu",
    scientificName: "Thaumatophyllum xanadu",
    image: "/images/products/xanadu.webp",
    price: 2500,
    size: "grande",
    height: "70 a 90 cm",
    categories: ["interior", "tropicais"],
    uses: ["escritorio", "estetica"],
    blooms: false,
    light: "meia-sombra",
    water: "media",
    petSafe: false,
    description:
      "Folhas recortadas e vistosas em um porte compacto. Forma um tronco aparente com o tempo e preenche bem o espaço ao lado de sofás, mesas e recepções.",
    highlights: [
      "Folhagem densa e recortada",
      "Vaso terracota incluso",
      "Mantenha longe de pets e crianças",
    ],
    careTip: "Prefira luz clara sem sol direto e aguarde a camada superior do substrato secar.",
    rating: 4.7,
    reviews: 61,
    isNew: true,
    popularRank: 5,
  },
  {
    id: "p06",
    slug: "samambaia-americana",
    sku: "JE-006",
    name: "Samambaia-americana",
    scientificName: "Nephrolepis exaltata",
    image: "/images/products/samambaia.webp",
    price: 7700,
    size: "media",
    height: "40 a 50 cm",
    categories: ["interior", "tropicais"],
    uses: ["estetica"],
    blooms: false,
    light: "meia-sombra",
    water: "alta",
    petSafe: true,
    description:
      "Samambaia clássica de folhas finas e arqueadas, que caem em cascata. Fica linda em cantos úmidos e sobre móveis, e não é tóxica para pets.",
    highlights: [
      "Não é tóxica para gatos e cachorros",
      "Pede substrato sempre levemente úmido",
      "Vaso branco incluso",
    ],
    careTip: "Mantenha o substrato úmido, sem encharcar, e borrife as folhas em dias secos.",
    rating: 4.5,
    reviews: 88,
    popularRank: 6,
  },
  {
    id: "p07",
    slug: "ficus-elastica",
    sku: "JE-007",
    name: "Ficus-elástica",
    scientificName: "Ficus elastica",
    image: "/images/products/ficus-elastica.webp",
    price: 3000,
    compareAtPrice: 6000,
    size: "pequena",
    height: "30 a 45 cm",
    categories: ["interior", "tropicais", "mudas"],
    uses: ["escritorio", "estetica"],
    blooms: false,
    light: "meia-sombra",
    water: "media",
    petSafe: false,
    description:
      "Folhas largas, firmes e brilhantes, de um verde profundo. Cresce em altura e ganha presença conforme amadurece, em vaso branco discreto.",
    highlights: [
      "Folhas brilhantes e resistentes",
      "Cresce bem em luz indireta intensa",
      "O látex pode irritar a pele e é tóxico para pets",
    ],
    careTip:
      "Limpe as folhas com um pano úmido de tempos em tempos para ajudar na absorção de luz.",
    rating: 4.8,
    reviews: 110,
    popularRank: 7,
  },
  {
    id: "p08",
    slug: "podocarpo-topiaria",
    sku: "JE-008",
    name: "Podocarpo topiária",
    scientificName: "Podocarpus macrophyllus",
    image: "/images/products/podocarpo.webp",
    price: 9000,
    compareAtPrice: 10000,
    size: "grande",
    height: "80 a 100 cm",
    categories: ["exterior", "decorativas"],
    uses: ["estetica"],
    blooms: false,
    light: "sol-pleno",
    water: "media",
    petSafe: false,
    description:
      "Arbusto conduzido em dois níveis, com copas arredondadas sobre um tronco fino. Marca entradas, varandas e jardins com um toque de paisagismo clássico.",
    highlights: [
      "Já vem podado em dois níveis",
      "Bom para varandas e áreas externas",
      "Vaso de textura rústica incluso",
    ],
    careTip:
      "Faça podas leves para manter o formato e regue com regularidade nos meses mais quentes.",
    rating: 4.6,
    reviews: 42,
    popularRank: 8,
  },
  {
    id: "p09",
    slug: "areca-bambu",
    sku: "JE-009",
    name: "Areca-bambu",
    scientificName: "Chamaedorea seifrizii",
    image: "/images/products/areca-bambu.webp",
    price: 3500,
    size: "grande",
    height: "90 a 120 cm",
    categories: ["interior", "exterior", "tropicais"],
    uses: ["escritorio", "estetica"],
    blooms: false,
    light: "meia-sombra",
    water: "media",
    petSafe: true,
    description:
      "Palmeira de hastes finas e folhas delicadas, de visual leve e tropical. Boa para dar altura a salas, escritórios e varandas protegidas do sol forte.",
    highlights: [
      "Não é tóxica para pets",
      "Porte alto e visual leve",
      "Vaso preto brilhante incluso",
    ],
    careTip: "Mantenha o substrato levemente úmido e evite sol direto nas horas mais quentes.",
    rating: 4.7,
    reviews: 69,
    popularRank: 9,
  },
  {
    id: "p10",
    slug: "estrelicia",
    sku: "JE-010",
    name: "Estrelícia",
    scientificName: "Strelitzia reginae",
    image: "/images/products/estrelicia.webp",
    price: 3000,
    size: "grande",
    height: "80 a 110 cm",
    categories: ["interior", "exterior", "tropicais"],
    uses: ["estetica"],
    blooms: true,
    light: "sol-pleno",
    water: "media",
    petSafe: false,
    description:
      "Folhas em formato de remo que se abrem em leque. Com maturidade e bastante luz, produz as flores laranja e azuis que a tornaram famosa como ave-do-paraíso.",
    highlights: [
      "Floresce quando adulta, com boa luz",
      "Vaso preto de linhas retas incluso",
      "Mantenha longe de pets e crianças",
    ],
    careTip: "Quanto mais luz direta de manhã, maiores as chances de florescer nos anos seguintes.",
    rating: 4.6,
    reviews: 57,
    popularRank: 10,
  },
  {
    id: "p11",
    slug: "costela-de-adao",
    sku: "JE-011",
    name: "Costela-de-adão",
    scientificName: "Monstera deliciosa",
    image: "/images/products/costela-de-adao.webp",
    price: 6000,
    size: "pequena",
    height: "30 a 40 cm",
    categories: ["interior", "tropicais", "mudas"],
    uses: ["estetica", "escritorio"],
    blooms: false,
    light: "meia-sombra",
    water: "media",
    petSafe: false,
    description:
      "A folha recortada mais desejada da decoração. Esta muda já tem folhas com aberturas e cresce rápido quando recebe luz clara e um tutor para se apoiar.",
    highlights: [
      "Folhas com recortes naturais",
      "Cresce rápido com boa luz",
      "Vaso branco de bordas suaves incluso",
    ],
    careTip:
      "Regue uma vez por semana, em média, e gire o vaso para o crescimento ficar simétrico.",
    rating: 4.9,
    reviews: 201,
  },
  {
    id: "p12",
    slug: "aglaonema",
    sku: "JE-012",
    name: "Aglaonema",
    scientificName: "Aglaonema commutatum",
    image: "/images/products/aglaonema.webp",
    price: 5500,
    size: "media",
    height: "40 a 55 cm",
    categories: ["interior", "tropicais"],
    uses: ["escritorio", "facil"],
    blooms: false,
    light: "sombra",
    water: "media",
    petSafe: false,
    description:
      "Folhas largas e firmes que toleram ambientes com pouca luz, por isso é presença certa em escritórios e salas internas. Pede poucos cuidados.",
    highlights: [
      "Tolera pouca luz natural",
      "Vaso de cimento claro incluso",
      "Mantenha longe de pets e crianças",
    ],
    careTip: "Aguarde a superfície do substrato secar antes de regar e evite correntes de ar frio.",
    rating: 4.5,
    reviews: 47,
    isNew: true,
  },
];

export const productsById: ReadonlyMap<string, Product> = new Map(products.map((p) => [p.id, p]));
export const productsBySlug: ReadonlyMap<string, Product> = new Map(
  products.map((p) => [p.slug, p]),
);

export function getProductById(id: string): Product | undefined {
  return productsById.get(id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsBySlug.get(slug);
}

export const popularProducts = products
  .filter((p) => p.popularRank !== undefined)
  .sort((a, b) => (a.popularRank ?? 0) - (b.popularRank ?? 0));

export const newProducts = products.filter((p) => p.isNew);

export const saleProducts = products.filter((p) => p.compareAtPrice !== undefined);

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id)
    .map((p) => ({
      product: p,
      score:
        p.categories.filter((c) => product.categories.includes(c)).length * 2 +
        p.uses.filter((u) => product.uses.includes(u)).length +
        (p.size === product.size ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.product);
}
