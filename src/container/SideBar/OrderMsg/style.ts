import { styled } from 'styled-components'
import { estilo } from '../../../styles/variaveis'

const StyledOrderMsg = styled.aside`
  width: 360px;
  background-color: ${estilo.corDaFonte};
  padding: 32px 8px;
  > h3 {
    color: ${estilo.corDaFonte2};
    font-weight: 700;
    font-size: 16px;
    line-height: 18.75px;
    margin-bottom: 16px;
  }
  > div {
    p {
      color: ${estilo.corDaFonte2};
      font-size: 14px;
      line-height: 22px;
      font-weight: 400;
    }
  }

  > button {
    background-color: ${estilo.corDaFonte2};
    font-weight: 700;
    font-size: 14px;
    line-height: 16.41px;
    width: 100%;
    padding: 4px;
    margin-top: 24px;
  }
`

export default StyledOrderMsg
