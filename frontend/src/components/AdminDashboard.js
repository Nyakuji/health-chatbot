import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/users">Manage Users</Link></li>
        <li><Link to="/admin/doctors">Manage Doctors</Link></li>
        <li><Link to="/admin/appointments">Manage Appointments</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
