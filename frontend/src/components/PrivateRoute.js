import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const PrivateRoute = ({ roles }) => {
  const { user } = useContext(AuthContext)

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to unauthorized page or home if user does not have the correct role
    return <Navigate to="/unauthorized" />
  }

  // Render the child components
  return <Outlet />
}

PrivateRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
}

export default PrivateRoute
