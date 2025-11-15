import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: 'popular' | 'new' | 'offer'
  isInCart: boolean
}

interface ProductsState {
  products: Product[]
  currentProductView: Product | null
  currentCategory: 'popular' | 'new' | 'offer'
  carouselDirection: 'left' | 'right'
  visibleProducts: number
  recommendations: {
    names: string[]
    messages: string[]
    images: string[]
    currentIndex: number
  }
}

const initialState: ProductsState = {
  products: [],
  currentProductView: null,
  currentCategory: 'popular',
  carouselDirection: 'right',
  visibleProducts: 3,
  recommendations: {
    names: ["Carlos Oliveira", "João Santos", "Maria Silva"],
    messages: [
      "Vivamus a finibus ac ipsum porttitor egestas ut sit amet nulla. Nunc facilisis ipsum ut nisl tempus, non feugiat justo semper. Vestibul ac justo justo. Proin pharetra, purus non vehicula sagittis, nunc varius porttitor ligula, in volutpat justo. ...",
      "Integer a semper ac purus ultrices dictum ut sit amet massa. Donec elementum purus ut ante blandit, non posuere justo viverra. Aliquam ac justo justo. Nulla facilisi, velit non posuere cursus, nunc tellus ultrices sodales, in eleifend justo. ...",
      "Quisque a tempus ac magna gravida pretium ut sit eros magna. Fusce suscipit magna ut elit gravida, non volutpat justo semper. Aliquam ac justo justo. Nam dictumst, lorem non convallis elementum, nunc tellus gravida lectus, in lobortis ipsum. ..."
    ],
    images: [
      "/src/assets/img/pessoas/pessoa3.jpg",
      "/src/assets/img/pessoas/pessoa2.jpg",
      "/src/assets/img/pessoas/pessoa1.jpg",
    ],
    currentIndex: 0,
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    setCurrentProductView: (state, action: PayloadAction<Product>) => {
      state.currentProductView = action.payload
    },
    setCurrentCategory: (state, action: PayloadAction<'popular' | 'new' | 'offer'>) => {
      state.currentCategory = action.payload
    },
    setCarouselDirection: (state, action: PayloadAction<'left' | 'right'>) => {
      state.carouselDirection = action.payload
    },
    setVisibleProducts: (state, action: PayloadAction<number>) => {
      state.visibleProducts = action.payload
    },
    toggleProductInCart: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload)
      if (product) {
        product.isInCart = !product.isInCart
      }
    },
    nextRecommendation: (state) => {
      state.recommendations.currentIndex = 
        (state.recommendations.currentIndex + 1) % state.recommendations.names.length
    },
    setRecommendationIndex: (state, action: PayloadAction<number>) => {
      state.recommendations.currentIndex = action.payload
    },
  },
})

export const {
  setProducts,
  setCurrentProductView,
  setCurrentCategory,
  setCarouselDirection,
  setVisibleProducts,
  toggleProductInCart,
  nextRecommendation,
  setRecommendationIndex,
} = productsSlice.actions

export default productsSlice.reducer