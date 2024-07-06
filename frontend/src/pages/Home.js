import React from 'react'
import { Typography, Container } from '@mui/material'
import CustomButton from '../components/Button'

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Health Chatbot
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
