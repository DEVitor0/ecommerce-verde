import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/ui/Reveal";
import { getPostsByDate } from "@/data/posts";
import { T } from "@/lib/i18n";
import styles from "./BlogPreview.module.css";

export function BlogPreview() {
  const latest = getPostsByDate().slice(0, 2);
  return (
    <section className={styles.section} aria-labelledby="blog-title">
      <div className="container">
        <div className="section-title">
          <h2 id="blog-title">
            <T id="blog.title" />
          </h2>
          <p>
            <T id="blog.subtitle" />
          </p>
        </div>
        <div className={styles.grid}>
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 120}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
        <div className={styles.more}>
          <Link href="/blog" className="btn btn-outline">
            <T id="blog.allPosts" />
          </Link>
        </div>
      </div>
    </section>
  );
}
