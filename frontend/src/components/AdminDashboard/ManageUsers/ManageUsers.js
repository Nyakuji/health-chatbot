import React, { useState, useEffect } from 'react'
import userService from '../../../services/AdminDashboard/userService'
import UserTable from './UserTable'
import UserForm from './UserForm'
import './ManageUsers.module.css'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await userService.getAllUsers()
      setUsers(response)
    }

    fetchUsers()
  }, [])

  const handleEdit = (user) => {
    setSelectedUser(user)
  }

  const handleDelete = async (userId) => {
    await userService.deleteUser(userId)
    setUsers(users.filter((user) => user !== userId))
  }

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      {selectedUser && <UserForm user={selectedUser} />}
    </div>
  )
}

export default ManageUsers
