import React, { useState } from 'react';
import authService from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    medicalId: '',
  });

  const { username, email, password, medicalId } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.signup(formData);
      console.log('Signup successful:', response);
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={onChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={onChange} required />
      </div>
      <div>
        <label>Medical ID</label>
        <input type="text" name="medicalId" value={medicalId} onChange={onChange} required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
