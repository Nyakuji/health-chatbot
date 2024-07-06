import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../Button'
import './AppointmentTable.module.css'

const AppointmentTable = ({ appointments, onEdit, onDelete }) => {
  return (
    <table className="appointment-table">
      <thead>
        <tr>
          <th>Patient Name</th>
          <th>Doctor Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment._id}>
            <td>{appointment.patientName}</td>
            <td>{appointment.doctorName}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>
              <Button
                text="Edit"
                onClick={() => onEdit(appointment)}
                color="primary"
                variant="contained"
              />
              <Button
                text="Delete"
                onClick={() => onDelete(appointment._id)}
                color="secondary"
                variant="contained"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

AppointmentTable.propTypes = {
  appointments: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default AppointmentTable
