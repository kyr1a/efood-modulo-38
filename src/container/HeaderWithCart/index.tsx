import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootReducer } from '../../store'
import { toggleSibeBar } from '../../store/reducers/cart'

import efoodLogo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/carrinho.svg'

import StyledHeaderWithCart from './style'

const HeaderWithCart = () => {
  const dispatch = useDispatch()
  const itens = useSelector((state: RootReducer) => state.cartReducer.itens)
  return (
    <StyledHeaderWithCart>
      <div className="container">
        <span>Restaurantes</span>
        <Link to={'/'}>
          <img src={efoodLogo} alt="Logo do efood" />
        </Link>
        <span
          id="cart_button"
          onClick={() => {
            if (itens.length > 0) dispatch(toggleSibeBar())
            else alert('Carrinho Vazio')
          }}
        >
          <span id="cart_counter">{itens.length}</span>
          <span className="hideOnMobileScreen"> produtos no carrinho</span>
          <img id="cart_img" className="hideOnDesktopScreen" src={carrinho} />
        </span>
      </div>
    </StyledHeaderWithCart>
  )
}

export default HeaderWithCart
