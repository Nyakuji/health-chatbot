import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import SymptomChecker from './components/SymptomChecker';
import BookAppointment from './components/BookAppointment';
import Profile from './components/Profile';
import DoctorSearch from './components/DoctorSearch';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
