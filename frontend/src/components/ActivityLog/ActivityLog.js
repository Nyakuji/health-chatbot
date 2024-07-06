import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import activityLogService from '../../services/ActivityLog/activityLogService'
import './ActivityLog.module.css'

const ActivityLog = () => {
  const [logs, setLogs] = useState([{ _id: '', action: '', user: '' }])

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const logs = await activityLogService.getActivityLogs()
        setLogs(logs)
      } catch (error) {
        console.error('Error fetching activity logs:', error)
      }
    }

    fetchActivityLogs()
  }, [])

  return (
    <Container maxWidth="lg" className="activity-log-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Activity Logs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log._id}>
                <TableCell>{log._id}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ActivityLog
