import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext({
  isAuthenticated: false,
  userRole: null,
  userData: null, // New field for user data
  login: () => {},
  logout: () => {},
  setUserData: () => {}, // New function to set user data
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [userData, setUserData] = useState(null) // State to hold user data

  const login = (role, user) => {
    setIsAuthenticated(true)
    setUserRole(role)
    setUserData(user) // Set user data on login
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    setUserData(null) // Clear user data on logout
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userData,
        login,
        logout,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
