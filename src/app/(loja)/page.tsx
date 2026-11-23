import { BlogPreview } from "@/components/home/BlogPreview";
import { Benefits } from "@/components/home/Benefits";
import { CategoryMosaic } from "@/components/home/CategoryMosaic";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <CategoryMosaic />
      <FeaturedProducts />
      <PromoBanner />
      <Benefits />
      <CategoryShowcase />
      <Testimonials />
      <BlogPreview />
    </>
  );
}
