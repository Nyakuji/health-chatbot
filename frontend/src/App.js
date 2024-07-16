import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline, CircularProgress, Grid } from '@mui/material'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import PrivateRoute from './components/PrivateRoute'
import AdminLayout from './layouts/AdminLayout'
import DoctorLayout from './layouts/DoctorLayout'
import PatientLayout from './layouts/PatientLayout'
import MainLayout from './layouts/MainLayout'
import Navbar from './components/Navbar'
import ProfileLayout from './layouts/ProfileLayout'

const Signup = lazy(() => import('./components/Auth/Signup'))
const Login = lazy(() => import('./components/Auth/Login'))
const Chat = lazy(() => import('./components/Chat/Chat'))
const Users = lazy(() => import('./components/Admin/Users'))
const Doctors = lazy(() => import('./components/Admin/Doctors'))
const Appointments = lazy(() => import('./components/Admin/Appointments'))
const Analytics = lazy(() => import('./components/Admin/Analytics'))
const ActivityLogs = lazy(() => import('./components/Admin/ActivityLogs'))
const BookAppointment = lazy(
  () => import('./components/Appoints/BookAppointment')
)
const DoctorAvailability = lazy(
  () => import('./components/Appoints/DoctorAvailability')
)
const CancelAppointment = lazy(
  () => import('./components/Appoints/CancelAppointment')
)
const AppointmentHistory = lazy(
  () => import('./components/Appoints/AppointmentHistory')
)
const UserProfile = lazy(() => import('./components/Profile/UserProfile'))
const UpdateProfile = lazy(() => import('./components/Profile/UpdateProfile'))
const UploadProfilePicture = lazy(
  () => import('./components/Profile/UploadProfilePicture')
)
const FeedbackForm = lazy(() => import('./components/Feed/FeedbackForm'))
const DoctorFeedback = lazy(() => import('./components/Feed/DoctorFeedback'))
const SendReminder = lazy(() => import('./components/Notifi/SendReminder'))
const SearchDoctors = lazy(() => import('./components/Doct/SearchDoctors'))
const UpdateAvailability = lazy(
  () => import('./components/Doct/UpdateAvailability')
)
const SymptomChecker = lazy(() => import('./components/Symptom/SymptomChecker'))

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <CssBaseline />
          <Navbar />
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12}></Grid>
            <Suspense fallback={<CircularProgress />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      {' '}
                      <MainLayout />{' '}
                    </PrivateRoute>
                  }
                >
                  <Route path="/" element={<MainLayout />}>
                    <Route path="chat" element={<Chat />} />
                  </Route>
                  <Route path="profile" element={<ProfileLayout />}>
                    <Route path="" element={<UserProfile />} />
                    <Route path="update" element={<UpdateProfile />} />
                    <Route path="upload" element={<UploadProfilePicture />} />
                  </Route>

                  <Route path="/" element={<AdminLayout />}>
                    <Route path="users" element={<Users />} />
                    <Route path="doctors" element={<Doctors />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="activity-logs" element={<ActivityLogs />} />
                  </Route>

                  <Route path="/" element={<DoctorLayout />}>
                    <Route
                      path="availability"
                      element={<DoctorAvailability />}
                    />
                    <Route
                      path="appointment-history"
                      element={<AppointmentHistory />}
                    />
                    <Route
                      path="doctor-feedback"
                      element={<DoctorFeedback />}
                    />
                    <Route
                      path="update-availability"
                      element={<UpdateAvailability />}
                    />
                  </Route>

                  <Route path="/" element={<PatientLayout />}>
                    <Route
                      path="book-appointment"
                      element={<BookAppointment />}
                    />
                    <Route
                      path="cancel-appointment"
                      element={<CancelAppointment />}
                    />
                    <Route
                      path="appointment-history"
                      element={<AppointmentHistory />}
                    />
                    <Route
                      path="symptom-checker"
                      element={<SymptomChecker />}
                    />
                    <Route path="send-reminder" element={<SendReminder />} />
                    <Route path="search-doctors" element={<SearchDoctors />} />
                    <Route path="feedback" element={<FeedbackForm />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </Grid>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
