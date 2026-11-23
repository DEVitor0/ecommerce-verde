import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import cart from "./slices/cartSlice";
import ui from "./slices/uiSlice";
import wishlist from "./slices/wishlistSlice";

const rootReducer = combineReducers({ cart, wishlist, auth, ui });

export type RootState = ReturnType<typeof rootReducer>;

/** Fábrica de store: cada requisição/teste recebe a sua, evitando estado compartilhado no servidor. */
export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
