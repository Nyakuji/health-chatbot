import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/Auth/authService'
import './NavigationBar.module.css'

const NavigationBar = () => {
  const currentUser = authService.getCurrentUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  return (
    <nav className="navigation-bar">
      <ul>
        {!currentUser && (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {currentUser && (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            {currentUser.role === 'patient' && (
              <>
                <li>
                  <Link to="/book-appointment">Book Appointment</Link>
                </li>
                <li>
                  <Link to="/doctor-search">Search Doctors</Link>
                </li>
                <li>
                  <Link to="/symptom-checker">Symptom Checker</Link>
                </li>
              </>
            )}
            {currentUser.role === 'doctor' && (
              <li>
                <Link to="/doctor-availability">Doctor Availability</Link>
              </li>
            )}
            {currentUser.role === 'admin' && (
              <>
                <li>
                  <Link to="/admin-dashboard">Admin Dashboard</Link>
                </li>
                <li>
                  <Link to="/manage-users">Manage Users</Link>
                </li>
                <li>
                  <Link to="/manage-doctors">Manage Doctors</Link>
                </li>
                <li>
                  <Link to="/manage-appointments">Manage Appointments</Link>
                </li>
                <li>
                  <Link to="/activity-log">Activity Log</Link>
                </li>
                <li>
                  <Link to="/analytics-dashboard">Analytics Dashboard</Link>
                </li>
              </>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavigationBar
