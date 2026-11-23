import type { Metadata } from "next";
import styles from "@/components/catalog/Catalog.module.css";
import { WishlistView } from "@/components/catalog/WishlistView";

export const metadata: Metadata = { title: "Favoritos", robots: { index: false } };

export default function WishlistPage() {
  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <h1 className={styles.title}>Seus favoritos</h1>
      </div>
      <WishlistView />
    </div>
  );
}
