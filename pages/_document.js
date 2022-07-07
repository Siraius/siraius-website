import Document, { Html, Head, Main, NextScript } from 'next/document'
import siteMetadata from '@/data/siteMetadata'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#16b4d5" />
          <meta name="msapplication-TileColor" content="#16b4d5" />
          <meta name="apple-mobile-web-app-title" content={siteMetadata.title}></meta>
          <meta name="application-name" content={siteMetadata.title} />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#333333" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </Head>
        <body
          className=" bg-blur bg-gradient-to-tr from-white via-white to-primary-300 bg-fixed text-black antialiased
         selection:bg-primary-500/60 dark:bg-gradient-to-tr dark:from-gray-900 dark:via-gray-800 dark:to-primary-900 dark:text-white dark:selection:bg-primary-700"
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
