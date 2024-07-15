import React, { useState, useEffect } from 'react'
import { getAnalyticsData } from '../../services/api'
import {
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Box,
} from '@mui/material'

const Analytics = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    totalFeedbacks: 0,
    usersByRole: [{}],
    appointmentsByStatus: [{}],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAnalyticsData()
      .then((response) => {
        setData(response.data)
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
        Analytics Dashboard
      </Typography>
      {data ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{data.totalUsers}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6">Total Appointments</Typography>
              <Typography variant="h4">{data.totalAppointments}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6">Total Feedbacks</Typography>
              <Typography variant="h4">{data.totalFeedbacks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6">Users by Role</Typography>
              {data.usersByRole.map((role) => (
                <Typography key={role._id}>
                  {role._id}: {role.count}
                </Typography>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6">Appointments by Status</Typography>
              {data.appointmentsByStatus.map((status) => (
                <Typography key={status._id}>
                  {status._id}: {status.count}
                </Typography>
              ))}
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6">No data available</Typography>
      )}
    </Container>
  )
}

export default Analytics
