import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../Button'
import './DoctorTable.module.css'

const DoctorTable = ({ doctors, onEdit, onDelete }) => {
  return (
    <table className="doctor-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Specialty</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor) => (
          <tr key={doctor._id}>
            <td>{doctor.name}</td>
            <td>{doctor.specialty}</td>
            <td>{doctor.location}</td>
            <td>
              <Button
                text="Edit"
                onClick={() => onEdit(doctor)}
                color="primary"
                variant="contained"
              />
              <Button
                text="Delete"
                onClick={() => onDelete(doctor._id)}
                color="secondary"
                variant="outlined"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

DoctorTable.propTypes = {
  doctors: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default DoctorTable
