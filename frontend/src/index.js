import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { CssBaseline } from '@mui/material'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.Fragment>
    <CssBaseline />
    <App />
  </React.Fragment>
)

reportWebVitals()
