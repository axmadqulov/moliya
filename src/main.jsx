import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { FinanceProvider } from './context/FinanceContext.jsx'
import './styles.css'
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <FinanceProvider>
      <App />
    </FinanceProvider>
  </HashRouter>
)
