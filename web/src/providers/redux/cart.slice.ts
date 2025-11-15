import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  subtotal: number
}

interface CartState {
  items: CartItem[]
  subtotal: number
  isCartEmpty: boolean
  lastAddedItem: CartItem | null
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  isCartEmpty: true,
  lastAddedItem: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'id' | 'subtotal' | 'quantity'>>) => {
      const { name, price, originalPrice, image } = action.payload
      const existingItem = state.items.find(item => item.name === name)
      
      if (existingItem) {
        existingItem.quantity += 1
        existingItem.subtotal = existingItem.price * existingItem.quantity
      } else {
        const newItem: CartItem = {
          id: Date.now().toString(),
          name,
          price,
          originalPrice,
          image,
          quantity: 1,
          subtotal: price,
        }
        state.items.push(newItem)
        state.lastAddedItem = newItem
      }
      
      state.subtotal = state.items.reduce((total, item) => total + item.subtotal, 0)
      state.isCartEmpty = state.items.length === 0
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload
      state.items = state.items.filter(item => item.id !== itemId)
      state.subtotal = state.items.reduce((total, item) => total + item.subtotal, 0)
      state.isCartEmpty = state.items.length === 0
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item && quantity > 0) {
        item.quantity = quantity
        item.subtotal = item.price * quantity
        state.subtotal = state.items.reduce((total, item) => total + item.subtotal, 0)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.subtotal = 0
      state.isCartEmpty = true
      state.lastAddedItem = null
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        item.quantity += 1
        item.subtotal = item.price * item.quantity
        state.subtotal = state.items.reduce((total, item) => total + item.subtotal, 0)
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        item.subtotal = item.price * item.quantity
        state.subtotal = state.items.reduce((total, item) => total + item.subtotal, 0)
      }
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions

export default cartSlice.reducer