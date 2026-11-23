import type { Metadata } from "next";
import styles from "@/components/checkout/Checkout.module.css";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = { title: "Finalizar compra", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>Finalizar compra</h1>
      <CheckoutForm />
    </div>
  );
}
