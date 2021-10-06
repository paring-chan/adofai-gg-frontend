import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  left: 0;
  bottom: 0;
  margin-top: auto;
  width: 100%;
  height: 90px;
`

const Content = styled.div`
  height: 100%;
  width: 100vw;
  bottom: 0;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  line-height: 90px;
  vertical-align: middle;
  text-align: center;
`

const Footer: React.FC = () => {
  return (
    <Container>
      <Content>
        <h4 style={{ fontWeight: 400 }}>
          ADOFAI.GG is not associated with{' '}
          <a href="https://7thbe.at/" target="_blank" rel="noreferrer">
            7th Beat Games
          </a>
          {'. | '}
          <a
            href="https://discord.gg/TKdpbUUfUa"
            target="_blank"
            rel="noreferrer"
          >
            Join Our Discord
          </a>
          {' | '}
          <a href="mailto:adofai.gg@gmail.com">Contact Us</a>
          {' | Powered By '}
          <a href="https://www.hanmesoft.com/" target="_blank" rel="noreferrer">
            Hanmesoft
          </a>
        </h4>
      </Content>
    </Container>
  )
}

export default Footer
