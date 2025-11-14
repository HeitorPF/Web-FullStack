import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LyricsProvider } from './context/LyricsContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModalProvider>

      <LyricsProvider>
        <App />
      </LyricsProvider>
    </ModalProvider>

  </StrictMode>,
)
