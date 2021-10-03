import React from 'react'
import Header from './Header'
import Container from './Container'

const Layout: React.FC = ({ children }) => {
  return (
    <div style={{ width: '100%' }}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Container>{children}</Container>
      </div>
    </div>
  )
}

export default Layout
