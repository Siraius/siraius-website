import '@/css/tailwind.css'
import '@/css/extra.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import ProgressBar from 'react-scroll-progress-bar'
import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import NProgress from 'nprogress'
import Router from 'next/router'
import { ClientReload } from '@/components/ClientReload'
import { useState } from 'react'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  const [progress, showProgress] = useState(true)

  NProgress.configure({ showSpinner: false })

  Router.onRouteChangeStart = () => {
    showProgress(false)
    NProgress.start()
  }

  Router.onRouteChangeComplete = () => {
    showProgress(true)
    NProgress.done()
  }

  Router.onRouteChangeError = () => {
    showProgress(true)
    NProgress.done()
  }
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      {progress && <ProgressBar bgcolor="#06b6d4" />}
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
