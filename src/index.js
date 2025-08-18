import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import 'i18n/i18n'

const queryClient = new QueryClient()

let theme = createTheme({
    palette: {
        primary: {
            light: '#33beff',
            main: '#00aeff',
            dark: '#004a6d',
            contrastText: '#fff',
        },
    },
})
theme = responsiveFontSizes(theme)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HashRouter>
                    <SnackbarProvider maxSnack={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <QueryClientProvider client={queryClient}>
                                <App />
                            </QueryClientProvider>
                        </LocalizationProvider>
                    </SnackbarProvider>
                </HashRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
