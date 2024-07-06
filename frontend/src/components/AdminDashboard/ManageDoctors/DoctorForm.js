import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import doctorService from '../../../services/AdminDashboard/doctorService'
import Input from '../../Input'
import Button from '../../Button'
import './DoctorForm.module.css'

const DoctorForm = ({ doctor }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    location: '',
  })

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name,
        specialty: doctor.specialty,
        location: doctor.location,
      })
    }
  }, [doctor])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await doctorService.updateDoctor(doctor._id, formData)
    // Add logic to refresh doctor list or close form

    setFormData({
      name: '',
      specialty: '',
      location: '',
    })
  }

  return (
    <form className="doctor-form" onSubmit={handleSubmit}>
      <h3>Edit Doctor</h3>
      <Input
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        name="specialty"
        label="Specialty"
        value={formData.specialty}
        onChange={handleChange}
      />
      <Input
        name="location"
        label="Location"
        value={formData.location}
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

DoctorForm.propTypes = {
  doctor: PropTypes.object.isRequired,
}

export default DoctorForm
