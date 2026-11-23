import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import styles from "@/components/blog/Blog.module.css";
import { getPostBySlug, getPostsByDate, posts } from "@/data/posts";
import { formatLongDate } from "@/lib/dates";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.date, images: [{ url: post.image }] },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();
  const others = getPostsByDate()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className={`container ${styles.page}`}>
      <article className={styles.article}>
        <Link href="/blog" style={{ color: "var(--green-600)", fontWeight: 600 }}>
          ← Todos os artigos
        </Link>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>
          <time dateTime={post.date}>{formatLongDate(post.date)}</time>
          <span>{post.readingMinutes} min de leitura</span>
        </p>
        <div className={styles.cover}>
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 760px"
          />
        </div>
        <p className={styles.intro}>{post.intro}</p>
        <div className={styles.prose}>
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
          ))}
        </div>
        <div className={styles.cta}>
          <p>Pronto para escolher a sua próxima planta?</p>
          <Link href="/produtos" className="btn btn-primary">
            Ver todas as plantas
          </Link>
        </div>
      </article>

      <section className={styles.more} aria-labelledby="more-posts">
        <div className="section-title">
          <h2 id="more-posts">Continue lendo</h2>
        </div>
        <div className={styles.moreGrid}>
          {others.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
