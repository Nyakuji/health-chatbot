import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';

const ManageUsers = () => {
  const [users, setUsers] = useState([{ username: '', email: '', _id: ''}]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await adminService.getAllUsers();
      setUsers(result);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    await adminService.deleteUser(userId);
    setUsers(users.filter(user => user._id !== userId));
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} ({user.email})
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
