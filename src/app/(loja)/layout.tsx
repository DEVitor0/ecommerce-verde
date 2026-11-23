import type { ReactNode } from "react";
import { LoginPrompt } from "@/components/auth/LoginPrompt";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QuickView } from "@/components/product/QuickView";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { T } from "@/lib/i18n";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        <T id="header.skip" />
      </a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <QuickView />
      <LoginPrompt />
    </>
  );
}
