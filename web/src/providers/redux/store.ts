import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './ui.slice'
import cartReducer from './cart.slice'
import productsReducer from './products.slice'
import navigationReducer from './navigation.slice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    products: productsReducer,
    navigation: navigationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch