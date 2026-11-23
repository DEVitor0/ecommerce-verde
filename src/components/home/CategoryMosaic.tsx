import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { buildCatalogHref } from "@/lib/catalog";
import { T, type MessageKey } from "@/lib/i18n";
import styles from "./CategoryMosaic.module.css";

const TILES: ReadonlyArray<{
  id: string;
  label: MessageKey;
  href: string;
  image: string;
  alt: string;
}> = [
  {
    id: "tamanhos",
    label: "mosaic.sizes",
    href: buildCatalogHref({ ordem: "nome" }),
    image: "/images/categories/tamanhos.webp",
    alt: "Duas plantas em vasos de fibra natural",
  },
  {
    id: "estetica",
    label: "mosaic.aesthetics",
    href: buildCatalogHref({ uso: "estetica" }),
    image: "/images/categories/estetica.webp",
    alt: "Plantas em vaso de vidro",
  },
  {
    id: "simplicidade",
    label: "mosaic.simplicity",
    href: buildCatalogHref({ uso: "facil" }),
    image: "/images/categories/simplicidade.webp",
    alt: "Planta de folhas pequenas em vaso branco",
  },
  {
    id: "escritorio",
    label: "mosaic.office",
    href: buildCatalogHref({ uso: "escritorio" }),
    image: "/images/categories/escritorio.webp",
    alt: "Planta de folhas longas para ambientes de escritório",
  },
  {
    id: "decorativas",
    label: "mosaic.decor",
    href: buildCatalogHref({ categoria: "decorativas" }),
    image: "/images/categories/decorativas.webp",
    alt: "Planta dentro de um pote de vidro",
  },
];

export function CategoryMosaic() {
  return (
    <section className={styles.section} aria-labelledby="mosaic-title">
      <h2 id="mosaic-title" className="sr-only">
        <T id="mosaic.title" />
      </h2>
      <div className={`container ${styles.grid}`}>
        {TILES.map((tile, i) => (
          <Reveal key={tile.id} as="div" variant="scale" delay={i * 90} className={styles.tile}>
            <Link href={tile.href} className={styles.link}>
              <span className={styles.label}>
                <span>
                  <T id={tile.label} />
                </span>
              </span>
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes={i === 0 ? "(max-width: 760px) 100vw, 40vw" : "(max-width: 760px) 50vw, 28vw"}
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
