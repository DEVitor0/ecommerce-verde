import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import styles from "@/components/blog/Blog.module.css";
import { Reveal } from "@/components/ui/Reveal";
import { getPostsByDate } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guias práticos de rega, luz, replantio e cuidados para plantas de interior e exterior.",
};

export default function BlogIndexPage() {
  return (
    <div className={`container ${styles.page}`}>
      <div className="section-title">
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(1.8rem, 1.2rem + 2vw, 2.5rem)",
          }}
        >
          Nossos Blogs
        </h1>
        <p>Guias práticos para cuidar bem das suas plantas</p>
      </div>
      <div className={styles.grid}>
        {getPostsByDate().map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 100}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
