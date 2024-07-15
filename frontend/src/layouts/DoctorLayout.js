import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

const DoctorLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export default DoctorLayout
