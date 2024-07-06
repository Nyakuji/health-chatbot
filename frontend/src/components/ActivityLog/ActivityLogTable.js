import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import PropTypes from 'prop-types'
import './ActivityLogTable.module.css'

const ActivityLogTable = ({ logs }) => {
  return (
    <TableContainer component={Paper} className="activity-log-table">
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
  )
}

ActivityLogTable.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default ActivityLogTable
