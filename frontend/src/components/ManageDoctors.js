import React, { useEffect, useState } from 'react'
import adminService from '../services/adminService'

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([{ username: '', email: '', _id: '' }])

  useEffect(() => {
    const fetchDoctors = async () => {
      const result = await adminService.getAllDoctors()
      setDoctors(result)
    }
    fetchDoctors()
  }, [])

  const handleDelete = async (doctorId) => {
    await adminService.deleteUser(doctorId)
    setDoctors(doctors.filter((doctor) => doctor._id !== doctorId))
  }

  return (
    <div>
      <h2>Manage Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            Dr. {doctor.username} ({doctor.email})
            <button onClick={() => handleDelete(doctor._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ManageDoctors
