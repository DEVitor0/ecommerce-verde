import { readStorage, writeStorage } from "./storage";

export type PaymentMethod = "pix" | "cartao" | "boleto";

export interface OrderLine {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: { name: string; email: string; phone: string };
  address: {
    cep: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
  };
  payment: PaymentMethod;
  lines: OrderLine[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string | null;
}

const ORDERS_KEY = "orders";

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  pix: "Pix",
  cartao: "Cartão de crédito",
  boleto: "Boleto",
};

export function getOrders(): Order[] {
  return readStorage<Order[]>(ORDERS_KEY, []);
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((order) => order.id === id);
}

export function saveOrder(order: Order): void {
  writeStorage(ORDERS_KEY, [order, ...getOrders()].slice(0, 20));
}
