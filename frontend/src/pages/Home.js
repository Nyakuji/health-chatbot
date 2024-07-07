import React from 'react'
import { Typography, Container } from '@mui/material'
import CustomButton from '../components/Button'
import './Home.module.css'

const Home = () => {
  return (
    <Container className="Home">
      <Typography variant="h2" gutterBottom>
        Welcome to Health Chatbot
      </Typography>
      <Typography variant="body1">
        Your health companion for managing appointments, checking symptoms, and
        more.
      </Typography>
      <CustomButton
        variant="contained"
        color="primary"
        text="Get Started"
        onClick={() => {}}
      >
        Get Started
      </CustomButton>
    </Container>
  )
}

export default Home
