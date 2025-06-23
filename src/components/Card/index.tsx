import StyledCard, { CardImg } from './style'
import estrela from '../../assets/images/estrela.svg'
import { CardButton } from '../Button'
import CardTag from '../Tags'
import { getTagsFromData } from '../../utilities/helper'

const Card = (props: RestauranteApiProps) => (
  <StyledCard>
    <div id="card_container">
      {getTagsFromData(props).map((tag, index) => (
        <CardTag key={index}>{tag}</CardTag>
      ))}
    </div>
    <CardImg style={{ backgroundImage: `url(${props.capa})` }} />
    <div id="desc">
      <div id="card_header">
        <h3>{props.titulo}</h3>{' '}
        <div id="card_point">
          <span>{props.avaliacao}</span>
          <img src={estrela} />
        </div>
      </div>
      <p>{props.descricao}</p>
      <div>
        <CardButton to={`${props.id}`}>Saiba mais</CardButton>
      </div>
    </div>
  </StyledCard>
)

export default Card
