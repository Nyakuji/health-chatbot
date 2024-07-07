import React from 'react'
import { Container, Typography, Paper } from '@mui/material'
import './About.module.css'

const About = () => {
  return (
    <Container className="about">
      <Paper elevation={3} className="about-paper">
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
          Health Chatbot is dedicated to providing you with a seamless
          experience in managing your health needs. From booking appointments to
          checking symptoms, we are here to help.
        </Typography>
      </Paper>
    </Container>
  )
}

export default About
