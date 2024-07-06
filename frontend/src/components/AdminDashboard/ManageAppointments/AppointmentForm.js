import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import appointmentService from '../../../services/AdminDashboard/appointmentService'
import Input from '../../Input'
import Button from '../../Button'
import './AppointmentForm.module.css'

const AppointmentForm = ({ appointment }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    time: '',
  })

  useEffect(() => {
    if (appointment) {
      setFormData({
        patientName: appointment.patientName,
        doctorName: appointment.doctorName,
        date: appointment.date,
        time: appointment.time,
      })
    }
  }, [appointment])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await appointmentService.updateAppointment(appointment._id, formData)
    // Add logic to refresh appointment list or close form

    setFormData({
      patientName: '',
      doctorName: '',
      date: '',
      time: '',
    })
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h3>Edit Appointment</h3>
      <Input
        name="patientName"
        label="Patient Name"
        value={formData.patientName}
        onChange={handleChange}
      />
      <Input
        name="doctorName"
        label="Doctor Name"
        value={formData.doctorName}
        onChange={handleChange}
      />
      <Input
        name="date"
        label="Date"
        value={formData.date}
        onChange={handleChange}
      />
      <Input
        name="time"
        label="Time"
        value={formData.time}
        onChange={handleChange}
      />
      <Button
        text="Save"
        type="submit"
        onClick={() => {}}
        color="primary"
        variant="contained"
      />
    </form>
  )
}

AppointmentForm.propTypes = {
  appointment: PropTypes.object.isRequired,
}

export default AppointmentForm
