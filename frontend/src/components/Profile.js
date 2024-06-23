import React, { useState, useEffect } from 'react'
import profileService from '../services/profileService'
import authService from '../services/authService'

const Profile = () => {
  const [user, setUser] = useState({})
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
  const [profilePicture, setProfilePicture] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = authService.getCurrentUser()
      const userData = await profileService.getUser(currentUser.id)
      setUser(userData)
    }

    fetchUser()
  }, [])

  const handlePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }

  const handlePictureUpload = async () => {
    const formData = new FormData()
    formData.append('profilePicture', profilePicture)

    try {
      const updatedUser = await profileService.uploadProfilePicture(formData)
      setUser(updatedUser)
    } catch (error) {
      console.error('Error uploading profile picture:', error)
    }
  }

  return (
    <div>
      <h2>Profile</h2>
      <img src={user.profilePicture} alt="Profile" width="150" height="150" />
      <h3>{user.username}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <input type="file" onChange={handlePictureChange} />
      <button onClick={handlePictureUpload}>Upload Profile Picture</button>
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
