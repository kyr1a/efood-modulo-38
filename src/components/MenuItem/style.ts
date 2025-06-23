import { styled } from 'styled-components'
import { estilo } from '../../styles/variaveis'

const StyledMenuItem = styled.div`
  height: 340px;
  width: 320px;
  padding: 8px;
  background-color: ${estilo.corDaFonte};
  border-radius: 8px;

  > img {
    width: 100%;
    height: 168px;
    border-radius: 8px;
  }
  h3,
  p {
    color: ${estilo.corDaFonte2};
    margin: 8px 0;
  }

  h3 {
    font-weight: 900;
  }

  > p {
    font-size: 14px;
  }
`

export default StyledMenuItem
