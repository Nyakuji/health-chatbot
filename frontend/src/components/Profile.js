import React, { useState, useEffect } from 'react'
import profileService from '../services/profileService'
import authService from '../services/authService'

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    medicalId: '',
  })
  const [appointments, setAppointments] = useState([
    { _id: '', date: '', time: '', doctorId: { name: '' }, symptoms: '' },
  ])
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Fetch user info and appointment history
    const fetchProfile = async () => {
      const user = authService.getCurrentUser()
      if (user) {
        setProfile({
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          medicalId: user.medicalId,
        })
        const history = await profileService.getAppointmentHistory(user.id)
        setAppointments(history.appointments)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = authService.getCurrentUser()
      const result = await profileService.updateProfile({
        ...profile,
        userId: user.id,
      })
      setMessage(result.message)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Medical ID</label>
          <input
            type="text"
            name="medicalId"
            value={profile.medicalId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
      <h2>Appointment History</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.date} - {appointment.time} with Dr.{' '}
            {appointment.doctorId.name} for {appointment.symptoms}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile
