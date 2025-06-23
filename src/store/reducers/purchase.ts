import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: OrderProps = {
  products: [{ id: 1, price: 1 }],
  delivery: {
    receiver: '',
    address: {
      description: '',
      city: '',
      zipCode: '',
      number: 0,
      complement: ''
    }
  },
  payment: {
    card: {
      name: '',
      number: '',
      code: 0,
      expires: {
        month: 0,
        year: 0
      }
    }
  }
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setProdutos: (state, action: PayloadAction<ProductProps[]>) => {
      state.products = action.payload
    },
    setDelivery: (state, action: PayloadAction<OrderProps['delivery']>) => {
      state.delivery = action.payload
    },
    setPayment: (state, action: PayloadAction<OrderProps['payment']>) => {
      state.payment = action.payload
    }
  }
})

export const { setProdutos, setDelivery, setPayment } = orderSlice.actions

export default orderSlice.reducer
