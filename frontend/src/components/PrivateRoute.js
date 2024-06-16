import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = ({ roles }) => {
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.indexOf(currentUser.role) === -1) {
    // Role not authorized
    return <Navigate to="/" replace />;
  }

  // Authorized, render the requested component
  return <Outlet />;
};

export default PrivateRoute;
