import React, { useState, useEffect } from 'react'
import { getActivityLogs } from '../../services/api'
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from '@mui/material'

const ActivityLogs = () => {
  const [logs, setLogs] = useState([
    { _id: '', userId: { username: '', email: '' }, activity: '', date: '' },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getActivityLogs()
      .then((response) => {
        setLogs(response.data)
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
        Activity Logs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log._id}>
                <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
                <TableCell>{log.userId.username}</TableCell>
                <TableCell>{log.userId.email}</TableCell>
                <TableCell>{log.activity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ActivityLogs
