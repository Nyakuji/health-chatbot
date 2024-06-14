import React, { useState } from 'react';
import authService from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(formData);
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={onChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={onChange} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
