import React, { useState, useEffect } from 'react'
import { getDoctors } from '../../services/api'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  CircularProgress,
  Box,
} from '@mui/material'

const Doctors = () => {
  const [doctors, setDoctors] = useState([{ _id: '', name: '', email: '' }])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDoctors()
      .then((response) => {
        setDoctors(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        setLoading(false)
      })
  }, [])

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
        Doctors
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor._id}>
                <TableCell>{doctor._id}</TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Doctors
