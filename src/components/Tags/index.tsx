import StyledCardTag from './style'

type Props = {
  children: string
}

const CardTag = (props: Props) => (
  <StyledCardTag>{props.children}</StyledCardTag>
)

export default CardTag
