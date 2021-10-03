import React from 'react'
import Header from './Header'
import Container from './Container'

const Layout: React.FC = ({ children }) => {
  return (
    <div style={{ width: '100%' }}>
      <Header />
      <Container>{children}</Container>
    </div>
  )
}

export default Layout
