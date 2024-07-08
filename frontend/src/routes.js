import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Profile from './components/Profile/Profile'
import ProfileForm from './components/Profile/ProfileForm'
import UploadProfilePicture from './components/Profile/UploadProfilePicture'
import BookAppointment from './components/Appointments/BookAppointment/BookAppointment'
import DoctorAvailability from './components/Appointments/DoctorAvailability/DoctorAvailability'
import CancelAppointment from './components/Appointments/CancelAppointment/CancelAppointment'
import AppointmentHistory from './components/Appointments/AppointmentHistory/AppointmentHistory'
import UpdateAvailability from './components/Doctor/UpdateAvailability/UpdateAvailability'
import FeedbackList from './components/Feedback/FeedbackList'
import FeedbackForm from './components/Feedback/FeedbackForm'
import ManageUsers from './components/AdminDashboard/ManageUsers/ManageUsers'
import ManageDoctors from './components/AdminDashboard/ManageDoctors/ManageDoctors'
import ManageAppointments from './components/AdminDashboard/ManageAppointments/ManageAppointments'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import ActivityLog from './components/AdminDashboard/ActivityLog/ActivityLog'
import AnalyticsDashboard from './components/AdminDashboard/AnalyticsDashboard/AnalyticsDashboard'
import Chat from './components/Chat/Chat'
import SymptomChecker from './components/SymptomChecker/SymptomChecker'
import DoctorSearch from './components/Doctor/DoctorSearch/DoctorSearch'
import SendReminder from './components/Notification/SendReminder/SendReminder'
import PrivateRoute from './components/PrivateRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={<PrivateRoute roles={['patient', 'doctor', 'admin']} />}
      >
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route
        path="/book-appointment"
        element={<PrivateRoute roles={['patient']} />}
      >
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Route>
      <Route
        path="/doctor-availability"
        element={<PrivateRoute roles={['doctor']} />}
      >
        <Route path="/doctor-availability" element={<DoctorAvailability />} />
      </Route>
      <Route path="/manage-users" element={<PrivateRoute roles={['admin']} />}>
        <Route path="/manage-users" element={<ManageUsers />} />
      </Route>
      <Route
        path="/manage-doctors"
        element={<PrivateRoute roles={['admin']} />}
      >
        <Route path="/manage-doctors" element={<ManageDoctors />} />
      </Route>
      <Route
        path="/manage-appointments"
        element={<PrivateRoute roles={['admin']} />}
      >
        <Route path="/manage-appointments" element={<ManageAppointments />} />
      </Route>
      <Route
        path="/admin-dashboard"
        element={<PrivateRoute roles={['admin']} />}
      >
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>
      <Route
        path="/chat"
        element={<PrivateRoute roles={['patient', 'doctor']} />}
      >
        <Route path="/chat" element={<Chat receiverId="123" />} />
      </Route>
      <Route
        path="/symptom-checker"
        element={<PrivateRoute roles={['patient']} />}
      >
        <Route path="/symptom-checker" element={<SymptomChecker />} />
      </Route>
      <Route
        path="/doctor-search"
        element={<PrivateRoute roles={['patient']} />}
      >
        <Route path="/doctor-search" element={<DoctorSearch />} />
      </Route>
      <Route path="/send-reminder" element={<PrivateRoute roles={['admin']} />}>
        <Route path="/send-reminder" element={<SendReminder />} />
      </Route>
      <Route
        path="/update-availability"
        element={<PrivateRoute roles={['doctor']} />}
      >
        <Route path="/update-availability" element={<UpdateAvailability />} />
      </Route>
      <Route
        path="/cancel-appointment"
        element={<PrivateRoute roles={['patient']} />}
      >
        <Route path="/cancel-appointment" element={<CancelAppointment />} />
      </Route>
      <Route
        path="/appointment-history"
        element={<PrivateRoute roles={['patient']} />}
      >
        <Route path="/appointment-history" element={<AppointmentHistory />} />
      </Route>
      <Route path="/feedback-list" element={<PrivateRoute roles={['admin']} />}>
        <Route
          path="/feedback-list"
          element={<FeedbackList doctorId="123" />}
        />
      </Route>
      <Route
        path="/feedback-form"
        element={<PrivateRoute roles={['patient', 'doctor']} />}
      >
        <Route path="/feedback-form" element={<FeedbackForm />} />
      </Route>
      <Route path="/activity-log" element={<PrivateRoute roles={['admin']} />}>
        <Route path="/activity-log" element={<ActivityLog />} />
      </Route>
      <Route
        path="/analytics-dashboard"
        element={<PrivateRoute roles={['admin']} />}
      >
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
      </Route>
      <Route
        path="/profile-form"
        element={<PrivateRoute roles={['patient', 'doctor']} />}
      >
        <Route path="/profile-form" element={<ProfileForm />} />
      </Route>
      <Route
        path="/upload-profile-picture"
        element={<PrivateRoute roles={['patient', 'doctor']} />}
      >
        <Route
          path="/upload-profile-picture"
          element={<UploadProfilePicture />}
        />
      </Route>
    </Routes>
  )
}

AppRoutes.propTypes = {
  children: PropTypes.node,
}

export default AppRoutes
