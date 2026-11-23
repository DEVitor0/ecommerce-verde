import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { Currency, Locale, Toast } from "@/types";

export type LoginPromptReason = "wishlist" | "checkout";

export interface UiState {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileNavOpen: boolean;
  quickViewProductId: string | null;
  loginPrompt: LoginPromptReason | null;
  currency: Currency;
  locale: Locale;
  toasts: Toast[];
}

export const initialUiState: UiState = {
  cartOpen: false,
  searchOpen: false,
  mobileNavOpen: false,
  quickViewProductId: null,
  loginPrompt: null,
  currency: "BRL",
  locale: "pt-BR",
  toasts: [],
};

const MAX_TOASTS = 3;

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    openCart(state) {
      state.cartOpen = true;
      state.searchOpen = false;
      state.mobileNavOpen = false;
    },
    closeCart(state) {
      state.cartOpen = false;
    },
    openSearch(state) {
      state.searchOpen = true;
      state.cartOpen = false;
      state.mobileNavOpen = false;
    },
    closeSearch(state) {
      state.searchOpen = false;
    },
    setMobileNav(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    openQuickView(state, action: PayloadAction<string>) {
      state.quickViewProductId = action.payload;
    },
    closeQuickView(state) {
      state.quickViewProductId = null;
    },
    showLoginPrompt(state, action: PayloadAction<LoginPromptReason>) {
      state.loginPrompt = action.payload;
    },
    hideLoginPrompt(state) {
      state.loginPrompt = null;
    },
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
    showToast: {
      reducer(state, action: PayloadAction<Toast>) {
        state.toasts = [...state.toasts, action.payload].slice(-MAX_TOASTS);
      },
      prepare(toast: Omit<Toast, "id">) {
        return { payload: { id: nanoid(), ...toast } };
      },
    },
    dismissToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    hydratePreferences(
      state,
      action: PayloadAction<Partial<Pick<UiState, "currency" | "locale">> | undefined>,
    ) {
      const prefs = action.payload;
      if (prefs?.currency && ["BRL", "USD", "EUR"].includes(prefs.currency)) {
        state.currency = prefs.currency;
      }
      if (prefs?.locale && ["pt-BR", "en-US"].includes(prefs.locale)) state.locale = prefs.locale;
    },
  },
});

export const {
  openCart,
  closeCart,
  openSearch,
  closeSearch,
  setMobileNav,
  openQuickView,
  closeQuickView,
  showLoginPrompt,
  hideLoginPrompt,
  setCurrency,
  setLocale,
  showToast,
  dismissToast,
  hydratePreferences,
} = uiSlice.actions;
export default uiSlice.reducer;
