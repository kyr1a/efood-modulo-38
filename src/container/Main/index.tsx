import { useGetRestaurantesQuery } from '../../services/api'

import StyledMain from './style'

import Card from '../../components/Card'
import Loader from '../../components/Loader'

const Main = () => {
  const { data: restaurantes, isLoading } = useGetRestaurantesQuery()

  return (
    <StyledMain>
      {isLoading && <Loader />}
      {restaurantes &&
        restaurantes.map((card) => <Card key={card.id} {...card} />)}
    </StyledMain>
  )
}

export default Main
