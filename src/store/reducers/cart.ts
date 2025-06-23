import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SidebarContent = 'cart' | 'adressform' | 'cardform' | 'ordermsg'

type CartState = {
  show: boolean
  sidebarContent: SidebarContent
  itens: MenuItemProps[]
}

const initialState: CartState = {
  show: false,
  sidebarContent: 'cart',
  itens: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleSibeBar: (state) => {
      state.show = !state.show
    },
    changeContent: (state, action: PayloadAction<SidebarContent>) => {
      state.sidebarContent = action.payload
    },
    addIten: (state, action: PayloadAction<MenuItemProps>) => {
      if (state.itens.find((_item) => _item.id === action.payload.id)) {
        alert('Item já adicionado...')
      } else {
        state.itens.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((item) => item.id !== action.payload)
    },
    clearCart: (state) => {
      state.itens = []
    }
  }
})

export const { toggleSibeBar, addIten, removeItem, changeContent, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
