import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import MenuIcon from '@mui/icons-material/Menu'
import ToggleColorMode from './ToggleColorMode'

const Navbar = () => {
  const { isAuthenticated, userRole, logout } = useAuth()
  const { mode, toggleTheme } = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const renderMenuItems = () => {
    const commonItems = [
      { label: 'Chat', link: '/chat' },
      { label: 'Feedback', link: '/feedback' },
    ]

    const adminItems = [
      { label: 'Users', link: '/users' },
      { label: 'Doctors', link: '/doctors' },
      { label: 'Appointments', link: '/appointments' },
      { label: 'Analytics', link: '/analytics' },
      { label: 'Activity Logs', link: '/activity-logs' },
    ]

    const doctorItems = [
      { label: 'Profile', link: '/profile' },
      { label: 'Update Availability', link: '/update-availability' },
      { label: 'Appointment History', link: '/appointment-history' },
      { label: 'Doctor Feedback', link: '/doctor-feedback' },
    ]

    const patientItems = [
      { label: 'Profile', link: '/profile' },
      { label: 'Symptom Checker', link: '/symptom-checker' },
      { label: 'Search Doctors', link: '/search-doctors' },
      { label: 'Availability', link: '/availability' },
      { label: 'Book Appointment', link: '/book-appointment' },
      { label: 'Cancel Appointment', link: '/cancel-appointment' },
      { label: 'Send Reminder', link: '/send-reminder' },
      { label: 'Appointment History', link: '/appointment-history' },
    ]

    let items = []

    if (userRole === 'admin') {
      items = [...adminItems, ...commonItems]
    } else if (userRole === 'doctor') {
      items = [...doctorItems, ...commonItems]
    } else if (userRole === 'patient') {
      items = [...patientItems, ...commonItems]
    }

    return items.map((item) => (
      <MenuItem
        component={Link}
        to={item.link}
        onClick={handleMenuClose}
        key={item.link}
      >
        {item.label}
      </MenuItem>
    ))
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', mr: 2 }}
          >
            Health Chatbot
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Box>
        {isAuthenticated ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {renderMenuItems()}
            </Menu>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}
        <ToggleColorMode mode={mode} toggleColorMode={toggleTheme} />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
