"use client";

import { useCallback } from "react";
import { flyToCart } from "@/lib/flyToCart";
import { useT } from "@/lib/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated, selectIsWishlisted, selectQuantityInCart } from "@/store/selectors";
import { addItem, removeItem } from "@/store/slices/cartSlice";
import { openQuickView, showLoginPrompt, showToast } from "@/store/slices/uiSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import type { Product } from "@/types";

export function useProductActions(product: Product) {
  const dispatch = useAppDispatch();
  const t = useT();
  const quantityInCart = useAppSelector(selectQuantityInCart(product.id));
  const wishlisted = useAppSelector(selectIsWishlisted(product.id));
  const authenticated = useAppSelector(selectIsAuthenticated);

  const addToCart = useCallback(
    (quantity = 1, flySource?: Element | null) => {
      dispatch(addItem({ productId: product.id, quantity }));
      flyToCart(flySource ?? null);
      dispatch(
        showToast({ kind: "success", message: t("product.addedToast", { name: product.name }) }),
      );
    },
    [dispatch, product.id, product.name, t],
  );

  /** Comportamento do site original: o botão da cesta adiciona e, se já estiver no carrinho, remove. */
  const toggleCart = useCallback(
    (flySource?: Element | null) => {
      if (quantityInCart > 0) {
        dispatch(removeItem(product.id));
        dispatch(
          showToast({ kind: "info", message: t("product.removedToast", { name: product.name }) }),
        );
      } else {
        addToCart(1, flySource);
      }
    },
    [quantityInCart, dispatch, product.id, product.name, addToCart, t],
  );

  const toggleFavorite = useCallback(() => {
    if (!authenticated) {
      dispatch(showLoginPrompt("wishlist"));
      return;
    }
    dispatch(toggleWishlist(product.id));
  }, [authenticated, dispatch, product.id]);

  const quickView = useCallback(() => dispatch(openQuickView(product.id)), [dispatch, product.id]);

  return {
    quantityInCart,
    inCart: quantityInCart > 0,
    wishlisted,
    addToCart,
    toggleCart,
    toggleFavorite,
    quickView,
  };
}
