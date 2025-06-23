import { styled } from 'styled-components'
import { estilo } from '../../../styles/variaveis'

const StyledCart = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
`

export const StyledOverlay = styled.div`
  height: 100vh;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
`

export const StyledCartContainer = styled.div`
  width: 360px;
  background-color: ${estilo.corDaFonte};
  padding: 32px 8px;
`
export const StyledCartResumo = styled.div`
  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 16px;
    span {
      color: ${estilo.corDaFonte2};
      font-family: Roboto;
      font-size: 14px;
      font-weight: 700;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: center;
    }
  }

  > button {
    background-color: ${estilo.corDaFonte2};
    width: 100%;
    height: 24px;

    font-family: Roboto;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
  }
`

export default StyledCart
