import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AuthProvider } from './contexts/AuthContext' // Import AuthProvider

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
)

reportWebVitals()
