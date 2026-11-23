import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getProductById } from "@/data/products";
import { normalizeCouponCode } from "@/lib/coupons";
import type { CartLine } from "@/types";

export const MAX_QUANTITY_PER_ITEM = 10;

export interface CartState {
  lines: CartLine[];
  couponCode: string | null;
}

export const initialCartState: CartState = { lines: [], couponCode: null };

const clamp = (quantity: number) =>
  Math.min(MAX_QUANTITY_PER_ITEM, Math.max(0, Math.floor(quantity)));

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action: PayloadAction<{ productId: string; quantity?: number }>) {
      const { productId, quantity = 1 } = action.payload;
      if (!getProductById(productId)) return;
      const line = state.lines.find((l) => l.productId === productId);
      if (line) line.quantity = clamp(line.quantity + quantity);
      else state.lines.push({ productId, quantity: clamp(quantity) });
    },
    removeItem(state, action: PayloadAction<string>) {
      state.lines = state.lines.filter((l) => l.productId !== action.payload);
      if (state.lines.length === 0) state.couponCode = null;
    },
    setQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const { productId, quantity } = action.payload;
      const next = clamp(quantity);
      if (next === 0) {
        state.lines = state.lines.filter((l) => l.productId !== productId);
        if (state.lines.length === 0) state.couponCode = null;
        return;
      }
      const line = state.lines.find((l) => l.productId === productId);
      if (line) line.quantity = next;
    },
    clearCart() {
      return initialCartState;
    },
    setCoupon(state, action: PayloadAction<string | null>) {
      state.couponCode = action.payload ? normalizeCouponCode(action.payload) : null;
    },
    /** Reidrata o carrinho salvo, descartando produtos que não existem mais no catálogo. */
    hydrateCart(_state, action: PayloadAction<Partial<CartState> | undefined>) {
      const saved = action.payload;
      const lines = (saved?.lines ?? [])
        .filter((l) => l && getProductById(l.productId) && Number.isFinite(l.quantity))
        .map((l) => ({ productId: l.productId, quantity: clamp(l.quantity) }))
        .filter((l) => l.quantity > 0);
      return { lines, couponCode: lines.length > 0 ? (saved?.couponCode ?? null) : null };
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart, setCoupon, hydrateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
