import { createSelector } from "@reduxjs/toolkit";
import { getProductById } from "@/data/products";
import { evaluateCoupon, type CouponResult } from "@/lib/coupons";
import type { Product } from "@/types";
import type { RootState } from "./index";

export interface DetailedCartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  total: number;
  coupon: CouponResult | null;
}

const selectLines = (state: RootState) => state.cart.lines;
const selectCouponCode = (state: RootState) => state.cart.couponCode;

export const selectDetailedCart = createSelector([selectLines], (lines): DetailedCartLine[] =>
  lines.flatMap((line) => {
    const product = getProductById(line.productId);
    return product
      ? [{ product, quantity: line.quantity, lineTotal: product.price * line.quantity }]
      : [];
  }),
);

export const selectCartCount = createSelector([selectLines], (lines) =>
  lines.reduce((sum, line) => sum + line.quantity, 0),
);

export const selectCartTotals = createSelector(
  [selectDetailedCart, selectCouponCode],
  (lines, couponCode): CartTotals => {
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const coupon = couponCode ? evaluateCoupon(couponCode, subtotal) : null;
    const discount = coupon?.status === "valid" ? coupon.discount : 0;
    return { subtotal, discount, total: subtotal - discount, coupon };
  },
);

export const selectQuantityInCart = (productId: string) => (state: RootState) =>
  state.cart.lines.find((line) => line.productId === productId)?.quantity ?? 0;

export const selectWishlistIds = (state: RootState) => state.wishlist.ids;
export const selectIsWishlisted = (productId: string) => (state: RootState) =>
  state.wishlist.ids.includes(productId);

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.user !== null;
