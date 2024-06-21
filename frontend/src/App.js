import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import SymptomChecker from './components/SymptomChecker'
import BookAppointment from './components/BookAppointment'
import Profile from './components/Profile'
import DoctorSearch from './components/DoctorSearch'
import DoctorAvailability from './components/DoctorAvailability'
import DoctorProfile from './components/DoctorProfile'
import AdminDashboard from './components/AdminDashboard'
import ManageUsers from './components/ManageUsers'
import ManageDoctors from './components/ManageDoctors'
import ManageAppointments from './components/ManageAppointments'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import ActivityLog from './components/ActivityLog'
import PrivateRoute from './components/PrivateRoute'
import NavigationBar from './components/NavigationBar'
function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />

          <Route element={<PrivateRoute roles={['patient']} />}>
            <Route path="/book-appointment" element={<BookAppointment />} />
          </Route>

          <Route
            element={<PrivateRoute roles={['patient', 'doctor', 'admin']} />}
          >
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<PrivateRoute roles={['patient']} />}>
            <Route path="/search-doctors" element={<DoctorSearch />} />
          </Route>

          <Route element={<PrivateRoute roles={['doctor']} />}>
            <Route
              path="/doctor-availability"
              element={<DoctorAvailability />}
            />
          </Route>

          <Route element={<PrivateRoute roles={['patient', 'admin']} />}>
            <Route
              path="/doctor-profile/:doctorId"
              element={<DoctorProfile doctorId={123} />}
            />
          </Route>

          <Route element={<PrivateRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/doctors" element={<ManageDoctors />} />
            <Route
              path="/admin/appointments"
              element={<ManageAppointments />}
            />
            <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
            <Route path="/admin/activity-log" element={<ActivityLog />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
