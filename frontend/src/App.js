import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import SymptomChecker from './components/SymptomChecker';
import BookAppointment from './components/BookAppointment';
import Profile from './components/Profile';
import DoctorSearch from './components/DoctorSearch';
import DoctorAvailability from './components/DoctorAvailability';
import DoctorProfile from './components/DoctorProfile';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ManageUsers';
import ManageDoctors from './components/ManageDoctors';
import ManageAppointments from './components/ManageAppointments';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search-doctors" element={<DoctorSearch />} />
          <Route path="/doctor-availability" element={<DoctorAvailability />} />
          <Route path="/doctor-profile/:doctorId" element={<DoctorProfile doctorId={''} />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/doctors" element={<ManageDoctors />} />
          <Route path="/admin/appointments" element={<ManageAppointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
