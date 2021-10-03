import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 40px;
`

const Error = () => {
  return (
    <ErrorContainer>
      <Head>
        <title>Error - Adofai.gg</title>
      </Head>
      Oops! An error occurred.
    </ErrorContainer>
  )
}

export default Error
