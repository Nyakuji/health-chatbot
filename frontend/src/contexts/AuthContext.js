import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext({
  isAuthenticated: false,
  userRole: null,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  const login = (role) => {
    setIsAuthenticated(true)
    setUserRole(role)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
