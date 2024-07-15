import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Tabs, Tab, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const ProfileLayout = () => {
  const location = useLocation()
  const currentTab = location.pathname.split('/').pop()

  return (
    <Container>
      <Tabs value={currentTab}>
        <Tab
          label="View Profile"
          value="profile"
          component={Link}
          to="/profile"
        />
        <Tab
          label="Update Profile"
          value="update"
          component={Link}
          to="/profile/update"
        />
        <Tab
          label="Upload Picture"
          value="upload"
          component={Link}
          to="/profile/upload"
        />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </Container>
  )
}

export default ProfileLayout
