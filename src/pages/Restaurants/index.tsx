import { useParams } from 'react-router-dom'

import { useGetRestauranteByIdQuery } from '../../services/api'

import HeaderWithCart from '../../container/HeaderWithCart'
import MenuList from '../../container/MenuList'
import Loader from '../../components/Loader'

const Restaurants = () => {
  const { id } = useParams()
  const { data: restaurante } = useGetRestauranteByIdQuery(id!)

  if (restaurante) document.title = 'eFood | ' + restaurante.titulo

  return (
    <>
      <HeaderWithCart />
      {restaurante ? <MenuList {...restaurante} /> : <Loader />}
    </>
  )
}

export default Restaurants
