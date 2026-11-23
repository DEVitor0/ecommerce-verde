"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePrice } from "@/hooks/usePrice";
import { getOrderById, PAYMENT_LABELS, type Order } from "@/lib/orders";
import styles from "./Checkout.module.css";

export function OrderConfirmation({ orderId }: { orderId?: string }) {
  const format = usePrice();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    // O pedido vive no navegador: só lemos depois da montagem para não divergir do HTML do servidor.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(orderId ? (getOrderById(orderId) ?? null) : null);
  }, [orderId]);

  if (order === undefined) return null;

  if (!order) {
    return (
      <div className={styles.empty}>
        <h2>Não encontramos este pedido</h2>
        <p>Ele pode ter sido feito em outro navegador. Continue explorando o catálogo.</p>
        <Link href="/produtos" className="btn btn-primary">
          Ver todas as plantas
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.success}>
      <svg className={styles.check} viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" />
        <path d="M19 33l9 9 17-19" />
      </svg>
      <h1 className={styles.title} style={{ marginBottom: 0 }}>
        Pedido registrado!
      </h1>
      <p>
        Obrigado, {order.customer.name.split(" ")[0]}. O número do seu pedido é{" "}
        <strong>{order.id}</strong>.
      </p>
      <div className={styles.orderBox}>
        <p>
          <strong>Entrega em:</strong> {order.address.street}, {order.address.number} ·{" "}
          {order.address.city}/{order.address.state}
        </p>
        <p>
          <strong>Pagamento:</strong> {PAYMENT_LABELS[order.payment]}
        </p>
        <ul role="list">
          {order.lines.map((l) => (
            <li key={l.name} className={styles.sum}>
              <span>
                {l.quantity}× {l.name}
              </span>
              <span>{format(l.unitPrice * l.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className={`${styles.sum} ${styles.sumTotal}`}>
          <span>Total</span>
          <span>{format(order.total)}</span>
        </p>
      </div>
      <p className={styles.note}>
        Esta é uma loja de demonstração: nenhuma cobrança foi feita e nenhum e-mail foi enviado.
      </p>
      <Link href="/produtos" className="btn btn-primary">
        Continuar comprando
      </Link>
    </div>
  );
}
