import React, { useState, useEffect } from 'react'
import appointmentService from '../../../services/AdminDashboard/appointmentService'
import AppointmentTable from './AppointmentTable'
import AppointmentForm from './AppointmentForm'
import './ManageAppointments.module.css'

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await appointmentService.getAllAppointments()
      setAppointments(response)
    }

    fetchAppointments()
  }, [])

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment)
  }

  const handleDelete = async (appointmentId) => {
    await appointmentService.deleteAppointment(appointmentId)
    setAppointments(
      appointments.filter((appointment) => appointment !== appointmentId)
    )
  }

  return (
    <div className="manage-appointments">
      <h2>Manage Appointments</h2>
      <AppointmentTable
        appointments={appointments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {selectedAppointment && (
        <AppointmentForm appointment={selectedAppointment} />
      )}
    </div>
  )
}

export default ManageAppointments
