import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

//live 환경 StrictMode disable

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <App/>
  </StrictMode>,
)
