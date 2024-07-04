import React, { useState, useEffect } from 'react'
import profileService from '../services/profileService'
import appointmentService from '../services/appointmentService'
import authService from '../services/authService'

const Profile = () => {
  const [user, setUser] = useState({})
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    medicalId: '',
  })
  const [appointments, setAppointments] = useState([])
  const [message, setMessage] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const currentUser = authService.getCurrentUser()
        if (currentUser) {
          const userData = await profileService.getUser(currentUser.id)
          setUser(userData)

          setProfile({
            username: userData.username || '',
            email: userData.email || '',
            phoneNumber: userData.phoneNumber || '',
            medicalId: userData.medicalId || '',
          })

          const history = await appointmentService.getAppointmentHistory(
            currentUser.id
          )
          setAppointments(history.appointments || [])
        }
      } catch (error) {
        console.error(
          'Error fetching profile:',
          error.response ? error.response.data : error.message
        )
        setMessage('Error fetching profile')
      } finally {
        setLoading(false)
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
      const currentUser = authService.getCurrentUser()
      const result = await profileService.updateProfile({
        ...profile,
        userId: currentUser.id,
      })
      setMessage(result.message)
    } catch (error) {
      console.error(
        'Error updating profile:',
        error.response ? error.response.data : error.message
      )
      setMessage('Error updating profile')
    }
  }

  const handlePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }

  const handlePictureUpload = async () => {
    if (!profilePicture) {
      console.error('No profile picture selected')
      setMessage('No profile picture selected')
      return
    }

    const formData = new FormData()
    formData.append('profilePicture', profilePicture)

    try {
      const updatedUser = await profileService.uploadProfilePicture(formData)
      setUser(updatedUser)
      setMessage('Profile picture updated successfully')
    } catch (error) {
      console.error(
        'Error uploading profile picture:',
        error.response ? error.response.data : error.message
      )
      setMessage('Error uploading profile picture')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Profile</h2>
      {user.profilePicture && (
        <img src={user.profilePicture} alt="Profile" width="150" height="150" />
      )}
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
            {appointment.doctorId?.name} for {appointment.symptoms}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile
