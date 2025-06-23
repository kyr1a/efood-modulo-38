import { styled } from 'styled-components'
import { estilo } from '../../styles/variaveis'

const StyledCartCard = styled.li`
  background-color: ${estilo.corDaFonte2};
  list-style: none;
  padding: 8px;
  width: 100%;
  height: 100px;
  position: relative;
  margin-bottom: 16px;

  > img {
    width: 80px;
    height: 80px;
    float: inline-start;
    margin-right: 8px;
    object-fit: cover;
  }

  > h3 {
    color: ${estilo.corDaFonte};
    text-align: left;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    margin-bottom: 1rem;
  }

  span {
    color: ${estilo.corDaFonte};
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }

  button {
    position: absolute;
    width: 16px;
    bottom: 8px;
    right: 8px;
    img {
      width: 100%;
    }
  }
`

export default StyledCartCard
