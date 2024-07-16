import React from 'react'
import { Container, Typography, Paper, Box, Grid } from '@mui/material'
import './About.module.css'

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          About Us
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" paragraph>
            Health Chatbot is dedicated to providing you with a seamless
            experience in managing your health needs. From booking appointments
            to checking symptoms, we are here to help.
          </Typography>
          <Typography variant="body1" paragraph>
            Our platform is designed to offer a user-friendly interface where
            you can easily navigate through various health services. Whether you
            are a patient looking to consult with a doctor, a doctor managing
            appointments, or an admin overseeing operations, Health Chatbot
            caters to all your needs.
          </Typography>
          <Typography variant="body1" paragraph>
            We believe in the power of technology to improve healthcare
            accessibility and efficiency. Our chatbot is equipped with the
            latest AI technology to provide accurate symptom checks and assist
            you in finding the right healthcare professional.
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body2">
                To leverage technology to make healthcare accessible and
                efficient for everyone.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body2">
                To be the leading platform in digital healthcare solutions,
                enhancing the patient and doctor experience through innovation.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default About
