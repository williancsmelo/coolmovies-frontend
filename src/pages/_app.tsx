import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { FC, useState } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import Head from 'next/head'
import { createStore } from '../redux'
import { EnhancedStore } from '@reduxjs/toolkit'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject
} from '@apollo/client'
import { ThemeProvider } from '@mui/styles'
import theme from '../styles/theme'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [store, setStore] = useState<EnhancedStore | null>(null)
  React.useEffect(() => {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: '/graphql'
    })
    const store = createStore({ epicDependencies: { client } })
    setStore(store)
  }, [])
  if (!store) return <>{'Loading...'}</>
  return (
    <>
      <Head>
        <title>{'Coolmovies Frontend'}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ReduxProvider>
    </>
  )
}

export default App
