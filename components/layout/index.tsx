import React from 'react'
import Header from './Header'
import Container from './Container'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => {
  return (
    <div style={{ width: '100%' }}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
