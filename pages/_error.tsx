import React from 'react'
import { NextPageContext } from 'next'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 40px;
`

const Error = ({ statusCode }: { statusCode: number }) => {
  const getMessage = () => {
    switch (statusCode) {
      case 404:
        return 'Page not found.'
      default:
        return 'Oops! An error occurred.'
    }
  }

  return <Container>{getMessage()}</Container>
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
