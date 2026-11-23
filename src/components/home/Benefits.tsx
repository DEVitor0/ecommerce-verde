import { FaCheck, FaCoins, FaHeadset, FaTruck } from "react-icons/fa6";
import { Reveal } from "@/components/ui/Reveal";
import { T, type MessageKey } from "@/lib/i18n";
import styles from "./Benefits.module.css";

const ITEMS: ReadonlyArray<{ icon: typeof FaCheck; title: MessageKey; text: MessageKey }> = [
  { icon: FaHeadset, title: "benefit.support.title", text: "benefit.support.text" },
  { icon: FaCoins, title: "benefit.refund.title", text: "benefit.refund.text" },
  { icon: FaTruck, title: "benefit.shipping.title", text: "benefit.shipping.text" },
  { icon: FaCheck, title: "benefit.guarantee.title", text: "benefit.guarantee.text" },
];

export function Benefits() {
  return (
    <section className={styles.section}>
      <ul role="list" className={`container ${styles.list}`}>
        {ITEMS.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 80} className={styles.item}>
            <Icon className={styles.icon} aria-hidden="true" />
            <div>
              <p className={styles.title}>
                <T id={title} />
              </p>
              <p className={styles.text}>
                <T id={text} />
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
