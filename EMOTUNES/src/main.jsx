import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index2.css'
import Input from "./components/input.jsx"
// import Appi from './components/Appi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Appi /> */}
    <Input/>
  </StrictMode>,
)
