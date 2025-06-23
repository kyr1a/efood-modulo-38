import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

import { toggleSibeBar } from '../../store/reducers/cart'

import CartContainer from './Cart'
import AddressForm from './Address'
import CardPaymentForm from './CardPayment'

import StyledSideBar, { StyledOverlay } from './style'
import OrderMsg from './OrderMsg'
import { useState } from 'react'

function SideBar() {
  const [orderId, setOrderId] = useState('')
  const dispatch = useDispatch()
  const showSibeBar = useSelector(
    (state: RootReducer) => state.cartReducer.show
  )
  const SibeBarContent = useSelector(
    (state: RootReducer) => state.cartReducer.sidebarContent
  )
  if (showSibeBar)
    return (
      <StyledSideBar>
        <StyledOverlay onClick={() => dispatch(toggleSibeBar())} />
        {SibeBarContent == 'cart' && <CartContainer />}
        {SibeBarContent == 'adressform' && <AddressForm />}
        {SibeBarContent == 'cardform' && (
          <CardPaymentForm setORDER_ID={setOrderId} />
        )}
        {SibeBarContent == 'ordermsg' && <OrderMsg ORDER_ID={orderId} />}
      </StyledSideBar>
    )
  return null
}

export default SideBar
