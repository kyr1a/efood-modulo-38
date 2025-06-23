import StyledHero from './style'

const Hero = (props: RestauranteApiProps) => (
  <StyledHero style={{ backgroundImage: `url(${props.capa})` }}>
    <div className="container">
      <h2>{props.tipo}</h2>
      <div>
        <strong>{props.titulo}</strong>
      </div>
    </div>
  </StyledHero>
)

export default Hero
