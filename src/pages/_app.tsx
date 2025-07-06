// Define the global layout

import '@/app/globals.css'
import { LocalizationProvider } from '@/context/LocalizationContext'
import { SessionStorageProvider } from '@/context/SessionStorageContext'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider>
      <SessionStorageProvider>
        <Component {...pageProps} />
      </SessionStorageProvider>
    </LocalizationProvider>
  )
}