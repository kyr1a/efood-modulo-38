import { styled } from 'styled-components'
import { Breakpoints } from '../../styles/variaveis'

const StyledMenuList = styled.main`
  background-color: white;
  padding-top: 80px;
  padding-bottom: 120px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;

  width: min-content;
  margin: auto;

  @media (max-width: ${Breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${Breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`
export default StyledMenuList
