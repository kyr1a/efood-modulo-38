import { createGlobalStyle } from 'styled-components'
import { estilo, Breakpoints } from './variaveis'

const EstiloGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    color: ${estilo.corDaFonte};

    .hideOnDesktopScreen {
      display: none;
    }

    @media (max-width: ${Breakpoints.desktop}) {
      .hideOnTabletScreen {
        display: none;
      }
    }

    @media (max-width: ${Breakpoints.tablet}) {
      .hideOnMobileScreen {
        display: none;
      }
      .hideOnDesktopScreen {
        display: block;
      }
    }
  }

  .container {
    max-width: 1024px;
    margin: 0 auto;

    @media (max-width: ${Breakpoints.desktop}) {
      max-width: 90%;
    }

    @media (max-width: ${Breakpoints.tablet}) {
    max-width: 95%;
  }
  }
`

export default EstiloGlobal
