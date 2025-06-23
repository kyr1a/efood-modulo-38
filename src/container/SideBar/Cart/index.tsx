import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../../store'
import { changeContent } from '../../../store/reducers/cart'

import CartCard from '../../../components/CartCard'
import { formataPreco } from '../../../utilities/helper'
import { StyledCartContainer, StyledCartResumo } from './style'

function CartContainer() {
  const itens = useSelector((state: RootReducer) => state.cartReducer.itens)
  const dispatch = useDispatch()

  return (
    <StyledCartContainer>
      <ul>
        {itens.map((item, _index) => {
          return <CartCard key={_index} {...item} />
        })}
      </ul>
      {itens.length ? (
        <StyledCartResumo>
          <div>
            <span>Valor total:</span>
            <span>
              {formataPreco(
                itens.reduce((acc, val) => {
                  return (acc += val.preco)
                }, 0)
              )}
            </span>
          </div>
          <button onClick={() => dispatch(changeContent('adressform'))}>
            Continuar com a entrega
          </button>
        </StyledCartResumo>
      ) : (
        <span style={{ color: 'white' }}>O carrinho está vazio...</span>
      )}
    </StyledCartContainer>
  )
}

export default CartContainer
