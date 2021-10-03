import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  @media screen and (max-width: 639px) {
    max-width: 640px;
  }
  @media screen and (min-width: 640px) and (max-width: 767px) {
    max-width: 768px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    max-width: 768px;
  }

  @media screen and (min-width: 1024px) and (max-width: 1279px) {
    max-width: 1024px;
  }

  @media screen and (min-width: 1280px) {
    max-width: 1280px;
  }
`

export default Container
