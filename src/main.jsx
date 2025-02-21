import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { ToastProvider } from "@/components/ui/toast"
import './i18n'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="min-h-screen bg-background antialiased">
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <BrowserRouter> */}
      <ToastProvider>
        <div>
        <App />
        <Toaster />
        </div>
        </ToastProvider>
      {/* </BrowserRouter> */}
      
    </ThemeProvider>
    </div>
  </StrictMode>,
)
