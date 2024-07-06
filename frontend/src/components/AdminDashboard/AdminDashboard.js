import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import './AdminDashboard.module.css'

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-options">
        <Button
          text="Manage Users"
          component={Link}
          to="/admin/users"
          onClick={() => {}}
          color="primary"
          variant="contained"
        />
        <Button
          text="Manage Doctors"
          component={Link}
          to="/admin/doctors"
          onClick={() => {}}
          color="primary"
          variant="contained"
        />
        <Button
          text="Manage Appointments"
          component={Link}
          to="/admin/appointments"
          onClick={() => {}}
          color="primary"
          variant="contained"
        />
      </div>
    </div>
  )
}

export default AdminDashboard
