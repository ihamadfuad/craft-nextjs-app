// Define the global layout

import '@/app/globals.css'
import { LocalizationProvider } from '@/context/LocalizationContext'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider>
      <Component {...pageProps} />
    </LocalizationProvider>
  )
}