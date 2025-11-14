// src/main.jsx (ou index.js)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // Importado
import './index.css'
import AppRouter from './App.jsx'
import { LyricsProvider } from './context/LyricsContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 👈 Adicione basename para corresponder ao prefixo da URL do Vite */}
    <BrowserRouter basename="/webFullStack">
      <ModalProvider>
        <LyricsProvider>
          <AppRouter />
        </LyricsProvider>
      </ModalProvider>
    </BrowserRouter>

  </StrictMode>,
)