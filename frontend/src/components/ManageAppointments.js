import React, { useEffect, useState } from 'react'
import adminService from '../services/adminService'

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      date: '',
      time: '',
      doctorId: { username: '' },
      patientId: { username: '' },
      _id: '',
    },
  ])

  useEffect(() => {
    const fetchAppointments = async () => {
      const result = await adminService.getAllAppointments()
      setAppointments(result)
    }
    fetchAppointments()
  }, [])

  const handleDelete = async (appointmentId) => {
    await adminService.deleteAppointment(appointmentId)
    setAppointments(
      appointments.filter((appointment) => appointment._id !== appointmentId)
    )
  }

  return (
    <div>
      <h2>Manage Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            {appointment.date} - {appointment.time} with Dr.{' '}
            {appointment.doctorId.username} for {appointment.patientId.username}
            <button onClick={() => handleDelete(appointment._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ManageAppointments
