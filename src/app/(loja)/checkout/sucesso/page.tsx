import type { Metadata } from "next";
import styles from "@/components/checkout/Checkout.module.css";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";

export const metadata: Metadata = { title: "Pedido registrado", robots: { index: false } };

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ pedido?: string }>;
}) {
  const { pedido } = await searchParams;
  return (
    <div className={`container ${styles.page}`}>
      <OrderConfirmation orderId={pedido} />
    </div>
  );
}
