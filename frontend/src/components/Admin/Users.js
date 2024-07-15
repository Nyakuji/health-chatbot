import React, { useState, useEffect } from 'react'
import { getUsers, updateUser, deleteUser } from '../../services/api'
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

const Users = () => {
  const [users, setUsers] = useState([{ _id: '', name: '', email: '' }])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error) // eslint-disable-line no-console
        setLoading(false)
      })
  }, [])

  const handleUpdate = (user) => {
    updateUser(user)
      .then((response) => {
        console.log(response.data) // eslint-disable-line no-console
        alert('User updated successfully')
      })
      .catch((error) => console.error(error))
  }

  const handleDelete = (userId) => {
    deleteUser(userId)
      .then(() => {
        setUsers(users.filter((user) => user._id !== userId))
        alert('User deleted successfully')
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
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleUpdate(user)}
                    style={{ marginRight: 8 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(user._id)}
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

export default Users
