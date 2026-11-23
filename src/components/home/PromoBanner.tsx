import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/lib/i18n";
import styles from "./PromoBanner.module.css";

export function PromoBanner() {
  return (
    <section className={styles.section} aria-labelledby="promo-title">
      <div className={`container ${styles.wrap}`}>
        <Reveal variant="left" className={styles.image}>
          <Image
            src="/images/brand/promo-1.webp"
            alt="Pessoa replantando uma planta ao lado de um regador"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </Reveal>
        <Reveal variant="right" className={styles.image}>
          <Image
            src="/images/brand/promo-2.webp"
            alt="Pessoa segurando um vaso de barro com espada-de-são-jorge"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </Reveal>
        <Reveal variant="scale" delay={250} className={styles.badge}>
          <div className={styles.frame}>
            <div>
              <h3 id="promo-title">
                <T id="promo.title" />
              </h3>
              <p className={styles.off}>
                <span>40%</span> OFF
              </p>
              <p className={styles.soon}>
                <T id="promo.soon" />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
