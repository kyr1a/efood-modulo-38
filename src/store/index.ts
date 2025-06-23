import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './reducers/cart'
import orderReducer from './reducers/purchase'
import api from '../services/api'

export const cartStore = configureStore({
  reducer: {
    cartReducer,
    orderReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof cartStore.getState>
