import React from 'react'
import { ErrorContainer } from './_error'
import Head from 'next/head'

const NotFound: React.FC = () => {
  return (
    <ErrorContainer>
      <Head>
        <title>Not Found - Adofai.gg</title>
      </Head>
      Page Not Found
    </ErrorContainer>
  )
}

export default NotFound
