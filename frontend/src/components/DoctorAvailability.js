import React, { useEffect, useState } from 'react'
import websocketService from '../services/websocketService'
import authService from '../services/authService'

const DoctorAvailability = () => {
  const [availability, setAvailability] = useState({})

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user) {
      websocketService.connect(user.id)

      websocketService.socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setAvailability((prevAvailability) => ({
          ...prevAvailability,
          [data.doctorId]: data.availability,
        }))
      }

      return () => {
        websocketService.disconnect()
      }
    }
  }, [])

  return (
    <div>
      <h2>Doctor Availability</h2>
      <ul>
        {Object.entries(availability).map(([doctorId, available]) => (
          <li key={doctorId}>
            Doctor ID: {doctorId}, Available: {available ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DoctorAvailability
