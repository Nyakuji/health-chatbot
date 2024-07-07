import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import NavigationBar from './components/NavigationBar'

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <AppRoutes />
    </Router>
  )
}

export default App
