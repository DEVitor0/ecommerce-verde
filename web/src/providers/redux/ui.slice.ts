import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  isMenuOpen: boolean
  isCartOpen: boolean
  isMessageOpen: boolean
  currentMessage: string
  overlayVisible: boolean
  currentAnimation: string | null
  isRecommendationVisible: boolean
  currentRecommendationIndex: number
}

const initialState: UiState = {
  isMenuOpen: false,
  isCartOpen: false,
  isMessageOpen: false,
  currentMessage: '',
  overlayVisible: false,
  currentAnimation: null,
  isRecommendationVisible: true,
  currentRecommendationIndex: 0,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen
      state.overlayVisible = state.isMenuOpen
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen
      state.overlayVisible = state.isCartOpen
    },
    openMessage: (state, action: PayloadAction<string>) => {
      state.isMessageOpen = true
      state.currentMessage = action.payload
      state.overlayVisible = true
    },
    closeMessage: (state) => {
      state.isMessageOpen = false
      state.currentMessage = ''
      state.overlayVisible = false
    },
    showOverlay: (state) => {
      state.overlayVisible = true
    },
    hideOverlay: (state) => {
      state.overlayVisible = false
    },
    setAnimation: (state, action: PayloadAction<string | null>) => {
      state.currentAnimation = action.payload
    },
    toggleRecommendation: (state) => {
      state.isRecommendationVisible = !state.isRecommendationVisible
    },
    setRecommendationIndex: (state, action: PayloadAction<number>) => {
      state.currentRecommendationIndex = action.payload
    },
  },
})

export const {
  toggleMenu,
  toggleCart,
  openMessage,
  closeMessage,
  showOverlay,
  hideOverlay,
  setAnimation,
  toggleRecommendation,
  setRecommendationIndex,
} = uiSlice.actions

export default uiSlice.reducer