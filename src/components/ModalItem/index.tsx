import { StyledMenuItemButton } from '../Button/style'

import StyledModal, { StyledModalContainer } from './style'
import btn_close from '../../assets/images/btn_close.png'

import { useDispatch } from 'react-redux'
import { addIten } from '../../store/reducers/cart'
import { formataPreco } from '../../utilities/helper'

const ModalItem = (props: MenuItemModalProps) => {
  const dispatch = useDispatch()
  if (!props.showModal) return <></>

  return (
    <StyledModal onClick={props.toggleModal}>
      <StyledModalContainer className="container">
        <img
          id="btn_close"
          src={btn_close}
          alt="X"
          onClick={props.toggleModal}
        />
        <img id="image_item" src={props.foto} alt="imagem" />
        <div id="details">
          <h3>{props.nome}</h3>
          <p>
            {props.descricao}
            <br />
            <br />
            Serve: de {props.porcao}
          </p>
          <StyledMenuItemButton
            onClick={() => {
              const { id, nome, descricao, foto, porcao, preco } = props
              const data = { id, nome, descricao, foto, porcao, preco }
              dispatch(addIten(data))
            }}
          >
            Adicionar ao carrinho - {formataPreco(props.preco)}
          </StyledMenuItemButton>
        </div>
      </StyledModalContainer>
    </StyledModal>
  )
}

export default ModalItem
