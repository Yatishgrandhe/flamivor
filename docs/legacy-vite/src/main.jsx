if (import.meta.env.DEV && import.meta.env.VITE_REACT_DEVTOOLS === 'true') {
  void import('react-grab')
  void import('react-scan')
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
