import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import './AnalyticsTable.module.css'

const AnalyticsTable = ({ data }) => {
  return (
    <TableContainer component={Paper} className="analytics-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

AnalyticsTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default AnalyticsTable
