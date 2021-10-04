import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import icon from '@assets/icon.png'
import { ThemeProvider, createTheme } from '@mui/material'
import NextNProgress from 'nextjs-progressbar'

const Layout = dynamic(() => import('../components/layout'), {
  loading: () => <div>Loading...</div>
})

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    typography: {
      fontFamily: "Quicksand, '나눔스퀘어라운드', sans-serif"
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <div id="bg" />
      <NextNProgress showOnShallow={true} stopDelayMs={200} height={3} />
      <Layout>
        <Head>
          <title>Adofai.gg</title>
          <meta
            name="description"
            content="A website for viewing and downloading adofai custom levels."
            key="description"
          />
          <meta key="image" property="og:image" content={icon.src} />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
export default MyApp
