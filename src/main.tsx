import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import GlobalContext from './GlobalContext.tsx'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <GlobalContext>
                <App />
                <ToastContainer position='top-center' autoClose={1000} />
            </GlobalContext>
        </QueryClientProvider>
    </BrowserRouter>
)
