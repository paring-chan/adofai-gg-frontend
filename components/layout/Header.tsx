import React from 'react'
import styled from 'styled-components'
import logo from '@assets/logo.svg'
import Link from 'next/link'

const Container = styled.div`
  height: 40px;
  background: rgba(26, 37, 51, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  gap: 10px;
`

const LinksContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  a {
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 0 25px;
    height: 100%;
  }
`

const AccountMenuContainer = styled.div`
  /* not implemented */
`

const Header: React.FC = () => {
  return (
    <Container>
      {/*logo*/}
      <Link passHref href="/">
        <a>
          <img src={logo.src} height={20} alt="logo" />
        </a>
      </Link>
      {/*links*/}
      <LinksContainer>
        <Link href="/levels" passHref>
          <a>Levels</a>
        </Link>
      </LinksContainer>
      {/*account menu*/}
      <AccountMenuContainer />
    </Container>
  )
}

export default Header
