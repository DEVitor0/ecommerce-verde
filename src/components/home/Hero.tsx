import Image from "next/image";
import Link from "next/link";
import { T } from "@/lib/i18n";
import { buildCatalogHref } from "@/lib/catalog";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg}>
        <Image
          src="/images/brand/hero.webp"
          alt="Costela-de-adão em vaso branco ao lado de um quadro com ilustração de folha"
          fill
          priority
          sizes="100vw"
          quality={75}
        />
      </div>
      <div className={styles.veil} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.offer}>
          <T id="hero.offer" />
        </p>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.mask}>
            <span>
              <T id="hero.title" />
            </span>
          </span>
        </h1>
        <p className={styles.text}>
          <T id="hero.text" />
        </p>
        <div className={styles.line} aria-hidden="true" />
        <Link
          href={buildCatalogHref({ ordem: "maior-desconto" })}
          className={`btn btn-primary ${styles.cta}`}
        >
          <T id="hero.cta" />
        </Link>
      </div>
    </section>
  );
}
