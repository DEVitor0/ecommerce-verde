import { readStorage, removeStorage, writeStorage } from "@/lib/storage";
import type { AppStore } from "./index";
import { hydrateSession } from "./slices/authSlice";
import { hydrateCart, type CartState } from "./slices/cartSlice";
import { hydratePreferences } from "./slices/uiSlice";
import { hydrateWishlist, type WishlistState } from "./slices/wishlistSlice";
import type { SessionUser } from "@/types";

const KEYS = {
  cart: "cart",
  wishlist: "wishlist",
  session: "session",
  prefs: "prefs",
} as const;

/** Lê o que foi salvo no navegador e despacha para os slices. Chamado uma vez, após a montagem. */
export function hydrateStore(store: AppStore): void {
  store.dispatch(hydrateCart(readStorage<CartState | undefined>(KEYS.cart, undefined)));
  store.dispatch(hydrateWishlist(readStorage<WishlistState | undefined>(KEYS.wishlist, undefined)));
  store.dispatch(hydrateSession(readStorage<SessionUser | null>(KEYS.session, null)));
  store.dispatch(
    hydratePreferences(
      readStorage<{ currency?: "BRL" | "USD" | "EUR"; locale?: "pt-BR" | "en-US" } | undefined>(
        KEYS.prefs,
        undefined,
      ),
    ),
  );
}

/**
 * Escreve no localStorage somente os slices que mudaram (comparação por referência,
 * garantida pelo Immer). Retorna a função que cancela a assinatura.
 */
export function attachPersistence(store: AppStore): () => void {
  let previous = store.getState();
  return store.subscribe(() => {
    const state = store.getState();
    if (state.cart !== previous.cart) writeStorage(KEYS.cart, state.cart);
    if (state.wishlist !== previous.wishlist) writeStorage(KEYS.wishlist, state.wishlist);
    if (state.auth.user !== previous.auth.user) {
      if (state.auth.user) writeStorage(KEYS.session, state.auth.user);
      else removeStorage(KEYS.session);
    }
    if (state.ui.currency !== previous.ui.currency || state.ui.locale !== previous.ui.locale) {
      writeStorage(KEYS.prefs, { currency: state.ui.currency, locale: state.ui.locale });
    }
    previous = state;
  });
}
