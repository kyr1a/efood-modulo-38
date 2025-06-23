import { Link } from 'react-router-dom'
import StyledHeader from './style'
import efoodLogo from '../../assets/images/logo.svg'

const Header = () => (
  <StyledHeader>
    <Link to={'/'}>
      <img src={efoodLogo} alt="Logo do efood" />
    </Link>
    <h1>Viva experiências gastronômicas no conforto da sua casa</h1>
  </StyledHeader>
)

export default Header
