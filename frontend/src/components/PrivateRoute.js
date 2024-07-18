import React from 'react'
import PropType from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? children : <Navigate to="/login" />
}

PrivateRoute.propTypes = {
  children: PropType.node.isRequired,
}

export default PrivateRoute
