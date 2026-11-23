import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getProductById } from "@/data/products";

export interface WishlistState {
  ids: string[];
}

export const initialWishlistState: WishlistState = { ids: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialWishlistState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (!getProductById(id)) return;
      state.ids = state.ids.includes(id) ? state.ids.filter((x) => x !== id) : [...state.ids, id];
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter((x) => x !== action.payload);
    },
    clearWishlist() {
      return initialWishlistState;
    },
    hydrateWishlist(_state, action: PayloadAction<Partial<WishlistState> | undefined>) {
      const ids = (action.payload?.ids ?? []).filter((id) => getProductById(id));
      return { ids: Array.from(new Set(ids)) };
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist, hydrateWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
