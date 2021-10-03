import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import icon from '@assets/icon.png'

const Layout = dynamic(() => import('../components/layout'), {
  loading: () => <div>Loading...</div>
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Adofai.gg</title>
        <meta
          name="description"
          content="A website for viewing and downloading adofai custom levels."
          property="description"
        />
        <meta name="og:image" content={icon.src} property="image" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
