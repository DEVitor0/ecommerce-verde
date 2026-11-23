import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/open-sans";
import "@fontsource-variable/montserrat";
import "@fontsource/mali/400.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "./globals.css";
import { Toasts } from "@/components/ui/Toasts";
import { siteConfig } from "@/config/site";
import { StoreProvider } from "@/store/StoreProvider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — plantas naturais e mudas`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/images/brand/hero.webp", width: 2200, height: 1466 }],
  },
};

export const viewport: Viewport = { themeColor: "#518432", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StoreProvider>
          {children}
          <Toasts />
        </StoreProvider>
      </body>
    </html>
  );
}
