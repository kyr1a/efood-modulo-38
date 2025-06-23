import StyledMenuItem from './style'

import { StyledMenuItemButton } from '../Button/style'
import ModalItem from '../ModalItem'
import { useState } from 'react'

const MenuItem = (props: MenuItemProps) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <StyledMenuItem>
      <img src={props.foto} alt={props.nome} />
      <h3>{props.nome}</h3>
      <p>{props.descricao.substring(0, 170) + '...'}</p>
      <StyledMenuItemButton
        className="w-full"
        onClick={() => setShowModal(true)}
      >
        Mais detalhes
      </StyledMenuItemButton>
      <ModalItem
        {...props}
        showModal={showModal}
        toggleModal={() => {
          setShowModal(false)
        }}
      />
    </StyledMenuItem>
  )
}

export default MenuItem
