import { styled } from 'styled-components'
import { Breakpoints } from '../../styles/variaveis'

const StyledMain = styled.main`
  background-color: white;
  padding-top: 80px;
  padding-bottom: 120px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
  row-gap: 48px;

  width: min-content;
  margin: auto;

  @media (max-width: ${Breakpoints.desktop}) {
    width: 90%;
  }

  @media (max-width: ${Breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`
export default StyledMain
