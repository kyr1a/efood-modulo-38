declare interface MenuItemProps {
  id: number
  nome: string
  descricao: string
  preco: number
  porcao: string
  foto: string
}

declare interface MenuItemModalProps extends MenuItemProps {
  showModal: boolean
  toggleModal: () => void
}

declare interface RestauranteApiProps {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: MenuItemProps[]
}

// API
declare interface ProductProps {
  id: number
  price: number
}

declare interface OrderProps {
  products: ProductProps[]
  delivery: {
    receiver: string
    address: {
      description: string
      city: string
      zipCode: string
      number: number
      complement: string
    }
  }
  payment: {
    card: {
      name: string
      number: string
      code: number
      expires: {
        month: number
        year: number
      }
    }
  }
}
