import React from 'react'
import { Container, Typography, Paper } from '@mui/material'
import './Contact.module.css'

const ContactInfo = () => {
  return (
    <Container className="contact-info">
      <Paper elevation={3} className="contact-info-paper">
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          If you have any questions or need support, please contact us at:
        </Typography>
        <Typography variant="body1">
          Email: support@healthchatbot.com
        </Typography>
        <Typography variant="body1">Phone: (123) 456-7890</Typography>
      </Paper>
    </Container>
  )
}

export default ContactInfo
