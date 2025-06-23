import { useDispatch } from 'react-redux'
import { removeItem } from '../../store/reducers/cart'

import StyledCartCard from './style'

import lixeira from '../../assets/images/lixeira_icon.png'
import { formataPreco } from '../../utilities/helper'

function CartCard(props: MenuItemProps) {
  const dispatch = useDispatch()
  return (
    <StyledCartCard>
      <img src={props.foto} alt={props.nome} />
      <h3>{props.nome}</h3>
      <span>{formataPreco(props.preco)}</span>
      <button
        type="button"
        onClick={() => {
          dispatch(removeItem(props.id))
        }}
      >
        <img src={lixeira} />
      </button>
    </StyledCartCard>
  )
}

export default CartCard
