import { styled } from 'styled-components'
import { estilo } from '../../styles/variaveis'

const StyledCardTag = styled.div`
  height: 26px;
  width: max-content;
  padding: 6px 4px;
  background-color: ${estilo.corDaFonte};
  color: ${estilo.corDaFonte2};
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
`

export default StyledCardTag
