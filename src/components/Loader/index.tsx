import { ClockLoader } from 'react-spinners'
import StyledLoader from './style'
import { estilo } from '../../styles/variaveis'

function Loader() {
  return (
    <StyledLoader>
      <ClockLoader size={75} color={estilo.corDaFonte} />
    </StyledLoader>
  )
}

export default Loader
