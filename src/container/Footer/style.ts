import { styled } from 'styled-components'
import { estilo, Breakpoints } from '../../styles/variaveis'

const StyledFooter = styled.footer`
  height: 298px;
  background-color: ${estilo.corDaFonte2};
  padding: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
    gap: 8px;
    margin-top: 32px;
    margin-bottom: 80px;
  }

  p {
    width: 480px;
    font-size: 10px;
    text-align: center;

    @media (max-width: ${Breakpoints.desktop}) {
    }

    @media (max-width: ${Breakpoints.tablet}) {
      width: 90vw;
    }
  }
`
export default StyledFooter
