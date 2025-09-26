import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LyricsProvider } from './context/LyricsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LyricsProvider>
      <App />
    </LyricsProvider>
  </StrictMode>,
)
