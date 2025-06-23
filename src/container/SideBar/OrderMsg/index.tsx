import { useDispatch } from 'react-redux'
import {
  toggleSibeBar,
  changeContent,
  clearCart
} from '../../../store/reducers/cart'

import StyledOrderMsg from './style'

function OrderMsg({ ORDER_ID }: { ORDER_ID: string }) {
  const dispatch = useDispatch()
  return (
    <StyledOrderMsg>
      <h3>Pedido realizado - {ORDER_ID}</h3>
      <div>
        <p>
          Estamos felizes em informar que seu pedido já está em processo de
          preparação e, em breve, será entregue no endereço fornecido.
        </p>
        <br />
        <p>
          Gostaríamos de ressaltar que nossos entregadores não estão autorizados
          a realizar cobranças extras.{' '}
        </p>
        <br />
        <p>
          Lembre-se da importância de higienizar as mãos após o recebimento do
          pedido, garantindo assim sua segurança e bem-estar durante a refeição.
        </p>
        <br />
        <p>
          Esperamos que desfrute de uma deliciosa e agradável experiência
          gastronômica. Bom apetite!
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(changeContent('cart'))
          dispatch(toggleSibeBar())
          dispatch(clearCart())
        }}
      >
        Concluir
      </button>
    </StyledOrderMsg>
  )
}

export default OrderMsg
