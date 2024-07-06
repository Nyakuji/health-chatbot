import React, { useState, useEffect } from 'react'
import doctorService from '../../../services/AdminDashboard/doctorService'
import DoctorTable from './DoctorTable'
import DoctorForm from './DoctorForm'
import './ManageDoctors.module.css'

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await doctorService.getAllDoctors()
      setDoctors(response)
    }

    fetchDoctors()
  }, [])

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor)
  }

  const handleDelete = async (doctorId) => {
    await doctorService.deleteDoctor(doctorId)
    setDoctors(doctors.filter((doctor) => doctor !== doctorId))
  }

  return (
    <div className="manage-doctors">
      <h2>Manage Doctors</h2>
      <DoctorTable
        doctors={doctors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {selectedDoctor && <DoctorForm doctor={selectedDoctor} />}
    </div>
  )
}

export default ManageDoctors
