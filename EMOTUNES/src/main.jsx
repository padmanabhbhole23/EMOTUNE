import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Input from "./components/input.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Input />
  </StrictMode>,
)
