import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService'

const NavigationBar = () => {
  const currentUser = authService.getCurrentUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  return (
    <nav>
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
                  <Link to="/search-doctors">Search Doctors</Link>
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
                  <Link to="/admin">Admin Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin/users">Manage Users</Link>
                </li>
                <li>
                  <Link to="/admin/doctors">Manage Doctors</Link>
                </li>
                <li>
                  <Link to="/admin/appointments">Manage Appointments</Link>
                </li>
                <li>
                  <Link to="/admin/activity-log">Activity Log</Link>
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
