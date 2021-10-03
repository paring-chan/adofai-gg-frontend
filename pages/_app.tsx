import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('../components/layout'), {
  loading: () => <div>Loading...</div>
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
