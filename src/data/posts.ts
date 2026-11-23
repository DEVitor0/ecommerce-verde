import type { BlogPost } from "@/types";

export const posts: BlogPost[] = [
  {
    slug: "segredos-de-beleza-e-resistencia-para-plantas",
    title: "Alguns segredos de beleza e resistência para plantas",
    excerpt:
      "Folhas firmes e brilhantes vêm de hábitos simples: luz adequada, rega pelo toque e um pouco de manutenção semanal.",
    date: "2024-03-18",
    readingMinutes: 4,
    image: "/images/blog/estufa.webp",
    imageAlt: "Estufa com plantas penduradas e folhagens em vasos",
    intro:
      "Uma planta bonita raramente depende de truques. Na maioria dos casos, ela está saudável porque recebe a luz que precisa, a água na medida certa e uma rotina curta de cuidados. Reunimos os hábitos que mais fazem diferença.",
    sections: [
      {
        heading: "Rega pelo toque, não pelo calendário",
        paragraphs: [
          "Enfie o dedo de 2 a 3 centímetros no substrato. Se sair úmido, espere mais um dia. Se sair seco, regue até a água escorrer pelo furo do vaso. Esse teste simples evita o erro mais comum, que é o excesso de água.",
          "Suculentas, como a haworthia e o agave, aceitam intervalos maiores e preferem que o substrato seque por completo. Samambaias fazem o contrário: pedem terra sempre levemente úmida.",
        ],
      },
      {
        heading: "Luz certa para cada espécie",
        paragraphs: [
          "Luz indireta intensa, perto de uma janela clara, serve para a maioria das folhagens tropicais. Sol direto durante horas pode queimar folhas de plantas acostumadas à meia-sombra, enquanto suculentas e estrelícias ficam melhores com sol da manhã.",
          "Gire o vaso um quarto de volta a cada semana. Assim a planta cresce de forma simétrica, sem se inclinar para um lado só.",
        ],
      },
      {
        heading: "Folhas limpas respiram melhor",
        paragraphs: [
          "A poeira forma uma película que reduz a luz captada. Passe um pano úmido nas folhas largas, como as do ficus e da costela-de-adão, a cada duas ou três semanas. Em folhas pequenas ou delicadas, uma ducha leve resolve.",
          "Aproveite a limpeza para retirar folhas secas ou amareladas com uma tesoura limpa. A planta passa a direcionar energia para o crescimento novo.",
        ],
      },
      {
        heading: "Adubo leve, na época certa",
        paragraphs: [
          "Na primavera e no verão, quando as plantas crescem mais, use um adubo líquido diluído conforme a embalagem, a cada duas ou três semanas. No outono e no inverno, reduza ou pause. Adubar em excesso acumula sais no substrato e deixa as pontas das folhas marrons.",
        ],
      },
    ],
  },
  {
    slug: "detalhes-que-afetam-o-desenvolvimento-das-plantas",
    title: "Detalhes que afetam o desenvolvimento das plantas",
    excerpt:
      "Luz, água, vaso e ar: pequenos detalhes do ambiente explicam por que uma planta cresce bem ou para de crescer.",
    date: "2024-02-23",
    readingMinutes: 5,
    image: "/images/blog/corredor.webp",
    imageAlt: "Corredor de estufa com plantas dos dois lados",
    intro:
      "Quando uma planta para de crescer ou perde folhas, a causa quase sempre está no ambiente. Aprender a ler os sinais das folhas ajuda a corrigir o problema antes que ele avance.",
    sections: [
      {
        heading: "O que as folhas estão dizendo",
        paragraphs: [
          "Folhas amarelas e moles, principalmente as de baixo, costumam indicar excesso de água. Pontas marrons e secas apontam ar muito seco ou acúmulo de sais do adubo. Hastes compridas e finas, com espaço grande entre as folhas, mostram que falta luz.",
          "Manchas marrons no meio da folha, em plantas de meia-sombra, podem ser queimadura de sol. Mude o vaso de lugar antes de pensar em tratamentos.",
        ],
      },
      {
        heading: "O vaso importa tanto quanto a planta",
        paragraphs: [
          "Todo vaso precisa de furo de drenagem. Sem ele, a água fica no fundo e as raízes apodrecem. Cachepôs bonitos podem ser usados, desde que o vaso interno seja retirado para regar e o excesso de água seja descartado.",
          "O tamanho também conta: um vaso muito grande mantém o substrato úmido por mais tempo do que as raízes conseguem aproveitar. Prefira um vaso de 2 a 4 centímetros a mais de diâmetro quando for replantar.",
        ],
      },
      {
        heading: "Temperatura, vento e umidade",
        paragraphs: [
          "A maioria das plantas de interior gosta de temperaturas entre 18 e 28 graus. Evite deixá-las em frente ao ar-condicionado ou em corredores com corrente de ar frio, que ressecam as folhas e podem derrubá-las.",
          "Plantas tropicais, como samambaias e ninho-de-pássaro, agradecem um pouco mais de umidade. Agrupar vasos próximos e borrifar água nas folhas em dias secos ajuda.",
        ],
      },
      {
        heading: "Pragas: observe cedo",
        paragraphs: [
          "Olhe a parte de baixo das folhas e as axilas dos caules durante a rega. Teias finas, pontinhos brancos ou uma substância pegajosa indicam ácaros, cochonilhas ou pulgões. Isolar a planta e limpar as folhas com água e sabão neutro, em solução bem diluída, resolve a maior parte dos casos iniciais.",
        ],
      },
    ],
  },
  {
    slug: "como-replantar-sem-estressar-a-planta",
    title: "Como replantar sem estressar a planta",
    excerpt:
      "Saiba quando trocar o vaso, que substrato usar e como ajudar a planta a se adaptar nos primeiros dias.",
    date: "2024-01-12",
    readingMinutes: 4,
    image: "/images/blog/replantio.webp",
    imageAlt: "Mãos replantando uma muda em terra preta",
    intro:
      "Replantar renova o substrato e dá espaço para as raízes crescerem. Feito com calma e na época certa, o processo quase não deixa marcas na planta.",
    sections: [
      {
        heading: "Quando é hora de trocar o vaso",
        paragraphs: [
          "Raízes saindo pelo furo de drenagem, substrato que seca rápido demais e crescimento parado na época quente são os sinais mais claros. A primavera é o melhor momento, porque a planta está ativa e se recupera depressa.",
        ],
      },
      {
        heading: "Passo a passo",
        paragraphs: [
          "Regue a planta no dia anterior para facilitar a retirada. Solte o torrão com cuidado, desfaça levemente as raízes mais enroladas e corte as que estiverem escuras ou moles. Coloque uma camada de substrato novo no fundo do vaso, posicione a planta na mesma altura em que estava e complete as laterais sem compactar.",
          "Para folhagens tropicais, uma mistura de terra vegetal, fibra de coco e um pouco de perlita ou areia grossa mantém a umidade e ainda drena bem. Suculentas pedem mais areia e menos matéria orgânica.",
        ],
      },
      {
        heading: "Cuidados na primeira semana",
        paragraphs: [
          "Regue de leve logo após o plantio e deixe a planta em um local claro, sem sol direto, por cerca de uma semana. Não adube nesse período: as raízes estão se acomodando e o substrato novo já traz nutrientes suficientes. Se algumas folhas caírem, é normal. Retome a rotina habitual quando surgirem brotos novos.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Posts ordenados do mais recente para o mais antigo. */
export function getPostsByDate(): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}
