import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index-modern.css'
import AppPremium from './AppPremium.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppPremium />
  </StrictMode>,
)
