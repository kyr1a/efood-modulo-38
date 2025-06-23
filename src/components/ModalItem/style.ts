import { styled } from 'styled-components'
import { StyledMenuItemButton } from '../Button/style'
import { Breakpoints, estilo } from '../../styles/variaveis'

const StyledModal = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledModalContainer = styled.div`
  width: 100%;
  height: 344px;
  padding: 32px;
  display: flex;
  gap: 24px;
  background-color: ${estilo.corDaFonte};

  position: relative;

  @media (max-width: ${Breakpoints.desktop}) {
  }

  @media (max-width: ${Breakpoints.tablet}) {
    height: min-content;
    flex-direction: column;
    align-items: center;
    text-align: justify;
  }

  > #btn_close {
    width: 16px;
    height: 16px;

    position: absolute;
    top: 8px;
    right: 8px;

    cursor: pointer;
  }

  > #image_item {
    width: 280px;
    height: 280px;
  }

  #details {
    display: flex;
    flex-direction: column;
    gap: 16px;
    h3 {
      font-weight: 900;
      font-size: 18px;
      line-height: 21px;
      color: white;
    }

    p {
      font-size: 14px;
      line-height: 22px;
      font-weight: 400;
    }
    ${StyledMenuItemButton} {
      width: max-content;
      padding: 4px 7px;
    }
  }
`

export default StyledModal
