import { styled } from 'styled-components'

export const StyledOverlay = styled.div`
  height: 100vh;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
`
const StyledSideBar = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
`

export default StyledSideBar
