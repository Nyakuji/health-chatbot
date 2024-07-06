import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../Button'
import './UserTable.module.css'

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button
                text="Edit"
                onClick={() => onEdit(user)}
                color="primary"
                variant="contained"
              />
              <Button
                text="Delete"
                onClick={() => onDelete(user._id)}
                color="secondary"
                variant="contained"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default UserTable
