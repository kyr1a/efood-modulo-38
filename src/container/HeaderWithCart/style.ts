import { styled } from 'styled-components'
import { estilo, Breakpoints } from '../../styles/variaveis'

const StyledHeaderWithCart = styled.header`
  height: 186px;
  background-color: ${estilo.corDaFonte2};
  padding-top: 64px;

  @media (max-width: ${Breakpoints.desktop}) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (max-width: ${Breakpoints.tablet}) {
    #cart_button {
      position: relative;
      background-color: ${estilo.corDaFonte};
      border-radius: 20%;
      padding: 8px;
    }
    #cart_counter {
      position: absolute;
      left: -10px;
      bottom: -10px;
      background-color: red;
      width: 24px;
      height: 24px;
      line-height: 24px;
      border-radius: 50%;
      color: ${estilo.corDaFonte2};
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-weight: 900;
      font-size: 18px;
      line-height: 21.09px;
      text-align: center;
      cursor: pointer;
    }
  }
`
export default StyledHeaderWithCart
