import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { EntriesProvider } from '@/context/entries';
import { SnackbarProvider } from 'notistack';
import { UIProvider } from '@/context/ui';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { DarkTheme, lightTheme } from '../themes';



export default function App({ Component, pageProps }: AppProps) {
  return(
    <SnackbarProvider maxSnack={3}>
    <EntriesProvider>
    <UIProvider>
    <ThemeProvider theme={DarkTheme}>
       <CssBaseline/>
       <Component {...pageProps} />
    </ThemeProvider>
    </UIProvider> 
    </EntriesProvider>
    </SnackbarProvider>
  )
}
