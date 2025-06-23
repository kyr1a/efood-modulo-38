import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { estilo } from '../../styles/variaveis'

export const StyledCardButton = styled(Link)`
  height: 24px;
  width: max-content;
  padding: 4px 6px;
  background-color: ${estilo.corDaFonte};
  color: ${estilo.corDaFonte2};
  text-align: center;
  font-size: 14px;
  font-weight: 700;
`

export const StyledMenuItemButton = styled.button`
  background-color: ${estilo.corDaFonte2};
  height: 24px;

  font-size: 14px;
  font-weight: 700;
  line-height: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
`
