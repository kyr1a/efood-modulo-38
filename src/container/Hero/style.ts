import { styled } from 'styled-components'
import { Breakpoints } from '../../styles/variaveis'

const StyledHero = styled.div`
  height: 280px;
  display: block;
  padding-top: 24px;
  padding-bottom: 32px;

  background-color: rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-position: center;
  background-blend-mode: color;

  @media (max-width: ${Breakpoints.desktop}) {
  }

  @media (max-width: ${Breakpoints.tablet}) {
    padding-left: 8px;
  }

  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 32px;

    h2 {
      color: white;
      font-weight: 100;
    }

    strong {
      font-weight: 900;
      color: white;
    }
  }
`
export default StyledHero
