import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { saveOrder, type Order, type PaymentMethod } from "@/lib/orders";
import type { RootState } from "../index";
import { selectCartTotals, selectDetailedCart } from "../selectors";
import { clearCart } from "../slices/cartSlice";

export interface CheckoutData {
  customer: Order["customer"];
  address: Order["address"];
  payment: PaymentMethod;
}

/** Cria o pedido a partir do carrinho atual, salva e esvazia o carrinho. Devolve o id do pedido. */
export const placeOrder = createAsyncThunk<
  string,
  CheckoutData,
  { state: RootState; rejectValue: string }
>("checkout/placeOrder", async (data, { getState, dispatch, rejectWithValue }) => {
  const state = getState();
  const lines = selectDetailedCart(state);
  if (lines.length === 0) return rejectWithValue("Seu carrinho está vazio.");

  const totals = selectCartTotals(state);
  const order: Order = {
    id: `JE-${nanoid(8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    ...data,
    lines: lines.map((l) => ({
      name: l.product.name,
      quantity: l.quantity,
      unitPrice: l.product.price,
    })),
    subtotal: totals.subtotal,
    discount: totals.discount,
    total: totals.total,
    couponCode: totals.coupon?.status === "valid" ? totals.coupon.code : null,
  };
  saveOrder(order);
  dispatch(clearCart());
  return order.id;
});
