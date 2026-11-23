"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { useT } from "@/lib/i18n";
import styles from "./Testimonials.module.css";

const INTERVAL_MS = 6000;

export function Testimonials() {
  const t = useT();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const resume = () => {
    setPaused(false);
    // Reinicia a barra de progresso para ficar sincronizada com o novo temporizador.
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(
      () => setIndex((i) => (i + 1) % testimonials.length),
      INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-label={t("testimonials.title")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={resume}
      onFocus={() => setPaused(true)}
      onBlur={resume}
    >
      <div className={styles.bg} aria-hidden="true">
        <Image src="/images/brand/depoimentos.webp" alt="" fill sizes="100vw" />
      </div>
      <div className={`container ${styles.inner}`}>
        <h2 className="sr-only">{t("testimonials.title")}</h2>
        <div className={styles.stage} aria-live={paused ? "polite" : "off"}>
          {testimonials.map((item, i) => (
            <figure
              key={item.id}
              className={styles.slide}
              data-active={i === index}
              aria-hidden={i !== index}
              style={{ margin: 0 }}
            >
              <div className={styles.avatar}>
                <Image src={item.avatar} alt={`Foto de ${item.name}`} fill sizes="100px" />
              </div>
              <figcaption>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.role}>{item.role}</p>
              </figcaption>
              <blockquote className={styles.quote}>{item.quote}</blockquote>
            </figure>
          ))}
        </div>
        <div className={styles.dots}>
          {testimonials.map((item, i) => (
            <button
              key={`${item.id}-${cycle}`}
              type="button"
              className={styles.dot}
              aria-label={t("testimonials.goTo", { name: item.name })}
              aria-current={i === index}
              data-paused={paused}
              style={{ "--ms": `${INTERVAL_MS}ms` } as React.CSSProperties}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
