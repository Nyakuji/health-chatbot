import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import userService from '../../../services/AdminDashboard/userService'
import Input from '../../Input'
import Button from '../../Button'
import './UserForm.module.css'

const UserForm = ({ user }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await userService.updateUser(user._id, formData)
    // Add logic to refresh user list or close form

    setFormData({
      username: '',
      email: '',
      role: '',
    })
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h3>Edit User</h3>
      <Input
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="role"
        label="Role"
        value={formData.role}
        onChange={handleChange}
      />
      <Button
        text="Save"
        type="submit"
        onClick={() => {}}
        color=""
        variant=""
      />
    </form>
  )
}

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserForm
