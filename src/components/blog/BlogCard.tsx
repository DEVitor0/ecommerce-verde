import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa6";
import { T } from "@/lib/i18n";
import { formatLongDate } from "@/lib/dates";
import type { BlogPost } from "@/types";
import styles from "./BlogCard.module.css";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className={styles.card}>
      <Link href={`/blog/${post.slug}`} className={styles.media} tabIndex={-1} aria-hidden="true">
        <Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" />
      </Link>
      <div className={styles.body}>
        <p className={styles.date}>
          <FaRegCalendar aria-hidden="true" />
          <time dateTime={post.date}>{formatLongDate(post.date)}</time>
        </p>
        <h3 className={styles.title}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className={`btn btn-primary btn-sm ${styles.cta}`}
          aria-label={`Ler artigo: ${post.title}`}
        >
          <T id="blog.readMore" />
        </Link>
      </div>
    </article>
  );
}
