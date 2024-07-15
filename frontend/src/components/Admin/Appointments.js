import React, { useState, useEffect } from 'react'
import {
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from '../../services/api'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  CircularProgress,
  Box,
} from '@mui/material'

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { _id: '', doctorId: { name: '' }, patientId: { name: '' }, date: '' },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAppointments()
      .then((response) => {
        setAppointments(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        setLoading(false)
      })
  }, [])

  const handleUpdate = (appointment) => {
    updateAppointment(appointment)
      .then((response) => {
        console.log(response.data)
        alert('Appointment updated successfully')
      })
      .catch((error) => console.error(error))
  }

  const handleDelete = (appointmentId) => {
    deleteAppointment(appointmentId)
      .then(() => {
        setAppointments(
          appointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        )
        alert('Appointment deleted successfully')
      })
      .catch((error) => console.error(error))
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell>{appointment._id}</TableCell>
                <TableCell>{appointment.doctorId.name}</TableCell>
                <TableCell>{appointment.patientId.name}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleUpdate(appointment)}
                    style={{ marginRight: 8 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(appointment._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Appointments
