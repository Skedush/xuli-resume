import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { GenerativeDesignProvider } from './components/GenerativeDesignProvider'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GenerativeDesignProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GenerativeDesignProvider>
  </React.StrictMode>,
)
