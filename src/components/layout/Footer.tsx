import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaRegEnvelope,
  FaYoutube,
} from "react-icons/fa6";
import { T } from "@/lib/i18n";
import { siteConfig } from "@/config/site";
import styles from "./Footer.module.css";
import { NewsletterForm } from "./NewsletterForm";

const SOCIAL_ICONS = {
  YouTube: FaYoutube,
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
} as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <div className={`container ${styles.newsletterInner}`}>
          <p className={styles.newsletterTitle}>
            <FaRegEnvelope aria-hidden="true" />
            <T id="newsletter.title" />
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          <nav className={styles.col} aria-labelledby="footer-links">
            <h2 id="footer-links">
              <T id="footer.quickLinks" />
            </h2>
            <ul role="list">
              <li>
                <Link href="/">
                  <T id="footer.home" />
                </Link>
              </li>
              <li>
                <Link href="/produtos?ordem=maior-desconto">
                  <T id="footer.promotions" />
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <T id="footer.blog" />
                </Link>
              </li>
            </ul>
          </nav>

          <div className={styles.col}>
            <h2>
              <T id="footer.contact" />
            </h2>
            <address className={styles.contact}>
              <p>
                <FaLocationDot aria-hidden="true" />
                {siteConfig.address}
              </p>
              <p>
                <FaPhone aria-hidden="true" />
                <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </p>
              <p>
                <FaRegEnvelope aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
              <p>{siteConfig.hours}</p>
            </address>
          </div>

          <div className={styles.col}>
            <h2>
              <T id="footer.social" />
            </h2>
            <div className={styles.social}>
              {siteConfig.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.name];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <p className={styles.bottom}>
          &copy; {new Date().getFullYear()} {siteConfig.name} | <T id="footer.rights" />
        </p>
      </div>
    </footer>
  );
}
