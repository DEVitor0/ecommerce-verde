import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCheck, FaDroplet, FaPaw, FaRulerVertical, FaSun } from "react-icons/fa6";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import styles from "@/components/product/ProductPage.module.css";
import { Price } from "@/components/ui/Price";
import { Stars } from "@/components/ui/Stars";
import { siteConfig } from "@/config/site";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { buildCatalogHref, getCategoryLabel } from "@/lib/catalog";
import { LIGHT_LABELS, SIZE_LABELS, WATER_LABELS } from "@/lib/labels";
import { discountPercent } from "@/lib/money";
import { PriceInstallments } from "./PriceInstallments";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  if (!product) return {};
  return {
    title: `${product.name} (${product.scientificName})`,
    description: product.description,
    openGraph: { images: [{ url: product.image }] },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();

  const discount = discountPercent(product.price, product.compareAtPrice);
  const related = getRelatedProducts(product);
  const mainCategory = product.categories[0]!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: `${siteConfig.url}${product.image}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: (product.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/produto/${product.slug}`,
    },
  };

  const care = [
    { icon: FaSun, label: "Luz", value: LIGHT_LABELS[product.light] },
    { icon: FaDroplet, label: "Rega", value: WATER_LABELS[product.water] },
    {
      icon: FaRulerVertical,
      label: "Tamanho",
      value: `${SIZE_LABELS[product.size]} · ${product.height}`,
    },
    {
      icon: FaPaw,
      label: "Pets",
      value: product.petSafe ? "Segura para gatos e cachorros" : "Tóxica se ingerida",
    },
  ];

  return (
    <div className={`container ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className={styles.crumbs} aria-label="Você está aqui">
        <Link href="/">Início</Link>/<Link href="/produtos">Plantas</Link>/
        <Link href={buildCatalogHref({ categoria: mainCategory })}>
          {getCategoryLabel(mainCategory)}
        </Link>
        /<span aria-current="page">{product.name}</span>
      </nav>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <div className={styles.imageWrap} data-product-image>
            {discount > 0 && <span className={styles.badge}>{discount}% OFF</span>}
            <Image
              src={product.image}
              alt={`${product.name} em vaso`}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 50vw"
              quality={85}
            />
          </div>
        </div>

        <div className={styles.info}>
          <div>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.sci}>{product.scientificName}</p>
          </div>
          <div className={styles.meta}>
            <Stars rating={product.rating} size={16} />
            <span>
              {product.rating.toFixed(1).replace(".", ",")} ({product.reviews} avaliações)
            </span>
            <span>Ref: {product.sku}</span>
          </div>
          <div className={styles.priceBox}>
            <p>
              <Price
                cents={product.price}
                compareAt={product.compareAtPrice}
                className={styles.price}
                oldClassName={styles.old}
              />
            </p>
            <PriceInstallments cents={product.price} className={styles.installments} />
          </div>
          <p className={styles.desc}>{product.description}</p>
          <ProductPurchase product={product} />
          <ul role="list" className={styles.highlights}>
            {product.highlights.map((h) => (
              <li key={h}>
                <FaCheck aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
          <div className={styles.care}>
            {care.map(({ icon: Icon, label, value }) => (
              <div key={label} className={styles.careItem}>
                <span className={styles.careIcon}>
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <p className={styles.careLabel}>{label}</p>
                  <p className={styles.careValue}>{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.tip}>
            <strong>Dica de cuidado</strong>
            {product.careTip}
          </div>
        </div>
      </div>

      <section className={styles.related} aria-labelledby="related-title">
        <div className="section-title">
          <h2 id="related-title">Combina com</h2>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((p) => (
            <ProductCard key={p.id} product={p} sizes="(max-width: 860px) 45vw, 22vw" />
          ))}
        </div>
      </section>
    </div>
  );
}
