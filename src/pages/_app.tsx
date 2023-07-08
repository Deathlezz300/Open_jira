import '@/styles/globals.css'
import { ThemeProvider,CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import { basicTheme,lightTheme } from '@/Themes/BasicTheme'
import { UIProvider } from '@/Context/UI/UIProvider'
import { EntriesProvider } from '@/Context/Entries/EntriesProvider'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={basicTheme}>
            <CssBaseline/>
            <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  )
}
