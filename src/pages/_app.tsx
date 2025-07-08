// Define the global layout

import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/context/AuthContext'
import { LocalizationProvider } from '@/context/LocalizationContext'
import { SessionStorageProvider } from '@/context/SessionStorageContext'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider>
      <SessionStorageProvider>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthProvider>
      </SessionStorageProvider>
    </LocalizationProvider>
  )
}