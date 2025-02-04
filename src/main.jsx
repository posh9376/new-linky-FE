import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import Homepage from './homepage'
import './style.css'
import Homepage from './homepage'
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Router> 
      <Homepage />
    </Router>
  </StrictMode>,
)
