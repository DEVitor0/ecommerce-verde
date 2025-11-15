import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NavigationState {
  currentSection: 'populares' | 'novidades' | 'ofertas'
  isCarouselVisible: boolean
  scrollPosition: number
  isMobileView: boolean
  activeProductTab: number
}

const initialState: NavigationState = {
  currentSection: 'populares',
  isCarouselVisible: true,
  scrollPosition: 0,
  isMobileView: false,
  activeProductTab: 0,
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<'populares' | 'novidades' | 'ofertas'>) => {
      state.currentSection = action.payload
      state.isCarouselVisible = action.payload === 'populares'
    },
    setCarouselVisibility: (state, action: PayloadAction<boolean>) => {
      state.isCarouselVisible = action.payload
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload
    },
    setIsMobileView: (state, action: PayloadAction<boolean>) => {
      state.isMobileView = action.payload
    },
    setActiveProductTab: (state, action: PayloadAction<number>) => {
      state.activeProductTab = action.payload
    },
  },
})

export const {
  setCurrentSection,
  setCarouselVisibility,
  setScrollPosition,
  setIsMobileView,
  setActiveProductTab,
} = navigationSlice.actions

export default navigationSlice.reducer