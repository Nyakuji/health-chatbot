import React, { useState, useEffect } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material'
import appointmentService from '../../../services/Appointments/appointmentService'
import './AppointmentHistory.module.css'

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([
    { _id: '', doctorId: { name: '' }, date: '', time: '' },
  ])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const result = await appointmentService.getAppointmentHistory()
        setAppointments(result.appointments)
        setLoading(false)
      } catch (error) {
        setMessage(
          error.response?.data?.message || 'Error fetching appointment history'
        )
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  return (
    <div className="appointment-history">
      <Typography variant="h4">Appointment History</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {appointments.map((appointment) => (
            <ListItem key={appointment._id}>
              <ListItemText
                primary={`Appointment with Dr. ${appointment.doctorId.name}`}
                secondary={`${appointment.date} at ${appointment.time}`}
              />
            </ListItem>
          ))}
        </List>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default AppointmentHistory
