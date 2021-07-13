import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import { global } from 'lib/style'
import { Stickers } from 'components/Stickers'

const globalStyles = global({
  html: {
    boxSizing: 'border-box',
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit',
  },
  'body, h1, h2, h3, h4, h5, h6, p, ol, ul': {
    margin: 0,
    padding: 0,
    fontWeight: 'normal',
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  'body, button, input': {
    fontFamily: '$sans',
  },
  body: {
    color: '$white',
    backgroundColor: '$green',
  },
  '::selection': {
    color: '$green',
    backgroundColor: '$white',
  },
})

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  globalStyles()

  return (
    <QueryClientProvider client={queryClient}>
      <Stickers />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
